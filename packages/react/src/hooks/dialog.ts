import { enhanceDialogs } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a trigger and a `<dialog data-sd-dialog>` mounted at `ref`, wiring show/close/focus-return. */
export function useDialog<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceDialogs({ root });
  }, [ref]);
}
