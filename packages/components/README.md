# @sistem-digital/components

Componente HTML/CSS/JavaScript accesibile, independente de framework, pentru servicii digitale publice.

Pachetul este în stadiu alpha și livrează patru module publice:

- formulare și validare;
- navigație și structură instituțională;
- conținut și afișare a datelor;
- componente interactive și progressive enhancement.

## Instalare

```bash
pnpm add @sistem-digital/tokens @sistem-digital/components
```

```css
@import '@sistem-digital/tokens/css';
@import '@sistem-digital/tokens/themes.css';
@import '@sistem-digital/components/forms.css';
@import '@sistem-digital/components/navigation.css';
@import '@sistem-digital/components/content.css';
@import '@sistem-digital/components/interactive.css';
```

Pachetul consumă exclusiv rolurile publice din `@sistem-digital/tokens`. Nu include React și nu cere JavaScript pentru funcționarea de bază.

## Inventare programatice

```ts
import {
  contentComponentNames,
  formComponentNames,
  interactiveComponentNames,
  navigationComponentNames,
} from '@sistem-digital/components';
```

Inventarele sunt utile pentru documentație, validatoare și instrumente de adopție. Markup-ul HTML și clasele CSS rămân contractul de implementare.

## Formulare

Modul: `@sistem-digital/components/forms.css`

- label și hint;
- fieldset și legend;
- input, textarea și select;
- checkbox și radio native;
- error message și error summary;
- button și button group;
- file upload de bază.

```html
<div class="sd-form-group sd-form-group--error">
  <label class="sd-label" for="email">Adresa de e-mail</label>
  <p class="sd-hint" id="email-hint">Vom trimite confirmarea aici.</p>
  <p class="sd-error-message" id="email-error">Introdu o adresă în formatul nume@exemplu.ro</p>
  <input
    class="sd-input"
    id="email"
    name="email"
    type="email"
    autocomplete="email"
    aria-invalid="true"
    aria-describedby="email-hint email-error"
  />
</div>
```

Validarea canonică rămâne pe server. Helper-ele `focusErrorSummary()` și `enhanceErrorSummaryLinks()` sunt progressive enhancements opționale.

## Navigație și structură

Modul: `@sistem-digital/components/navigation.css`

- banner de autenticitate și alertă majoră;
- identitate instituțională și numele serviciului;
- navigație desktop și disclosure mobil nativ;
- breadcrumb și service navigation;
- formular de căutare GET;
- footer standard și skip link.

```html
<details class="sd-mobile-navigation">
  <summary class="container">Meniu</summary>
  <nav class="container" aria-label="Navigație principală mobilă">
    <ul class="sd-mobile-navigation__list">
      <li><a href="/servicii">Servicii</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</details>
```

Disclosure-ul funcționează cu tastatura și fără JavaScript. Varianta desktop păstrează aceeași ordine informațională.

## Conținut și date

Modul: `@sistem-digital/components/content.css`

- link și link extern;
- alertă, notification banner și inset text;
- card și status tag;
- tabel responsive;
- summary list;
- details;
- pagination;
- metadata și data ultimei actualizări.

### Tabel responsive

```html
<div
  class="sd-table-container"
  role="region"
  aria-label="Situația plăților; tabel derulabil orizontal"
  tabindex="0"
>
  <table class="sd-table">
    <caption>
      Situația plăților — trimestrul II 2026
    </caption>
    <thead>
      <tr>
        <th scope="col">Instituție</th>
        <th scope="col">Plăți</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Instituția A</th>
        <td>1.248</td>
      </tr>
    </tbody>
  </table>
</div>
```

Overflow-ul este local și regiunea devine focusabilă numai când tabelul trebuie derulat. Tabelele nu se folosesc pentru layout.

### Summary list

```html
<dl class="sd-summary-list">
  <div class="sd-summary-list__row">
    <dt class="sd-summary-list__key">Cod fiscal</dt>
    <dd class="sd-summary-list__value">12345678</dd>
    <dd class="sd-summary-list__actions">
      <a href="/modifica"> Modifică <span class="sd-visually-hidden">codul fiscal</span> </a>
    </dd>
  </div>
</dl>
```

Summary list reprezintă perechi cheie–valoare. Pentru comparații între mai multe entități se folosește tabelul.

### Details și pagination

Componentele folosesc elementele native `details`, `summary` și `nav`. Pagination produce URL-uri stabile și indică pagina curentă prin `aria-current="page"`.

## Componente interactive

Modul: `@sistem-digital/components/interactive.css`

- accordion;
- dialog nativ cu fallback inline;
- tabs cu fallback complet;
- step indicator;
- date input și selector nativ de dată;
- autocomplete cu baseline `datalist`;
- file upload avansat.

```html
<div class="sd-tabs" data-sd-tabs>
  <div data-sd-tab-list hidden aria-label="Modalități de primire">
    <button id="tab-digital" data-sd-tab aria-controls="panel-digital" aria-selected="true">
      Digital
    </button>
  </div>
  <section id="panel-digital" data-sd-tab-panel>...</section>
</div>
```

Fără JavaScript, toate panourile rămân vizibile. Pentru enhancement:

```ts
import { enhanceInteractiveComponents } from '@sistem-digital/components';

const cleanup = enhanceInteractiveComponents();
```

Helper-ele individuale sunt exportate separat și acceptă opțional un `root: ParentNode`. Fiecare returnează o funcție de cleanup.

## Reguli comune

- HTML-ul semantic primează;
- statusurile includ text și nu depind de culoare;
- cardurile cu overlay au o singură destinație;
- controalele native nu sunt reconstruite inutil cu ARIA;
- JavaScript-ul adaugă enhancement, nu conținut esențial;
- numerele, monedele și datele folosesc formate locale coerente;
- fiecare target interactiv are minimum 44 CSS px când criteriul se aplică;
- pagina face reflow la 320 CSS px fără scroll orizontal global;
- forced colors, reduced motion și print sunt tratate explicit;
- clasele publice sunt prefixate cu `sd-`.

## Documentație completă

- formulare: `docs/components/forms.md`;
- navigație: `docs/components/navigation.md`;
- conținut și date: `docs/components/content-data.md`;
- interactive: `docs/components/interactive.md`.

Implementările publice sunt disponibile la:

- `/componente/formulare`;
- `/componente/navigatie`;
- `/componente/continut-date`;
- `/componente/interactive`.

Eliminarea sau redenumirea unei clase publice, schimbarea semanticii markup-ului ori a comportamentului helperelor reprezintă breaking change.
