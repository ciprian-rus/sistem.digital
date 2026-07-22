# Cercetare — Sistem Digital

## Obiectiv

Cercetarea trebuie să reducă riscul ca Sistem Digital să standardizeze preferințe interne, obiceiuri istorice sau soluții care nu răspund nevoilor reale.

Această zonă separă explicit:

- dovezile publice și cercetarea de birou;
- ipotezele care necesită validare;
- cercetarea directă cu utilizatori și implementatori;
- deciziile de produs rezultate;
- limitele și contradicțiile identificate.

## Documente curente

| Document | Stare | Rol |
|---|---|---|
| [Audit comparativ](comparative-audit.md) | cercetare de birou finalizată | compară sistemele mature și extrage practici transferabile |
| [Audit România](romania-desk-audit.md) | cercetare de birou inițială | inventariază contextul public și formulează ipoteze locale |
| [Plan de cercetare de teren](field-research-plan.md) | pregătit pentru execuție | definește participanții, metodele, etica și criteriile de finalizare |
| [Principiile de design](../product/design-principles.md) | candidate | transformă dovezile curente în criterii de decizie |
| [Politica de personalizare](../product/customization-policy.md) | candidate | stabilește limitele dintre identitate, consistență și extensibilitate |

## Nivelurile dovezilor

### Cercetare de birou

Surse publice, documentație, standarde, site-uri și date observabile. Poate susține direcția inițială, dar nu validează comportamentul utilizatorilor.

### Observație contextuală

Utilizatorul este observat în timp ce încearcă să rezolve o sarcină reală sau realistă.

### Interviu

Explică motivațiile, contextul, vocabularul și constrângerile, dar afirmațiile trebuie comparate cu comportamentul observat.

### Dovadă operațională

Date despre volume, erori, timp, abandon, reveniri, costuri sau procesul intern al serviciului.

### Experiment sau pilot

O modificare implementată într-un serviciu real sau de referință și evaluată înainte și după.

## Nivelurile de încredere

| Nivel | Definiție |
|---|---|
| Confirmat | dovezi convergente din mai multe metode și segmente |
| Probabil | observații repetate, dar cu limitări de eșantion sau context |
| Ipoteză | concluzie bazată predominant pe audit, opinie sau puține observații |
| Contrazis | dovezile infirmă sau limitează material ipoteza inițială |

Fiecare raport viitor trebuie să indice nivelul de încredere al concluziilor importante.

## Principii de cercetare

1. Observăm comportamentul, nu cerem doar preferințe.
2. Nu prezentăm soluția înainte de înțelegerea problemei.
3. Includem persoane cu dizabilități în cercetarea generală, nu numai într-un audit separat.
4. Remunerăm participarea și oferim materiale accesibile.
5. Colectăm numai datele personale necesare.
6. Publicăm concluziile agregate și limitele metodologice.
7. Documentăm dovezile care contrazic ipotezele proiectului.
8. Separăm problemele de design de cele juridice, operaționale, de date sau interoperabilitate.
9. Nu generalizăm experiența unei singure instituții.
10. Transformăm constatările în decizii, experimente sau issues urmărite.

## Research repository

Pentru fiecare rundă se păstrează:

```text
research/
  <YYYY-MM-topic>/
    brief.md
    recruitment.md
    consent.md
    discussion-guide.md
    scenarios.md
    notes-anonymized/
    synthesis.md
    findings.md
    decisions.md
```

Datele de identificare și înregistrările brute nu se publică în repository-ul public.

## Traseul unei constatări

```text
observație
→ grupare tematică
→ constatare
→ nivel de încredere
→ implicație
→ decizie / experiment / issue
→ verificarea rezultatului
```

O constatare nu devine automat componentă. Poate produce:

- modificare de conținut;
- schimbare de proces;
- recomandare legislativă;
- integrare cu o platformă comună;
- componentă sau pattern;
- documentație;
- decizia de a nu standardiza.

## Cercetarea rămasă pentru M1

Cercetarea de birou este suficientă pentru a începe arhitectura token-urilor, dar nu pentru a declara validate nevoile locale. Sunt necesare separat:

- audit extins al serviciilor românești;
- cercetare cu cetățeni și persoane cu dizabilități;
- cercetare cu funcționari și proprietari de servicii;
- cercetare cu furnizori și echipe tehnice;
- sinteză publică și revizuirea priorităților MVP.

Aceste activități sunt urmărite prin issues distincte, astfel încât progresul tehnic să nu mascheze lipsa dovezilor de teren.

## Publicarea pe sistem.digital

Platforma publică va afișa pentru fiecare studiu:

- întrebarea de cercetare;
- metoda și eșantionul;
- data;
- concluziile;
- nivelul de încredere;
- limitele;
- deciziile influențate;
- materialele publicabile;
- statusul acțiunilor rezultate.

Publicarea rezultatelor nu include date personale, înregistrări brute sau informații operaționale sensibile.
