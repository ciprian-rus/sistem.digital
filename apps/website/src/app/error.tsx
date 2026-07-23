'use client';

import { useEffect } from 'react';

import { PublicFooter, PublicHeader } from '../components/public-shell';

export default function ErrorPage({
  error,
  reset,
}: Readonly<{ error: Error & { digest?: string }; reset: () => void }>) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <PublicHeader />
      <main className="container sd-state-page" id="continut">
        <p className="section-kicker">Eroare temporară</p>
        <h1>Pagina nu a putut fi încărcată</h1>
        <p className="sd-state-page__lead">
          Încearcă din nou. Dacă problema continuă, poți reveni la pagina principală.
        </p>
        <div className="actions">
          <button className="button button-primary" type="button" onClick={reset}>
            Încearcă din nou
          </button>
          <a className="button button-secondary" href="/">
            Mergi la pagina principală
          </a>
        </div>
      </main>
      <PublicFooter />
    </>
  );
}
