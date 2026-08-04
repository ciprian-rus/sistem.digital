import { describe, expect, it } from 'vitest';

import {
  componentPageContent,
  getComponentPageContent,
  validatePageContentRegistry,
} from './component-page-content';

function validEntry(overrides: Record<string, unknown> = {}) {
  return {
    id: 'content-example',
    purpose: 'testează validarea',
    whenToUse: ['când se testează'],
    whenNotToUse: ['când nu se testează'],
    ...overrides,
  };
}

describe('component-page-content registry', () => {
  it('validates the current registry successfully at import time', () => {
    // Reaching this line already proves it: import-time validation would have
    // thrown if the real registry (component-page-content-data.mjs) were invalid.
    expect(Array.isArray(componentPageContent)).toBe(true);
  });

  it('looks up an entry by id', () => {
    const entry = componentPageContent[0];
    expect(entry).toBeDefined();
    expect(getComponentPageContent(entry!.id)).toEqual(entry);
    expect(getComponentPageContent('nonexistent-id')).toBeUndefined();
  });

  it('accepts a minimal well-formed entry with only the required fields', () => {
    expect(() => validatePageContentRegistry([validEntry()])).not.toThrow();
  });

  it('rejects a missing purpose', () => {
    expect(() => validatePageContentRegistry([validEntry({ purpose: '' })])).toThrow(/purpose/u);
  });

  it('rejects an empty whenToUse array', () => {
    expect(() => validatePageContentRegistry([validEntry({ whenToUse: [] })])).toThrow(
      /whenToUse/u,
    );
  });

  it('rejects an empty whenNotToUse array', () => {
    expect(() => validatePageContentRegistry([validEntry({ whenNotToUse: [] })])).toThrow(
      /whenNotToUse/u,
    );
  });

  it('rejects a malformed optional array field', () => {
    expect(() =>
      validatePageContentRegistry([validEntry({ knownIssues: 'not an array' })]),
    ).toThrow(/knownIssues/u);
  });

  it('rejects a malformed history entry', () => {
    expect(() =>
      validatePageContentRegistry([validEntry({ history: [{ version: '1.0.0' }] })]),
    ).toThrow(/history/u);
  });

  it('accepts every optional field when well-formed', () => {
    expect(() =>
      validatePageContentRegistry([
        validEntry({
          anatomy: 'un div',
          variants: ['implicit'],
          states: ['implicit'],
          behavior: 'nimic special',
          contentGuidelines: ['fii clar'],
          accessibilityRef: 'https://example.test/a11y',
          research: ['https://example.test/research'],
          knownIssues: [],
          implementerResponsibilities: ['nimic'],
          history: [{ version: '1.0.0', date: '2026-08-04', change: 'inițial' }],
        }),
      ]),
    ).not.toThrow();
  });

  it('rejects duplicate ids', () => {
    expect(() => validatePageContentRegistry([validEntry(), validEntry()])).toThrow(/id duplicat/u);
  });
});
