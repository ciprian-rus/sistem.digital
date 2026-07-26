import { enhanceAccordions } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/**
 * Wraps a `.sd-accordion[data-sd-accordion="single"]` container. Without
 * `defineWebComponents()`, the wrapped `<details>` elements stay fully
 * functional on their own — this only adds the single-open-panel behavior.
 */
export class SdAccordionElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceAccordions({ root: this });
  }
}
