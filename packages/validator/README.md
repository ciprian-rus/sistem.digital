# @sistem-digital/validator (MVP, nepublicat)

Implementarea inițială a validatorului din
[#25](https://github.com/ciprian-rus/sistem.digital/issues/25), construită
pe inventarul de reguli și formatul de raport din
[`docs/product/validator-rules-inventory.md`](../../docs/product/validator-rules-inventory.md).

Pachet privat (`"private": true`) — nu este publicat pe npm, deliberat, până
implementarea e completă, nu parțială. Configurația pachetului (`files`,
`exports`, `bin`, `publishConfig`) e deja aliniată cu convenția celorlalte
pachete publice ale monorepo-ului și verificată real: `pnpm pack` produce
un tarball minimal (doar `dist/`, `README.md`, `package.json`, `LICENSE`
— fără teste sau surse TypeScript), instalat într-un proiect consumator
gol confirmă că atât importul ESM (`import { ... } from
'@sistem-digital/validator'`, toate cele 14 exporturi publice prezente),
cât și CLI-ul (`bin`) funcționează corect. Rămâne exclus intenționat din
`scripts/pack-public-packages.mjs`/`release-readiness.yml` (care filtrează
`private !== true`) — nu declanșează fluxul real de release până pachetul
chiar e gata de publicare.

## Ce include azi

- `sd-a11y-axe-wcag` — accesibilitate automată, prin axe-core rulat
  împotriva unei pagini randate reale (Chromium, via `playwright-core`),
  cu același set de taguri WCAG folosit de testele acestui monorepo.
- `sd-a11y-heading-order` — ierarhia titlurilor (h1-h6), extrasă separat
  din axe-core (regulile `heading-order`, `page-has-heading-one`) — sunt
  marcate „best-practice” în axe, nu fac parte din tagurile WCAG rulate
  de `sd-a11y-axe-wcag`, de aceea au propria regulă explicabilă.
- `sd-a11y-landmarks` — prezența și unicitatea regiunilor ARIA
  (`<main>`, `<nav>`, `<header>` etc.), extrasă separat din axe-core
  (`region`, `landmark-one-main`, `landmark-unique` ș.a.), din același
  motiv ca mai sus.
- `sd-a11y-form-labels` — etichetarea câmpurilor de formular (`label`,
  `label-title-only`, `aria-input-field-name`, `aria-toggle-field-name`,
  via axe-core), plus `form-field-multiple-labels` prin inspecție directă
  a DOM-ului (numărarea label-urilor asociate unui control, explicit prin
  `for`/`id` și implicit prin încadrare) — axe o raportează mereu ca
  „incomplete”, niciodată ca „violation”, deci nu poate fi detectată prin
  axe; verificarea proprie e deterministică, nu o euristică.
- `sd-a11y-focus-visible` — euristică **best-effort** pentru indicatorul
  vizibil de focus: focusează programatic fiecare element interactiv și
  compară stilul calculat (outline, box-shadow, bordură, fundal, culoare
  text, transform) înainte/după. `warn`, niciodată `fail` (severitate
  `warning`) — singura sub-categorie din lista inițială a #25 documentată
  explicit ca neautomatizabilă robust în
  `docs/product/validator-rules-inventory.md`. Nu înlocuiește testarea
  manuală cu tastatura.
- `sd-content-broken-links` — extrage linkurile din pagina randată (inclusiv
  cele injectate prin JavaScript, și cele ascunse vizual, de exemplu în
  `<details>` necolapsate — verificarea citește DOM-ul, nu ce e vizibil pe
  ecran, confirmat empiric pe navigarea mobilă a acestui site) și verifică
  fiecare cu o cerere HTTP reală (HEAD, cu fallback GET); linkurile interne
  stricate dau `fail`, cele externe stricate dau `warn` (pot fi în afara
  controlului proiectului).
- `sd-seo-required-pages` — verifică prezența și forma minimă a
  sitemap-ului, robots.txt, a unui manifest web și a unui
  `<link rel="canonical">` pe pagina randată; `fail` dacă oricare dintre
  cele patru lipsește sau e malformată, cu fiecare verificare raportată
  separat în `evidence`. Implicit verifică căile convenționale
  (`/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` sau
  `/manifest.json`), dar acceptă și căi personalizate prin
  `sitemapPath`/`robotsPath`/`manifestPaths` (nu doar din bibliotecă —
  și CLI-ul le poate primi, vezi mai jos), pentru proiectele care le
  publică în altă locație.
- `sd-package-version` — compară versiunea instalată a fiecărui pachet
  `@sistem-digital/*` dintr-un proiect local (citită din
  `node_modules/@sistem-digital/<pachet>/package.json`) cu ultima
  versiune publicată pe npm (dist-tag `latest`); `warn` pentru pachete
  în urmă, niciodată `fail` (severitate `warning` — nu blochează CI
  implicit). Singura regulă care nu operează pe un URL, ci pe o cale de
  proiect local — de aceea e disponibilă doar ca funcție de bibliotecă.
- `sd-a11y-contrast` — verificarea raportului de contrast WCAG pentru
  perechi text/fundal furnizate explicit (algoritm identic cu
  `packages/tokens/scripts/build-themes.mjs`), disponibilă ca funcție de
  bibliotecă, nu încă parte a CLI-ului (nu poate fi derivată automat doar
  dintr-un URL).
- `sd-perf-js-budget` și `sd-perf-css-budget` — dimensiunea totală a
  JavaScript-ului, respectiv CSS-ului, încărcate la randarea inițială a
  paginii (Chromium, măsurate la runtime — spre deosebire de
  `apps/website/scripts/check-performance-budget.mjs`, care citește
  manifestul de build Next.js, inexistent pentru un proiect extern
  generic). `warn`, niciodată `fail`, peste bugetul implicit (600 KiB
  JS / 180 KiB CSS, preluate din bugetele acestui site) — configurabil
  prin `budgetBytes`.
- `sd-content-component-structure` — verifică prezența claselor CSS
  `sd-*` și a atributelor `data-sd-*` în markup-ul randat, ca dovadă
  indirectă că proiectul chiar randează componente Sistem Digital, nu
  doar are pachetele instalate ca dependență neutilizată; `fail` dacă
  pagina nu conține niciun marker.
- formatul de raport JSON, un randator HTML minimal și un badge SVG
  static (`--format badge`), toate fără scor agregat unic — badge-ul
  afișează numărul de reguli pass/fail/warn, nu un procent, cu o
  culoare-indicator de stare (roșu la eșecuri, galben la avertismente,
  verde altfel); vezi principiul „nu se pretinde conformare completă”.

Toate categoriile inițiale din #25 au acum cel puțin o regulă MVP.

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
node dist/cli.js https://exemplu-institutie.ro --format badge > badge.svg
node dist/cli.js https://exemplu-institutie.ro --skip-external-links
```

CLI-ul rulează `sd-a11y-axe-wcag`, `sd-a11y-heading-order`,
`sd-a11y-landmarks`, `sd-a11y-form-labels`, `sd-a11y-focus-visible`,
`sd-content-broken-links`, `sd-seo-required-pages`, `sd-perf-js-budget`,
`sd-perf-css-budget` și `sd-content-component-structure` în paralel,
partajând o singură instanță de Chromium între ele (fiecare regulă tot
deschide și închide propria pagină, dar nu mai pornește propriul proces
de browser) — verificat empiric: ~43% mai rapid împotriva unei ținte
reale (`starters/html`), cu rezultate identice. Folosind fiecare regulă
direct, ca funcție de bibliotecă, fără opțiunea `browser`, comportamentul
rămâne neschimbat — fiecare apel își lansează și închide propriul browser.

## Utilizare ca bibliotecă

```ts
import {
  buildReport,
  checkAccessibility,
  checkComponentStructure,
  checkContrast,
  checkCssBudget,
  checkFocusVisible,
  checkFormLabels,
  checkHeadingOrder,
  checkJsBudget,
  checkLandmarks,
  checkLinks,
  checkPackageVersions,
  checkRequiredPages,
  renderBadgeSvg,
} from '@sistem-digital/validator';

const accessibility = await checkAccessibility('https://exemplu-institutie.ro');
const headingOrder = await checkHeadingOrder('https://exemplu-institutie.ro');
const landmarks = await checkLandmarks('https://exemplu-institutie.ro');
const formLabels = await checkFormLabels('https://exemplu-institutie.ro');
const focusVisible = await checkFocusVisible('https://exemplu-institutie.ro');
const links = await checkLinks('https://exemplu-institutie.ro', { checkExternal: false });
const seo = await checkRequiredPages('https://exemplu-institutie.ro');
const jsBudget = await checkJsBudget('https://exemplu-institutie.ro');
const cssBudget = await checkCssBudget('https://exemplu-institutie.ro');
const componentStructure = await checkComponentStructure('https://exemplu-institutie.ro');
const packageVersions = await checkPackageVersions('/cale/către/proiectul-verificat');
const contrast = checkContrast([
  { id: 'text/page', foreground: '#17202a', background: '#ffffff', required: 4.5 },
]);
const report = buildReport('https://exemplu-institutie.ro', [
  accessibility,
  headingOrder,
  landmarks,
  formLabels,
  focusVisible,
  links,
  seo,
  jsBudget,
  cssBudget,
  componentStructure,
  packageVersions,
  contrast,
]);
const badge = renderBadgeSvg(report);
```

Toate regulile bazate pe Chromium acceptă și o opțiune `browser` (o
instanță `playwright-core.Browser` deja lansată) — dacă e furnizată, regula
o folosește direct, în loc să-și lanseze propriul browser, și n-o închide
la final (rămâne în grija apelantului). Așa rulează CLI-ul intern; pentru
uz direct ca bibliotecă, e opțional — fără ea, fiecare regulă rămâne
independentă, ca înainte.

## Teste

Testele pentru `sd-a11y-axe-wcag`, `sd-a11y-heading-order`,
`sd-a11y-landmarks`, `sd-a11y-form-labels`, `sd-a11y-focus-visible`,
`sd-content-broken-links`, `sd-seo-required-pages`, `sd-perf-js-budget`,
`sd-perf-css-budget` și `sd-content-component-structure` rulează integral
doar când un executabil Chromium e disponibil (verificat automat la
`/opt/pw-browsers/chromium` sau prin
`SISTEM_DIGITAL_VALIDATOR_CHROMIUM`) — altfel se omit cu un mesaj explicit.
Pentru `sd-seo-required-pages`, doar verificarea `<link rel="canonical">`
are nevoie de browser; verificările pentru sitemap/robots/manifest
folosesc `fetch()` simplu. Testele pentru `sd-a11y-contrast`, formatul
de raport și badge-ul SVG (`renderBadgeSvg`) rulează mereu (logică
pură, fără browser). Testele pentru `sd-package-version` rulează mereu,
împotriva unui server local care imită rutele `/<pachet>/latest` ale
registrului npm — nu ating `registry.npmjs.org` real.

## Integrare GitHub Actions

[`.github/workflows/validator-self-check.yml`](../../.github/workflows/validator-self-check.yml)
rulează validatorul împotriva site-ului propriu al acestui repo
(`apps/website`, construit și pornit local în job) — dogfooding, nu o
previzualizare externă, pentru că acesta e singurul țintă reală
disponibilă azi. Se declanșează la push pe `main` și manual
(`workflow_dispatch`), **nu** pe fiecare pull request — un workflow nou,
recurent, e o decizie de infrastructură distinctă de restul acestui
pachet, tratată separat de regulile de mai sus.

Fiecare rulare:

1. construiește site-ul și validatorul;
2. pornește site-ul local (`next start`) și așteaptă să răspundă;
3. rulează CLI-ul (`--format json`) împotriva lui;
4. generează badge-ul din raportul deja produs, fără să ruleze regulile
   a doua oară (`scripts/generate-badge.mjs`, disponibil și ca
   `pnpm --filter @sistem-digital/validator badge <raport.json> [ieșire.svg]`
   pentru uz local);
5. publică `validator-report.json` și `validator-badge.svg` ca artefact
   (30 de zile);
6. eșuează job-ul doar dacă `summary.fail > 0` — la fel ca exit code-ul
   CLI-ului însuși, nu pe `warn`.

Fiind declanșat doar pe push la `main`, acest workflow nu rulează pe
pull request-uri. Prima lui rulare reală (push-ul de merge al PR-ului
care l-a introdus) a trecut cu succes — job complet, artefact publicat,
pasul de eșec omis corect (fără reguli `fail`).
