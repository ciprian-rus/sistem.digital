import { describe, expect, it } from 'vitest';

import {
  catalogFamilies,
  catalogItems,
  catalogVersions,
  filterCatalogItems,
  getCatalogHref,
  getCatalogItem,
} from './catalog';

describe('versioned catalog registry', () => {
  it('contains all 44 published components and four foundations', () => {
    expect(catalogItems.filter((item) => item.kind === 'component')).toHaveLength(44);
    expect(catalogItems.filter((item) => item.kind === 'foundation')).toHaveLength(4);
    expect(catalogItems).toHaveLength(48);
  });

  it('uses unique stable IDs and static detail URLs', () => {
    const ids = catalogItems.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(getCatalogHref(getCatalogItem('interactive-dialog')!)).toBe(
      '/componente/catalog/interactive-dialog',
    );
  });

  it('documents one coordinated alpha version', () => {
    expect(catalogVersions).toEqual(['0.1.0-alpha.3']);
    expect(catalogItems.every((item) => item.channel === 'alpha')).toBe(true);
  });

  it('exposes all component families and foundations', () => {
    expect(catalogFamilies).toEqual([
      'content',
      'forms',
      'foundations',
      'interactive',
      'navigation',
    ]);
  });

  it('filters by type, family, status and Romanian text', () => {
    expect(filterCatalogItems({ kind: 'foundation' })).toHaveLength(4);
    expect(filterCatalogItems({ family: 'interactive' })).toHaveLength(7);
    expect(filterCatalogItems({ status: 'alpha' })).toHaveLength(48);
    expect(filterCatalogItems({ query: 'încărcare avansată' })[0]?.id).toBe(
      'interactive-file-upload-advanced',
    );
    expect(filterCatalogItems({ query: 'navigatie mobila' })[0]?.id).toBe(
      'navigation-mobile-navigation',
    );
  });

  it('uses the same trusted markup string for preview and code', () => {
    const dialog = getCatalogItem('interactive-dialog');
    expect(dialog?.markup).toContain('data-sd-dialog');
    expect(dialog?.markup).not.toMatch(/<script|\son[a-z]+\s*=/iu);
  });
});
