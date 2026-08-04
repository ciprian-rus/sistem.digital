import type { Metadata } from 'next';

import { Callout } from '../../../components/documentation';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Spitalul Model — model sectorial demonstrativ',
  description:
    'Implementare de referință pentru o unitate sanitară: organizare, informații pentru pacienți și catalog de servicii, construite cu Sistem Digital.',
  alternates: { canonical: '/exemple/spital-model' },
  robots: { index: true, follow: true },
};

const conducereaMedicala = [
  { nume: 'Cristian Bălan', rol: 'manager' },
  { nume: 'Simona Petrescu', rol: 'director medical' },
  { nume: 'Vlad Toma', rol: 'director de îngrijiri' },
];

const sectii = [
  { nume: 'Medicină internă', program: 'Luni–Vineri, 08:00–16:00' },
  { nume: 'Chirurgie generală', program: 'Luni–Vineri, 08:00–16:00' },
  { nume: 'Ambulatoriu integrat', program: 'Luni–Vineri, 07:30–15:00' },
];

export default function SpitalModelPage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Model sectorial demonstrativ" />
      <main className="container sd-doc-main" id="continut">
        <Breadcrumbs items={[{ href: '/', label: 'Acasă' }, { label: 'Spitalul Model' }]} />

        <article className="sd-doc-article">
          <header className="sd-doc-header">
            <p className="section-kicker">Model sectorial · demonstrativ</p>
            <h1>Spitalul Model</h1>
            <p className="sd-doc-lead">
              O implementare de referință care arată cum arată o unitate sanitară construită
              integral cu Sistem Digital — organizare, informații pentru pacienți și catalog de
              servicii.
            </p>
          </header>

          <Callout title="Instituție și date complet fictive" type="warning">
            <p>
              „Spitalul Model", conducerea și informațiile de mai jos sunt demonstrative, inventate
              pentru acest exemplu. Nu corespund niciunei unități sanitare reale și nu conțin nicio
              dată medicală reală sau asemănătoare unei date medicale reale.
            </p>
          </Callout>

          <Callout title="Ton și claritate în context clinic" type="info">
            <p>
              Conținutul acestei pagini urmează principiile de{' '}
              <a
                className="sd-link"
                href="https://github.com/ciprian-rus/sistem.digital/blob/main/docs/research/comparative-audit.md#nhs-design-system"
              >
                încredere, claritate și reducere a încărcării cognitive
              </a>
              , confirmate din sursă în auditul comparativ pentru NHS Design System — relevante
              direct pentru un context sensibil ca cel medical.
            </p>
          </Callout>

          <section className="sd-catalog-detail__section" aria-labelledby="organizare-title">
            <h2 id="organizare-title">Organizare</h2>
            <p>
              Conducerea medicală (demonstrativă) coordonează activitatea unității sanitare;
              secțiile de mai jos au programe de funcționare afișate clar, nu ascunse în documente
              descărcabile.
            </p>
            <div
              className="sd-table-container"
              role="region"
              aria-label="Componența conducerii medicale; tabel derulabil orizontal"
              tabIndex={0}
            >
              <table className="sd-table">
                <caption className="sd-visually-hidden">
                  Componența demonstrativă a conducerii medicale
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Nume</th>
                    <th scope="col">Rol</th>
                  </tr>
                </thead>
                <tbody>
                  {conducereaMedicala.map((membru) => (
                    <tr key={membru.nume}>
                      <th scope="row">{membru.nume}</th>
                      <td>{membru.rol}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sd-catalog-detail__section" aria-labelledby="sectii-title">
            <h2 id="sectii-title">Secții și program</h2>
            <div
              className="sd-table-container"
              role="region"
              aria-label="Secțiile unității sanitare și programul lor; tabel derulabil orizontal"
              tabIndex={0}
            >
              <table className="sd-table">
                <caption className="sd-visually-hidden">
                  Secțiile demonstrative ale unității sanitare și programul lor
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Secție</th>
                    <th scope="col">Program</th>
                  </tr>
                </thead>
                <tbody>
                  {sectii.map((sectie) => (
                    <tr key={sectie.nume}>
                      <th scope="row">{sectie.nume}</th>
                      <td>{sectie.program}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="sd-catalog-detail__section" aria-labelledby="servicii-title">
            <h2 id="servicii-title">Servicii pentru pacienți</h2>
            <p>
              Catalogul de servicii este organizat după nevoia pacientului, nu după structura
              internă a unității sanitare.
            </p>
            <p>
              <a className="sd-button sd-button--primary" href="/exemple/spital-model/servicii">
                Vezi serviciile disponibile
              </a>
            </p>
          </section>
        </article>
      </main>
      <PublicFooter>
        <p>
          Spitalul Model este un exemplu fictiv pentru demonstrație și training. Nu reprezintă nicio
          unitate sanitară reală și nu colectează sau afișează nicio dată medicală reală.
        </p>
      </PublicFooter>
    </>
  );
}
