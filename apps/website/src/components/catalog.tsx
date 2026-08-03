import type { ReactNode } from 'react';

import type { CatalogItem } from '../content/catalog';
import { getCatalogHref } from '../content/catalog';
import type { ComponentMaturityMetadata } from '../content/component-maturity';
import { getComponentMaturity } from '../content/component-maturity';
import { CodeExample } from './documentation';

const kindLabels = {
  component: 'Componentă',
  foundation: 'Fundament',
} as const;

const statusLabels = {
  alpha: 'Alpha',
  deprecated: 'Depreciat',
  stable: 'Stabil',
} as const;

const maturityStateLabels: Record<ComponentMaturityMetadata['state'], string> = {
  proposal: 'Propunere',
  experimental: 'Experimental',
  candidate: 'Candidat',
  stable: 'Stabil',
  deprecated: 'Depreciat',
  retired: 'Retras',
};

export function CatalogStatus({ item }: Readonly<{ item: CatalogItem }>) {
  return (
    <div className="sd-catalog-status" aria-label="Starea intrării">
      <span className={`sd-tag sd-tag--${item.status}`}>{statusLabels[item.status]}</span>
      <span>{kindLabels[item.kind]}</span>
      <span>{item.familyTitle}</span>
    </div>
  );
}

export function CatalogMaturity({ item }: Readonly<{ item: CatalogItem }>) {
  const maturity = getComponentMaturity(item.id);
  if (!maturity) return null;

  return (
    <section className="sd-catalog-detail__section" aria-labelledby="catalog-maturity-title">
      <h2 id="catalog-maturity-title">Maturitate</h2>
      <p>
        Guvernanța acestei componente, conform{' '}
        <a
          className="sd-link"
          href="https://github.com/ciprian-rus/sistem.digital/blob/main/docs/governance/component-maturity-model.md"
        >
          modelului de maturitate pe șase stări
        </a>
        . Acest câmp este independent de stadiul de distribuție ({statusLabels[item.status]}) de mai
        sus.
      </p>
      <dl className="sd-doc-metadata sd-catalog-detail__metadata">
        <div>
          <dt>Stare</dt>
          <dd>{maturityStateLabels[maturity.state]}</dd>
        </div>
        <div>
          <dt>Responsabil</dt>
          <dd>{maturity.owner || 'Nedesemnat'}</dd>
        </div>
        <div>
          <dt>Ultima evaluare</dt>
          <dd>
            {maturity.lastReviewed ? (
              <time dateTime={maturity.lastReviewed}>{maturity.lastReviewed}</time>
            ) : (
              'Neevaluat'
            )}
          </dd>
        </div>
      </dl>
      {maturity.deprecationReason ? (
        <p>
          <strong>Motivul deprecierii/retragerii: </strong>
          {maturity.deprecationReason}
        </p>
      ) : null}
      {maturity.evidence.length > 0 ? (
        <>
          <h3>Dovezi</h3>
          <ul>
            {maturity.evidence.map((link) => (
              <li key={link}>
                <a className="sd-link sd-link--external" href={link}>
                  {link}
                  <span className="sd-visually-hidden"> (site extern)</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}

export function CatalogPreview({ item }: Readonly<{ item: CatalogItem }>) {
  return (
    <section
      className="sd-doc-preview sd-catalog-preview"
      aria-label={`Previzualizare ${item.title}`}
    >
      <div className="sd-doc-preview__label">Previzualizare din markup-ul canonic</div>
      <div
        className="sd-doc-preview__surface"
        // Registry-ul este cod intern versionat și verificat de scripts/check-catalog.mjs.
        dangerouslySetInnerHTML={{ __html: item.markup }}
      />
    </section>
  );
}

export function CatalogCard({ item }: Readonly<{ item: CatalogItem }>) {
  return (
    <article className="sd-card sd-catalog-card">
      <CatalogStatus item={item} />
      <h2 className="sd-card__heading">
        <a className="sd-card__link" href={getCatalogHref(item)}>
          {item.title}
        </a>
      </h2>
      <p className="sd-card__description">{item.description}</p>
      <dl className="sd-catalog-card__metadata">
        <div>
          <dt>Pachet</dt>
          <dd>
            <code>{item.packageName}</code>
          </dd>
        </div>
        <div>
          <dt>Versiune</dt>
          <dd>{item.version}</dd>
        </div>
      </dl>
    </article>
  );
}

export function CatalogImportExamples({ item }: Readonly<{ item: CatalogItem }>) {
  const cssCode = `@import '${item.cssImport}';`;
  const jsCode =
    item.jsImports.length > 0
      ? `import { ${item.jsImports.join(', ')} } from '${item.packageName}';`
      : '';

  return (
    <div className="sd-catalog-code-stack">
      <CodeExample caption="Import CSS" language="css" code={cssCode} />
      {jsCode ? (
        <CodeExample caption="Import JavaScript opțional" language="ts" code={jsCode} />
      ) : null}
      <CodeExample caption="Markup canonic" language="html" code={item.markup} />
    </div>
  );
}

export function CatalogEmptyState({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <section className="sd-inset-text sd-catalog-empty" aria-labelledby="catalog-empty-title">
      <h2 id="catalog-empty-title">Nu există rezultate pentru filtrele alese</h2>
      <p>Elimină un filtru sau caută un termen mai general.</p>
      {children}
    </section>
  );
}
