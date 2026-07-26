import { enhanceTooltips } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/** Wraps a `[data-sd-tooltip]` trigger and tooltip pair. Without it, the trigger's native `title` still explains the control. */
export class SdTooltipElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceTooltips({ root: this });
  }
}
