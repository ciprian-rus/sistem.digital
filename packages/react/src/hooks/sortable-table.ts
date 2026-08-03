import { enhanceSortableTables } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a `[data-sd-sortable-table]` mounted at `ref` with sorting and filtering. */
export function useSortableTable<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceSortableTables({ root });
  }, [ref]);
}
