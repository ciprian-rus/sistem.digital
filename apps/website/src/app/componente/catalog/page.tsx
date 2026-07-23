import type { Metadata } from 'next';

import { CatalogCard, CatalogEmptyState } from '../../../components/catalog';
import {
  Breadcrumbs,
  PublicFooter,
  PublicHeader,
  ServiceNavigation,
} from '../../../components/public-shell';
import {
  catalogFamilies,
  catalogItems,
  catalogVersions,
  filterCatalogItems,
  type CatalogKind,
  type CatalogStatus,
} from '../../../content/catalog';
import { getSectionNavigation } from '../../../content/site-map';

export const metadata: Metadata = {
  title: 'Catalog versionat',
  description:
    'Fundamente și componente Sistem Digital cu versiune, status, importuri, preview și cod canonic.',
};

interface CatalogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

function validKind(value: string): CatalogKind | undefined {
  return value === 'component' || value === 'foundation' ? value : undefined;
}

function validStatus(value: string): CatalogStatus | undefined {
  return value === 'alpha' || value === 'stable' || value === 'deprecated' ? value : undefined;
}

export default async function CatalogPage({ searchParams }: Readonly<CatalogPageProps>) {
  const params = await searchParams;
  const query = firstValue(params.q).trim();
  const family = firstValue(params.familie);
  const kind = validKind(firstValue(params.tip));
  const status = validStatus(firstValue(params.stadiu));
  const results = filterCatalogItems({
    family: catalogFamilies.includes(family) ? family : undefined,
    kind,
    query,
    status,
  });
  const sectionItems = getSectionNavigation('/componente/catalog').map((page) => ({
    href: page.href,
    label: page.navigationLabel,
  }));

  return (
    <>
      <PublicHeader currentPath="/componente/catalog" serviceName="Catalog versionat" />
      <main className="container sd-doc-main" id="continut">
        <Breadcrumbs
          items={[
            { label: 'Acasă', href: '/' },
            { label: 'Componente', href: '/componente' },
            { label: 'Catalog versionat' },
          ]}
        />

        <div className="sd-doc-layout">
          <aside className="sd-doc-sidebar">
            <ServiceNavigation
              currentPath="/componente/catalog"
              items={sectionItems}
              title="În secțiunea Componente"
            />
          </aside>

          <article className="sd-doc-article sd-catalog-page">
            <header className="sd-doc-header">
              <p className="section-kicker">Componente · M3</p>
              <h1>Catalog versionat</h1>
              <p className="sd-doc-lead">
                Fiecare intrare indică pachetul, versiunea, canalul, importurile publice și markup-ul
                canonic folosit și pentru previzualizare.
              </p>
              <ul className="sd-metadata" aria-label="Datele catalogului">
                <li className="sd-metadata__item">
                  <span className="sd-metadata__label">Intrări:</span>
                  <span>{catalogItems.length}</span>
                </li>
                <li className="sd-metadata__item">
                  <span className="sd-metadata__label">Versiune documentată:</span>
                  <span>{catalogVersions.join(', ')}</span>
                </li>
                <li className="sd-metadata__item">
                  <span className="sd-metadata__label">Canal:</span>
                  <span>alpha</span>
                </li>
              </ul>
            </header>

            <form className="sd-catalog-filters" action="/componente/catalog" method="get">
              <div className="sd-form-group">
                <label className="sd-label" htmlFor="catalog-query">
                  Caută în catalog
                </label>
                <input
                  className="sd-input"
                  id="catalog-query"
                  name="q"
                  type="search"
                  defaultValue={query}
                  placeholder="De exemplu: dialog, tabel, teme"
                />
              </div>

              <div className="sd-form-group">
                <label className="sd-label" htmlFor="catalog-kind">
                  Tip
                </label>
                <select className="sd-select" id="catalog-kind" name="tip" defaultValue={kind ?? ''}>
                  <option value="">Toate</option>
                  <option value="foundation">Fundamente</option>
                  <option value="component">Componente</option>
                </select>
              </div>

              <div className="sd-form-group">
                <label className="sd-label" htmlFor="catalog-family">
                  Familie
                </label>
                <select
                  className="sd-select"
                  id="catalog-family"
                  name="familie"
                  defaultValue={catalogFamilies.includes(family) ? family : ''}
                >
                  <option value="">Toate</option>
                  {catalogFamilies.map((entry) => (
                    <option key={entry} value={entry}>
                      {entry === 'foundations'
                        ? 'Fundamente'
                        : catalogItems.find((item) => item.family === entry)?.familyTitle ?? entry}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sd-form-group">
                <label className="sd-label" htmlFor="catalog-status">
                  Stadiu
                </label>
                <select
                  className="sd-select"
                  id="catalog-status"
                  name="stadiu"
                  defaultValue={status ?? ''}
                >
                  <option value="">Toate</option>
                  <option value="alpha">Alpha</option>
                  <option value="stable">Stabil</option>
                  <option value="deprecated">Depreciat</option>
                </select>
              </div>

              <div className="sd-button-group sd-catalog-filter-actions">
                <button className="sd-button sd-button--primary" type="submit">
                  Aplică filtrele
                </button>
                <a className="sd-link" href="/componente/catalog">
                  Resetează
                </a>
              </div>
            </form>

            <section className="sd-catalog-results" aria-labelledby="catalog-results-title">
              <div className="sd-catalog-results__header">
                <h2 id="catalog-results-title">
                  {results.length} {results.length === 1 ? 'rezultat' : 'rezultate'}
                </h2>
                <p>Filtrele sunt păstrate în URL și pot fi distribuite.</p>
              </div>

              {results.length > 0 ? (
                <div className="sd-card-grid sd-catalog-grid">
                  {results.map((item) => (
                    <CatalogCard item={item} key={item.id} />
                  ))}
                </div>
              ) : (
                <CatalogEmptyState>
                  <a className="sd-link" href="/componente/catalog">
                    Afișează întregul catalog
                  </a>
                </CatalogEmptyState>
              )}
            </section>
          </article>
        </div>
      </main>
      <PublicFooter>
        <p>Catalogul este verificat automat față de manifestele și inventarele pachetelor.</p>
      </PublicFooter>
    </>
  );
}
