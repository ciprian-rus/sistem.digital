import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { iconMarkup, iconNames } from './icons.js';

describe('icon set contract', () => {
  it('publishes the complete icon inventory', () => {
    expect(iconNames).toEqual([
      'info',
      'success',
      'warning',
      'danger',
      'close',
      'chevron-down',
      'search',
      'menu',
      'calendar',
      'download',
      'document',
      'external-link',
    ]);
  });

  it('renders a self-contained, decorative SVG for every icon', () => {
    for (const name of iconNames) {
      const markup = iconMarkup(name);
      expect(markup).toContain('<svg class="sd-icon"');
      expect(markup).toContain('viewBox="0 0 24 24"');
      expect(markup).toContain('aria-hidden="true"');
      expect(markup).toContain('focusable="false"');
      expect(markup).not.toMatch(/<script|\son[a-z]+\s*=/iu);
    }
  });

  it('sizes from a single CSS value, defaulting to the surrounding text', () => {
    expect(iconMarkup('search')).toContain('width="1em" height="1em"');
    expect(iconMarkup('search', { size: '1.5rem' })).toContain('width="1.5rem" height="1.5rem"');
  });

  it('keeps the icon utility class scoped to the shared component layer', async () => {
    const css = await readFile(resolve(import.meta.dirname, 'icons.css'), 'utf8');

    expect(css).toContain('@layer sd-components');
    expect(css).toContain('.sd-icon');
  });
});
