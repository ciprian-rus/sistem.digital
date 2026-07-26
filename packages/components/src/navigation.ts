export const navigationComponentNames = [
  'official-banner',
  'major-alert',
  'institution-header',
  'desktop-navigation',
  'mobile-navigation',
  'breadcrumb',
  'service-navigation',
  'search',
  'footer',
  'skip-link',
  'cookie-banner',
] as const;

export type NavigationComponentName = (typeof navigationComponentNames)[number];

export interface CookieBannerOptions {
  root?: ParentNode;
  storageKey?: string;
}

const defaultCookieConsentStorageKey = 'sd-cookie-consent';

/**
 * Hides a cookie banner once consent was already recorded, and persists
 * consent to localStorage when the accept control is used. Without
 * JavaScript, the banner stays visible on every page load — a safe
 * default for a consent notice, never a false negative.
 */
export function enhanceCookieBanner({
  root,
  storageKey = defaultCookieConsentStorageKey,
}: CookieBannerOptions = {}): () => void {
  const resolvedRoot = root ?? (typeof document === 'undefined' ? null : document);
  if (!resolvedRoot) return () => {};

  const cleanups: Array<() => void> = [];
  for (const banner of resolvedRoot.querySelectorAll<HTMLElement>('[data-sd-cookie-banner]')) {
    const acceptButton = banner.querySelector<HTMLElement>('[data-sd-cookie-accept]');

    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(storageKey);
    } catch {
      stored = null;
    }
    if (stored) {
      banner.hidden = true;
      cleanups.push(() => {
        banner.hidden = false;
      });
      continue;
    }

    const onAccept = () => {
      try {
        window.localStorage.setItem(storageKey, 'accepted');
      } catch {
        // Storage unavailable; the banner simply reappears next visit.
      }
      banner.hidden = true;
    };

    acceptButton?.addEventListener('click', onAccept);
    cleanups.push(() => {
      acceptButton?.removeEventListener('click', onAccept);
      banner.hidden = false;
    });
  }

  return () => {
    for (const cleanup of cleanups.reverse()) cleanup();
  };
}
