# @sistem-digital/components

Componente HTML/CSS/JavaScript accesibile, independente de framework, pentru servicii digitale publice.

Pachetul se află în stadiu alpha. Prima livrare acoperă formularele, validarea și mesajele de eroare.

## Instalare

```bash
pnpm add @sistem-digital/tokens @sistem-digital/components
```

```css
@import '@sistem-digital/tokens/css';
@import '@sistem-digital/tokens/themes.css';
@import '@sistem-digital/components/forms.css';
```

Pachetul de componente consumă exclusiv rolurile publice din `@sistem-digital/tokens`. Nu include React și nu cere JavaScript pentru funcționarea de bază.

## Inventar formulare

- label și hint;
- fieldset și legend;
- input, textarea și select;
- checkbox și radio native;
- error message și error summary;
- button și button group;
- file upload de bază.

## Exemplu valid

```html
<div class="sd-form-group">
  <label class="sd-label" for="email">Adresa de e-mail</label>
  <p class="sd-hint" id="email-hint">Vom trimite confirmarea cererii la această adresă.</p>
  <input
    class="sd-input"
    id="email"
    name="email"
    type="email"
    autocomplete="email"
    aria-describedby="email-hint"
  />
</div>
```

## Exemplu invalid

```html
<div class="sd-form-group sd-form-group--error">
  <label class="sd-label" for="email">Adresa de e-mail</label>
  <p class="sd-hint" id="email-hint">Vom trimite confirmarea cererii la această adresă.</p>
  <p class="sd-error-message" id="email-error">Introdu o adresă în formatul nume@exemplu.ro.</p>
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

Mesajul explică remedierea și este asociat prin `aria-describedby`. Culoarea și bordura sunt suplimentare; prefixul textual „Eroare:” este generat de componentă.

## Error summary

```html
<div
  class="sd-error-summary"
  data-sd-error-summary
  role="alert"
  aria-labelledby="error-summary-title"
  tabindex="-1"
>
  <h2 class="sd-error-summary__title" id="error-summary-title">
    Sunt două probleme de rezolvat
  </h2>
  <ul class="sd-error-summary__list">
    <li><a href="#email">Introdu adresa de e-mail</a></li>
    <li><a href="#service-type">Alege tipul serviciului</a></li>
  </ul>
</div>
```

Serverul trebuie să redea rezumatul la începutul formularului după validare. Linkurile native funcționează fără JavaScript.

Pentru mutarea opțională a focusului după randarea răspunsului invalid:

```ts
import { focusErrorSummary } from '@sistem-digital/components';

focusErrorSummary();
```

Pentru ca linkurile din rezumat să mute focusul pe câmpul țintă:

```ts
import { enhanceErrorSummaryLinks } from '@sistem-digital/components';

const summary = document.querySelector<HTMLElement>('[data-sd-error-summary]');
const cleanup = summary ? enhanceErrorSummaryLinks(summary) : () => {};
```

## Fieldset și alegeri

```html
<fieldset class="sd-fieldset">
  <legend class="sd-legend sd-legend--large">Cum dorești să primești documentul?</legend>
  <p class="sd-hint" id="delivery-hint">Alege o singură opțiune.</p>
  <div class="sd-choice-list" aria-describedby="delivery-hint">
    <label class="sd-choice">
      <input class="sd-choice__control" type="radio" name="delivery" value="digital" />
      <span class="sd-choice__label">În format digital</span>
    </label>
    <label class="sd-choice">
      <input class="sd-choice__control" type="radio" name="delivery" value="counter" />
      <span class="sd-choice__label">Ridicare de la ghișeu</span>
    </label>
  </div>
</fieldset>
```

Se folosesc controale HTML native. Nu se reconstruiesc checkbox-uri și radio-uri cu roluri ARIA.

## Disabled și readonly

- `disabled` indică un control indisponibil și nu este transmis cu formularul;
- `readonly` indică o valoare vizibilă și transmisă, dar nemodificabilă;
- cele două stări au tratamente vizuale distincte;
- nu se folosește `aria-disabled` pe un control nativ în locul atributului `disabled`.

## Conținut

Mesajele de eroare:

- spun ce este greșit;
- explică ce trebuie făcut;
- folosesc denumirea câmpului sau formatul așteptat;
- evită „valoare invalidă”, „eroare 42” sau formulări culpabilizante;
- nu includ punct la final când sunt fragmente scurte.

## Accesibilitate

Fiecare exemplu trebuie verificat pentru:

- asociere label–control;
- hint și eroare prin `aria-describedby`;
- `aria-invalid="true"` numai după validare;
- `autocomplete` adecvat datelor personale;
- ordine de focus și operare exclusiv cu tastatura;
- target de minimum 44 CSS px;
- reflow la 320 CSS px;
- toate temele și forced colors;
- zoom și tehnologii asistive conform matricei Sistem Digital.

## API CSS

Toate clasele sunt prefixate cu `sd-`. O aplicație poate folosi markup semantic fără clase suplimentare, dar aspectul oficial necesită clasele documentate.

Eliminarea sau redenumirea unei clase publice, schimbarea semanticii markup-ului ori a comportamentului helperelor reprezintă breaking change.
