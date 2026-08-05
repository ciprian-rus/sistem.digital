# Niveluri de adopție instituțională

## Obiectiv

Programul de adopție pilot și ghidul de achiziție deja definite (#26) presupun o instituție care „folosește" Sistem Digital — dar adopția nu este binară. O instituție poate fi aliniată la principii fără să fi integrat încă un singur token sau componentă; alta poate folosi componente oficiale fără audit uman de accesibilitate. Fără niveluri explicite, verificabile, adopția rămâne o afirmație declarativă necontrolabilă — exact problema transversală „Adopție binară" identificată în auditul comparativ internațional (`docs/research/comparative-audit.md`).

Acest document definește patru niveluri, cu criterii publice, o schemă de raportare, badge-uri versionate, o politică de excepții și un proces de expirare — pregătind terenul pentru validatorul automat (#25), fără să-l implementeze.

## Cele patru niveluri

Progresia este monotonă: `verified` include criteriile `conformant`, care le include pe cele `compatible`, care le include pe cele `aligned`. Nu există sărituri — o instituție nu poate fi `conformant` fără să fi fost, mai întâi, `compatible`.

### `aligned` — aliniat la principii

Instituția urmează principiile Sistem Digital în conținut și decizii de produs, chiar dacă nu a integrat încă tokeni sau componente tehnic.

Criterii minime:

- publică cel puțin un serviciu care respectă regulile de content design din [`docs/content/content-style-guide.md`](../content/content-style-guide.md) (limbaj simplu, HTML-first, evitarea vocabularului birocratic inutil);
- nu contrazice explicit principiile de accesibilitate WCAG 2.2 AA în serviciile publicate;
- are un punct de contact desemnat pentru chestiuni legate de Sistem Digital.

Acesta este nivelul de intrare — criteriile rămân deliberat accesibile, ca să nu descurajeze adopția incipientă (riscul identificat explicit în #147).

### `compatible` — compatibil tehnic

Instituția a integrat tokeni de design și respectă structura semantică recomandată, fără să folosească neapărat componentele oficiale complete.

Criterii minime:

- folosește `@sistem-digital/tokens` (CSS, JSON sau TypeScript) ca sursă pentru culori, tipografie și spațiere, în loc de valori arbitrare;
- markup-ul serviciilor publice respectă HTML semantic (landmark-uri, ierarhie de titluri, formulare etichetate corect);
- temele respectă cerințele minime de contrast validate de `@sistem-digital/tokens`.

### `conformant` — conform

Instituția folosește componentele și pattern-urile oficiale Sistem Digital, nu doar tokenii.

Criterii minime:

- cel puțin un serviciu public folosește componente publicate din `@sistem-digital/components` (sau adaptoarele Web Components/React), nu reimplementări proprii echivalente;
- serviciul respectă cel puțin un pattern administrativ documentat (publicat la `/pattern-uri` pe site-ul public), acolo unde există unul aplicabil;
- versiunea Sistem Digital folosită este documentată public (vezi schema de raportare mai jos) și nu a depășit termenul de suport (`docs/governance/release-policy.md`).

### `verified` — verificat

Conformitatea a fost confirmată printr-un validator automat și un audit uman de accesibilitate, nu doar declarată.

Criterii minime:

- validatorul automat (#25, odată livrat) confirmă conformitatea tehnică fără excepții `critical` sau `serious` nedocumentate;
- există un audit manual de accesibilitate cu tehnologii asistive, cu rezultate publicate, similar cu matricea din `docs/accessibility/test-matrix.md`;
- certificarea nu a expirat (vezi „Expirarea certificării" mai jos).

## Schema de raportare

O instituție sau o aplicație raportează nivelul curent printr-o intrare cu următoarele câmpuri:

```ts
interface InstitutionalAdoptionReport {
  /** instituția responsabilă */
  institution: string;

  /** aplicația sau serviciul public evaluat */
  application: string;

  /** nivelul curent, dintre cele patru definite mai sus */
  currentLevel: 'aligned' | 'compatible' | 'conformant' | 'verified';

  /** data ultimei evaluări explicite */
  evaluationDate: string;

  /** dovezi publice ale nivelului curent — linkuri verificabile */
  evidence: string[];

  /** excepțiile active, conform politicii de mai jos */
  activeExceptions: string[];
}
```

Schema e compatibilă conceptual cu schema PNIDP propusă în [`docs/governance/pnidp-schema-draft.md`](pnidp-schema-draft.md) — vezi maparea explicită mai jos — dar nu depinde de ea; poate fi folosită independent, de exemplu într-un registru intern al programului pilot (#26, vezi [`docs/governance/pilot-program.md`](pilot-program.md) pentru schema propusă a registrului).

## Badge-uri versionate

Un „badge de conformitate" static, fără versiune, este exact anti-pattern-ul identificat în auditul comparativ („Accesibilitate declarativă" — afirmații fără dovezi verificabile). Badge-ul Sistem Digital leagă explicit nivelul de o versiune și o dată, la fel ca badge-urile de stare CI deja folosite în ecosistemul GitHub Actions:

```
[Sistem Digital: conformant · v0.1.0-alpha.3 · evaluat 2026-08-04]
```

Format propus: SVG generat, cu trei segmente text — nivel, versiune Sistem Digital, dată de evaluare. Un badge cu data de evaluare mai veche decât perioada de expirare (vezi mai jos) devine vizual distinct — culoare de avertizare, nu aceeași culoare ca un badge valid — pentru a nu induce în eroare un vizitator al paginii.

Găzduirea sau serviciul real de generare a badge-urilor rămâne infrastructură separată, netratată de acest document — aici se definește doar formatul și conținutul.

## Politica excepțiilor de conformitate

Nicio instituție nu va fi 100% conformă imediat. Politica de mai jos reia, la nivel de adopție instituțională, modelul deja existent pentru excepțiile de accesibilitate ([`docs/accessibility/exceptions.md`](../accessibility/exceptions.md)) — nu introduce reguli paralele.

O excepție poate fi analizată numai când:

- nu există o soluție disponibilă în termenul evaluării curente;
- remedierea imediată ar introduce un risc mai mare (de exemplu, întreruperea unui serviciu public activ);
- problema aparține unei dependențe externe instituției (furnizor, platformă comună), cu un plan de înlocuire sau actualizare.

Presiunea de timp sau costul obișnuit al implementării nu sunt justificări suficiente — la fel ca la excepțiile de accesibilitate.

Fiecare excepție are, obligatoriu:

- componenta, pattern-ul sau criteriul afectat;
- motivul pentru care nu poate fi rezolvată imediat;
- responsabilul instituțional;
- **un termen limită explicit** — o excepție fără termen nu este validă; excepțiile nu devin permanente implicit;
- planul de remediere asociat (vezi mai jos).

Expirarea unei excepții fără remediere redeschide automat evaluarea nivelului — instituția poate coborî de nivel dacă excepția expirată era o condiție a nivelului curent.

## Expirarea certificării

Un nivel evaluat o singură dată și niciodată revalidat devine fals cu timpul, pe măsură ce Sistem Digital evoluează. Certificarea unui nivel expiră la primul dintre următoarele două evenimente:

- **12 luni** de la data ultimei evaluări explicite (`evaluationDate`);
- publicarea unei noi **versiuni majore** a Sistem Digital, dacă instituția nu a migrat în termenul de suport al versiunii anterioare (`docs/governance/release-policy.md`).

La expirare:

- badge-ul devine vizual distinct (vezi mai sus) — nu dispare, dar nu se mai prezintă ca valid;
- nivelul raportat rămâne vizibil istoric, marcat explicit „expirat", nu ascuns;
- revalidarea necesită o nouă evaluare completă a criteriilor nivelului, nu doar o actualizare a datei.

Perioada de 12 luni e un compromis deliberat — suficient de lungă cât să nu creeze povară administrativă pentru instituții mici, suficient de scurtă cât să nu lase o certificare depășită să pară validă la nesfârșit.

## Planurile de remediere pentru neconformitate

Când o instituție nu atinge nivelul dorit, planul de remediere are un format standard, nu un text liber ad-hoc:

```ts
interface RemediationPlan {
  /** ce lipsește față de nivelul țintă, per criteriu */
  gaps: string[];

  /** pașii concreți planificați, în ordine */
  steps: string[];

  /** termenul limită pentru finalizare */
  deadline: string;

  /** responsabilul instituțional */
  responsible: string;

  /** legătura cu rezultatele validatorului, odată ce există (#25) */
  validatorReference?: string;
}
```

Planul se leagă explicit de rezultatele validatorului automat, odată livrat, și de excepțiile active aprobate conform politicii de mai sus — nu funcționează izolat de ele.

## Punct de legătură conceptual cu PNIDP

Integrarea reală cu PNIDP rămâne, explicit, backlog — vezi [`docs/governance/pnidp-schema-draft.md`](pnidp-schema-draft.md) și Epic J. Acest document descrie **doar** maparea conceptuală: ce câmp din schema de raportare de mai sus ar alimenta ce câmp din schema PNIDP propusă, dacă o astfel de integrare va fi construită vreodată.

| Câmp în `InstitutionalAdoptionReport` | Câmp echivalent în schema PNIDP propusă                           |
| ------------------------------------- | ----------------------------------------------------------------- |
| `institution`                         | `institution`                                                     |
| `application`                         | `application`                                                     |
| `currentLevel`                        | `adoptionLevel`                                                   |
| `evaluationDate`                      | `lastVerified`                                                    |
| `evidence`                            | folosit ca sursă pentru `accessibilityScore.source`, unde e cazul |
| `activeExceptions`                    | `exceptions`                                                      |

Nu există, în acest document, nicio implementare de API, sincronizare sau acces la sisteme PNIDP reale — doar maparea de mai sus, ca punct de plecare conceptual pentru o eventuală lucrare viitoare.

## Riscuri

Fără instituții pilot reale (programul #26 nu a început execuția), toate cele patru niveluri și procesele asociate rămân teoretice până la testare cu un caz real. Criteriile pot necesita ajustare după primul ciclu real de evaluare — acest document nu este considerat final, ci punctul de plecare pentru validatorul automat (#25) și programul pilot (#26).
