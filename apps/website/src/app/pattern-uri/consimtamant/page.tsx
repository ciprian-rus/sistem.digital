import Content, { frontmatter } from '../../../content/pages/pattern-consimtamant.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/consimtamant',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-consimtamant.mdx',
});

export const metadata = route.metadata;
export default route.Page;
