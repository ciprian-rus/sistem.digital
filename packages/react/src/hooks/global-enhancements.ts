import {
  enhanceCharacterCount,
  enhanceCookieBanner,
  enhanceExitThisPage,
  enhanceInteractiveComponents,
  enhanceSortableTables,
} from '@sistem-digital/components';
import { useEffect } from 'react';

/**
 * Runs every page-wide progressive enhancement once, defaulting to
 * `document`: accordions, dialogs, tabs, autocomplete, file upload,
 * tooltips, dropdowns, the cookie banner, exit-this-page, character
 * counts and sortable tables. Mirrors what a site typically calls once
 * near the root — the same calls `apps/website`'s own
 * `InteractiveEnhancements` makes by hand.
 */
export function useSistemDigitalEnhancements(): void {
  useEffect(() => {
    const cleanupInteractive = enhanceInteractiveComponents();
    const cleanupCookieBanner = enhanceCookieBanner();
    const cleanupExitThisPage = enhanceExitThisPage();
    const cleanupCharacterCount = enhanceCharacterCount();
    const cleanupSortableTables = enhanceSortableTables();
    return () => {
      cleanupSortableTables();
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
