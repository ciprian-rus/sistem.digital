import { enhanceCookieBanner } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/**
 * Enhances a `[data-sd-cookie-banner]` section mounted at `ref`. Without
 * JavaScript the banner stays visible, which is the documented safe
 * default for a consent notice.
 */
export function useCookieBanner<T extends Element>(
  ref: RefObject<T | null>,
  storageKey?: string,
): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceCookieBanner({ root, ...(storageKey ? { storageKey } : {}) });
  }, [ref, storageKey]);
}
