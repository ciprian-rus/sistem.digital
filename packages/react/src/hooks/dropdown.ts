import { enhanceDropdowns } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a `[data-sd-dropdown]` disclosure button and menu mounted at `ref`. */
export function useDropdown<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceDropdowns({ root });
  }, [ref]);
}
