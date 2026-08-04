import type { Metadata } from 'next';

import { Callout } from '../../../../components/documentation';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../../components/public-shell';
import { localServices } from '../../../../content/local-services';

export const metadata: Metadata = {
  title: 'Servicii — Primăria Model',
  description:
    'Catalog demonstrativ de servicii locale, organizat după nevoia cetățeanului, nu după structura instituției.',
  alternates: { canonical: '/exemple/primaria-model/servicii' },
  robots: { index: true, follow: true },
};

const statusLabel: Record<(typeof localServices)[number]['status'], string> = {
  available: 'Disponibil online',
  'in-preparation': 'În pregătire',
};

const statusTagClass: Record<(typeof localServices)[number]['status'], string> = {
  available: 'sd-tag--success',
  'in-preparation': 'sd-tag--warning',
};

export default function PrimariaModelServiciiPage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Model sectorial demonstrativ" />
      <main className="container sd-doc-main" id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/exemple/primaria-model', label: 'Primăria Model' },
            { label: 'Servicii' },
          ]}
        />

        <article className="sd-doc-article">
          <header className="sd-doc-header">
            <p className="section-kicker">Primăria Model · servicii</p>
            <h1>Servicii pentru cetățeni</h1>
            <p className="sd-doc-lead">
              Serviciile sunt denumite și organizate după nevoia ta, nu după structura internă a
              primăriei — conform{' '}
              <a className="sd-link" href="/pattern-uri/identificarea-serviciului">
                pattern-ului de identificare a serviciului potrivit
              </a>
              .
            </p>
          </header>

          <Callout title="Catalog demonstrativ, nu exhaustiv" type="info">
            <p>
              O primărie reală oferă zeci de servicii. Acest catalog conține un set reprezentativ,
              nu o listă completă — conform scope-ului deliberat al modelului sectorial „primărie".
            </p>
          </Callout>

          <div className="sd-card-grid sd-catalog-grid" aria-label="Lista serviciilor disponibile">
            {localServices.map((service) => (
              <article className="sd-card" key={service.id}>
                <span
                  className={`sd-tag ${statusTagClass[service.status]}`}
                  aria-label={`Stare: ${statusLabel[service.status]}`}
                >
                  {statusLabel[service.status]}
                </span>
                <h2 className="sd-card__heading">
                  {service.status === 'available' && service.href ? (
                    <a className="sd-card__link" href={service.href}>
                      {service.title}
                    </a>
                  ) : (
                    service.title
                  )}
                </h2>
                <p className="sd-card__description">{service.description}</p>
                <p>
                  <strong>Eligibilitate: </strong>
                  {service.eligibility}
                </p>
              </article>
            ))}
          </div>
        </article>
      </main>
      <PublicFooter>
        <p>
          Primăria Model este un exemplu fictiv pentru demonstrație și training. Nu reprezintă nicio
          instituție publică reală și nu colectează date reale.
        </p>
      </PublicFooter>
    </>
  );
}
