import { ThemeControls } from '../components/theme-controls';

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
    description:
      'Componentele vor fi validate în fluxuri administrative complete, nu doar în galerii.',
  },
];

const feedbackExamples = [
  {
    tone: 'info',
    symbol: 'i',
    title: 'Informație',
    message: 'Poți salva cererea și reveni înainte de trimitere.',
  },
  {
    tone: 'success',
    symbol: '✓',
    title: 'Cerere salvată',
    message: 'Datele au fost păstrate în siguranță.',
  },
  {
    tone: 'warning',
    symbol: '!',
    title: 'Verifică termenul',
    message: 'Documentul expiră în următoarele 30 de zile.',
  },
  {
    tone: 'danger',
    symbol: '×',
    title: 'Câmp incomplet',
    message: 'Introdu codul poștal pentru a continua.',
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

          <div className="header-actions">
            <nav aria-label="Navigație principală">
              <ul className="nav-list">
                <li>
                  <a href="#principii">Principii</a>
                </li>
                <li>
                  <a href="#teme">Teme</a>
                </li>
                <li>
                  <a href="#fundatie">Fundație</a>
                </li>
                <li>
                  <a href="https://github.com/users/ciprian-rus/projects/5">Roadmap</a>
                </li>
              </ul>
            </nav>
            <ThemeControls />
          </div>
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

            <aside className="status-card" aria-labelledby="milestone-title">
              <p className="status-label">Etapa curentă</p>
              <h2 id="milestone-title">M1 — Fundamente și design tokens</h2>
              <ul>
                <li>Arhitectură DTCG multi-platformă</li>
                <li>Patru teme oficiale validate</li>
                <li>Personalizare instituțională controlată</li>
                <li>Tipografie, grilă, focus și motion</li>
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

        <section className="section section-subtle" id="teme">
          <div className="container">
            <p className="section-kicker">Teme funcționale</p>
            <h2>Aceeași semantică în orice condiții de utilizare.</h2>
            <p className="body-copy">
              Alege tema din antet. Fiecare variantă păstrează aceleași roluri, stări și mesaje, iar
              contrastul este verificat automat înainte de publicare.
            </p>

            <div className="theme-demo-grid">
              <article className="service-example" data-sd-accent="teal">
                <p className="status-label">Exemplu tranzacțional</p>
                <h3>Solicită un document</h3>
                <div className="field-group">
                  <label htmlFor="document-name">Denumirea documentului</label>
                  <input id="document-name" name="document-name" defaultValue="Certificat fiscal" />
                  <p className="field-hint">Poți modifica denumirea înainte de trimitere.</p>
                </div>
                <button className="button button-primary" type="button">
                  Continuă
                </button>
              </article>

              <div className="feedback-stack" aria-label="Exemple de mesaje de stare">
                {feedbackExamples.map((item) => (
                  <article className={`feedback-message feedback-${item.tone}`} key={item.tone}>
                    <span className="feedback-symbol" aria-hidden="true">
                      {item.symbol}
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.message}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="fundatie">
          <div className="container split-grid">
            <div>
              <p className="section-kicker">Prima piesă reutilizabilă</p>
              <h2>Token-uri și teme distribuite ca pachet, CSS și JSON.</h2>
              <p className="body-copy">
                Sursa canonică este neutră față de framework. Proiectele moderne instalează
                pachetul, iar site-urile legacy pot folosi fișiere versionate și self-hosted.
              </p>
            </div>
            <pre className="code-block" aria-label="Exemplu de instalare" tabIndex={0}>
              <code>{`pnpm add @sistem-digital/tokens\n\nimport '@sistem-digital/tokens/css';\nimport '@sistem-digital/tokens/themes.css';`}</code>
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
