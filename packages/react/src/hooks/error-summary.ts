import { enhanceErrorSummaryLinks } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Moves focus to a link's target field after native fragment navigation, for the `.sd-error-summary` element at `ref`. */
export function useErrorSummary<T extends HTMLElement>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const summary = ref.current;
    if (!summary) return undefined;
    return enhanceErrorSummaryLinks(summary);
  }, [ref]);
}
