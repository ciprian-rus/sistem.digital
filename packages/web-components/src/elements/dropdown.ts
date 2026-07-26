import { enhanceDropdowns } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/** Wraps a `[data-sd-dropdown]` disclosure button and menu. Without it, the menu stays visible as a plain list. */
export class SdDropdownElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceDropdowns({ root: this });
  }
}
