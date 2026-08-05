import axeCore from 'axe-core';

import { withPage, type BrowserOptions } from '../browser-utils.js';
import type { RuleResult } from '../types.js';

export type HeadingLandmarksCheckOptions = BrowserOptions;

interface AxeViolation {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  nodes: Array<{ target: unknown[] }>;
}

// Ambele seturi de reguli sunt marcate „best-practice" în axe-core, nu fac
// parte din tagurile WCAG 2.x rulate de sd-a11y-axe-wcag — de aceea sunt
// cerute explicit, pe id de regulă, nu pe tag.
const HEADING_ORDER_RULES = ['heading-order', 'page-has-heading-one'];
const LANDMARK_RULES = [
  'region',
  'landmark-one-main',
  'landmark-unique',
  'landmark-no-duplicate-main',
  'landmark-no-duplicate-banner',
  'landmark-no-duplicate-contentinfo',
  'landmark-banner-is-top-level',
  'landmark-contentinfo-is-top-level',
  'landmark-main-is-top-level',
];

async function runAxeRules(
  url: string,
  options: BrowserOptions,
  ruleIds: readonly string[],
): Promise<AxeViolation[]> {
  return withPage(options, async (page) => {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeCore.source });

    return (await page.evaluate(
      (rules) =>
        (
          window as unknown as {
            axe: { run: (context: unknown, options: unknown) => Promise<{ violations: unknown }> };
          }
        ).axe
          .run(document, { runOnly: { type: 'rule', values: rules } })
          .then((results) => results.violations),
      ruleIds,
    )) as AxeViolation[];
  });
}

function buildRuleResult(
  id: string,
  explanation: string,
  limitations: string,
  violations: AxeViolation[],
): RuleResult {
  return {
    id,
    category: 'accessibility',
    severity: 'error',
    status: violations.length > 0 ? 'fail' : 'pass',
    summary:
      violations.length > 0
        ? `${violations.length} tip(uri) de încălcare detectate.`
        : 'Nicio încălcare detectată.',
    explanation,
    remediation:
      violations.length > 0
        ? violations
            .map((violation) => `${violation.id}: ${violation.help} (${violation.helpUrl})`)
            .join(' | ')
        : 'Nicio acțiune necesară.',
    evidence: violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
    })),
    limitations,
  };
}

const BEST_PRACTICE_LIMITATION =
  'Aceste reguli axe sunt marcate „best-practice" — nu fac parte din tagurile WCAG 2.x implicite rulate de sd-a11y-axe-wcag, de aceea sunt extrase separat, ca regulă explicabilă de sine stătătoare (vezi docs/product/validator-rules-inventory.md).';

/**
 * Regula sd-a11y-heading-order: extrage din axe-core doar regulile despre
 * ierarhia titlurilor (heading-order, page-has-heading-one), separat de
 * raportul agregat sd-a11y-axe-wcag.
 */
export async function checkHeadingOrder(
  url: string,
  options: HeadingLandmarksCheckOptions = {},
): Promise<RuleResult> {
  const violations = await runAxeRules(url, options, HEADING_ORDER_RULES);
  return buildRuleResult(
    'sd-a11y-heading-order',
    `Verifică ierarhia titlurilor (h1-h6) pe pagina randată, via axe-core (regulile ${HEADING_ORDER_RULES.join(', ')}).`,
    BEST_PRACTICE_LIMITATION,
    violations,
  );
}

/**
 * Regula sd-a11y-landmarks: extrage din axe-core doar regulile despre
 * regiuni ARIA (landmark-uri) — prezență, unicitate, poziționare la nivelul
 * de sus al paginii.
 */
export async function checkLandmarks(
  url: string,
  options: HeadingLandmarksCheckOptions = {},
): Promise<RuleResult> {
  const violations = await runAxeRules(url, options, LANDMARK_RULES);
  return buildRuleResult(
    'sd-a11y-landmarks',
    `Verifică prezența și unicitatea regiunilor ARIA (landmark-uri) pe pagina randată, via axe-core (regulile ${LANDMARK_RULES.join(', ')}).`,
    BEST_PRACTICE_LIMITATION,
    violations,
  );
}
