# Header, footer, navigație, breadcrumb și căutare

**Stadiu:** alpha · **Pachet:** `@sistem-digital/components` · **CSS:** `navigation.css`

## Obiectiv

Componentele de structură ajută utilizatorul să răspundă rapid la cinci întrebări:

1. pe ce site se află;
2. cine operează site-ul;
3. care este domeniul oficial;
4. unde se află în structură;
5. cum ajunge la altă pagină sau resursă.

## Banner de autenticitate

Bannerul de autenticitate apare înaintea header-ului și explică explicit statutul site-ului și domeniul oficial.

```html
<section class="sd-official-banner" aria-label="Informație despre autenticitate">
  <div class="container sd-official-banner__inner">
    <span class="sd-official-banner__mark" aria-hidden="true">SD</span>
    <p>
      Proiect open-source independent. Domeniul oficial este
      <a href="https://sistem.digital">sistem.digital</a>.
    </p>
  </div>
</section>
```

Pentru un site public oficial, textul trebuie să indice instituția responsabilă și domeniul instituțional. Nu se folosesc formulări care pot sugera statut guvernamental atunci când acesta nu există.

## Alertă majoră

Alerta majoră se folosește numai pentru:

- indisponibilități sau incidente importante;
- schimbări cu impact asupra majorității utilizatorilor;
- termene ori obligații imediate;
- informații de siguranță.

Nu se folosește pentru campanii, noutăți obișnuite sau mesaje promoționale. Titlul și conținutul sunt textuale; culoarea și simbolul sunt semnale suplimentare.

## Identitate și header

Header-ul separă:

- identitatea instituției sau produsului;
- numele serviciului tranzacțional, când există;
- domeniul oficial;
- instrumentele globale: căutare și preferințe;
- navigația principală.

```html
<a class="sd-identity" href="/" aria-label="Instituția — pagina principală">
  <span class="sd-identity__mark" aria-hidden="true">IN</span>
  <span class="sd-identity__text">
    <span class="sd-identity__name">Instituția Națională</span>
    <span class="sd-identity__service">Solicită un document</span>
    <span class="sd-identity__domain">institutie.gov.ro</span>
  </span>
</a>
```

Logo-ul nu înlocuiește denumirea text. Domeniul nu este ascuns în tooltip ori imagine.

## Navigație desktop

- folosește elementul `nav` și un nume accesibil;
- folosește listă neordonată;
- linkul paginii curente are `aria-current="page"`;
- fiecare target are minimum 44 CSS px;
- numărul elementelor principale rămâne redus și stabil;
- denumirile descriu destinația, nu structura internă a instituției.

## Navigație mobilă

Varianta alpha folosește disclosure HTML nativ:

```html
<details class="sd-mobile-navigation">
  <summary class="container">Meniu</summary>
  <nav class="container" aria-label="Navigație principală mobilă">
    <ul class="sd-mobile-navigation__list">
      <li><a href="/servicii">Servicii</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </nav>
</details>
```

Avantaje:

- funcționează fără JavaScript;
- starea deschis/închis este expusă platformei de accesibilitate;
- se operează nativ cu Enter și Space;
- dacă CSS nu se încarcă, conținutul rămâne disponibil.

Ordinea linkurilor este aceeași cu desktop. Nu se mută focusul automat la deschidere și nu se folosește `tabindex` pozitiv.

## Breadcrumb

Breadcrumb-ul arată ierarhia paginii în site:

- folosește `nav aria-label="Breadcrumb"`;
- folosește listă ordonată;
- pagina curentă nu este link și are `aria-current="page"`;
- separatorul este generat vizual și nu este anunțat ca informație utilă;
- nu include pagina principală de mai multe ori;
- nu se folosește pentru pașii unui formular.

## Service navigation

Service navigation arată secțiunile unui serviciu sau ale unei documentații. Este distinctă de navigația principală și breadcrumb.

- are un titlu clar;
- are un nume accesibil distinct;
- folosește `aria-current="page"` pentru secțiunea curentă;
- rămâne vizibilă când există suficiente secțiuni pentru a justifica navigația locală;
- nu dublează pașii unui task linear — pentru aceștia va exista componenta step indicator.

## Căutare

Căutarea canonică folosește GET:

```html
<form class="sd-search" action="/cautare" method="get" role="search">
  <label class="sd-search__label" for="site-search">Caută în site</label>
  <input class="sd-search__input" id="site-search" name="q" type="search" />
  <button class="sd-search__button" type="submit">Caută</button>
</form>
```

Rezultatele au URL stabil, de exemplu `/cautare?q=formulare`. Căutarea de bază și rezultatele server-rendered funcționează fără JavaScript.

Reguli:

- label-ul există chiar dacă este ascuns vizual;
- butonul are text, nu doar icon;
- query-ul rămâne în câmp pe pagina de rezultate;
- titlul anunță numărul de rezultate și termenul;
- starea fără rezultate oferă pași următori;
- rezultatele sunt linkuri normale și pot fi deschise în tab nou.

## Footer

Footer-ul conține:

- descriere scurtă și responsabilitatea site-ului;
- resurse importante;
- guvernanță, contribuții și contact;
- licență și statutul versiunii;
- domeniul oficial când acest lucru ajută la verificare.

Footer-ul nu repetă fiecare element din navigația principală și nu ascunde informații critice care ar trebui să apară înaintea conținutului.

## Variante

### Site instituțional

Afișează denumirea legală, identitatea vizuală aprobată, domeniul oficial, navigația instituțională și instrumentele globale.

### Serviciu tranzacțional

Păstrează instituția și domeniul, dar adaugă numele serviciului. Navigația este redusă pentru a nu distrage utilizatorul de la task. Un serviciu critic poate elimina navigația principală, dar păstrează întotdeauna identitatea, domeniul, skip link-ul și ieșirea sigură.

## Responsive și reflow

- sub `48rem`, navigația desktop este ascunsă, iar disclosure-ul mobil devine vizibil;
- căutarea ocupă lățimea disponibilă;
- identitatea și instrumentele se așază vertical;
- footer-ul trece la o singură coloană;
- la 320 CSS px nu apare scroll orizontal global;
- textele lungi și domeniile se pot rupe fără a tăia conținutul.

## Accesibilitate

Testarea minimă include:

- landmark-uri și denumiri distincte;
- skip link ca primul target;
- focus order: autenticitate, identitate, căutare, preferințe, navigație;
- meniul mobil cu JavaScript dezactivat;
- `aria-current` pe pagina activă;
- target-uri de minimum 44 CSS px;
- reflow la 320 CSS px;
- toate temele și forced colors;
- NVDA, JAWS, VoiceOver și TalkBack conform matricei proiectului.

## Anti-pattern-uri

- logo fără denumire textuală;
- domeniu oficial ascuns;
- hamburger construit din `div` fără nume și stare accesibilă;
- două navigații cu același `aria-label` vizibile simultan;
- link activ semnalat numai prin culoare;
- căutare declanșată exclusiv prin JavaScript;
- breadcrumb folosit drept indicator de progres;
- alertă majoră folosită pentru conținut promoțional.

## Pagina demonstrativă

Implementarea de referință este disponibilă la `/componente/navigatie`. Căutarea funcțională este disponibilă la `/cautare`.
