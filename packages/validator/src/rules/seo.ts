import { chromium } from 'playwright-core';

import type { RuleResult } from '../types.js';

export interface SeoCheckOptions {
  executablePath?: string;
  requestTimeoutMs?: number;
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

async function checkSitemap(origin: string, timeoutMs: number): Promise<CheckItem> {
  const response = await fetchWithTimeout(`${origin}/sitemap.xml`, timeoutMs);
  if (!response || !response.ok) {
    return {
      id: 'sitemap.xml',
      ok: false,
      detail: `negăsit (${response?.status ?? 'eroare de rețea'})`,
    };
  }
  const body = await response.text();
  const ok = body.includes('<urlset') || body.includes('<sitemapindex');
  return {
    id: 'sitemap.xml',
    ok,
    detail: ok ? 'valid' : 'răspunde, dar nu conține <urlset>/<sitemapindex>',
  };
}

async function checkRobots(origin: string, timeoutMs: number): Promise<CheckItem> {
  const response = await fetchWithTimeout(`${origin}/robots.txt`, timeoutMs);
  if (!response || !response.ok) {
    return {
      id: 'robots.txt',
      ok: false,
      detail: `negăsit (${response?.status ?? 'eroare de rețea'})`,
    };
  }
  const body = await response.text();
  const ok = /sitemap:/iu.test(body);
  return {
    id: 'robots.txt',
    ok,
    detail: ok ? 'valid, conține Sitemap:' : 'răspunde, dar nu conține o directivă Sitemap:',
  };
}

async function checkManifest(origin: string, timeoutMs: number): Promise<CheckItem> {
  for (const path of ['/manifest.webmanifest', '/manifest.json']) {
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
    detail: 'negăsit la /manifest.webmanifest sau /manifest.json',
  };
}

async function checkCanonical(url: string, executablePath: string | undefined): Promise<CheckItem> {
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  try {
    const page = await browser.newPage();
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
  } finally {
    await browser.close();
  }
}

/**
 * Regula sd-seo-required-pages: verifică prezența paginilor și declarațiilor
 * standard (sitemap, robots, manifest, canonical), configurabile per
 * proiect în versiunea completă — MVP verifică doar căile convenționale.
 * Vezi docs/product/validator-rules-inventory.md pentru limitările regulii.
 */
export async function checkRequiredPages(
  url: string,
  options: SeoCheckOptions = {},
): Promise<RuleResult> {
  const timeoutMs = options.requestTimeoutMs ?? 10_000;
  const origin = new URL(url).origin;

  const items = await Promise.all([
    checkSitemap(origin, timeoutMs),
    checkRobots(origin, timeoutMs),
    checkManifest(origin, timeoutMs),
    checkCanonical(url, options.executablePath),
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
      'Verifică prezența și forma minimă a sitemap.xml, robots.txt, manifestului web și a link-ului canonical de pe pagină, la căile convenționale.',
    remediation:
      failing.length > 0
        ? failing.map((item) => `${item.id}: ${item.detail}`).join(' | ')
        : 'Nicio acțiune necesară.',
    evidence: items,
    limitations:
      'MVP verifică doar căile convenționale (/sitemap.xml, /robots.txt, /manifest.webmanifest sau /manifest.json) — un proiect care le publică în altă locație are nevoie de căi configurabile, neimplementate încă (vezi inventarul).',
  };
}
