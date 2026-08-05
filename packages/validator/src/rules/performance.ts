import { chromium } from 'playwright-core';

import type { RuleResult } from '../types.js';

export interface PerformanceBudgetCheckOptions {
  /**
   * Cale către un executabil Chromium existent. Acest pachet nu descarcă
   * browsere — utilizatorul trebuie să aibă unul disponibil (de exemplu prin
   * `npx playwright install chromium`) și să indice calea, sau să seteze
   * variabila de mediu SISTEM_DIGITAL_VALIDATOR_CHROMIUM.
   */
  executablePath?: string;
  /** Buget în octeți. Implicit, bugetele acestui site — vezi mai jos. */
  budgetBytes?: number;
}

// Aceleași valori implicite ca apps/website/scripts/check-performance-budget.mjs
// — un punct de plecare rezonabil, nu o valoare universală. Un proiect extern
// poate avea nevoie de un buget diferit, configurabil prin `budgetBytes`.
const DEFAULT_JS_BUDGET_BYTES = 600 * 1024;
const DEFAULT_CSS_BUDGET_BYTES = 180 * 1024;

const LIMITATIONS =
  'Măsoară doar resursele încărcate la randarea inițială a paginii (waitUntil: "networkidle") — JavaScript/CSS încărcate ulterior, condiționat de o interacțiune a utilizatorului, nu sunt acoperite. Dimensiunea e cea a corpului decodat, nu octeții efectiv transferați prin rețea (care pot fi mai mici, cu compresie gzip/brotli). Bugetul implicit e preluat din bugetele acestui site (apps/website/scripts/check-performance-budget.mjs) — poate să nu se potrivească proiectului verificat, de aceea e configurabil prin `budgetBytes`.';

async function collectResourceBytes(
  url: string,
  executablePath: string | undefined,
  resourceType: 'script' | 'stylesheet',
): Promise<number> {
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  try {
    const page = await browser.newPage();
    const bodySizes: Array<Promise<number>> = [];
    page.on('response', (response) => {
      if (response.request().resourceType() !== resourceType) return;
      bodySizes.push(
        response
          .body()
          .then((body) => body.length)
          .catch(() => 0),
      );
    });
    await page.goto(url, { waitUntil: 'networkidle' });
    const sizes = await Promise.all(bodySizes);
    return sizes.reduce((total, size) => total + size, 0);
  } finally {
    await browser.close();
  }
}

function buildBudgetResult(
  id: string,
  category: string,
  resourceLabel: string,
  totalBytes: number,
  budgetBytes: number,
): RuleResult {
  const overBudget = totalBytes > budgetBytes;
  const totalKiB = (totalBytes / 1024).toFixed(1);
  const budgetKiB = (budgetBytes / 1024).toFixed(1);

  return {
    id,
    category,
    severity: 'warning',
    status: overBudget ? 'warn' : 'pass',
    summary: overBudget
      ? `${resourceLabel} încărcat (${totalKiB} KiB) depășește bugetul de ${budgetKiB} KiB.`
      : `${resourceLabel} încărcat (${totalKiB} KiB) e sub bugetul de ${budgetKiB} KiB.`,
    explanation: `Măsoară dimensiunea totală a resurselor ${resourceLabel.toLowerCase()} încărcate la randarea inițială a paginii (Chromium, via playwright-core) și o compară cu un buget configurabil.`,
    remediation: overBudget
      ? `Redu dimensiunea ${resourceLabel.toLowerCase()} (code-splitting, eliminarea codului nefolosit) sau ajustează bugetul cu opțiunea budgetBytes dacă valoarea implicită nu se potrivește proiectului.`
      : 'Nicio acțiune necesară.',
    evidence: [{ totalBytes, budgetBytes, overBudget }],
    limitations: LIMITATIONS,
  };
}

/**
 * Regula sd-perf-js-budget: măsoară JavaScript-ul încărcat la randarea
 * inițială a paginii, la runtime — spre deosebire de
 * apps/website/scripts/check-performance-budget.mjs, care citește
 * .next/build-manifest.json (specific Next.js, inexistent pentru un
 * proiect extern generic). Vezi docs/product/validator-rules-inventory.md.
 */
export async function checkJsBudget(
  url: string,
  options: PerformanceBudgetCheckOptions = {},
): Promise<RuleResult> {
  const executablePath = options.executablePath ?? process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM;
  const budgetBytes = options.budgetBytes ?? DEFAULT_JS_BUDGET_BYTES;
  const totalBytes = await collectResourceBytes(url, executablePath, 'script');
  return buildBudgetResult(
    'sd-perf-js-budget',
    'performance',
    'JavaScript',
    totalBytes,
    budgetBytes,
  );
}

/**
 * Regula sd-perf-css-budget: măsoară CSS-ul încărcat la randarea inițială
 * a paginii, la runtime — vezi checkJsBudget mai sus pentru context.
 */
export async function checkCssBudget(
  url: string,
  options: PerformanceBudgetCheckOptions = {},
): Promise<RuleResult> {
  const executablePath = options.executablePath ?? process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM;
  const budgetBytes = options.budgetBytes ?? DEFAULT_CSS_BUDGET_BYTES;
  const totalBytes = await collectResourceBytes(url, executablePath, 'stylesheet');
  return buildBudgetResult('sd-perf-css-budget', 'performance', 'CSS', totalBytes, budgetBytes);
}
