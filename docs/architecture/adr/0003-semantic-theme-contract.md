# ADR 0003 — Contract semantic pentru teme și accente instituționale

## Status

Acceptat pentru implementare în M1.

## Context

Un sistem de design pentru administrația publică trebuie să funcționeze în contexte vizuale diferite fără ca fiecare produs să inventeze propriile reguli. Tema întunecată, contrastul ridicat și personalizarea instituțională nu pot fi tratate ca foi CSS independente, deoarece apar rapid diferențe de semantică, stări lipsă și combinații neverificate.

Arhitectura DTCG introdusă prin ADR 0002 oferă token-uri canonice, dar este necesar un contract separat pentru variantele de temă și pentru accentele controlate.

## Decizie

### Contract identic

Fiecare temă oficială implementează exact aceleași roluri cromatice. Compilatorul respinge:

- rolurile lipsă;
- rolurile suplimentare neînregistrate;
- culorile invalide;
- perechile care nu ating pragul de contrast;
- numele temei care nu corespunde manifestului.

### Teme oficiale

Sunt publicate patru teme:

- `light`;
- `dark`;
- `high-contrast-light`;
- `high-contrast-dark`.

Temele se aplică prin `data-sd-theme` pe elementul `html`. Fără o alegere explicită, sistemul urmărește `prefers-color-scheme`.

### Aplicare înainte de primul paint

Pachetul publică un script de inițializare independent de framework și un string TypeScript echivalent. Scriptul citește preferința validă din `localStorage`, alege fallback-ul sistemului și setează `data-sd-theme` înainte de randarea vizuală.

Aplicațiile cu randare pe server pot seta atributul direct și nu sunt obligate să folosească stocarea locală.

### Forced colors

CSS-ul generat mapează rolurile la culorile sistemului în `forced-colors: active`. Componentele oficiale păstrează `forced-color-adjust: auto` implicit.

### Accente instituționale

Accentele sunt un strat separat de teme și pot modifica numai:

- brandul implicit și puternic;
- acțiunea principală în stările implicit, hover și active.

Linkurile, focusul, feedback-ul, disabled și forced colors sunt protejate. Fiecare preset este validat cu textul acțiunii în toate stările.

### Artefacte

Compilatorul generează determinist:

- `themes.css`;
- `themes.json`;
- `theme-init.js`;
- exporturile TypeScript tipizate;
- metadata cu hash-ul surselor și numărul verificărilor.

Fișierele generate nu se editează manual.

## Consecințe

### Pozitive

- toate temele au acoperire funcțională identică;
- componentele consumă roluri, nu nume de temă;
- contrastul devine quality gate;
- personalizarea are limite verificabile;
- integrarea funcționează cu sau fără framework;
- preferința poate fi aplicată fără flash vizual;
- high contrast și forced colors sunt tratate separat și explicit.

### Costuri

- adăugarea unui rol impune actualizarea tuturor temelor;
- modificarea unei perechi de contrast poate bloca build-ul;
- un accent nou necesită validare și documentație;
- testele de browser rulează pentru fiecare temă și cresc durata CI;
- verificarea automată nu elimină testarea manuală cu utilizatori.

## Alternative respinse

### O singură paletă cu override-uri locale

Ar permite combinații necontrolate și stări lipsă.

### Temă dark generată algoritmic

Transformările automate nu păstrează întotdeauna ierarhia, semnificația și contrastul stărilor. Temele oficiale sunt deliberate și testate.

### Personalizare complet liberă

Ar transforma sistemul într-un kit de componente fără coerență și ar transfera riscul de accesibilitate către fiecare implementare.

### `forced-color-adjust: none` global

Ar bloca preferințele utilizatorului și ar produce bariere severe în Windows High Contrast.

## Compatibilitate

Sunt breaking changes:

- eliminarea sau redenumirea unei teme;
- eliminarea sau schimbarea sensului unui rol;
- schimbarea selectorilor publici;
- schimbarea cheii de stocare fără migrare;
- eliminarea fallback-ului `forced-colors`.

Adăugarea unei teme este minor release numai dacă implementează contractul complet. Ajustarea unei valori este patch sau minor în funcție de impact, dar necesită toate verificările și note de release.
