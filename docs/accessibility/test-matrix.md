# Matricea de testare pentru accesibilitate

## Politica de suport

Sistem Digital validează comportamentul componentelor pe combinații reprezentative de browser, sistem de operare și tehnologie asistivă. „Ultima versiune” înseamnă versiunea stabilă curentă la data testului; rezultatul trebuie să consemneze numerele exacte ale versiunilor utilizate.

## Tier 1 — obligatoriu înainte de stabilizare

| Platformă | Browser | Tehnologie asistivă | Verificări principale |
|---|---|---|---|
| Windows 11 | Chrome stabil | NVDA stabil | nume, rol, stare, formulare, live regions, navigare și operare |
| Windows 11 | Edge stabil | tastatură și forced colors | focus, contrast, reflow, high contrast și operare fără pointer |
| macOS stabil | Safari stabil | VoiceOver | structură, rotor, anunțuri, dialoguri și controale native |
| Orice runner CI suportat | Chromium Playwright | axe-core | reguli detectabile automat pentru WCAG A și AA |

Toate combinațiile Tier 1 sunt release-blocking pentru componente și pattern-uri stabile.

## Tier 2 — obligatoriu pentru release-uri majore

| Platformă | Browser | Tehnologie asistivă | Frecvență |
|---|---|---|---|
| Windows 11 | Firefox stabil | NVDA stabil | release major și componente complexe |
| Windows 11 | Edge stabil | Narrator | release major |
| iOS stabil | Safari | VoiceOver | release major și componente mobile |
| Android stabil | Chrome | TalkBack | release major și componente mobile |
| macOS stabil | Chrome stabil | VoiceOver | release major |

O problemă Tier 2 critică sau serioasă blochează release-ul. Problemele moderate pot fi acceptate temporar numai prin procesul documentat pentru excepții.

## Tier 3 — compatibilitate extinsă

Se testează în funcție de datele de utilizare și de contextul serviciului:

- control vocal și speech recognition;
- magnificatoare de ecran;
- switch control;
- braille display;
- moduri de contrast și teme personalizate suplimentare;
- browsere administrate sau versiuni mai vechi încă utilizate în instituții;
- kiosk-uri și dispozitive cu metode alternative de intrare.

## Teste fără tehnologie asistivă

Fiecare componentă trebuie verificată și pentru:

- tastatură: `Tab`, `Shift+Tab`, `Enter`, `Space`, `Escape` și săgeți conform pattern-ului;
- pointer și touch, inclusiv target size și gesturi alternative;
- zoom 200%;
- viewport echivalent cu 320 pixeli CSS și zoom/reflow 400%;
- text spacing conform WCAG 1.4.12;
- `prefers-reduced-motion`;
- `forced-colors: active`;
- orientare portrait și landscape unde este relevant;
- limbă română și conținut mai lung decât exemplul implicit.

## Dovezi de testare

Pentru fiecare test manual se înregistrează:

- componenta și versiunea;
- pagina sau fixture-ul testat;
- sistemul de operare, browserul și tehnologia asistivă cu versiuni exacte;
- pașii executați;
- rezultatul așteptat și rezultatul observat;
- captură, înregistrare sau transcript atunci când ajută reproducerea;
- testerul și data;
- issue-ul asociat pentru orice problemă.

## Frecvența retestării

Retestarea Tier 1 este obligatorie când:

- se modifică markup-ul, rolurile, stările sau managementul focusului;
- se schimbă dependența care implementează comportamentul interactiv;
- apare o versiune majoră de browser sau tehnologie asistivă care modifică comportamentul;
- se remediază o problemă de accesibilitate;
- componenta trece din experimental în stable.

Matricea este revizuită minimum semestrial și după schimbări majore în ecosistemul browserelor sau tehnologiilor asistive.
