# Starter WordPress

O temă WordPress clasică, minimală, pentru instituții publice mici — construită
din pachetele publicate `@sistem-digital/tokens` și `@sistem-digital/components`,
la fel ca [starterul HTML](../html/README.md) și
[starterul Next.js](../nextjs/README.md). Nu copiază sursa internă a
componentelor.

## Limitarea de verificare — citește înainte de a folosi

Acest starter **nu a fost testat într-un WordPress viu**. Mediul de dezvoltare
al acestui monorepo nu are acces la `wordpress.org` (blocat de politica de
rețea a mediului) și nu are un daemon Docker disponibil, deci nu a fost
posibil să instalăm WordPress și să verificăm tema din `wp-admin`, cu un
browser real — spre deosebire de starterele HTML și Next.js, verificate
integral cu Chromium și axe-core.

Ce **a fost** verificat static, fără WordPress rulând:

- sintaxa PHP a fiecărui fișier (`php -l`, prin `npm run lint`);
- consistența text domain-ului de traducere pe toate apelurile `__()`/`_e()`;
- antetul `style.css` conține toate câmpurile cerute de WordPress;
- `screenshot.png` există (schiță, nu o captură reală — vezi
  `scripts/generate-screenshot.php`).

Înainte de a folosi tema într-un site real, testeaz-o manual într-un mediu
WordPress local (de exemplu `wp-env`, Local, sau găzduirea ta) și rulează
pluginul [Theme Check](https://wordpress.org/plugins/theme-check/) oficial.

## De ce o temă clasică, nu un block theme (FSE)

Instituțiile mici vizate de acest starter au adesea găzduire simplă, fără
control asupra versiunii WordPress. O temă clasică (PHP + `style.css`, fără
`theme.json`) e compatibilă cu o gamă mai largă de instalări și rămâne mai
aproape de spiritul „fără build complex” al celorlalte startere.

## De ce nu npm în producție

Spre deosebire de starterul HTML, o temă WordPress nu poate presupune că
găzduirea rulează Node — majoritatea găzduirilor WordPress sunt PHP/MySQL
pur. De aceea, `npm`/`node` sunt folosite **doar local, la pregătirea temei**
(exact ca și canalul „self-hosted” din
[`docs/distribution/self-hosting.md`](../../docs/distribution/self-hosting.md)):
`npm run assets:sync` copiază CSS/JS din pachetele publicate în
`theme/assets/vendor/`, iar rezultatul (folderul `theme/`) e ce se încarcă
efectiv pe server — fără nicio dependență de Node acolo.

## Pregătire și instalare

```sh
npm install
npm run assets:sync
```

Apoi încarcă folderul `theme/` (redenumit, de exemplu, `sistem-digital-starter`)
în `wp-content/themes/` al instalării WordPress și activează-l din
Aspect → Teme.

## Actualizare

```sh
npm update @sistem-digital/tokens @sistem-digital/components
npm run assets:sync
```

Reîncarcă folderul `theme/` actualizat pe server. Versiunile fișierelor CSS/JS
enqueued se invalidează automat (`filemtime()`), deci browserele preiau
activele noi fără pași suplimentari.

## Structură

```text
starters/wordpress/
  scripts/
    sync-assets.mjs            # copiază CSS/JS din node_modules în theme/assets/vendor
    lint-php.mjs                 # php -l pe toate fișierele temei
    generate-screenshot.php       # regenerează theme/screenshot.png (schiță)
  theme/
    style.css                     # antetul cerut de WordPress
    functions.php                  # enqueue, meniuri, enhancement JS
    header.php / footer.php         # skip-link, official-banner, institution-header, footer
    index.php                        # șablon fallback (Loop standard)
    front-page.php                    # pagina de pornire demonstrativă
    screenshot.png                     # previzualizare în selectorul de teme
    assets/vendor/                      # generat de assets:sync — nu se versionează
```

## Configurare în wp-admin

- **Setări → General**: numele și descrierea site-ului apar în header/footer.
- **Aspect → Meniuri**: creează meniuri și asignează-le locațiilor „Meniu
  principal” și „Resurse din footer”; fără ele, footer-ul arată linkuri
  implicite, iar header-ul nu afișează navigație.

## Accesibilitate, SEO și securitate de bază

Aceleași principii ca la [starterul HTML](../html/README.md#accesibilitate-seo-și-securitate-de-bază):
HTML semantic, `skip-link` funcțional, fără CDN extern. `<title>` vine din
`add_theme_support('title-tag')` (standard WordPress). Toate string-urile
vizibile sunt traductibile (`__()`/`_e()`/`esc_html_e()`), cu text domain
`sistem-digital-starter`.

**Excepție de la „fără JavaScript inline”**: spre deosebire de starterele
HTML și Next.js, `functions.php` inserează două `<script>` inline —
inițializarea temei (`sistem_digital_starter_theme_init_inline`, necesară
înainte de primul paint, ca să evite un „flash” vizual) și bootstrap-ul
enhancement-ului JS (`sistem_digital_starter_print_enhancements`). Dacă
instituția configurează o politică Content-Security-Policy strictă fără
`'unsafe-inline'`, aceste două scripturi vor fi blocate implicit —
adaugă hash-urile lor (`'sha256-…'`) în `script-src` sau externalizează-le
în fișiere enqueued separate înainte de a activa un CSP strict.

## Personalizare instituțională

La fel ca la celelalte startere — vezi
[politica de personalizare instituțională](../../docs/product/customization-policy.md).
Monograma din header se calculează automat din primele două litere ale
numelui site-ului (Setări → General); pentru un logo real, adaptează
`sistem_digital_starter_identity_mark()` din `functions.php`.
