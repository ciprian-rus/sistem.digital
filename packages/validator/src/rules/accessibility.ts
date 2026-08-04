import axeCore from 'axe-core';
import { chromium } from 'playwright-core';

import type { RuleResult } from '../types.js';

export interface AccessibilityCheckOptions {
  /**
   * Cale către un executabil Chromium existent. Acest pachet nu descarcă
   * browsere — utilizatorul trebuie să aibă unul disponibil (de exemplu prin
   * `npx playwright install chromium`) și să indice calea, sau să seteze
   * variabila de mediu SISTEM_DIGITAL_VALIDATOR_CHROMIUM.
   */
  executablePath?: string;
  tags?: readonly string[];
}

interface AxeViolation {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  nodes: Array<{ target: unknown[] }>;
}

const DEFAULT_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

/**
 * Regula sd-a11y-axe-wcag: rulează axe-core, cu același set de taguri WCAG
 * folosit de testele acestui monorepo (apps/website/tests/accessibility).
 * Vezi docs/product/validator-rules-inventory.md pentru limitările regulii.
 */
export async function checkAccessibility(
  url: string,
  options: AccessibilityCheckOptions = {},
): Promise<RuleResult> {
  const executablePath = options.executablePath ?? process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM;
  const tags = options.tags ?? DEFAULT_TAGS;

  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeCore.source });

    const violations = (await page.evaluate(
      (runTags) =>
        (
          window as unknown as {
            axe: { run: (context: unknown, options: unknown) => Promise<{ violations: unknown }> };
          }
        ).axe
          .run(document, { runOnly: { type: 'tag', values: runTags } })
          .then((results) => results.violations),
      tags,
    )) as AxeViolation[];

    return {
      id: 'sd-a11y-axe-wcag',
      category: 'accessibility',
      severity: 'error',
      status: violations.length > 0 ? 'fail' : 'pass',
      summary:
        violations.length > 0
          ? `${violations.length} tip(uri) de încălcare WCAG detectate automat.`
          : 'Nicio încălcare WCAG detectată automat.',
      explanation: `Rulează axe-core împotriva paginii randate, cu tagurile: ${tags.join(', ')}.`,
      remediation:
        violations.length > 0
          ? violations
              .map((violation) => `${violation.id}: ${violation.help} (${violation.helpUrl})`)
              .join(' | ')
          : 'Nicio acțiune necesară pentru regulile detectate automat.',
      evidence: violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
      })),
      limitations:
        'axe-core detectează estimativ 30-50% dintre problemele reale de accesibilitate (cifră general acceptată în literatura de specialitate) și nu înlocuiește testarea cu tehnologii asistive reale — vezi docs/product/design-code-matrix-schema.md.',
    };
  } finally {
    await browser.close();
  }
}
