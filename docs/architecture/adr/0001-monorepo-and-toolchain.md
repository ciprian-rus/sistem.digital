# ADR-0001: Monorepo și toolchain pentru Sistem Digital

- **Status:** propus
- **Data:** 22 iulie 2026
- **Decizie asociată:** #3

## Context

Sistem Digital va livra simultan aplicații publice, pachete independente de framework,
adaptoare și startere. Avem nevoie de build-uri reproductibile, versionare coerentă și
posibilitatea de a verifica numai proiectele afectate de o schimbare.

## Decizie

Adoptăm:

- Node.js 24 LTS pentru dezvoltare și CI;
- pnpm 11 cu workspaces și catalog central de versiuni;
- Turborepo pentru graful de task-uri și caching;
- TypeScript strict;
- Next.js App Router pentru platforma de documentație, fără a face design system-ul dependent de Next.js;
- CSS custom properties și exporturi TypeScript/JSON pentru token-uri;
- ESLint flat config, Prettier și Vitest;
- versiuni exacte și lockfile comis în repository.

## Consecințe

- pachetele de bază rămân consumabile fără React;
- aplicațiile pot evolua independent, dar folosesc aceleași verificări;
- upgrade-urile de toolchain sunt intenționate și auditate;
- Node.js 24 devine baseline-ul suportat pentru contribuții și CI;
- orice excepție de la această arhitectură necesită un ADR nou.
