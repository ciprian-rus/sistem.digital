import type { Metadata } from 'next';

import { PublicFooter, PublicHeader } from '../components/public-shell';

export const metadata: Metadata = {
  title: 'Pagina nu a fost găsită',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <PublicHeader />
      <main className="container sd-state-page" id="continut">
        <p className="section-kicker">Eroare 404</p>
        <h1>Pagina nu a fost găsită</h1>
        <p className="sd-state-page__lead">
          Adresa poate fi greșită, iar pagina poate fi mutată sau poate să nu mai existe.
        </p>
        <div className="actions">
          <a className="button button-primary" href="/">
            Mergi la pagina principală
          </a>
          <a className="button button-secondary" href="/cautare">
            Caută în Sistem Digital
          </a>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
