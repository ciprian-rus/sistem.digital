import {
  enhanceCharacterCount,
  enhanceCookieBanner,
  enhanceExitThisPage,
  enhanceInteractiveComponents,
} from '@sistem-digital/components';
import { useEffect } from 'react';

/**
 * Runs every page-wide progressive enhancement once, defaulting to
 * `document`: accordions, dialogs, tabs, autocomplete, file upload,
 * tooltips, dropdowns, the cookie banner, exit-this-page and character
 * counts. Mirrors what a site typically calls once near the root — the
 * same four calls `apps/website`'s own `InteractiveEnhancements` makes by
 * hand.
 */
export function useSistemDigitalEnhancements(): void {
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
}

/** Component form of {@link useSistemDigitalEnhancements}, for consumers who mount enhancements via JSX rather than a hook. Renders nothing. */
export function GlobalEnhancements(): null {
  useSistemDigitalEnhancements();
  return null;
}
