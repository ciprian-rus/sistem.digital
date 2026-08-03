# Modelul de maturitate a componentelor

## Obiectiv

Acest document formalizează cele șase stări de maturitate deja decise în [`docs/research/comparative-audit.md`](../research/comparative-audit.md#niveluri-de-maturitate), cu un Definition of Done verificabil pentru fiecare stare și cu reguli explicite de tranziție. Modelul este inspirat de structura pe patru stări a Estafettemodel (NL Design System), adaptat la un nucleu central menținut oficial — Sistem Digital nu este, cel puțin pentru MVP, un ecosistem federat.

Documentul este preliminar: definește contractul, nu migrează retroactiv componentele existente. Migrarea este tratată separat, prin issues distincte (a se vedea „Relația cu inventarul curent" mai jos).

## Stările

### `proposal`

**Definiție:** o nevoie a fost identificată și documentată, dar nu există încă implementare.

**Definition of Done pentru a intra în `proposal`:**

- [ ] nevoia utilizatorului este descrisă explicit, nu doar soluția;
- [ ] există cel puțin un exemplu concret de serviciu sau context care ar folosi componenta;
- [ ] a fost verificat că nu există deja o componentă sau un pattern echivalent (vezi `docs/product/versioned-catalog.md` și paginile de familie);
- [ ] propunerea urmează fluxul deja definit de issue #24 (idee → discuție → dovada nevoii → propunere).

**Cerințe minime:** niciuna suplimentară — aceasta este starea de intrare.

**Owner:** persoana sau echipa care a deschis propunerea; poate fi reasignat la trecerea în `experimental`.

### `experimental`

**Definiție:** există o implementare funcțională, dar contractul (API, markup, nume) se poate schimba fără preaviz.

**Definition of Done pentru a intra în `experimental`:**

- [ ] implementare HTML semantică, cu progressive enhancement (funcționează fără JavaScript acolo unde are sens);
- [ ] cel puțin o pagină de documentație minimă (poate fi incompletă față de șablonul canonic din `docs/accessibility/component-template.md`);
- [ ] teste automate de bază (inventar/contract, similar cu testele SSR-safety existente în pachete);
- [ ] nu este încă inclusă în inventarul public al pachetului (`*ComponentNames`) — trăiește izolat sau în spatele unui flag.

**Cerințe minime:** cercetare de birou sau exemple din alte sisteme (nu este necesară încă cercetare cu utilizatori).

**Owner:** obligatoriu, o singură persoană sau echipă responsabilă.

### `candidate`

**Definiție:** componenta este generalizată, documentată complet și pregătită pentru feedback final înainte de stabilizare — echivalentul funcțional al stării `alpha` folosite azi de catalogul versionat.

**Definition of Done pentru a intra în `candidate`:**

- [ ] inclusă în inventarul public al pachetului și în catalogul versionat (`stadiu: alpha`);
- [ ] documentație completă conform structurii standard pe 15 secțiuni (`docs/accessibility/component-template.md` și viitorul șablon canonic din Epic C);
- [ ] checklist-ul de accesibilitate din `docs/accessibility/component-checklist.md` este parcurs, cu excepții aprobate și limitate în timp acolo unde este cazul;
- [ ] teste automate de accesibilitate (axe, tag-uri WCAG A/AA configurate) fără încălcări deschise;
- [ ] exemple de cod și markup canonic verificate de `scripts/check-catalog.mjs`;
- [ ] cel puțin o utilizare reală sau demonstrativă (serviciu de referință sau pagină de catalog).

**Cerințe minime:** reutilizare demonstrată sau planificată în cel puțin un context; owner activ.

### `stable`

**Definiție:** componenta respectă politica de compatibilitate publică; schimbările incompatibile necesită un ciclu de depreciere.

**Definition of Done pentru a intra în `stable`:**

- [ ] toate criteriile stării `candidate` sunt îndeplinite și rămân valabile;
- [ ] auditul manual de accesibilitate cu tehnologii asistive este finalizat pentru componentă (matricea minimă din `docs/accessibility/test-matrix.md`, urmărită azi de issue #53 la nivel de bibliotecă MVP);
- [ ] nu există defecte critice sau majore deschise;
- [ ] versiunea, data ultimei testări manuale și rezultatele sunt înregistrate în documentația componentei (`docs/accessibility/component-template.md`, secțiunea „Testare manuală");
- [ ] decizie explicită publicată (issue sau changelog) că trecerea `candidate → stable` a fost aprobată, cu data și responsabilul deciziei.

**Cerințe minime:** mentenanță activă confirmată; fără schimbări de contract public plănuite pe termen scurt.

### `deprecated`

**Definiție:** componenta rămâne funcțională și documentată, dar nu este recomandată pentru implementări noi.

**Definition of Done pentru a intra în `deprecated`:**

- [ ] motivul deprecierii este documentat explicit (înlocuită de altă componentă, problemă de accesibilitate nerezolvabilă, decizie de produs etc.);
- [ ] este indicată alternativa recomandată, dacă există;
- [ ] este publicat un plan sau termen orientativ pentru `retired`, dacă este cunoscut;
- [ ] catalogul versionat reflectă `stadiu: deprecated`;
- [ ] documentația componentei afișează vizibil starea și motivul, nu doar o etichetă.

### `retired`

**Definiție:** componenta nu mai este distribuită activ în versiunile noi ale pachetului.

**Definition of Done pentru a intra în `retired`:**

- [ ] a trecut perioada minimă de depreciere anunțată public;
- [ ] migration path-ul către alternativă este documentat și verificat cel puțin o dată;
- [ ] componenta este eliminată din inventarul public al pachetului la următoarea versiune majoră/minoră compatibilă cu politica de breaking changes;
- [ ] pagina de documentație rămâne accesibilă istoric (arhivată, nu ștearsă), cu indicarea clară a stării `retired` și a versiunii din care a fost eliminată.

## Tranziții permise

```text
proposal → experimental → candidate → stable
                              ↓           ↓
                          deprecated → retired
```

- nu se sare peste stări (o componentă nu trece direct din `proposal` în `candidate`);
- `experimental` și `candidate` pot reveni la o stare anterioară dacă se descoperă probleme fundamentale de accesibilitate, semantică sau mentenanță — regresia este documentată, nu ascunsă;
- `stable` poate trece direct în `deprecated`, dar nu direct în `retired`;
- orice tranziție este însoțită de: data, owner-ul care a aprobat-o și motivul, publicate în documentația componentei și, pentru `stable`/`deprecated`/`retired`, într-un changeset.

## Relația cu inventarul curent

Catalogul versionat (`docs/product/versioned-catalog.md`) folosește azi trei stadii: `alpha`, `stable`, `deprecated`. Acest model pe șase stări este compatibil, nu contradictoriu:

| Stare nouă | Echivalent `stadiu` curent |
|---|---|
| `proposal` | nu apare în catalog |
| `experimental` | nu apare în catalog (izolat sau în spatele unui flag) |
| `candidate` | `alpha` |
| `stable` | `stable` |
| `deprecated` | `deprecated` |
| `retired` | eliminată din catalog |

Toate componentele publicate azi în `@sistem-digital/components` sunt, prin această hartă, în starea `candidate` (folosesc `stadiu: alpha`). Acest PR **nu** migrează retroactiv metadatele fiecărei componente către noul model — vezi schema preliminară din [`docs/product/component-metadata-schema.md`](../product/component-metadata-schema.md) și issues distincte pentru migrarea graduală (Epic C, „Migrarea graduală a componentelor existente").

## Relația cu procesul comunitar existent

Fluxul „Idee → discuție → dovada nevoii → propunere → prototip → testare → audit de accesibilitate → experimental → stabil" definit deja în issue #24 rămâne procesul de admitere într-un backlog. Acest document formalizează ce se întâmplă **după** ce o propunere e acceptată: stările prin care trece implementarea ei, cu criterii verificabile, nu doar etape descriptive.

## Owner și evaluare

Fiecare componentă `candidate` sau mai avansată are:

- un owner explicit, publicat în documentația componentei;
- data ultimei evaluări de stare;
- pentru `deprecated`/`retired`: motivul documentat, nu doar eticheta.

Absența unui owner activ este motiv suficient pentru a propune trecerea în `deprecated`, indiferent de calitatea tehnică a componentei — mentenanța fără proprietar este exact problema transversală „Contribuții fără owner" identificată în auditul comparativ.
