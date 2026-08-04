// Registru de conținut narativ pentru pagina unei componente, conform
// docs/product/component-page-template.md. Opțional și separat de
// catalog-data.mjs: o componentă fără intrare aici pur și simplu nu are încă
// documentație narativă completă pe cele 15 secțiuni — nu blochează CI, cu
// excepția componentelor aflate în starea `candidate` sau mai avansată din
// registrul de maturitate (component-maturity-data.mjs), unde documentația
// completă e parte din Definition of Done.
export const componentPageContent = [
  {
    id: 'content-bar-chart',
    purpose:
      'Afișează o comparație vizuală rapidă între valori numerice asociate unor categorii, direct dintr-un tabel de date real — fără o bibliotecă de grafice și fără canvas/SVG generat din JavaScript.',
    whenToUse: [
      'când datele există deja ca tabel accesibil, iar bara vizuală e un plus, nu singura sursă de informație;',
      'când numărul de categorii e mic (sub 10–12), astfel încât barele rămân lizibile fără zoom sau derulare orizontală;',
      'când comparația relativă (mai mare/mai mic) contează mai mult decât citirea unei valori exacte.',
    ],
    whenNotToUse: [
      'pentru serii temporale lungi sau relații multi-variabilă — un grafic cu bare simplu nu le poate reda corect;',
      'când tabelul de date nu poate fi public sau accesibil — bar-chart-ul depinde de un tabel real, nu îl înlocuiește;',
      'ca unică sursă de informație — tabelul cu valorile exacte rămâne obligatoriu, bara e un supliment vizual (progressive enhancement).',
    ],
    anatomy:
      'Un `<figure class="sd-chart">` cu `<figcaption>`, care conține un `<table>` HTML standard cu `<caption>` și antete `<th>`. Fiecare celulă de valoare are un `<span class="sd-chart__bar-track">` (decorativ, `aria-hidden`) cu un `<span class="sd-chart__bar">` a cărui lățime e controlată prin custom property CSS `--sd-chart-value`, plus un `<span class="sd-chart__value">` cu valoarea text reală.',
    variants: ['bară orizontală (singura variantă publicată azi)'],
    states: ['implicit — nu are stări interactive (hover/focus), nu e un control'],
    behavior:
      'Fără CSS: tabelul rămâne complet funcțional și citibil ca tabel simplu, fără elementele decorative de bară. Cu CSS: `--sd-chart-value` (procent, calculat manual la generarea markup-ului) controlează lățimea barei; nu există recalculare sau animație în JavaScript.',
    contentGuidelines: [
      'figcaption-ul descrie ce reprezintă datele, nu doar „Grafic";',
      'caption-ul tabelului (vizual ascuns) rămâne descriptiv independent de figcaption, pentru context complet la navigare cu cititor de ecran;',
      'valorile numerice includ unitatea (ex. „cereri") și folosesc formatul românesc de numere, conform ghidului de content design.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/97'],
    knownIssues: [],
    implementerResponsibilities: [
      'calcularea corectă a `--sd-chart-value` (procent relativ la valoarea maximă din serie) la generarea markup-ului;',
      'furnizarea valorii text reale în `.sd-chart__value`, nu doar a barei vizuale — bara singură nu e suficientă pentru utilizatorii cititoarelor de ecran sau ai zoom-ului mare;',
      'verificarea contrastului barei față de fundal atunci când componenta e personalizată printr-o temă nouă.',
    ],
    history: [
      {
        version: '0.1.0-alpha.3',
        date: '2026-07-31',
        change: 'Publicare inițială în @sistem-digital/components, stadiu alpha.',
      },
    ],
  },
];
