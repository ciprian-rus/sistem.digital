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
  'phase-banner',
  'back-to-top-link',
  'exit-this-page',
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

export interface ExitThisPageOptions {
  root?: ParentNode;
  /** Number of consecutive Shift presses that trigger the emergency exit. */
  pressCount?: number;
  /** Milliseconds allowed between presses before the count resets. */
  pressWindowMs?: number;
}

/**
 * Without JavaScript, the exit link is a real anchor and leaving the page
 * works exactly as it would anywhere else. With JavaScript, clicking it (or
 * pressing Shift three times in a row) replaces the current history entry
 * instead of pushing a new one, so the back button cannot return here.
 */
export function enhanceExitThisPage({
  root,
  pressCount: requiredPresses = 3,
  pressWindowMs = 1000,
}: ExitThisPageOptions = {}): () => void {
  const resolvedRoot = root ?? (typeof document === 'undefined' ? null : document);
  if (!resolvedRoot) return () => {};

  const links = [...resolvedRoot.querySelectorAll<HTMLAnchorElement>('[data-sd-exit-this-page]')];
  if (links.length === 0) return () => {};

  const exit = () => {
    const href = links[0]?.getAttribute('href');
    if (href) window.location.replace(href);
  };

  const onClick = (event: MouseEvent) => {
    event.preventDefault();
    exit();
  };
  for (const link of links) link.addEventListener('click', onClick);

  let shiftPresses = 0;
  let resetTimer: number | undefined;
  const onKeyUp = (event: KeyboardEvent) => {
    if (event.key !== 'Shift') {
      shiftPresses = 0;
      return;
    }
    shiftPresses += 1;
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => {
      shiftPresses = 0;
    }, pressWindowMs);
    if (shiftPresses >= requiredPresses) {
      shiftPresses = 0;
      exit();
    }
  };
  document.addEventListener('keyup', onKeyUp);

  return () => {
    for (const link of links) link.removeEventListener('click', onClick);
    document.removeEventListener('keyup', onKeyUp);
    window.clearTimeout(resetTimer);
  };
}
