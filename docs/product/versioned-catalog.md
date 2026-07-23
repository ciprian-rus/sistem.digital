# Catalogul versionat Sistem Digital

## Obiectiv

Catalogul face legătura verificabilă dintre documentația publică și pachetele distribuite. O intrare nu poate afișa o versiune, un import sau un export care nu există în repository.

## Domeniu MVP

Catalogul include:

- fundamentele distribuite prin `@sistem-digital/tokens`;
- toate componentele enumerate public de `@sistem-digital/components`;
- versiunea și canalul documentat;
- familia și stadiul;
- importul CSS;
- exporturile JavaScript opționale;
- markup-ul canonic;
- preview-ul generat din același markup;
- pagina familiei, codul sursă și changelog-ul.

## Sursa de adevăr

`apps/website/src/content/catalog-data.mjs` este registry-ul editorial executabil. El produce:

- lista filtrabilă de la `/componente/catalog`;
- paginile statice individuale `/componente/catalog/[slug]`;
- indexul de căutare;
- metadata afișată;
- preview-ul și blocul de cod.

Inventarele publice ale componentelor rămân definite în pachet:

- `formComponentNames`;
- `navigationComponentNames`;
- `contentComponentNames`;
- `interactiveComponentNames`.

Registry-ul nu înlocuiește aceste inventare. CI verifică egalitatea exactă dintre ele.

## Sincronizarea automată

`scripts/check-catalog.mjs` oprește CI când:

- lipsește o componentă publicată din catalog;
- catalogul conține o componentă care nu mai este publicată;
- versiunea documentată diferă de `package.json`;
- importul CSS nu există în `exports`;
- un helper JavaScript nu este exportat public;
- pagina de documentație a familiei lipsește;
- există ID-uri duplicate;
- markup-ul este gol sau conține scripturi ori event handlers inline;
- ruta dinamică pentru paginile individuale lipsește.

Verificarea rulează prin:

```bash
pnpm catalog:check
```

și este inclusă în `pnpm check`.

## Preview și cod

Fiecare intrare are un singur câmp `markup`. Același șir este:

1. redat în preview;
2. afișat în blocul „Markup canonic”;
3. verificat pentru semnături HTML nesigure;
4. testat în browser pentru componentele interactive.

Nu menținem o componentă demonstrativă separată de exemplul copiat de utilizator.

## Versionare

Versiunea este explicită pentru fiecare intrare. Înaintea unui release:

1. Changesets actualizează versiunile pachetelor;
2. registry-ul este actualizat în același pull request;
3. `catalog:check` verifică egalitatea;
4. documentația și tarball-urile sunt construite;
5. release-ul publică pachetele, SBOM-ul și hash-urile.

Un catalog care documentează o versiune anterioară trebuie să indice explicit acest lucru și să ofere acces la documentația curentă.

## Stadii

- `alpha` — API-ul și markup-ul se pot schimba cu instrucțiuni de migrare;
- `stable` — contractul public respectă politica de compatibilitate;
- `deprecated` — componenta rămâne documentată temporar, dar nu se recomandă pentru implementări noi.

Canalul de release este separat de stadiul unei intrări, chiar dacă în MVP toate intrările folosesc canalul `alpha`.

## Filtre și URL-uri

Filtrele folosesc query parameters și funcționează server-side:

- `q` — text;
- `tip` — fundament sau componentă;
- `familie` — familia tehnică;
- `stadiu` — alpha, stable sau deprecated.

Exemplu:

```text
/componente/catalog?tip=component&familie=interactive&stadiu=alpha
```

URL-ul poate fi distribuit și funcționează fără JavaScript.

## Securitate

Markup-ul catalogului este cod intern aprobat prin pull request. Nu este acceptat conținut HTML furnizat de utilizatori sau încărcat dintr-o sursă externă. Orice introducere viitoare a unui CMS trebuie să înlocuiască randarea directă cu o politică explicită de sanitizare și allowlist.
