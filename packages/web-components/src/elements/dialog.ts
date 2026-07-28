import { enhanceDialogs } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/** Wraps a trigger and a `<dialog data-sd-dialog>` and wires the show/close/focus-return behavior. */
export class SdDialogElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceDialogs({ root: this });
  }
}
