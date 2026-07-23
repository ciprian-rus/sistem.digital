import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  CatalogImportExamples,
  CatalogPreview,
  CatalogStatus,
} from '../../../../components/catalog';
import {
  Breadcrumbs,
  PublicFooter,
  PublicHeader,
  ServiceNavigation,
} from '../../../../components/public-shell';
import { catalogItems, getCatalogItem } from '../../../../content/catalog';
import { getSectionNavigation } from '../../../../content/site-map';

interface CatalogDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return catalogItems.map((item) => ({ slug: item.id }));
}

export async function generateMetadata({ params }: CatalogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) return { title: 'Intrare inexistentă' };
  return {
    title: `${item.title} — catalog`,
    description: item.description,
    keywords: [...item.keywords, item.familyTitle, item.packageName],
  };
}

export default async function CatalogDetailPage({ params }: Readonly<CatalogDetailPageProps>) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();

  const sectionItems = getSectionNavigation('/componente/catalog').map((page) => ({
    href: page.href,
    label: page.navigationLabel,
  }));
  const installCommand = `pnpm add @sistem-digital/tokens${
    item.packageName === '@sistem-digital/components' ? ' @sistem-digital/components' : ''
  }`;

  return (
    <>
      <PublicHeader currentPath="/componente/catalog" serviceName="Catalog versionat" />
      <main className="container sd-doc-main" id="continut">
        <Breadcrumbs
          items={[
            { label: 'Acasă', href: '/' },
            { label: 'Componente', href: '/componente' },
            { label: 'Catalog versionat', href: '/componente/catalog' },
            { label: item.title },
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

          <article className="sd-doc-article sd-catalog-detail">
            <header className="sd-doc-header">
              <p className="section-kicker">Catalog · {item.familyTitle}</p>
              <h1>{item.title}</h1>
              <p className="sd-doc-lead">{item.description}</p>
              <CatalogStatus item={item} />
              <dl className="sd-doc-metadata sd-catalog-detail__metadata">
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
                <div>
                  <dt>Canal</dt>
                  <dd>{item.channel}</dd>
                </div>
                <div>
                  <dt>Modul CSS</dt>
                  <dd>
                    <code>{item.cssImport}</code>
                  </dd>
                </div>
              </dl>
            </header>

            <section className="sd-catalog-detail__section" aria-labelledby="catalog-preview-title">
              <h2 id="catalog-preview-title">Preview și markup canonic</h2>
              <p>
                Previzualizarea de mai jos redă exact șirul HTML afișat în exemplul de cod. Nu
                există o implementare paralelă pentru documentație.
              </p>
              <CatalogPreview item={item} />
            </section>

            <section className="sd-catalog-detail__section" aria-labelledby="catalog-install-title">
              <h2 id="catalog-install-title">Instalare și importuri</h2>
              <pre className="sd-catalog-install" tabIndex={0} aria-label="Comandă de instalare">
                <code>{installCommand}</code>
              </pre>
              <CatalogImportExamples item={item} />
            </section>

            <section
              className="sd-catalog-detail__section"
              aria-labelledby="catalog-contract-title"
            >
              <h2 id="catalog-contract-title">Contract și surse</h2>
              <ul>
                <li>
                  <a className="sd-link" href={item.documentationHref}>
                    Documentația familiei {item.familyTitle}
                  </a>
                </li>
                <li>
                  <a className="sd-link sd-link--external" href={item.sourceHref}>
                    Codul sursă<span className="sd-visually-hidden"> (site extern)</span>
                  </a>
                </li>
                <li>
                  <a className="sd-link sd-link--external" href={item.changelogHref}>
                    Changelog<span className="sd-visually-hidden"> (site extern)</span>
                  </a>
                </li>
              </ul>
              <p>
                Schimbarea claselor publice, a markup-ului canonic sau a comportamentului helperelor
                necesită versionare și instrucțiuni de migrare.
              </p>
            </section>
          </article>
        </div>
      </main>
      <PublicFooter>
        <p>
          Pagina este generată din registry-ul verificat automat față de pachetul {item.packageName}
          .
        </p>
      </PublicFooter>
    </>
  );
}
