# Schema preliminară de metadate pentru componente

## Obiectiv

Definește câmpurile minime necesare pentru a susține [modelul de maturitate pe șase stări](../governance/component-maturity-model.md), fără să migreze retroactiv componentele existente și fără să înlocuiască schema curentă a catalogului versionat (`apps/website/src/content/catalog-data.mjs`, documentată în [`docs/product/versioned-catalog.md`](versioned-catalog.md)).

Schema este **preliminară**: stabilește contractul de date, nu implementarea. Validarea automată la build (verificarea că fiecare componentă publicată are metadate complete și consistente) este urmărită separat, ca issue distinct în Epic A.

## Domeniu

Această schemă acoperă exclusiv metadatele de **maturitate**. Metadatele de **disponibilitate pe canale tehnice** (Figma, HTML/CSS, Web Components, React, teste automate, testare cu tastatura, testare cu cititoare de ecran) formează o schemă separată, urmărită de Epic B („Matricea publică design–cod"). Cele două scheme sunt complementare și vor fi compuse într-o singură pagină de catalog per componentă, dar sunt definite și validate independent, ca să poată evolua în ritmuri diferite.

## Câmpuri propuse

```ts
interface ComponentMaturityMetadata {
  /** identificatorul componentei, identic cu cel din catalogul versionat */
  id: string;

  /** una dintre cele șase stări definite în component-maturity-model.md */
  state: 'proposal' | 'experimental' | 'candidate' | 'stable' | 'deprecated' | 'retired';

  /** persoana sau echipa responsabilă de componentă în starea curentă */
  owner: string;

  /** data (ISO 8601) la care componenta a intrat în starea curentă */
  since: string;

  /** data (ISO 8601) ultimei evaluări explicite a stării, chiar dacă starea nu s-a schimbat */
  lastReviewed: string;

  /** dovezi publice ale stării curente: linkuri către audituri, teste, cercetare, utilizări reale */
  evidence: string[];

  /** obligatoriu pentru „deprecated" și „retired"; motivul documentat al deprecierii/retragerii */
  deprecationReason?: string;

  /** opțional; identificatorul componentei recomandate ca înlocuitor */
  replacedBy?: string;

  /** istoricul tranzițiilor: fiecare schimbare de stare, cu dată, owner și motiv */
  transitions: Array<{
    from: string;
    to: string;
    date: string;
    approvedBy: string;
    reason: string;
  }>;
}
```

## Compatibilitate cu structura actuală a catalogului

Câmpul `state` din această schemă **nu înlocuiește** câmpul `status` (`alpha` / `stable` / `deprecated`) folosit azi de `catalog-data.mjs` și verificat de `scripts/check-catalog.mjs`. Relația este de rafinare, nu de substituție:

- `catalog-data.mjs.status` rămâne sursa de adevăr pentru **versionare și distribuție** (ce se publică în pachet, sub ce canal);
- `ComponentMaturityMetadata.state` adaugă **granularitate de guvernanță** peste stările `alpha`/`stable`/`deprecated` deja publicate, conform hărții din `component-maturity-model.md`.

O componentă poate avea `status: 'alpha'` în catalog și `state: 'candidate'` în metadatele de maturitate — cele două nu intră în conflict, pentru că răspund la întrebări diferite („ce pot instala azi?" vs. „cât de matură este guvernanța acestei componente?").

## Ce nu include acest PR

- validarea automată la build a acestor câmpuri (issue distinct, Epic A);
- popularea retroactivă a metadatelor pentru cele 59 de componente publicate azi (issue distinct, „migrarea graduală", Epic C);
- afișarea stării în catalog (issue distinct, Epic A);
- schema matricei design–cod (Epic B, document separat).

## Note de proiectare

- `evidence` este un array de linkuri, nu text liber — fiecare intrare trebuie să poată fi verificată independent (issue, pull request, raport de test, pagină de cercetare).
- `transitions` este append-only: nu se editează un istoric, doar se adaugă o nouă tranziție.
- Câmpurile `owner` și `lastReviewed` sunt obligatorii de la starea `candidate` în sus; pentru `proposal`/`experimental`, absența unui owner activ este ea însăși un semnal (nu o eroare de schemă).
