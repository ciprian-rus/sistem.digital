import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { contentComponentNames } from './content.js';

describe('content and data components', () => {
  it('publishes the complete MVP inventory', () => {
    expect(contentComponentNames).toEqual([
      'link',
      'external-link',
      'alert',
      'notification-banner',
      'inset-text',
      'card',
      'status-tag',
      'responsive-table',
      'summary-list',
      'details',
      'pagination',
      'metadata',
      'last-updated',
    ]);
  });

  it('keeps semantic and responsive contracts in the public stylesheet', async () => {
    const css = await readFile(resolve(import.meta.dirname, 'content.css'), 'utf8');

    expect(css).toContain('.sd-table-container');
    expect(css).toContain('overflow-x: auto');
    expect(css).toContain('.sd-summary-list__row');
    expect(css).toContain('grid-template-columns: minmax(10rem, 0.8fr)');
    expect(css).toContain('.sd-details summary');
    expect(css).toContain(".sd-pagination [aria-current='page']");
    expect(css).toContain('@media (forced-colors: active)');
    expect(css).toContain('@media print');
  });
});
