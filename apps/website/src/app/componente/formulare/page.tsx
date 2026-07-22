import type { Metadata } from 'next';

import { FormErrorEnhancement } from '../../../components/form-error-enhancement';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Formulare și validare',
  description:
    'Componente accesibile pentru formulare, validare, mesaje de eroare și progressive enhancement.',
};

const invalidExample = `<div class="sd-form-group sd-form-group--error">
  <label class="sd-label" for="email">Adresa de e-mail</label>
  <p class="sd-hint" id="email-hint">Vom trimite confirmarea aici.</p>
  <p class="sd-error-message" id="email-error">
    Introdu o adresă în formatul nume@exemplu.ro
  </p>
  <input
    class="sd-input"
    id="email"
    type="email"
    autocomplete="email"
    aria-invalid="true"
    aria-describedby="email-hint email-error"
  />
</div>`;

export default function FormsReferencePage() {
  return (
    <div className={styles.page}>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>

      <header className={styles.header}>
        <div className={`container ${styles.headerInner}`}>
          <a className={styles.brand} href="/" aria-label="Sistem Digital — pagina principală">
            Sistem Digital
          </a>
          <a className={styles.backLink} href="https://github.com/ciprian-rus/sistem.digital">
            Cod sursă
          </a>
        </div>
      </header>

      <main className={`container ${styles.main}`} id="continut">
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <a href="/">Acasă</a> <span aria-hidden="true">/</span>{' '}
          <span aria-current="page">Formulare și validare</span>
        </nav>

        <section className={styles.intro} aria-labelledby="page-title">
          <p className="section-kicker">Componente · M2</p>
          <h1 id="page-title">Formulare care explică problema și calea de rezolvare.</h1>
          <p className={styles.lead}>
            Markup semantic, controale native și mesaje clare. Fluxul de bază funcționează fără
            JavaScript; helperul opțional mută focusul în rezumatul erorilor după validarea pe server.
          </p>
          <div className={styles.meta} aria-label="Caracteristici">
            <span className={styles.badge}>HTML semantic</span>
            <span className={styles.badge}>Progressive enhancement</span>
            <span className={styles.badge}>WCAG 2.2 AA</span>
            <span className={styles.badge}>Fără React obligatoriu</span>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="invalid-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Exemplu invalid</p>
            <h2 id="invalid-title">Răspunsul serverului păstrează datele și explică fiecare eroare.</h2>
            <p>
              Rezumatul apare înaintea formularului, conține linkuri către câmpuri și primește focus
              numai prin enhancement. Fără JavaScript, linkurile și toate controalele rămân utilizabile.
            </p>
          </div>

          <div
            className="sd-error-summary"
            data-sd-error-summary
            aria-labelledby="error-summary-title"
            tabIndex={-1}
          >
            <h3 className="sd-error-summary__title" id="error-summary-title">
              Sunt două probleme de rezolvat
            </h3>
            <p className="sd-error-summary__intro">
              Corectează informațiile de mai jos, apoi trimite formularul din nou.
            </p>
            <ul className="sd-error-summary__list">
              <li>
                <a href="#email">Introdu adresa de e-mail</a>
              </li>
              <li>
                <a href="#service-type">Alege tipul serviciului</a>
              </li>
            </ul>
          </div>
          <FormErrorEnhancement />

          <form className="sd-form" action="/componente/formulare" method="get" noValidate>
            <div className="sd-form-group sd-form-group--error">
              <label className="sd-label sd-label--large" htmlFor="email">
                Adresa de e-mail
              </label>
              <p className="sd-hint" id="email-hint">
                Vom trimite confirmarea cererii la această adresă.
              </p>
              <p className="sd-error-message" id="email-error">
                Introdu o adresă în formatul nume@exemplu.ro
              </p>
              <input
                className="sd-input"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid="true"
                aria-describedby="email-hint email-error"
                defaultValue="ciprian@"
              />
            </div>

            <div className="sd-form-group sd-form-group--error">
              <label className="sd-label sd-label--large" htmlFor="service-type">
                Tipul serviciului
              </label>
              <p className="sd-hint" id="service-type-hint">
                Alege serviciul care descrie cel mai bine solicitarea.
              </p>
              <p className="sd-error-message" id="service-type-error">
                Alege o opțiune din listă
              </p>
              <select
                className="sd-select"
                id="service-type"
                name="service-type"
                aria-invalid="true"
                aria-describedby="service-type-hint service-type-error"
                defaultValue=""
              >
                <option value="" disabled>
                  Alege serviciul
                </option>
                <option value="certificate">Eliberare certificat</option>
                <option value="payment">Plată taxă</option>
                <option value="correction">Corectare date</option>
              </select>
            </div>

            <fieldset className="sd-fieldset">
              <legend className="sd-legend sd-legend--large">
                Cum dorești să primești documentul?
              </legend>
              <p className="sd-hint" id="delivery-hint">
                Alege o singură opțiune.
              </p>
              <div className="sd-choice-list" aria-describedby="delivery-hint">
                <label className="sd-choice">
                  <input
                    className="sd-choice__control"
                    type="radio"
                    name="delivery"
                    value="digital"
                    defaultChecked
                  />
                  <span className="sd-choice__label">
                    În format digital
                    <span className="sd-choice__hint">Primești documentul în inboxul oficial.</span>
                  </span>
                </label>
                <label className="sd-choice">
                  <input
                    className="sd-choice__control"
                    type="radio"
                    name="delivery"
                    value="counter"
                  />
                  <span className="sd-choice__label">
                    Ridicare de la ghișeu
                    <span className="sd-choice__hint">Primești o notificare când este pregătit.</span>
                  </span>
                </label>
              </div>
            </fieldset>

            <div className="sd-form-group">
              <label className="sd-label sd-label--large" htmlFor="details">
                Detalii suplimentare <span className="sd-required">(opțional)</span>
              </label>
              <p className="sd-hint" id="details-hint">
                Nu include date personale care nu sunt necesare soluționării cererii.
              </p>
              <textarea
                className="sd-textarea"
                id="details"
                name="details"
                aria-describedby="details-hint"
                rows={6}
              />
            </div>

            <div className="sd-form-group">
              <label className="sd-label sd-label--large" htmlFor="attachment">
                Document justificativ <span className="sd-required">(opțional)</span>
              </label>
              <p className="sd-hint" id="attachment-hint">
                PDF, PNG sau JPG, maximum 10 MB.
              </p>
              <input
                className="sd-file-input"
                id="attachment"
                name="attachment"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                aria-describedby="attachment-hint"
              />
            </div>

            <label className="sd-choice">
              <input className="sd-choice__control" type="checkbox" name="confirmation" />
              <span className="sd-choice__label">
                Confirm că informațiile introduse sunt corecte
              </span>
            </label>

            <div className="sd-button-group">
              <button className="sd-button sd-button--primary" type="submit">
                Trimite din nou
              </button>
              <button className="sd-button sd-button--secondary" type="button">
                Salvează pentru mai târziu
              </button>
            </div>
          </form>
        </section>

        <section className={styles.section} aria-labelledby="valid-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Exemplu valid</p>
            <h2 id="valid-title">Hint-ul explică scopul, iar browserul poate completa datele.</h2>
          </div>

          <div className={styles.exampleGrid}>
            <article className={styles.examplePanel}>
              <h3>Adresă de corespondență</h3>
              <div className="sd-form-group">
                <label className="sd-label" htmlFor="full-name">
                  Nume complet
                </label>
                <input
                  className="sd-input"
                  id="full-name"
                  name="full-name"
                  autoComplete="name"
                  defaultValue="Ana Popescu"
                />
              </div>
              <div className="sd-form-group">
                <label className="sd-label" htmlFor="postal-code">
                  Cod poștal
                </label>
                <p className="sd-hint" id="postal-code-hint">
                  Șase cifre, fără spații.
                </p>
                <input
                  className="sd-input sd-input--width-10"
                  id="postal-code"
                  name="postal-code"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  aria-describedby="postal-code-hint"
                  defaultValue="400000"
                />
              </div>
            </article>

            <article className={styles.examplePanel}>
              <h3>Alegeri multiple</h3>
              <fieldset className="sd-fieldset">
                <legend className="sd-legend">Ce notificări dorești?</legend>
                <div className="sd-choice-list">
                  <label className="sd-choice">
                    <input
                      className="sd-choice__control"
                      type="checkbox"
                      name="notification"
                      value="status"
                      defaultChecked
                    />
                    <span className="sd-choice__label">Schimbarea stadiului cererii</span>
                  </label>
                  <label className="sd-choice">
                    <input
                      className="sd-choice__control"
                      type="checkbox"
                      name="notification"
                      value="deadline"
                    />
                    <span className="sd-choice__label">Apropierea unui termen</span>
                  </label>
                </div>
              </fieldset>
            </article>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="states-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Stări native</p>
            <h2 id="states-title">Readonly și disabled nu înseamnă același lucru.</h2>
          </div>

          <div className={styles.stateGrid}>
            <div className="sd-form-group">
              <label className="sd-label" htmlFor="readonly-reference">
                Număr de înregistrare
              </label>
              <p className="sd-hint" id="readonly-reference-hint">
                Valoarea este transmisă, dar nu poate fi modificată.
              </p>
              <input
                className="sd-input"
                id="readonly-reference"
                name="readonly-reference"
                readOnly
                aria-describedby="readonly-reference-hint"
                defaultValue="SD-2026-00142"
              />
            </div>

            <div className="sd-form-group">
              <label className="sd-label" htmlFor="disabled-department">
                Compartiment
              </label>
              <p className="sd-hint" id="disabled-department-hint">
                Controlul nu este disponibil în această etapă.
              </p>
              <input
                className="sd-input"
                id="disabled-department"
                name="disabled-department"
                disabled
                aria-describedby="disabled-department-hint"
                defaultValue="Se stabilește automat"
              />
            </div>
          </div>

          <p className={styles.note}>
            <strong>Regulă:</strong> nu folosi disabled pentru informații pe care utilizatorul trebuie
            să le poată selecta, copia sau înțelege. În aceste cazuri, readonly ori textul simplu sunt
            opțiuni mai potrivite.
          </p>
        </section>

        <section className={styles.section} aria-labelledby="markup-title">
          <div className={styles.sectionHeader}>
            <p className="section-kicker">Markup de referință</p>
            <h2 id="markup-title">Asocierea programatică este parte din componentă.</h2>
          </div>
          <pre className={styles.code} tabIndex={0} aria-label="Exemplu HTML pentru câmp invalid">
            <code>{invalidExample}</code>
          </pre>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <strong>Sistem Digital</strong> — componente publice, deschise și testabile.
        </div>
      </footer>
    </div>
  );
}
