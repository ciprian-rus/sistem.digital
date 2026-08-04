# Modelul sectorial „minister"

## Obiectiv

A patra și ultima implementare de referință din Epic E ([#128](https://github.com/ciprian-rus/sistem.digital/issues/128)), după primărie, școală și spital: un minister sau o agenție centrală demonstrativă, construită ca cod real (nu mockup), cu nevoi diferite de instituțiile locale — publicare de acte normative, consultare publică, transparență decizională la nivel central.

Cu acest model, toate cele patru modele sectoriale identificate în #128 sunt livrate.

## Ce există

| Pagină                                                                                        | Rol                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`/exemple/minister-model`](https://sistem.digital/exemple/minister-model)                      | pagina instituțională: organizare (conducere demonstrativă), acte normative recente, consultări publice active, acces la catalogul de servicii                                              |
| [`/exemple/minister-model/servicii`](https://sistem.digital/exemple/minister-model/servicii)    | catalogul de servicii pentru cetățeni și instituții, organizat după nevoie — a patra implementare reală a [pattern-ului „Identificarea serviciului potrivit"](https://github.com/ciprian-rus/sistem.digital/blob/main/apps/website/src/content/pages/pattern-identificarea-serviciului.mdx) |
| [`/exemple/cerere-informatii-publice`](https://sistem.digital/exemple/cerere-informatii-publice) | serviciul tranzacțional funcțional end-to-end: solicitarea de informații de interes public, conform Legii 544/2001                                                                          |

## Acuratețea legală a serviciului ales

Issue-ul #132 dă ca exemplu „o consultare publică sau o cerere de informații de interes public". A doua variantă a fost aleasă, pentru că se potrivește exact formei fluxului deja validat de trei ori (adeverință, înscriere școlară, document medical): eligibilitate → date → documente → livrare → verificare → confirmare.

Diferența esențială față de celelalte trei servicii: **o cerere de informații publice, conform Legii 544/2001, nu necesită CNP sau act de identitate** — orice persoană poate depune o cerere, fără să justifice interesul, iar instituția are nevoie doar de o modalitate de a trimite răspunsul. Reutilizarea directă a câmpului „CNP demonstrativ" ar fi fost incorectă factual — ar fi sugerat o cerință legală inexistentă.

Pentru a evita această inexactitate, `ReferenceServiceConfig` a primit un câmp nou, `personalIdRequired` (implicit `true`, neschimbat pentru celelalte trei configurații). Când e `false`, câmpul devine text liber, relabelat „Adresă de contact (e-mail sau adresă poștală)", fără validarea de 13 cifre și fără mascarea specifică unui CNP la ecranul de verificare. Eligibilitatea reflectă distincția legală reală: cererea trebuie să vizeze informații publice, nu date cu caracter personal sau informații clasificate (excepțiile prevăzute explicit de Legea 544/2001).

## Date și conținut demonstrative

Numele „Ministerul Model", conducerea, actele normative și consultările publice afișate sunt **complet fictive**, marcate explicit ca atare (`Callout` de avertizare). Nu corespund niciunei instituții centrale reale — conform scope-ului exclus din #132 („date reale ale unei instituții centrale existente").

## Catalogul de servicii — set reprezentativ, nu exhaustiv

Registrul (`apps/website/src/content/ministry-services.ts`) conține patru servicii:

1. **Solicită informații de interes public** — singurul serviciu funcțional end-to-end ([`/exemple/cerere-informatii-publice`](https://sistem.digital/exemple/cerere-informatii-publice));
2. **Comentează un proiect de act normativ**, **Verifică stadiul unei petiții**, **Solicită o audiență la conducere** — intrări de catalog marcate explicit „în pregătire" (etichetă `sd-tag--warning`), nu fluxuri simulate false.

Riscul semnalat explicit în #132 („instituțiile centrale au procese mai eterogene decât primăriile — modelul trebuie să rămână reprezentativ, nu exhaustiv") a fost tratat prin limitarea deliberată la patru servicii, aceeași disciplină de scope aplicată la celelalte trei modele.

## Componente și pattern-uri reutilizate, nu duplicate

- `PublicHeader`/`PublicFooter`/`Breadcrumbs` — aceeași temă folosită de restul site-ului public, inclusiv de celelalte trei modele sectoriale, fără o identitate vizuală separată pentru „Ministerul Model";
- `sd-card`/`sd-card-grid`/`sd-tag` — aceleași clase folosite de catalogul de componente și de celelalte trei catalog de servicii;
- pattern-ul [„Identificarea serviciului potrivit"](https://github.com/ciprian-rus/sistem.digital/blob/main/apps/website/src/content/pages/pattern-identificarea-serviciului.mdx) — a patra implementare reală, nu doar documentată teoretic;
- **`ReferenceService`** (`apps/website/src/components/reference-service.tsx`) — a patra configurație (`cerereInformatiiPubliceConfig`), care a extins componenta cu suportul pentru `personalIdRequired: false`, fără să afecteze comportamentul celorlalte trei configurații existente (verificat manual: titlurile ecranelor de start ale adeverinței, înscrierii școlare și documentului medical rămân neschimbate).

## Ce nu include acest model

- integrare cu sisteme reale ale unei instituții centrale (scope exclus explicit în #132);
- celelalte trei servicii ca fluxuri funcționale complete (rămân „în pregătire", candidați pentru iterații viitoare);
- o identitate vizuală distinctă pentru „Ministerul Model" (folosește tema publică existentă a Sistem Digital);
- o variantă server-rendered fără JavaScript pentru cererea de informații publice (aceeași lipsă cunoscută, notată explicit, ca la modelele „școală" și „spital");
- testare cu utilizatori reali sau cu personal dintr-o instituție centrală reală — rămâne parte din cercetarea de teren mai largă (#40–42), netratată aici.

## Teste

`apps/website/tests/accessibility/minister-model.spec.ts` verifică toate cele trei pagini cu axe-core (WCAG 2.2 A/AA/AAA aplicabil), legătura dintre pagina instituțională și catalog, distincția vizibilă între serviciul disponibil și cele „în pregătire", și parcurgerea completă end-to-end a cererii de informații publice, confirmând explicit că fluxul nu solicită un CNP.
