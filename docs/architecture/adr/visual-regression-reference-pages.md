# ADR — Pagini de referință și Playwright pentru regresie vizuală

- **Stadiu:** acceptat
- **Data:** 22 iulie 2026
- **Decizie:** website-ul public este catalogul executabil, iar Playwright asigură regresia vizuală

## Context

Sistem Digital livrează HTML semantic, CSS modular și JavaScript opțional. Contractul canonic nu este React, iar componentele trebuie demonstrate în aceeași cascadă CSS, aceleași teme și aceleași condiții de progressive enhancement în care sunt testate paginile publice.

Issue #16 cere un catalog revizuibil, teste de interacțiune, axe-core și regresie vizuală. Au fost evaluate trei variante:

1. Storybook ca aplicație separată;
2. un catalog static nou, separat de website;
3. paginile de referință din `apps/website` împreună cu Playwright.

## Decizie

Adoptăm varianta 3 pentru MVP:

- fiecare familie de componente are o pagină publică server-rendered pe `sistem.digital`;
- paginile conțin markup-ul canonic, stări, exemple și limite cunoscute;
- Playwright rulează teste de interacțiune și axe în Chromium;
- un config Playwright separat rulează comparații vizuale pe desktop și mobil;
- imaginile de referință sunt versionate în repository;
- la diferențe, CI încarcă imaginile `actual`, `expected` și `diff` ca artefact revizuibil;
- capturile nu înlocuiesc auditul manual de accesibilitate sau review-ul de design.

## De ce nu Storybook în MVP

Storybook ar introduce în acest moment:

- un al doilea runtime de catalog și o a doua configurație de build;
- o reprezentare implicit orientată spre componente de framework;
- riscul ca exemplele din catalog să nu folosească exact shell-ul, temele și cascade layers din website;
- mentenanță suplimentară înainte ca biblioteca să aibă adaptori React oficiali.

Aceasta nu este o respingere definitivă. Storybook poate fi reevaluat când există adaptori de framework, contribuții externe numeroase sau nevoia de integrare cu servicii specializate de review vizual.

## Matrice vizuală MVP

Baseline-urile obligatorii sunt:

- desktop Chromium, temă luminoasă;
- desktop Chromium, temă întunecată;
- mobil Chromium, temă luminoasă;
- mobil Chromium, temă cu contrast ridicat întunecat.

Se captează pagina de referință pentru componente interactive după stabilizarea fonturilor, închiderea dialogului și resetarea stărilor dinamice. Animațiile și cursorul text sunt dezactivate.

## Praguri și review

- diferențele de pixeli nu sunt aprobate automat;
- orice actualizare de baseline trebuie să fie intenționată și explicată în PR;
- schimbările de conținut dinamic sunt eliminate sau stabilizate înainte de captură;
- artefactele CI sunt păstrate 14 zile;
- baseline-urile sunt actualizate numai din Chromium pe Ubuntu, aceeași platformă folosită de CI.

## Consecințe

### Pozitive

- exemplele publice și testele folosesc aceeași implementare;
- nu apare dependență obligatorie de React;
- regresiile de cascadă, layout, teme și reflow devin detectabile;
- capturile sunt asociate direct cu PR-ul și commitul.

### Costuri

- baseline-urile sunt sensibile la modificări de font, browser și sistem de operare;
- actualizările legitime cer review explicit;
- catalogul public trebuie păstrat determinist;
- testele vizuale nu acoperă tehnologii asistive.

## Criterii de reevaluare

Decizia se reevaluează când:

- sunt publicate adaptoare React/Web Components cu documentație proprie;
- contribuțiile externe necesită un workbench izolat;
- numărul de stări depășește capacitatea paginilor de referință;
- este adoptat un serviciu extern de review vizual cu cerințe diferite.
