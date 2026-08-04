# Șablonul canonic al paginii unei componente

## Obiectiv

Consolidează, într-o singură structură pe 15 secțiuni, cele două șabloane parțiale deja existente — [`docs/accessibility/component-template.md`](../accessibility/component-template.md) (accesibilitate) și „Șablonul editorial pentru o componentă" din [`docs/content/content-style-guide.md`](../content/content-style-guide.md) (conținut) — fără să le dubleze. Cele 15 secțiuni sunt cele decise în extinderea benchmarkului internațional ([`docs/research/comparative-audit.md`](../research/comparative-audit.md)), inspirate direct din separarea explicită prezentare/demo/design/cod/accesibilitate a DSFR (Franța).

Acest document este **harta**: pentru fiecare secțiune, spune exact unde trăiește conținutul ei — cod existent, document existent prin referință, sau câmp nou într-un registru. Nu creează un al treilea document paralel de accesibilitate sau de ton editorial.

## Notă arhitecturală importantă

Sistem Digital nu are, azi, un fișier MDX per componentă. O pagină de componentă (`/componente/catalog/[slug]`) este generată integral din date — `apps/website/src/content/catalog-data.mjs` (markup canonic, importuri, pachet), `component-maturity-data.mjs` (Epic A) și `design-code-matrix` (Epic B, derivat automat). Acest șablon urmează același model: secțiunile narative noi (prezentare, când se folosește, anatomie etc.) sunt un **registru de date suplimentar**, `component-page-content-data.mjs`, nu fișiere `.mdx` noi — consecvent cu arhitectura existentă, nu o schimbare de paradigmă.

## Cele 15 secțiuni

| Nr. | Secțiune                             | Unde trăiește                                                                                                                                                                                                                   |
| --- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Prezentare (scop și nevoie)          | nou — `purpose`, în `component-page-content-data.mjs`                                                                                                                                                                           |
| 2   | Când se folosește                    | nou — `whenToUse` (obligatoriu, minimum un element)                                                                                                                                                                             |
| 3   | Când nu se folosește                 | nou — `whenNotToUse` (obligatoriu, minimum un element)                                                                                                                                                                          |
| 4   | Anatomie                             | nou — `anatomy` (opțional)                                                                                                                                                                                                      |
| 5   | Variante                             | nou — `variants` (opțional)                                                                                                                                                                                                     |
| 6   | Stări                                | nou — `states` (opțional)                                                                                                                                                                                                       |
| 7   | Comportament                         | nou — `behavior` (opțional)                                                                                                                                                                                                     |
| 8   | Conținut                             | nou — `contentGuidelines` (opțional, reguli **specifice** componentei; regulile generale rămân în `content-style-guide.md`, prin referință, nu duplicare)                                                                       |
| 9   | Demo                                 | existent — `<CatalogPreview>`, randat necondiționat pentru fiecare componentă publicată, din markup-ul canonic verificat de `scripts/check-catalog.mjs`                                                                         |
| 10  | Cod                                  | existent — `<CatalogImportExamples>` și comanda de instalare, randate necondiționat                                                                                                                                             |
| 11  | Accesibilitate                       | existent, prin referință — metodologia din `component-template.md`; instanța completată per componentă rămâne condiționată de auditul manual (#53); `accessibilityRef` (opțional) poate lega o instanță completată, când există |
| 12  | Cercetare                            | nou — `research` (opțional, array de linkuri verificabile)                                                                                                                                                                      |
| 13  | Probleme cunoscute                   | nou — `knownIssues` (opțional)                                                                                                                                                                                                  |
| 14  | Responsabilitățile implementatorului | nou — `implementerResponsibilities` (opțional)                                                                                                                                                                                  |
| 15  | Istoric                              | nou — `history` (opțional, tabel versiune/dată/modificare)                                                                                                                                                                      |

Secțiunile 9 și 10 nu necesită nicio metadată suplimentară — sunt deja complet implementate structural pentru orice componentă publicată, prin pagina de catalog. Secțiunea 11 nu duplică `component-template.md`; îl referențiază.

## Schema de date

```ts
interface ComponentPageContent {
  /** identificatorul componentei, identic cu cel din catalogul versionat */
  id: string;

  /** secțiunea 1 — scop și nevoie; obligatoriu */
  purpose: string;

  /** secțiunea 2; obligatoriu, minimum un element */
  whenToUse: string[];

  /** secțiunea 3; obligatoriu, minimum un element */
  whenNotToUse: string[];

  /** secțiunea 4; opțional */
  anatomy?: string;

  /** secțiunea 5; opțional */
  variants?: string[];

  /** secțiunea 6; opțional */
  states?: string[];

  /** secțiunea 7; opțional */
  behavior?: string;

  /** secțiunea 8 — reguli specifice acestei componente, nu regulile generale */
  contentGuidelines?: string[];

  /** secțiunea 11 — link către o instanță completată a component-template.md, dacă există */
  accessibilityRef?: string;

  /** secțiunea 12 — linkuri verificabile (issue, PR, raport de test) */
  research?: string[];

  /** secțiunea 13 */
  knownIssues?: string[];

  /** secțiunea 14 */
  implementerResponsibilities?: string[];

  /** secțiunea 15 */
  history?: Array<{ version: string; date: string; change: string }>;
}
```

## Câmpuri obligatorii vs. opționale

Doar `id`, `purpose`, `whenToUse` și `whenNotToUse` sunt obligatorii pentru orice intrare nouă. Toate celelalte rămân opționale, deliberat — un set minim obligatoriu de la început, ca să nu descurajeze contribuțiile inițiale (riscul identificat explicit în #113). Restul secțiunilor se completează incremental.

Excepție: o componentă aflată în starea `candidate` sau mai avansată în [registrul de maturitate](../governance/component-maturity-model.md) trebuie să aibă o intrare validă (cele patru câmpuri obligatorii completate) — consecvent cu Definition of Done pentru `candidate`, care cere explicit „documentație completă conform structurii standard pe 15 secțiuni". O componentă fără intrare de maturitate rămâne „neevaluată" și nu e afectată de această regulă.

## Validare

`scripts/check-component-docs.mjs` (`pnpm component-docs:check`, inclus în `pnpm check`):

- **întotdeauna** — validează structural fiecare intrare din `component-page-content-data.mjs` (id real în catalog, câmpuri obligatorii prezente și de tipul corect) și eșuează CI la orice intrare malformată;
- **întotdeauna** — eșuează dacă o componentă `candidate` sau mai avansată (din registrul de maturitate) nu are o intrare de conținut validă, conform regulii de mai sus;
- **întotdeauna** — afișează un raport de completitudine per familie (`forms`/`navigation`/`content`/`interactive`): câte componente din familie au o intrare de conținut, ca procent. Raportul e strict informativ pentru componentele fără metadate de maturitate — nu blochează CI.

Se rulează local cu `pnpm component-docs:check`, independent de CI.

## Dovadă de concept

`content-bar-chart` are o intrare completă în `component-page-content-data.mjs`, cu toate cele 12 câmpuri populate (nu doar cele patru obligatorii) — demonstrează atât validarea, cât și randarea în pagina de catalog (`/componente/catalog/content-bar-chart`). Migrarea celorlalte componente publicate rămâne incrementală, tratată separat (issue #116) — nu face parte din acest PR.

## Relația cu documentele sursă

- [`docs/accessibility/component-template.md`](../accessibility/component-template.md) rămâne sursa unică pentru accesibilitate (secțiunea 11) — acest document nu îl rescrie.
- [`docs/content/content-style-guide.md`](../content/content-style-guide.md) rămâne sursa unică pentru regulile generale de ton și microcopy — secțiunea 8 (conținut) adaugă doar reguli specifice unei componente, nu repetă regulile generale.
- [`docs/product/component-metadata-schema.md`](component-metadata-schema.md) (Epic A) și [`docs/product/design-code-matrix-schema.md`](design-code-matrix-schema.md) (Epic B) rămân scheme separate, compuse pe aceeași pagină de catalog, dar validate independent.
