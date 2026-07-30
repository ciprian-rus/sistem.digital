import { enhanceTooltips } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a `[data-sd-tooltip]` trigger/tooltip pair mounted at `ref`. Without it, the trigger's native `title` still explains the control. */
export function useTooltip<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceTooltips({ root });
  }, [ref]);
}
