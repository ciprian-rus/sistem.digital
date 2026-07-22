const principles = [
  {
    title: 'Accesibil implicit',
    description: 'WCAG 2.2 AA este criteriu de acceptare, nu o verificare adăugată la final.',
  },
  {
    title: 'Deschis și reutilizabil',
    description: 'Token-uri și componente versionate, independente de un singur furnizor.',
  },
  {
    title: 'Construit pentru servicii',
    description: 'Componentele vor fi validate în fluxuri administrative complete, nu doar în galerii.',
  },
];

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#continut">
        Sari la conținut
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="/" aria-label="Sistem Digital — pagina principală">
            <span className="brand-mark" aria-hidden="true">
              SD
            </span>
            <span>Sistem Digital</span>
          </a>
          <nav aria-label="Navigație principală">
            <ul className="nav-list">
              <li>
                <a href="#principii">Principii</a>
              </li>
              <li>
                <a href="#fundatie">Fundație</a>
              </li>
              <li>
                <a href="https://github.com/users/ciprian-rus/projects/5">Roadmap</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="continut">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Versiune alpha · proiect open-source</p>
              <h1>Un limbaj digital comun pentru servicii publice mai clare.</h1>
              <p className="hero-copy">
                Construim infrastructura de design pe care instituțiile, furnizorii și comunitățile
                o pot instala, testa, actualiza și îmbunătăți împreună.
              </p>
              <div className="actions">
                <a
                  className="button button-primary"
                  href="https://github.com/ciprian-rus/sistem.digital"
                >
                  Vezi codul sursă
                </a>
                <a
                  className="button button-secondary"
                  href="https://github.com/ciprian-rus/sistem.digital/issues"
                >
                  Explorează backlog-ul
                </a>
              </div>
            </div>
            <aside className="status-card" aria-labelledby="status-title">
              <p className="status-label">Etapa curentă</p>
              <h2 id="status-title">M0 — Fundația proiectului</h2>
              <ul>
                <li>Monorepo și convenții tehnice</li>
                <li>Design tokens canonice</li>
                <li>CI și verificări reproductibile</li>
                <li>Guvernanță și contribuții publice</li>
              </ul>
            </aside>
          </div>
        </section>

        <section className="section" id="principii">
          <div className="container">
            <p className="section-kicker">Principii de produs</p>
            <h2>Coerență fără uniformitate rigidă.</h2>
            <div className="principles-grid">
              {principles.map((principle) => (
                <article className="principle-card" key={principle.title}>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-subtle" id="fundatie">
          <div className="container split-grid">
            <div>
              <p className="section-kicker">Prima piesă reutilizabilă</p>
              <h2>Token-uri distribuite ca pachet, CSS și JSON.</h2>
              <p className="body-copy">
                Sursa canonică este neutră față de framework. Proiectele moderne vor instala pachete,
                iar site-urile legacy vor putea folosi fișiere versionate și self-hosted.
              </p>
            </div>
            <pre className="code-block" aria-label="Exemplu de instalare">
              <code>{`pnpm add @sistem-digital/tokens\n\nimport '@sistem-digital/tokens/css';`}</code>
            </pre>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <p>
            <strong>Sistem Digital</strong> — infrastructură publică open-source.
          </p>
          <a href="https://github.com/ciprian-rus/sistem.digital/blob/main/CONTRIBUTING.md">
            Contribuie
          </a>
        </div>
      </footer>
    </>
  );
}
