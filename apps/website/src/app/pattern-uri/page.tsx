import Content, { frontmatter } from '../../content/pages/pattern-uri.mdx';
import { createDocumentationRoute } from '../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-uri.mdx',
});

export const metadata = route.metadata;
export default route.Page;
