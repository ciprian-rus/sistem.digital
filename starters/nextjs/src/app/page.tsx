export default function HomePage() {
  return (
    <>
      <a className="sd-skip-link" href="#continut">
        Sari la conținut
      </a>

      <section className="sd-official-banner" aria-label="Informație despre autenticitate">
        <div className="sd-official-banner__inner">
          <span className="sd-official-banner__mark" aria-hidden="true">
            RO
          </span>
          <p>Acesta este un exemplu local. Domeniul oficial se configurează per instituție.</p>
        </div>
      </section>

      <header className="sd-header">
        <div className="sd-header__identity-row">
          <a className="sd-identity" href="/">
            <span className="sd-identity__mark" aria-hidden="true">
              SD
            </span>
            <span className="sd-identity__text">
              <span className="sd-identity__name">Instituția exemplu</span>
              <span className="sd-identity__service">Serviciu digital</span>
            </span>
          </a>
        </div>
        <nav className="sd-primary-navigation" aria-label="Navigație principală">
          <ul className="sd-primary-navigation__list">
            <li>
              <a href="/" aria-current="page">
                Servicii
              </a>
            </li>
            <li>
              <a href="#">Despre instituție</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="continut" tabIndex={-1}>
        <div style={{ maxWidth: '42rem', margin: '3rem auto', padding: '0 1rem' }}>
          <h1>Întrebări frecvente</h1>

          <section className="sd-alert sd-alert--info" aria-labelledby="starter-info">
            <div className="sd-alert__content">
              <strong className="sd-alert__title" id="starter-info">
                Acesta este un exemplu
              </strong>
              <p>
                Conținutul de mai jos e static — înlocuiește-l cu întrebările reale ale serviciului
                tău.
              </p>
            </div>
          </section>

          <div className="sd-accordion" data-sd-accordion="single">
            <details open>
              <summary>Cine poate depune o cerere?</summary>
              <div className="sd-accordion__content">
                <p>Persoana vizată sau reprezentantul ei legal.</p>
              </div>
            </details>
            <details>
              <summary>Cât durează procesarea?</summary>
              <div className="sd-accordion__content">
                <p>De obicei două zile lucrătoare.</p>
              </div>
            </details>
          </div>

          <h2>Trimite o întrebare</h2>

          <form>
            <div className="sd-form-group">
              <label className="sd-label" htmlFor="starter-name">
                Nume complet
              </label>
              <input className="sd-input" id="starter-name" name="name" autoComplete="name" />
            </div>

            <div className="sd-form-group">
              <label className="sd-label" htmlFor="starter-email">
                Adresă de e-mail
              </label>
              <input
                className="sd-input"
                id="starter-email"
                name="email"
                type="email"
                autoComplete="email"
              />
            </div>

            <fieldset className="sd-fieldset">
              <legend className="sd-legend">Cum preferi să primești răspunsul?</legend>
              <label className="sd-choice">
                <input type="radio" name="delivery" value="digital" defaultChecked />
                Digital, pe e-mail
              </label>
              <label className="sd-choice">
                <input type="radio" name="delivery" value="hartie" />
                Prin poștă, pe hârtie
              </label>
            </fieldset>

            <button className="sd-button sd-button--primary" type="submit">
              Trimite întrebarea
            </button>
          </form>
        </div>
      </main>

      <footer className="sd-footer">
        <div className="sd-footer__main">
          <section>
            <h2 className="sd-footer__heading">Instituția exemplu</h2>
            <p>Servicii digitale publice, construite cu Sistem Digital.</p>
          </section>
          <nav aria-label="Resurse">
            <ul className="sd-footer__list">
              <li>
                <a href="https://sistem.digital">Sistem Digital</a>
              </li>
              <li>
                <a href="https://github.com/ciprian-rus/sistem.digital">Cod sursă</a>
              </li>
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}
