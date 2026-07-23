import Content, { frontmatter } from '../../content/pages/componente.mdx';
import { createDocumentationRoute } from '../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/componente',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/componente.mdx',
});

export const metadata = route.metadata;
export default route.Page;
