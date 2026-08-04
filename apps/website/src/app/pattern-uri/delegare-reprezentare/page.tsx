import Content, { frontmatter } from '../../../content/pages/pattern-delegare-reprezentare.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/delegare-reprezentare',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-delegare-reprezentare.mdx',
});

export const metadata = route.metadata;
export default route.Page;
