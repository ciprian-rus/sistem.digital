# @sistem-digital/components

## 0.1.0-alpha.4

### OIDC release verification (retry)

- toate rulările anterioare `release.yml` (alpha.1-alpha.3) au eșuat pe pasul de atașare a artefactelor la GitHub Release, din cauza unui bug corectat între timp (#85: glob-ul includea directorul `release-artifacts/static`, nu doar fișiere) — publicarea npm în sine reușise deja prin OIDC pur pentru alpha.3, doar run-ul complet nu ajunsese niciodată verde;
- acest release confirmă un run `release.yml` complet verde, capăt la capăt, exclusiv prin OIDC, fără `NODE_AUTH_TOKEN` persistent;
- conținutul public și API-ul pachetului rămân neschimbate față de alpha.3.

## 0.1.0-alpha.1

- release coordonat pentru validarea npm Trusted Publishing prin GitHub Actions;
- conținutul public și API-ul pachetului rămân neschimbate față de alpha inițial.

## 0.1.0-alpha.0

- pachet public inițial;
- componente de formulare, validare și mesaje de eroare;
- helper opțional pentru focusul error summary;
- banner de autenticitate, alertă majoră și identitate instituțională;
- navigație desktop, disclosure mobil nativ, breadcrumb și service navigation;
- căutare GET și footer standard;
- linkuri, mesaje, inset text, carduri și statusuri;
- tabel responsive, summary list, details, pagination și metadate;
- accordion, dialog, tabs, step indicator, date input, autocomplete și upload avansat;
- helper-e de progressive enhancement cu cleanup;
- semantică de date, reflow și operare cu tastatura verificate automat;
- regresie vizuală Playwright pentru desktop și mobil;
- shell verificat cu tastatura, reflow și JavaScript dezactivat;
- distribuție ESM, CommonJS și CSS independent de framework;
- versiune coordonată cu celelalte pachete oficiale Sistem Digital.
