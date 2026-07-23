import Content, { frontmatter } from '../../../content/pages/pattern-inainte-sa-incepi.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/inainte-sa-incepi',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-inainte-sa-incepi.mdx',
});

export const metadata = route.metadata;
export default route.Page;
