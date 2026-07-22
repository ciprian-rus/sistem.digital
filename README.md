# Sistem Digital

**Infrastructură deschisă pentru servicii digitale clare, accesibile și coerente în România.**

Sistem Digital este un proiect open-source care urmărește să ofere un sistem de design reutilizabil pentru site-uri, aplicații și servicii digitale, cu prioritate pentru administrația publică din România.

Proiectul nu este doar o bibliotecă vizuală. El va reuni:

- principii și standarde de design;
- design tokens;
- componente HTML/CSS/JavaScript accesibile;
- Web Components și adaptoare pentru framework-uri;
- pattern-uri pentru servicii publice;
- template-uri și aplicații de referință;
- documentație pentru designeri, dezvoltatori și instituții;
- mecanisme publice de propunere, dezbatere și contribuție;
- instrumente de validare și monitorizare a conformării.

## Obiective

1. Reducerea costurilor și a timpului necesar construirii serviciilor digitale.
2. Crearea unei experiențe coerente pentru utilizatori, indiferent de instituție.
3. Integrarea accesibilității și securității în componentele de bază.
4. Evitarea dependenței de un singur furnizor sau framework.
5. Construirea unei comunități deschise de practică în jurul designului serviciilor publice.

## Principii

- Nevoile utilizatorilor înaintea structurii instituționale.
- Accesibilitate implicită, nu adăugată la final.
- HTML semantic și progressive enhancement.
- Open source și standarde deschise.
- Componente versionate și actualizări controlate.
- Personalizare limitată și coerentă.
- Cercetare, testare și decizii documentate public.
- Reutilizare înainte de reinventare.

## Direcția de produs

Sistem Digital este inițial un proiect open-source independent. El poate deveni baza unui standard oficial numai printr-un mandat public clar, guvernanță transparentă, finanțare permanentă și păstrarea licenței deschise.

- [Viziunea, publicurile, limitele și definiția MVP](docs/product/product-vision.md)
- [Terminologia canonică a proiectului](docs/product/terminology.md)

## Dezvoltare

Cerințe:

- Node.js 24 LTS;
- pnpm 11.

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Build scripts pentru dependențe sunt blocate implicit și aprobate explicit în `pnpm-workspace.yaml`.

Verificarea completă rulează prin:

```bash
pnpm check
```

Verificările suplimentare pot fi rulate separat:

```bash
pnpm docs:check
pnpm secrets:check
pnpm audit:ci
pnpm --filter @sistem-digital/website test:a11y
```

Platforma locală este disponibilă implicit la `http://localhost:3000`.

## Accesibilitate

Ținta tehnică este WCAG 2.2 nivel A și AA, completată de cerințele aplicabile din EN 301 549 pentru implementările din sectorul public.

- [Standardul de accesibilitate](docs/accessibility/standard.md)
- [Matricea browser–tehnologie asistivă](docs/accessibility/test-matrix.md)
- [Checklist-ul componentelor](docs/accessibility/component-checklist.md)
- [Șablonul de documentare a componentelor](docs/accessibility/component-template.md)
- [Politica pentru excepții](docs/accessibility/exceptions.md)

## Release și securitatea lanțului de furnizare

Pachetele sunt construite și publicate exclusiv din GitHub Actions. Fiecare release produce tarball-ul npm, SBOM CycloneDX, hash-uri SHA-256 și attestations verificabile.

- [Politica de release, LTS și rollback](docs/governance/release-policy.md)
- [npm Trusted Publishing și provenance](docs/security/trusted-publishing.md)
- [Răspunsul la vulnerabilități](docs/security/vulnerability-response.md)
- [Politica generală de securitate](SECURITY.md)

## Integrare continuă

Fiecare pull request trebuie să treacă șase status checks stabile:

- **Lockfile consistency** — sincronizarea reproductibilă a manifestelor și lockfile-ului;
- **Quality gates** — format, lint, typecheck, teste și build;
- **Documentation** — verificarea linkurilor locale din documentație;
- **Supply-chain security** — scanare de secrete și audit al dependențelor;
- **Accessibility** — axe-core și teste de tastatură în Chromium;
- **Release readiness** — tarball, SBOM, hash-uri și conținut publicabil.

Regulile recomandate pentru branch-ul principal sunt documentate în [Protecția branch-ului `main`](docs/governance/branch-protection.md).

## Arhitectură

```text
apps/
  website/             # platforma sistem.digital
  playground/          # laborator interactiv
  reference-service/   # serviciu public demonstrativ
packages/
  tokens/
  styles/
  components/
  web-components/
  react/
  icons/
  content/
  validator/
starters/
  html/
  nextjs/
  wordpress/
docs/
  product/
  architecture/
  governance/
  accessibility/
  security/
  contribution/
```

## Stadiu și planificare

Proiectul finalizează **M0 — Fundația proiectului**.

- [Roadmap public — GitHub Project](https://github.com/users/ciprian-rus/projects/5)
- [Backlog — GitHub Issues](https://github.com/ciprian-rus/sistem.digital/issues)
- [Roadmap M0–M7](ROADMAP.md)

## Domeniu

Platforma publică va fi disponibilă la **sistem.digital**.

## Licență

Codul este publicat sub licența Apache 2.0. Documentația și conținutul vor putea utiliza o licență deschisă distinctă, stabilită înainte de prima versiune publică.
