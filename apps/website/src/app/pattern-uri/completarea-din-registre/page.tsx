import Content, { frontmatter } from '../../../content/pages/pattern-completarea-din-registre.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/completarea-din-registre',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-completarea-din-registre.mdx',
});

export const metadata = route.metadata;
export default route.Page;
