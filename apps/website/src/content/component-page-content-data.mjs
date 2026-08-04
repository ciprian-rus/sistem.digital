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
  {
    id: 'forms-label',
    purpose:
      'Identifică explicit scopul unui control de formular, rămânând permanent vizibil — spre deosebire de un placeholder, care dispare la completare și nu poate înlocui un label.',
    whenToUse: [
      'pentru orice control de formular (input, textarea, select) sau, ca wrapper, pentru fiecare checkbox și radio din `.sd-choice`;',
      'ca prim element vizibil legat de control, înaintea oricărui text ajutător (`hint`).',
    ],
    whenNotToUse: [
      'ca placeholder în interiorul câmpului — placeholder-ul nu mai e vizibil odată completat câmpul și nu poate substitui un label;',
      'ascuns vizual (`sd-visually-hidden`) fără un motiv de design explicit — rămâne excepția, nu regula.',
    ],
    anatomy:
      'Un `<label class="sd-label">` cu atributul `for` legat de `id`-ul controlului asociat. Pentru checkbox și radio, eticheta face parte din `.sd-choice__label`, în interiorul wrapper-ului `<label class="sd-choice">`, nu dintr-un `<label class="sd-label">` separat.',
    variants: [
      'implicit',
      '`sd-label--large` — dimensiune de font crescută, pentru întrebări cu greutate vizuală mai mare (de exemplu întrebarea de eligibilitate dintr-un pattern)',
    ],
    states: ['nu are stări interactive proprii'],
    behavior:
      'Fără CSS și fără JavaScript: rămâne text simplu, legat semantic de control prin `for`/`id` — suficient pentru orice tehnologie asistivă, inclusiv fără stilurile Sistem Digital încărcate.',
    contentGuidelines: [
      'textul este întrebarea sau numele câmpului, nu instrucțiunea de completare — instrucțiunile merg în `hint`, nu în `label`;',
      'rămâne scurt și afirmativ, conform ghidului general de content design.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [
      'atributul `for` trebuie să corespundă exact `id`-ului controlului — verificabil automat prin testele de accesibilitate existente.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-hint',
    purpose:
      'Oferă instrucțiuni sau context suplimentar înaintea completării unui câmp, fără să înlocuiască label-ul.',
    whenToUse: [
      'când formatul așteptat nu e evident din tipul câmpului (de exemplu „13 cifre, fără spații” pentru CNP);',
      'când o explicație scurtă previne o eroare de completare mai eficient decât un mesaj de eroare ulterior.',
    ],
    whenNotToUse: [
      'pentru text care repetă label-ul sau nu adaugă informație nouă;',
      'ca substitut al unui mesaj de eroare — `hint` apare înainte de completare, `error-message` după validare, cu roluri diferite.',
    ],
    anatomy:
      'Un `<p class="sd-hint">`, plasat între `label` și control, legat de control prin `aria-describedby` atunci când implementarea o cere (de exemplu la câmpul CNP din serviciile de referință).',
    variants: ['implicit — un singur stil'],
    states: ['nu are stări interactive proprii'],
    behavior:
      'Element static, fără comportament JavaScript; rămâne vizibil identic indiferent de starea controlului asociat.',
    contentGuidelines: [
      'rămâne scurt — o propoziție, nu un paragraf; explicații mai lungi merg în conținutul din jurul formularului, nu în hint.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [
      'leagă `hint`-ul de control prin `aria-describedby` de fiecare dată când conținutul lui e necesar pentru completarea corectă, nu doar decorativ.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-fieldset',
    purpose:
      'Grupează semantic mai multe controale care răspund aceleiași întrebări — de exemplu un grup de radio sau checkbox — astfel încât tehnologiile asistive anunțe grupul, nu doar fiecare control izolat.',
    whenToUse: [
      'pentru orice grup de radio sau checkbox care aparțin aceleiași întrebări;',
      'oriunde `legend` e necesar — cele două există întotdeauna împreună.',
    ],
    whenNotToUse: [
      'pentru un singur control izolat (input, textarea, select) — acestea folosesc direct `label`, fără fieldset;',
      'pentru gruparea vizuală a unor controale fără legătură logică — fieldset e semantic, nu un container de layout.',
    ],
    anatomy:
      'Un `<fieldset class="sd-fieldset">` fără chenar vizual propriu (stilul implicit de browser e resetat), cu `<legend class="sd-legend">` ca prim copil, urmat de `.sd-choice-list` cu controalele grupate.',
    variants: ['implicit — un singur stil, complet definit de `legend` și de conținut'],
    states: ['nu are stări interactive proprii'],
    behavior:
      'Fără CSS: fieldset/legend rămân native browserului, deja semantic corecte. Cu CSS: chenarul implicit e eliminat, dar structura semantică (anunțată de cititoarele de ecran) nu se schimbă.',
    contentGuidelines: [],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [
      'nu se imbrică un `fieldset` în altul fără un motiv explicit de grupare pe două niveluri — imbricarea inutilă îngreunează navigarea cu cititorul de ecran.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-legend',
    purpose:
      'Numește un grup de controale dintr-un fieldset — este primul element citit de un cititor de ecran la intrarea în grup.',
    whenToUse: [
      'ca prim copil al fiecărui `fieldset`, fără excepție — un fieldset fără legend nu are sens semantic pentru tehnologiile asistive.',
    ],
    whenNotToUse: [
      'ca titlu de secțiune generic — pentru asta se folosesc titlurile normale (`h2`/`h3`), nu `legend`, care se aplică exclusiv unui `fieldset`.',
    ],
    anatomy:
      'Un `<legend class="sd-legend">` (sau `sd-legend--large`), text simplu, fără markup imbricat suplimentar.',
    variants: ['implicit', '`sd-legend--large`, pereche cu `sd-label--large`'],
    states: ['nu are stări interactive proprii'],
    behavior:
      'Element static, nativ browserului; anunțat automat de cititoarele de ecran la intrarea în fieldset, fără cod suplimentar.',
    contentGuidelines: [
      'formulează întrebarea complet — „Cum vrei să primești răspunsul?”, nu doar „Livrare”.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-input',
    purpose:
      'Colectează o valoare scurtă, pe un singur rând, folosind tipul HTML nativ potrivit conținutului (email, tel, text, number etc.).',
    whenToUse: [
      'pentru o singură valoare scurtă, verificabilă printr-un tip HTML nativ (e-mail, telefon, text simplu);',
      'cu `sd-input--width-10`/`sd-input--width-20` atunci când formatul așteptat are o lungime fixă cunoscută (de exemplu un cod).',
    ],
    whenNotToUse: [
      'pentru text pe mai multe rânduri — acolo se folosește `textarea`;',
      'pentru alegerea dintr-o listă predefinită — acolo se folosesc `select`, `radio` sau `segmented-control`.',
    ],
    anatomy:
      'Un `<input class="sd-input">` cu `type` HTML nativ potrivit și `id` legat de `label` prin `for`. Validarea eșuată se comunică prin `aria-invalid="true"`, nu printr-o clasă CSS separată.',
    variants: [
      'implicit (lățime maximă 32rem)',
      '`sd-input--width-10` / `sd-input--width-20` — lățimi reduse, pentru valori scurte cunoscute',
    ],
    states: [
      'implicit;',
      ':hover — bordură mai închisă;',
      '`aria-invalid="true"` — bordură și contur roșu, pentru câmpul cu eroare de validare;',
      ':disabled — bordură și fundal dezactivate, cursor `not-allowed`;',
      '`readonly` — bordură punctată, fundal subtil, distinct vizual de `disabled`;',
      ':focus-visible — contur vizibil conform tokenilor de focus.',
    ],
    behavior:
      'Fără CSS: rămâne un `<input>` HTML standard, complet funcțional. Starea de eroare (`aria-invalid`) e independentă de CSS — atributul rămâne prezent pentru tehnologiile asistive chiar dacă stilurile nu sunt încărcate.',
    contentGuidelines: [
      'label-ul explică ce se cere; formatul așteptat, dacă nu e evident, merge în `hint`, nu în `placeholder`.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [
      'alege tipul HTML corect (`email`, `tel`, `text` etc.) — tipul greșit strică tastatura mobilă și validarea nativă a browserului;',
      'setează `aria-invalid="true"` doar după o validare eșuată reală, nu implicit.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-textarea',
    purpose:
      'Colectează text pe mai multe rânduri, cu o limită vizibilă atunci când conținutul are o constrângere de lungime.',
    whenToUse: [
      'pentru text liber, pe mai multe rânduri — motive, observații, descrieri;',
      'combinat cu `character-count` atunci când există o limită reală de caractere.',
    ],
    whenNotToUse: [
      'pentru o singură valoare scurtă — acolo se folosește `input`;',
      'pentru alegerea dintr-un set fix de opțiuni — acolo se folosesc `select` sau `radio`.',
    ],
    anatomy:
      'Un `<textarea class="sd-textarea">`, înălțime minimă 10rem, redimensionabil vertical (`resize: vertical`).',
    variants: ['implicit — o singură variantă de dimensiune'],
    states: [
      'implicit',
      ':hover',
      '`aria-invalid="true"`',
      ':disabled',
      '`readonly`',
      ':focus-visible',
    ],
    behavior:
      'Fără CSS: `<textarea>` HTML standard. Redimensionarea verticală e nativă browserului, fără JavaScript.',
    contentGuidelines: [
      'dacă are o limită de caractere, limita e comunicată prin `character-count`, nu doar prin trunchiere silențioasă la trimitere.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-select',
    purpose: 'Permite alegerea unei singure valori dintr-o listă predefinită, scurtă și stabilă.',
    whenToUse: [
      'când opțiunile sunt multe (peste 5-7) sau pot crește în timp, astfel încât `radio` ar deveni greoi vizual;',
      'când opțiunile sunt deja cunoscute și stabile (de exemplu o listă de județe).',
    ],
    whenNotToUse: [
      'pentru 2-5 opțiuni stabile — `radio` sau `segmented-control` sunt mai vizibile și necesită mai puține interacțiuni;',
      'pentru selecție multiplă — `<select>` nativ cu selecție multiplă are o interacțiune neobișnuită; se preferă un grup de `checkbox`.',
    ],
    anatomy: 'Un `<select class="sd-select">` (lățime maximă 24rem) cu elemente `<option>` native.',
    variants: ['implicit — o singură variantă'],
    states: ['implicit', ':hover', '`aria-invalid="true"`', ':disabled', ':focus-visible'],
    behavior:
      'Element `<select>` HTML nativ — meniul, navigarea cu tastatura și selecția sunt gestionate integral de browser, fără JavaScript.',
    contentGuidelines: [
      'prima opțiune vizibilă nu e o valoare validă implicită („Alege o opțiune”), ca să nu fie confundată cu un răspuns real deja completat.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-checkbox',
    purpose:
      'Permite selectarea independentă a uneia sau mai multor opțiuni dintr-un set, fiecare putând fi bifată sau nu, fără să se excludă reciproc.',
    whenToUse: [
      'pentru opțiuni independente (fiecare poate fi adevărat sau fals separat);',
      'pentru o singură declarație de acceptare (de exemplu declarația de corectitudine a datelor din serviciile de referință).',
    ],
    whenNotToUse: [
      'pentru alegere exclusivă dintr-un set — acolo se folosește `radio`;',
      'pentru o comutare imediată, binară, fără pas de confirmare separat — acolo se folosește `switch` (familia Interactive).',
    ],
    anatomy:
      'Un `<label class="sd-choice">` care conține direct `<input type="checkbox" class="sd-choice__control">` și `<span class="sd-choice__label">`, opțional urmat de `<span class="sd-choice__hint">`.',
    variants: ['implicit — grupate în `sd-choice-list` când sunt mai multe'],
    states: [
      'implicit',
      'bifat (`:checked`, stil nativ browser peste `accent-color`)',
      ':disabled — cursor `not-allowed`, opacitate redusă pe întregul `.sd-choice`',
      ':focus-visible — contur pe control',
    ],
    behavior:
      'Fără CSS: checkbox HTML nativ, complet funcțional. Zona clicabilă acoperă tot wrapper-ul `.sd-choice` (grid pe toată lățimea), nu doar caseta mică, pentru o țintă de atingere suficientă.',
    contentGuidelines: [
      'eticheta descrie exact ce se bifează — nu o instrucțiune generică precum „Sunt de acord”, fără context despre cu ce anume.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [
      '`sd-choice__hint` se leagă de control prin `aria-describedby` când conține informație necesară deciziei, nu doar decorativă.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-radio',
    purpose:
      'Permite alegerea unei singure opțiuni dintr-un grup exclusiv de variante predefinite.',
    whenToUse: [
      'pentru 2-5 opțiuni stabile, exclusive reciproc;',
      'în interiorul unui `fieldset`/`legend`, niciodată izolat.',
    ],
    whenNotToUse: [
      'pentru opțiuni independente, neexclusive — acolo se folosește `checkbox`;',
      'pentru multe opțiuni (peste 5-7) — acolo se preferă `select`.',
    ],
    anatomy:
      'La fel ca `checkbox`, dar cu `type="radio"` și același `name` pentru toate opțiunile din grup, în interiorul unui `fieldset`/`legend`.',
    variants: ['implicit'],
    states: ['implicit', 'selectat (`:checked`)', ':disabled', ':focus-visible'],
    behavior:
      'Fără CSS: grup radio HTML nativ; navigarea cu săgeți între opțiunile aceluiași `name` e comportament implicit al browserului, fără JavaScript.',
    contentGuidelines: [
      'opțiunile sunt reciproc exclusive cu adevărat — dacă două opțiuni ar putea fi ambele adevărate, structura corectă e `checkbox`, nu `radio`.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [
      'toate input-urile radio din același grup logic au exact același `name`, altfel grupul nu mai e exclusiv.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-error-message',
    purpose:
      'Explică problema unui câmp individual și modul concret de remediere, direct lângă câmpul afectat.',
    whenToUse: [
      'imediat sub label/hint și deasupra controlului cu eroare, pentru fiecare câmp care a eșuat validarea;',
      'întotdeauna împreună cu `aria-invalid="true"` pe control și `aria-describedby` către mesaj.',
    ],
    whenNotToUse: [
      'ca listă centralizată a tuturor erorilor unui formular — acolo se folosește `error-summary`, plasat separat, la începutul formularului;',
      'pentru mesaje de succes sau informative — acelea folosesc `notification-banner` sau `inset-text`, nu `error-message`.',
    ],
    anatomy:
      'Un `<p class="sd-error-message">`, cu textul „Eroare:” adăugat automat prin CSS (`::before`), urmat de textul propriu al problemei.',
    variants: ['implicit — o singură variantă'],
    states: ['nu are stări interactive proprii'],
    behavior:
      'Element static; prefixul „Eroare:” e generat prin `content` CSS, deci dispare dacă stilurile nu se încarcă — implementarea nu trebuie să se bazeze pe el pentru sens, textul propriu-zis al mesajului rămâne complet fără el.',
    contentGuidelines: [
      'textul propriu-zis nu repetă cuvântul „eroare” — prefixul e adăugat automat prin CSS;',
      'urmează structura din ghidul de conținut: ce s-a întâmplat, ce câmp, cum se remediază, fără să blameze utilizatorul (docs/content/content-style-guide.md#erori).',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [
      'prefixul „Eroare:” generat prin `::before` nu apare deloc dacă foaia de stil `forms.css` nu e încărcată — implementatorii care randează HTML fără CSS (de exemplu în e-mail) trebuie să adauge „Eroare:” explicit în text.',
    ],
    implementerResponsibilities: [
      'leagă mesajul de control prin `aria-describedby`, nu doar prin poziționare vizuală;',
      'setează `aria-invalid="true"` pe control în același timp cu afișarea mesajului.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-error-summary',
    purpose:
      'Listează, la începutul formularului, toate erorile rezultate dintr-o validare server-side, fiecare legată printr-un link direct la câmpul respectiv.',
    whenToUse: [
      'după fiecare trimitere de formular care eșuează validarea server-side, cu cel puțin o eroare;',
      'plasat la începutul conținutului paginii, înaintea formularului propriu-zis.',
    ],
    whenNotToUse: [
      'pentru validare doar client-side, afișată instant — acolo `error-message` de lângă câmp e suficient, fără rezumat;',
      'pentru un formular cu o singură eroare posibilă — un rezumat cu un singur element aduce puțină valoare față de `error-message` direct pe câmp; rămâne totuși recomandat pentru consecvență.',
    ],
    anatomy:
      'Un `<section class="sd-error-summary" data-sd-error-summary tabindex="-1">` cu titlu (`sd-error-summary__title`), introducere opțională (`sd-error-summary__intro`) și o listă de linkuri (`sd-error-summary__list`), fiecare `<a href="#câmp">` către câmpul cu eroare.',
    variants: ['implicit — o singură variantă'],
    states: [
      ':focus — contur vizibil, pentru momentul în care focusul e mutat programatic aici după încărcarea paginii',
    ],
    behavior:
      'Fără JavaScript: rămâne complet funcțional — linkurile `href="#câmp"` navighează nativ la câmpul cu eroare. Cu JavaScript (`focusErrorSummary`): focusul e mutat automat pe rezumat la încărcarea paginii, dacă există cel puțin un link de eroare; `enhanceErrorSummaryLinks` mută apoi focusul pe câmpul țintă după navigarea prin fragment, ca linkul să nu doar deruleze pagina, ci să și mute efectiv focusul tastaturii.',
    contentGuidelines: [
      'fiecare element din listă e formulat ca acțiune de remediere („Introdu numele complet”), nu ca simplă repetare a erorii tehnice.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [
      'apelează `focusErrorSummary()` după randarea rezultatului validării server-side, ca îmbunătățire opțională peste comportamentul nativ funcțional;',
      'fiecare link din rezumat trebuie să aibă un `href="#id-câmp"` real, existent în pagină — `focusErrorSummary`, cu `requireErrorLinks` implicit (`true`), refuză să mute focusul pe un rezumat fără linkuri de eroare valide.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-button',
    purpose:
      'Declanșează o acțiune și îi comunică prin text consecința, nu doar eticheta generică a unei acțiuni.',
    whenToUse: [
      'pentru orice acțiune care nu navighează direct către o altă adresă (trimitere, salvare, ștergere) — pentru navigare pură se preferă un `link`;',
      'cu `sd-button--primary` pentru acțiunea principală a ecranului, cel mult una vizibilă simultan.',
    ],
    whenNotToUse: [
      'pentru navigare simplă către o altă pagină — acolo `link`-ul (`<a>`) e elementul corect, inclusiv vizual;',
      'cu mai mult de un `sd-button--primary` vizibil simultan — ambiguizează acțiunea principală.',
    ],
    anatomy:
      'Un `<button class="sd-button sd-button--primary|sd-button--secondary" type="button|submit">`, text simplu, fără markup imbricat suplimentar.',
    variants: [
      '`sd-button--primary` — acțiunea principală, contrast maxim',
      '`sd-button--secondary` — acțiuni alternative (înapoi, salvează și continuă mai târziu)',
    ],
    states: [
      'implicit',
      ':hover',
      ':active (doar primary)',
      ':disabled / `aria-disabled="true"`',
      ':focus-visible',
    ],
    behavior:
      'Element `<button>` HTML nativ. `aria-disabled="true"` e tratat vizual identic cu `:disabled`, dar rămâne focusabil — util când motivul dezactivării trebuie explicat, spre deosebire de `disabled` nativ, care exclude complet elementul din tab order.',
    contentGuidelines: [
      'textul descrie acțiunea și consecința ei („Trimite cererea”, „Descarcă documentul”), niciodată generic („OK”, „Submit”, „Click aici”) — conform docs/content/content-style-guide.md#microcopy-pentru-actiuni.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [
      'alege `aria-disabled="true"` în loc de `disabled` nativ atunci când persoana are nevoie să înțeleagă de ce butonul e indisponibil momentan (de exemplu în timpul trimiterii).',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-button-group',
    purpose:
      'Ordonează vizual acțiunea principală și alternativele ei, astfel încât ordinea și ierarhia să rămână neambigue.',
    whenToUse: [
      'ori de câte ori un ecran are mai mult de o acțiune (de exemplu „Trimite” și „Salvează și continuă mai târziu”).',
    ],
    whenNotToUse: [
      'pentru o singură acțiune izolată — un `button-group` cu un singur element nu aduce valoare față de butonul simplu.',
    ],
    anatomy:
      'Un `<div class="sd-button-group">` (flex, wrap) care conține direct elementele `sd-button` sau linkuri de acțiune secundară.',
    variants: [
      'implicit — pe ecrane sub 30rem lățime, butoanele devin pe toată lățimea, stivuite vertical',
    ],
    states: ['nu are stări interactive proprii'],
    behavior:
      'Layout pur CSS (flexbox); fără JavaScript. Pe ecrane înguste, `flex-direction: column` și lățime 100% pentru fiecare buton, printr-un media query, nu prin JavaScript de detectare a viewport-ului.',
    contentGuidelines: [
      'acțiunea principală e primul element din grup, nu ultimul — ordinea vizuală urmează ordinea de citire.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-file-upload',
    purpose:
      'Păstrează inputul nativ de fișier pentru selectare, fără o reconstrucție vizuală care ar putea pierde comportamentul accesibil implicit al browserului.',
    whenToUse: [
      'pentru încărcarea unui singur document, fără nevoia de listă, eliminare individuală sau drag-and-drop;',
      'ca variantă simplă, de bază — pentru încărcare multiplă cu listă și drag-and-drop, vezi `file-upload-advanced` (familia Interactive).',
    ],
    whenNotToUse: [
      'când sunt necesare mai multe fișiere cu listă vizibilă și eliminare individuală — acolo `file-upload-advanced` e componenta corectă, nu o extindere manuală a acesteia.',
    ],
    anatomy:
      'Un `<input class="sd-file-input" type="file">`, cu `label` asociat separat prin `for`/`id`, ca orice alt control de formular.',
    variants: ['implicit — o singură variantă'],
    states: ['implicit', ':hover', '`aria-invalid="true"`', ':disabled'],
    behavior:
      'Element `<input type="file">` HTML nativ; butonul de selectare (`::file-selector-button`) e stilizat prin pseudo-element CSS, fără JavaScript. Dispare complet la print (`display: none` în `@media print`), pentru că selectarea unui fișier nu are sens pe hârtie.',
    contentGuidelines: [
      'label-ul spune ce document se așteaptă, iar formatele acceptate (PDF, PNG, JPG) apar explicit în `hint`, nu doar în atributul tehnic `accept`.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/49'],
    knownIssues: [],
    implementerResponsibilities: [
      'pentru demonstrații (ca în serviciile de referință), memorează doar numele fișierului, niciodată conținutul — comunicat explicit persoanei, conform principiului de minimizare a datelor.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a pachetului public inițial de componente de formulare (PR #49).',
      },
    ],
  },
  {
    id: 'forms-segmented-control',
    purpose:
      'Prezintă o alegere exclusivă compactă, ca alternativă vizuală la radio, pentru un set mic de opțiuni afișate ca grup de „taste”.',
    whenToUse: [
      'pentru 2-4 opțiuni exclusive, scurte ca text (de exemplu „Listă”/„Grilă”), unde compactarea vizuală ajută mai mult decât un `fieldset` clasic.',
    ],
    whenNotToUse: [
      'pentru opțiuni cu text lung — comprimarea orizontală devine ilizibilă;',
      'ca înlocuitor implicit al `radio` — rămâne o variantă vizuală specifică, nu componenta implicită pentru orice alegere exclusivă.',
    ],
    anatomy:
      'Un `<fieldset class="sd-segmented-control">` cu `<legend>` (poate fi `sd-visually-hidden` dacă contextul din jur explică deja alegerea) și, pentru fiecare opțiune, un `<label class="sd-segmented-control__option">` ce conține un `<input type="radio" class="sd-segmented-control__input">` mascat vizual (`clip-path`, nu `display: none`, ca să rămână accesibil) și un `<span class="sd-segmented-control__label">` vizibil.',
    variants: ['implicit — o singură variantă vizuală'],
    states: [
      'implicit',
      'selectat — fundal plin, prin `:checked ~ .sd-segmented-control__label`',
      ':disabled — opacitate redusă, cursor `not-allowed`',
      ':focus-visible — pe eticheta vizibilă, prin `:focus-visible ~`, pentru că input-ul propriu-zis e mascat vizual',
    ],
    behavior:
      'Sub capotă rămâne un grup `radio` HTML nativ — inputurile sunt doar mascate vizual (nu ascunse din arborele de accesibilitate), deci comportamentul de tastatură și cititor de ecran e identic cu un grup radio clasic, fără JavaScript.',
    contentGuidelines: [
      'etichetele fiecărei opțiuni rămân la 1-2 cuvinte — orice text mai lung indică nevoia unui `fieldset` clasic cu `radio`, nu a unui `segmented-control`.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/88'],
    knownIssues: [],
    implementerResponsibilities: [
      'inputurile trebuie mascate prin tehnica folosită în `forms.css` (`clip-path`, nu `display:none`/`visibility:hidden`), altfel devin invizibile și pentru tehnologiile asistive, nu doar vizual.',
    ],
    history: [
      {
        version: '0.1.0-alpha.3',
        date: '2026-07-26',
        change:
          'Adăugat în @sistem-digital/components, împreună cu cookie-banner, spinner, chip și avatar (PR #88).',
      },
    ],
  },
  {
    id: 'forms-character-count',
    purpose:
      'Numără caracterele rămase într-un câmp cu limită, actualizat live, vizibil deopotrivă pentru utilizatori văzători și pentru cititoare de ecran.',
    whenToUse: [
      'pentru orice `textarea` sau `input` cu o limită reală de caractere impusă la trimitere.',
    ],
    whenNotToUse: [
      'ca decor pe un câmp fără limită reală — dacă nu există o validare reală de lungime, numărătoarea induce o constrângere falsă.',
    ],
    anatomy:
      'Un `<div data-sd-character-count="N">` care încadrează câmpul (`sd-character-count__field`, cu atributul `data-sd-character-count-field`) și un status text (`<p class="sd-character-count__status" data-sd-character-count-status aria-live="polite">`).',
    variants: [
      'implicit',
      '`sd-character-count--error` — aplicată automat de JavaScript când limita e depășită',
    ],
    states: ['implicit (sub limită)', 'peste limită — text de status îngroșat, culoare de eroare'],
    behavior:
      'Fără JavaScript: câmpul rămâne complet funcțional, iar limita e comunicată doar static, prin textul scris în `hint`/status inițial din markup. Cu JavaScript (`enhanceCharacterCount`): la fiecare eveniment `input`, textul din regiunea `aria-live="polite"` se actualizează cu numărul de caractere rămase (sau depășirea, ca număr pozitiv de caractere „peste limita permisă”), iar clasa `--error` se comută în timp real.',
    contentGuidelines: [
      'textul de status e mereu în cuvinte complete („Mai aveți 200 caractere”), nu doar o cifră izolată, pentru claritate la citire audio.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/89'],
    knownIssues: [],
    implementerResponsibilities: [
      'inițializează `data-sd-character-count` cu limita reală, identică celei aplicate la validarea server-side — o neconcordanță ar induce persoana în eroare.',
    ],
    history: [
      {
        version: '0.1.0-alpha.3',
        date: '2026-07-28',
        change:
          'Adăugat în @sistem-digital/components, împreună cu alte patru componente noi și pachetul @sistem-digital/web-components (PR #89).',
      },
    ],
  },
  {
    id: 'navigation-official-banner',
    purpose:
      'Indică natura oficială a serviciului și domeniul corect, ca primă informație de pe pagină — o ancoră de încredere înaintea oricărui alt conținut.',
    whenToUse: [
      'ca prima secțiune vizibilă a fiecărei pagini publice, deasupra header-ului instituțional;',
      'ori de câte ori identitatea și autenticitatea domeniului trebuie confirmate explicit, nu presupuse.',
    ],
    whenNotToUse: [
      'pentru alerte sau situații critice — acelea folosesc `major-alert`, nu bannerul de autenticitate;',
      'de mai multe ori pe aceeași pagină — rămâne un singur banner, o singură dată.',
    ],
    anatomy:
      'Un `<section class="sd-official-banner">` cu `.sd-official-banner__inner` (flex), o marcă circulară decorativă `.sd-official-banner__mark` și un `<p>` cu textul despre domeniul oficial.',
    variants: ['implicit — o singură variantă'],
    states: ['nu are stări interactive proprii'],
    behavior:
      'Element static, fără JavaScript; textul rămâne singura sursă de adevăr pentru domeniul oficial — marca circulară e strict decorativă.',
    contentGuidelines: [
      'afirmă direct domeniul oficial, fără ambiguitate — conform aceluiași principiu folosit în footer-ul public al sistem.digital.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [
      'marca circulară (`__mark`) rămâne `aria-hidden`, dacă textul propriu-zis exprimă deja complet informația.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-major-alert',
    purpose:
      'Comunică o situație critică la nivelul întregului serviciu — de exemplu o indisponibilitate temporară — vizibil pe fiecare pagină, nu doar pe una.',
    whenToUse: [
      'pentru situații care afectează întregul serviciu, nu un singur câmp sau o singură pagină;',
      'când persoana trebuie să afle imediat, înainte de a continua orice interacțiune.',
    ],
    whenNotToUse: [
      'pentru erori locale, specifice unei pagini sau unui formular — acelea folosesc `alert` sau `notification-banner` (familia Conținut și date);',
      'pentru informații necritice — folosirea lui pentru orice mesaj îi tocește urgența reală.',
    ],
    anatomy:
      'Un `<section class="sd-major-alert">` cu `__inner` (grid), un simbol circular decorativ `__symbol` și `__content` cu titlu (`<strong>`) și text.',
    variants: ['implicit — o singură variantă'],
    states: ['nu are stări interactive proprii'],
    behavior:
      'Element static, fără JavaScript; rămâne vizibil identic pe orice pagină pe care e inclus.',
    contentGuidelines: [
      'începe cu impactul practic, nu cu termenul tehnic — „Serviciul este indisponibil temporar" înainte de detalii, nu invers;',
      'menționează orizontul de rezolvare dacă e cunoscut, în loc să lase persoana fără reper de timp.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [
      'afișează `major-alert` doar pentru situații reale, la nivel de serviciu — nu ca substitut pentru gestionarea erorilor de pagină.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-institution-header',
    purpose:
      'Prezintă împreună identitatea instituției și numele serviciului, ca element de branding constant în fruntea fiecărei pagini.',
    whenToUse: [
      'o singură dată per pagină, ca element cel mai de sus după bannerele de autenticitate/alertă.',
    ],
    whenNotToUse: [
      'pentru conținut secundar sau de marketing — header-ul rămâne strict identitate și acces la instrumentele principale (căutare, navigație).',
    ],
    anatomy:
      'Un `<header class="sd-header">` cu `.sd-header__identity-row` (flex) care conține `.sd-identity` (link, cu `__mark` decorativ și `__text` — `__name` + `__service`) și `.sd-header__tools`, pentru căutare sau alte instrumente.',
    variants: ['implicit — o singură variantă'],
    states: [
      'nu are stări interactive proprii, dincolo de cele ale copiilor focusabili (link, căutare)',
    ],
    behavior:
      'Fără JavaScript: layout complet funcțional. Sub 48rem lățime, `__identity-row` și `__tools` trec din flex orizontal în coloană verticală, printr-un media query, nu prin JavaScript.',
    contentGuidelines: [
      'numele instituției apare înaintea numelui serviciului — ambele reale, niciodată text de tip „Instituția exemplu" în producție.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-desktop-navigation',
    purpose:
      'Oferă acces direct la categoriile principale ale site-ului, vizibil integral pe ecrane largi.',
    whenToUse: ['pe ecrane mai late de 48rem, ca navigație principală, întotdeauna vizibilă.'],
    whenNotToUse: [
      'sub 48rem lățime — e ascunsă automat prin CSS și înlocuită de `mobile-navigation`, nu ambele simultan.',
    ],
    anatomy:
      'Un `<nav class="sd-primary-navigation">` cu `__list` (flex) și linkuri directe; pagina curentă e marcată prin `aria-current="page"`.',
    variants: ['implicit — o singură variantă'],
    states: [
      'implicit',
      'pagina curentă (`aria-current="page"`, bordură inferioară colorată)',
      ':hover',
      ':focus-visible',
    ],
    behavior:
      'Fără JavaScript: `<nav>` cu linkuri native, complet funcțională. Ascunderea sub 48rem (`display: none`) e strict CSS — conținutul din `mobile-navigation` conține aceleași linkuri, nu o listă redusă.',
    contentGuidelines: [
      'etichetele categoriilor rămân scurte și stabile — schimbarea lor frecventă strică orientarea repetată a utilizatorilor.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [
      'lista de linkuri trebuie să rămână identică între `desktop-navigation` și `mobile-navigation` — cele două sunt aceeași navigație, afișată diferit pe breakpoint, nu două navigații separate.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-mobile-navigation',
    purpose:
      'Oferă acces la aceleași categorii principale ca `desktop-navigation`, printr-un disclosure nativ, pe ecrane înguste.',
    whenToUse: [
      'sub 48rem lățime, ca înlocuitor al `desktop-navigation`, niciodată alături de ea.',
    ],
    whenNotToUse: [
      'peste 48rem lățime — rămâne ascunsă implicit (`display: none`) până la media query.',
    ],
    anatomy:
      'Un `<details class="sd-mobile-navigation">` cu `<summary>` (indicator „+"/„−" generat prin `::after`, nu imagine) și `__list` cu linkuri.',
    variants: ['implicit — o singură variantă'],
    states: [
      'închis (implicit)',
      'deschis (`[open]`, indicatorul devine „−")',
      'pagina curentă (`aria-current="page"`, bordură laterală colorată)',
    ],
    behavior:
      'Complet nativă: `<details>`/`<summary>` gestionează deschiderea/închiderea fără nicio linie de JavaScript. Indicatorul vizual „+"/„−" e generat exclusiv prin CSS (`content` pe `::after`, comutat de selectorul `[open]`).',
    contentGuidelines: [
      'conține exact aceleași linkuri ca `desktop-navigation` — niciodată un subset „simplificat" pentru mobil.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-breadcrumb',
    purpose:
      'Arată poziția paginii curente în ierarhia site-ului și permite revenirea directă la orice nivel anterior.',
    whenToUse: ['pe orice pagină aflată la mai mult de un nivel sub pagina principală.'],
    whenNotToUse: [
      'pe pagina principală sau pe pagini de nivel superior, unde nu există o ierarhie reală de arătat.',
    ],
    anatomy:
      'Un `<nav class="sd-breadcrumb" aria-label="Breadcrumb">` cu `<ol class="sd-breadcrumb__list">`; fiecare `<li class="sd-breadcrumb__item">` conține un link, cu excepția ultimului, care e un `<span aria-current="page">`. Separatorul „/" e generat prin `::after` pe toate elementele, mai puțin ultimul.',
    variants: ['implicit — o singură variantă'],
    states: ['pagina curentă (`aria-current="page"`, fără link)'],
    behavior:
      'Element static; separatorul „/" e strict decorativ (CSS `content`) — ordinea semantică a listei `<ol>` rămâne corectă și fără el, inclusiv pentru cititoarele de ecran.',
    contentGuidelines: [
      'folosește titlurile reale ale paginilor, nu etichete scurtate sau tehnice, ca să rămână recognoscibile.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-service-navigation',
    purpose:
      'Oferă navigare locală între paginile aceleiași secțiuni sau ale aceluiași serviciu, distinctă de navigația globală a site-ului.',
    whenToUse: [
      'când o secțiune sau un serviciu are mai multe pagini surori între care persoana ar putea vrea să treacă direct.',
    ],
    whenNotToUse: [
      'pentru navigația globală a site-ului — aceea rămâne `desktop-navigation`/`mobile-navigation`;',
      'pentru o secțiune cu o singură pagină, unde o navigație locală nu adaugă nimic.',
    ],
    anatomy:
      'Un `<nav class="sd-service-navigation">` cu `__title` (titlu vizibil, de exemplu „În această secțiune") și `__list`, ale cărei linkuri au `aria-current="page"` pentru pagina activă.',
    variants: ['implicit — o singură variantă'],
    states: [
      'implicit',
      'pagina curentă (`aria-current="page"`, fundal și bordură laterală distincte, nu doar culoare de text)',
    ],
    behavior: 'Element static, fără JavaScript.',
    contentGuidelines: [
      'titlul secțiunii orientează („În această secțiune"), nu doar decorează — omiterea lui lasă lista fără context.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-search',
    purpose:
      'Permite găsirea conținutului printr-un formular GET simplu, al cărui rezultat produce un URL distribuibil și marcabil la favorite.',
    whenToUse: ['prezent în header-ul fiecărei pagini, ca acces constant la căutare.'],
    whenNotToUse: [
      'ca unică metodă de a găsi conținut — căutarea completează navigația, nu o înlocuiește.',
    ],
    anatomy:
      'Un `<form class="sd-search" role="search" method="get">` cu `__label` (vizual ascuns, dar prezent), `__input` și `__button` de trimitere.',
    variants: ['implicit — o singură variantă'],
    states: ['implicit', ':hover pe buton', ':focus-visible pe input și buton'],
    behavior:
      'Fără JavaScript: formular GET nativ; rezultatul e o navigare normală către o adresă cu parametrul de căutare în URL, complet distribuibilă.',
    contentGuidelines: [
      'label-ul rămâne vizual ascuns, nu eliminat — „Caută" trebuie să existe pentru tehnologiile asistive.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [
      'păstrează `method="get"` — un `POST` ar face rezultatele căutării nedistribuibile prin URL.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-footer',
    purpose:
      'Grupează resurse, guvernanță, licență și informații de versiune la finalul fiecărei pagini.',
    whenToUse: ['o singură dată per pagină, ca ultimul element înaintea sfârșitului documentului.'],
    whenNotToUse: [
      'de mai multe ori pe aceeași pagină — un singur footer, la final, nu unul repetat între secțiuni.',
    ],
    anatomy:
      'Un `<footer class="sd-footer">` cu `__main` (grid, 3 coloane pe desktop, o coloană sub 48rem) conținând secțiuni cu `__heading`+`__list`, plus un rând `__meta` pentru informații suplimentare.',
    variants: ['implicit — o singură variantă'],
    states: ['nu are stări interactive proprii, dincolo de linkurile din interior'],
    behavior:
      'Fără JavaScript: grid CSS complet funcțional, colapsat la o coloană sub 48rem prin media query. Nu apare deloc la tipărire (`display: none` în `@media print`) — resursele din footer nu au sens pe hârtie.',
    contentGuidelines: [
      'linkurile sunt resurse reale (accesibilitate, licență, contact), nu umplutură generică.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-skip-link',
    purpose:
      'Permite utilizatorilor de tastatură să sară direct la conținutul principal, fără să parcurgă din nou toată navigația repetitivă a fiecărei pagini.',
    whenToUse: ['ca primul element focusabil al fiecărei pagini, fără excepție.'],
    whenNotToUse: [
      'ascuns permanent sau eliminat din tab order — scopul lui e exact să fie primul element accesibil de la tastatură.',
    ],
    anatomy:
      'Un `<a class="sd-skip-link" href="#continut">`, poziționat fix, ascuns vizual (`translateY(-180%)`) până la primire de focus.',
    variants: ['implicit — o singură variantă'],
    states: ['ascuns (implicit)', 'vizibil (`:focus`, `translateY(0)`)'],
    behavior:
      'Fără CSS: link real, funcțional, doar permanent vizibil (fără animația de apariție). Fără JavaScript: comportamentul de salt la focus e nativ browserului, prin `href="#id"`.',
    contentGuidelines: [
      'textul spune exact destinația („Sari la conținut"), nu un generic „Skip".',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/50'],
    knownIssues: [],
    implementerResponsibilities: [
      '`id`-ul țintă (de exemplu `continut`) trebuie să existe cu adevărat pe pagină, pe elementul `main` — verificat automat de testele de accesibilitate existente.',
    ],
    history: [
      {
        version: '0.1.0-alpha.0',
        date: '2026-07-22',
        change:
          'Publicare inițială în @sistem-digital/components, ca parte a shell-ului de navigație instituțională și a căutării server-rendered (PR #50).',
      },
    ],
  },
  {
    id: 'navigation-cookie-banner',
    purpose:
      'Informează despre folosirea cookie-urilor și păstrează consimțământul înregistrat, rămânând vizibil până când persoana îl acordă explicit.',
    whenToUse: ['pe fiecare pagină, până la înregistrarea unui consimțământ real.'],
    whenNotToUse: [
      'dacă site-ul nu folosește deloc cookie-uri opționale — un banner fără scop real induce în eroare.',
    ],
    anatomy:
      'Un `<section class="sd-cookie-banner" data-sd-cookie-banner>` (poziționat sticky, la baza ecranului) cu `__inner` (flex) → `__content` și un buton de acceptare (`data-sd-cookie-accept`).',
    variants: ['implicit — o singură variantă'],
    states: ['vizibil (implicit, fără JS)', 'ascuns (`[hidden]`, doar după acceptare, cu JS)'],
    behavior:
      'Fără JavaScript: bannerul rămâne vizibil la fiecare încărcare de pagină — alegere sigură, nu un fals negativ. Cu JavaScript (`enhanceCookieBanner`): la accept, consimțământul se salvează în `localStorage` (cheie implicită `sd-cookie-consent`) și bannerul se ascunde; dacă `localStorage` nu e disponibil, bannerul reapare la vizita următoare, fără eroare.',
    contentGuidelines: [
      'spune explicit ce tip de cookie-uri sunt folosite (esențiale/urmărire), nu doar formula generică „acest site folosește cookie-uri".',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/88'],
    knownIssues: [],
    implementerResponsibilities: [
      'nu ascunde bannerul din markup-ul implicit — starea vizibilă e cea corectă până la un consimțământ real, înregistrat de utilizator.',
    ],
    history: [
      {
        version: '0.1.0-alpha.3',
        date: '2026-07-26',
        change:
          'Adăugat în @sistem-digital/components, împreună cu segmented-control, spinner, chip și avatar (PR #88).',
      },
    ],
  },
  {
    id: 'navigation-phase-banner',
    purpose:
      'Semnalează stadiul de maturitate al serviciului (alfa/beta) și oferă o cale directă către feedback.',
    whenToUse: ['pe fiecare pagină a unui serviciu aflat în stadiul alfa sau beta.'],
    whenNotToUse: [
      'după ce serviciul devine stabil — eliminarea bannerului e chiar semnalul de „absolvire", nu ceva de lăsat permanent.',
    ],
    anatomy:
      'Un `<div class="sd-phase-banner">` cu `__inner` (flex) conținând o etichetă de stadiu (`sd-tag`) și un `<p>` cu link către feedback.',
    variants: ['implicit — o singură variantă'],
    states: ['nu are stări interactive proprii'],
    behavior: 'Element static, fără JavaScript.',
    contentGuidelines: [
      'link-ul de feedback duce la un canal real, monitorizat, niciodată la o adresă generică sau moartă.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/89'],
    knownIssues: [],
    implementerResponsibilities: [],
    history: [
      {
        version: '0.1.0-alpha.3',
        date: '2026-07-28',
        change:
          'Adăugat în @sistem-digital/components, împreună cu back-to-top-link și exit-this-page (PR #89).',
      },
    ],
  },
  {
    id: 'navigation-back-to-top-link',
    purpose:
      'Oferă o cale reală, printr-o ancoră HTML, de revenire la începutul unei pagini lungi.',
    whenToUse: ['la finalul conținutului lung, unde derularea manuală înapoi ar fi incomodă.'],
    whenNotToUse: ['pe pagini scurte, unde revenirea sus nu aduce niciun beneficiu real.'],
    anatomy:
      'Un `<a class="sd-back-to-top" href="#catalog-top">` cu `__icon` decorativ, rotit prin CSS.',
    variants: ['implicit — o singură variantă'],
    states: ['implicit', ':hover (subliniere text)'],
    behavior:
      'Link real cu `href="#id"` — funcționează identic fără CSS sau JavaScript, doar fără rotația iconiței decorative. Dispare la tipărire (`display: none` în `@media print`).',
    contentGuidelines: ['textul spune „Înapoi sus", nu doar o săgeată fără text alternativ.'],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/89'],
    knownIssues: [],
    implementerResponsibilities: [
      '`href`-ul trebuie să indice un `id` real, existent pe pagină, nu doar `#top` generic fără element țintă.',
    ],
    history: [
      {
        version: '0.1.0-alpha.3',
        date: '2026-07-28',
        change:
          'Adăugat în @sistem-digital/components, împreună cu phase-banner și exit-this-page (PR #89).',
      },
    ],
  },
  {
    id: 'navigation-exit-this-page',
    purpose:
      'Permite părăsirea imediată a paginii într-o situație de urgență, fără să lase o urmă ușor de găsit în istoricul browserului.',
    whenToUse: [
      'pe pagini cu conținut sensibil, unde o ieșire rapidă și discretă contează (de exemplu servicii legate de siguranța personală).',
    ],
    whenNotToUse: [
      'pe pagini obișnuite — prezența nejustificată a acestui link ar induce o falsă senzație de urgență sau pericol.',
    ],
    anatomy:
      'Un `<a class="sd-exit-page" data-sd-exit-this-page href="...">`, stilizat ca acțiune de avertizare.',
    variants: ['implicit — o singură variantă'],
    states: ['implicit', ':hover'],
    behavior:
      'Fără JavaScript: link real; ieșirea funcționează ca orice navigare obișnuită, către adresa din `href`. Cu JavaScript (`enhanceExitThisPage`): click-ul înlocuiește intrarea curentă din istoric (`location.replace`), astfel încât butonul „înapoi" al browserului nu poate reveni la această pagină; apăsarea tastei Shift de trei ori consecutiv, în mai puțin de o secundă, declanșează aceeași ieșire, fără să fie nevoie de mouse.',
    contentGuidelines: [
      'destinația (`href`) e un site neutru, real — niciodată un placeholder lăsat necompletat.',
    ],
    research: ['https://github.com/ciprian-rus/sistem.digital/pull/89'],
    knownIssues: [],
    implementerResponsibilities: [
      'setează un `href` real către un site neutru — enhancement-ul JavaScript navighează exact la acea adresă, nu la una hardcodată separat în cod.',
    ],
    history: [
      {
        version: '0.1.0-alpha.3',
        date: '2026-07-28',
        change:
          'Adăugat în @sistem-digital/components, împreună cu phase-banner și back-to-top-link (PR #89).',
      },
    ],
  },
];
