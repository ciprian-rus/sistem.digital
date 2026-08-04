import type { Metadata } from 'next';

import { Callout } from '../../../components/documentation';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Ministerul Model — model sectorial demonstrativ',
  description:
    'Implementare de referință pentru un minister sau o agenție centrală: organizare, acte normative, consultări publice și catalog de servicii, construite cu Sistem Digital.',
  alternates: { canonical: '/exemple/minister-model' },
  robots: { index: true, follow: true },
};

const conducerea = [
  { nume: 'Alexandra Manolescu', rol: 'ministru' },
  { nume: 'Radu Ionescu', rol: 'secretar de stat' },
  { nume: 'Ioana Vasilescu', rol: 'secretar general' },
];

const acteNormative = [
  {
    numar: 'OM 112/2026',
    data: '2026-07-28',
    subiect: 'Aprobarea metodologiei de raportare anuală pentru instituțiile subordonate',
  },
  {
    numar: 'OM 111/2026',
    data: '2026-07-10',
    subiect: 'Actualizarea listei serviciilor publice digitalizate în anul 2026',
  },
];

const consultariPublice = [
  {
    titlu:
      'Proiect de ordin privind standardele de accesibilitate pentru site-urile instituțiilor publice',
    termen: '2026-08-25',
  },
  {
    titlu: 'Proiect de strategie pentru digitalizarea serviciilor publice locale',
    termen: '2026-09-05',
  },
];

export default function MinisterModelPage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Model sectorial demonstrativ" />
      <main className="container sd-doc-main" id="continut">
        <Breadcrumbs items={[{ href: '/', label: 'Acasă' }, { label: 'Ministerul Model' }]} />

        <article className="sd-doc-article">
          <header className="sd-doc-header">
            <p className="section-kicker">Model sectorial · demonstrativ</p>
            <h1>Ministerul Model</h1>
            <p className="sd-doc-lead">
              O implementare de referință care arată cum arată o instituție centrală construită
              integral cu Sistem Digital — organizare, acte normative, consultări publice și catalog
              de servicii.
            </p>
          </header>

          <Callout title="Instituție și date complet fictive" type="warning">
            <p>
              „Ministerul Model", conducerea, actele normative și consultările publice de mai jos
              sunt demonstrative, inventate pentru acest exemplu. Nu corespund niciunei instituții
              centrale reale și nu trebuie folosite ca sursă de informații.
            </p>
          </Callout>

          <section className="sd-catalog-detail__section" aria-labelledby="organizare-title">
            <h2 id="organizare-title">Organizare</h2>
            <p>Conducerea (demonstrativă) coordonează aparatul de specialitate al instituției.</p>
            <div
              className="sd-table-container"
              role="region"
              aria-label="Componența conducerii; tabel derulabil orizontal"
              tabIndex={0}
            >
              <table className="sd-table">
                <caption className="sd-visually-hidden">
                  Componența demonstrativă a conducerii
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Nume</th>
                    <th scope="col">Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {conducerea.map((membru) => (
                    <tr key={membru.nume}>
                      <th scope="row">{membru.nume}</th>
                      <td>{membru.rol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sd-catalog-detail__section" aria-labelledby="acte-normative-title">
            <h2 id="acte-normative-title">Acte normative recente</h2>
            <p>
              Actele normative publicate ca text, nu doar ca PDF descărcabil — conform{' '}
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
              aria-label="Acte normative recente; tabel derulabil orizontal"
              tabIndex={0}
            >
              <table className="sd-table">
                <caption className="sd-visually-hidden">
                  Actele normative recente, demonstrative
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Număr</th>
                    <th scope="col">Dată</th>
                    <th scope="col">Subiect</th>
                  </tr>
                </thead>
                <tbody>
                  {acteNormative.map((act) => (
                    <tr key={act.numar}>
                      <th scope="row">{act.numar}</th>
                      <td>
                        <time dateTime={act.data}>{act.data}</time>
                      </td>
                      <td>{act.subiect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sd-catalog-detail__section" aria-labelledby="consultari-title">
            <h2 id="consultari-title">Consultări publice active</h2>
            <p>
              Proiectele de acte normative aflate în consultare publică, cu termenul până la care se
              pot trimite comentarii.
            </p>
            <div
              className="sd-table-container"
              role="region"
              aria-label="Consultări publice active; tabel derulabil orizontal"
              tabIndex={0}
            >
              <table className="sd-table">
                <caption className="sd-visually-hidden">
                  Consultările publice active, demonstrative
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Proiect</th>
                    <th scope="col">Termen de comentarii</th>
                  </tr>
                </thead>
                <tbody>
                  {consultariPublice.map((consultare) => (
                    <tr key={consultare.titlu}>
                      <th scope="row">{consultare.titlu}</th>
                      <td>
                        <time dateTime={consultare.termen}>{consultare.termen}</time>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sd-catalog-detail__section" aria-labelledby="servicii-title">
            <h2 id="servicii-title">Servicii pentru cetățeni și instituții</h2>
            <p>
              Catalogul de servicii este organizat după nevoia solicitantului, nu după structura
              internă a instituției.
            </p>
            <p>
              <a className="sd-button sd-button--primary" href="/exemple/minister-model/servicii">
                Vezi serviciile disponibile
              </a>
            </p>
          </section>
        </article>
      </main>
      <PublicFooter>
        <p>
          Ministerul Model este un exemplu fictiv pentru demonstrație și training. Nu reprezintă
          nicio instituție centrală reală și nu colectează date reale.
        </p>
      </PublicFooter>
    </>
  );
}
