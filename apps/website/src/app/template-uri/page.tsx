import Content, { frontmatter } from '../../content/pages/template-uri.mdx';
import { createDocumentationRoute } from '../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/template-uri',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/template-uri.mdx',
});

export const metadata = route.metadata;
export default route.Page;
