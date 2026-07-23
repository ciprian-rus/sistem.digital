import type { ReactNode } from 'react';

import type { CatalogItem } from '../content/catalog';
import { getCatalogHref } from '../content/catalog';
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

export function CatalogStatus({ item }: Readonly<{ item: CatalogItem }>) {
  return (
    <div className="sd-catalog-status" aria-label="Starea intrării">
      <span className={`sd-tag sd-tag--${item.status}`}>{statusLabels[item.status]}</span>
      <span>{kindLabels[item.kind]}</span>
      <span>{item.familyTitle}</span>
    </div>
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
