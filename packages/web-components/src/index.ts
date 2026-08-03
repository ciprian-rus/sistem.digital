import { SdAccordionElement } from './elements/accordion.js';
import { SdAutocompleteElement } from './elements/autocomplete.js';
import { SdCharacterCountElement } from './elements/character-count.js';
import { SdCookieBannerElement } from './elements/cookie-banner.js';
import { SdDialogElement } from './elements/dialog.js';
import { SdDropdownElement } from './elements/dropdown.js';
import { SdErrorSummaryElement } from './elements/error-summary.js';
import { SdExitThisPageElement } from './elements/exit-this-page.js';
import { SdFileUploadAdvancedElement } from './elements/file-upload-advanced.js';
import { SdSortableTableElement } from './elements/sortable-table.js';
import { SdTabsElement } from './elements/tabs.js';
import { SdTooltipElement } from './elements/tooltip.js';

export {
  SdAccordionElement,
  SdAutocompleteElement,
  SdCharacterCountElement,
  SdCookieBannerElement,
  SdDialogElement,
  SdDropdownElement,
  SdErrorSummaryElement,
  SdExitThisPageElement,
  SdFileUploadAdvancedElement,
  SdSortableTableElement,
  SdTabsElement,
  SdTooltipElement,
};
export { SdEnhancedElement, type Cleanup } from './base.js';

const registry: ReadonlyArray<readonly [string, CustomElementConstructor]> = [
  ['sd-accordion', SdAccordionElement],
  ['sd-autocomplete', SdAutocompleteElement],
  ['sd-character-count', SdCharacterCountElement],
  ['sd-cookie-banner', SdCookieBannerElement],
  ['sd-dialog', SdDialogElement],
  ['sd-dropdown', SdDropdownElement],
  ['sd-error-summary', SdErrorSummaryElement],
  ['sd-exit-this-page', SdExitThisPageElement],
  ['sd-file-upload-advanced', SdFileUploadAdvancedElement],
  ['sd-sortable-table', SdSortableTableElement],
  ['sd-tabs', SdTabsElement],
  ['sd-tooltip', SdTooltipElement],
];

export const webComponentNames = registry.map(([name]) => name);

/**
 * Registers every element with `customElements.define`, skipping any name
 * already defined. Safe to call more than once and safe to import outside a
 * browser — it no-ops when `customElements` doesn't exist (SSR, Node).
 *
 * Registration is opt-in and separate from import on purpose: every element
 * is a pure enhancement over markup that already works without it, so a
 * consumer who only wants the classes (for a custom registry, a different
 * tag prefix, or a subset) never pays for elements they didn't ask to run.
 */
export function defineWebComponents(): void {
  if (typeof customElements === 'undefined') return;
  for (const [name, ElementClass] of registry) {
    if (!customElements.get(name)) customElements.define(name, ElementClass);
  }
}
