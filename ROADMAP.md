# Roadmap — Sistem Digital

Roadmap-ul este organizat pe milestones logice. Datele vor fi stabilite după validarea echipei și a capacității de livrare.

## Context legislativ

PL-x nr. 300/2026 (Aplicația Mobilă Unică), adoptat de Senat pe 29 iunie 2026 și aflat la Camera Deputaților, cere exact genul de infrastructură de design și pattern-uri unitare pe care sistem.digital le construiește deja. Vezi maparea detaliată în [`docs/governance/pl-x-300-2026-alignment.md`](docs/governance/pl-x-300-2026-alignment.md) — legea nu e încă promulgată, iar sistem.digital rămâne un proiect open-source independent, nu unul oficial al ADR.

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
- export CSS variables și JSON;
- proces de sincronizare Figma–tokeni–cod: identificator comun între design și cod, mapping token→Figma și plan tehnic de verificare a deviațiilor (Epic G, #145).

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
- al doilea model sectorial de referință (școală), cu catalog de servicii și cerere de înscriere funcțională end-to-end;
- al treilea model sectorial de referință (spital), cu catalog de servicii și cerere de document medical funcțională end-to-end;
- al patrulea și ultimul model sectorial de referință (minister), cu catalog de servicii și cerere de informații publice funcțională end-to-end.

## M5 — Startere și distribuție

- pachete npm versionate;
- bundle CSS/JS pentru site-uri legacy;
- CDN cu versiuni imutabile și SRI;
- starter HTML — livrat (`starters/html`), consumă pachetele npm publicate,
  fără build; deployat public la
  [sistem-digital-starter-html.vercel.app](https://sistem-digital-starter-html.vercel.app/)
  (#22);
- starter Next.js — livrat (`starters/nextjs`), App Router, consumă aceleași
  pachete publicate; `@sistem-digital/react` nu e încă publicat, deci
  enhancement-ul JS apelează direct `@sistem-digital/components`; deployat
  public la
  [sistem-digital-starter-nextjs.vercel.app](https://sistem-digital-starter-nextjs.vercel.app/)
  (#22);
- integrare WordPress — livrată (`starters/wordpress`), temă clasică;
  netestată într-un WordPress viu (mediul de dezvoltare nu are acces la
  wordpress.org și nici Docker) — vezi limitarea documentată în
  `starters/wordpress/README.md`;
- kit Figma — mapping-ul token→Figma documentat
  (`docs/product/figma-token-mapping.md`); kitul propriu-zis (fișierul
  `.fig`) rămâne nelivrat — figma.com și api.figma.com sunt ambele blocate
  de politica de rețea a mediului de dezvoltare, la fel ca wordpress.org.

## M6 — Comunitate și guvernanță publică

- RFC-uri publice: flux de admitere, praguri, ciclu de decizie, vot consultativ, registru public de decizii și căi de contestare documentate (`docs/governance/proposal-process.md`), testate pe două propuneri pilot reale (#202, #203, Epic #24);
- propuneri și vot consultativ;
- grupuri de lucru, roluri publice și onboarding documentate (`docs/governance/community.md`, `docs/governance/onboarding.md`, Epic #23) — activarea GitHub Discussions și testarea onboarding-ului cu contributori reali rămân neexecutate;
- calendar comunitar;
- registrul deciziilor;
- program de contributori și maintainers.

## M7 — Validator și adopție pilot

- CLI de validare;
- verificări automate de accesibilitate și conformare;
- raport de conformitate;
- badge versionat;
- proiecte pilot: criterii de selecție, metodologie de baseline și indicatori pregătiți (`docs/governance/pilot-program.md`), execuția rămâne blocată de parteneri instituționali reali (#26);
- ghid de achiziție și adopție instituțională;
- patru niveluri de adopție (`aligned`/`compatible`/`conformant`/`verified`), cu schemă de raportare, politică de excepții și expirare a certificării.

## Principiul de livrare

Fiecare milestone trebuie să producă o versiune utilizabilă, documentată și testată. Funcționalitățile comunitare și de conformare nu vor bloca livrarea nucleului tehnic.
