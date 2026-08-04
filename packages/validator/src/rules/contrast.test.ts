import { describe, expect, it } from 'vitest';

import { checkContrast, contrastRatio } from './contrast.js';

describe('contrastRatio', () => {
  it('returns 21 for black on white, the maximum possible ratio', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 1);
  });

  it('returns 1 for identical colors', () => {
    expect(contrastRatio('#1d79bf', '#1d79bf')).toBeCloseTo(1, 5);
  });

  it('is symmetric regardless of argument order', () => {
    expect(contrastRatio('#17202a', '#ffffff')).toBeCloseTo(contrastRatio('#ffffff', '#17202a'), 5);
  });

  it('rejects invalid hex values', () => {
    expect(() => contrastRatio('blue', '#ffffff')).toThrow();
    expect(() => contrastRatio('#fff', '#ffffff')).toThrow();
  });
});

describe('checkContrast', () => {
  it('reports not-applicable when no pairs are given', () => {
    const result = checkContrast([]);
    expect(result.status).toBe('not-applicable');
  });

  it('passes when every pair meets its threshold', () => {
    const result = checkContrast([
      { id: 'text/page', foreground: '#17202a', background: '#ffffff', required: 4.5 },
    ]);
    expect(result.status).toBe('pass');
  });

  it('fails when a pair is below its threshold, with evidence', () => {
    const result = checkContrast([
      { id: 'muted/page', foreground: '#c7cdd4', background: '#ffffff', required: 4.5 },
    ]);
    expect(result.status).toBe('fail');
    expect(result.evidence).toEqual([expect.objectContaining({ id: 'muted/page', required: 4.5 })]);
  });
});
