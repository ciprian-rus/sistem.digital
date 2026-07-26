import { enhanceFileUploads } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/** Wraps a `[data-sd-file-upload]` container around a native `input[type="file"]`. */
export class SdFileUploadAdvancedElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    return enhanceFileUploads({ root: this });
  }
}
