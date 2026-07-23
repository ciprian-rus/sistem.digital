const packageVersion = '0.1.0-alpha.0';

const familyDefinitions = {
  forms: {
    title: 'Formulare',
    cssImport: '@sistem-digital/components/forms.css',
    documentationHref: '/componente/formulare',
    sourceHref:
      'https://github.com/ciprian-rus/sistem.digital/blob/main/packages/components/src/forms.ts',
    names: [
      'label',
      'hint',
      'fieldset',
      'legend',
      'input',
      'textarea',
      'select',
      'checkbox',
      'radio',
      'error-message',
      'error-summary',
      'button',
      'button-group',
      'file-upload',
    ],
  },
  navigation: {
    title: 'Navigație',
    cssImport: '@sistem-digital/components/navigation.css',
    documentationHref: '/componente/navigatie',
    sourceHref:
      'https://github.com/ciprian-rus/sistem.digital/blob/main/packages/components/src/navigation.ts',
    names: [
      'official-banner',
      'major-alert',
      'institution-header',
      'desktop-navigation',
      'mobile-navigation',
      'breadcrumb',
      'service-navigation',
      'search',
      'footer',
      'skip-link',
    ],
  },
  content: {
    title: 'Conținut și date',
    cssImport: '@sistem-digital/components/content.css',
    documentationHref: '/componente/continut-date',
    sourceHref:
      'https://github.com/ciprian-rus/sistem.digital/blob/main/packages/components/src/content.ts',
    names: [
      'link',
      'external-link',
      'alert',
      'notification-banner',
      'inset-text',
      'card',
      'status-tag',
      'responsive-table',
      'summary-list',
      'details',
      'pagination',
      'metadata',
      'last-updated',
    ],
  },
  interactive: {
    title: 'Interactive',
    cssImport: '@sistem-digital/components/interactive.css',
    documentationHref: '/componente/interactive',
    sourceHref:
      'https://github.com/ciprian-rus/sistem.digital/blob/main/packages/components/src/interactive.ts',
    names: [
      'accordion',
      'dialog',
      'tabs',
      'step-indicator',
      'date-input',
      'autocomplete',
      'file-upload-advanced',
    ],
  },
};

const labels = {
  label: 'Label',
  hint: 'Text ajutător',
  fieldset: 'Fieldset',
  legend: 'Legend',
  input: 'Câmp text',
  textarea: 'Zonă de text',
  select: 'Listă de selecție',
  checkbox: 'Checkbox',
  radio: 'Radio',
  'error-message': 'Mesaj de eroare',
  'error-summary': 'Rezumatul erorilor',
  button: 'Buton',
  'button-group': 'Grup de butoane',
  'file-upload': 'Încărcare fișier',
  'official-banner': 'Banner de autenticitate',
  'major-alert': 'Alertă majoră',
  'institution-header': 'Header instituțional',
  'desktop-navigation': 'Navigație desktop',
  'mobile-navigation': 'Navigație mobilă',
  breadcrumb: 'Breadcrumb',
  'service-navigation': 'Navigație locală',
  search: 'Căutare',
  footer: 'Footer',
  'skip-link': 'Skip link',
  link: 'Link',
  'external-link': 'Link extern',
  alert: 'Alertă',
  'notification-banner': 'Banner de notificare',
  'inset-text': 'Text evidențiat',
  card: 'Card',
  'status-tag': 'Etichetă de stare',
  'responsive-table': 'Tabel responsive',
  'summary-list': 'Summary list',
  details: 'Details',
  pagination: 'Paginare',
  metadata: 'Metadate',
  'last-updated': 'Ultima actualizare',
  accordion: 'Accordion',
  dialog: 'Dialog',
  tabs: 'Tabs',
  'step-indicator': 'Indicator de pași',
  'date-input': 'Introducerea datei',
  autocomplete: 'Autocomplete',
  'file-upload-advanced': 'Încărcare avansată de fișiere',
};

const descriptions = {
  label: 'Identifică explicit un control de formular și rămâne vizibil permanent.',
  hint: 'Oferă instrucțiuni înaintea completării fără a înlocui label-ul.',
  fieldset: 'Grupează semantic controale care răspund aceleiași întrebări.',
  legend: 'Numește un grup de controale și este primul element din fieldset.',
  input: 'Colectează o valoare scurtă folosind tipul HTML potrivit.',
  textarea: 'Colectează text pe mai multe rânduri cu limită și instrucțiuni clare.',
  select: 'Permite alegerea unei valori dintr-o listă scurtă și stabilă.',
  checkbox: 'Permite selectarea independentă a uneia sau mai multor opțiuni.',
  radio: 'Permite alegerea unei singure opțiuni dintr-un grup exclusiv.',
  'error-message': 'Explică problema unui câmp și modul concret de remediere.',
  'error-summary': 'Listează erorile după validarea server-side și leagă fiecare mesaj de câmp.',
  button: 'Declanșează o acțiune și îi descrie consecința prin text.',
  'button-group': 'Ordonează acțiunea principală și alternativele fără ambiguitate.',
  'file-upload': 'Păstrează inputul nativ pentru selectarea unui fișier.',
  'official-banner': 'Indică natura serviciului și domeniul oficial.',
  'major-alert': 'Comunică o situație critică la nivelul întregului serviciu.',
  'institution-header': 'Prezintă identitatea instituției și numele serviciului.',
  'desktop-navigation': 'Oferă acces la categoriile principale pe ecrane largi.',
  'mobile-navigation': 'Folosește disclosure nativ pentru navigația pe ecrane înguste.',
  breadcrumb: 'Arată poziția paginii în ierarhie și permite revenirea la nivelurile anterioare.',
  'service-navigation': 'Navigație locală pentru paginile aceleiași secțiuni.',
  search: 'Formular GET cu URL distribuibil pentru găsirea documentației.',
  footer: 'Grupează resurse, guvernanță, licență și versiune.',
  'skip-link': 'Permite utilizatorilor de tastatură să sară direct la conținut.',
  link: 'Descrie destinația prin text și păstrează comportamentul nativ.',
  'external-link': 'Semnalează o destinație externă vizual și pentru tehnologii asistive.',
  alert: 'Comunică informații importante cu titlu, text și semnal non-cromatic.',
  'notification-banner': 'Confirmă rezultatul unei acțiuni la începutul conținutului.',
  'inset-text': 'Evidențiază o notă fără a-i atribui o stare de sistem.',
  card: 'Grupează conținut asociat și păstrează o acțiune principală neambiguă.',
  'status-tag': 'Exprimă textual starea unui obiect, fără dependență de culoare.',
  'responsive-table': 'Păstrează relațiile tabulare și mută overflow-ul într-o regiune locală.',
  'summary-list': 'Prezintă relații cheie–valoare prin description list.',
  details: 'Ascunde opțional informații suplimentare prin HTML nativ.',
  pagination: 'Oferă URL-uri stabile și indică textual pagina curentă.',
  metadata: 'Prezintă sursa, versiunea, licența sau alte atribute editoriale.',
  'last-updated': 'Asociază o dată vizibilă cu valoarea tehnică din elementul time.',
  accordion: 'Grupează disclosure-uri native și poate păstra o singură secțiune deschisă.',
  dialog: 'Afișează o suprafață modală nativă și restabilește focusul la închidere.',
  tabs: 'Comută perspective paralele ale aceluiași obiect cu navigare prin săgeți.',
  'step-indicator': 'Arată progresul unui flux prin listă ordonată și aria-current.',
  'date-input': 'Colectează ziua, luna și anul separat sau folosește selectorul nativ.',
  autocomplete: 'Adaugă listbox și navigare cu tastatura peste baseline-ul datalist.',
  'file-upload-advanced': 'Adaugă listă, eliminare și drag-and-drop peste inputul nativ.',
};

function markupFor(name) {
  const examples = {
    label: '<label class="sd-label" for="catalog-name">Nume complet</label>',
    hint: '<p class="sd-hint" id="catalog-hint">Scrie numele așa cum apare în actul de identitate.</p>',
    fieldset:
      '<fieldset class="sd-fieldset"><legend class="sd-legend">Cum vrei să primești răspunsul?</legend><label class="sd-choice"><input type="radio" name="delivery" checked> Digital</label></fieldset>',
    legend:
      '<fieldset class="sd-fieldset"><legend class="sd-legend">Alege o opțiune</legend><label class="sd-choice"><input type="checkbox"> Sunt de acord</label></fieldset>',
    input:
      '<label class="sd-label" for="catalog-email">Adresa de e-mail</label><input class="sd-input" id="catalog-email" type="email" autocomplete="email">',
    textarea:
      '<label class="sd-label" for="catalog-message">Mesaj</label><textarea class="sd-textarea" id="catalog-message" rows="4"></textarea>',
    select:
      '<label class="sd-label" for="catalog-county">Județ</label><select class="sd-select" id="catalog-county"><option>Cluj</option><option>Alba</option></select>',
    checkbox:
      '<label class="sd-choice"><input type="checkbox" checked> Doresc notificări electronice</label>',
    radio:
      '<fieldset class="sd-fieldset"><legend class="sd-legend">Format</legend><label class="sd-choice"><input type="radio" name="format" checked> Digital</label><label class="sd-choice"><input type="radio" name="format"> Hârtie</label></fieldset>',
    'error-message':
      '<p class="sd-error-message"><span class="sd-visually-hidden">Eroare:</span> Introdu o adresă de e-mail validă.</p>',
    'error-summary':
      '<section class="sd-error-summary" data-sd-error-summary tabindex="-1"><h2>Există o problemă</h2><ul><li><a href="#catalog-field">Introdu numele complet</a></li></ul></section>',
    button: '<button class="sd-button sd-button--primary" type="button">Continuă</button>',
    'button-group':
      '<div class="sd-button-group"><button class="sd-button sd-button--primary" type="button">Trimite cererea</button><a class="sd-link" href="#">Salvează și revino</a></div>',
    'file-upload':
      '<label class="sd-label" for="catalog-file">Document justificativ</label><input class="sd-file-upload" id="catalog-file" type="file">',
    'official-banner':
      '<section class="sd-official-banner" aria-label="Informație despre autenticitate"><div class="sd-official-banner__inner"><span class="sd-official-banner__mark" aria-hidden="true">RO</span><p>Domeniul oficial este <a href="#">institutie.ro</a>.</p></div></section>',
    'major-alert':
      '<section class="sd-major-alert" aria-labelledby="catalog-alert"><div class="sd-major-alert__inner"><span aria-hidden="true">!</span><div><strong id="catalog-alert">Serviciu indisponibil temporar</strong><p>Revenim la ora 14:00.</p></div></div></section>',
    'institution-header':
      '<header class="sd-header"><div class="sd-header__identity-row"><a class="sd-identity" href="#"><span class="sd-identity__mark" aria-hidden="true">SD</span><span class="sd-identity__text"><span class="sd-identity__name">Instituția exemplu</span><span class="sd-identity__service">Serviciu digital</span></span></a></div></header>',
    'desktop-navigation':
      '<nav class="sd-primary-navigation" aria-label="Navigație principală"><ul class="sd-primary-navigation__list"><li><a href="#" aria-current="page">Servicii</a></li><li><a href="#">Contact</a></li></ul></nav>',
    'mobile-navigation':
      '<details class="sd-mobile-navigation"><summary>Meniu</summary><nav aria-label="Navigație principală mobilă"><ul class="sd-mobile-navigation__list"><li><a href="#">Servicii</a></li><li><a href="#">Contact</a></li></ul></nav></details>',
    breadcrumb:
      '<nav class="sd-breadcrumb" aria-label="Breadcrumb"><ol class="sd-breadcrumb__list"><li class="sd-breadcrumb__item"><a href="#">Acasă</a></li><li class="sd-breadcrumb__item"><span aria-current="page">Cerere</span></li></ol></nav>',
    'service-navigation':
      '<nav class="sd-service-navigation" aria-label="În această secțiune"><h2 class="sd-service-navigation__title">În această secțiune</h2><ul class="sd-service-navigation__list"><li><a href="#" aria-current="page">Prezentare</a></li><li><a href="#">Eligibilitate</a></li></ul></nav>',
    search:
      '<form class="sd-search" role="search" action="#" method="get"><label class="sd-search__label" for="catalog-search">Caută</label><input class="sd-search__input" id="catalog-search" name="q" type="search"><button class="sd-search__button" type="submit">Caută</button></form>',
    footer:
      '<footer class="sd-footer"><div class="sd-footer__main"><section><h2 class="sd-footer__heading">Instituția exemplu</h2><p>Servicii digitale publice.</p></section><nav aria-label="Resurse"><ul class="sd-footer__list"><li><a href="#">Accesibilitate</a></li><li><a href="#">Contact</a></li></ul></nav></div></footer>',
    'skip-link':
      '<a class="sd-skip-link" href="#catalog-content">Sari la conținut</a><div id="catalog-content" tabindex="-1">Conținutul paginii</div>',
    link: '<a class="sd-link" href="#catalog-destination">Vezi condițiile de eligibilitate</a>',
    'external-link':
      '<a class="sd-link sd-link--external" href="https://example.org">Registrul extern<span class="sd-visually-hidden"> (site extern)</span></a>',
    alert:
      '<section class="sd-alert sd-alert--info" aria-labelledby="catalog-info"><span class="sd-alert__symbol" aria-hidden="true">i</span><div class="sd-alert__content"><strong class="sd-alert__title" id="catalog-info">Cererea poate fi salvată</strong><p>Poți reveni înainte de termen.</p></div></section>',
    'notification-banner':
      '<section class="sd-notification-banner sd-notification-banner--success" aria-labelledby="catalog-success"><span class="sd-notification-banner__symbol" aria-hidden="true">✓</span><div class="sd-notification-banner__content"><strong class="sd-notification-banner__title" id="catalog-success">Cererea a fost trimisă</strong><p>Număr de înregistrare: 12345.</p></div></section>',
    'inset-text':
      '<div class="sd-inset-text"><p><strong>Notă:</strong> instituția verifică informația direct la sursă.</p></div>',
    card: '<article class="sd-card"><span class="sd-tag sd-tag--success">Activ</span><h3 class="sd-card__heading"><a class="sd-card__link" href="#">Serviciu digital</a></h3><p class="sd-card__description">Depune cererea integral online.</p></article>',
    'status-tag': '<span class="sd-tag sd-tag--warning">Necesită verificare</span>',
    'responsive-table':
      '<div class="sd-table-container" role="region" aria-label="Cereri; tabel derulabil" tabindex="0"><table class="sd-table"><caption>Cereri înregistrate</caption><thead><tr><th scope="col">Instituție</th><th scope="col">Cereri</th></tr></thead><tbody><tr><th scope="row">Instituția A</th><td>1.248</td></tr></tbody></table></div>',
    'summary-list':
      '<dl class="sd-summary-list"><div class="sd-summary-list__row"><dt class="sd-summary-list__key">Cod fiscal</dt><dd class="sd-summary-list__value">12345678</dd></div></dl>',
    details:
      '<details class="sd-details"><summary>Ce documente sunt necesare?</summary><div class="sd-details__content"><p>Identitatea este verificată la sursă.</p></div></details>',
    pagination:
      '<nav class="sd-pagination" aria-label="Paginarea rezultatelor"><ul class="sd-pagination__list"><li><a href="#">Pagina anterioară</a></li><li><span aria-current="page">Pagina curentă, 2</span></li><li><a href="#">Pagina următoare</a></li></ul></nav>',
    metadata:
      '<ul class="sd-metadata" aria-label="Metadate"><li class="sd-metadata__item"><span class="sd-metadata__label">Sursă:</span> registru public</li><li class="sd-metadata__item"><span class="sd-metadata__label">Versiune:</span> 3</li></ul>',
    'last-updated':
      '<p class="sd-last-updated">Ultima actualizare: <time datetime="2026-07-23">23 iulie 2026</time></p>',
    accordion:
      '<div class="sd-accordion" data-sd-accordion="single"><details open><summary>Cine poate depune cererea?</summary><div class="sd-accordion__content"><p>Persoana vizată sau reprezentantul legal.</p></div></details><details><summary>Cât durează?</summary><div class="sd-accordion__content"><p>Două zile lucrătoare.</p></div></details></div>',
    dialog:
      '<a class="sd-button sd-button--primary" href="#catalog-dialog" aria-controls="catalog-dialog" data-sd-dialog-trigger>Revizuiește</a><dialog class="sd-dialog" id="catalog-dialog" data-sd-dialog aria-labelledby="catalog-dialog-title"><div class="sd-dialog__header"><h3 class="sd-dialog__title" id="catalog-dialog-title">Trimite cererea?</h3><button class="sd-dialog__close" type="button" data-sd-dialog-close>Închide</button></div><div class="sd-dialog__body"><p>Vei primi confirmarea în inbox.</p></div></dialog>',
    tabs: '<div class="sd-tabs" data-sd-tabs><div data-sd-tab-list hidden aria-label="Modalități"><button id="catalog-tab-a" data-sd-tab aria-controls="catalog-panel-a" aria-selected="true">Digital</button><button id="catalog-tab-b" data-sd-tab aria-controls="catalog-panel-b">La ghișeu</button></div><section id="catalog-panel-a" data-sd-tab-panel><p>Primești documentul în inbox.</p></section><section id="catalog-panel-b" data-sd-tab-panel><p>Ridici documentul de la sediu.</p></section></div>',
    'step-indicator':
      '<nav class="sd-step-indicator" aria-label="Progres"><ol class="sd-step-indicator__list"><li class="sd-step-indicator__item sd-step-indicator__item--complete"><span class="sd-step-indicator__marker" aria-hidden="true">✓</span><span class="sd-step-indicator__label">Date</span></li><li class="sd-step-indicator__item" aria-current="step"><span class="sd-step-indicator__marker" aria-hidden="true">2</span><span class="sd-step-indicator__label">Verificare</span></li></ol></nav>',
    'date-input':
      '<div class="sd-date-input" role="group" aria-label="Data nașterii"><div class="sd-date-input__part sd-date-input__part--day"><label for="catalog-day">Zi</label><input id="catalog-day" inputmode="numeric" maxlength="2"></div><div class="sd-date-input__part sd-date-input__part--month"><label for="catalog-month">Lună</label><input id="catalog-month" inputmode="numeric" maxlength="2"></div><div class="sd-date-input__part sd-date-input__part--year"><label for="catalog-year">An</label><input id="catalog-year" inputmode="numeric" maxlength="4"></div></div>',
    autocomplete:
      '<div class="sd-autocomplete" data-sd-autocomplete><label class="sd-label" for="catalog-institution">Instituție</label><input class="sd-input" id="catalog-institution" list="catalog-options" data-sd-autocomplete-input><datalist id="catalog-options"><option value="Primăria Cluj-Napoca"></option><option value="Primăria Brașov"></option></datalist><div data-sd-autocomplete-menu hidden></div><p class="sd-visually-hidden" aria-live="polite" data-sd-autocomplete-status></p></div>',
    'file-upload-advanced':
      '<div class="sd-file-upload-advanced" data-sd-file-upload data-sd-file-dropzone><label class="sd-label" for="catalog-files">Documente</label><input class="sd-file-upload" id="catalog-files" type="file" multiple><ul class="sd-file-upload__list" data-sd-file-list></ul><p class="sd-visually-hidden" aria-live="polite" data-sd-file-status></p></div>',
  };
  return examples[name];
}

function jsImportsFor(name) {
  const helpers = {
    'error-summary': ['focusErrorSummary', 'enhanceErrorSummaryLinks'],
    accordion: ['enhanceAccordions'],
    dialog: ['enhanceDialogs'],
    tabs: ['enhanceTabs'],
    autocomplete: ['enhanceAutocompletes'],
    'file-upload-advanced': ['enhanceFileUploads'],
  };
  return helpers[name] ?? [];
}

const componentItems = Object.entries(familyDefinitions).flatMap(([family, definition]) =>
  definition.names.map((name) => ({
    id: `${family}-${name}`,
    kind: 'component',
    family,
    familyTitle: definition.title,
    componentName: name,
    title: labels[name],
    description: descriptions[name],
    packageName: '@sistem-digital/components',
    version: packageVersion,
    channel: 'alpha',
    status: 'alpha',
    cssImport: definition.cssImport,
    jsImports: jsImportsFor(name),
    documentationHref: definition.documentationHref,
    sourceHref: definition.sourceHref,
    changelogHref:
      'https://github.com/ciprian-rus/sistem.digital/blob/main/packages/components/CHANGELOG.md',
    markup: markupFor(name),
    keywords: [name, definition.title.toLocaleLowerCase('ro-RO')],
  })),
);

const foundationItems = [
  {
    id: 'foundation-design-tokens',
    kind: 'foundation',
    family: 'foundations',
    familyTitle: 'Fundamente',
    title: 'Design tokens DTCG',
    description: 'Sursa canonică pentru primitive, roluri semantice și token-uri de componentă.',
    packageName: '@sistem-digital/tokens',
    version: packageVersion,
    channel: 'alpha',
    status: 'alpha',
    cssImport: '@sistem-digital/tokens/css',
    jsImports: ['tokens'],
    documentationHref: '/fundamente',
    sourceHref: 'https://github.com/ciprian-rus/sistem.digital/tree/main/packages/tokens/tokens',
    changelogHref:
      'https://github.com/ciprian-rus/sistem.digital/blob/main/packages/tokens/CHANGELOG.md',
    markup:
      '<div style="display:grid;gap:var(--sd-space-3);padding:var(--sd-space-5);background:var(--sd-color-surface-subtle);border:1px solid var(--sd-color-border);border-radius:var(--sd-radius-panel)"><strong>Suprafață semantică</strong><span>Valorile provin din design tokens.</span></div>',
    keywords: ['tokens', 'dtcg', 'css', 'typescript', 'json'],
  },
  {
    id: 'foundation-themes',
    kind: 'foundation',
    family: 'foundations',
    familyTitle: 'Fundamente',
    title: 'Teme funcționale',
    description: 'Patru teme oficiale și accente instituționale controlate.',
    packageName: '@sistem-digital/tokens',
    version: packageVersion,
    channel: 'alpha',
    status: 'alpha',
    cssImport: '@sistem-digital/tokens/themes.css',
    jsImports: ['themeNames', 'themeInitScript'],
    documentationHref: '/fundamente',
    sourceHref: 'https://github.com/ciprian-rus/sistem.digital/tree/main/packages/tokens/themes',
    changelogHref:
      'https://github.com/ciprian-rus/sistem.digital/blob/main/packages/tokens/CHANGELOG.md',
    markup:
      '<div style="display:flex;gap:var(--sd-space-3);flex-wrap:wrap"><span class="sd-tag">Light</span><span class="sd-tag">Dark</span><span class="sd-tag">Contrast ridicat</span></div>',
    keywords: ['teme', 'dark', 'contrast', 'forced colors'],
  },
  {
    id: 'foundation-typography-layout',
    kind: 'foundation',
    family: 'foundations',
    familyTitle: 'Fundamente',
    title: 'Tipografie și layout',
    description: 'Scară fluidă, spațiere, containere, breakpoints și grid responsive.',
    packageName: '@sistem-digital/tokens',
    version: packageVersion,
    channel: 'alpha',
    status: 'alpha',
    cssImport: '@sistem-digital/tokens/css',
    jsImports: [],
    documentationHref: '/fundamente',
    sourceHref: 'https://github.com/ciprian-rus/sistem.digital/tree/main/packages/tokens/tokens',
    changelogHref:
      'https://github.com/ciprian-rus/sistem.digital/blob/main/packages/tokens/CHANGELOG.md',
    markup:
      '<div style="max-width:55ch"><h3 style="margin-top:0">Titlu fluid</h3><p>Măsura textului și spațierea folosesc rolurile structurale.</p></div>',
    keywords: ['tipografie', 'layout', 'grid', 'responsive'],
  },
  {
    id: 'foundation-focus-motion',
    kind: 'foundation',
    family: 'foundations',
    familyTitle: 'Fundamente',
    title: 'Focus și motion',
    description:
      'Focus vizibil în trei straturi și animații care respectă preferințele sistemului.',
    packageName: '@sistem-digital/tokens',
    version: packageVersion,
    channel: 'alpha',
    status: 'alpha',
    cssImport: '@sistem-digital/tokens/css',
    jsImports: [],
    documentationHref: '/fundamente',
    sourceHref: 'https://github.com/ciprian-rus/sistem.digital/tree/main/packages/tokens/tokens',
    changelogHref:
      'https://github.com/ciprian-rus/sistem.digital/blob/main/packages/tokens/CHANGELOG.md',
    markup: '<button class="sd-button sd-button--primary" type="button">Testează focusul</button>',
    keywords: ['focus', 'motion', 'reduced motion', 'keyboard'],
  },
];

export const catalogSchemaVersion = 1;
export const catalogItems = [...foundationItems, ...componentItems];
export const catalogFamilies = familyDefinitions;
