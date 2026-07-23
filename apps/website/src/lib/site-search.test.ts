import { describe, expect, it } from 'vitest';

import { normalizeSearchText, searchSite } from './site-search';

describe('site search', () => {
  it('normalizes Romanian diacritics and punctuation', () => {
    expect(normalizeSearchText(' Căutare, NAVIGAȚIE! ')).toBe('cautare navigatie');
  });

  it('finds the navigation family without diacritics', () => {
    expect(searchSite('navigatie structura')[0]?.href).toBe('/componente/navigatie');
  });

  it('finds content and data documentation by public concepts', () => {
    expect(searchSite('tabel status')[0]?.href).toBe('/componente/continut-date');
    expect(searchSite('conținut')[0]?.href).toBe('/componente/continut-date');
  });

  it('finds individual versioned catalog entries', () => {
    expect(searchSite('autocomplete')[0]?.href).toBe(
      '/componente/catalog/interactive-autocomplete',
    );
    expect(searchSite('rezumatul erorilor')[0]?.href).toBe(
      '/componente/catalog/forms-error-summary',
    );
    expect(searchSite('teme funcționale')[0]?.href).toBe('/componente/catalog/foundation-themes');
    expect(searchSite('enhanceDialogs')[0]?.href).toBe('/componente/catalog/interactive-dialog');
  });

  it('keeps family pages for broad multi-component queries', () => {
    expect(searchSite('dialog tabs')[0]?.href).toBe('/componente/interactive');
  });

  it('indexes all top-level documentation categories', () => {
    expect(searchSite('fundamente')[0]?.href).toBe('/fundamente');
    expect(searchSite('template starter')[0]?.href).toBe('/template-uri');
    expect(searchSite('ghid adopție')[0]?.href).toBe('/ghiduri');
    expect(searchSite('confidențialitate retenție')[0]?.href).toBe('/guvernanta/masurare');
  });

  it('uses Romanian public-language synonyms without replacing direct matches', () => {
    expect(searchSite('șablon')[0]?.href).toBe('/template-uri');
    expect(searchSite('antet').some((entry) => entry.href === '/componente/navigatie')).toBe(true);
    expect(searchSite('subsol').some((entry) => entry.title === 'Footer')).toBe(true);
  });

  it('filters results by the canonical content section', () => {
    expect(searchSite('dialog', { section: 'guides' })).toEqual([]);
    expect(searchSite('dialog', { section: 'components' }).length).toBeGreaterThan(0);
    expect(
      searchSite('fundamente', { section: 'foundations' }).every(
        (entry) => entry.section === 'foundations',
      ),
    ).toBe(true);
  });

  it('requires all query concepts', () => {
    expect(searchSite('formular eroare')[0]?.href).toBe('/componente/formulare');
    expect(searchSite('formular roadmap')).toEqual([]);
  });

  it('ignores empty and one-character queries', () => {
    expect(searchSite('')).toEqual([]);
    expect(searchSite('a')).toEqual([]);
  });

  it('ranks title matches before keyword-only matches', () => {
    const results = searchSite('fundamente');
    expect(results[0]?.title).toBe('Fundamentele Sistem Digital');
  });
});
