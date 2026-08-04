import type { Metadata } from 'next';

import { Callout } from '../../../components/documentation';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Școala Model — model sectorial demonstrativ',
  description:
    'Implementare de referință pentru o școală: organizare, anunțuri și catalog de servicii pentru părinți și elevi, construite cu Sistem Digital.',
  alternates: { canonical: '/exemple/scoala-model' },
  robots: { index: true, follow: true },
};

const consiliulProfesoral = [
  { nume: 'Diana Marinescu', rol: 'director' },
  { nume: 'Andrei Stanciu', rol: 'director adjunct' },
  { nume: 'Larisa Voicu', rol: 'membru, comisia pentru curriculum' },
  { nume: 'Bogdan Neagu', rol: 'membru, comisia pentru evaluare' },
];

const anunturi = [
  {
    numar: 'A 18/2026',
    data: '2026-08-01',
    subiect: 'Calendarul înscrierilor pentru anul școlar 2026–2027',
  },
  {
    numar: 'A 17/2026',
    data: '2026-07-20',
    subiect: 'Programul ședințelor cu părinții din prima săptămână de școală',
  },
  {
    numar: 'A 16/2026',
    data: '2026-07-05',
    subiect: 'Lista manualelor și a materialelor necesare pe niveluri de învățământ',
  },
];

export default function ScoalaModelPage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Model sectorial demonstrativ" />
      <main className="container sd-doc-main" id="continut">
        <Breadcrumbs items={[{ href: '/', label: 'Acasă' }, { label: 'Școala Model' }]} />

        <article className="sd-doc-article">
          <header className="sd-doc-header">
            <p className="section-kicker">Model sectorial · demonstrativ</p>
            <h1>Școala Model</h1>
            <p className="sd-doc-lead">
              O implementare de referință care arată cum arată o instituție de învățământ construită
              integral cu Sistem Digital — organizare, anunțuri și catalog de servicii pentru
              părinți și elevi.
            </p>
          </header>

          <Callout title="Instituție și date complet fictive" type="warning">
            <p>
              „Școala Model", conducerea și anunțurile de mai jos sunt demonstrative, inventate
              pentru acest exemplu. Nu corespund niciunei instituții de învățământ reale. Niciun
              nume sau dată de mai jos nu aparține unui elev sau minor — conform excluderii
              explicite din scope-ul acestui model.
            </p>
          </Callout>

          <section className="sd-catalog-detail__section" aria-labelledby="organizare-title">
            <h2 id="organizare-title">Organizare</h2>
            <p>
              Conducerea (demonstrativă) coordonează activitatea didactică; consiliul profesoral
              (demonstrativ, 4 membri) aprobă regulamentul intern și programul anual de studii.
            </p>
            <div
              className="sd-table-container"
              role="region"
              aria-label="Componența conducerii și a consiliului profesoral; tabel derulabil orizontal"
              tabIndex={0}
            >
              <table className="sd-table">
                <caption className="sd-visually-hidden">
                  Componența demonstrativă a conducerii școlii
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Nume</th>
                    <th scope="col">Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {consiliulProfesoral.map((membru) => (
                    <tr key={membru.nume}>
                      <th scope="row">{membru.nume}</th>
                      <td>{membru.rol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sd-catalog-detail__section" aria-labelledby="anunturi-title">
            <h2 id="anunturi-title">Anunțuri recente</h2>
            <p>
              Anunțurile publicate ca text, nu doar ca PDF descărcabil — conform{' '}
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
              aria-label="Anunțuri recente ale școlii; tabel derulabil orizontal"
              tabIndex={0}
            >
              <table className="sd-table">
                <caption className="sd-visually-hidden">
                  Anunțurile recente ale școlii, demonstrative
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Număr</th>
                    <th scope="col">Dată</th>
                    <th scope="col">Subiect</th>
                  </tr>
                </thead>
                <tbody>
                  {anunturi.map((anunt) => (
                    <tr key={anunt.numar}>
                      <th scope="row">{anunt.numar}</th>
                      <td>
                        <time dateTime={anunt.data}>{anunt.data}</time>
                      </td>
                      <td>{anunt.subiect}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sd-catalog-detail__section" aria-labelledby="servicii-title">
            <h2 id="servicii-title">Servicii pentru părinți și elevi</h2>
            <p>
              Catalogul de servicii este organizat după nevoia părintelui sau a elevului, nu după
              structura internă a școlii.
            </p>
            <p>
              <a className="sd-button sd-button--primary" href="/exemple/scoala-model/servicii">
                Vezi serviciile disponibile
              </a>
            </p>
          </section>
        </article>
      </main>
      <PublicFooter>
        <p>
          Școala Model este un exemplu fictiv pentru demonstrație și training. Nu reprezintă nicio
          instituție de învățământ reală și nu colectează date reale, ale unui minor sau ale unui
          adult.
        </p>
      </PublicFooter>
    </>
  );
}
