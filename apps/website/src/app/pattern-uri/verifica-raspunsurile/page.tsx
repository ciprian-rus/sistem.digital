import Content, { frontmatter } from '../../../content/pages/pattern-verifica-raspunsurile.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/verifica-raspunsurile',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-verifica-raspunsurile.mdx',
});

export const metadata = route.metadata;
export default route.Page;
