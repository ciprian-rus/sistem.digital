# ADR — App Router și MDX local pentru platforma editorială

- **Stadiu:** acceptat
- **Data:** 23 iulie 2026
- **Decizie:** conținut MDX local, versionat împreună cu aplicația și validat la build

## Context

Platforma `sistem.digital` trebuie să documenteze fundamente, componente, pattern-uri, template-uri, ghiduri și guvernanță. Conținutul trebuie să rămână sincronizat cu pachetele, exemplele și changelog-ul, fără a introduce de la început un CMS, o bază de date sau un al doilea runtime editorial.

Next.js App Router suportă pagini și importuri MDX în Server Components. Configurația oficială folosește `@next/mdx`, `pageExtensions` și un fișier `mdx-components.tsx` pentru componentele editoriale globale.

## Decizie

Pentru M3 folosim:

- Next.js App Router pentru routing, metadata și server rendering;
- fișiere MDX locale în `apps/website/src/content/pages`;
- frontmatter YAML transformat în exportul `frontmatter`;
- validare TypeScript executată la import și la build;
- route wrappers subțiri care leagă MDX-ul de template-ul canonic;
- `mdx-components.tsx` pentru callout, preview, status, linkuri și tabele;
- sitemap-ul canonic din `src/content/site-map.ts` pentru navigație, breadcrumbs și căutare;
- Git și pull requests drept flux editorial și de aprobare.

Versiunile pluginurilor MDX și remark sunt blocate în catalogul pnpm, iar compilarea folosește lockfile-ul verificat pentru rezultate reproductibile.

Nu introducem CMS în MVP.

## Contractul frontmatter

Fiecare pagină trebuie să declare:

- `title`;
- `description`;
- `section` din taxonomia oficială;
- `status`: `alpha`, `planned` sau `stable`;
- `version` documentată;
- `updated` în format `YYYY-MM-DD`;
- `order` întreg;
- `keywords` ca listă de texte.

Un câmp lipsă sau invalid oprește build-ul.

## Motive

### Sincronizare

Conținutul, codul și exemplele intră în același pull request și trec aceleași quality gates.

### Securitate

Nu compilăm MDX furnizat dinamic de utilizatori. Numai fișierele aprobate în repository sunt executate ca MDX.

### Performanță

Paginile sunt server-rendered și pot fi prerandate. Nu este necesar un client de CMS sau un runtime Markdown în browser.

### Portabilitate

Conținutul rămâne text deschis și poate fi migrat ulterior. Frontmatter-ul YAML și Markdown-ul sunt independente de un furnizor comercial.

## Consecințe

### Pozitive

- preview-ul și conținutul folosesc implementarea reală;
- istoricul editorial este auditabil;
- validarea poate opri divergențele înainte de deployment;
- platforma funcționează fără cont și fără API editorial;
- backup-ul este repository-ul Git.

### Costuri

- autorii trebuie să folosească Git sau un flux asistat;
- publicarea cere build și deployment;
- colaborarea editorială non-tehnică necesită instrumente suplimentare în viitor;
- conținutul nu poate fi editat direct în producție.

## Reevaluare

CMS-ul poate fi reevaluat când:

- există o echipă editorială permanentă non-tehnică;
- volumul schimbărilor depășește capacitatea review-ului Git;
- sunt necesare traduceri cu workflow editorial complex;
- este păstrată posibilitatea exportului complet și a versionării în repository.
