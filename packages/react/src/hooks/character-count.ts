import { enhanceCharacterCount } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a `[data-sd-character-count]` field mounted at `ref` with a live remaining-characters count. */
export function useCharacterCount<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceCharacterCount({ root });
  }, [ref]);
}
