# Politica de release, suport și deprecation

## Principiu

Release-urile Sistem Digital sunt produse numai de GitHub Actions din commituri aflate în branch-ul `main`. Publicarea manuală de pe o stație de lucru este interzisă.

Workflow-ul canonic este:

```text
.github/workflows/release.yml
```

Fiecare pull request execută separat workflow-ul `Release readiness`, care reproduce pașii de împachetare, SBOM și hash înainte ca modificarea să poată ajunge în `main`.

## Versionare

Proiectul folosește Semantic Versioning și Changesets.

- `patch` — remediere compatibilă, inclusiv corecții de accesibilitate și securitate fără schimbarea API-ului;
- `minor` — funcționalitate nouă compatibilă;
- `major` — schimbare incompatibilă sau eliminarea unui API public;
- prerelease — versiuni `alpha`, `beta` și `rc`, publicate pe npm cu dist-tag `next`;
- stable — versiuni fără sufix prerelease, publicate cu dist-tag `latest`.

Până la `1.0.0`, API-urile pot suferi schimbări incompatibile, dar fiecare schimbare trebuie documentată prin Changeset și migration note.

## Fluxul de release

1. Fiecare pull request care modifică un pachet publicabil include un Changeset.
2. Versiunile și changelog-urile sunt actualizate într-un pull request separat.
3. Pull request-ul de versiune trece toate verificările obligatorii.
4. După merge, se creează tag-ul `vX.Y.Z` pe commitul din `main`.
5. Se publică un GitHub Release pentru același tag.
6. Workflow-ul de release verifică tag-ul, reconstruiește pachetul și rulează quality gates.
7. Workflow-ul produce tarball, SBOM și `SHA256SUMS`.
8. GitHub generează provenance și SBOM attestations.
9. Același tarball atestat este publicat pe npm prin OIDC.
10. Artefactele sunt atașate GitHub Release-ului.

## Artefacte obligatorii

Fiecare release public include:

- tarball-ul npm exact publicat;
- `sbom.cdx.json` în format CycloneDX;
- `SHA256SUMS`;
- GitHub build provenance attestation;
- GitHub SBOM attestation;
- npm provenance attestation;
- changelog și migration notes, când sunt necesare.

## Canale și suport

### Alpha

- fără garanție de compatibilitate;
- suport numai pentru ultima versiune alpha;
- remedierea vulnerabilităților critical și high are prioritate;
- nu este recomandată pentru servicii publice de producție.

### Stable curent

După `1.0.0`, ultima versiune majoră stable primește:

- toate remedierile de securitate;
- bugfix-uri compatibile;
- suport pentru combinațiile Tier 1 din matricea de accesibilitate;
- minimum 12 luni de suport după publicarea următoarei versiuni majore.

### LTS

O versiune majoră poate fi declarată LTS numai printr-un RFC public. O linie LTS primește:

- remedieri critical și high;
- remedieri serious de accesibilitate, dacă sunt compatibile;
- minimum 24 de luni de suport de la desemnarea LTS;
- un dist-tag npm dedicat, de forma `lts-X`.

Datele concrete de sfârșit al suportului se publică înaintea desemnării unei versiuni drept LTS.

## Deprecation

Un API public poate fi retras numai astfel:

1. este marcat deprecated într-o versiune minoră;
2. documentația indică alternativa și migration path;
3. este emis un avertisment de dezvoltare, când acest lucru este posibil fără impact în producție;
4. API-ul rămâne disponibil până la următoarea versiune majoră;
5. eliminarea este anunțată în changelog și release notes.

Pentru vulnerabilități active, perioada de deprecation poate fi scurtată printr-un security advisory.

## Rollback

Versiunile npm publicate nu sunt șterse și nu sunt suprascrise.

În cazul unui release defect:

1. publicarea se oprește;
2. versiunea este marcată deprecated pe npm cu explicație;
3. dist-tag-ul `latest` sau `next` este mutat la ultima versiune sigură;
4. se publică un security advisory sau incident report, după caz;
5. se livrează o versiune patch cu remedierea;
6. attestations asociate unui artefact care nu mai trebuie considerat de încredere pot fi retrase conform procedurii GitHub;
7. consumatorii primesc instrucțiuni explicite de upgrade sau downgrade.

Nu se refolosește niciodată același număr de versiune pentru artefacte diferite.

## Release de urgență

Un release critic poate omite perioada obișnuită de feedback, dar nu poate omite:

- build-ul din GitHub Actions;
- lockfile-ul verificat;
- testele și auditul de securitate;
- hash-urile;
- provenance;
- SBOM;
- review-ul modificării de către un maintainer, când există minimum doi maintainers activi.

## Retenție

- artefactele GitHub Release sunt păstrate pe durata suportului versiunii;
- artefactele intermediare GitHub Actions au retenție limitată;
- provenance, SBOM și hash-urile publice sunt considerate parte din release;
- un release scos din suport rămâne disponibil, dar este marcat explicit unsupported.
