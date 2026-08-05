import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

import type { RuleResult } from '../types.js';

export interface PackageVersionCheckOptions {
  requestTimeoutMs?: number;
  /**
   * Rădăcina registrului npm interogat pentru versiunea publicată. Implicit
   * registrul public — parametrizabil pentru teste (server local) sau
   * pentru proiecte care folosesc o oglindă internă de npm.
   */
  registryUrl?: string;
}

interface PackageVersionItem {
  name: string;
  installed: string | null;
  latest: string | null;
  upToDate: boolean | null;
  detail: string;
}

const SCOPE = '@sistem-digital';
const DEFAULT_REGISTRY_URL = 'https://registry.npmjs.org';

async function readInstalledVersion(
  nodeModulesDir: string,
  pkgName: string,
): Promise<string | null> {
  try {
    const raw = await readFile(path.join(nodeModulesDir, pkgName, 'package.json'), 'utf8');
    const parsed = JSON.parse(raw) as { version?: unknown };
    return typeof parsed.version === 'string' ? parsed.version : null;
  } catch {
    return null;
  }
}

async function fetchLatestVersion(
  fullPackageName: string,
  registryUrl: string,
  timeoutMs: number,
): Promise<string | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${registryUrl}/${encodeURIComponent(fullPackageName)}/latest`, {
      signal: controller.signal,
      headers: { accept: 'application/json' },
    });
    if (!response.ok) return null;
    const json = (await response.json()) as { version?: unknown };
    return typeof json.version === 'string' ? json.version : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Regula sd-package-version: compară versiunea instalată a fiecărui pachet
 * @sistem-digital/* dintr-un proiect local cu ultima versiune publicată pe
 * npm (dist-tag "latest"). Spre deosebire de celelalte reguli, nu operează
 * pe un URL live — are nevoie de acces la node_modules-ul proiectului
 * verificat, de aceea nu face parte din CLI (care cere doar un URL), ci
 * e disponibilă ca funcție de bibliotecă. Vezi
 * docs/product/validator-rules-inventory.md pentru context.
 */
export async function checkPackageVersions(
  projectPath: string,
  options: PackageVersionCheckOptions = {},
): Promise<RuleResult> {
  const timeoutMs = options.requestTimeoutMs ?? 10_000;
  const registryUrl = options.registryUrl ?? DEFAULT_REGISTRY_URL;
  const nodeModulesDir = path.join(projectPath, 'node_modules', SCOPE);

  let scopedPackages: string[];
  try {
    scopedPackages = (await readdir(nodeModulesDir)).filter((name) => !name.startsWith('.'));
  } catch {
    scopedPackages = [];
  }

  if (scopedPackages.length === 0) {
    return {
      id: 'sd-package-version',
      category: 'maintenance',
      severity: 'warning',
      status: 'not-applicable',
      summary: `Niciun pachet ${SCOPE}/* găsit instalat în proiectul verificat.`,
      explanation: `Compară versiunea instalată a fiecărui pachet ${SCOPE}/* cu ultima versiune publicată pe npm (dist-tag "latest").`,
      remediation:
        'Nicio acțiune necesară — proiectul verificat nu instalează pachete Sistem Digital.',
      evidence: [],
      limitations:
        'Verifică doar pachetele instalate local, sub node_modules/@sistem-digital — nu poate deriva versiunea instalată doar dintr-un URL live, de aceea nu face parte din CLI.',
    };
  }

  const items: PackageVersionItem[] = await Promise.all(
    scopedPackages.map(async (name): Promise<PackageVersionItem> => {
      const fullPackageName = `${SCOPE}/${name}`;
      const [installed, latest] = await Promise.all([
        readInstalledVersion(nodeModulesDir, name),
        fetchLatestVersion(fullPackageName, registryUrl, timeoutMs),
      ]);

      if (installed === null) {
        return {
          name: fullPackageName,
          installed,
          latest,
          upToDate: null,
          detail: 'nu s-a putut citi package.json al pachetului instalat',
        };
      }
      if (latest === null) {
        return {
          name: fullPackageName,
          installed,
          latest,
          upToDate: null,
          detail: 'nepublicat pe npm sau eroare la interogarea registrului',
        };
      }

      const upToDate = installed === latest;
      return {
        name: fullPackageName,
        installed,
        latest,
        upToDate,
        detail: upToDate ? 'la zi' : `instalat ${installed}, ultima versiune publicată ${latest}`,
      };
    }),
  );

  const outdated = items.filter((item) => item.upToDate === false);
  const unknown = items.filter((item) => item.upToDate === null);

  return {
    id: 'sd-package-version',
    category: 'maintenance',
    severity: 'warning',
    status: outdated.length > 0 ? 'warn' : 'pass',
    summary:
      outdated.length > 0
        ? `${outdated.length} din ${items.length} pachete ${SCOPE}/* instalate sunt în urma ultimei versiuni publicate.`
        : `Toate cele ${items.length} pachete ${SCOPE}/* instalate sunt la zi.` +
          (unknown.length > 0 ? ` (${unknown.length} nu au putut fi verificate.)` : ''),
    explanation: `Compară versiunea instalată a fiecărui pachet ${SCOPE}/* (citită din node_modules/${SCOPE}/<pachet>/package.json) cu ultima versiune publicată pe npm (dist-tag "latest").`,
    remediation:
      outdated.length > 0
        ? outdated.map((item) => `${item.name}: ${item.detail}`).join(' | ')
        : 'Nicio acțiune necesară.',
    evidence: items,
    limitations:
      'Verifică doar pachetele instalate local, sub node_modules/@sistem-digital — nu operează pe un URL live, de aceea nu face parte din CLI. Pachetele nepublicate pe npm nu pot fi verificate (apar cu upToDate: null). Fiind marcată severity "warning", nu blochează CI implicit (vezi principiul din docs/product/validator-rules-inventory.md).',
  };
}
