# Componente interactive

**Stadiu:** alpha · **Pachet:** `@sistem-digital/components` · **CSS:** `interactive.css`

## Obiectiv

Componentele interactive gestionează situații în care HTML-ul nativ nu oferă singur întreaga experiență. JavaScript-ul este folosit numai pentru enhancement și nu trebuie să ascundă funcționalitatea de bază.

## Principii comune

- conținutul esențial este prezent în HTML-ul server-rendered;
- ordinea focusului urmează ordinea DOM;
- focusul este mutat numai când acțiunea utilizatorului o justifică;
- Escape închide suprafețele temporare;
- Enter și Space activează butoane și disclosure-uri;
- săgețile sunt implementate numai în pattern-uri care le cer;
- starea este expusă prin proprietăți native sau ARIA;
- orice enhancement oferă funcție de cleanup;
- componentele complexe nu sunt declarate stabile înainte de testare manuală.

## Accordion

Accordion-ul folosește `details` și `summary`.

```html
<div class="sd-accordion" data-sd-accordion="single">
  <details open>
    <summary>Cine poate depune cererea?</summary>
    <div class="sd-accordion__content"><p>...</p></div>
  </details>
</div>
```

În varianta `single`, JavaScript închide celelalte secțiuni când una este deschisă. Fără JavaScript, toate disclosure-urile rămân complet utilizabile.

Nu se folosește accordion pentru:

- conținut esențial care trebuie citit înainte de continuare;
- pașii unui formular;
- ascunderea implicită a erorilor;
- reducerea artificială a unei pagini prost structurate.

## Dialog

Dialogul folosește elementul nativ `dialog`. Fără JavaScript, conținutul este afișat inline prin CSS. Trigger-ul este un link către fragmentul dialogului.

```html
<a href="#confirm-dialog" aria-controls="confirm-dialog" data-sd-dialog-trigger>
  Revizuiește trimiterea
</a>
<dialog class="sd-dialog" id="confirm-dialog" data-sd-dialog aria-labelledby="dialog-title">
  ...
</dialog>
```

Cu enhancement:

- se folosește `showModal()`;
- Escape închide dialogul nativ;
- focusul este limitat de browser în suprafața modală;
- la închidere, focusul revine pe trigger;
- butoanele de închidere au `data-sd-dialog-close`.

Dialogul nu se folosește pentru informații care ar trebui să fie pagină, pentru acorduri lungi sau pentru mai multe operațiuni independente.

## Tabs

Tabs sunt justificate numai pentru perspective paralele ale aceluiași obiect. Fără JavaScript, toate panourile sunt afișate succesiv.

```html
<div class="sd-tabs" data-sd-tabs>
  <div data-sd-tab-list hidden aria-label="Modalități de primire">
    <button id="tab-a" data-sd-tab aria-controls="panel-a" aria-selected="true">Digital</button>
  </div>
  <section id="panel-a" data-sd-tab-panel>...</section>
</div>
```

Comportament tastatură:

- ArrowRight și ArrowLeft mută selecția circular;
- Home selectează primul tab;
- End selectează ultimul tab;
- Tab mută focusul în conținutul panoului.

Tabs nu se folosesc pentru pași secvențiali, navigație globală sau conținut care trebuie comparat simultan.

## Step indicator

Step indicator folosește `nav`, listă ordonată și `aria-current="step"`. Marcajele completate nu sunt linkuri dacă utilizatorul nu poate reveni în siguranță.

Starea este textuală și rămâne inteligibilă fără culoare. La ecrane înguste, pașii sunt afișați vertical.

## Date input și date picker

Pentru date memorate sau cunoscute exact se recomandă trei câmpuri numerice: zi, lună și an. Pentru alegerea unei date apropiate poate fi folosit `input type="date"`.

Reguli:

- formatul este explicat prin exemplu;
- fiecare parte are label propriu;
- serverul validează data calendaristică;
- erorile indică exact partea incorectă;
- nu se presupune că interfața selectorului nativ este identică între browsere.

Un calendar JavaScript personalizat nu intră în MVP.

## Autocomplete

Baseline-ul folosește `input` și `datalist`. Enhancement-ul transformă câmpul într-un combobox cu listbox.

Comportament:

- inputul expune `role="combobox"`, `aria-expanded`, `aria-controls` și `aria-activedescendant`;
- ArrowDown și ArrowUp mută opțiunea activă;
- Enter selectează;
- Escape închide lista;
- rezultatele sunt anunțate într-o regiune `aria-live`;
- Tab păstrează comportamentul normal al formularului.

Autocomplete-ul local nu se folosește pentru liste foarte mari, date sensibile sau căutări care necesită autorizare. În aceste cazuri este necesar un endpoint server-side.

## File upload avansat

Inputul nativ de fișier rămâne permanent vizibil. Drag-and-drop, lista fișierelor și eliminarea individuală sunt enhancement-uri.

Reguli:

- tipurile și dimensiunile acceptate sunt explicate înaintea câmpului;
- serverul revalidează toate fișierele;
- drag-and-drop nu este singura cale;
- fiecare buton de eliminare include numele fișierului;
- modificarea listei este anunțată prin `aria-live`;
- starea de upload efectiv și progresul de rețea nu intră în helperul MVP.

## API JavaScript

```ts
import {
  enhanceAccordions,
  enhanceAutocompletes,
  enhanceDialogs,
  enhanceFileUploads,
  enhanceInteractiveComponents,
  enhanceTabs,
} from '@sistem-digital/components';

const cleanup = enhanceInteractiveComponents();
```

Fiecare funcție acceptă opțional un `root: ParentNode` și returnează o funcție de cleanup.

## Accesibilitate și testare

Verificarea automată include:

- axe în toate temele;
- focus return pentru dialog;
- Escape pentru dialog și autocomplete;
- ArrowLeft, ArrowRight, Home și End pentru tabs;
- ArrowUp, ArrowDown și Enter pentru autocomplete;
- fallback fără JavaScript;
- reflow la 320 CSS px;
- `forced-colors` și `prefers-reduced-motion`;
- capturi de regresie vizuală desktop și mobil.

Auditul manual trebuie să includă NVDA/Firefox, JAWS/Chrome, VoiceOver/Safari și TalkBack/Chrome înainte de stabilizare.

## Probleme cunoscute

- comportamentul dialogului nativ diferă pe versiunile mai vechi de Safari;
- `input type="date"` are interfețe diferite între browsere și sisteme de operare;
- `datalist` are suport inconsistent pentru tehnologii asistive, motiv pentru care enhancement-ul combobox trebuie testat manual;
- DataTransfer poate fi restricționat în unele contexte de securitate;
- capturile Playwright detectează schimbări vizuale, dar nu validează calitatea designului.

## Pagina demonstrativă

Implementarea de referință este disponibilă la `/componente/interactive`.
