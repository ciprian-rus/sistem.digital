import { describe, expect, it } from 'vitest';

import { validateDocumentationFrontmatter } from './documentation';

const validFrontmatter = {
  title: 'Exemplu',
  description: 'Descriere clară pentru pagina de documentație.',
  section: 'components',
  status: 'alpha',
  version: '0.1.0-alpha.0',
  updated: '2026-07-23',
  order: 1,
  keywords: ['componentă', 'exemplu'],
};

describe('documentation frontmatter', () => {
  it('accepts the complete editorial contract', () => {
    expect(validateDocumentationFrontmatter(validFrontmatter, 'example.mdx')).toEqual(
      validFrontmatter,
    );
  });

  it('rejects an unknown taxonomy section', () => {
    expect(() =>
      validateDocumentationFrontmatter(
        { ...validFrontmatter, section: 'other' },
        'invalid-section.mdx',
      ),
    ).toThrow(/section/u);
  });

  it('rejects invalid dates and non-integer order values', () => {
    expect(() =>
      validateDocumentationFrontmatter(
        { ...validFrontmatter, updated: '23-07-2026' },
        'invalid-date.mdx',
      ),
    ).toThrow(/YYYY-MM-DD/u);

    expect(() =>
      validateDocumentationFrontmatter({ ...validFrontmatter, order: 1.5 }, 'invalid-order.mdx'),
    ).toThrow(/număr întreg/u);
  });

  it('rejects missing keyword arrays', () => {
    expect(() =>
      validateDocumentationFrontmatter(
        { ...validFrontmatter, keywords: 'componentă' },
        'invalid-keywords.mdx',
      ),
    ).toThrow(/listă de texte/u);
  });
});
