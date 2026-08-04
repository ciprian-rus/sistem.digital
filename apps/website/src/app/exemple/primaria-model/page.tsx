import type { Metadata } from 'next';

import { Callout } from '../../../components/documentation';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Primăria Model — model sectorial demonstrativ',
  description:
    'Implementare de referință pentru o primărie: organizare, transparență decizională și catalog de servicii locale, construite cu Sistem Digital.',
  alternates: { canonical: '/exemple/primaria-model' },
  robots: { index: true, follow: true },
};

const consiliulLocal = [
  { nume: 'Ana Ionescu', partid: 'grup independent' },
  { nume: 'Mihai Georgescu', partid: 'grup independent' },
  { nume: 'Elena Popa', partid: 'grup independent' },
  { nume: 'Radu Constantinescu', partid: 'grup independent' },
  { nume: 'Cristina Dumitrescu', partid: 'grup independent' },
];

const hotarariRecente = [
  {
    numar: 'HCL 42/2026',
    data: '2026-07-15',
    subiect: 'Aprobarea bugetului local pentru reabilitarea a trei străzi',
  },
  {
    numar: 'HCL 41/2026',
    data: '2026-07-15',
    subiect: 'Aprobarea programului de finanțare pentru asociațiile sportive locale',
  },
  {
    numar: 'HCL 40/2026',
    data: '2026-06-18',
    subiect: 'Actualizarea taxelor locale pentru anul fiscal următor',
  },
];

export default function PrimariaModelPage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Model sectorial demonstrativ" />
      <main className="container sd-doc-main" id="continut">
        <Breadcrumbs items={[{ href: '/', label: 'Acasă' }, { label: 'Primăria Model' }]} />

        <article className="sd-doc-article">
          <header className="sd-doc-header">
            <p className="section-kicker">Model sectorial · demonstrativ</p>
            <h1>Primăria Model</h1>
            <p className="sd-doc-lead">
              O implementare de referință care arată cum arată o primărie construită integral cu
              Sistem Digital — organizare, transparență decizională și catalog de servicii locale.
            </p>
          </header>

          <Callout title="Instituție și date complet fictive" type="warning">
            <p>
              „Primăria Model", numele consilierilor și hotărârile de mai jos sunt demonstrative,
              inventate pentru acest exemplu. Nu corespund niciunei instituții publice reale și nu
              trebuie folosite ca sursă de informații.
            </p>
          </Callout>

          <section className="sd-catalog-detail__section" aria-labelledby="organizare-title">
            <h2 id="organizare-title">Organizare</h2>
            <p>
              Primarul (demonstrativ) coordonează aparatul de specialitate; consiliul local
              (demonstrativ, 5 membri) aprobă bugetul, taxele locale și hotărârile de interes
              public.
            </p>
            <div
              className="sd-table-container"
              role="region"
              aria-label="Componența consiliului local; tabel derulabil orizontal"
              tabIndex={0}
            >
              <table className="sd-table">
                <caption className="sd-visually-hidden">
                  Componența demonstrativă a consiliului local
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Consilier</th>
                    <th scope="col">Grup</th>
                  </tr>
                </thead>
                <tbody>
                  {consiliulLocal.map((membru) => (
                    <tr key={membru.nume}>
                      <th scope="row">{membru.nume}</th>
                      <td>{membru.partid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sd-catalog-detail__section" aria-labelledby="hotarari-title">
            <h2 id="hotarari-title">Hotărâri recente</h2>
            <p>
              Transparență decizională: hotărârile consiliului local publicate ca text, nu doar ca
              PDF descărcabil — conform{' '}
              <a
                className="sd-link"
                href="https://github.com/ciprian-rus/sistem.digital/blob/main/docs/content/content-style-guide.md#documente-descărcabile-ca-formate-complementare"
              >
                principiului documentelor descărcabile ca formate complementare
              </a>
              .
            </p>
            <div
              className="sd-table-container"
              role="region"
              aria-label="Hotărâri recente ale consiliului local; tabel derulabil orizontal"
              tabIndex={0}
            >
              <table className="sd-table">
                <caption className="sd-visually-hidden">
                  Hotărârile recente ale consiliului local, demonstrative
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Număr</th>
                    <th scope="col">Dată</th>
                    <th scope="col">Subiect</th>
                  </tr>
                </thead>
                <tbody>
                  {hotarariRecente.map((hotarare) => (
                    <tr key={hotarare.numar}>
                      <th scope="row">{hotarare.numar}</th>
                      <td>
                        <time dateTime={hotarare.data}>{hotarare.data}</time>
                      </td>
                      <td>{hotarare.subiect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sd-catalog-detail__section" aria-labelledby="servicii-title">
            <h2 id="servicii-title">Servicii pentru cetățeni</h2>
            <p>
              Catalogul de servicii locale este organizat după nevoia cetățeanului, nu după
              structura internă a primăriei.
            </p>
            <p>
              <a className="sd-button sd-button--primary" href="/exemple/primaria-model/servicii">
                Vezi serviciile disponibile
              </a>
            </p>
          </section>
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
