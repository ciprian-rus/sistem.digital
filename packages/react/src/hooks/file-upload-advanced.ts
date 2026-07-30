import { enhanceFileUploads } from '@sistem-digital/components';
import { useEffect, type RefObject } from 'react';

/** Enhances a `[data-sd-file-upload]` container around a native `input[type="file"]`, mounted at `ref`. */
export function useFileUploadAdvanced<T extends Element>(ref: RefObject<T | null>): void {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    return enhanceFileUploads({ root });
  }, [ref]);
}
