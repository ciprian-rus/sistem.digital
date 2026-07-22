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

## Automatizare ulterioară

Noile issues și issues-urile redeschise sunt adăugate automat în Project. Statusurile și câmpurile custom vor fi administrate prin automatizările interne ale GitHub Project și, ulterior, prin workflows dedicate.
