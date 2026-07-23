import Content, { frontmatter } from '../../../content/pages/pattern-status-confirmare-reluare.mdx';
import { createDocumentationRoute } from '../../../content/create-documentation-route';

const route = createDocumentationRoute({
  Content,
  pathname: '/pattern-uri/status-confirmare-reluare',
  rawFrontmatter: frontmatter,
  source: 'src/content/pages/pattern-status-confirmare-reluare.mdx',
});

export const metadata = route.metadata;
export default route.Page;
