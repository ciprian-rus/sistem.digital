# ADR 0004 — Prefixul `sd-` pentru clase CSS, custom properties și tag-uri Web Components

## Status

Propus pentru decizie — nu este acceptat, nu este respins. Acest document analizează opțiunea de redenumire (de exemplu, `sd-` → `ro-`), fără să o execute.

## Context

Întreaga suprafață publică a sistemului folosește azi prefixul `sd-`, moștenit din numele proiectului „Sistem Digital":

| Suprafață                                | Exemplu                                      | Amploare confirmată                                                                          |
| ---------------------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Custom properties CSS                    | `--sd-color-brand`, `--sd-space-4`           | 230 de proprietăți distincte în `@sistem-digital/tokens`                                     |
| Clase CSS                                | `.sd-button`, `.sd-card`, `.sd-tag--warning` | 288 de clase distincte în `@sistem-digital/components`                                       |
| Tag-uri Web Components (custom elements) | `<sd-accordion>`, `<sd-dialog>`, `<sd-tabs>` | 12 elemente înregistrate în `@sistem-digital/web-components`                                 |
| Atribute de date                         | `data-sd-theme`, `data-sd-sortable-table`    | folosite de scriptul de inițializare a temelor și de comportamentele progressive enhancement |
| Chei de stocare locală                   | `sd-theme`, `sd-reference-service-draft-v1`  | `localStorage`, documentate în ADR 0003                                                      |

Numele pachetelor npm (`@sistem-digital/tokens`, `@sistem-digital/components` etc.) folosesc deja numele complet al proiectului, nu prefixul scurt — o eventuală redenumire a prefixului nu le-ar afecta.

Întrebarea ridicată: ar trebui `sd-` înlocuit cu ceva specific României — de exemplu `ro-`?

## Opțiunile analizate

### A. Păstrarea `sd-`

`sd-` derivă direct din numele proiectului („**S**istem **D**igital"), consecvent cu convenția obișnuită a sistemelor de design de a-și folosi propriul nume ca prefix (similar cu alte proiecte care își prefixează componentele cu inițialele numelui, nu cu un cod de țară).

### B. `ro-` (cod de țară)

Ar lega prefixul explicit de România ca țară, nu de proiect ca atare.

**Tensiune directă cu poziționarea deja publicată a proiectului.** `PublicHeader` afișează azi, pe fiecare pagină, textul: _„Proiect open-source independent. Domeniul oficial este sistem.digital."_ — o declarație explicită că proiectul **nu** este o entitate guvernamentală oficială. Un prefix `ro-` (cod ISO de țară, folosit convențional pentru domenii/API-uri oficiale de stat) ar putea sugera exact statutul oficial pe care headerul îl neagă explicit — o inconsecvență de poziționare, nu doar tehnică.

### C. Alt prefix generic (`gov-`, `admin-`, similar)

Nemenționat explicit de utilizator, dar o alternativă posibilă dacă motivația e diferențierea de alte sisteme de design, nu legarea de un cod de țară. Ar evita tensiunea de la opțiunea B, dar ar pierde legătura directă cu numele proiectului.

## Costul unei redenumiri, indiferent de prefixul ales

Redenumirea **nu este un find-and-replace intern** — cele 12 tag-uri de Web Components sunt API public: orice site care instalează `@sistem-digital/web-components` și scrie `<sd-accordion>` în HTML-ul propriu ar trebui să-și rescrie markup-ul la actualizare. La fel, orice CSS extern care suprascrie `.sd-button` sau citește `--sd-color-brand` s-ar rupe.

Conform politicii deja publicate ([`docs/governance/release-policy.md`](../../governance/release-policy.md)):

- redenumirea tag-urilor de custom elements și a claselor publice este listată explicit ca schimbare incompatibilă;
- necesită versiune majoră, changeset, migration notes și, pentru o tranziție responsabilă, o perioadă de suport paralel pentru API-ul vechi (alias sau dual-prefix), nu o înlocuire instantanee;
- înainte de `1.0.0`, o schimbare incompatibilă e permisă tehnic, dar tot trebuie documentată prin changeset și migration note — nu e gratuită nici acum.

Suprafața reală de atins: 4 pachete publice (`tokens`, `components`, `web-components`, `react`), toate paginile din `apps/website` (inclusiv cele 13 pattern-uri și paginile de catalog construite până acum în această sesiune), toată documentația care citează exemple de cod cu prefixul curent, și testele care verifică selectori CSS/tag-uri explicite.

## Recomandare

Păstrarea `sd-` (opțiunea A), pentru trei motive independente:

1. **Nu e un prefix generic** — derivă deja din numele proiectului, ceea ce e exact rolul unui astfel de prefix.
2. **Un prefix `ro-` ar contrazice poziționarea „proiect independent" deja publicată**, afișată pe fiecare pagină.
3. **Costul unei redenumiri e real și mare** (breaking change pe API public, nu cosmetic), fără un beneficiu clar articulat până acum — dacă motivația reală e alta (de exemplu, o eventuală adopție oficială viitoare care ar schimba poziționarea „independent"), aceea ar fi o decizie de guvernanță separată, anterioară oricărei redenumiri tehnice, nu o simplă alegere de prefix.

Această recomandare nu închide întrebarea — dacă apare o motivație de guvernanță clară (de exemplu, o decizie explicită ca proiectul să devină/să fie asociat oficial unei entități publice), ADR-ul poate fi revizuit cu acea motivație documentată explicit, nu doar cu preferința de prefix.

## Alternative respinse (dacă se decide o redenumire)

### Redenumire imediată, fără perioadă de tranziție

Ar rupe orice consumator existent al pachetelor publicate fără avertisment — inacceptabil conform politicii de release deja publicate.

### Redenumire parțială (doar clase CSS, nu și tag-urile Web Components)

Ar crea o inconsecvență permanentă (`<sd-accordion class="ro-accordion">`), mai confuză decât starea actuală.

## Consecințe

### Dacă se păstrează `sd-` (recomandat)

- niciun cost tehnic sau de migrare;
- consecvență cu tot ce a fost publicat până acum (pachete, documentație, cele 59+ componente, pattern-urile publicate azi).

### Dacă se decide o redenumire viitoare

- necesită versiune majoră, changeset, migration guide, și o perioadă de suport dual (alias-uri pentru tag-urile vechi) — de estimat separat, ca proiect propriu, nu ca parte a altui epic;
- necesită actualizarea tuturor celor 230 de custom properties, 288 de clase și 12 tag-uri de Web Components, plus toată documentația și exemplele de cod asociate.

## Compatibilitate

Acest document nu introduce nicio schimbare de cod. Dacă o redenumire este aprobată ulterior, ea este prin definiție o schimbare incompatibilă (breaking change) și necesită versiune majoră, conform [`docs/governance/release-policy.md`](../../governance/release-policy.md).
