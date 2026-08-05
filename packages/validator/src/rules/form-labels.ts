import axeCore from 'axe-core';
import { chromium } from 'playwright-core';

import type { RuleResult } from '../types.js';

export interface FormLabelsCheckOptions {
  /**
   * Cale către un executabil Chromium existent. Acest pachet nu descarcă
   * browsere — utilizatorul trebuie să aibă unul disponibil (de exemplu prin
   * `npx playwright install chromium`) și să indice calea, sau să seteze
   * variabila de mediu SISTEM_DIGITAL_VALIDATOR_CHROMIUM.
   */
  executablePath?: string;
}

interface AxeViolation {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  nodes: Array<{ target: unknown[] }>;
}

// `label` e deja parte din tagurile WCAG rulate de sd-a11y-axe-wcag, dar
// extras aici separat, ca regulă explicabilă de sine stătătoare — aceeași
// justificare ca sd-a11y-heading-order/sd-a11y-landmarks. `label-title-only`,
// `aria-input-field-name` și `aria-toggle-field-name` acoperă mecanisme de
// etichetare pe care regula `label` nu le verifică (title ca unic mecanism,
// câmpuri ARIA fără nume accesibil). `form-field-multiple-labels` — cerută
// inițial — a fost exclusă: axe o raportează mereu ca „incomplete” (necesită
// verificare manuală), niciodată ca „violation”, deci n-ar detecta nimic
// automat, indiferent de starea reală a paginii (confirmat empiric, nu doar
// din documentație).
const FORM_LABEL_RULES = [
  'label',
  'label-title-only',
  'aria-input-field-name',
  'aria-toggle-field-name',
];

/**
 * Regula sd-a11y-form-labels: verifică etichetarea câmpurilor de formular —
 * fiecare control are un label asociat, ARIA sau nativ, nu doar un atribut
 * title. Vezi docs/product/validator-rules-inventory.md (regula era
 * rezervată în convenția de identificatori, neimplementată până acum).
 */
export async function checkFormLabels(
  url: string,
  options: FormLabelsCheckOptions = {},
): Promise<RuleResult> {
  const executablePath = options.executablePath ?? process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM;
  const browser = await chromium.launch(executablePath ? { executablePath } : {});
  let violations: AxeViolation[];
  try {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeCore.source });

    violations = (await page.evaluate(
      (rules) =>
        (
          window as unknown as {
            axe: { run: (context: unknown, options: unknown) => Promise<{ violations: unknown }> };
          }
        ).axe
          .run(document, { runOnly: { type: 'rule', values: rules } })
          .then((results) => results.violations),
      FORM_LABEL_RULES,
    )) as AxeViolation[];
  } finally {
    await browser.close();
  }

  return {
    id: 'sd-a11y-form-labels',
    category: 'accessibility',
    severity: 'error',
    status: violations.length > 0 ? 'fail' : 'pass',
    summary:
      violations.length > 0
        ? `${violations.length} tip(uri) de câmpuri de formular fără etichetare corectă.`
        : 'Toate câmpurile de formular verificate au etichetare corectă.',
    explanation: `Verifică etichetarea câmpurilor de formular pe pagina randată, via axe-core (regulile ${FORM_LABEL_RULES.join(', ')}).`,
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
    limitations:
      'Nu acoperă form-field-multiple-labels (axe o raportează mereu ca „incomplete”, nu ca „violation” — necesită verificare manuală, nu poate fi detectată automat). Verifică doar prezența unui mecanism de etichetare, nu calitatea textului etichetei.',
  };
}
