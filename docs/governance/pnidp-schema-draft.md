# Schema PNIDP — backlog și contract preliminar

> **Acesta este un document de backlog, nu o implementare.** Definește exclusiv o schemă de date preliminară pentru o eventuală inventariere prin PNIDP. Nu există, în acest document sau în codul asociat, niciun API, nicio integrare reală și niciun acces la sisteme PNIDP — nu există acces disponibil pentru verificare din acest mediu de lucru. Orice implementare viitoare trebuie validată cu proprietarii reali ai PNIDP înainte de a fi construită.
>
> **Actualizare:** la momentul acestui document, un PNIDP (Platforma Națională de Infrastructură Publică Digitală) real este în curs de legiferare, ca parte a unui pachet mai larg de digitalizare care include și Aplicația Mobilă Unică (AMU) — surse de presă indică o adoptare la Camera Deputaților încă din 10 iunie 2026 pentru componenta de infrastructură digitală, dar acest detaliu nu a fost verificat direct din acest mediu de lucru și nu trebuie tratat ca fapt confirmat. **Corecție:** o versiune anterioară a acestei note atribuia greșit acest pachet lui PL-x nr. 300/2026 — acel număr aparține de fapt SUDD (Sistemul Unic de Design Digital), o propunere distinctă a aceluiași inițiator; vezi [`docs/governance/pl-x-300-2026-alignment.md`](pl-x-300-2026-alignment.md) pentru mapajul corect. Denumirea exactă întâlnită în presă ("Platforma Națională de Infrastructură Publică Digitală") diferă ușor de cea folosită mai jos ("Interoperabilitate a Datelor Publice") — schema rămâne, pentru moment, o ipoteză proprie, nu o transcriere a specificației reale, care nu a fost încă verificată din acest mediu de lucru.

## Obiectiv

România nu are încă, spre deosebire de Polonia (vezi `docs/research/comparative-audit.md`), o cartografiere publică completă a registrelor și API-urilor guvernamentale. Acest document propune o schemă minimă, ipotetică, pentru câmpurile pe care o instituție care folosește Sistem Digital le-ar raporta către un registru central — pregătind terenul conceptual, fără să presupună o arhitectură tehnică reală.

## Schema propusă (14 câmpuri)

```ts
interface PnidpInventoryEntry {
  /** identificatorul aplicației sau site-ului public raportat */
  application: string;

  /** instituția responsabilă de aplicație */
  institution: string;

  /** serviciile publice furnizate prin această aplicație */
  servicesProvided: string[];

  /** versiunea Sistem Digital folosită (semver) */
  sistemDigitalVersion: string;

  /** nivelul de adopție instituțională curent — vezi adoption-levels.md */
  adoptionLevel: 'aligned' | 'compatible' | 'conformant' | 'verified';

  /** componentele sau pattern-urile neconforme identificate */
  nonConformingComponents: string[];

  /** scorul de accesibilitate curent, dacă există (sursă și metodologie explicite) */
  accessibilityScore?: { value: number; source: string; methodology: string };

  /** excepțiile active, conform politicii din adoption-levels.md */
  exceptions: string[];

  /** data ultimei verificări a acestei intrări */
  lastVerified: string;

  /** planul de remediere curent, dacă există neconformități */
  remediationPlan?: string;

  /** furnizorul tehnic responsabil de implementare/mentenanță */
  provider: string;

  /** tehnologiile folosite, dincolo de Sistem Digital */
  technologies: string[];

  /** dependențele tehnice externe relevante */
  dependencies: string[];

  /** termenul de suport curent al versiunii Sistem Digital folosite */
  supportEndDate: string;
}
```

## Relația cu alte scheme

- `adoptionLevel` corespunde exact nivelurilor definite în [`docs/governance/adoption-levels.md`](adoption-levels.md) — vezi maparea explicită din secțiunea „Punct de legătură conceptual cu PNIDP" a acelui document;
- `sistemDigitalVersion` și `nonConformingComponents` se leagă conceptual de schema de metadate a componentelor ([`docs/product/component-metadata-schema.md`](../product/component-metadata-schema.md)) — o componentă „neconformă" ar fi, în acest model ipotetic, o componentă aflată sub starea `candidate` sau afectată de o excepție activă;
- `exceptions` folosește același format de referință (issue public) ca politica de excepții din `adoption-levels.md`, nu un format paralel.

## Ce nu include acest document

- orice API, integrare sau sincronizare de date reală;
- accesul sau validarea cu sisteme PNIDP reale;
- un formular sau flux de raportare (rămâne scope-ul unui viitor #25, validatorul);
- o decizie despre cine operează sau găzduiește un eventual registru.

## Riscuri

Fără specificația reală PNIDP, această schemă este o ipoteză rezonabilă, construită prin analogie cu schemele interne deja existente (maturitate, adopție) — nu o confirmare. Orice implementare viitoare trebuie să înceapă cu validarea acestei ipoteze împreună cu proprietarii reali ai PNIDP, nu cu construcția directă a unui API pe baza ei.
