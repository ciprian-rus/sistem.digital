# Bugete de performanță

Sistem Digital tratează performanța ca pe un criteriu de acceptare, nu ca pe o optimizare
ulterioară. Buildul de producție verifică automat:

| Resursă                             |         Buget maxim |
| ----------------------------------- | ------------------: |
| JavaScript inițial comun App Router | 600 KiB necomprimat |
| CSS total publicat                  | 180 KiB necomprimat |
| LCP la percentila 75                |               2,5 s |
| INP la percentila 75                |              200 ms |
| CLS la percentila 75                |                 0,1 |

Bugetele de fișiere sunt aplicate reproductibil de
`apps/website/scripts/check-performance-budget.mjs` după fiecare `next build`. O depășire
oprește buildul și CI-ul.

Pragurile LCP, INP și CLS urmează clasificarea „good” din Core Web Vitals. Aplicația raportează
doar numele, valoarea și clasificarea metricii pe domeniul Production; nu setează cookie-uri și nu
păstrează o copie separată. Tendințele trebuie evaluate la percentila 75 după acumularea unui
eșantion suficient, nu pe baza unei singure încărcări.

Linkurile interne și paginile orfane sunt verificate pornind de la taxonomia canonică
`src/content/site-map.ts`. Sitemap-ul XML, navigația, breadcrumbs și căutarea folosesc aceeași
sursă, iar paginile dinamice ale catalogului sunt adăugate din registry-ul catalogului.
