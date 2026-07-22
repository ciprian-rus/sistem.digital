# Politica de securitate

## Versiuni suportate

Până la prima versiune stabilă, proiectul se află în dezvoltare activă și primește remedieri numai pe ultima versiune alpha publicată.

După `1.0.0`, suportul urmează [politica de release, LTS și deprecation](docs/governance/release-policy.md). Datele concrete de sfârșit al suportului vor fi publicate înaintea desemnării unei versiuni drept LTS.

## Raportarea vulnerabilităților

Nu publica vulnerabilități exploatabile într-un issue public. Folosește GitHub Private Vulnerability Reporting.

Raportul ar trebui să includă:

- componenta și versiunea afectată;
- impactul estimat;
- pașii de reproducere;
- un exemplu minim;
- remedieri posibile, dacă sunt cunoscute.

Țintele de confirmare, termenele de remediere și fluxul de disclosure sunt definite în [procedura de răspuns la vulnerabilități](docs/security/vulnerability-response.md).

## Lanț de furnizare

Release-urile sunt construite exclusiv în GitHub Actions și includ:

- dependențe blocate prin lockfile;
- actualizări automate de securitate;
- scanare preventivă a secretelor;
- audit al dependențelor;
- tarball npm verificabil;
- SBOM CycloneDX;
- hash-uri SHA-256;
- GitHub artifact attestations;
- npm provenance;
- publicare OIDC fără token permanent după bootstrap.

Configurarea și verificarea publicării sunt documentate în [npm Trusted Publishing și provenance](docs/security/trusted-publishing.md).

## Incidente

Dacă un release, workflow, token sau cont de maintainer este suspectat de compromitere, publicarea este suspendată imediat și se aplică procedura de răspuns la vulnerabilități. Versiunile afectate nu sunt suprascrise sau republicate sub același număr.
