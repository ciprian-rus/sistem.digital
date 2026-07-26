'use client';

import { useEffect } from 'react';

import {
  enhanceCharacterCount,
  enhanceCookieBanner,
  enhanceExitThisPage,
  enhanceInteractiveComponents,
} from '@sistem-digital/components';

export function InteractiveEnhancements() {
  useEffect(() => {
    const cleanupInteractive = enhanceInteractiveComponents();
    const cleanupCookieBanner = enhanceCookieBanner();
    const cleanupExitThisPage = enhanceExitThisPage();
    const cleanupCharacterCount = enhanceCharacterCount();
    return () => {
      cleanupCharacterCount();
      cleanupExitThisPage();
      cleanupCookieBanner();
      cleanupInteractive();
    };
  }, []);
  return null;
}
