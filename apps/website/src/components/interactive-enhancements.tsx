'use client';

import { useEffect } from 'react';

import { enhanceCookieBanner, enhanceInteractiveComponents } from '@sistem-digital/components';

export function InteractiveEnhancements() {
  useEffect(() => {
    const cleanupInteractive = enhanceInteractiveComponents();
    const cleanupCookieBanner = enhanceCookieBanner();
    return () => {
      cleanupCookieBanner();
      cleanupInteractive();
    };
  }, []);
  return null;
}
