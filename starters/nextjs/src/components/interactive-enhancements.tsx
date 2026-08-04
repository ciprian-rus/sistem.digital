'use client';

import { useEffect } from 'react';

// @sistem-digital/react (hook-urile oficiale, ex. useSistemDigitalEnhancements)
// nu este încă publicat pe npm — vezi README.md, secțiunea „De ce nu
// @sistem-digital/react”. Până la publicare, apelăm direct funcția combinată
// din @sistem-digital/components, exact ce ar face hook-ul intern.
export function InteractiveEnhancements() {
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import('@sistem-digital/components').then(({ enhanceInteractiveComponents }) => {
      if (cancelled) return;
      cleanup = enhanceInteractiveComponents();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
