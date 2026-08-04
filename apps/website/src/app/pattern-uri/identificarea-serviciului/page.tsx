import Content, { frontmatter } from '../../../content/pages/pattern-identificarea-serviciului.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/identificarea-serviciului',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-identificarea-serviciului.mdx',
});

export const metadata = route.metadata;
export default route.Page;
