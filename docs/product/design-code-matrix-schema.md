# Schema matricei publice design–cod

## Obiectiv

Definește contractul matricei care arată, pentru fiecare componentă publicată, disponibilitatea ei reală în Figma, HTML/CSS, Web Components, React, documentație, teste automate, testare cu tastatura și testare cu cititoare de ecran — conform Epic B ([#106](https://github.com/ciprian-rus/sistem.digital/issues/106)).

Spre deosebire de schema de maturitate ([`component-metadata-schema.md`](component-metadata-schema.md)), matricea design–cod **nu are un registru manual**. Fiecare câmp derivabil automat este calculat direct din exporturile publice ale pachetelor la fiecare build — nu poate devia de realitate, pentru că nu este o afirmație separată de cod, ci o citire a lui.

## Câmpuri

```ts
interface DesignCodeMatrixEntry {
  id: string;
  figma: boolean;
  html: boolean;
  webComponents: boolean;
  react: boolean;
  docs: boolean;
  automatedTests: boolean;
  keyboardTested: boolean;
  screenReaderTested: boolean;
}
```

## Sursa fiecărui câmp

| Câmp | Derivare | Stare curentă |
|---|---|---|
| `figma` | manual, până la publicarea kitului Figma ([#22](https://github.com/ciprian-rus/sistem.digital/issues/22)) | `false` pentru toate componentele |
| `html` | automat — orice intrare `kind: 'component'` din catalogul versionat este HTML semantic prin definiție | `true` pentru toate componentele |
| `webComponents` | automat — `sd-{componentName}` există în `webComponentNames` din `@sistem-digital/web-components` | derivat la build |
| `react` | automat — `use{PascalCase(componentName)}` există ca export din `@sistem-digital/react` | derivat la build |
| `docs` | automat — fiecare intrare are `documentationHref`, deja verificat de `scripts/check-catalog.mjs` | `true` pentru toate componentele |
| `automatedTests` | automat — fiecare familie are teste de inventar/contract în pachet, verificate de `pnpm test` | `true` pentru toate componentele |
| `keyboardTested` | **manual**, condiționat de auditul din [#53](https://github.com/ciprian-rus/sistem.digital/issues/53) | `false` pentru toate componentele, până la finalizarea auditului |
| `screenReaderTested` | **manual**, condiționat de auditul din [#53](https://github.com/ciprian-rus/sistem.digital/issues/53) | `false` pentru toate componentele, până la finalizarea auditului |

`keyboardTested` și `screenReaderTested` nu sunt aproximate din testele automate axe-core sau din interacțiunile Playwright existente. Testarea automată nu înlocuiește testarea reală cu tehnologii asistive — exact lecția transversală „Accesibilitate declarativă” din auditul comparativ. Aceste două câmpuri rămân `false` până când există dovadă publicată din #53.

## Identificator comun între Figma și cod

Convenția: numele unei componente în kitul Figma trebuie să fie identic cu `componentName` din catalogul versionat (kebab-case), astfel încât `id`-ul catalogului (`{familie}-{componentName}`) să poată fi derivat direct și din partea de design. Nu se introduc alias-uri sau denumiri paralele.

Această convenție trebuie respectată de la prima publicare a kitului Figma ([#22](https://github.com/ciprian-rus/sistem.digital/issues/22)) — redenumirea ulterioară a componentelor din Figma pentru a se alinia ar fi costisitoare și ar rupe legătura istorică.

## Verificarea consistenței

Pentru că `webComponents`, `react`, `html`, `docs` și `automatedTests` sunt calculate direct din exporturile reale ale pachetelor (nu declarate separat), nu există o clasă de bug „matricea minte” pentru aceste câmpuri — o deviere ar însemna un bug în funcția de derivare, nu o metadată neactualizată. Testele unitare pentru modulul de derivare (`apps/website/src/content/design-code-matrix.test.ts`) acoperă exact acest lucru: componente cunoscute cu și fără echivalent Web Components/React.

Singurele câmpuri care pot deveni „stale” sunt `figma`, `keyboardTested` și `screenReaderTested` — toate manuale, toate condiționate explicit de issues separate ([#22](https://github.com/ciprian-rus/sistem.digital/issues/22), [#53](https://github.com/ciprian-rus/sistem.digital/issues/53)).

## Ce nu include acest document

- publicarea efectivă a kitului Figma;
- rezultatele auditului manual de accesibilitate;
- afișarea matricei în catalog (implementată separat, `apps/website/src/components/catalog.tsx`).
