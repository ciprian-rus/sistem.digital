# @sistem-digital/tokens

## 0.1.0-alpha.4

### OIDC release verification (retry)

- toate rulările anterioare `release.yml` (alpha.1-alpha.3) au eșuat pe pasul de atașare a artefactelor la GitHub Release, din cauza unui bug corectat între timp (#85: glob-ul includea directorul `release-artifacts/static`, nu doar fișiere) — publicarea npm în sine reușise deja prin OIDC pur pentru alpha.3, doar run-ul complet nu ajunsese niciodată verde;
- acest release confirmă un run `release.yml` complet verde, capăt la capăt, exclusiv prin OIDC, fără `NODE_AUTH_TOKEN` persistent;
- conținutul public și API-ul pachetului rămân neschimbate față de alpha.3.

## 0.1.0-alpha.1

### OIDC release verification

- release coordonat pentru validarea npm Trusted Publishing prin GitHub Actions;
- publicare prin OIDC, fără credential npm persistent în workflow;
- conținutul public și API-ul pachetului rămân neschimbate față de alpha inițial.

## 0.1.0-alpha.0

### Initial alpha

- design tokens pentru culori, spațiere, tipografie, radius și layout;
- exporturi TypeScript, CSS și JSON;
- teste pentru valorile canonice și aliasurile semantice.
