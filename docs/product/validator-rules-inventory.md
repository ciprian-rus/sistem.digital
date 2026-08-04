# Inventarul regulilor existente și formatul de raport al validatorului

## Scop

[#25](https://github.com/ciprian-rus/sistem.digital/issues/25) (M7) cere un
validator care verifică **implementări externe** ale Sistem Digital și
produce rezultate explicabile. Nota de stare a issue-ului identifică
următoarea acțiune posibilă acum, fără cod: „inventarierea regulilor
existente și definirea formatului JSON explicabil”. Acest document face
exact asta — nu implementează validatorul.

## Distincția critică: verificări interne vs. reguli de validator

Acest monorepo are deja verificări automate extinse (`pnpm check`,
`scripts/check-*.mjs`, testele din `apps/website/tests/accessibility/`,
validarea de contrast din `packages/tokens/scripts/build-themes.mjs`). Toate
testează **acest repo pe sine** — catalogul propriu, pachetele proprii
publicate, site-ul propriu. Validatorul din #25 trebuie să testeze
**proiecte terțe** care consumă pachetele Sistem Digital, fără acces la
sursa lor internă.

Consecința: unele verificări existente sunt reutilizabile direct ca **logică
pură** (de exemplu calculul de contrast WCAG), altele sunt reutilizabile ca
**tipar de regulă** dar trebuie reimplementate independent de structura
internă a acestui repo (de exemplu „linkuri defecte” — `check-docs.mjs`
verifică markdown intern via `git ls-files`, ceva ce nu are sens pentru un
proiect extern), iar altele **nu există încă deloc** (de exemplu verificarea
versiunii pachetelor instalate într-un proiect terț).

## Inventar, mapat pe verificările inițiale din #25

| Categorie (#25)                                | Verificare internă existentă                                                                                                                            | Reutilizabil ca…           | Notă                                                                                                                                                                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| versiunea pachetelor                           | _nu există_ — `check-release-tag.mjs` verifică doar tag-ul de release al **acestui** repo                                                               | —                          | gol real; propunere mai jos                                                                                                                                                        |
| componente și structură minimă                 | `check-catalog.mjs` — verifică exporturile **acestui** pachet față de catalogul **acestui** site                                                        | tipar de regulă            | pentru un proiect extern: verifică prezența claselor `sd-*`/atributelor `data-sd-*` așteptate în markup                                                                            |
| accesibilitate automată                        | `@axe-core/playwright`, tag-uri `wcag2a wcag2aa wcag21a wcag21aa wcag22aa`, în 17 fișiere de test                                                       | **direct**                 | axe-core rulează la fel de bine pe orice URL, nu doar pe acest site                                                                                                                |
| heading hierarchy și landmarks                 | acoperite implicit de regulile axe (`heading-order`, `region`, `landmark-*`), nu un script separat                                                      | **direct** (parte din axe) | nu există azi ca reguli separate, explicabile individual — validatorul ar trebui să le extragă distinct din raportul axe                                                           |
| formulare și etichete                          | `tests/accessibility/forms.spec.ts` + regulile axe `label`/`aria-*`                                                                                     | **direct** (parte din axe) | —                                                                                                                                                                                  |
| contrast și focus                              | `contrastRatio()` din `build-themes.mjs` (luminanță relativă WCAG, prag 4.5:1)                                                                          | **direct** (funcție pură)  | contrastul verifică doar valorile declarate în temă, nu randarea reală (vezi limitări mai jos); focus vizibil nu are verificare automată dedicată, doar teste manuale de tastatură |
| linkuri defecte                                | `check-docs.mjs` — verifică linkuri **relative din markdown**, prin `git ls-files`                                                                      | tipar de regulă            | pentru un site live: crawler HTTP (`HEAD`/`GET`) pe linkurile interne și externe din HTML randat — nu există încă                                                                  |
| performanță de bază                            | `check-performance-budget.mjs` — citește `.next/build-manifest.json`, bugete JS/CSS                                                                     | tipar de regulă            | specific Next.js; pentru un proiect generic extern, măsurarea trebuie făcută la runtime (Lighthouse/web-vitals), nu din manifestul de build                                        |
| pagini și declarații obligatorii configurabile | `tests/accessibility/technical-seo.spec.ts` — verifică `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `canonical`, JSON-LD, pagină 404 accesibilă | tipar de regulă            | lista de căi așteptate trebuie să fie configurabilă per proiect, nu hardcodată ca în acest site                                                                                    |

## Convenția de identificator al regulii

Fiecare regulă are un `id` stabil, cu prefixul categoriei, ca să poată fi
referențiată în documentație, în excepții și în badge-uri:

```text
sd-a11y-axe-wcag        # violări axe-core, taguri WCAG 2.x A/AA
sd-a11y-heading-order    # ierarhie corectă a titlurilor
sd-a11y-landmarks        # regiuni ARIA prezente și unice
sd-a11y-form-labels      # fiecare control are label asociat
sd-a11y-contrast         # contrastul declarat al temei ≥ 4.5:1
sd-content-broken-links  # linkuri interne/externe funcționale
sd-perf-js-budget        # JavaScript per rută sub buget
sd-perf-css-budget       # CSS total sub buget
sd-seo-required-pages    # sitemap/robots/manifest/canonical prezente
sd-package-version       # versiunea instalată vs. ultima publicată
```

## Formatul JSON de raport

```jsonc
{
  "$schema": "https://sistem.digital/schemas/validator-report-v1.json",
  "sistemDigitalValidatorVersion": "0.1.0",
  "target": "https://exemplu-institutie.ro",
  "generatedAt": "2026-08-04T18:00:00Z",
  "rules": [
    {
      "id": "sd-a11y-contrast",
      "category": "accessibility",
      "severity": "error",
      "status": "fail",
      "summary": "Contrastul text/fundal e sub pragul minim în 2 din 39 de roluri verificate.",
      "explanation": "Regula calculează raportul de contrast WCAG (luminanță relativă) între fiecare pereche text/fundal declarată de temă. Un raport sub 4.5:1 nu îndeplinește WCAG 2.2 AA pentru text normal.",
      "remediation": "Ajustează valorile temei (`--sd-color-text`/`--sd-color-surface-page` ș.a.) sau alege un accent instituțional cu contrast suficient — vezi docs/product/theme-policy.md.",
      "evidence": [{ "pair": "text.default/surface.page", "ratio": 3.8, "required": 4.5 }],
      "limitations": "Verifică doar valorile declarate ale temei, nu randarea finală — CSS suprascris la nivel de proiect poate produce un contrast real diferit.",
    },
  ],
  "summary": { "pass": 41, "fail": 1, "warn": 3, "notApplicable": 2 },
}
```

Câmpuri obligatorii per regulă, direct din criteriile de acceptare ale #25:

- `explanation` — de ce regula există și ce verifică exact (nu doar „a
  eșuat”);
- `remediation` — pasul concret de remediere, cu link către documentația
  relevantă;
- `limitations` — ce **nu** acoperă regula, explicit — vezi principiul de
  mai jos;
- `status` include `not-applicable`, nu doar pass/fail — o regulă poate să
  nu se aplice proiectului verificat (de exemplu `sd-perf-js-budget` pe un
  site fără Next.js).

## Principiul „nu se pretinde conformare completă”

Criteriul de acceptare explicit din #25. Fiecare regulă din raport trebuie
să aibă un câmp `limitations` populat cu adevăr, nu cu text generic — de
exemplu, `sd-a11y-axe-wcag` trebuie să menționeze că axe-core detectează
aproximativ 30-50% dintre problemele reale de accesibilitate (cifră general
acceptată în literatura de specialitate) și nu înlocuiește testarea cu
tehnologii asistive reale ([#53](https://github.com/ciprian-rus/sistem.digital/issues/53)
documentează exact această distincție pentru acest repo). Raportul HTML/CLI
trebuie să afișeze un rezumat care nu poate fi citit ca „100% conform” —
de exemplu, un scor agregat e explicit interzis de acest principiu; se
afișează numărul de reguli trecute/eșuate/neaplicabile, nu un procent unic.

## Formă CLI și integrare (schiță, nu implementare)

```sh
npx @sistem-digital/validator https://exemplu-institutie.ro --format json > raport.json
npx @sistem-digital/validator https://exemplu-institutie.ro --format html > raport.html
```

Integrare GitHub Actions: pasul rulează CLI-ul împotriva unei previzualizări
deployate (Vercel/Netlify), publică `raport.json` ca artifact și eșuează
build-ul doar pe reguli `severity: error`, nu pe `warn`. Badge-ul versionat
citește `summary` din ultimul raport publicat, fără să reducă rezultatul la
un singur număr (conform principiului de mai sus).

## Ce nu include acest document

- implementarea CLI-ului sau a regulilor propriu-zise;
- schema JSON formală (`.schema.json`), doar formatul ilustrat mai sus;
- decizia de a extrage `contrastRatio()` și logica axe într-un pachet
  distinct (`@sistem-digital/validator`) — arhitectura pachetului rămâne de
  decis la începutul implementării efective, planificată pentru M7.
