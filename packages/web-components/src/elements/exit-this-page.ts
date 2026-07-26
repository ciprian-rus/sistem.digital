import { enhanceExitThisPage } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/** Wraps a `[data-sd-exit-this-page]` link. Without it, the link still leaves the page like any other. */
export class SdExitThisPageElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceExitThisPage({ root: this });
  }
}
