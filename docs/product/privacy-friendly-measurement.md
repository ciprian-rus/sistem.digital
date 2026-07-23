# Măsurare cu protecția vieții private

## Scop

Sistem Digital măsoară exclusiv calitatea tehnică necesară pentru îmbunătățirea platformei. Implementarea M3 nu introduce profilare, publicitate, identificatori proprii, cookie-uri de analytics sau un serviciu extern de stocare.

## Schema Core Web Vitals

Browserul trimite prin `POST /api/web-vitals` numai:

- `name`: CLS, FCP, FID, INP, LCP sau TTFB;
- `value`: valoarea numerică finită, normalizată la trei zecimale;
- `rating`: `good`, `needs-improvement`, `poor` sau `unknown`.

Endpointul respinge:

- corpuri mai mari de 1 KiB;
- metrici necunoscute;
- valori negative, nefinite sau nerezonabile;
- ratinguri în afara listei permise.

ID-ul generat de biblioteca Web Vitals, URL-ul, query parameters, referrer-ul, user agent-ul, conținutul formularelor și textul căutărilor nu sunt incluse în obiectul logat.

## Domeniu

Raportarea este activă numai când `window.location.hostname` este `sistem.digital` sau `www.sistem.digital`. Preview-urile Vercel, localhost-ul și testele automate nu generează evenimente de performanță.

## Stocare și retenție

Metricile validate sunt scrise ca JSON structurat în Runtime Logs Vercel. Aplicația:

- nu are o bază de date de analytics;
- nu configurează un drain;
- nu exportă sau combină metricile cu alte seturi de date;
- nu păstrează o copie după expirarea logurilor furnizorului.

Retenția este limita planului Vercel activ. La 23 iulie 2026, documentația furnizorului indică o oră pentru Hobby, o zi pentru Pro și trei zile pentru Enterprise. Observability Plus poate extinde retenția la 30 de zile. Administratorul trebuie să verifice această limită înaintea oricărei schimbări de plan și să actualizeze pagina publică `/guvernanta/masurare`.

## Feedback pe pagină

Feedback-ul este construit ca link către un issue GitHub precompletat. Deschiderea linkului nu trimite date proiectului. Utilizatorul poate revizui, modifica sau abandona conținutul înainte de publicare. URL-urile de feedback folosesc numai calea canonică și elimină parametrii și fragmentele.

## Schimbări viitoare

Orice introducere a pageviews, custom events, stocare persistentă, identificatori, geolocație, referrer, user agent sau integrare terță necesită:

1. evaluarea necesității și proporționalității;
2. actualizarea documentației publice înainte de activare;
3. teste care blochează colectarea accidentală de query parameters și conținut;
4. o perioadă explicită de retenție și un proces de ștergere;
5. aprobarea prin pull request și evidență în changelog.
