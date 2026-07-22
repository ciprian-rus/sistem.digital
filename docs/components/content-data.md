# Conținut și afișare a datelor

**Stadiu:** alpha · **Pachet:** `@sistem-digital/components` · **CSS:** `content.css`

## Obiectiv

Componentele ajută instituțiile să publice informații, statusuri și date fără a pierde relațiile semantice dintre elemente. HTML-ul corect este contractul de bază; clasele oferă prezentarea oficială.

## Inventar

- link și link extern;
- alertă și notification banner;
- inset text;
- card;
- tag/status;
- tabel responsive;
- summary list;
- details;
- pagination;
- metadata și data ultimei actualizări.

## Linkuri

Textul linkului descrie destinația sau acțiunea. Evită „click aici”, URL-uri brute și mai multe linkuri cu același nume care duc în locuri diferite.

Un link extern trebuie să ofere un indiciu vizual și o explicație accesibilă când deschiderea altui site este relevantă:

```html
<a class="sd-link sd-link--external" href="https://exemplu.ro">
  Registrul oficial
  <span class="sd-visually-hidden"> (site extern)</span>
</a>
```

Nu folosi atributul `target="_blank"` implicit. Când este necesar, anunță în text că se deschide o fereastră sau filă nouă.

## Alertă și notification banner

Alerta explică o stare locală. Notification banner comunică rezultatul unei operațiuni sau o informație importantă la nivel de pagină.

Fiecare mesaj include:

- titlu scurt;
- explicație și pas următor;
- text care exprimă starea;
- simbol opțional, marcat `aria-hidden="true"`;
- culoare doar ca semnal suplimentar.

Nu adăuga `role="alert"` mesajelor prezente la încărcarea inițială. Live regions se folosesc numai pentru actualizări dinamice și după testare cu cititoare de ecran.

## Inset text

Inset text evidențiază informație secundară care trebuie observată, dar nu este avertizare, eroare sau rezultat al unei operațiuni.

Nu îl folosi pentru:

- informații critice;
- termene obligatorii;
- erori;
- citate decorative;
- paragrafe lungi care ar trebui să rămână în fluxul normal.

## Carduri

Cardul grupează conținut relaționat. Nu înlocuiește automat o listă simplă.

### O singură destinație

Când cardul are o singură destinație, linkul din titlu poate extinde zona activă peste card. Nu include alte linkuri, butoane sau controale în aceeași zonă.

### Mai multe acțiuni

Când sunt necesare mai multe acțiuni, folosește `sd-card--actions`. Linkurile rămân explicite și nu există overlay peste card.

Nu cuibări elemente interactive și nu transforma textul descriptiv într-o zonă de click ambiguă.

## Tag și status

Tag-ul clasifică ori exprimă o stare scurtă. Textul este obligatoriu: „Activ”, „Expirat”, „Necesită verificare”.

Nu folosi doar puncte colorate, iconuri fără nume sau coduri interne. Statusul juridic ori operațional trebuie să poată fi înțeles în text simplu și la imprimare alb-negru.

## Tabel responsive

Tabelul se folosește numai când datele au relații reale între rânduri și coloane.

Cerințe:

- `caption` descrie tabelul;
- anteturile folosesc `th` și `scope`;
- primul antet de rând folosește `scope="row"` când este relevant;
- numerele sunt aliniate la final și formatate consecvent;
- moneda și unitatea sunt explicite;
- tabelele nu sunt folosite pentru layout.

Pentru tabele care nu pot face reflow fără pierderea relațiilor, overflow-ul este local:

```html
<div
  class="sd-table-container"
  role="region"
  aria-label="Situația plăților; tabel derulabil orizontal"
  tabindex="0"
>
  <table class="sd-table">...</table>
</div>
```

Regiunea primește focus numai când există overflow sau când utilizatorul trebuie să o deruleze cu tastatura. Nu transforma fiecare tabel mic într-o regiune suplimentară.

## Summary list

Summary list reprezintă perechi cheie–valoare și folosește `dl`, `dt`, `dd`.

```html
<dl class="sd-summary-list">
  <div class="sd-summary-list__row">
    <dt class="sd-summary-list__key">Cod fiscal</dt>
    <dd class="sd-summary-list__value">12345678</dd>
    <dd class="sd-summary-list__actions">
      <a href="/modifica">
        Modifică <span class="sd-visually-hidden">codul fiscal</span>
      </a>
    </dd>
  </div>
</dl>
```

Acțiunile repetate includ context ascuns vizual. Nu folosi summary list pentru date care trebuie comparate între mai multe entități; pentru acestea este mai potrivit tabelul.

## Details

Componenta folosește elementele native `details` și `summary`. Funcționează fără JavaScript și expune starea deschis/închis tehnologiilor asistive.

Folosește details pentru informație suplimentară, nu pentru:

- conținut esențial necesar finalizării unei operațiuni;
- erori;
- acorduri juridice care trebuie citite;
- navigație principală complexă;
- ascunderea implicită a majorității paginii.

Titlul summary trebuie să descrie informația ascunsă.

## Pagination

Pagination se folosește când setul are mai multe pagini reale cu URL-uri stabile.

- containerul este `nav` cu nume accesibil;
- pagina curentă folosește `aria-current="page"`;
- linkurile anterior/următor folosesc `rel="prev"` și `rel="next"`;
- fiecare număr are nume accesibil „Pagina N”;
- filtrarea ori încărcarea incrementală nu este prezentată în mod fals drept pagination.

## Metadata și ultima actualizare

Metadata explică proveniența, versiunea, licența, autorul sau alte atribute scurte. Data ultimei actualizări folosește elementul `time` cu valoare ISO:

```html
<p class="sd-last-updated">
  Ultima actualizare:
  <time datetime="2026-07-22T18:30:00+03:00">22 iulie 2026, ora 18:30</time>
</p>
```

Nu afișa „actualizat recent” fără o dată exactă. Separă data publicării, data modificării și perioada de referință când au sensuri diferite.

## Formatarea datelor și numerelor

- folosește locale `ro-RO` pentru afișare în limba română;
- nu formata identificatori precum CNP, CUI sau cod poștal ca numere matematice;
- păstrează zerourile inițiale;
- moneda este explicită;
- procentele includ simbolul `%` și baza de calcul;
- datele calendaristice evită forme ambigue precum `03/04/26`;
- valorile lipsă sunt explicate prin text, nu prin `0` inventat.

## Responsive și reflow

- cardurile trec la o singură coloană;
- summary list trece de la grilă la bloc;
- pagination devine verticală;
- tabelul păstrează relațiile și folosește overflow local;
- pagina nu produce scroll orizontal global la 320 CSS px;
- conținutul lung poate rupe URL-uri și identificatori fără tăiere.

## Accesibilitate

Testarea minimă include:

- ierarhia titlurilor;
- numele linkurilor și contextul acțiunilor repetate;
- statusuri inteligibile fără culoare;
- tabel cu caption, anteturi și scope;
- derularea tabelului cu tastatura;
- details cu Enter și Space;
- pagination și pagina curentă;
- reflow la 320 CSS px;
- light, dark, high-contrast și forced colors;
- print și cititoare de ecran conform matricei proiectului.

Testele automate nu pot valida dacă un tabel este modelul informațional corect sau dacă statusul folosește limbajul înțeles de utilizatori. Acestea necesită evaluare manuală și cercetare.

## Pagina demonstrativă

Implementarea de referință este disponibilă la `/componente/continut-date` pe platforma Sistem Digital. Valorile și instituțiile din exemple sunt demonstrative și sunt marcate ca atare.
