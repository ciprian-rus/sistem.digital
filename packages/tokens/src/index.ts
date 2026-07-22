import { tokens } from './__generated__/tokens';

export {
  flatTokens,
  tokenFormat,
  tokenMetadata,
  tokens,
  tokenVersion,
} from './__generated__/tokens';

export const coreTokens = tokens.core;
export const semanticTokens = tokens.semantic;
export const componentTokens = tokens.component;

export type { DesignTokens, TokenPath } from './__generated__/tokens';
