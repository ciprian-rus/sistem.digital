import { enhanceTabs } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a `[data-sd-tabs]` group mounted at `ref`. Without it, every panel stays visible. */
export function useTabs<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceTabs({ root });
  }, [ref]);
}
