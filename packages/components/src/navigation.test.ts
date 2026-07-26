import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { enhanceCookieBanner, enhanceExitThisPage, navigationComponentNames } from './navigation';

describe('navigation component contract', () => {
  it('publishes the complete navigation MVP inventory', () => {
    expect(navigationComponentNames).toEqual([
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
    ]);
  });

  it('uses native disclosure and search markup without JavaScript dependencies', async () => {
    const css = await readFile(resolve(import.meta.dirname, 'navigation.css'), 'utf8');

    expect(css).toContain('.sd-mobile-navigation summary');
    expect(css).toContain('.sd-search__input');
    expect(css).toContain('.sd-primary-navigation a[aria-current=');
    expect(css).toContain('@media (forced-colors: active)');
    expect(css).toContain('@media print');
  });

  it('is safe during server-side rendering', () => {
    const cleanup = enhanceCookieBanner();
    expect(cleanup).toBeTypeOf('function');
    expect(() => cleanup()).not.toThrow();
  });

  it('exit-this-page enhancement is safe during server-side rendering', () => {
    const cleanup = enhanceExitThisPage();
    expect(cleanup).toBeTypeOf('function');
    expect(() => cleanup()).not.toThrow();
  });
});
