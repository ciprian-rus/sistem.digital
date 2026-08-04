import Content, { frontmatter } from '../../../content/pages/pattern-notificarea-deciziei.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/notificarea-deciziei',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-notificarea-deciziei.mdx',
});

export const metadata = route.metadata;
export default route.Page;
