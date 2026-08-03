import { describe, expect, it } from 'vitest';

import {
  componentMaturity,
  getComponentMaturity,
  validateMaturityRegistry,
} from './component-maturity';

function validEntry(overrides: Record<string, unknown> = {}) {
  return {
    id: 'content-example',
    state: 'candidate',
    owner: 'someone',
    since: '2026-08-01',
    lastReviewed: '2026-08-01',
    evidence: ['https://example.test/pr/1'],
    transitions: [
      {
        from: 'experimental',
        to: 'candidate',
        date: '2026-08-01',
        approvedBy: 'someone',
        reason: 'testat manual',
      },
    ],
    ...overrides,
  };
}

describe('component-maturity registry', () => {
  it('validates the current registry successfully at import time', () => {
    // Reaching this line already proves it: import-time validation would have
    // thrown if the real registry (component-maturity-data.mjs) were invalid.
    expect(Array.isArray(componentMaturity)).toBe(true);
  });

  it('looks up an entry by id', () => {
    const entry = componentMaturity[0];
    expect(entry).toBeDefined();
    expect(getComponentMaturity(entry!.id)).toEqual(entry);
    expect(getComponentMaturity('nonexistent-id')).toBeUndefined();
  });

  it('accepts a well-formed entry', () => {
    expect(() => validateMaturityRegistry([validEntry()])).not.toThrow();
  });

  it('rejects an unknown state', () => {
    expect(() => validateMaturityRegistry([validEntry({ state: 'unknown' })])).toThrow(
      /stare invalidă/u,
    );
  });

  it('rejects a transition that skips states', () => {
    expect(() =>
      validateMaturityRegistry([
        validEntry({
          transitions: [
            {
              from: 'proposal',
              to: 'stable',
              date: '2026-08-01',
              approvedBy: 'someone',
              reason: 'skip',
            },
          ],
        }),
      ]),
    ).toThrow(/nu este permisă/u);
  });

  it('rejects retired directly from stable', () => {
    expect(() =>
      validateMaturityRegistry([
        validEntry({
          state: 'retired',
          deprecationReason: 'superseded',
          transitions: [
            {
              from: 'stable',
              to: 'retired',
              date: '2026-08-01',
              approvedBy: 'someone',
              reason: 'skip deprecated',
            },
          ],
        }),
      ]),
    ).toThrow(/nu este permisă/u);
  });

  it('requires an owner for candidate and later states', () => {
    expect(() => validateMaturityRegistry([validEntry({ owner: undefined })])).toThrow(
      /necesită un owner/u,
    );
  });

  it('does not require an owner for proposal or experimental', () => {
    expect(() =>
      validateMaturityRegistry([
        validEntry({
          state: 'experimental',
          owner: undefined,
          lastReviewed: undefined,
          transitions: [
            {
              from: 'proposal',
              to: 'experimental',
              date: '2026-08-01',
              approvedBy: 'someone',
              reason: 'first implementation',
            },
          ],
        }),
      ]),
    ).not.toThrow();
  });

  it('requires a deprecation reason for deprecated and retired', () => {
    expect(() =>
      validateMaturityRegistry([
        validEntry({
          state: 'deprecated',
          transitions: [
            {
              from: 'stable',
              to: 'deprecated',
              date: '2026-08-01',
              approvedBy: 'someone',
              reason: 'superseded',
            },
          ],
        }),
      ]),
    ).toThrow(/deprecationReason/u);
  });

  it('rejects duplicate ids', () => {
    expect(() => validateMaturityRegistry([validEntry(), validEntry()])).toThrow(/id duplicat/u);
  });
});
