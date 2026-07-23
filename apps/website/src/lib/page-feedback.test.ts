import { describe, expect, it } from 'vitest';

import { createPageFeedbackIssueHref } from './page-feedback';

describe('page feedback issue links', () => {
  it('creates a prefilled issue without sending data automatically', () => {
    const url = new URL(
      createPageFeedbackIssueHref({
        pathname: '/ghiduri',
        title: 'Ghiduri de implementare',
        value: 'nu',
      }),
    );

    expect(url.origin).toBe('https://github.com');
    expect(url.pathname).toBe('/ciprian-rus/sistem.digital/issues/new');
    expect(url.searchParams.get('title')).toContain('Îmbunătățire');
    expect(url.searchParams.get('body')).toContain('https://sistem.digital/ghiduri');
    expect(url.searchParams.get('body')).toContain('A fost utilă: Nu');
  });

  it('removes query parameters and fragments from the reported page', () => {
    const url = new URL(
      createPageFeedbackIssueHref({
        pathname: '/cautare?q=date#rezultate',
        title: 'Căutare',
        value: 'da',
      }),
    );

    expect(url.searchParams.get('body')).toContain('https://sistem.digital/cautare');
    expect(url.searchParams.get('body')).not.toContain('?q=date');
  });
});
