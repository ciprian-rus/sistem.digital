import Content, { frontmatter } from '../../content/pages/guvernanta.mdx';
import { createDocumentationRoute } from '../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/guvernanta',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/guvernanta.mdx',
});

export const metadata = route.metadata;
export default route.Page;
