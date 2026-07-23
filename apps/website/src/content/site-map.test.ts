import { describe, expect, it } from 'vitest';

import {
  getAvailableSitePaths,
  getSiteBreadcrumbs,
  primaryNavigation,
  sitePages,
  siteSections,
} from './site-map';

describe('canonical site map', () => {
  it('uses one unique URL for every page', () => {
    const hrefs = sitePages.map((page) => page.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it('gives every section an available landing page', () => {
    for (const section of siteSections) {
      expect(
        section.pages.some((page) => page.href === section.href && page.status === 'available'),
      ).toBe(true);
    }
  });

  it('derives primary navigation from the section taxonomy', () => {
    expect(primaryNavigation).toEqual(
      siteSections.map((section) => ({
        href: section.href,
        label: section.navigationLabel,
      })),
    );
  });

  it('creates section-aware breadcrumbs for component pages', () => {
    expect(getSiteBreadcrumbs('/componente/interactive')).toEqual([
      { label: 'Acasă', href: '/' },
      { label: 'Componente', href: '/componente' },
      { label: 'Componente interactive' },
    ]);
  });

  it('publishes only available paths', () => {
    const paths = getAvailableSitePaths();
    expect(paths).toContain('/fundamente');
    expect(paths).toContain('/componente/interactive');
    expect(paths).not.toContain('/fundamente/design-tokens');
  });
});
