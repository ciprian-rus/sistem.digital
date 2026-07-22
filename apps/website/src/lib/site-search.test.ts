import { describe, expect, it } from 'vitest';

import { normalizeSearchText, searchSite } from './site-search';

describe('site search', () => {
  it('normalizes Romanian diacritics and punctuation', () => {
    expect(normalizeSearchText(' Căutare, NAVIGAȚIE! ')).toBe('cautare navigatie');
  });

  it('finds the navigation page without diacritics', () => {
    expect(searchSite('navigatie')[0]?.href).toBe('/componente/navigatie');
  });

  it('finds content and data components by their public concepts', () => {
    expect(searchSite('tabel status')[0]?.href).toBe('/componente/continut-date');
    expect(searchSite('conținut')[0]?.href).toBe('/componente/continut-date');
  });

  it('finds interactive components by ARIA pattern names', () => {
    expect(searchSite('dialog tabs')[0]?.href).toBe('/componente/interactive');
    expect(searchSite('autocomplete')[0]?.href).toBe('/componente/interactive');
  });

  it('requires all query terms', () => {
    expect(searchSite('formular eroare')[0]?.href).toBe('/componente/formulare');
    expect(searchSite('formular roadmap')).toEqual([]);
  });

  it('ignores empty and one-character queries', () => {
    expect(searchSite('')).toEqual([]);
    expect(searchSite('a')).toEqual([]);
  });

  it('ranks title matches before keyword-only matches', () => {
    const results = searchSite('teme');
    expect(results[0]?.title).toBe('Teme funcționale');
  });
});
