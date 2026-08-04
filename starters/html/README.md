# Starter HTML

Un punct de plecare minimal pentru un serviciu public digital, construit direct
din pachetele publicate `@sistem-digital/tokens` și `@sistem-digital/components`
— fără bundler, fără framework, fără build complex.

Acest starter **nu copiază** sursa internă a componentelor. El declară o
dependență npm reală, la fel ca orice alt proiect care consumă Sistem Digital,
și copiază local doar fișierele CSS/JS deja publicate în pachete (canalul „npm”
din [`docs/distribution/channels.md`](../../docs/distribution/channels.md)).
Diferența față de [exemplul self-hosted](../../docs/distribution/self-hosting.md)
e că versiunea e gestionată prin `package.json`/lockfile, nu prin descărcarea
manuală a unei arhive ZIP.

## Instalare

```sh
npm install
npm run assets:sync
```

`assets:sync` copiază CSS-ul și JavaScript-ul necesare din
`node_modules/@sistem-digital/*` în `public/vendor/` — singurul pas care ține
loc de „build”. Nu există niciun bundler, transpiler sau pas de compilare.

## Previzualizare locală

```sh
npm run dev
```

Pornește un server static minimal (fără dependențe) pe
`http://localhost:4173`. Orice alt server static (`npx serve public`, Nginx,
Apache) funcționează la fel de bine — `npm run dev` există doar pentru
comoditate.

## Actualizare

```sh
npm update @sistem-digital/tokens @sistem-digital/components
npm run assets:sync
```

Verifică vizual pagina și lista de modificări din `CHANGELOG.md` al fiecărui
pachet înainte de a înlocui versiunea activă în producție, conform politicii
de actualizare din [`docs/distribution/self-hosting.md`](../../docs/distribution/self-hosting.md).

## Structură

```text
starters/html/
  package.json          # dependențe reale, versionate, către npm
  scripts/
    sync-assets.mjs      # copiază CSS/JS din node_modules în public/vendor
    serve.mjs             # server static minimal, doar pentru previzualizare
  public/
    index.html            # pagina de pornire
    vendor/                # generat de assets:sync — nu se versionează
```

## Ce include pagina de pornire

`public/index.html` demonstrează, cu markup canonic din catalogul Sistem
Digital:

- `skip-link`, `official-banner`, `institution-header` cu navigație principală;
- un formular cu `label`, `input`, `fieldset`/`legend` pentru alegere
  exclusivă și un `character-count` cu accesibilizare JavaScript reală
  (`enhanceCharacterCount`, din `@sistem-digital/components`);
- un `alert` informativ și un `footer` instituțional.

## Accesibilitate, SEO și securitate de bază

- HTML semantic, cu un singur `<h1>`, `lang="ro"` și `skip-link` funcțional
  fără JavaScript.
- `viewport` corect setat; `meta description` completată — înlocuiește-o cu
  textul real al serviciului tău înainte de publicare.
- `meta name="robots" content="noindex"` este intenționat — elimină-l când
  pagina e gata de indexare publică.
- Fără JavaScript inline, fără dependență de un CDN extern — toate resursele
  sunt servite din același domeniu, ceea ce simplifică o politică
  Content-Security-Policy strictă (configurată la nivel de server, nu prin
  `<meta>` — un CSP real trebuie să acopere și `frame-ancestors`, imposibil de
  exprimat printr-un tag `<meta>`).
- Tema (deschisă/închisă/contrast înalt) e inițializată înainte de randare, prin
  `theme-init.js`, pentru a evita un „flash” vizual la încărcare.

## Personalizare instituțională

Înlocuiește textul din `.sd-identity__name`, `.sd-identity__service` și
`.sd-footer__heading`, apoi urmează
[politica de personalizare instituțională](../../docs/product/customization-policy.md)
pentru variantele acceptate de logo, culoare de accent și conținut.
