# Modelul sectorial „spital"

## Obiectiv

A treia implementare de referință din Epic E ([#128](https://github.com/ciprian-rus/sistem.digital/issues/128)), după primărie și școală: o unitate sanitară demonstrativă, construită ca cod real (nu mockup), care arată cum se compun componentele, pattern-urile și principiile deja publicate într-un context clinic — organizare, informații pentru pacienți și un catalog de servicii.

Ordinea de livrare din Epic E plasează spitalul P2, alături de minister/agenție centrală — livrare strict secvențială, alegerea acestui model ca al treilea a fost o decizie explicită, netratată aici.

## Ce există

| Pagină                                                                                        | Rol                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`/exemple/spital-model`](https://sistem.digital/exemple/spital-model)                          | pagina instituțională: organizare (conducere medicală demonstrativă), secții și program, acces la catalogul de servicii                                                                       |
| [`/exemple/spital-model/servicii`](https://sistem.digital/exemple/spital-model/servicii)        | catalogul de servicii pentru pacienți, organizat după nevoie — a treia implementare reală a [pattern-ului „Identificarea serviciului potrivit"](https://github.com/ciprian-rus/sistem.digital/blob/main/apps/website/src/content/pages/pattern-identificarea-serviciului.mdx) |
| [`/exemple/cerere-document-medical`](https://sistem.digital/exemple/cerere-document-medical)    | serviciul tranzacțional funcțional end-to-end: solicitarea unei copii a unui document medical (bilet de ieșire sau scrisoare medicală)                                                        |

## Ton și încredere în context clinic

Issue-ul #131 cere explicit ca „conținutul să respecte principiile de încredere și claritate deja documentate pentru context clinic". Sursa acestor principii este secțiunea [NHS Design System](https://github.com/ciprian-rus/sistem.digital/blob/main/docs/research/comparative-audit.md#nhs-design-system) din auditul comparativ, confirmată direct din sursă: NHS pune accent pe „oameni, rezultate, incluziune, context, încredere, testarea ipotezelor, iterație, simplitate, deschidere și sustenabilitate", iar matricea comparativă notează explicit atenția NHS la „context clinic".

Aplicarea concretă în acest model:

- pagina instituțională citează explicit acest principiu, printr-un `Callout` dedicat, nu doar implicit prin ton;
- programul secțiilor este afișat direct ca tabel, nu ascuns într-un document descărcabil — reduce încărcarea cognitivă a unei căutări suplimentare;
- fluxul de cerere a documentului medical reutilizează exact aceleași mecanisme de încredere deja validate la adeverință și înscrierea școlară (etichete de proveniență la revizuire, declarație explicită, stare de eroare clară, fără jargon medical inutil în interfață).

## Date și conținut demonstrative

Numele „Spitalul Model", conducerea și secțiile afișate sunt **complet fictive**, marcate explicit ca atare pe fiecare pagină (`Callout` de avertizare). Nu corespund niciunei unități sanitare reale — conform scope-ului exclus din #131 („date medicale reale").

Riscul semnalat explicit în #131 („date medicale demonstrative trebuie să fie clar fictive, fără să semene cu date reale identificabile") a fost tratat prin a nu include nicio dată clinică propriu-zisă (diagnostice, rezultate, tratamente) nicăieri în model — doar tipuri de documente administrative („bilet de ieșire", „scrisoare medicală"), fără conținut medical simulat.

## Catalogul de servicii — set reprezentativ, nu exhaustiv

Registrul (`apps/website/src/content/hospital-services.ts`) conține patru servicii:

1. **Solicită o copie a unui document medical** — singurul serviciu funcțional end-to-end ([`/exemple/cerere-document-medical`](https://sistem.digital/exemple/cerere-document-medical));
2. **Programarea la o consultație**, **Copia rezultatelor de laborator**, **Adeverința medicală pentru concediu** — intrări de catalog marcate explicit „în pregătire" (etichetă `sd-tag--warning`), nu fluxuri simulate false.

Această alegere respectă direct riscul semnalat în #131, prin analogie cu #129 și #130: catalogul e limitat la un set demonstrativ reprezentativ, nu exhaustiv. Programarea la o consultație a rămas explicit „în pregătire" — un calendar de disponibilitate real este un paradigmă de interfață diferită de fluxul liniar de cerere de document, care ar merita propriul pattern, nu o extindere grăbită a acestui model.

## Componente și pattern-uri reutilizate, nu duplicate

- `PublicHeader`/`PublicFooter`/`Breadcrumbs` — aceeași temă folosită de restul site-ului public, inclusiv de modelele „primărie" și „școală", fără o identitate vizuală separată pentru „Spitalul Model";
- `sd-card`/`sd-card-grid`/`sd-tag` — aceleași clase folosite de catalogul de componente și de catalogul de servicii al primăriei și al școlii;
- pattern-ul [„Identificarea serviciului potrivit"](https://github.com/ciprian-rus/sistem.digital/blob/main/apps/website/src/content/pages/pattern-identificarea-serviciului.mdx) — a treia implementare reală, nu doar documentată teoretic;
- **`ReferenceService`** (`apps/website/src/components/reference-service.tsx`), deja parametrizată la modelul „școală" — a treia configurație (`cerereDocumentMedicalConfig`), fără nicio modificare a componentei în sine.

## Ce nu include acest model

- integrare cu sisteme reale de sănătate (de exemplu SIUI/PIAS — scope exclus explicit în #131);
- celelalte trei servicii ca fluxuri funcționale complete, inclusiv programarea la o consultație, care are nevoie de un pattern de calendar/disponibilitate propriu, netratat aici;
- o identitate vizuală distinctă pentru „Spitalul Model" (folosește tema publică existentă a Sistem Digital);
- o variantă server-rendered fără JavaScript pentru cererea de document medical (aceeași lipsă cunoscută, notată explicit, ca la modelul „școală");
- testare cu utilizatori reali sau cu personal dintr-o unitate sanitară reală — rămâne parte din cercetarea de teren mai largă (#40–42), netratată aici.

## Teste

`apps/website/tests/accessibility/spital-model.spec.ts` verifică toate cele trei pagini cu axe-core (WCAG 2.2 A/AA/AAA aplicabil), legătura dintre pagina instituțională și catalog, distincția vizibilă între serviciul disponibil și cele „în pregătire", și parcurgerea completă end-to-end a cererii de document medical, până la confirmare.
