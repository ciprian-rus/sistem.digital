import type { Metadata } from 'next';

import { Breadcrumbs, PublicFooter, PublicHeader } from '../../../components/public-shell';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Componente interactive',
  description:
    'Accordion, dialog, tabs, step indicator, date input, autocomplete și upload avansat cu progressive enhancement.',
  alternates: { canonical: '/componente/interactive' },
};

export default function InteractiveComponentsPage() {
  return (
    <>
      <PublicHeader currentPath="/componente/interactive" serviceName="Biblioteca de componente" />

      <main className={`container ${styles.main}`} id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/componente/formulare', label: 'Componente' },
            { label: 'Interactive' },
          ]}
        />

        <section className={styles.intro} aria-labelledby="page-title">
          <p className="section-kicker">Componente · M2</p>
          <h1 id="page-title">Interacțiuni complexe, cu fallback simplu și verificabil.</h1>
          <p className={styles.lead}>
            HTML-ul server-rendered rămâne utilizabil fără JavaScript. Enhancement-urile adaugă
            focus management, navigare cu săgeți, filtrare și feedback dinamic numai acolo unde aduc
            valoare.
          </p>
          <ul className="sd-metadata" aria-label="Caracteristici">
            <li className="sd-metadata__item">
              <span className="sd-metadata__label">Pachet:</span>
              <code>@sistem-digital/components</code>
            </li>
            <li className="sd-metadata__item">
              <span className="sd-metadata__label">Modul:</span>
              <code>interactive.css</code>
            </li>
            <li className="sd-metadata__item">
              <span className="sd-metadata__label">Strategie:</span>
              <span>progressive enhancement</span>
            </li>
          </ul>
        </section>

        <section className={styles.section} aria-labelledby="accordion-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Accordion</p>
            <h2 id="accordion-title">
              Disclosure nativ, grupat numai când exclusivitatea este necesară.
            </h2>
            <p>
              Fiecare secțiune folosește <code>details</code> și <code>summary</code>. Fără
              JavaScript pot rămâne deschise mai multe secțiuni; enhancement-ul opțional închide
              automat elementele vecine.
            </p>
          </div>
          <div className="sd-accordion" data-sd-accordion="single">
            <details open>
              <summary>Cine poate depune cererea?</summary>
              <div className="sd-accordion__content">
                <p>
                  Persoana vizată, reprezentantul legal sau un împuternicit cu mandat verificabil.
                </p>
              </div>
            </details>
            <details>
              <summary>Ce documente sunt necesare?</summary>
              <div className="sd-accordion__content">
                <p>
                  Serviciul verifică identitatea și situația fiscală la sursă. Nu solicită copii
                  după acte.
                </p>
              </div>
            </details>
            <details>
              <summary>Cât durează soluționarea?</summary>
              <div className="sd-accordion__content">
                <p>
                  Termenul estimat este de două zile lucrătoare, iar stadiul poate fi urmărit
                  online.
                </p>
              </div>
            </details>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="dialog-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Dialog</p>
            <h2 id="dialog-title">Dialogul nativ păstrează focusul și oferă un fallback inline.</h2>
            <p>
              Linkul de declanșare indică secțiunea prin fragment. Cu JavaScript, aceeași secțiune
              devine modală; la închidere, focusul revine pe elementul care a deschis-o.
            </p>
          </div>
          <div className={styles.actions}>
            <a
              className="sd-button sd-button--primary"
              href="#confirm-dialog"
              aria-controls="confirm-dialog"
              data-sd-dialog-trigger
            >
              Revizuiește trimiterea
            </a>
          </div>
          <dialog
            className="sd-dialog"
            id="confirm-dialog"
            data-sd-dialog
            aria-labelledby="confirm-dialog-title"
          >
            <div className="sd-dialog__header">
              <h3 className="sd-dialog__title" id="confirm-dialog-title">
                Trimite cererea către instituție?
              </h3>
              <button className="sd-dialog__close" type="button" data-sd-dialog-close>
                Închide
              </button>
            </div>
            <div className="sd-dialog__body">
              <p>După trimitere vei primi un număr de înregistrare și o confirmare în inbox.</p>
              <p>Datele declarate pot fi corectate până când instituția începe verificarea.</p>
            </div>
            <div className="sd-dialog__footer">
              <button className="sd-button sd-button--secondary" type="button" data-sd-dialog-close>
                Revino la formular
              </button>
              <button className="sd-button sd-button--primary" type="button" data-sd-dialog-close>
                Confirmă trimiterea
              </button>
            </div>
          </dialog>
        </section>

        <section className={styles.section} aria-labelledby="tabs-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Tabs</p>
            <h2 id="tabs-title">
              Tabs sunt folosite numai pentru variante paralele ale aceluiași conținut.
            </h2>
            <p>
              Fără JavaScript, toate secțiunile sunt afișate succesiv. Cu enhancement, săgețile
              stânga și dreapta, Home și End mută selecția conform pattern-ului ARIA.
            </p>
          </div>
          <div className="sd-tabs" data-sd-tabs>
            <div data-sd-tab-list hidden aria-label="Modalități de primire">
              <button
                id="tab-digital"
                type="button"
                data-sd-tab
                aria-controls="panel-digital"
                aria-selected="true"
              >
                Digital
              </button>
              <button id="tab-counter" type="button" data-sd-tab aria-controls="panel-counter">
                La ghișeu
              </button>
              <button id="tab-post" type="button" data-sd-tab aria-controls="panel-post">
                Prin poștă
              </button>
            </div>
            <section id="panel-digital" data-sd-tab-panel>
              <div className={styles.tabsContent}>
                <h3>Document digital semnat</h3>
                <p>Îl primești în inbox și îl poți verifica prin codul inclus în document.</p>
              </div>
            </section>
            <section id="panel-counter" data-sd-tab-panel>
              <div className={styles.tabsContent}>
                <h3>Ridicare de la ghișeu</h3>
                <p>
                  Primești o notificare când documentul este pregătit și îl ridici cu actul de
                  identitate.
                </p>
              </div>
            </section>
            <section id="panel-post" data-sd-tab-panel>
              <div className={styles.tabsContent}>
                <h3>Livrare prin poștă</h3>
                <p>Termenul de livrare este separat de termenul administrativ de soluționare.</p>
              </div>
            </section>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="steps-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Step indicator</p>
            <h2 id="steps-title">Progresul este textual și nu funcționează ca navigație falsă.</h2>
          </div>
          <nav className="sd-step-indicator" aria-label="Progresul cererii">
            <ol className="sd-step-indicator__list">
              <li className="sd-step-indicator__item sd-step-indicator__item--complete">
                <span className="sd-step-indicator__marker" aria-hidden="true">
                  ✓
                </span>
                <span className="sd-step-indicator__label">Date personale</span>
              </li>
              <li className="sd-step-indicator__item sd-step-indicator__item--complete">
                <span className="sd-step-indicator__marker" aria-hidden="true">
                  ✓
                </span>
                <span className="sd-step-indicator__label">Detalii cerere</span>
              </li>
              <li className="sd-step-indicator__item" aria-current="step">
                <span className="sd-step-indicator__marker" aria-hidden="true">
                  3
                </span>
                <span className="sd-step-indicator__label">Verificare</span>
              </li>
              <li className="sd-step-indicator__item">
                <span className="sd-step-indicator__marker" aria-hidden="true">
                  4
                </span>
                <span className="sd-step-indicator__label">Confirmare</span>
              </li>
            </ol>
          </nav>
        </section>

        <section className={styles.section} aria-labelledby="inputs-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Date și autocomplete</p>
            <h2 id="inputs-title">
              Controalele native sunt baseline-ul; listbox-ul este enhancement.
            </h2>
          </div>
          <div className={styles.demoGrid}>
            <article className={styles.panel}>
              <h3>Data evenimentului</h3>
              <div className="sd-date-input" role="group" aria-describedby="event-date-hint">
                <div className="sd-date-input__part sd-date-input__part--day">
                  <label htmlFor="event-day">Zi</label>
                  <input
                    id="event-day"
                    name="event-day"
                    inputMode="numeric"
                    autoComplete="bday-day"
                    maxLength={2}
                  />
                </div>
                <div className="sd-date-input__part sd-date-input__part--month">
                  <label htmlFor="event-month">Lună</label>
                  <input
                    id="event-month"
                    name="event-month"
                    inputMode="numeric"
                    autoComplete="bday-month"
                    maxLength={2}
                  />
                </div>
                <div className="sd-date-input__part sd-date-input__part--year">
                  <label htmlFor="event-year">An</label>
                  <input
                    id="event-year"
                    name="event-year"
                    inputMode="numeric"
                    autoComplete="bday-year"
                    maxLength={4}
                  />
                </div>
              </div>
              <p className="sd-hint" id="event-date-hint">
                De exemplu, 31 08 2026.
              </p>
              <label className="sd-label" htmlFor="native-date">
                Sau folosește selectorul nativ
              </label>
              <input
                className="sd-date-picker"
                id="native-date"
                name="native-date"
                type="date"
                min="2026-01-01"
              />
            </article>

            <article className={styles.panel}>
              <h3>Alege instituția</h3>
              <div className="sd-autocomplete" data-sd-autocomplete>
                <label className="sd-label" htmlFor="institution-search">
                  Instituție
                </label>
                <p className="sd-hint" id="institution-hint">
                  Scrie cel puțin două caractere.
                </p>
                <input
                  className="sd-input"
                  id="institution-search"
                  name="institution"
                  type="text"
                  list="institution-options"
                  autoComplete="off"
                  aria-describedby="institution-hint institution-status"
                  data-sd-autocomplete-input
                />
                <datalist id="institution-options">
                  <option value="Primăria Cluj-Napoca" />
                  <option value="Primăria Alba Iulia" />
                  <option value="Primăria Brașov" />
                  <option value="Consiliul Județean Cluj" />
                  <option value="Direcția de Evidență a Persoanelor Cluj" />
                </datalist>
                <div data-sd-autocomplete-menu hidden />
                <p
                  className="sd-visually-hidden"
                  id="institution-status"
                  aria-live="polite"
                  data-sd-autocomplete-status
                />
              </div>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="upload-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Upload avansat</p>
            <h2 id="upload-title">Inputul nativ rămâne disponibil, inclusiv fără drag-and-drop.</h2>
            <p>
              Lista fișierelor și eliminarea individuală sunt enhancement-uri. Serverul validează
              din nou tipul și dimensiunea.
            </p>
          </div>
          <div className="sd-file-upload-advanced" data-sd-file-upload data-sd-file-dropzone>
            <label className="sd-label" htmlFor="supporting-files">
              Documente justificative
            </label>
            <p className="sd-file-upload-advanced__instructions" id="supporting-files-hint">
              Selectează fișiere sau trage-le în această zonă. PDF, JPG sau PNG, maximum 10 MB
              fiecare.
            </p>
            <input
              className="sd-file-upload"
              id="supporting-files"
              name="supporting-files"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              multiple
              aria-describedby="supporting-files-hint supporting-files-status"
            />
            <ul className="sd-file-upload__list" data-sd-file-list />
            <p
              className="sd-visually-hidden"
              id="supporting-files-status"
              aria-live="polite"
              data-sd-file-status
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="known-issues-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Limite cunoscute</p>
            <h2 id="known-issues-title">Alpha nu înseamnă conformitate declarată.</h2>
          </div>
          <ul className={styles.knownIssues}>
            <li>Dialogul necesită testare manuală suplimentară cu VoiceOver pe iOS și macOS.</li>
            <li>
              Autocomplete-ul nu înlocuiește o căutare server-side pentru liste foarte mari sau
              sensibile.
            </li>
            <li>
              Selectorul nativ de dată diferă între browsere; formatul și erorile trebuie explicate
              textual.
            </li>
            <li>
              Drag-and-drop este opțional și nu poate fi singura cale pentru încărcarea fișierelor.
            </li>
            <li>
              Baseline-urile vizuale detectează schimbări, dar nu decid dacă o schimbare este
              corectă.
            </li>
          </ul>
          <pre className={styles.code} tabIndex={0} aria-label="Exemplu inițializare JavaScript">
            <code>{`import { enhanceInteractiveComponents } from '@sistem-digital/components';

const cleanup = enhanceInteractiveComponents();
// La demontare: cleanup();`}</code>
          </pre>
        </section>
      </main>

      <PublicFooter>
        <p>
          Componentele interactive sunt alpha și necesită audit manual înainte de utilizare critică.
        </p>
      </PublicFooter>
    </>
  );
}
