# Comunitate: roluri, grupuri de lucru și transparență

## Obiectiv

#23 cere o comunitate care poate contribui real, cu roluri publice, grupuri de lucru și decizii transparente, fără să transforme votul într-un substitut pentru calitate. Acest document publică partea structurală — roluri, grupuri de lucru, cadența întâlnirilor și recunoașterea contribuțiilor — care nu are nevoie de o comunitate deja activă pentru a fi definită.

Activarea propriu-zisă a GitHub Discussions rămâne o acțiune administrativă separată (comutator în Settings → General → Features al repository-ului), în afara instrumentelor disponibile pentru pregătirea acestui document — vezi „Ce nu este acoperit" mai jos.

## Roluri publice

### Contribuitor

Oricine deschide un issue, o propunere sau un pull request, conform `CONTRIBUTING.md`. Nu necesită aprobare prealabilă sau apartenență formală.

### Reviewer

Un contribuitor cu istoric de participare consecventă (minimum câteva contribuții acceptate sau review-uri de calitate), invitat explicit de un maintainer. Responsabilități:

- oferă review tehnic pe pull request-uri din aria sa de expertiză (accesibilitate, frontend, content design etc.);
- nu are drept de merge implicit — decizia finală rămâne a unui maintainer, cu excepția cazului în care i se acordă explicit acest drept;
- poate marca o propunere ca duplicat sau poate solicita clarificări, conform `docs/governance/proposal-process.md`.

### Maintainer

Responsabil pentru coerența generală a sistemului. Responsabilități:

- decide public asupra RFC-urilor, conform ciclului de decizie din `docs/governance/proposal-process.md`;
- aprobă tranziții de stare pentru componente, conform `docs/governance/component-maturity-model.md`;
- aplică `CODE_OF_CONDUCT.md` — vezi secțiunea „Aplicare" a acelui document pentru limitele moderării;
- publică motivarea deciziilor în `docs/governance/decision-registry.md`.

Lista curentă de maintaineri e publică prin colaboratorii cu acces de scriere ai repository-ului (`list_repository_collaborators`, vizibil oricui are acces la repo) — acest document nu duplică o listă de nume care s-ar dezactualiza.

## Grupuri de lucru

Patru grupuri de lucru, aliniate direct pe ariile deja folosite în etichetele issue-urilor (`area:foundation`, `area:website`, `area:accessibility`, `area:patterns`/content):

| Grup           | Scop                                                                       | Issues reprezentative                                      |
| -------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------- |
| UX             | arhitectura informației, pattern-uri de serviciu, cercetare cu utilizatori | #19, #39-42, #54                                           |
| Frontend       | componente, tokeni, distribuție, validator                                 | #7, #12, #21, #25                                          |
| Accesibilitate | audit manual, tehnologii asistive, excepții                                | #53, `docs/accessibility/`                                 |
| Content design | terminologie, ghid de stil, documentație                                   | `docs/content/`, `docs/product/component-page-template.md` |

Un grup de lucru nu e o structură formală separată — e o etichetă de coordonare pe issues și discuții existente din aria respectivă. Oricine poate participa la discuția unui grup fără înscriere prealabilă; nu există un proces de aderare separat de a contribui efectiv în acea arie.

## Întâlniri și note publice

Formatul propus, pregătit pentru activare, nu încă testat cu o întâlnire reală:

- cadență: lunar, primul reviewer sau maintainer disponibil deschide o discuție (issue sau, odată activat, Discussions) cu ordinea de zi, cu minimum 7 zile înainte;
- notele întâlnirii se publică în termen de 48 de ore, ca fișier nou în `docs/governance/meeting-notes/`, indiferent de câți participanți s-au prezentat;
- o întâlnire fără cvorum minim (2 persoane, altele decât un singur maintainer) se anulează public, nu se ține fictiv.

Directorul `docs/governance/meeting-notes/` e pregătit, dar gol — nu conține note fabricate ale unor întâlniri care nu au avut loc.

## Recunoașterea contribuțiilor

- fiecare Changeset (`.changeset/`) atribuie explicit autorul schimbării în changelog-ul generat al pachetului;
- pull request-urile acceptate rămân atribuite autorului lor în istoricul Git, fără reformulare care ar ascunde paternitatea;
- deciziile RFC acceptate (`docs/governance/decision-registry.md`) păstrează link către propunerea originală și autorul ei.

Acest document nu introduce un program formal de recunoaștere (badge-uri, listă publică de contribuitori) — rămâne un candidat pentru o propunere RFC viitoare, dacă volumul real de contribuții o justifică, nu construit anticipat pentru o comunitate care nu există încă.

## Moderare

Aplicarea `CODE_OF_CONDUCT.md` rămâne responsabilitatea maintainerilor, conform secțiunii „Aplicare" a acelui document. Acest document nu introduce reguli de moderare paralele.

## Categorii Discussions propuse (documentate, nu create)

Odată activat GitHub Discussions, categoriile propuse, aliniate pe `config.yml` existent și pe fluxul din `docs/governance/proposal-process.md`:

| Categorie     | Scop                                                               |
| ------------- | ------------------------------------------------------------------ |
| Anunțuri      | doar maintaineri pot posta; release-uri, decizii majore            |
| Idei          | starea „Idee" din fluxul de admitere — fără formă structurată încă |
| Q&A           | întrebări de utilizare, cu răspuns marcat                          |
| Show and tell | implementări reale ale Sistem Digital, din afara proiectului       |
| Guvernanță    | discuții despre proces, roluri, RFC-uri înainte de forma formală   |

## Ce nu este acoperit de acest document

- **activarea GitHub Discussions** — comutator administrativ (Settings → General → Features), în afara instrumentelor disponibile pregătirii acestui document; categoriile de mai sus sunt propuse, nu create;
- **testarea onboarding-ului cu contributori noi reali** — vezi `docs/governance/onboarding.md`, secțiunea „Ce nu este acoperit";
- prima întâlnire reală și primele note publicate — cadența e definită, execuția așteaptă o comunitate activă.

## Riscuri

Rolurile, grupurile de lucru și cadența de mai sus sunt netestate cu o comunitate reală — la fel ca procesul RFC (`proposal-process.md`), pot necesita ajustare la primul ciclu real de participare externă.
