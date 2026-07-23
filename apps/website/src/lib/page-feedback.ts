export type PageFeedbackValue = 'da' | 'nu';

export interface PageFeedbackIssueOptions {
  pathname: string;
  title: string;
  value: PageFeedbackValue;
}

const feedbackIssueBase = 'https://github.com/ciprian-rus/sistem.digital/issues/new';

function canonicalPathname(value: string): string {
  const pathname = value.split(/[?#]/u)[0]?.trim() || '/';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

export function createPageFeedbackIssueHref({
  pathname,
  title,
  value,
}: PageFeedbackIssueOptions): string {
  const safePathname = canonicalPathname(pathname);
  const wasUseful = value === 'da';
  const issueTitle = wasUseful
    ? `[Feedback] Pagina este utilă: ${title}`
    : `[Feedback] Îmbunătățire pentru: ${title}`;
  const body = [
    '## Feedback despre pagină',
    '',
    `- Pagină: https://sistem.digital${safePathname}`,
    `- A fost utilă: ${wasUseful ? 'Da' : 'Nu'}`,
    '',
    '## Ce ai vrut să rezolvi?',
    '',
    '<!-- Descrie pe scurt scopul vizitei. -->',
    '',
    '## Ce a funcționat sau ce lipsește?',
    '',
    '<!-- Nu include date personale, parole sau informații confidențiale. -->',
  ].join('\n');
  const parameters = new URLSearchParams({ body, title: issueTitle });
  return `${feedbackIssueBase}?${parameters.toString()}`;
}
