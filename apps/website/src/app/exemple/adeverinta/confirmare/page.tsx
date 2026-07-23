import type { Metadata } from 'next';

import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../../components/public-shell';

export const metadata: Metadata = {
  title: 'Confirmare cerere demonstrativă',
  description: 'Confirmare server-rendered pentru cererea demonstrativă.',
  robots: { index: false, follow: false },
};

export default function NoJavaScriptConfirmationPage() {
  return (
    <>
      <PublicHeader currentPath="/pattern-uri" serviceName="Serviciu demonstrativ" />
      <main className="container sd-reference-page" id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/exemple/adeverinta', label: 'Solicită o adeverință' },
            { label: 'Confirmare' },
          ]}
        />
        <section className="sd-reference-result">
          <div className="sd-reference-success" aria-hidden="true">
            ✓
          </div>
          <p className="section-kicker">Cerere înregistrată</p>
          <h1>Cererea demonstrativă a fost primită</h1>
          <p className="sd-reference-lead">
            Număr de înregistrare: <strong>SD-NOJS-2026-0042</strong>
          </p>
          <dl className="sd-summary-list">
            <div className="sd-summary-list__row">
              <dt>Data și ora</dt>
              <dd>23 iulie 2026, 12:00</dd>
            </div>
            <div className="sd-summary-list__row">
              <dt>Status</dt>
              <dd>Primită</dd>
            </div>
            <div className="sd-summary-list__row">
              <dt>Notificare</dt>
              <dd>Pagina de status</dd>
            </div>
            <div className="sd-summary-list__row">
              <dt>Termen estimat</dt>
              <dd>2 zile lucrătoare</dd>
            </div>
          </dl>
          <h2>Ce urmează</h2>
          <p>
            Păstrează numărul de înregistrare. Într-un serviciu real îl folosești pentru urmărire.
          </p>
          <p>
            <a href="/exemple/adeverinta/fara-javascript">Înapoi la exemplu</a>
          </p>
        </section>
      </main>
      <PublicFooter>
        <p>Exemplu fictiv: nu a fost creată o cerere reală.</p>
      </PublicFooter>
    </>
  );
}
