# @sistem-digital/react

Hook-uri React pentru progressive enhancements din `@sistem-digital/components`.

Pachetul este în stadiu alpha inițial. Nu introduce markup, CSS sau comportament nou: fiecare hook apelează exact aceeași funcție de enhancement deja publicată în `@sistem-digital/components`, pe elementul referit de un `ref`. Markup-ul rămâne complet funcțional fără acest pachet.

## Instalare

```bash
pnpm add @sistem-digital/components @sistem-digital/react
```

## Enhancement la nivel de pagină

Pentru cazul comun — toate enhancement-urile, o singură dată, la nivelul aplicației:

```tsx
import { GlobalEnhancements } from '@sistem-digital/react';

export function App() {
  return (
    <>
      <GlobalEnhancements />
      {/* restul aplicației */}
    </>
  );
}
```

`GlobalEnhancements` nu randează nimic; montează `enhanceInteractiveComponents`, `enhanceCookieBanner`, `enhanceExitThisPage` și `enhanceCharacterCount` pe `document` și le curăță la unmount. `useSistemDigitalEnhancements()` e echivalentul ca hook, pentru consumatorii care preferă să nu adauge o componentă goală în arbore.

## Hook per componentă

Pentru control local, pe un singur element:

```tsx
import { useRef } from 'react';
import { useDialog } from '@sistem-digital/react';

function ConfirmDialog() {
  const ref = useRef<HTMLDivElement>(null);
  useDialog(ref);

  return (
    <div ref={ref}>
      <a
        className="sd-button sd-button--primary"
        href="#confirm"
        aria-controls="confirm"
        data-sd-dialog-trigger
      >
        Revizuiește
      </a>
      <dialog className="sd-dialog" id="confirm" data-sd-dialog aria-labelledby="confirm-title">
        <div className="sd-dialog__header">
          <h3 className="sd-dialog__title" id="confirm-title">
            Trimite cererea?
          </h3>
          <button className="sd-dialog__close" type="button" data-sd-dialog-close>
            Închide
          </button>
        </div>
      </dialog>
    </div>
  );
}
```

| Hook                    | Înfășoară                               | Echivalent din `@sistem-digital/components` |
| ----------------------- | --------------------------------------- | ------------------------------------------- |
| `useAccordion`          | `.sd-accordion[data-sd-accordion]`      | `enhanceAccordions`                         |
| `useAutocomplete`       | `[data-sd-autocomplete]`                | `enhanceAutocompletes`                      |
| `useCharacterCount`     | `[data-sd-character-count]`             | `enhanceCharacterCount`                     |
| `useCookieBanner`       | `[data-sd-cookie-banner]`               | `enhanceCookieBanner`                       |
| `useDialog`             | declanșator + `<dialog data-sd-dialog>` | `enhanceDialogs`                            |
| `useDropdown`           | `[data-sd-dropdown]`                    | `enhanceDropdowns`                          |
| `useErrorSummary`       | `.sd-error-summary`                     | `enhanceErrorSummaryLinks`                  |
| `useExitThisPage`       | `[data-sd-exit-this-page]`              | `enhanceExitThisPage`                       |
| `useFileUploadAdvanced` | `[data-sd-file-upload]`                 | `enhanceFileUploads`                        |
| `useTabs`               | `[data-sd-tabs]`                        | `enhanceTabs`                               |
| `useTooltip`            | `[data-sd-tooltip]`                     | `enhanceTooltips`                           |

`useCookieBanner(ref, storageKey?)` acceptă opțional un al doilea argument, echivalent cu opțiunea `storageKey` a `enhanceCookieBanner`.

## Reguli

- fiecare hook e opțional: markup-ul din interior funcționează identic fără el, sau fără JavaScript deloc;
- niciun hook nu randează sau modifică structura DOM — doar adaugă/elimină event listeners și atribute ARIA pe markup-ul deja existent;
- `ref.current === null` la montare e tratat ca stare validă (de exemplu randare condiționată): hook-ul pur și simplu nu face nimic până ref-ul se populează.

Eliminarea sau redenumirea unui hook, sau schimbarea semnăturii sale, reprezintă breaking change.
