import { withPage, type BrowserOptions } from '../browser-utils.js';
import type { RuleResult } from '../types.js';

export interface FocusVisibleCheckOptions extends BrowserOptions {
  /** Numărul maxim de elemente verificate, pentru pagini foarte mari. Implicit 50. */
  maxElements?: number;
}

interface FocusCheckItem {
  selector: string;
  hasVisibleIndicator: boolean;
}

const FOCUSABLE_SELECTOR =
  'a[href], button, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';
const DEFAULT_MAX_ELEMENTS = 50;

async function collectFocusIndicators(
  url: string,
  options: BrowserOptions,
  maxElements: number,
): Promise<FocusCheckItem[]> {
  return withPage(options, async (page) => {
    await page.goto(url, { waitUntil: 'networkidle' });

    return await page.evaluate(
      ({ selector, cap }) => {
        function describe(element: Element, index: number): string {
          const tag = element.tagName.toLowerCase();
          const id = (element as HTMLElement).id;
          return id ? `${tag}#${id}` : `${tag}:nth-match(${index + 1})`;
        }

        // Proprietățile verificate acoperă mecanismele reale de indicator de
        // focus din acest sistem de design: outline+box-shadow (majoritatea
        // componentelor) și transform (sd-skip-link, ascuns până la focus,
        // fără outline/box-shadow proprii pe stare).
        function snapshot(element: Element): string {
          const style = getComputedStyle(element);
          return [
            style.outlineWidth,
            style.outlineStyle,
            style.outlineColor,
            style.boxShadow,
            style.borderTopWidth,
            style.borderTopStyle,
            style.borderTopColor,
            style.backgroundColor,
            style.color,
            style.transform,
          ].join('|');
        }

        const previouslyFocused = document.activeElement;
        const elements = Array.from(document.querySelectorAll(selector))
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
          })
          .slice(0, cap);

        const results = elements.map((element, index) => {
          const before = snapshot(element);
          (element as HTMLElement).focus();
          const after = snapshot(element);
          (element as HTMLElement).blur();
          return { selector: describe(element, index), hasVisibleIndicator: before !== after };
        });

        if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
        return results;
      },
      { selector: FOCUSABLE_SELECTOR, cap: maxElements },
    );
  });
}

/**
 * Regula sd-a11y-focus-visible: euristică best-effort pentru indicatorul
 * vizibil de focus — singura sub-categorie din lista inițială de verificări
 * a #25 documentată explicit ca neautomatizabilă în
 * docs/product/validator-rules-inventory.md ("nu are verificare automată
 * dedicată, doar teste manuale de tastatură"). Nu înlocuiește testarea
 * manuală cu tastatura — vezi `limitations`.
 */
export async function checkFocusVisible(
  url: string,
  options: FocusVisibleCheckOptions = {},
): Promise<RuleResult> {
  const maxElements = options.maxElements ?? DEFAULT_MAX_ELEMENTS;
  const items = await collectFocusIndicators(url, options, maxElements);
  const withoutIndicator = items.filter((item) => !item.hasVisibleIndicator);

  return {
    id: 'sd-a11y-focus-visible',
    category: 'accessibility',
    severity: 'warning',
    status: items.length === 0 ? 'not-applicable' : withoutIndicator.length > 0 ? 'warn' : 'pass',
    summary:
      items.length === 0
        ? 'Niciun element focusabil găsit pe pagină.'
        : withoutIndicator.length > 0
          ? `${withoutIndicator.length} din ${items.length} elemente focusabile nu au un indicator de focus vizibil detectabil.`
          : `Toate cele ${items.length} elemente focusabile verificate au un indicator de focus vizibil detectabil.`,
    explanation:
      'Focusează programatic fiecare element interactiv vizibil de pe pagină și compară stilul calculat (outline, box-shadow, bordură, fundal, culoare text, transform) înainte și după — dacă nimic nu se schimbă, elementul nu pare să aibă un indicator de focus vizibil.',
    remediation:
      withoutIndicator.length > 0
        ? `Adaugă un stil vizibil la :focus-visible pentru: ${withoutIndicator.map((item) => item.selector).join(', ')}.`
        : 'Nicio acțiune necesară.',
    evidence: items,
    limitations:
      'Euristică best-effort, nu o verificare completă — nu există o metodă automată robustă (vezi docs/product/validator-rules-inventory.md). Compară doar un set fix de proprietăți CSS; un indicator realizat prin alte proprietăți (de exemplu filtru, animație) ar putea produce fals-pozitiv. Folosește focus programatic (.focus()), nu tastatură reală — verificat empiric să declanșeze :focus-visible în Chromium, dar tot nu echivalează cu testarea manuală. Fiind severitate "warning", nu blochează CI.',
  };
}
