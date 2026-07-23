import Content, { frontmatter } from '../../content/pages/ghiduri.mdx';
import { createDocumentationRoute } from '../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/ghiduri',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/ghiduri.mdx',
});

export const metadata = route.metadata;
export default route.Page;
