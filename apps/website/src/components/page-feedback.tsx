import { createPageFeedbackIssueHref } from '../lib/page-feedback';

export function PageFeedback({
  pathname,
  title,
}: Readonly<{
  pathname: string;
  title: string;
}>) {
  const positiveHref = createPageFeedbackIssueHref({
    pathname,
    title,
    value: 'da',
  });
  const negativeHref = createPageFeedbackIssueHref({
    pathname,
    title,
    value: 'nu',
  });

  return (
    <section className="sd-page-feedback" aria-labelledby="page-feedback-title">
      <h2 id="page-feedback-title">A fost utilă această pagină?</h2>
      <div className="sd-button-group">
        <a className="sd-button sd-button--secondary" href={positiveHref}>
          Da
          <span className="sd-visually-hidden"> — deschide un issue GitHub precompletat</span>
        </a>
        <a className="sd-button sd-button--secondary" href={negativeHref}>
          Nu
          <span className="sd-visually-hidden"> — deschide un issue GitHub precompletat</span>
        </a>
      </div>
      <p className="sd-page-feedback__note">
        Linkul deschide un formular GitHub precompletat. Nu transmitem nimic până când alegi să
        publici feedback-ul și îți recomandăm să nu incluzi date personale.
      </p>
    </section>
  );
}
