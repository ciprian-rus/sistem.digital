import type { Metadata } from 'next';

import { Callout } from '../../../../components/documentation';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../../components/public-shell';
import { schoolServices } from '../../../../content/school-services';

export const metadata: Metadata = {
  title: 'Servicii — Școala Model',
  description:
    'Catalog demonstrativ de servicii pentru părinți și elevi, organizat după nevoie, nu după structura instituției.',
  alternates: { canonical: '/exemple/scoala-model/servicii' },
  robots: { index: true, follow: true },
};

const statusLabel: Record<(typeof schoolServices)[number]['status'], string> = {
  available: 'Disponibil online',
  'in-preparation': 'În pregătire',
};

const statusTagClass: Record<(typeof schoolServices)[number]['status'], string> = {
  available: 'sd-tag--success',
  'in-preparation': 'sd-tag--warning',
};

export default function ScoalaModelServiciiPage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Model sectorial demonstrativ" />
      <main className="container sd-doc-main" id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/exemple/scoala-model', label: 'Școala Model' },
            { label: 'Servicii' },
          ]}
        />

        <article className="sd-doc-article">
          <header className="sd-doc-header">
            <p className="section-kicker">Școala Model · servicii</p>
            <h1>Servicii pentru părinți și elevi</h1>
            <p className="sd-doc-lead">
              Serviciile sunt denumite și organizate după nevoia ta, nu după structura internă a
              școlii — conform{' '}
              <a className="sd-link" href="/pattern-uri/identificarea-serviciului">
                pattern-ului de identificare a serviciului potrivit
              </a>
              .
            </p>
          </header>

          <Callout title="Catalog demonstrativ, nu exhaustiv" type="info">
            <p>
              O școală reală oferă mai multe servicii administrative. Acest catalog conține un set
              reprezentativ, nu o listă completă — conform scope-ului deliberat al modelului
              sectorial „școală".
            </p>
          </Callout>

          <div className="sd-card-grid sd-catalog-grid" aria-label="Lista serviciilor disponibile">
            {schoolServices.map((service) => (
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
          Școala Model este un exemplu fictiv pentru demonstrație și training. Nu reprezintă nicio
          instituție de învățământ reală și nu colectează date reale.
        </p>
      </PublicFooter>
    </>
  );
}
