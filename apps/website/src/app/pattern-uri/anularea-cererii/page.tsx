import Content, { frontmatter } from '../../../content/pages/pattern-anularea-cererii.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/anularea-cererii',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-anularea-cererii.mdx',
});

export const metadata = route.metadata;
export default route.Page;
