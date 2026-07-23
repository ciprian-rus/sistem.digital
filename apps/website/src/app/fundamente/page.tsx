import Content, { frontmatter } from '../../content/pages/fundamente.mdx';
import { createDocumentationRoute } from '../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/fundamente',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/fundamente.mdx',
});

export const metadata = route.metadata;
export default route.Page;
