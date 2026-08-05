# Sincronizarea Figma–tokeni–cod

## Scop și limită

Acest document definește **procesul** prin care Sistem Digital garantează că
Figma și codul rămân sincronizate verificabil, conform Epic G
([#145](https://github.com/ciprian-rus/sistem.digital/issues/145)). Este
livrabilul de proces al epic-ului; celelalte două piese ale lui sunt deja
livrate separat:

- **identificatorul comun** între componente Figma și cod — decis și
  documentat în [`design-code-matrix-schema.md`](../product/design-code-matrix-schema.md#identificator-comun-între-figma-și-cod)
  ([#110](https://github.com/ciprian-rus/sistem.digital/issues/110), închis);
- **mapping-ul token→Figma** (colecții, moduri, tipuri de variabile,
  denumire) — documentat exhaustiv în
  [`figma-token-mapping.md`](../product/figma-token-mapping.md).

Acest document nu repetă niciunul dintre cele două. Acoperă exclusiv ce
lipsea din Epic G: planul tehnic de verificare a deviațiilor, regulile de
publicare specifice sincronizării și politica de depreciere la nivel de
token individual.

**Ce nu include acest document:**

- construirea efectivă a kitului Figma — rămâne scope-ul
  [#22](https://github.com/ciprian-rus/sistem.digital/issues/22);
- implementarea scriptului de verificare a deviațiilor descris mai jos —
  necesită un fișier Figma real de citit prin API, deci așteaptă #22;
- orice afirmație că sincronizarea a fost deja verificată automat vreodată
  — nu a existat, până la acest document, niciun mecanism, automat sau
  manual cu evidență publicată, de verificare a sincronizării.

## Principiul care nu se negociază

DTCG (`packages/tokens/src/tokens.dtcg.json` + `themes.json`) este sursa
canonică. Variabilele Figma sunt **generate din** ea, nu invers. Orice
deviație constatată — o valoare diferită, o variabilă lipsă într-o parte
sau alta — se rezolvă **întotdeauna în favoarea DTCG**: se corectează Figma,
nu codul. Acest principiu e deja enunțat în `figma-token-mapping.md`; îl
repetăm aici pentru că planul de verificare de mai jos depinde de el —
verificarea produce constatări, nu decizii, iar decizia e mereu aceeași.

## Planul tehnic de verificare a deviațiilor

Neimplementabil și netestabil înainte ca #22 să publice un fișier Figma
real — Figma Variables REST API nu poate fi apelat împotriva unui kit care
nu există. Planul de mai jos elimină ambiguitatea de proiectare, astfel
încât implementarea, odată deblocată, să fie mecanică, nu o decizie de
arhitectură luată sub presiune.

### Sursa datelor Figma

Figma expune colecțiile de variabile local prin REST API
(`GET /v1/files/:file_key/variables/local`), autentificat cu un token
read-only scopat la fișierul kitului. Cheia fișierului și tokenul se rețin
ca secrete CI (`FIGMA_FILE_KEY`, `FIGMA_TOKEN`), niciodată în cod — la fel
ca orice alt secret al monorepo-ului.

### Script propus: `packages/tokens/scripts/check-figma-sync.mjs`

1. citește variabilele curente din API-ul Figma (colecții `core`,
   `semantic`, `component`, `accent`, cu toate modurile lor);
2. reconstruiește, pentru fiecare variabilă, calea DTCG echivalentă,
   inversând tabelul de denumire din `figma-token-mapping.md`
   (`color/brand/default` → `semantic.color.brand.default`, ș.a.m.d.);
3. rezolvă valoarea canonică DTCG pentru aceeași cale, folosind aceeași
   logică de rezolvare a aliasurilor deja implementată în
   `scripts/build-tokens.mjs` (nu o reimplementează separat — o importă);
4. compară valoare cu valoare, per mod (temă sau accent), și clasifică
   fiecare rezultat în una din trei categorii:

   | Categorie                        | Însemnătate                                                                   | Acțiune                                    |
   | -------------------------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
   | lipsă în Figma                   | token nou sau redenumit în DTCG, încă neaplicat manual în Figma               | de sincronizat — Figma e în urmă           |
   | lipsă în DTCG (variabilă orfană) | o variabilă există în Figma fără corespondent — încalcă regula „DTCG e sursa" | de investigat — cine a introdus-o și de ce |
   | valoare diferită                 | aceeași cale există în ambele, dar valorile rezolvate nu coincid              | de corectat în Figma, niciodată în cod     |

5. produce un raport, în același spirit ca `ValidatorReport` din
   `@sistem-digital/validator` — status per token, explicație, remediere,
   nu doar un număr agregat de deviații.

### Frecvență și integrare

Odată deblocat de #22, scriptul rulează ca workflow CI dedicat
(`.github/workflows/figma-token-sync-check.yml`, urmând convenția deja
folosită de `validator-self-check.yml`), programat periodic (nu la fiecare
push, pentru că modificările manuale din Figma nu sunt legate de commituri)
și declanșabil manual înainte de un release de tokeni.

O extensie naturală, dar explicit din afara scope-ului acestui document: o
regulă nouă a validatorului (de exemplu `sd-design-figma-drift`) ar putea
consuma același raport, ceea ce ar face verificarea deviațiilor
automatizabilă și pentru criteriul `compatible-tokens` din
[nivelurile de adopție instituțională](../governance/adoption-levels.md) —
azi marcat explicit neautomatizabil în `packages/validator/src/adoption.ts`
tocmai pentru că nu există sursă de adevăr Figma verificabilă. Această idee
nu e implementată aici; e notată ca motiv suplimentar pentru care planul de
mai sus merită construit corect de la #22 încolo.

## Reguli de publicare specifice sincronizării

Regulile generale de release rămân cele din
[`docs/governance/release-policy.md`](../governance/release-policy.md).
Specific sincronizării Figma:

- descrierea fișierului Figma trebuie să indice explicit versiunea
  `@sistem-digital/tokens` cu care a fost sincronizată ultima dată (deja
  cerut de procesul manual din `figma-token-mapping.md`); kitul nu poate
  afirma sincronizare cu o versiune mai nouă decât ultima verificare
  înregistrată, automată sau manuală;
- un Changeset care redenumește sau elimină un token `core`, `semantic`
  sau `component` trebuie să menționeze explicit impactul asupra
  mapping-ului Figma, astfel încât actualizarea manuală descrisă în
  `figma-token-mapping.md` (secțiunea „Proces de actualizare") să nu fie
  omisă din neatenție.

## Politica de depreciere la nivel de token

Regulile generale de deprecation din `release-policy.md` se aplică la
nivel de pachet și API public; cele de la nivel de componentă individuală
sunt formalizate în
[`component-maturity-model.md`](../governance/component-maturity-model.md#politica-de-depreciere-și-retragere).
Niciuna nu acoperă un token individual (de exemplu redenumirea unui rol
semantic fără să afecteze nicio componentă) — secțiunea de față închide
acel gol, cu aceeași structură ca politica de componente, pentru
consecvență.

### Perioadă minimă

Un token rămâne `deprecated` minimum **90 de zile calendaristice sau o
versiune minoră publicată a `@sistem-digital/tokens`, oricare dintre cele
două este mai lungă** — identic cu perioada de la nivel de componentă. O
perioadă mai scurtă necesită un security advisory care o justifică.

### Canalul de anunț

Identic structurat cu politica de componente, trei canale simultane:

1. **Changeset**, cu motivul deprecierii și alternativa recomandată;
2. **Changelog** al `@sistem-digital/tokens`, generat din Changeset;
3. **Variabila Figma corespunzătoare**, cu descrierea actualizată pentru a
   marca starea de depreciere și alternativa — niciodată ștearsă în acest
   pas, doar adnotată. Acest al treilea canal nu poate fi bifat înainte ca
   #22 să publice kitul; până atunci, deprecation-ul unui token urmează
   doar primele două canale, cu o notă explicită în Changeset că
   actualizarea Figma va urma manual, conform `figma-token-mapping.md`.

Fără canalele aplicabile la momentul respectiv, deprecierea nu e
considerată anunțată public, iar perioada minimă nu începe să curgă.

### Retragerea efectivă

La expirarea perioadei minime, tokenul este eliminat din
`tokens.dtcg.json` la următoarea versiune publicată, conform politicii
generale de breaking changes. Dacă la acel moment kitul Figma există,
variabila corespunzătoare este eliminată simultan — niciodată înainte,
pentru că o variabilă Figma fără corespondent DTCG ar încălca chiar
principiul „DTCG e sursa" enunțat mai sus.

Această politică nu se aplică retroactiv — niciun token existent nu este
marcat `deprecated` prin acest document.

## Ce rămâne, punctual, pentru închiderea #145

- [x] identificator comun Figma–cod (#110);
- [x] mapping token→Figma (`figma-token-mapping.md`);
- [x] proces de sincronizare documentat (acest document);
- [ ] implementarea `check-figma-sync.mjs` — blocată de #22 (fișier Figma
      real de citit);
- [ ] primul run real al verificării — blocat de aceeași dependență.
