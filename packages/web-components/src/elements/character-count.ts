import { enhanceCharacterCount } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/** Wraps a `[data-sd-character-count]` field. Without it, only the static hint written in markup is shown. */
export class SdCharacterCountElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceCharacterCount({ root: this });
  }
}
