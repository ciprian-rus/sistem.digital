# Automatizarea GitHub Project #5

Project-ul oficial al proiectului este:

- https://github.com/users/ciprian-rus/projects/5

Repository-ul conține workflow-ul:

- `.github/workflows/project-sync.yml`

Acesta poate:

1. adăuga automat în Project orice issue nou sau redeschis;
2. importa toate issues-urile deschise existente printr-o rulare manuală.

## Secret necesar

În repository se creează secretul GitHub Actions:

```text
PROJECTS_TOKEN
```

Tokenul recomandat este un Personal Access Token classic cu:

```text
project
repo
```

Tokenul nu se publică în issues, commit-uri sau conversații.

## Salvarea secretului

În GitHub:

```text
Repository
→ Settings
→ Secrets and variables
→ Actions
→ New repository secret
```

Nume:

```text
PROJECTS_TOKEN
```

Valoare: tokenul generat în contul proprietarului Project-ului.

## Importarea backlog-ului existent

După salvarea secretului:

```text
Repository
→ Actions
→ Sync issues to GitHub Project
→ Run workflow
→ import_existing: true
```

Workflow-ul adaugă toate issues-urile deschise în Project #5. Operația este idempotentă: itemii deja existenți nu trebuie duplicați.

## Automation Console

Workflow-ul `.github/workflows/automation-console.yml` permite executarea unor operațiuni controlate prin comentarii introduse în issues de proprietarul repository-ului.

Regenerarea lockfile-ului pentru un branch se solicită prin:

```text
/automation regenerate-lockfile numele-branch-ului
```

Exemplu:

```text
/automation regenerate-lockfile agent/m0-ci-hardening
```

Workflow-ul:

1. validează autorul și numele branch-ului;
2. regenerează `pnpm-lock.yaml` cu versiunea pnpm aprobată;
3. comite numai lockfile-ul modificat;
4. publică rezultatul în issue.

Comanda nu acceptă spații în numele branch-ului și nu poate fi executată de utilizatori fără drepturi asupra repository-ului.

## Automatizare ulterioară

Noile issues și issues-urile redeschise sunt adăugate automat în Project. Statusurile și câmpurile custom vor fi administrate prin automatizările interne ale GitHub Project și prin workflows dedicate.
