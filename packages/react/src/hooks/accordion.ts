import { enhanceAccordions } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a `.sd-accordion[data-sd-accordion]` container mounted at `ref`. */
export function useAccordion<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceAccordions({ root });
  }, [ref]);
}
