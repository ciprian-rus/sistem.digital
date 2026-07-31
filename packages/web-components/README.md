# @sistem-digital/web-components

Custom elements care înregistrează, pentru orice framework, aceleași progressive enhancements JavaScript din `@sistem-digital/components` — fără să depindă de React.

Pachetul este în stadiu alpha inițial. Nu introduce markup, CSS sau comportament nou: fiecare element este un wrapper subțire peste markup-ul deja documentat în `@sistem-digital/components`, care rămâne complet funcțional și fără acest pachet.

## De ce există

`@sistem-digital/components` exportă funcții de enhancement (`enhanceDialogs`, `enhanceTabs` etc.) gândite pentru a fi apelate o singură dată, la nivel de pagină, de codul-gazdă (așa cum face `InteractiveEnhancements` din `apps/website`). Într-un context Angular, Vue, Svelte sau HTML simplu, fără un framework de componente, e util să existe un echivalent declarativ: un tag HTML care se auto-inițializează la montare și se curăță la demontare.

## Instalare

```bash
pnpm add @sistem-digital/components @sistem-digital/web-components
```

```ts
import { defineWebComponents } from '@sistem-digital/web-components';

defineWebComponents();
```

```css
@import '@sistem-digital/components/interactive.css';
@import '@sistem-digital/web-components/elements.css';
```

`defineWebComponents()` înregistrează toate tag-urile cu `customElements.define`, sărind peste cele deja definite. E sigur de apelat de mai multe ori și sigur de importat în afara unui browser (SSR, teste Node) — nu face nimic dacă `customElements` nu există.

Foaia `elements.css` setează `display: contents` pe fiecare tag, ca wrapper-ul să nu afecteze layout-ul — indiferent dacă `defineWebComponents()` a rulat sau nu.

## Element per enhancement

Fiecare element înfășoară markup-ul existent ca light DOM — nu Shadow DOM, deliberat, ca stilurile publicate în pachetele `@sistem-digital/components` și `@sistem-digital/tokens` să se aplice normal, fără penetrare de shadow boundary.

| Element                     | Înfășoară                               | Echivalent din `@sistem-digital/components` |
| --------------------------- | --------------------------------------- | ------------------------------------------- |
| `<sd-accordion>`            | `.sd-accordion[data-sd-accordion]`      | `enhanceAccordions`                         |
| `<sd-autocomplete>`         | `[data-sd-autocomplete]`                | `enhanceAutocompletes`                      |
| `<sd-character-count>`      | `[data-sd-character-count]`             | `enhanceCharacterCount`                     |
| `<sd-cookie-banner>`        | `[data-sd-cookie-banner]`               | `enhanceCookieBanner`                       |
| `<sd-dialog>`               | declanșator + `<dialog data-sd-dialog>` | `enhanceDialogs`                            |
| `<sd-dropdown>`             | `[data-sd-dropdown]`                    | `enhanceDropdowns`                          |
| `<sd-error-summary>`        | `.sd-error-summary`                     | `enhanceErrorSummaryLinks`                  |
| `<sd-exit-this-page>`       | `[data-sd-exit-this-page]`              | `enhanceExitThisPage`                       |
| `<sd-file-upload-advanced>` | `[data-sd-file-upload]`                 | `enhanceFileUploads`                        |
| `<sd-sortable-table>`       | `[data-sd-sortable-table]`              | `enhanceSortableTables`                     |
| `<sd-tabs>`                 | `[data-sd-tabs]`                        | `enhanceTabs`                               |
| `<sd-tooltip>`              | `[data-sd-tooltip]`                     | `enhanceTooltips`                           |

```html
<sd-accordion>
  <div class="sd-accordion" data-sd-accordion="single">
    <details open>
      <summary>Cine poate depune cererea?</summary>
      <div class="sd-accordion__content">
        <p>Persoana vizată sau reprezentantul legal.</p>
      </div>
    </details>
  </div>
</sd-accordion>
```

`<sd-cookie-banner>` citește opțional un atribut `storage-key`, echivalent cu opțiunea `storageKey` a `enhanceCookieBanner`.

## Reguli

- fiecare element e opțional: markup-ul din interior funcționează identic dacă `defineWebComponents()` nu a fost apelat, sau chiar fără JavaScript deloc;
- niciun element nu randează conținut propriu — nu există `shadowRoot`, `render()` sau template intern;
- clasele elementelor sunt exportate individual (`SdAccordionElement` etc.) pentru consumatori care vor un registry propriu, cu alt prefix de tag sau doar un subset.

Eliminarea sau redenumirea unui tag, atribut sau a `defineWebComponents()` reprezintă breaking change.
