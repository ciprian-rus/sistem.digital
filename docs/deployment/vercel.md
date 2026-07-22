# Deployarea platformei pe Vercel

## Proiect

Repository: `ciprian-rus/sistem.digital`

Setări recomandate la import:

- Team: `ciprianrus`;
- Project name: `sistem-digital`;
- Framework preset: Next.js;
- Root Directory: `apps/website`;
- Production branch: `main`;
- Node.js: 24.x;
- Install Command: preluată din `apps/website/vercel.json`;
- Build Command: preluată din `apps/website/vercel.json`;
- Output Directory: valoarea implicită Next.js.

Build-ul compilează mai întâi `@sistem-digital/tokens`, apoi aplicația `@sistem-digital/website`. Acest pas este obligatoriu deoarece website-ul consumă pachetul intern prin workspace.

## Domenii

Domeniul principal recomandat este:

- `sistem.digital` — Production;
- `www.sistem.digital` — redirect permanent către `sistem.digital`.

Domeniul se adaugă numai după primul deployment verde. Vercel va afișa în ecranul Domains înregistrările DNS exacte necesare. Dacă DNS-ul rămâne la registrarul actual, se copiază acele înregistrări fără schimbarea nameserverelor. Dacă zona DNS este mutată la Vercel, se folosesc nameserverele comunicate în dashboard.

Nu se păstrează simultan înregistrări A, AAAA sau CNAME vechi care indică spre alt hosting pentru același hostname.

## Variabile de mediu

Versiunea publică actuală nu necesită variabile de mediu. Orice variabilă viitoare trebuie:

- definită separat pentru Production și Preview;
- documentată într-un fișier `.env.example` fără secrete;
- marcată encrypted în Vercel când conține credențiale;
- verificată înaintea promovării deployment-ului în Production.

## Verificare după deploy

- homepage răspunde cu status 200;
- tema este aplicată fără flash vizual;
- selectorul de temă persistă preferința;
- `sistem.digital` folosește HTTPS valid;
- `www.sistem.digital` redirecționează către domeniul canonic;
- preview deployments rămân disponibile pentru pull requests;
- build-ul nu conține avertismente privind versiunea Node sau pachetele workspace.
