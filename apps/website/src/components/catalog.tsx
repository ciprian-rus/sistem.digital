import type { ReactNode } from 'react';

import type { CatalogItem } from '../content/catalog';
import { getCatalogHref } from '../content/catalog';
import type { ComponentMaturityMetadata } from '../content/component-maturity';
import { getComponentMaturity } from '../content/component-maturity';
import { getComponentPageContent } from '../content/component-page-content';
import { getDesignCodeMatrix } from '../content/design-code-matrix';
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

function ListSection({ heading, items }: Readonly<{ heading: string; items: readonly string[] }>) {
  if (items.length === 0) return null;
  return (
    <>
      <h3>{heading}</h3>
      <ul>
        {items.map((text) => (
          <li key={text}>{text}</li>
        ))}
      </ul>
    </>
  );
}

export function CatalogPageContent({ item }: Readonly<{ item: CatalogItem }>) {
  const content = getComponentPageContent(item.id);
  if (!content) return null;

  return (
    <section className="sd-catalog-detail__section" aria-labelledby="catalog-page-content-title">
      <h2 id="catalog-page-content-title">Prezentare</h2>
      <p>{content.purpose}</p>
      <ListSection heading="Când se folosește" items={content.whenToUse} />
      <ListSection heading="Când nu se folosește" items={content.whenNotToUse} />
      {content.anatomy ? (
        <>
          <h3>Anatomie</h3>
          <p>{content.anatomy}</p>
        </>
      ) : null}
      <ListSection heading="Variante" items={content.variants ?? []} />
      <ListSection heading="Stări" items={content.states ?? []} />
      {content.behavior ? (
        <>
          <h3>Comportament</h3>
          <p>{content.behavior}</p>
        </>
      ) : null}
      <ListSection heading="Reguli de conținut" items={content.contentGuidelines ?? []} />
      <ListSection heading="Probleme cunoscute" items={content.knownIssues ?? []} />
      <ListSection
        heading="Responsabilitățile implementatorului"
        items={content.implementerResponsibilities ?? []}
      />
      {content.research && content.research.length > 0 ? (
        <>
          <h3>Cercetare</h3>
          <ul>
            {content.research.map((link) => (
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
      {content.history && content.history.length > 0 ? (
        <>
          <h3>Istoric</h3>
          <table className="sd-table">
            <caption className="sd-visually-hidden">Istoricul modificărilor relevante</caption>
            <thead>
              <tr>
                <th scope="col">Versiune</th>
                <th scope="col">Dată</th>
                <th scope="col">Modificare</th>
              </tr>
            </thead>
            <tbody>
              {content.history.map((entry) => (
                <tr key={`${entry.version}-${entry.date}`}>
                  <td>{entry.version}</td>
                  <td>
                    <time dateTime={entry.date}>{entry.date}</time>
                  </td>
                  <td>{entry.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : null}
      <p>
        Structura completă a acestei secțiuni urmează{' '}
        <a
          className="sd-link"
          href="https://github.com/ciprian-rus/sistem.digital/blob/main/docs/product/component-page-template.md"
        >
          șablonul canonic al paginii unei componente
        </a>
        . Accesibilitatea (semantică, tastatură, focus) rămâne documentată separat, conform{' '}
        <a
          className="sd-link"
          href="https://github.com/ciprian-rus/sistem.digital/blob/main/docs/accessibility/component-template.md"
        >
          șablonului de accesibilitate
        </a>
        .
      </p>
    </section>
  );
}

const designCodeMatrixLabels = {
  figma: 'Figma',
  html: 'HTML/CSS',
  webComponents: 'Web Components',
  react: 'React',
  docs: 'Documentație',
  automatedTests: 'Teste automate',
  keyboardTested: 'Testare cu tastatura',
  screenReaderTested: 'Testare cu cititor de ecran',
} as const;

export function CatalogDesignCodeMatrix({ item }: Readonly<{ item: CatalogItem }>) {
  const matrix = getDesignCodeMatrix(item);
  if (!matrix) return null;

  const rows = (
    Object.keys(designCodeMatrixLabels) as Array<keyof typeof designCodeMatrixLabels>
  ).map((channel) => ({
    channel,
    label: designCodeMatrixLabels[channel],
    available: matrix[channel],
  }));

  return (
    <section className="sd-catalog-detail__section" aria-labelledby="catalog-matrix-title">
      <h2 id="catalog-matrix-title">Matricea design–cod</h2>
      <p>
        Disponibilitatea reală a acestei componente, calculată din pachetele publicate, conform{' '}
        <a
          className="sd-link"
          href="https://github.com/ciprian-rus/sistem.digital/blob/main/docs/product/design-code-matrix-schema.md"
        >
          schemei matricei design–cod
        </a>
        . Rândurile Figma, testare cu tastatura și testare cu cititor de ecran rămân „Indisponibil”
        până la dovezi publicate separat (kit Figma, respectiv auditul manual de accesibilitate).
      </p>
      <div
        className="sd-table-container"
        role="region"
        aria-label={`Matricea design–cod pentru ${item.title}; tabel derulabil orizontal`}
        tabIndex={0}
      >
        <table className="sd-table">
          <caption className="sd-visually-hidden">Matricea design–cod pentru {item.title}</caption>
          <thead>
            <tr>
              <th scope="col">Canal</th>
              <th scope="col">Disponibilitate</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.channel}>
                <th scope="row">{row.label}</th>
                <td>{row.available ? 'Disponibil' : 'Indisponibil'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
