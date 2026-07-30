import { enhanceAutocompletes } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a `[data-sd-autocomplete]` input backed by a `<datalist>` baseline, mounted at `ref`. */
export function useAutocomplete<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceAutocompletes({ root });
  }, [ref]);
}
