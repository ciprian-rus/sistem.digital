import { enhanceAutocompletes } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/** Wraps a `[data-sd-autocomplete]` input backed by a `<datalist>` baseline. */
export class SdAutocompleteElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceAutocompletes({ root: this });
  }
}
