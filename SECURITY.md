# Politica de securitate

## Versiuni suportate

Până la prima versiune stabilă, proiectul se află în dezvoltare activă. După lansarea 1.0, politica va defini explicit versiunile LTS și termenele de suport.

## Raportarea vulnerabilităților

Nu publica vulnerabilități exploatabile într-un issue public. Folosește GitHub Private Vulnerability Reporting, după activarea funcției în repository.

Raportul ar trebui să includă:

- componenta și versiunea afectată;
- impactul estimat;
- pașii de reproducere;
- un exemplu minim;
- remedieri posibile, dacă sunt cunoscute.

## Lanț de furnizare

Release-urile vor fi construite automat în CI. Obiectivele proiectului includ:

- dependențe blocate prin lockfile;
- actualizări automate de securitate;
- release-uri și tag-uri verificabile;
- SBOM pentru versiunile publicate;
- provenance pentru pachetele npm;
- verificarea secretelor și a vulnerabilităților.
