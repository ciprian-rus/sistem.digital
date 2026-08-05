# @sistem-digital/validator (MVP, nepublicat)

Implementarea inițială a validatorului din
[#25](https://github.com/ciprian-rus/sistem.digital/issues/25), construită
pe inventarul de reguli și formatul de raport din
[`docs/product/validator-rules-inventory.md`](../../docs/product/validator-rules-inventory.md).

Pachet privat (`"private": true`) — nu este publicat pe npm. Rămâne un
punct de plecare pentru implementarea completă planificată pentru M7, nu
un produs finit.

## Ce include azi

- `sd-a11y-axe-wcag` — accesibilitate automată, prin axe-core rulat
  împotriva unei pagini randate reale (Chromium, via `playwright-core`),
  cu același set de taguri WCAG folosit de testele acestui monorepo.
- `sd-content-broken-links` — extrage linkurile din pagina randată (inclusiv
  cele injectate prin JavaScript) și verifică fiecare cu o cerere HTTP
  reală (HEAD, cu fallback GET); linkurile interne stricate dau `fail`,
  cele externe stricate dau `warn` (pot fi în afara controlului
  proiectului).
- `sd-a11y-contrast` — verificarea raportului de contrast WCAG pentru
  perechi text/fundal furnizate explicit (algoritm identic cu
  `packages/tokens/scripts/build-themes.mjs`), disponibilă ca funcție de
  bibliotecă, nu încă parte a CLI-ului (nu poate fi derivată automat doar
  dintr-un URL).
- `sd-seo-required-pages` — verifică prezența și forma minimă a
  `sitemap.xml`, `robots.txt`, a unui manifest web
  (`manifest.webmanifest` sau `manifest.json`) și a unui
  `<link rel="canonical">` pe pagina randată; `fail` dacă oricare dintre
  cele patru lipsește sau e malformată, cu fiecare verificare raportată
  separat în `evidence`. Verifică doar căile convenționale — un proiect
  care le publică în altă locație are nevoie de căi configurabile,
  neimplementate încă.
- formatul de raport JSON și un randator HTML minimal, ambele fără scor
  agregat unic (vezi principiul „nu se pretinde conformare completă”).

Restul regulilor din inventar (performanță, versiunea pachetelor,
heading hierarchy/landmarks ca reguli separate ș.a.) rămân neimplementate.

## Acest pachet nu instalează Chromium

`playwright-core` (nu `playwright`) e folosit deliberat — nu descarcă
automat un browser. Utilizatorul trebuie să aibă un executabil Chromium
disponibil:

```sh
npx playwright install chromium
```

apoi să indice calea, fie prin `--executable-path`, fie prin variabila de
mediu `SISTEM_DIGITAL_VALIDATOR_CHROMIUM`.

## Utilizare CLI

```sh
node dist/cli.js https://exemplu-institutie.ro --format json
node dist/cli.js https://exemplu-institutie.ro --format html --executable-path /path/to/chromium
node dist/cli.js https://exemplu-institutie.ro --skip-external-links
```

CLI-ul rulează `sd-a11y-axe-wcag`, `sd-content-broken-links` și
`sd-seo-required-pages` în paralel (fiecare regulă care are nevoie de
Chromium își pornește propria instanță — neoptimizat pentru MVP, dar
corect).

## Utilizare ca bibliotecă

```ts
import {
  buildReport,
  checkAccessibility,
  checkContrast,
  checkLinks,
  checkRequiredPages,
} from '@sistem-digital/validator';

const accessibility = await checkAccessibility('https://exemplu-institutie.ro');
const links = await checkLinks('https://exemplu-institutie.ro', { checkExternal: false });
const seo = await checkRequiredPages('https://exemplu-institutie.ro');
const contrast = checkContrast([
  { id: 'text/page', foreground: '#17202a', background: '#ffffff', required: 4.5 },
]);
const report = buildReport('https://exemplu-institutie.ro', [accessibility, links, seo, contrast]);
```

## Teste

Testele pentru `sd-a11y-axe-wcag`, `sd-content-broken-links` și
`sd-seo-required-pages` rulează integral doar când un executabil Chromium
e disponibil (verificat automat la `/opt/pw-browsers/chromium` sau prin
`SISTEM_DIGITAL_VALIDATOR_CHROMIUM`) — altfel se omit cu un mesaj explicit.
Pentru `sd-seo-required-pages`, doar verificarea `<link rel="canonical">`
are nevoie de browser; verificările pentru sitemap/robots/manifest
folosesc `fetch()` simplu. Testele pentru `sd-a11y-contrast` și formatul
de raport rulează mereu (logică pură, fără browser).
