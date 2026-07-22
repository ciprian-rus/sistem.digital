# Politica de personalizare instituțională

## Obiectiv

Sistem Digital trebuie să permită recunoașterea și identitatea organizației fără a pierde coerența, accesibilitatea, securitatea sau capacitatea de actualizare.

Personalizarea este un API controlat, nu permisiunea de a rescrie orice selector intern.

## Modelul în trei niveluri

## Nivelul 1 — Invariant

Nu poate fi modificat de implementatori:

- semantica HTML a componentelor;
- ordinea logică și relațiile programatice;
- interacțiunile cu tastatura;
- managementul focusului;
- rolurile pentru eroare, succes, avertizare și informație;
- target sizes minime;
- cerințele de contrast;
- comportamentul la zoom și reflow;
- `prefers-reduced-motion` și forced colors;
- structura datelor publice ale componentelor;
- identificatorii și API-urile necesare actualizării;
- telemetria, numai dacă este introdusă ulterior, nu poate colecta date personale implicit.

## Nivelul 2 — Configurabil prin token-uri validate

Poate fi modificat numai prin valori declarate și testate:

- culoarea de accent;
- variantele aprobate de suprafață;
- fontul instituțional, dacă respectă lizibilitatea și licența;
- densitatea în limite prestabilite;
- radius și elevation în intervale permise;
- logo, stemă sau marcă instituțională;
- imagini și ilustrații editoriale;
- lățimea de conținut în template-urile autorizate;
- mod luminos, întunecat sau contrast ridicat;
- limba și direcția de scriere.

Orice temă trebuie să treacă automat matricea de contrast și testele componentelor.

## Nivelul 3 — Extensibil local

Poate fi dezvoltat în afara nucleului:

- componente specifice unui domeniu;
- dashboard-uri specializate;
- vizualizări de date;
- pattern-uri interne;
- integrări cu sisteme locale;
- template-uri editoriale;
- elemente de campanie temporară.

Extensiile trebuie să:

- consume token-urile publice;
- aibă owner;
- declare versiunea Sistem Digital suportată;
- documenteze accesibilitatea;
- nu folosească numele „oficial” sau badge-uri ale nucleului fără aprobare;
- nu blocheze actualizarea pachetelor de bază.

## Personalizări interzise

- eliminarea sau ascunderea focusului;
- schimbarea culorii semantice fără verificare;
- folosirea culorii ca unic semnal;
- schimbarea ordinii focusului prin `tabindex` pozitiv;
- înlocuirea button-urilor cu elemente neinteractive;
- eliminarea etichetelor sau a mesajelor de eroare;
- schimbarea comportamentului standard al tastaturii;
- încărcarea unei versiuni `latest` în producție;
- override-uri globale asupra selectorilor interni nedocumentați;
- fork fără owner și plan de sincronizare;
- animații esențiale fără alternativă pentru reduced motion;
- modificări care fac site-ul să poată fi confundat cu altă instituție.

## Identitate instituțională

O implementare poate afișa:

- numele instituției;
- tipul instituției;
- logo sau stemă;
- culoare de accent aprobată;
- informații de contact;
- relația de subordonare sau coordonare;
- domeniul oficial și indicatorul de autenticitate.

Identitatea nu trebuie să schimbe:

- denumirile acțiunilor comune;
- pattern-ul de eroare;
- poziția acțiunilor critice;
- semnificația culorilor;
- structura de bază a formularelor;
- traseul de confirmare și status.

## Teme

O temă este un set versionat de valori atribuite rolurilor semantice.

Fiecare temă trebuie să includă:

- identificator și versiune;
- owner;
- bază cromatică;
- token-uri rezolvate;
- rezultate de contrast;
- componente și stări testate;
- fonturi și licențe;
- probleme cunoscute;
- data ultimei verificări.

Temele oficiale inițiale recomandate:

1. `default-light`;
2. `default-dark`;
3. `high-contrast-light`;
4. `high-contrast-dark`;
5. `institutional-light`, limitată la accent și identitate.

## API de configurare

Implementatorii trebuie să poată modifica numai token-uri documentate, de exemplu:

```json
{
  "theme": {
    "accent": "blue",
    "institution": {
      "name": "Exemplu instituție",
      "mark": "/identity/mark.svg"
    },
    "density": "comfortable"
  }
}
```

Configurația trebuie validată înainte de build. Valorile arbitrare sunt permise numai în pachetele de extensie, nu în tema oficială.

## Criterii de acceptare pentru o temă instituțională

- toate combinațiile de text trec 4.5:1 sau criteriul aplicabil;
- controalele și limitele vizuale trec 3:1 unde WCAG cere;
- focusul este vizibil pe toate suprafețele;
- stările hover, active, selected, disabled și visited sunt distincte;
- informația nu depinde de culoare;
- forced colors funcționează;
- dark mode nu inversează mecanic imaginile și semantica;
- tema este testată pe mobil, zoom și reflow;
- assets au licențe și alternative text documentate;
- pachetul poate fi actualizat fără modificarea codului componentelor.

## Excepții

O excepție necesită:

- problemă și context documentate;
- dovada că token-urile publice nu rezolvă nevoia;
- evaluare de accesibilitate;
- owner și termen;
- alternativă compatibilă;
- RFC dacă modificarea poate fi utilă mai multor organizații.

Excepția nu este automat inclusă în nucleu.

## Evaluarea personalizării

Orice review trebuie să răspundă:

1. Personalizarea exprimă identitatea sau schimbă sensul?
2. Ce rol semantic este afectat?
3. Este păstrat comportamentul între instituții?
4. Cum este testat contrastul și focusul?
5. Va supraviețui actualizării la următoarea versiune?
6. Există o nevoie recurentă care justifică extinderea API-ului public?

## Criteriul final

O personalizare este acceptabilă numai dacă utilizatorul poate transfera cunoștințele despre acțiuni și stări între servicii, iar instituția poate actualiza Sistem Digital fără fork permanent.
