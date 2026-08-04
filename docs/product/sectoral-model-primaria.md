# Modelul sectorial „primărie"

## Obiectiv

Prima implementare de referință din Epic E ([#128](https://github.com/ciprian-rus/sistem.digital/issues/128)): o primărie demonstrativă, construită ca cod real (nu mockup), care arată cum se compun componentele, pattern-urile și principiile deja publicate într-o instituție completă — organizare, transparență decizională și un catalog de servicii locale.

Ordinea de livrare din Epic E plasează primăria prima (P1); școala, spitalul și ministerul/agenția centrală rămân P2, strict secvențiale, netratate de acest document.

## Ce există

| Pagină                                                                                       | Rol                                                                                                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`/exemple/primaria-model`](https://sistem.digital/exemple/primaria-model)                   | pagina instituțională: organizare (primar, consiliu local demonstrativ), hotărâri recente (transparență decizională), acces la catalogul de servicii                                                                                                          |
| [`/exemple/primaria-model/servicii`](https://sistem.digital/exemple/primaria-model/servicii) | catalogul de servicii locale, organizat după nevoie — implementarea reală a [pattern-ului „Identificarea serviciului potrivit"](https://github.com/ciprian-rus/sistem.digital/blob/main/apps/website/src/content/pages/pattern-identificarea-serviciului.mdx) |

## Date și conținut demonstrative

Numele „Primăria Model", componența consiliului local și hotărârile afișate sunt **complet fictive**, marcate explicit ca atare pe fiecare pagină (`Callout` de avertizare). Nu corespund niciunei instituții publice reale — conform scope-ului exclus din #129 („date reale ale unei primării existente").

## Catalogul de servicii — set reprezentativ, nu exhaustiv

Registrul (`apps/website/src/content/local-services.ts`) conține patru servicii:

1. **Solicită o adeverință de la primărie** — singurul serviciu funcțional end-to-end, reutilizează integral fluxul deja livrat la #20 ([`/exemple/adeverinta`](https://sistem.digital/exemple/adeverinta)), nu o reimplementare paralelă;
2. **Certificat de urbanism**, **Înscrierea la creșă/grădiniță**, **Plata impozitului pe clădiri și teren** — intrări de catalog marcate explicit „în pregătire" (etichetă `sd-tag--warning`), nu fluxuri simulate false.

Această alegere respectă direct riscul semnalat în #129: „o primărie reală are zeci de servicii; modelul trebuie limitat la un set demonstrativ reprezentativ, nu exhaustiv". Extinderea catalogului cu servicii noi complet funcționale rămâne un candidat pentru iterații ulterioare, nu scope-ul acestei livrări.

## Componente și pattern-uri reutilizate, nu duplicate

- `PublicHeader`/`PublicFooter`/`Breadcrumbs` — aceeași temă folosită de restul site-ului public, fără o identitate vizuală separată pentru „Primăria Model" (decizie deliberată — construirea unei mărci vizuale paralele ar fi scope creep, nesolicitat explicit de #129, care cere „arhitectură informațională specifică", nu identitate grafică nouă);
- `sd-card`/`sd-card-grid`/`sd-tag` — aceleași clase folosite de catalogul de componente (`/componente/catalog`), nu un sistem de carduri nou;
- pattern-ul [„Identificarea serviciului potrivit"](https://github.com/ciprian-rus/sistem.digital/blob/main/apps/website/src/content/pages/pattern-identificarea-serviciului.mdx) — implementat, nu doar documentat teoretic;
- fluxul de la #20 — reutilizat ca serviciu real în catalog, nu duplicat.

## Ce nu include acest model

- integrare cu sisteme reale de administrație locală (scope exclus explicit în #129);
- celelalte trei servicii ca fluxuri funcționale complete (rămân „în pregătire", candidați pentru iterații viitoare);
- o identitate vizuală distinctă pentru „Primăria Model" (folosește tema publică existentă a Sistem Digital);
- testare cu utilizatori reali sau cu funcționari dintr-o primărie reală — rămâne parte din cercetarea de teren mai largă (#40–42), netratată aici.

## Teste

`apps/website/tests/accessibility/primaria-model.spec.ts` verifică ambele pagini cu axe-core (WCAG 2.2 A/AA/AAA aplicabil), legătura dintre pagina instituțională și catalog, și distincția vizibilă între serviciul disponibil și cele „în pregătire".
