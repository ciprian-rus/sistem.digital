import { describe, expect, it } from 'vitest';

import { tokens, tokenVersion } from './index';

describe('design tokens', () => {
  it('exposes a versioned canonical token set', () => {
    expect(tokenVersion).toMatch(/^0\.1\.0-alpha\./);
    expect(tokens.color.brand[900]).toBe('#002a59');
  });

  it('keeps focus visually distinct from the primary brand surface', () => {
    expect(tokens.color.feedback.focus).not.toBe(tokens.color.brand[900]);
  });
});
