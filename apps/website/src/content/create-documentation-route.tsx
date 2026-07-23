import type { ComponentType } from 'react';

import { DocumentationPage } from '../components/documentation';
import { createDocumentationMetadata, validateDocumentationFrontmatter } from './documentation';

export function createDocumentationRoute({
  Content,
  pathname,
  rawFrontmatter,
  source,
}: Readonly<{
  Content: ComponentType<Record<string, unknown>>;
  pathname: string;
  rawFrontmatter: unknown;
  source: string;
}>) {
  const frontmatter = validateDocumentationFrontmatter(rawFrontmatter, source);
  const metadata = createDocumentationMetadata(frontmatter);

  function Page() {
    return (
      <DocumentationPage frontmatter={frontmatter} pathname={pathname}>
        <Content />
      </DocumentationPage>
    );
  }

  return { frontmatter, metadata, Page } as const;
}
