import { withPage, type BrowserOptions } from '../browser-utils.js';
import type { RuleResult } from '../types.js';

export interface SeoCheckOptions extends BrowserOptions {
  requestTimeoutMs?: number;
  /** Calea sitemap-ului, relativă la origine. Implicit `/sitemap.xml`. */
  sitemapPath?: string;
  /** Calea robots.txt, relativă la origine. Implicit `/robots.txt`. */
  robotsPath?: string;
  /**
   * Căile candidate pentru manifestul web, verificate în ordine — prima care
   * răspunde e folosită. Implicit `/manifest.webmanifest` și
   * `/manifest.json`.
   */
  manifestPaths?: string[];
}

interface CheckItem {
  id: string;
  ok: boolean;
  detail: string;
}

async function fetchWithTimeout(url: string, timeoutMs: number): Promise<Response | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { signal: controller.signal });
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

async function checkSitemap(origin: string, timeoutMs: number, path: string): Promise<CheckItem> {
  const response = await fetchWithTimeout(`${origin}${path}`, timeoutMs);
  if (!response || !response.ok) {
    return {
      id: 'sitemap.xml',
      ok: false,
      detail: `negăsit la ${path} (${response?.status ?? 'eroare de rețea'})`,
    };
  }
  const body = await response.text();
  const ok = body.includes('<urlset') || body.includes('<sitemapindex');
  return {
    id: 'sitemap.xml',
    ok,
    detail: ok ? `valid la ${path}` : `${path} răspunde, dar nu conține <urlset>/<sitemapindex>`,
  };
}

async function checkRobots(origin: string, timeoutMs: number, path: string): Promise<CheckItem> {
  const response = await fetchWithTimeout(`${origin}${path}`, timeoutMs);
  if (!response || !response.ok) {
    return {
      id: 'robots.txt',
      ok: false,
      detail: `negăsit la ${path} (${response?.status ?? 'eroare de rețea'})`,
    };
  }
  const body = await response.text();
  const ok = /sitemap:/iu.test(body);
  return {
    id: 'robots.txt',
    ok,
    detail: ok
      ? `valid la ${path}, conține Sitemap:`
      : `${path} răspunde, dar nu conține o directivă Sitemap:`,
  };
}

async function checkManifest(
  origin: string,
  timeoutMs: number,
  paths: string[],
): Promise<CheckItem> {
  for (const path of paths) {
    const response = await fetchWithTimeout(`${origin}${path}`, timeoutMs);
    if (!response || !response.ok) continue;
    try {
      const json: unknown = await response.json();
      const ok = typeof json === 'object' && json !== null && 'name' in json;
      return {
        id: 'manifest',
        ok,
        detail: ok ? `valid la ${path}` : `${path} răspunde, dar nu are câmpul "name"`,
      };
    } catch {
      return { id: 'manifest', ok: false, detail: `${path} răspunde, dar nu e JSON valid` };
    }
  }
  return {
    id: 'manifest',
    ok: false,
    detail: `negăsit la ${paths.join(' sau ')}`,
  };
}

async function checkCanonical(url: string, options: BrowserOptions): Promise<CheckItem> {
  return withPage(options, async (page) => {
    await page.goto(url, { waitUntil: 'networkidle' });
    const canonical = page.locator('link[rel="canonical"]').first();
    // .getAttribute() pe un locator fără potriviri așteaptă timeout-ul
    // implicit de acționabilitate (30s) — verificăm .count() întâi, ca
    // absența să fie instantanee, nu o eroare de timeout mascată.
    const href = (await canonical.count()) > 0 ? await canonical.getAttribute('href') : null;
    const ok = Boolean(href);
    return {
      id: 'canonical',
      ok,
      detail: ok ? `prezent (${href})` : 'lipsește <link rel="canonical"> pe pagină',
    };
  });
}

/**
 * Regula sd-seo-required-pages: verifică prezența paginilor și declarațiilor
 * standard (sitemap, robots, manifest, canonical). Implicit verifică căile
 * convenționale (/sitemap.xml, /robots.txt, /manifest.webmanifest sau
 * /manifest.json) — un proiect care le publică în altă locație poate indica
 * propriile căi prin sitemapPath/robotsPath/manifestPaths.
 */
export async function checkRequiredPages(
  url: string,
  options: SeoCheckOptions = {},
): Promise<RuleResult> {
  const timeoutMs = options.requestTimeoutMs ?? 10_000;
  const sitemapPath = options.sitemapPath ?? '/sitemap.xml';
  const robotsPath = options.robotsPath ?? '/robots.txt';
  const manifestPaths = options.manifestPaths ?? ['/manifest.webmanifest', '/manifest.json'];
  const origin = new URL(url).origin;

  const items = await Promise.all([
    checkSitemap(origin, timeoutMs, sitemapPath),
    checkRobots(origin, timeoutMs, robotsPath),
    checkManifest(origin, timeoutMs, manifestPaths),
    checkCanonical(url, options),
  ]);

  const failing = items.filter((item) => !item.ok);

  return {
    id: 'sd-seo-required-pages',
    category: 'seo',
    severity: 'error',
    status: failing.length > 0 ? 'fail' : 'pass',
    summary:
      failing.length > 0
        ? `${failing.length} din ${items.length} verificări SEO obligatorii au eșuat: ${failing.map((item) => item.id).join(', ')}.`
        : `Toate cele ${items.length} verificări SEO obligatorii trec.`,
    explanation:
      'Verifică prezența și forma minimă a sitemap.xml, robots.txt, manifestului web și a link-ului canonical de pe pagină, la căile convenționale (configurabile prin sitemapPath/robotsPath/manifestPaths).',
    remediation:
      failing.length > 0
        ? failing.map((item) => `${item.id}: ${item.detail}`).join(' | ')
        : 'Nicio acțiune necesară.',
    evidence: items,
    limitations:
      'Verifică o singură cale per declarație (sau, pentru manifest, prima din lista de căi candidate care răspunde) — nu detectează automat unde sunt publicate, ci necesită indicarea lor explicită dacă diferă de convenție.',
  };
}
