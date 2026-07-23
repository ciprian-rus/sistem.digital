import Content, { frontmatter } from '../../../content/pages/pattern-transfer-extern.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/transfer-extern',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-transfer-extern.mdx',
});

export const metadata = route.metadata;
export default route.Page;
