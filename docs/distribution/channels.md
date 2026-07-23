# Canale de distribuție

Sistem Digital publică aceeași versiune prin canale complementare. Versiunea din
`packages/tokens/package.json` este sursa unică pentru pachete și bundle-ul
static.

| Canal       | Consumator                       | Contract                                   | Imutabilitate              |
| ----------- | -------------------------------- | ------------------------------------------ | -------------------------- |
| npm         | aplicații cu build               | `exports`, tipuri și CSS selectiv          | versiune exactă + lockfile |
| ZIP         | site-uri legacy și medii izolate | `manifest.json`, `SHA256SUMS`, assets      | nume de arhivă versionat   |
| self-hosted | infrastructură instituțională    | conținutul ZIP sub `/releases/<versiune>/` | calea nu se suprascrie     |
| CDN         | integrare statică viitoare       | aceleași fișiere și SRI din manifest       | numai URL-uri versionate   |

Nu se publică aliasuri mutabile precum `latest.js` sau `latest.css` pentru
producție.

## Artefacte verificabile

`pnpm release:static` produce:

- CSS și JavaScript independente de framework;
- un exemplu HTML fără dependențe externe;
- `manifest.json` cu dimensiune, SHA-256 și Subresource Integrity;
- `SHA256SUMS`;
- o arhivă ZIP deterministă pentru self-hosting.

Pipeline-ul de release adaugă tarball-urile npm, SBOM-ul CycloneDX și atestările
GitHub.

## Politica CDN

Un CDN oficial poate expune numai căi de forma
`/releases/<versiune>/<fișier>`. Cache-ul pentru aceste căi poate fi permanent,
deoarece conținutul nu se schimbă. Un release nou primește o cale nouă.
Disponibilitatea CDN nu este o condiție pentru funcționarea serviciului:
instituțiile pot păstra aceleași artefacte local.
