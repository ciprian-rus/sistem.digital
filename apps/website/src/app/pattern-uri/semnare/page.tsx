import Content, { frontmatter } from '../../../content/pages/pattern-semnare.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/semnare',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-semnare.mdx',
});

export const metadata = route.metadata;
export default route.Page;
