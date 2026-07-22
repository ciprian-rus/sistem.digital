# npm Trusted Publishing și provenance

## Obiectiv

Pachetele Sistem Digital se publică din GitHub Actions prin OpenID Connect, fără token npm permanent. npm acceptă numai identitatea workflow-ului autorizat și generează automat provenance pentru pachetele publice construite din repository-ul public.

Workflow autorizat:

```text
.github/workflows/release.yml
```

Environment GitHub:

```text
npm
```

## Cerințe

- repository public;
- pachet npm public;
- Node.js 24;
- npm CLI minimum 11.5.1;
- permisiunea GitHub Actions `id-token: write`;
- câmpul `repository.url` din package manifest identic cu repository-ul GitHub;
- trusted publisher configurat în npm pentru workflow-ul și environment-ul corect.

## Bootstrap-ul primului pachet

Trusted publisher se poate configura după ce pachetul există în registry. Prima publicare urmează aceeași cale CI și nu se execută de pe laptop:

1. se creează organizația sau scope-ul npm `sistem-digital`;
2. se generează un token granular, limitat la publicarea pachetului și cu expirare scurtă;
3. tokenul este salvat temporar ca secret GitHub Actions `NPM_BOOTSTRAP_TOKEN`;
4. se publică primul GitHub Release, iar workflow-ul publică tarball-ul atestat;
5. imediat după succes se configurează trusted publisher pentru pachet;
6. secretul `NPM_BOOTSTRAP_TOKEN` este șters din GitHub;
7. tokenul este revocat din npm;
8. următorul prerelease verifică publicarea exclusiv prin OIDC.

Tokenul de bootstrap nu se folosește pentru instalare, dezvoltare sau publicări ulterioare.

## Configurarea trusted publisher în npm

Pentru fiecare pachet publicabil se setează:

- provider: GitHub Actions;
- owner: `ciprian-rus`;
- repository: `sistem.digital`;
- workflow: `release.yml`;
- environment: `npm`.

Numele trebuie să corespundă exact valorilor din GitHub și package manifest.

## Protecția environment-ului `npm`

În GitHub, environment-ul `npm` trebuie să aibă:

- deployment branches and tags limitate la tag-uri `v*`;
- required reviewer când există minimum doi maintainers;
- nicio credențială persistentă după bootstrap;
- acces la workflow numai din repository-ul oficial.

## Verificare

După fiecare release se verifică:

```bash
gh attestation verify ./sistem-digital-tokens-*.tgz \
  --repo ciprian-rus/sistem.digital
```

Pe pagina npm a pachetului trebuie să fie vizibilă informația de provenance și legătura către repository și workflow.

Hash-ul local se compară cu `SHA256SUMS`:

```bash
sha256sum --check SHA256SUMS
```

## Rotație și incidente

OIDC folosește tokenuri de scurtă durată și nu necesită rotație manuală. Dacă workflow-ul sau relația de încredere este compromisă:

1. se dezactivează trusted publisher în npm;
2. se suspendă environment-ul `npm`;
3. se verifică toate release-urile produse după compromitere;
4. se retrag attestations nevalide;
5. se urmează procedura de răspuns la vulnerabilități.

## Limitări

Provenance dovedește legătura dintre artefact, repository și workflow. Nu dovedește că sursa sau artefactul sunt lipsite de vulnerabilități. Consumatorii trebuie să verifice attestations și să evalueze politica de încredere aplicabilă.
