import { chromium } from 'playwright-core';

import type { RuleResult } from '../types.js';

export interface LinkCheckOptions {
  executablePath?: string;
  /** Timeout per link, în milisecunde. */
  requestTimeoutMs?: number;
  /** Verifică și linkurile către alte domenii, nu doar cele interne. */
  checkExternal?: boolean;
}

interface LinkStatus {
  href: string;
  internal: boolean;
  ok: boolean;
  status: number | null;
  error: string | null;
}

async function checkOneLink(
  href: string,
  timeoutMs: number,
): Promise<Omit<LinkStatus, 'href' | 'internal'>> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response = await fetch(href, { method: 'HEAD', signal: controller.signal });
    // Unele servere nu implementează HEAD corect (405/501) — reîncearcă cu GET
    // înainte să declari linkul stricat.
    if (response.status === 405 || response.status === 501) {
      response = await fetch(href, { method: 'GET', signal: controller.signal });
    }
    return { ok: response.ok, status: response.status, error: null };
  } catch (error) {
    return {
      ok: false,
      status: null,
      error: error instanceof Error ? error.message : String(error),
    };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Regula sd-content-broken-links: extrage linkurile din pagina randată (nu
 * din sursa statică — SPA-urile pot injecta linkuri prin JavaScript) și
 * verifică fiecare cu o cerere HTTP reală. Vezi
 * docs/product/validator-rules-inventory.md pentru limitările regulii.
 */
export async function checkLinks(url: string, options: LinkCheckOptions = {}): Promise<RuleResult> {
  const executablePath = options.executablePath ?? process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM;
  const timeoutMs = options.requestTimeoutMs ?? 10_000;
  const checkExternal = options.checkExternal ?? true;

  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  let hrefs: string[];
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    hrefs = await page.$$eval('a[href]', (anchors) =>
      anchors.map((anchor) => (anchor as HTMLAnchorElement).href),
    );
  } finally {
    await browser.close();
  }

  const targetOrigin = new URL(url).origin;
  const uniqueHrefs = [...new Set(hrefs)].filter((href) => href.startsWith('http'));
  const toCheck = checkExternal
    ? uniqueHrefs
    : uniqueHrefs.filter((href) => new URL(href).origin === targetOrigin);

  const results: LinkStatus[] = await Promise.all(
    toCheck.map(async (href) => {
      const internal = new URL(href).origin === targetOrigin;
      const outcome = await checkOneLink(href, timeoutMs);
      return { href, internal, ...outcome };
    }),
  );

  const broken = results.filter((link) => !link.ok);
  const brokenInternal = broken.filter((link) => link.internal);

  return {
    id: 'sd-content-broken-links',
    category: 'content',
    severity: 'error',
    status: brokenInternal.length > 0 ? 'fail' : broken.length > 0 ? 'warn' : 'pass',
    summary:
      broken.length > 0
        ? `${broken.length} din ${results.length} linkuri verificate nu răspund cu succes (${brokenInternal.length} interne).`
        : `Toate cele ${results.length} linkuri verificate răspund cu succes.`,
    explanation:
      'Extrage linkurile din pagina randată (inclusiv cele injectate prin JavaScript) și trimite o cerere HTTP reală (HEAD, cu fallback GET) către fiecare.',
    remediation:
      brokenInternal.length > 0
        ? 'Corectează sau elimină linkurile interne stricate — un link intern stricat e complet sub controlul proiectului, spre deosebire de unul extern.'
        : broken.length > 0
          ? 'Linkurile externe stricate pot fi temporare sau în afara controlului proiectului — verifică manual înainte de a le corecta.'
          : 'Nicio acțiune necesară.',
    evidence: broken.map((link) => ({
      href: link.href,
      internal: link.internal,
      status: link.status,
      error: link.error,
    })),
    limitations:
      'Verifică doar linkurile prezente în HTML la momentul randării inițiale — linkuri afișate condiționat, după o interacțiune a utilizatorului, nu sunt acoperite. Linkurile externe stricate pot reflecta o problemă temporară a altui server, nu a proiectului verificat.',
  };
}
