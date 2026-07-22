import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

import {
  accentNames,
  flatTokens,
  institutionalAccents,
  themeInitScript,
  themeMetadata,
  themeNames,
  themes,
  themeStorageKey,
  tokenFormat,
  tokenMetadata,
  tokens,
  tokenVersion,
} from './index';

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

describe('official themes', () => {
  it('publishes four themes with an identical semantic role contract', () => {
    expect(themeNames).toEqual([
      'light',
      'dark',
      'high-contrast-light',
      'high-contrast-dark',
    ]);
    expect(themeMetadata.themeCount).toBe(4);
    expect(themeMetadata.requiredRoleCount).toBe(39);
    expect(themeMetadata.contrastPairCount).toBe(18);
    expect(themeMetadata.sourceHash).toMatch(/^[0-9a-f]{64}$/);

    const roleCounts = themeNames.map((name) => Object.keys(themes[name].roles).length);
    expect(new Set(roleCounts)).toEqual(new Set([39]));
    expect(themes.dark.colorScheme).toBe('dark');
    expect(themes['high-contrast-light'].roles['text.default']).toBe('#000000');
  });

  it('publishes only validated institutional accent presets', () => {
    expect(accentNames).toEqual(['blue', 'teal', 'burgundy', 'purple']);
    expect(institutionalAccents.teal.default).toBe('#00695c');
    expect(institutionalAccents.burgundy.active).toBe('#681127');
  });

  it('provides an initialization script and forced-colors fallback', async () => {
    const css = await readFile(resolve(import.meta.dirname, 'themes.css'), 'utf8');
    const standaloneScript = await readFile(resolve(import.meta.dirname, 'theme-init.js'), 'utf8');

    expect(themeStorageKey).toBe('sd-theme');
    expect(themeInitScript).toContain('prefers-color-scheme: dark');
    expect(themeInitScript).toContain('dataset.sdTheme');
    expect(standaloneScript).toContain(themeInitScript);
    expect(css).toContain('[data-sd-theme="dark"]');
    expect(css).toContain('[data-sd-accent="teal"]');
    expect(css).toContain('@media (forced-colors: active)');
    expect(css).toContain('--sd-color-link-visited: VisitedText;');
  });
});
