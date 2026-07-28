import { enhanceErrorSummaryLinks } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/**
 * Wraps a `.sd-error-summary[data-sd-error-summary]` region and moves focus
 * to a link's target field after the native fragment navigation.
 */
export class SdErrorSummaryElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    const summary = this.querySelector<HTMLElement>('.sd-error-summary');
    if (!summary) return () => {};
    return enhanceErrorSummaryLinks(summary);
  }
}
