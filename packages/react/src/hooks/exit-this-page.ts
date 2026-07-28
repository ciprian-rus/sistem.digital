import { enhanceExitThisPage } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a `[data-sd-exit-this-page]` link mounted at `ref` with the click/triple-Shift emergency exit. */
export function useExitThisPage<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceExitThisPage({ root });
  }, [ref]);
}
