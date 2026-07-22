# Standardul de accesibilitate Sistem Digital

## Statut

Acest document definește cerințele minime de accesibilitate pentru componentele, pattern-urile, template-urile și aplicațiile de referință Sistem Digital.

Ținta tehnică este **WCAG 2.2 nivel A și AA**. Pentru implementările din sectorul public se verifică separat și cerințele aplicabile din standardul european armonizat **EN 301 549 v3.2.1**, inclusiv cerințele relevante care nu sunt acoperite integral de WCAG.

Referințe normative și metodologice:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/);
- [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/);
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/);
- [EN 301 549](https://www.etsi.org/deliver/etsi_EN/301500_301599/301549/);
- [Accessibility Conformance Testing](https://www.w3.org/WAI/standards-guidelines/act/).

## Principii obligatorii

1. Se preferă HTML nativ semantic înaintea rolurilor ARIA.
2. Funcționalitatea de bază trebuie să rămână disponibilă prin progressive enhancement.
3. Toate acțiunile trebuie să poată fi executate cu tastatura.
4. Ordinea focusului trebuie să urmeze ordinea logică și vizuală.
5. Focusul nu poate fi ascuns, eliminat sau indicat exclusiv prin culoare.
6. Numele, rolul, starea și valoarea controalelor trebuie expuse programatic.
7. Conținutul nu poate depinde exclusiv de culoare, poziție, formă, sunet sau mișcare.
8. Interfața trebuie să funcționeze la zoom 200% și la reflow echivalent cu 400%.
9. Mișcarea neesențială trebuie redusă când utilizatorul solicită `prefers-reduced-motion`.
10. Componentele trebuie să funcționeze în modurile Windows High Contrast și forced colors.
11. Mesajele de eroare trebuie să identifice problema și să explice remedierea.
12. Fiecare componentă interactivă trebuie testată cu tehnologii asistive înainte de stabilizare.

## Cerințe suplimentare Sistem Digital

Sistem Digital adoptă câteva ținte mai stricte decât minimul normativ:

- țintă recomandată de minimum 44 × 44 pixeli CSS pentru acțiunile principale;
- focus vizibil cu contrast suficient pe toate suprafețele;
- contrast minimum 3:1 pentru limitele și stările vizuale esențiale ale controalelor;
- maximum un singur `h1` pentru paginile de conținut și servicii;
- skip link ca primul element focalizabil al fiecărei pagini;
- text lizibil fără justificare integrală și fără rânduri excesiv de lungi;
- niciun timeout fără avertizare și posibilitate de extindere, cu excepțiile permise de WCAG;
- suport explicit pentru dark mode și forced colors atunci când tema alternativă este oferită.

## Niveluri de verificare

### Nivel 1 — automat la fiecare pull request

- build și markup executabil;
- axe-core pentru regulile WCAG A și AA disponibile;
- teste de tastatură pentru stările critice;
- verificări de structură, etichete, contrast și ARIA detectabile automat;
- artefacte cu rezultatele complete la eșec.

### Nivel 2 — manual pentru fiecare componentă

- tastatură fără mouse;
- ordinea și restaurarea focusului;
- zoom, reflow și text spacing;
- forced colors și contrast;
- cititor de ecran pe combinațiile Tier 1;
- stări loading, empty, error, disabled și readonly;
- conținut în limba română, inclusiv pronunția abrevierilor relevante.

### Nivel 3 — înaintea unei versiuni stabile

- evaluare pe fluxuri complete, nu doar componente izolate;
- testare cu persoane cu dizabilități;
- audit independent pentru serviciile cu risc sau utilizare ridicată;
- verificarea documentelor descărcabile și a conținutului multimedia;
- publicarea problemelor cunoscute și a planului de remediere.

## Limitele automatizării

Un rezultat verde de la axe, ACT sau orice alt instrument automat nu reprezintă certificare de conformitate. Verificările automate pot detecta numai o parte dintre probleme și nu pot valida integral calitatea textelor alternative, ordinea logică, claritatea conținutului, experiența cu cititoare de ecran sau utilizarea reală a unui serviciu.

Orice componentă stabilă trebuie să îndeplinească [checklist-ul de acceptare](component-checklist.md), să fie testată conform [matricei de suport](test-matrix.md) și să folosească [șablonul de documentare](component-template.md). Orice abatere temporară urmează [politica pentru excepții și probleme cunoscute](exceptions.md).

## Conformitate și declarații publice

Sistem Digital poate furniza componente și dovezi de testare, dar conformitatea finală aparține implementării concrete. O instituție nu poate declara un site conform doar pentru că utilizează pachetele Sistem Digital.

Declarațiile de accesibilitate trebuie să descrie:

- domeniul exact evaluat;
- standardul și versiunea utilizate;
- metoda și data evaluării;
- conținutul neconform;
- alternativele accesibile disponibile;
- mecanismul de feedback;
- termenul și responsabilul pentru remediere.
