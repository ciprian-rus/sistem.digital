import type { ReactNode } from 'react';

import type { DocumentationFrontmatter, DocumentationStatus } from '../content/documentation';
import { findSiteSection, getSectionNavigation, getSiteBreadcrumbs } from '../content/site-map';
import { CopyCodeButton } from './copy-code';
import { PageFeedback } from './page-feedback';
import { Breadcrumbs, PublicFooter, PublicHeader, ServiceNavigation } from './public-shell';

const statusLabels: Record<DocumentationStatus, string> = {
  alpha: 'Alpha',
  planned: 'Planificat',
  stable: 'Stabil',
};

function formatUpdatedDate(value: string): string {
  return new Intl.DateTimeFormat('ro-RO', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00Z`));
}

export function DocumentationPage({
  children,
  frontmatter,
  pathname,
}: Readonly<{
  children: ReactNode;
  frontmatter: DocumentationFrontmatter;
  pathname: string;
}>) {
  const section = findSiteSection(pathname);
  const sectionItems = getSectionNavigation(pathname).map((page) => ({
    href: page.href,
    label: page.navigationLabel,
  }));

  if (!section) throw new Error(`Nu există o secțiune de documentație pentru ruta ${pathname}.`);

  return (
    <>
      <PublicHeader currentPath={pathname} serviceName="Documentație" />
      <main className="container sd-doc-main" id="continut">
        <Breadcrumbs items={getSiteBreadcrumbs(pathname)} />
        <div className="sd-doc-layout">
          <aside className="sd-doc-sidebar">
            <ServiceNavigation
              currentPath={pathname}
              items={sectionItems}
              title={`În secțiunea ${section.title}`}
            />
          </aside>

          <article className="sd-doc-article">
            <header className="sd-doc-header">
              <p className="section-kicker">{section.title}</p>
              <h1>{frontmatter.title}</h1>
              <p className="sd-doc-lead">{frontmatter.description}</p>
              <dl className="sd-doc-metadata">
                <div>
                  <dt>Stadiu</dt>
                  <dd>
                    <span className={`sd-tag sd-tag--${frontmatter.status}`}>
                      {statusLabels[frontmatter.status]}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt>Versiune</dt>
                  <dd>{frontmatter.version}</dd>
                </div>
                <div>
                  <dt>Actualizat</dt>
                  <dd>
                    <time dateTime={frontmatter.updated}>
                      {formatUpdatedDate(frontmatter.updated)}
                    </time>
                  </dd>
                </div>
              </dl>
            </header>

            <div className="sd-doc-content">{children}</div>
            <PageFeedback pathname={pathname} title={frontmatter.title} />
          </article>
        </div>
      </main>
      <PublicFooter>
        <p>Documentația este versionată împreună cu codul și pachetele Sistem Digital.</p>
      </PublicFooter>
    </>
  );
}

export function Callout({
  children,
  title,
  type = 'info',
}: Readonly<{
  children: ReactNode;
  title: string;
  type?: 'info' | 'success' | 'warning';
}>) {
  return (
    <aside className={`sd-doc-callout sd-doc-callout--${type}`} aria-label={title}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}

export function ComponentStatus({
  status,
  version,
}: Readonly<{ status: DocumentationStatus; version: string }>) {
  return (
    <p className="sd-doc-status">
      <span className={`sd-tag sd-tag--${status}`}>{statusLabels[status]}</span>
      <span>Documentat pentru versiunea {version}</span>
    </p>
  );
}

export function Preview({
  children,
  title = 'Previzualizare',
}: Readonly<{ children: ReactNode; title?: string }>) {
  return (
    <section className="sd-doc-preview" aria-label={title}>
      <div className="sd-doc-preview__label">{title}</div>
      <div className="sd-doc-preview__surface">{children}</div>
    </section>
  );
}

export function CodeExample({
  caption,
  code,
  language = 'html',
}: Readonly<{ caption: string; code: string; language?: string }>) {
  return (
    <figure className="sd-doc-code-example">
      <figcaption>{caption}</figcaption>
      <CopyCodeButton code={code} />
      <pre tabIndex={0} aria-label={`${caption}; cod ${language}`}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}
