# Self-hosting, actualizare și rollback

## Instalare

1. Descărcați arhiva `sistem-digital-<versiune>.zip` din release-ul GitHub.
2. Verificați SHA-256 al arhivei și al fișierelor față de release și
   `SHA256SUMS`.
3. Dezarhivați într-o cale imutabilă, de exemplu
   `/public/sistem-digital/releases/0.1.0-alpha.0/`.
4. Folosiți `index.html` ca probă locală și copiați referințele necesare în
   serviciu.
5. Pentru resurse încărcate de pe alt domeniu, copiați valoarea `integrity` din
   `manifest.json` și configurați CORS.

## Actualizare

Instalați versiunea nouă într-un director nou, verificați exemplul și
accesibilitatea serviciului, apoi schimbați toate referințele într-o singură
livrare. Nu suprascrieți directorul versiunii active.

## Rollback

Reveniți la referințele versiunii precedente. Fiindcă release-urile sunt
imutabile, rollback-ul nu cere reconstruire. Păstrați minimum versiunea curentă
și precedenta pe infrastructura instituției.

## Verificare locală

Rulați `pnpm release:static`, apoi serviți directorul
`release-artifacts/static` cu orice server HTTP static. Exemplul nu folosește
CDN, npm sau JavaScript de aplicație.
