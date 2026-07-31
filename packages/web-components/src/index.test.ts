import { describe, expect, it } from 'vitest';

import {
  SdAccordionElement,
  SdAutocompleteElement,
  SdCharacterCountElement,
  SdCookieBannerElement,
  SdDialogElement,
  SdDropdownElement,
  SdEnhancedElement,
  SdErrorSummaryElement,
  SdExitThisPageElement,
  SdFileUploadAdvancedElement,
  SdSortableTableElement,
  SdTabsElement,
  SdTooltipElement,
  defineWebComponents,
  webComponentNames,
} from './index.js';

describe('web components registry', () => {
  it('is importable outside a browser without throwing', () => {
    // Reaching this line already proves it: `extends HTMLElement` at module
    // scope would have thrown at import time in this DOM-less test environment
    // if the base class weren't guarded (mirrors the release pipeline's
    // Node-only ESM/CJS smoke test).
    expect(SdEnhancedElement).toBeTypeOf('function');
  });

  it('publishes every enhancement as a named export', () => {
    const elementClasses = [
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
    ];
    for (const ElementClass of elementClasses) {
      expect(ElementClass.prototype instanceof SdEnhancedElement).toBe(true);
    }
  });

  it('publishes the complete tag name inventory', () => {
    expect(webComponentNames).toEqual([
      'sd-accordion',
      'sd-autocomplete',
      'sd-character-count',
      'sd-cookie-banner',
      'sd-dialog',
      'sd-dropdown',
      'sd-error-summary',
      'sd-exit-this-page',
      'sd-file-upload-advanced',
      'sd-sortable-table',
      'sd-tabs',
      'sd-tooltip',
    ]);
  });

  it('is safe to call outside a browser', () => {
    expect(() => defineWebComponents()).not.toThrow();
  });
});
