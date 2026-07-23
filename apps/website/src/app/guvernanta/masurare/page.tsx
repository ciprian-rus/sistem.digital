import Content, { frontmatter } from '../../../content/pages/masurare.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/guvernanta/masurare',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/masurare.mdx',
});

export const metadata = route.metadata;
export default route.Page;
