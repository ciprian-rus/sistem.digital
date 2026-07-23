# Constatări — auditul serviciilor publice digitale din România

## Stare și acoperire

Evaluarea publică a celor 24 de trasee a fost executată la 23 iulie 2026, fără conturi, date personale, rezolvarea CAPTCHA sau trimiterea unor cereri reale.

- 24/24 produse au o observație trasabilă;
- 16 observații sunt confirmate prin conținut public reproductibil;
- 6 sunt probabile, din cauza accesului parțial sau a autentificării;
- 2 rămân ipoteze și nu sunt folosite singure pentru decizii de produs;
- 7 exemple pozitive au fost păstrate cu aceeași rigoare ca problemele.

Auditul nu este o certificare WCAG și nu măsoară rata reală de abandon. Verificarea completă la 390 px, zoom 200%/400%, tastatură și cititor de ecran rămâne de executat în auditul manual #53 pe un subset stratificat.

## 1. Pagina de serviciu trebuie să explice tranzacția înainte de autentificare

Nivel de încredere: `probable`.

Semnalul apare în ANPC, SPV și ONRC, din cel puțin două categorii. Utilizatorul ajunge la cont sau la un portal separat înainte de a avea într-un singur loc rezultatul, condițiile, termenul, tariful și metoda de identificare.

Contraexemplele utile sunt Ghișeul.ro și UVT: ambele explică efectul autentificării ori întregul proces înainte de transfer.

Decizie: Sistem Digital are nevoie de un pattern „Înainte să începi” și de un rezumat standard al autentificării, nu doar de o componentă de login.

## 2. Continuitatea între domenii este parte din serviciu

Nivel de încredere: `probable`.

CNRED, ANPC, SPV, ONRC, Constanța, Ciugud și UVT traversează domenii sau produse distincte. Schimbarea nu este în sine un defect; problema apare când nu este anticipată, instituția responsabilă nu rămâne vizibilă sau contextul sarcinii se pierde.

Constanța și UVT oferă practici reutilizabile: identificarea autorității pe destinație și explicarea pașilor înaintea trecerii.

Decizie: se adaugă un pattern pentru transfer extern sigur, cu numele operatorului, motivul transferului, datele care vor fi cerute și o cale clară de întoarcere.

## 3. Documentul descărcabil este prea des substitut pentru serviciu

Nivel de încredere: `probable`.

Ministerul Sănătății, VMI, Oradea și UBB folosesc PDF-uri sau formulare descărcabile pentru părți centrale ale sarcinii. În unele cazuri documentul este justificat, dar pagina HTML nu rezumă întotdeauna complet eligibilitatea, actele, costul, termenul și canalul.

Decizie: pattern-ul pentru documente trebuie să ceară un rezumat HTML și să trateze PDF-ul ca anexă, nu ca unic purtător al procedurii.

## 4. Inițierea fără urmărire nu este un serviciu digital complet

Nivel de încredere: `probable`.

HUB MAI, Cluj-Napoca, Constanța și SJU Bistrița arată că programarea sau depunerea poate include verificare de status, notificare ori anulare. Pentru alte trasee, auditul a găsit doar inițierea sau canalul de contact.

Decizie: modelul de serviciu trebuie să includă explicit stările `draft`, `trimis`, `înregistrat`, `în verificare`, `necesită completări`, `soluționat`, `respins`, plus confirmare, anulare și reluare acolo unde se aplică.

## 5. Alternativele de canal trebuie comparate, nu doar enumerate

Nivel de încredere: `probable`.

Ghișeul.ro explică diferența funcțională dintre plata cu și fără cont; SJU Bistrița spune că locurile sunt identice online, telefonic și la recepție; Ciugud enumeră patru canale electronice. Acestea reduc incertitudinea fără a pretinde că toate canalele sunt echivalente.

Decizie: se adaugă un pattern de alegere a canalului cu disponibilitate, condiții, cost, timp, accesibilitate și efect asupra urmăririi.

## 6. Găsirea după rezultatul dorit rămâne neuniformă

Nivel de încredere: `probable`.

ANAF, Brașov, Florești și UBB nu au oferit în limita traseului public o destinație unică, ușor de confirmat pentru sarcina formulată. Aceste cazuri nu demonstrează absența serviciului, ci o problemă de găsire sau o limitare a auditului.

Cluj-Napoca, HUB MAI și UVT folosesc acțiuni explicite și puncte de intrare orientate pe sarcină.

Decizie: taxonomia și căutarea trebuie să indexeze rezultatul, sinonimele cetățeanului, instituția și evenimentul de viață. Ipoteza se validează prin #54 și cercetarea de teren #40–#42.

## Ce nu schimbăm încă

- Nu introducem un clasament al instituțiilor.
- Nu declarăm conformitate sau neconformitate WCAG.
- Nu tratăm autentificarea sau CAPTCHA ca defect automat.
- Nu transformăm cele două trasee negăsite în dovada absenței serviciului.
- Nu generalizăm impactul comportamental fără participanți și date operaționale.
