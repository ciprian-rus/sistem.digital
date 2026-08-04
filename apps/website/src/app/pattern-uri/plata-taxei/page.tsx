import Content, { frontmatter } from '../../../content/pages/pattern-plata-taxei.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/plata-taxei',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-plata-taxei.mdx',
});

export const metadata = route.metadata;
export default route.Page;
