import { tokens } from './__generated__/tokens.js';

export {
  flatTokens,
  tokenFormat,
  tokenMetadata,
  tokens,
  tokenVersion,
} from './__generated__/tokens.js';
export {
  accentNames,
  institutionalAccents,
  themeInitScript,
  themeMetadata,
  themeNames,
  themes,
  themeStorageKey,
} from './__generated__/themes.js';

export const coreTokens = tokens.core;
export const semanticTokens = tokens.semantic;
export const componentTokens = tokens.component;

export type { DesignTokens, TokenPath } from './__generated__/tokens.js';
export type { AccentName, ThemeName, ThemeRole } from './__generated__/themes.js';
