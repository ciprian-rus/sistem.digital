# Roadmap — Sistem Digital

Roadmap-ul este organizat pe milestones logice. Datele vor fi stabilite după validarea echipei și a capacității de livrare.

## M0 — Fundația proiectului

- viziune, principii și limite de produs;
- arhitectură monorepo;
- convenții de contribuție;
- guvernanță și proces decizional;
- CI de bază, linting, testare și securitate;
- strategie de licențiere și versionare.

## M1 — Fundamente și design tokens

- cercetare comparativă;
- paletă semantică;
- tipografie;
- spațiere, dimensiuni, grile și breakpoints;
- focus, motion, elevation și iconografie;
- teme light, dark și high contrast;
- export CSS variables și JSON.

## M2 — Componente MVP

- butoane, linkuri și alerte;
- câmpuri de formular și validare;
- checkbox, radio, select și textarea;
- header, footer, navigație și breadcrumb;
- carduri, tabele, accordion și paginare;
- încărcare fișiere, summary list și step indicator;
- teste automate de accesibilitate și regresie vizuală;
- model de maturitate pe șase stări (`proposal` → `retired`) și schema de metadate asociată;
- șablon canonic al paginii unei componente, pe 15 secțiuni, validat automat la build.

## M3 — Platforma sistem.digital

- site de documentație;
- catalog interactiv de componente;
- exemple de cod;
- căutare;
- documentație de conținut și accesibilitate;
- versionare a documentației;
- playground.

## M4 — Pattern-uri și serviciu de referință

- formular în pași;
- verificarea răspunsurilor;
- confirmarea depunerii;
- autentificare;
- urmărirea unei solicitări;
- serviciu public demonstrativ end-to-end;
- zece pattern-uri publicate pentru servicii publice recurente;
- primul model sectorial de referință (primărie), cu catalog de servicii locale;
- al doilea model sectorial de referință (școală), cu catalog de servicii și cerere de înscriere funcțională end-to-end.

## M5 — Startere și distribuție

- pachete npm versionate;
- bundle CSS/JS pentru site-uri legacy;
- CDN cu versiuni imutabile și SRI;
- starter HTML;
- starter Next.js;
- integrare WordPress;
- kit Figma.

## M6 — Comunitate și guvernanță publică

- RFC-uri publice;
- propuneri și vot consultativ;
- grupuri de lucru;
- calendar comunitar;
- registrul deciziilor;
- program de contributori și maintainers.

## M7 — Validator și adopție pilot

- CLI de validare;
- verificări automate de accesibilitate și conformare;
- raport de conformitate;
- badge versionat;
- proiecte pilot;
- ghid de achiziție și adopție instituțională;
- patru niveluri de adopție (`aligned`/`compatible`/`conformant`/`verified`), cu schemă de raportare, politică de excepții și expirare a certificării.

## Principiul de livrare

Fiecare milestone trebuie să producă o versiune utilizabilă, documentată și testată. Funcționalitățile comunitare și de conformare nu vor bloca livrarea nucleului tehnic.
