import type { ReactNode } from 'react';

import { ThemeControls } from './theme-controls';

const navigationItems = [
  { href: '/', label: 'Acasă' },
  { href: '/componente/formulare', label: 'Componente' },
  { href: '/componente/navigatie', label: 'Navigație' },
  { href: '/cautare', label: 'Căutare' },
] as const;

export interface PublicHeaderProps {
  currentPath?: string;
  serviceName?: string;
  showMajorAlert?: boolean;
}

function NavigationLinks({ currentPath }: Readonly<{ currentPath: string | undefined }>) {
  return (
    <>
      {navigationItems.map((item) => (
        <li key={item.href}>
          <a href={item.href} aria-current={currentPath === item.href ? 'page' : undefined}>
            {item.label}
          </a>
        </li>
      ))}
      <li>
        <a href="https://github.com/users/ciprian-rus/projects/5">Roadmap</a>
      </li>
    </>
  );
}

export function PublicHeader({
  currentPath,
  serviceName,
  showMajorAlert = false,
}: Readonly<PublicHeaderProps>) {
  return (
    <>
      <a className="sd-skip-link" href="#continut">
        Sari la conținut
      </a>

      <section className="sd-official-banner" aria-label="Informație despre autenticitate">
        <div className="container sd-official-banner__inner">
          <span className="sd-official-banner__mark" aria-hidden="true">
            SD
          </span>
          <p>
            Proiect open-source independent. Domeniul oficial este{' '}
            <a href="https://sistem.digital">sistem.digital</a>.
          </p>
        </div>
      </section>

      {showMajorAlert ? (
        <section className="sd-major-alert" aria-labelledby="major-alert-title">
          <div className="container sd-major-alert__inner">
            <span className="sd-major-alert__symbol" aria-hidden="true">
              !
            </span>
            <div className="sd-major-alert__content">
              <strong id="major-alert-title">Versiune alpha</strong>
              <p>
                Componentele sunt publice pentru testare și nu reprezintă încă un standard oficial.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <header className="sd-header">
        <div className="container sd-header__identity-row">
          <a className="sd-identity" href="/" aria-label="Sistem Digital — pagina principală">
            <span className="sd-identity__mark" aria-hidden="true">
              SD
            </span>
            <span className="sd-identity__text">
              <span className="sd-identity__name">Sistem Digital</span>
              {serviceName ? <span className="sd-identity__service">{serviceName}</span> : null}
              <span className="sd-identity__domain">sistem.digital</span>
            </span>
          </a>

          <div className="sd-header__tools">
            <form className="sd-search" action="/cautare" method="get" role="search">
              <label className="sd-search__label" htmlFor="site-search">
                Caută în Sistem Digital
              </label>
              <input
                className="sd-search__input"
                id="site-search"
                name="q"
                type="search"
                placeholder="Caută componente"
                autoComplete="off"
              />
              <button className="sd-search__button" type="submit">
                Caută
              </button>
            </form>
            <ThemeControls />
          </div>
        </div>

        <nav className="sd-primary-navigation" aria-label="Navigație principală">
          <div className="container">
            <ul className="sd-primary-navigation__list">
              <NavigationLinks currentPath={currentPath} />
            </ul>
          </div>
        </nav>

        <details className="sd-mobile-navigation">
          <summary className="container">Meniu</summary>
          <nav className="container" aria-label="Navigație principală mobilă">
            <ul className="sd-mobile-navigation__list">
              <NavigationLinks currentPath={currentPath} />
            </ul>
          </nav>
        </details>
      </header>
    </>
  );
}

export interface BreadcrumbItem {
  href?: string;
  label: string;
}

export function Breadcrumbs({ items }: Readonly<{ items: readonly BreadcrumbItem[] }>) {
  return (
    <nav className="sd-breadcrumb" aria-label="Breadcrumb">
      <ol className="sd-breadcrumb__list">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <li className="sd-breadcrumb__item" key={`${item.label}-${index}`}>
              {item.href && !isCurrent ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span aria-current={isCurrent ? 'page' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export interface ServiceNavigationItem {
  href: string;
  label: string;
}

export function ServiceNavigation({
  currentPath,
  items,
  title = 'În această secțiune',
}: Readonly<{
  currentPath?: string;
  items: readonly ServiceNavigationItem[];
  title?: string;
}>) {
  return (
    <nav className="sd-service-navigation" aria-label={title}>
      <h2 className="sd-service-navigation__title">{title}</h2>
      <ul className="sd-service-navigation__list">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} aria-current={item.href === currentPath ? 'page' : undefined}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PublicFooter({ children }: Readonly<{ children?: ReactNode }>) {
  return (
    <footer className="sd-footer">
      <div className="container sd-footer__main">
        <section aria-labelledby="footer-project-title">
          <h2 className="sd-footer__heading" id="footer-project-title">
            Sistem Digital
          </h2>
          <p>
            Infrastructură publică open-source pentru servicii digitale clare, accesibile și
            coerente în România.
          </p>
          {children}
        </section>

        <nav aria-labelledby="footer-resources-title">
          <h2 className="sd-footer__heading" id="footer-resources-title">
            Resurse
          </h2>
          <ul className="sd-footer__list">
            <li>
              <a href="/componente/formulare">Formulare</a>
            </li>
            <li>
              <a href="/componente/navigatie">Navigație</a>
            </li>
            <li>
              <a href="https://github.com/ciprian-rus/sistem.digital">Cod sursă</a>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="footer-governance-title">
          <h2 className="sd-footer__heading" id="footer-governance-title">
            Guvernanță
          </h2>
          <ul className="sd-footer__list">
            <li>
              <a href="https://github.com/users/ciprian-rus/projects/5">Roadmap</a>
            </li>
            <li>
              <a href="https://github.com/ciprian-rus/sistem.digital/issues">Propune o schimbare</a>
            </li>
            <li>
              <a href="https://github.com/ciprian-rus/sistem.digital/blob/main/CONTRIBUTING.md">
                Contribuie
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="container sd-footer__meta">
        <span>Licență Apache-2.0</span>
        <span>Versiune alpha · Domeniu oficial: sistem.digital</span>
      </div>
    </footer>
  );
}
