import Content, { frontmatter } from '../../../content/pages/pattern-contestarea-deciziei.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/contestarea-deciziei',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-contestarea-deciziei.mdx',
});

export const metadata = route.metadata;
export default route.Page;
