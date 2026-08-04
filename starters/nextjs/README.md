# Starter Next.js

Un punct de plecare Next.js (App Router) pentru un serviciu public digital,
construit din pachetele publicate `@sistem-digital/tokens` și
`@sistem-digital/components` — la fel ca [starterul HTML](../html/README.md),
dar cu build real (Next.js) în loc de fișiere statice.

Ca și starterul HTML, acesta **nu copiază** sursa internă a componentelor —
declară dependențe npm reale, versionate.

## De ce nu `@sistem-digital/react`

Pachetul `@sistem-digital/react` (hook-uri React oficiale, de exemplu
`useSistemDigitalEnhancements`, folosit de `apps/website` din acest
monorepo) **nu este încă publicat pe npm** — o verificare directă a
registry-ului la data acestui starter întoarce `404`. Doar
`@sistem-digital/tokens` și `@sistem-digital/components` sunt publicate
efectiv (vezi #72).

Până la publicarea `@sistem-digital/react`, acest starter apelează direct
`enhanceInteractiveComponents` din `@sistem-digital/components`, într-o
componentă client mică (`src/components/interactive-enhancements.tsx`) —
exact ce face hook-ul intern, fără dependența suplimentară. Când
`@sistem-digital/react` va fi publicat, componenta poate fi înlocuită cu
`useSistemDigitalEnhancements()`, ca în `apps/website`.

## Instalare

```sh
npm install
npm run dev
```

Aplicația pornește pe `http://localhost:3000`.

## Actualizare

```sh
npm update @sistem-digital/tokens @sistem-digital/components
```

Verifică `CHANGELOG.md` al fiecărui pachet înainte de a trimite versiunea
nouă în producție.

## Structură

```text
starters/nextjs/
  next.config.ts          # transpilePackages pentru pachetele ESM publicate
  src/
    app/
      layout.tsx            # import CSS, inițializare temă, enhancement global
      page.tsx               # pagina de pornire
      globals.css             # reset minimal
    components/
      interactive-enhancements.tsx  # vezi „De ce nu @sistem-digital/react”
```

## Ce include pagina de pornire

`src/app/page.tsx` demonstrează, cu markup canonic din catalogul Sistem
Digital: `skip-link`, `official-banner`, `institution-header` cu navigație,
un `accordion` cu accesibilizare JavaScript reală
(`enhanceInteractiveComponents`), un formular cu `label`/`input`/
`fieldset`/`legend` și un `alert` informativ.

## Accesibilitate, SEO și securitate de bază

Aceleași principii ca la [starterul HTML](../html/README.md#accesibilitate-seo-și-securitate-de-bază):
HTML semantic, `skip-link` funcțional, `lang="ro"`, `robots` setat la
`noindex` până la publicare, fără CDN extern. Next.js adaugă în plus tipare
și randare server-side — păstrează-le: nu muta logica de enhancement
JavaScript din componenta client dedicată în componente server.

## Personalizare instituțională

La fel ca la starterul HTML — vezi
[politica de personalizare instituțională](../../docs/product/customization-policy.md).
