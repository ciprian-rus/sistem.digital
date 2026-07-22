import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import { flatTokens, tokenFormat, tokenMetadata, tokens, tokenVersion } from './index';

describe('design tokens', () => {
  it('exposes a versioned, layered DTCG token set', () => {
    expect(tokenVersion).toMatch(/^0\.1\.0-alpha\./);
    expect(tokenFormat).toBe('DTCG 2025.10');
    expect(tokens.core.color.blue[900]).toBe('#002a59');
    expect(tokens.semantic.color.brand[900]).toBe(tokens.core.color.blue[900]);
    expect(tokens.component.button.minHeight).toBe(tokens.semantic.target.minimum);
  });

  it('publishes deterministic metadata and flat token paths', () => {
    expect(tokenMetadata.layers).toEqual(['core', 'semantic', 'component']);
    expect(tokenMetadata.tokenCount).toBeGreaterThan(40);
    expect(tokenMetadata.aliasCount).toBeGreaterThan(20);
    expect(tokenMetadata.sourceHash).toMatch(/^[0-9a-f]{64}$/);
    expect(flatTokens['semantic.color.focus.ring']).toBe('#ffbf47');
  });

  it('preserves the public CSS variables used by framework-free consumers', async () => {
    const css = await readFile(resolve(import.meta.dirname, 'tokens.css'), 'utf8');

    expect(css).toContain('--sd-color-text: #17202a;');
    expect(css).toContain('--sd-color-focus: #ffbf47;');
    expect(css).toContain('--sd-font-sans:');
    expect(css).toContain('--sd-component-button-min-height: 2.75rem;');
  });
});
