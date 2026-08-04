# Modelul sectorial „școală"

## Obiectiv

A doua implementare de referință din Epic E ([#128](https://github.com/ciprian-rus/sistem.digital/issues/128)), după primărie: o școală demonstrativă, construită ca cod real (nu mockup), care arată cum se compun componentele, pattern-urile și principiile deja publicate într-o instituție de învățământ — organizare, anunțuri și un catalog de servicii pentru părinți și elevi.

Ordinea de livrare din Epic E plasează școala P2, alături de spital și minister/agenție centrală — livrare strict secvențială, alegerea acestui model ca al doilea a fost o decizie explicită, netratată aici.

## Ce există

| Pagină                                                                                     | Rol                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`/exemple/scoala-model`](https://sistem.digital/exemple/scoala-model)                       | pagina instituțională: organizare (conducere, consiliu profesoral demonstrativ), anunțuri recente, acces la catalogul de servicii                                                        |
| [`/exemple/scoala-model/servicii`](https://sistem.digital/exemple/scoala-model/servicii)     | catalogul de servicii pentru părinți și elevi, organizat după nevoie — a doua implementare reală a [pattern-ului „Identificarea serviciului potrivit"](https://github.com/ciprian-rus/sistem.digital/blob/main/apps/website/src/content/pages/pattern-identificarea-serviciului.mdx) |
| [`/exemple/inscriere-scoala`](https://sistem.digital/exemple/inscriere-scoala)               | serviciul tranzacțional funcțional end-to-end: cererea de înscriere a unui copil la școală                                                                                               |

## Date și conținut demonstrative

Numele „Școala Model", conducerea, consiliul profesoral și anunțurile afișate sunt **complet fictive**, marcate explicit ca atare pe fiecare pagină (`Callout` de avertizare). Nu corespund niciunei instituții de învățământ reale — conform scope-ului exclus din #130 („date reale ale unei școli existente").

Niciun nume sau dată din model nu aparține unui minor: conducerea și consiliul profesoral sunt adulți (personal demonstrativ, ca la consiliul local al primăriei), iar în fluxul de înscriere numele și CNP-ul „copilului" sunt introduse chiar de utilizatorul care testează demo-ul, nu preluate dintr-o sursă reală — riscul semnalat explicit în #130 („minori ca beneficiari indirecți cere atenție suplimentară la content design și la protecția datelor") a fost tratat prin a nu stoca, afișa sau folosi ca exemplu implicit nicio dată reală despre un minor.

## Catalogul de servicii — set reprezentativ, nu exhaustiv

Registrul (`apps/website/src/content/school-services.ts`) conține patru servicii:

1. **Înscrie copilul la școală** — singurul serviciu funcțional end-to-end ([`/exemple/inscriere-scoala`](https://sistem.digital/exemple/inscriere-scoala));
2. **Situația școlară**, **Transferul școlar**, **Duplicatul foii matricole** — intrări de catalog marcate explicit „în pregătire" (etichetă `sd-tag--warning`), nu fluxuri simulate false.

Această alegere respectă direct riscul semnalat în #130, prin analogie cu #129: catalogul e limitat la un set demonstrativ reprezentativ, nu exhaustiv.

## Componente și pattern-uri reutilizate, nu duplicate

- `PublicHeader`/`PublicFooter`/`Breadcrumbs` — aceeași temă folosită de restul site-ului public, inclusiv de modelul „primărie", fără o identitate vizuală separată pentru „Școala Model";
- `sd-card`/`sd-card-grid`/`sd-tag` — aceleași clase folosite de catalogul de componente și de catalogul de servicii al primăriei;
- pattern-ul [„Identificarea serviciului potrivit"](https://github.com/ciprian-rus/sistem.digital/blob/main/apps/website/src/content/pages/pattern-identificarea-serviciului.mdx) — a doua implementare reală, nu doar documentată teoretic;
- **`ReferenceService`** (`apps/website/src/components/reference-service.tsx`) — componenta care implementează fluxul demonstrativ al adeverinței (#20) a fost parametrizată printr-un `config` prop (`ReferenceServiceConfig`), pentru a permite reutilizarea integrală a mașinii de stări (persistență locală, revizuire cu proveniență, simulare de eroare, `aria-live`) pentru cererea de înscriere la școală, fără o reimplementare paralelă. Pagina `/exemple/adeverinta` continuă să folosească exact același text ca înainte, prin configurația implicită (`adeverintaReferenceServiceConfig`).

## Ce nu include acest model

- integrare cu sisteme educaționale reale (de exemplu SIIIR — scope exclus explicit în #130);
- celelalte trei servicii ca fluxuri funcționale complete (rămân „în pregătire", candidați pentru iterații viitoare);
- o identitate vizuală distinctă pentru „Școala Model" (folosește tema publică existentă a Sistem Digital);
- o variantă server-rendered fără JavaScript pentru cererea de înscriere (spre deosebire de adeverință, care are `/exemple/adeverinta/fara-javascript`) — rămâne candidat pentru o iterație ulterioară, nu ascuns, ci notat explicit aici ca lipsă cunoscută;
- testare cu utilizatori reali sau cu personal dintr-o școală reală — rămâne parte din cercetarea de teren mai largă (#40–42), netratată aici.

## Teste

`apps/website/tests/accessibility/scoala-model.spec.ts` verifică toate cele trei pagini cu axe-core (WCAG 2.2 A/AA/AAA aplicabil), legătura dintre pagina instituțională și catalog, distincția vizibilă între serviciul disponibil și cele „în pregătire", și parcurgerea completă end-to-end a cererii de înscriere, până la confirmare.
