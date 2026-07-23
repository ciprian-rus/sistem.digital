import { describe, expect, it } from 'vitest';

import { catalogItems, getCatalogHref } from '../content/catalog';
import { getAvailableSitePaths } from '../content/site-map';
import manifest from './manifest';
import robots from './robots';
import sitemap from './sitemap';

describe('technical SEO routes', () => {
  it('publishes every canonical and catalog route once', () => {
    const urls = sitemap().map((entry) => entry.url);
    const expectedPaths = [
      ...getAvailableSitePaths(),
      ...catalogItems.map((item) => getCatalogHref(item)),
    ];

    expect(new Set(urls).size).toBe(urls.length);
    for (const path of expectedPaths) {
      expect(urls).toContain(new URL(path, 'https://sistem.digital').toString());
    }
  });

  it('allows public pages while excluding collection APIs', () => {
    expect(robots()).toMatchObject({
      rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
      sitemap: 'https://sistem.digital/sitemap.xml',
    });
  });

  it('publishes a Romanian standalone manifest', () => {
    expect(manifest()).toMatchObject({
      name: 'Sistem Digital',
      start_url: '/',
      display: 'standalone',
      lang: 'ro',
    });
  });
});
