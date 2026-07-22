# Checklist de accesibilitate pentru componente

Acest checklist face parte din Definition of Done. O componentă nu poate trece în starea `stable` dacă există un răspuns negativ neacoperit de o excepție aprobată și limitată în timp.

## Nevoia și alegerea pattern-ului

- [ ] Problema utilizatorului este documentată.
- [ ] HTML-ul nativ a fost evaluat înaintea unei soluții ARIA personalizate.
- [ ] Componenta nu duplică un pattern existent fără justificare.
- [ ] Sunt documentate situațiile în care componenta nu trebuie utilizată.

## Structură și semantică

- [ ] Elementele și landmark-urile au semantica potrivită.
- [ ] Titlurile păstrează o ierarhie logică.
- [ ] Listele, tabelele și grupurile de câmpuri folosesc elementele native corecte.
- [ ] Numele, rolul, starea și valoarea sunt expuse programatic.
- [ ] ARIA nu modifică sau contrazice semantica nativă fără motiv.
- [ ] ID-urile și referințele ARIA sunt unice și valide.

## Tastatură și focus

- [ ] Toate acțiunile sunt disponibile fără mouse sau touch.
- [ ] Ordinea focusului este predictibilă.
- [ ] Focusul este întotdeauna vizibil.
- [ ] Focusul nu este blocat în componentă, cu excepția dialogurilor modale conforme.
- [ ] La închiderea unui overlay, focusul revine la elementul care l-a deschis.
- [ ] Comportamentul tastelor respectă pattern-ul ARIA aplicabil.
- [ ] Nu există scurtături care intră în conflict cu tehnologii asistive sau browserul.

## Vizual și responsive

- [ ] Textul și elementele esențiale respectă pragurile de contrast.
- [ ] Informația nu este transmisă exclusiv prin culoare.
- [ ] Componenta funcționează la zoom 200%.
- [ ] Componenta se rearanjează fără pierderi la 320 pixeli CSS și reflow 400%.
- [ ] Text spacing nu ascunde sau suprapune conținutul.
- [ ] Focusul și limitele controalelor rămân perceptibile în forced colors.
- [ ] Target-urile interactive au dimensiune și spațiere suficiente.
- [ ] Dark mode, dacă există, este testat separat.

## Conținut și erori

- [ ] Etichetele descriu clar acțiunea sau informația.
- [ ] Instrucțiunile apar înainte de momentul în care sunt necesare.
- [ ] Mesajele de eroare identifică problema și remedierea.
- [ ] Erorile sunt asociate programatic cu elementele relevante.
- [ ] Statusurile dinamice importante sunt anunțate fără a muta inutil focusul.
- [ ] Textul alternativ este util în context, nu doar prezent.
- [ ] Componenta funcționează cu texte mai lungi și traduceri.

## Mișcare, timp și media

- [ ] Mișcarea neesențială respectă `prefers-reduced-motion`.
- [ ] Conținutul care pornește automat poate fi oprit sau controlat.
- [ ] Timeout-urile oferă avertizare și extindere când este necesar.
- [ ] Audio și video au alternative accesibile relevante.
- [ ] Nu există efecte care depășesc limitele privind flash-urile.

## Testare automată

- [ ] Nu există încălcări axe pentru tag-urile WCAG A și AA configurate.
- [ ] Testele acoperă starea implicită și toate stările interactive relevante.
- [ ] Testele de tastatură verifică cel puțin traseul critic.
- [ ] Rezultatele complete axe sunt atașate ca artefacte la eșec.
- [ ] Nu sunt dezactivate reguli axe fără issue, responsabil și termen.

## Testare manuală

- [ ] Tastatură completă.
- [ ] Windows + Chrome + NVDA.
- [ ] Windows + Edge + forced colors.
- [ ] macOS + Safari + VoiceOver.
- [ ] Combinațiile Tier 2 relevante pentru componentă.
- [ ] Zoom, reflow și text spacing.
- [ ] Test cu utilizatori pentru componentele complexe sau cu risc ridicat.

## Documentație și mentenanță

- [ ] Secțiunea „Accesibilitate” descrie comportamentul așteptat.
- [ ] Sunt publicate limitările și problemele cunoscute.
- [ ] Exemplele de cod sunt accesibile implicit.
- [ ] Sunt documentate responsabilitățile implementatorului și ale autorului de conținut.
- [ ] Există teste de regresie pentru problemele remediate.
- [ ] Versiunea și data ultimei testări manuale sunt înregistrate.
