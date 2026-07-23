declare module '*.mdx' {
  import type { ComponentType } from 'react';

  export const frontmatter: unknown;

  const MDXContent: ComponentType<Record<string, unknown>>;
  export default MDXContent;
}
