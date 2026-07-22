import type { Metadata } from 'next';

import { Breadcrumbs, PublicFooter, PublicHeader } from '../../components/public-shell';
import { searchSite } from '../../lib/site-search';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Căutare',
  description: 'Caută componente, fundamente și resurse în Sistem Digital.',
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[] }>;
}

export default async function SearchPage({ searchParams }: Readonly<SearchPageProps>) {
  const parameters = await searchParams;
  const query = Array.isArray(parameters.q) ? parameters.q[0] ?? '' : parameters.q ?? '';
  const trimmedQuery = query.trim();
  const results = searchSite(trimmedQuery);
  const hasQuery = trimmedQuery.length >= 2;

  return (
    <>
      <PublicHeader currentPath="/cautare" serviceName="Căutare" />

      <main className={`container ${styles.main}`} id="continut">
        <Breadcrumbs items={[{ href: '/', label: 'Acasă' }, { label: 'Căutare' }]} />

        <section className={styles.intro} aria-labelledby="search-page-title">
          <p className="section-kicker">Căutare</p>
          <h1 id="search-page-title">Găsește componente și reguli de implementare.</h1>
          <p>
            Căutarea folosește un URL stabil cu parametrul <code>q</code>. Poți copia, salva sau
            distribui pagina de rezultate.
          </p>
        </section>

        <form
          className={`sd-search ${styles.searchForm}`}
          action="/cautare"
          method="get"
          role="search"
        >
          <label className="sd-search__label" htmlFor="results-search">
            Caută în Sistem Digital
          </label>
          <input
            className="sd-search__input"
            id="results-search"
            name="q"
            type="search"
            defaultValue={trimmedQuery}
          />
          <button className="sd-search__button" type="submit">
            Caută
          </button>
        </form>

        {hasQuery && results.length > 0 ? (
          <section aria-labelledby="results-title">
            <h2 className={styles.summary} id="results-title">
              {results.length} {results.length === 1 ? 'rezultat' : 'rezultate'} pentru „{trimmedQuery}”
            </h2>
            <ol className={styles.results}>
              {results.map((result) => (
                <li className={styles.result} key={result.href}>
                  <span className={styles.category}>{result.category}</span>
                  <h2>
                    <a href={result.href}>{result.title}</a>
                  </h2>
                  <p>{result.description}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {hasQuery && results.length === 0 ? (
          <section className={styles.empty} aria-labelledby="empty-title">
            <h2 id="empty-title">Nu am găsit rezultate pentru „{trimmedQuery}”</h2>
            <p>Verifică ortografia sau încearcă un termen mai general, precum „formulare”.</p>
          </section>
        ) : null}

        {!hasQuery ? (
          <section className={styles.empty} aria-labelledby="initial-title">
            <h2 id="initial-title">Introdu cel puțin două caractere</h2>
            <p>Poți căuta după numele componentei, problemă sau tehnologie.</p>
          </section>
        ) : null}
      </main>

      <PublicFooter />
    </>
  );
}
