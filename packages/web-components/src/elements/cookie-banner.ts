import { enhanceCookieBanner } from '@sistem-digital/components';

import { SdEnhancedElement, type Cleanup } from '../base.js';

/**
 * Wraps a `[data-sd-cookie-banner]` section. Reads an optional
 * `storage-key` attribute; without JavaScript the banner stays visible,
 * which is the documented safe default for a consent notice.
 */
export class SdCookieBannerElement extends SdEnhancedElement {
  protected enhance(): Cleanup {
    const storageKey = this.getAttribute('storage-key');
    return enhanceCookieBanner({ root: this, ...(storageKey ? { storageKey } : {}) });
  }
}
