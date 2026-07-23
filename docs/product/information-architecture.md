# Arhitectura informației pentru sistem.digital

## Obiectiv

Platforma trebuie să permită găsirea rapidă a unei reguli, componente, soluții complete sau instrucțiuni de adopție. Structura este orientată spre tipul informației căutate, nu spre echipa care o produce.

## Taxonomia principală

### Fundamente

Reguli transversale care influențează toate componentele și serviciile:

- principii;
- design tokens;
- culoare și teme;
- tipografie și layout;
- focus și motion;
- accesibilitate.

### Componente

Unități reutilizabile cu markup, stil și comportament documentat:

- formulare;
- navigație;
- conținut și date;
- interactive.

### Pattern-uri

Fluxuri end-to-end pentru probleme recurente din serviciile publice.

### Template-uri

Puncte de pornire tehnice și editoriale pentru produse complete.

### Ghiduri

Instrucțiuni în funcție de rol: design, dezvoltare, conținut, achiziții și adopție.

### Guvernanță

Roadmap, RFC-uri, contribuții, versiuni, securitate și decizii publice.

## Reguli pentru URL-uri

- folosim substantive românești clare;
- folosim litere mici și cratimă;
- nu folosim extensii de fișier;
- nu includem versiunea curentă în URL-ul principal;
- rutele stabile ale componentelor nu se schimbă fără redirect permanent;
- diacriticele apar în conținut, nu în slug;
- o pagină aparține unei singure categorii principale.

Exemple:

- `/fundamente`;
- `/componente/formulare`;
- `/pattern-uri`;
- `/template-uri`;
- `/ghiduri`;
- `/guvernanta`.

## Navigație

Navigația globală conține cele șase categorii. Căutarea rămâne o funcție transversală în header. Roadmap-ul este o resursă externă a proiectului, nu o categorie editorială.

În interiorul unei categorii, navigația locală afișează numai paginile disponibile. Elementele planificate pot apărea în roadmap, dar nu creează linkuri publice inexistente.

## Breadcrumb

Breadcrumb-ul pornește întotdeauna de la Acasă și include categoria înaintea paginii curente.

Exemplu:

`Acasă → Componente → Componente interactive`

Titlul paginii curente nu este link.

## Sursa de adevăr

Fișierul `apps/website/src/content/site-map.ts` definește:

- categoriile;
- paginile;
- titlurile de navigație;
- descrierile;
- cuvintele-cheie;
- stadiul disponibil sau planificat.

Din aceeași sursă sunt derivate navigația, footer-ul, breadcrumbs, căutarea și, în etapa SEO, sitemap-ul XML.

## Inventarul inițial

| Rută | Categorie | Stadiu |
| --- | --- | --- |
| `/fundamente` | Fundamente | disponibil |
| `/componente` | Componente | disponibil |
| `/componente/formulare` | Componente | disponibil |
| `/componente/navigatie` | Componente | disponibil |
| `/componente/continut-date` | Componente | disponibil |
| `/componente/interactive` | Componente | disponibil |
| `/pattern-uri` | Pattern-uri | disponibil, conținut planificat |
| `/template-uri` | Template-uri | disponibil, conținut planificat |
| `/ghiduri` | Ghiduri | disponibil |
| `/guvernanta` | Guvernanță | disponibil |
| `/cautare` | funcție transversală | disponibil |

## Redirecturi

În această etapă nu sunt eliminate rute publice. Paginile M2 își păstrează URL-urile. Orice schimbare ulterioară trebuie să includă:

1. motivul schimbării;
2. redirect permanent;
3. actualizarea sitemap-ului și a căutării;
4. test automat pentru URL-ul vechi;
5. perioadă de compatibilitate documentată.

## Validare

Structura este verificată prin:

- teste unitare pentru duplicate și landing pages lipsă;
- verificarea linkurilor;
- tree testing cu participanți;
- teste de tastatură și reflow pentru navigația vizuală;
- analizarea termenilor de căutare după lansare, fără profilare individuală.
