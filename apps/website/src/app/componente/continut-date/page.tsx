import type { Metadata } from 'next';

import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Conținut și afișare a datelor',
  description:
    'Componente accesibile pentru mesaje, carduri, statusuri, tabele, summary list, details, pagination și metadate.',
};

const numberFormatter = new Intl.NumberFormat('ro-RO');
const currencyFormatter = new Intl.NumberFormat('ro-RO', {
  style: 'currency',
  currency: 'RON',
  maximumFractionDigits: 0,
});

const tableRows = [
  { institution: 'Primăria Alba Iulia', requests: 1248, resolved: 1183, amount: 246_500 },
  { institution: 'Primăria Brașov', requests: 2314, resolved: 2207, amount: 418_200 },
  { institution: 'Primăria Cluj-Napoca', requests: 3986, resolved: 3814, amount: 756_900 },
] as const;

export default function ContentDataReferencePage() {
  return (
    <>
      <PublicHeader
        currentPath="/componente/continut-date"
        serviceName="Biblioteca de componente"
      />

      <main className={`container ${styles.main}`} id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/componente/formulare', label: 'Componente' },
            { label: 'Conținut și date' },
          ]}
        />

        <section className={styles.intro} aria-labelledby="page-title">
          <p className="section-kicker">Componente · M2</p>
          <h1 id="page-title">Conținut clar și date care își păstrează sensul.</h1>
          <p className={styles.lead}>
            Componentele pornesc de la HTML semantic. Aspectul ajută citirea, dar titlurile,
            listele, statusurile, relațiile dintre date și ordinea informației rămân inteligibile
            fără CSS sau JavaScript.
          </p>
          <ul className="sd-metadata" aria-label="Caracteristici">
            <li className="sd-metadata__item">
              <span className="sd-metadata__label">Pachet:</span>
              <code>@sistem-digital/components</code>
            </li>
            <li className="sd-metadata__item">
              <span className="sd-metadata__label">Modul:</span>
              <code>content.css</code>
            </li>
            <li className="sd-metadata__item">
              <span className="sd-metadata__label">Stadiu:</span>
              <span>alpha</span>
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="links-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Linkuri și mesaje</p>
            <h2 id="links-title">Destinația și consecința sunt explicite.</h2>
            <p>
              Un link descrie destinația. Linkurile externe includ un semnal vizual și un text
              pentru tehnologii asistive; notificările folosesc titlu, text și simbol, nu doar
              culoare.
            </p>
          </div>

          <div className={styles.exampleGrid}>
            <article className={styles.panel}>
              <h3>Linkuri</h3>
              <p>
                Consultă{' '}
                <a className="sd-link" href="/componente/formulare">
                  componentele pentru formulare
                </a>{' '}
                sau deschide{' '}
                <a
                  className="sd-link sd-link--external"
                  href="https://github.com/ciprian-rus/sistem.digital"
                >
                  repository-ul GitHub
                  <span className="sd-visually-hidden"> (site extern)</span>
                </a>
                .
              </p>
              <div className="sd-inset-text">
                <p>
                  <strong>Notă:</strong> nu solicita un document dacă informația poate fi verificată
                  direct la sursă.
                </p>
              </div>
            </article>

            <div className={styles.messageStack}>
              <section className="sd-alert sd-alert--info" aria-labelledby="info-alert-title">
                <span className="sd-alert__symbol" aria-hidden="true">
                  i
                </span>
                <div className="sd-alert__content">
                  <strong className="sd-alert__title" id="info-alert-title">
                    Cererea poate fi salvată
                  </strong>
                  <p>Poți reveni la formular înainte de termenul de 30 septembrie 2026.</p>
                </div>
              </section>

              <section
                className="sd-notification-banner sd-notification-banner--success"
                aria-labelledby="success-banner-title"
              >
                <span className="sd-notification-banner__symbol" aria-hidden="true">
                  ✓
                </span>
                <div className="sd-notification-banner__content">
                  <strong className="sd-notification-banner__title" id="success-banner-title">
                    Datele au fost actualizate
                  </strong>
                  <p>Modificările sunt vizibile în registrul public.</p>
                </div>
              </section>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="cards-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Carduri și statusuri</p>
            <h2 id="cards-title">Cardul grupează conținutul, nu ascunde mai multe acțiuni.</h2>
            <p>
              Când întregul card este clicabil, există o singură destinație principală. Pentru mai
              multe acțiuni se folosește varianta explicită, fără overlay peste card.
            </p>
          </div>

          <div className="sd-card-grid">
            <article className="sd-card">
              <div className={styles.statusRow}>
                <span className="sd-tag sd-tag--success">Activ</span>
                <span className="sd-tag">Serviciu online</span>
              </div>
              <h3 className="sd-card__heading">
                <a className="sd-card__link" href="#table-title">
                  Situația cererilor digitale
                </a>
              </h3>
              <p className="sd-card__description">
                Date agregate despre cererile primite, soluționate și valoarea plăților procesate.
              </p>
              <p className="sd-card__metadata">Actualizat la 22 iulie 2026</p>
            </article>

            <article className="sd-card sd-card--actions">
              <div className={styles.statusRow}>
                <span className="sd-tag sd-tag--warning">Necesită verificare</span>
              </div>
              <h3 className="sd-card__heading">Date de contact instituționale</h3>
              <p className="sd-card__description">
                Ultima confirmare a fost făcută în urmă cu mai mult de 12 luni.
              </p>
              <div className="sd-card__actions">
                <a className="sd-link" href="#summary-title">
                  Vezi datele
                </a>
                <a className="sd-link" href="https://github.com/ciprian-rus/sistem.digital/issues">
                  Raportează o problemă
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="table-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Tabel responsive</p>
            <h2 id="table-title">Relațiile dintre coloane rămân explicite.</h2>
            <p>
              Tabelul este folosit doar pentru date tabulare. La ecrane înguste, overflow-ul este
              local, iar regiunea poate primi focus pentru derulare cu tastatura.
            </p>
          </div>

          <div
            className="sd-table-container"
            role="region"
            aria-label="Situația cererilor digitale pe instituții; tabel derulabil orizontal"
            tabIndex={0}
          >
            <table className="sd-table sd-table--numeric">
              <caption>
                Situația cererilor digitale — trimestrul II 2026
                <span className="sd-table__caption-note">
                  Exemplu demonstrativ, nu date oficiale.
                </span>
              </caption>
              <thead>
                <tr>
                  <th scope="col">Instituție</th>
                  <th className="sd-table__numeric" scope="col">
                    Cereri primite
                  </th>
                  <th className="sd-table__numeric" scope="col">
                    Soluționate
                  </th>
                  <th className="sd-table__numeric" scope="col">
                    Plăți procesate
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.institution}>
                    <th scope="row">{row.institution}</th>
                    <td className="sd-table__numeric">{numberFormatter.format(row.requests)}</td>
                    <td className="sd-table__numeric">{numberFormatter.format(row.resolved)}</td>
                    <td className="sd-table__numeric">{currencyFormatter.format(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.numericNote}>
            Numerele folosesc formatul românesc și cifre tabulare; valorile monetare includ moneda.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="summary-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Summary list și metadate</p>
            <h2 id="summary-title">
              O relație cheie–valoare este reprezentată prin description list.
            </h2>
          </div>

          <dl className="sd-summary-list">
            <div className="sd-summary-list__row">
              <dt className="sd-summary-list__key">Denumire instituție</dt>
              <dd className="sd-summary-list__value">Agenția pentru Servicii Digitale — exemplu</dd>
              <dd className="sd-summary-list__actions">
                <a href="#cards-title">
                  Modifică<span className="sd-visually-hidden"> denumirea instituției</span>
                </a>
              </dd>
            </div>
            <div className="sd-summary-list__row">
              <dt className="sd-summary-list__key">Cod fiscal</dt>
              <dd className="sd-summary-list__value">12345678</dd>
              <dd className="sd-summary-list__actions">
                <a href="#cards-title">
                  Verifică<span className="sd-visually-hidden"> codul fiscal</span>
                </a>
              </dd>
            </div>
            <div className="sd-summary-list__row">
              <dt className="sd-summary-list__key">Adresă oficială</dt>
              <dd className="sd-summary-list__value">
                Strada Memorandumului 1, Cluj-Napoca, 400114
              </dd>
              <dd className="sd-summary-list__actions">
                <a href="#cards-title">
                  Modifică<span className="sd-visually-hidden"> adresa oficială</span>
                </a>
              </dd>
            </div>
          </dl>

          <ul className="sd-metadata" aria-label="Metadatele înregistrării">
            <li className="sd-metadata__item">
              <span className="sd-metadata__label">Sursă:</span>
              <span>registru demonstrativ</span>
            </li>
            <li className="sd-metadata__item">
              <span className="sd-metadata__label">Versiune:</span>
              <span>3</span>
            </li>
            <li className="sd-metadata__item">
              <span className="sd-metadata__label">Licență:</span>
              <span>CC BY 4.0</span>
            </li>
          </ul>
          <p className="sd-last-updated">
            Ultima actualizare:{' '}
            <time dateTime="2026-07-22T18:30:00+03:00">22 iulie 2026, ora 18:30</time>
          </p>
        </section>

        <section className={styles.section} aria-labelledby="details-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Details și conținut lung</p>
            <h2 id="details-title">Conținutul suplimentar rămâne disponibil fără JavaScript.</h2>
          </div>

          <div className={styles.detailsStack}>
            <details className="sd-details">
              <summary>Ce înseamnă „date verificate”?</summary>
              <div className="sd-details__content">
                <p>
                  Înseamnă că instituția responsabilă a confirmat valorile, sursa și data ultimei
                  actualizări. Componenta nu garantează singură calitatea datelor; procesul de
                  guvernanță trebuie documentat separat.
                </p>
              </div>
            </details>
            <details className="sd-details">
              <summary>Când nu folosim un tabel?</summary>
              <div className="sd-details__content">
                <p>
                  Nu folosim tabel pentru layout, pentru o listă simplă de carduri sau când fiecare
                  element are atribute diferite. În aceste situații sunt mai potrivite lista, cardul
                  ori summary list.
                </p>
              </div>
            </details>
          </div>

          <article className={`${styles.panel} ${styles.longContent}`}>
            <h3>Exemplu de conținut lung</h3>
            <p>
              Un serviciu public trebuie să explice scopul operațiunii înainte de a solicita date.
              Informația esențială apare prima, este scrisă în propoziții scurte și folosește
              termenii cunoscuți de utilizator. Detaliile juridice sau tehnice pot urma, dar nu
              înlocuiesc explicația practică.
            </p>
            <p>
              Paragrafele lungi sunt limitate la o măsură de lectură confortabilă. Listele sunt
              folosite numai când elementele sunt cu adevărat paralele. Titlurile descriu conținutul
              secțiunii și păstrează o ierarhie logică, fără niveluri alese pentru aspect.
            </p>
          </article>
        </section>

        <section className={styles.section} aria-labelledby="pagination-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Pagination</p>
            <h2 id="pagination-title">
              Fiecare pagină are un URL stabil și pagina curentă este textuală.
            </h2>
          </div>

          <nav className="sd-pagination" aria-label="Paginarea rezultatelor">
            <ul className="sd-pagination__list">
              <li>
                <a href="?page=1" rel="prev">
                  <span aria-hidden="true">←</span> Pagina anterioară
                </a>
              </li>
              <li>
                <a href="?page=1">
                  <span className="sd-pagination__label">Pagina </span>1
                </a>
              </li>
              <li>
                <span aria-current="page">
                  <span className="sd-pagination__label">Pagina curentă, </span>2
                </span>
              </li>
              <li>
                <a href="?page=3">
                  <span className="sd-pagination__label">Pagina </span>3
                </a>
              </li>
              <li>
                <a href="?page=3" rel="next">
                  Pagina următoare <span aria-hidden="true">→</span>
                </a>
              </li>
            </ul>
          </nav>
        </section>

        <section className={styles.section} aria-labelledby="markup-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Markup de referință</p>
            <h2 id="markup-title">
              Semantica este contractul, clasele oferă prezentarea oficială.
            </h2>
          </div>
          <pre className={styles.code} tabIndex={0} aria-label="Exemplu HTML pentru summary list">
            <code>{`<dl class="sd-summary-list">
  <div class="sd-summary-list__row">
    <dt class="sd-summary-list__key">Cod fiscal</dt>
    <dd class="sd-summary-list__value">12345678</dd>
    <dd class="sd-summary-list__actions">
      <a href="/modifica">Modifică <span class="sd-visually-hidden">codul fiscal</span></a>
    </dd>
  </div>
</dl>`}</code>
          </pre>
        </section>
      </main>

      <PublicFooter>
        <p>Exemplele numerice și instituțiile din această pagină sunt demonstrative.</p>
      </PublicFooter>
    </>
  );
}
