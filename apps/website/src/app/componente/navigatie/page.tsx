import type { Metadata } from 'next';

import {
  Breadcrumbs,
  PublicFooter,
  PublicHeader,
  ServiceNavigation,
} from '../../../components/public-shell';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Navigație și structură instituțională',
  description:
    'Componente accesibile pentru identitate, navigație, breadcrumb, căutare, alerte și footer.',
  alternates: { canonical: '/componente/navigatie' },
};

const serviceItems = [
  { href: '#identitate', label: 'Identitate și autenticitate' },
  { href: '#responsive', label: 'Navigație responsive' },
  { href: '#cautare', label: 'Căutare' },
  { href: '#breadcrumb', label: 'Breadcrumb și service navigation' },
  { href: '#cookie-banner', label: 'Banner de cookie-uri' },
  { href: '#phase-banner', label: 'Banner de fază și link înapoi sus' },
  { href: '#exit-this-page', label: 'Ieșire rapidă din pagină' },
  { href: '#footer', label: 'Footer și alerte' },
] as const;

const mobileMarkup = `<details class="sd-mobile-navigation">
  <summary class="container">Meniu</summary>
  <nav class="container" aria-label="Navigație principală mobilă">
    <ul class="sd-mobile-navigation__list">
      <li><a href="/servicii">Servicii</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</details>`;

export default function NavigationReferencePage() {
  return (
    <>
      <PublicHeader
        currentPath="/componente/navigatie"
        serviceName="Biblioteca de componente"
        showMajorAlert
      />

      <main className={`container ${styles.main}`} id="continut">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Acasă' },
            { href: '/componente/formulare', label: 'Componente' },
            { label: 'Navigație' },
          ]}
        />

        <section className={styles.intro} aria-labelledby="page-title">
          <p className="section-kicker">Componente · M2</p>
          <h1 id="page-title">O structură predictibilă, indiferent de instituție sau serviciu.</h1>
          <p className={styles.lead}>
            Identitatea, domeniul oficial, navigația și căutarea trebuie să fie clare înainte ca
            utilizatorul să înceapă o operațiune. Varianta mobilă folosește un disclosure HTML nativ
            și rămâne complet operabilă fără JavaScript.
          </p>
        </section>

        <div className={styles.layout}>
          <aside>
            <ServiceNavigation items={serviceItems} title="Pe această pagină" />
          </aside>

          <div className={styles.content}>
            <section className={styles.section} id="identitate" aria-labelledby="identity-title">
              <div>
                <p className="section-kicker">Identitate și autenticitate</p>
                <h2 id="identity-title">Numele serviciului nu ascunde instituția și domeniul.</h2>
                <p>
                  Header-ul diferențiază identitatea proiectului sau instituției de numele
                  serviciului tranzacțional. Bannerul de autenticitate explică statutul și indică
                  domeniul oficial ca text, nu doar prin logo.
                </p>
              </div>

              <div className={styles.demo}>
                <div className={styles.demoHeader}>Variantă pentru serviciu tranzacțional</div>
                <div className={styles.demoBody}>
                  <div className={styles.transactionalIdentity}>
                    <span className={styles.mark} aria-hidden="true">
                      SD
                    </span>
                    <span>
                      <strong>Sistem Digital</strong>
                      <span>Solicită un certificat fiscal</span>
                      <span>sistem.digital</span>
                    </span>
                  </div>
                  <p>
                    Numele operațiunii este secundar identității, iar domeniul rămâne vizibil în
                    antet. Pentru o instituție publică, același loc conține denumirea oficială și
                    domeniul instituțional verificat.
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.section} id="responsive" aria-labelledby="responsive-title">
              <div>
                <p className="section-kicker">Navigație responsive</p>
                <h2 id="responsive-title">
                  Desktop și mobil folosesc aceeași ordine informațională.
                </h2>
                <p>
                  La lățimi mari, linkurile sunt vizibile direct. Sub 48rem, navigația desktop este
                  înlocuită de un element <code>details</code> cu <code>summary</code>. Utilizatorul
                  îl poate deschide cu Enter sau Space, iar starea este expusă nativ cititoarelor de
                  ecran.
                </p>
              </div>

              <pre className={styles.code} tabIndex={0} aria-label="Exemplu HTML meniu mobil">
                <code>{mobileMarkup}</code>
              </pre>

              <div className={styles.rules}>
                <article className={styles.ruleCard}>
                  <h3>Fără meniu ascuns implicit</h3>
                  <p>
                    Dacă CSS nu se încarcă, disclosure-ul și lista de linkuri rămân vizibile și
                    funcționale.
                  </p>
                </article>
                <article className={styles.ruleCard}>
                  <h3>Fără tabindex pozitiv</h3>
                  <p>Ordinea focusului urmează ordinea DOM și aceeași prioritate ca pe desktop.</p>
                </article>
                <article className={styles.ruleCard}>
                  <h3>Pagina curentă este explicită</h3>
                  <p>
                    Linkul activ folosește <code>aria-current=&quot;page&quot;</code>, nu doar o
                    culoare distinctă.
                  </p>
                </article>
              </div>
            </section>

            <section className={styles.section} id="cautare" aria-labelledby="search-title">
              <div>
                <p className="section-kicker">Căutare</p>
                <h2 id="search-title">O cerere GET poate fi copiată, salvată și distribuită.</h2>
                <p>
                  Formularul de căutare folosește landmark-ul <code>role=&quot;search&quot;</code>,
                  label programatic și parametrul <code>q</code>. Rezultatele au un URL stabil și nu
                  depind de JavaScript.
                </p>
              </div>

              <form className="sd-search" action="/cautare" method="get" role="search">
                <label className="sd-search__label" htmlFor="reference-search">
                  Caută în componente
                </label>
                <input
                  className="sd-search__input"
                  id="reference-search"
                  name="q"
                  type="search"
                  defaultValue="formulare"
                />
                <button className="sd-search__button" type="submit">
                  Caută
                </button>
              </form>
            </section>

            <section className={styles.section} id="breadcrumb" aria-labelledby="breadcrumb-title">
              <div>
                <p className="section-kicker">Breadcrumb și service navigation</p>
                <h2 id="breadcrumb-title">
                  Poziția globală și poziția în serviciu sunt două lucruri.
                </h2>
                <p>
                  Breadcrumb-ul arată ierarhia paginii în site. Service navigation arată pașii sau
                  secțiunile unui serviciu. Nu se înlocuiesc reciproc și au etichete de navigație
                  distincte.
                </p>
              </div>

              <div className={styles.demo}>
                <div className={styles.demoHeader}>Exemplu de serviciu</div>
                <div className={styles.demoBody}>
                  <Breadcrumbs
                    items={[
                      { href: '/', label: 'Acasă' },
                      { href: '/servicii', label: 'Servicii' },
                      { label: 'Certificat fiscal' },
                    ]}
                  />
                  <ServiceNavigation
                    currentPath="#documente"
                    title="Certificat fiscal"
                    items={[
                      { href: '#eligibilitate', label: 'Eligibilitate' },
                      { href: '#documente', label: 'Documente necesare' },
                      { href: '#trimitere', label: 'Trimite cererea' },
                    ]}
                  />
                </div>
              </div>
            </section>

            <section
              className={styles.section}
              id="cookie-banner"
              aria-labelledby="cookie-banner-title"
            >
              <div>
                <p className="section-kicker">Banner de cookie-uri</p>
                <h2 id="cookie-banner-title">
                  Fără JavaScript, bannerul rămâne vizibil — niciodată invers.
                </h2>
                <p>
                  Acordul se salvează local doar când scriptul rulează. Dacă JavaScript lipsește,
                  bannerul nu dispare niciodată singur; e o limitare cunoscută, nu o eroare
                  silențioasă.
                </p>
              </div>

              <div className={styles.demo}>
                <div className={styles.demoHeader}>Exemplu (nu ascunde restul paginii)</div>
                <div className={styles.demoBody}>
                  <section
                    className="sd-cookie-banner"
                    data-sd-cookie-banner
                    aria-label="Cookie-uri"
                  >
                    <div className="sd-cookie-banner__inner">
                      <div className="sd-cookie-banner__content">
                        <h3>Acest site folosește doar cookie-uri esențiale</h3>
                        <p>Nu folosim cookie-uri de urmărire sau publicitate.</p>
                      </div>
                      <button
                        type="button"
                        className="sd-button sd-button--primary"
                        data-sd-cookie-accept
                      >
                        Am înțeles
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </section>

            <section
              className={styles.section}
              id="phase-banner"
              aria-labelledby="phase-banner-title"
            >
              <div>
                <p className="section-kicker">Banner de fază și link înapoi sus</p>
                <h2 id="phase-banner-title">
                  Stadiul serviciului e text explicit, nu doar o etichetă colorată.
                </h2>
                <p>
                  Bannerul de fază leagă direct la un canal de feedback. Link-ul înapoi sus e o
                  ancoră HTML reală către începutul paginii, utilă pe conținut lung — funcționează
                  identic fără JavaScript.
                </p>
              </div>

              <div className={styles.demo}>
                <div className={styles.demoHeader}>Exemplu</div>
                <div className={styles.demoBody}>
                  <div className="sd-phase-banner">
                    <div className="sd-phase-banner__inner">
                      <span className="sd-tag sd-tag--info">Beta</span>
                      <p>
                        Acesta este un serviciu nou. <a href="#">Trimite-ne feedback</a>.
                      </p>
                    </div>
                  </div>
                  <a className="sd-back-to-top" href="#page-title">
                    <span className="sd-back-to-top__icon" aria-hidden="true">
                      →
                    </span>
                    Înapoi sus
                  </a>
                </div>
              </div>
            </section>

            <section
              className={styles.section}
              id="exit-this-page"
              aria-labelledby="exit-this-page-title"
            >
              <div>
                <p className="section-kicker">Ieșire rapidă din pagină</p>
                <h2 id="exit-this-page-title">
                  Fără JavaScript e un link obișnuit; nu depinde de un script care poate lipsi.
                </h2>
                <p>
                  Cu JavaScript, apăsarea link-ului sau tasta Shift apăsată de trei ori consecutiv
                  înlocuiește intrarea curentă din istoric înainte de a naviga, astfel încât butonul
                  Înapoi al browserului nu revine la această pagină.
                </p>
              </div>

              <div className={styles.demo}>
                <div className={styles.demoHeader}>Exemplu</div>
                <div className={styles.demoBody}>
                  <a className="sd-exit-page" href="https://www.google.com" data-sd-exit-this-page>
                    Ieși rapid din această pagină
                  </a>
                </div>
              </div>
            </section>

            <section className={styles.section} id="footer" aria-labelledby="footer-title">
              <div>
                <p className="section-kicker">Footer și alerte</p>
                <h2 id="footer-title">
                  Informația critică apare înaintea conținutului, nu în footer.
                </h2>
              </div>

              <ul className={styles.checklist}>
                <li>Alerta majoră este rezervată incidentelor sau schimbărilor cu impact larg.</li>
                <li>Bannerul oficial explică autenticitatea și statutul site-ului.</li>
                <li>Footer-ul oferă resurse, guvernanță, contact și informații juridice.</li>
                <li>Linkurile obligatorii nu sunt ascunse în meniuri expandabile.</li>
                <li>Footer-ul nu repetă întreaga navigație principală.</li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <PublicFooter>
        <p>Pagina demonstrează varianta pentru un sistem de design și un serviciu tranzacțional.</p>
      </PublicFooter>
    </>
  );
}
