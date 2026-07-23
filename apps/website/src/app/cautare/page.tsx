import type { Metadata } from 'next';

import { PageFeedback } from '../../components/page-feedback';
import { Breadcrumbs, PublicFooter, PublicHeader } from '../../components/public-shell';
import { siteSections, type SiteSectionId } from '../../content/site-map';
import { searchSite } from '../../lib/site-search';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Căutare',
  description: 'Caută componente, fundamente, ghiduri și resurse în Sistem Digital.',
};

interface SearchPageProps {
  searchParams: Promise<{
    categorie?: string | string[];
    q?: string | string[];
  }>;
}

function firstValue(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? '') : (value ?? '');
}

function validSection(value: string): SiteSectionId | undefined {
  return siteSections.some((section) => section.id === value)
    ? (value as SiteSectionId)
    : undefined;
}

export default async function SearchPage({ searchParams }: Readonly<SearchPageProps>) {
  const parameters = await searchParams;
  const query = firstValue(parameters.q).trim();
  const section = validSection(firstValue(parameters.categorie));
  const results = searchSite(query, { section });
  const hasQuery = query.length >= 2;
  const sectionLabel = siteSections.find((entry) => entry.id === section)?.title;

  return (
    <>
      <PublicHeader currentPath="/cautare" serviceName="Căutare" />

      <main className={`container ${styles.main}`} id="continut">
        <Breadcrumbs items={[{ href: '/', label: 'Acasă' }, { label: 'Căutare' }]} />

        <section className={styles.intro} aria-labelledby="search-page-title">
          <p className="section-kicker">Căutare</p>
          <h1 id="search-page-title">Găsește componente și reguli de implementare.</h1>
          <p>
            Caută cu sau fără diacritice, după termenul tehnic ori după cuvântul folosit în mod
            obișnuit. Interogarea și categoria rămân în URL, ca pagina să poată fi distribuită.
          </p>
        </section>

        <form
          className={styles.filters}
          action="/cautare"
          method="get"
          role="search"
          aria-label="Căutare în conținutul Sistem Digital"
        >
          <div className={`sd-form-group ${styles.formGroup}`}>
            <label className="sd-label" htmlFor="results-search">
              Caută în Sistem Digital
            </label>
            <input
              className={`sd-input ${styles.control}`}
              id="results-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="De exemplu: șablon, antet, formular"
            />
          </div>

          <div className={`sd-form-group ${styles.formGroup}`}>
            <label className="sd-label" htmlFor="search-section">
              Categorie
            </label>
            <select
              className={`sd-select ${styles.control}`}
              id="search-section"
              name="categorie"
              defaultValue={section ?? ''}
            >
              <option value="">Toate categoriile</option>
              {siteSections.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.title}
                </option>
              ))}
            </select>
          </div>

          <div className={`sd-button-group ${styles.actions}`}>
            <button className="sd-button sd-button--primary" type="submit">
              Caută
            </button>
            <a className="sd-link" href="/cautare">
              Resetează
            </a>
          </div>
        </form>

        {hasQuery && results.length > 0 ? (
          <section aria-labelledby="results-title">
            <h2 className={styles.summary} id="results-title">
              {results.length} {results.length === 1 ? 'rezultat' : 'rezultate'} pentru „{query}”
              {sectionLabel ? ` în ${sectionLabel}` : ''}
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
            <h2 id="empty-title">Nu am găsit rezultate pentru „{query}”</h2>
            <p>Poți continua astfel:</p>
            <ul>
              <li>elimină filtrul de categorie;</li>
              <li>verifică ortografia sau încearcă un singur concept;</li>
              <li>folosește un termen mai general, precum „formular” sau „navigație”.</li>
            </ul>
            <div className="sd-button-group">
              <a className="sd-button sd-button--secondary" href="/cautare">
                Resetează căutarea
              </a>
              <a className="sd-link" href="/componente/catalog">
                Răsfoiește catalogul
              </a>
            </div>
          </section>
        ) : null}

        {!hasQuery ? (
          <section className={styles.empty} aria-labelledby="initial-title">
            <h2 id="initial-title">Introdu cel puțin două caractere</h2>
            <p>Poți căuta după componentă, problemă, rol sau tehnologie.</p>
            <ul>
              <li>
                <a href="/cautare?q=formular">Formulare și validare</a>
              </li>
              <li>
                <a href="/cautare?q=accesibilitate">Accesibilitate</a>
              </li>
              <li>
                <a href="/cautare?q=șablon">Template-uri și startere</a>
              </li>
            </ul>
          </section>
        ) : null}

        <PageFeedback pathname="/cautare" title="Căutare" />
      </main>

      <PublicFooter />
    </>
  );
}
