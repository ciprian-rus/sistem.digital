import { PublicFooter, PublicHeader } from '../components/public-shell';

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
      <PublicHeader currentPath="/" showMajorAlert />

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
                <a className="button button-primary" href="/componente/formulare">
                  Explorează formularele
                </a>
                <a className="button button-secondary" href="/componente/navigatie">
                  Explorează navigația
                </a>
              </div>
            </div>

            <aside className="status-card" aria-labelledby="milestone-title">
              <p className="status-label">Etapa curentă</p>
              <h2 id="milestone-title">M2 — Biblioteca de componente accesibile</h2>
              <ul>
                <li>Formulare și validare</li>
                <li>Navigație și structură instituțională</li>
                <li>Conținut și afișare de date</li>
                <li>Componente interactive testate</li>
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
              <p className="section-kicker">Fundație reutilizabilă</p>
              <h2>Token-uri, teme și componente distribuite ca pachete publice.</h2>
              <p className="body-copy">
                Sursa canonică este neutră față de framework. Proiectele moderne instalează
                pachetele, iar site-urile legacy pot folosi fișiere versionate și self-hosted.
              </p>
            </div>
            <pre className="code-block" aria-label="Exemplu de instalare" tabIndex={0}>
              <code>{`pnpm add @sistem-digital/tokens @sistem-digital/components

import '@sistem-digital/tokens/css';
import '@sistem-digital/tokens/themes.css';
import '@sistem-digital/components/forms.css';
import '@sistem-digital/components/navigation.css';`}</code>
            </pre>
          </div>
        </section>
      </main>

      <PublicFooter />
    </>
  );
}
