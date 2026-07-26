import { enhanceTabs } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/** Wraps a `[data-sd-tabs]` group. Without enhancement, every panel stays visible. */
export class SdTabsElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceTabs({ root: this });
  }
}
