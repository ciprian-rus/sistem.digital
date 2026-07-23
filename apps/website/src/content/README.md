# Conținutul platformei sistem.digital

## Sursa de adevăr

- `site-map.ts` definește taxonomia, paginile, navigația și indexul de căutare;
- `pages/*.mdx` conține documentația editorială;
- `documentation.ts` validează frontmatter-ul;
- `create-documentation-route.tsx` leagă fiecare fișier MDX de ruta publică;
- `src/mdx-components.tsx` definește componentele editoriale globale.

## Adăugarea unei pagini

1. adaugă pagina în secțiunea potrivită din `site-map.ts`;
2. creează fișierul MDX cu frontmatter complet;
3. creează route wrapper-ul în `src/app`;
4. adaugă teste pentru căutare, breadcrumbs și accesibilitate;
5. verifică dacă pagina este inclusă în navigația locală;
6. actualizează tree testing-ul când schimbarea afectează taxonomia.

## Frontmatter obligatoriu

```yaml
title: Titlul paginii
description: Descrierea pentru introducere și metadata
section: components
status: alpha
version: 0.1.0-alpha.0
updated: 2026-07-23
order: 1
keywords:
  - componentă
  - exemplu
```

Valorile invalide opresc build-ul.

## Validare

Fiecare schimbare editorială trece prin aceleași verificări ca aplicația:

- formatare, lint și TypeScript;
- compilarea MDX și validarea frontmatter-ului;
- teste pentru sitemap, breadcrumbs și căutare;
- axe, tastatură, JavaScript dezactivat și reflow;
- auditul dependențelor și scanarea semnăturilor de secrete;
- preview Vercel și regresie vizuală.

## Reguli

- nu crea liste separate pentru navigație, footer și căutare;
- nu importa MDX din surse externe la runtime;
- nu introduce JavaScript client dacă pagina poate fi server-rendered;
- nu copia markup-ul template-ului în fișierul MDX;
- păstrează exemplele și versiunile sincronizate cu pachetele publice;
- folosește componentele `Callout`, `Preview`, `CodeExample` și `ComponentStatus`.
