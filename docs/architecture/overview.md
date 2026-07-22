# Arhitectura Sistem Digital

## Principii arhitecturale

1. **Nucleu independent de framework.** HTML semantic, CSS și JavaScript minimal reprezintă baza.
2. **Distribuție versionată.** Nicio integrare de producție nu trebuie să depindă de un URL `latest` mutabil.
3. **Progressive enhancement.** Funcțiile de bază trebuie să rămână utilizabile fără JavaScript, unde este posibil.
4. **Accesibilitate by default.** Componentele sunt testate automat și manual.
5. **Extensibilitate controlată.** Instituțiile personalizează doar token-uri și zone explicit permise.
6. **Reproducibilitate.** Build-uri deterministe, lockfile, provenance și release-uri verificabile.

## Monorepo

Se recomandă `pnpm` workspaces și Turborepo pentru orchestrarea build-urilor, testelor și cache-ului.

```text
apps/
  website
  playground
  reference-service
packages/
  tokens
  styles
  components
  web-components
  react
  icons
  content
  validator
starters/
  html
  nextjs
  wordpress
```

## Pachete

### `@sistem-digital/tokens`
Sursa canonică pentru culori semantice, tipografie, spațiere, dimensiuni, breakpoints, motion și elevation. Exportă JSON, TypeScript și CSS custom properties.

### `@sistem-digital/styles`
Reset minimal, tipografie, layout, utilitare și stilurile componentelor.

### `@sistem-digital/components`
Comportamente JavaScript modulare pentru componentele interactive. Nu include un framework UI obligatoriu.

### `@sistem-digital/web-components`
Elemente complexe reutilizabile în aplicații eterogene.

### `@sistem-digital/react`
Adaptoare React care păstrează semantica și API-ul nucleului.

### `@sistem-digital/validator`
CLI și reguli pentru verificarea utilizării componentelor, accesibilității și structurii minime.

## Distribuție

- npm pentru proiecte moderne;
- bundle CSS/JS versionat pentru integrare legacy;
- CDN oficial cu versiuni imutabile și Subresource Integrity;
- release-uri GitHub și arhive pentru self-hosting;
- startere și integrări CMS.

## Actualizare

- patch: actualizare automatizabilă după testare;
- minor: pull request automat și verificare;
- major: ghid de migrare, codemod și perioadă de tranziție;
- fără schimbări necontrolate ale tuturor site-urilor dintr-un fișier central `latest.js`.

## Decizii de arhitectură

Deciziile semnificative se consemnează în `docs/architecture/decisions/` sub formă de ADR.
