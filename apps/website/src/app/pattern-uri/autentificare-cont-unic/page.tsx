import Content, { frontmatter } from '../../../content/pages/pattern-autentificare-cont-unic.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/autentificare-cont-unic',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-autentificare-cont-unic.mdx',
});

export const metadata = route.metadata;
export default route.Page;
