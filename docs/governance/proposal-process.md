# Fluxul public de propuneri, RFC-uri și vot consultativ

## Obiectiv

#24 cere mecanismul prin care comunitatea propune și prioritizează idei, cu decizii motivate public, fără ca votul să înlocuiască judecata de calitate și coerență. Acest document formalizează fluxul de admitere „Idee → discuție → dovada nevoii → propunere" deja referențiat (dar niciodată detaliat separat) de [`docs/governance/component-maturity-model.md`](component-maturity-model.md), plus regulile transversale cerute explicit de #24: praguri pentru RFC, vot consultativ, conflicte de interes, consolidarea duplicatelor, feedback obligatoriu, registrul public de decizii și căile de contestare.

## Relația cu modelul de maturitate a componentelor

Diviziune explicită de scop, ca să nu existe suprapunere:

- **acest document** acoperă tot ce se întâmplă **înainte** ca o propunere să fie admisă (idee → discuție → dovada nevoii → propunere) și ciclul de decizie al unui **RFC** (care nu produce neapărat o componentă, deci nu intră în modelul de maturitate);
- [`component-maturity-model.md`](component-maturity-model.md) acoperă tot ce se întâmplă **după** ce o propunere de componentă e admisă: stările `proposal → experimental → candidate → stable → deprecated → retired`, cu criterii verificabile pentru fiecare.

O propunere de componentă admisă prin fluxul de mai jos intră direct în starea `proposal` a modelului de maturitate — pașii aceia nu sunt repetați aici.

## Fluxul de admitere

1. **Idee** — o observație sau o nevoie neformalizată. Până la activarea GitHub Discussions (#23), se discută într-un comentariu pe un issue existent sau într-un issue nou, fără template formal.
2. **Discuție** — ideea capătă vizibilitate; se clarifică problema reală, nu doar soluția presupusă.
3. **Dovada nevoii** — autorul strânge dovezi concrete: cercetare existentă (`docs/research/`), exemple din servicii publice reale, sau situații repetate documentate. Fără acest pas, propunerea formală nu poate fi deschisă — pragul minim explicit cerut de `component-maturity-model.md` pentru starea `proposal`.
4. **Propunere formală** — vezi pragul de mai jos pentru ce template se folosește.

## Pragul: ce formă de propunere?

| Natura schimbării                                                    | Formă                                                                           | Rezultat dacă e admisă                                       |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| întrebare, idee incipientă, fără soluție conturată                   | Discussions (după #23) sau comentariu pe issue existent                         | rămâne discuție, poate escalada la propunere formală         |
| componentă sau pattern nou, extindere fără schimbare arhitecturală   | [`component-proposal.yml`](../../.github/ISSUE_TEMPLATE/component-proposal.yml) | intră în starea `proposal` din `component-maturity-model.md` |
| schimbare arhitecturală, de guvernanță, sau incompatibilă (breaking) | [`rfc.yml`](../../.github/ISSUE_TEMPLATE/rfc.yml)                               | intră în ciclul de decizie RFC descris mai jos               |

Pragul RFC nu e opțional pentru cele trei categorii enumerate în `rfc.yml` — o schimbare incompatibilă deschisă direct ca PR, fără RFC anterior, poate fi respinsă din acest motiv, indiferent de calitatea tehnică.

## Ciclul de decizie al unui RFC

Spre deosebire de o componentă, un RFC nu are stări de maturitate tehnică — are o decizie:

```text
propunere → (opțional) dovadă tehnică sau prototip → decizie → urmărire
```

Decizia e una dintre patru, întotdeauna cu motivare publică, postată ca și comentariu pe issue-ul RFC, niciodată doar ca etichetă:

- **acceptat** — implementarea e urmărită printr-un issue nou sau existent, referențiat explicit din RFC;
- **acceptat parțial** — se specifică exact ce parte e acceptată și ce parte rămâne respinsă sau amânată, cu motiv separat pentru fiecare;
- **amânat** — nu e respins, dar nu e prioritar acum; motivul amânării și condiția care ar redeschide discuția sunt explicite (de exemplu, „amânat până la #22");
- **respins** — motivul respingerii e specific propunerii, nu generic („nu se potrivește direcției actuale" fără altă explicație nu e o motivare validă).

## Votul consultativ

Reacțiile 👍 pe issue-ul de propunere indică interesul comunitar și influențează **prioritatea** unei propuneri deja admise, nu decizia de acceptare — cerință explicită #24: votul nu înlocuiește evaluarea de calitate, coerență și accesibilitate. Nu există un prag numeric obligatoriu de voturi pentru acceptare sau respingere. Dacă o decizie contrazice un vot puternic (orientativ: peste 15 reacții 👍), motivarea publică a deciziei explică punctual de ce votul nu a fost determinant.

## Conflicte de interese

Ambele template-uri de propunere ([`rfc.yml`](../../.github/ISSUE_TEMPLATE/rfc.yml), [`component-proposal.yml`](../../.github/ISSUE_TEMPLATE/component-proposal.yml)) includ un câmp opțional „Conflicte de interes", unde autorul declară orice interes direct (angajator, furnizor, contract) legat de propunere. Câmpul e opțional la completare — nu poate fi impus tehnic — dar absența unei declarații, dacă un conflict e ulterior descoperit, e motiv suficient pentru redeschiderea deciziei.

## Propuneri duplicate

O propunere identificată ca duplicat se închide cu `state_reason: not_planned` și un comentariu care leagă explicit la propunerea originală (`duplicate of #N`). Discuția se consolidează pe issue-ul original — comentariile relevante din duplicat sunt rezumate acolo de un maintainer, nu pierdute odată cu închiderea.

## Feedback obligatoriu către autor

Fiecare tranziție de stare (dovadă acceptată, propunere admisă, decizie RFC, respingere, marcare drept duplicat) e însoțită de un comentariu public adresat direct autorului — nu doar o schimbare de etichetă sau stare fără explicație. O propunere nu rămâne niciodată într-o stare schimbată fără ca autorul să fi fost notificat explicit de ce.

## Registrul public de decizii

Toate deciziile RFC (acceptat, acceptat parțial, amânat, respins) sunt înregistrate în [`docs/governance/decision-registry.md`](decision-registry.md), cu link către issue-ul original, data deciziei și rezumatul motivării. Registrul e append-only — o decizie ulterioară care schimbă una anterioară (de exemplu, un „amânat" care devine „acceptat") adaugă o intrare nouă, nu editează retroactiv intrarea veche.

## Căile de contestare și reluare

- o decizie **respinsă** sau **amânată** poate fi contestată doar cu dovezi calitativ noi față de cele evaluate inițial — dezacordul repetat cu aceeași informație nu redeschide automat decizia;
- contestația se deschide ca un comentariu pe issue-ul RFC original, dacă e încă deschis, sau ca un issue nou care leagă explicit la RFC-ul respins, cu dovezile noi incluse;
- fără dovezi noi, o propunere respinsă poate fi redeschisă spre reevaluare nu mai devreme de **90 de zile calendaristice** de la decizie — același interval minim folosit deja pentru `deprecated → retired` în `component-maturity-model.md`, pentru consecvență;
- o decizie **acceptată** nu are cale de „contestare" separată — implementarea ei urmează fluxul normal de PR și review; dacă apar probleme fundamentale în implementare, acestea se tratează ca orice alt defect sau regresie, nu ca o redeschidere a deciziei RFC.

## Testare: două propuneri pilot

Criteriul de acceptare #24 cere testarea procesului pe minimum două propuneri reale, nu simulate. Am folosit două goluri deja identificate, dar nedecise explicit, în documentația de guvernanță existentă:

1. **[#202](https://github.com/ciprian-rus/sistem.digital/issues/202)** — șablon YAML/JSON executabil pentru pachetul de achiziție, candidat menționat în `docs/governance/procurement-package.md` („Ce nu include acest document"). Decizie: **amânat** — vezi registrul pentru motivare.
2. **[#203](https://github.com/ciprian-rus/sistem.digital/issues/203)** — regulă de validator automată pentru clauza anti-lock-in (clauza 13), candidat menționat în același document ca scop posibil pentru #25. Decizie: **acceptat parțial** — vezi registrul pentru motivare.

Ambele decizii sunt înregistrate integral în [`docs/governance/decision-registry.md`](decision-registry.md).

## Riscuri

Pragurile, intervalul de 90 de zile și formatul deciziei sunt netestate la scară — cele două propuneri pilot au fost decise de un singur maintainer, nu de o comunitate activă (care nu există încă, #23). Procesul poate necesita ajustare odată ce apar mai mulți contribuitori reali și un volum mai mare de propuneri concurente.
