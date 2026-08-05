import axeCore from 'axe-core';
import type { Page } from 'playwright-core';

import { withPage, type BrowserOptions } from '../browser-utils.js';
import type { RuleResult } from '../types.js';

export type FormLabelsCheckOptions = BrowserOptions;

interface AxeViolation {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  nodes: Array<{ target: unknown[] }>;
}

interface EvidenceItem {
  id: string;
  impact: string | null;
  nodes: number;
  /** Doar pentru form-field-multiple-labels — descrieri ale elementelor afectate. */
  selectors?: string[];
}

// `label` e deja parte din tagurile WCAG rulate de sd-a11y-axe-wcag, dar
// extras aici separat, ca regulă explicabilă de sine stătătoare — aceeași
// justificare ca sd-a11y-heading-order/sd-a11y-landmarks. `label-title-only`,
// `aria-input-field-name` și `aria-toggle-field-name` acoperă mecanisme de
// etichetare pe care regula `label` nu le verifică (title ca unic mecanism,
// câmpuri ARIA fără nume accesibil). `form-field-multiple-labels` nu e în
// această listă — axe o raportează mereu ca „incomplete”, niciodată ca
// „violation” (confirmat empiric), deci n-ar detecta nimic automat prin axe;
// e verificată separat mai jos, prin inspecție directă a DOM-ului.
const FORM_LABEL_RULES = [
  'label',
  'label-title-only',
  'aria-input-field-name',
  'aria-toggle-field-name',
];

const LABELABLE_CONTROLS_SELECTOR =
  'input:not([type="hidden"]):not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="image"]), textarea, select';

interface MultipleLabelsItem {
  selector: string;
  labelCount: number;
}

/**
 * Verifică form-field-multiple-labels direct pe DOM, fără axe: un control
 * asociat cu mai multe elemente <label> (explicit prin for/id, implicit prin
 * încadrare) e ambiguu pentru tehnologiile asistive — de regulă doar unul
 * dintre texte e anunțat, nu se poate ști dinainte care. Deterministic, nu o
 * euristică — un control fie are mai multe label-uri asociate, fie nu.
 */
async function checkMultipleLabels(page: Page): Promise<MultipleLabelsItem[]> {
  return page.evaluate((selector: string) => {
    function describe(element: Element, index: number): string {
      const tag = element.tagName.toLowerCase();
      const id = (element as HTMLElement).id;
      return id ? `${tag}#${id}` : `${tag}:nth-match(${index + 1})`;
    }

    const controls = Array.from(document.querySelectorAll(selector));
    const results: MultipleLabelsItem[] = [];

    controls.forEach((control, index) => {
      const labels = new Set<Element>();
      const id = (control as HTMLElement).id;
      if (id) {
        document.querySelectorAll(`label[for="${CSS.escape(id)}"]`).forEach((label) => {
          labels.add(label);
        });
      }
      const wrapping = control.closest('label');
      if (wrapping) labels.add(wrapping);

      if (labels.size > 1) {
        results.push({ selector: describe(control, index), labelCount: labels.size });
      }
    });

    return results;
  }, LABELABLE_CONTROLS_SELECTOR);
}

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
  const { violations, multipleLabels } = await withPage(options, async (page) => {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.addScriptTag({ content: axeCore.source });

    const pageViolations = (await page.evaluate(
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

    const pageMultipleLabels = await checkMultipleLabels(page);
    return { violations: pageViolations, multipleLabels: pageMultipleLabels };
  });

  const evidence: EvidenceItem[] = violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    nodes: violation.nodes.length,
  }));
  if (multipleLabels.length > 0) {
    evidence.push({
      id: 'form-field-multiple-labels',
      impact: 'moderate',
      nodes: multipleLabels.length,
      selectors: multipleLabels.map((item) => item.selector),
    });
  }

  const issueCount = evidence.length;

  return {
    id: 'sd-a11y-form-labels',
    category: 'accessibility',
    severity: 'error',
    status: issueCount > 0 ? 'fail' : 'pass',
    summary:
      issueCount > 0
        ? `${issueCount} tip(uri) de câmpuri de formular fără etichetare corectă.`
        : 'Toate câmpurile de formular verificate au etichetare corectă.',
    explanation: `Verifică etichetarea câmpurilor de formular pe pagina randată, via axe-core (regulile ${FORM_LABEL_RULES.join(', ')}), plus form-field-multiple-labels prin inspecție directă a DOM-ului (un control asociat cu mai multe elemente <label> e ambiguu pentru tehnologiile asistive).`,
    remediation:
      issueCount > 0
        ? [
            ...violations.map(
              (violation) => `${violation.id}: ${violation.help} (${violation.helpUrl})`,
            ),
            ...(multipleLabels.length > 0
              ? [
                  `form-field-multiple-labels: elimină label-urile în plus pentru: ${multipleLabels.map((item) => item.selector).join(', ')}.`,
                ]
              : []),
          ].join(' | ')
        : 'Nicio acțiune necesară.',
    evidence,
    limitations:
      'Verifică form-field-multiple-labels prin numărarea label-urilor asociate (for/id și încadrare), nu prin axe (care o raportează mereu ca „incomplete”, nu ca „violation”). Verifică doar prezența unui mecanism de etichetare, nu calitatea textului etichetei.',
  };
}
