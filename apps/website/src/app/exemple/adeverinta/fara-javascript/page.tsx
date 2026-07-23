import type { Metadata } from 'next';

import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Adeverință — exemplu fără JavaScript',
  description: 'Exemplu server-rendered pentru verificarea și trimiterea unei cereri.',
  alternates: { canonical: '/exemple/adeverinta/fara-javascript' },
};

export default function NoJavaScriptReferencePage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Serviciu demonstrativ" />
      <main className="container sd-reference-page" id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/pattern-uri', label: 'Pattern-uri' },
            { href: '/exemple/adeverinta', label: 'Solicită o adeverință' },
            { label: 'Varianta fără JavaScript' },
          ]}
        />
        <section className="sd-reference-flow">
          <p className="section-kicker">Exemplu HTML server-rendered</p>
          <h1>Verifică răspunsurile înainte de trimitere</h1>
          <p className="sd-reference-lead">
            Într-un serviciu real, valorile sunt păstrate într-o sesiune securizată și validate din
            nou de server.
          </p>
          <form action="/exemple/adeverinta/confirmare" method="get">
            <input name="request-version" type="hidden" value="demo-v1" />
            <h2>Date verificate la sursă</h2>
            <dl className="sd-summary-list">
              <div className="sd-summary-list__row">
                <dt>Nume</dt>
                <dd>Persoană Exemplu</dd>
                <dd>Verificat la sursă · Evidența persoanelor</dd>
              </div>
            </dl>
            <h2>Date declarate de tine</h2>
            <dl className="sd-summary-list">
              <div className="sd-summary-list__row">
                <dt>Livrare</dt>
                <dd>Document digital</dd>
                <dd>
                  <a href="#livrare">Schimbă livrarea</a>
                </dd>
              </div>
            </dl>
            <fieldset className="sd-fieldset" id="livrare">
              <legend className="sd-legend">Modalitate de livrare</legend>
              <label className="sd-choice">
                <input defaultChecked name="delivery" type="radio" value="digital" />
                <span className="sd-choice__label">Document digital</span>
              </label>
              <label className="sd-choice">
                <input name="delivery" type="radio" value="counter" />
                <span className="sd-choice__label">Ridicare de la ghișeu</span>
              </label>
            </fieldset>
            <label className="sd-choice">
              <input name="declaration" required type="checkbox" value="accepted" />
              <span className="sd-choice__label">
                Declar că informațiile furnizate de mine sunt corecte.
              </span>
            </label>
            <div className="sd-button-group">
              <button className="sd-button sd-button--primary" type="submit">
                Trimite cererea demonstrativă
              </button>
            </div>
          </form>
        </section>
      </main>
      <PublicFooter>
        <p>Exemplu fictiv: formularul nu transmite date unei instituții.</p>
      </PublicFooter>
    </>
  );
}
