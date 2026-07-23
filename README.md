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
- [Principiile de design](docs/product/design-principles.md)
- [Teme, culoare semantică și personalizare](docs/product/theme-policy.md)
- [Tipografie, spațiere, layout, focus și motion](docs/product/typography-layout-motion.md)
- [Politica generală de personalizare instituțională](docs/product/customization-policy.md)
- [Terminologia canonică a proiectului](docs/product/terminology.md)
- [Arhitectura informației pentru sistem.digital](docs/product/information-architecture.md)

## Platforma editorială M3

Documentația publică folosește Next.js App Router și MDX local versionat. Frontmatter-ul este validat la build, iar navigația, breadcrumbs și căutarea sunt derivate dintr-un sitemap canonic.

- [ADR — App Router și MDX local](docs/architecture/adr/mdx-editorial-platform.md)
- [Ghidul de content design în limba română](docs/content/content-style-guide.md)
- [Protocolul de tree testing M3](docs/research/tree-testing-m3.md)
- [Catalogul public](https://sistem.digital/componente)

## Cercetare

Cercetarea de birou este publică, iar cercetarea cu cetățeni, persoane cu dizabilități, funcționari și furnizori este adăugată etapizat.

- [Indexul cercetării](docs/research/README.md)
- [Audit comparativ al sistemelor mature](docs/research/comparative-audit.md)
- [Audit de birou al contextului românesc](docs/research/romania-desk-audit.md)
- [Planul cercetării de teren](docs/research/field-research-plan.md)

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
pnpm --filter @sistem-digital/tokens tokens:check
pnpm --filter @sistem-digital/tokens themes:check
pnpm --filter @sistem-digital/website test:a11y
pnpm --filter @sistem-digital/website test:visual
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

Fiecare pull request trebuie să treacă șapte status checks stabile:

- **Lockfile consistency** — sincronizarea reproductibilă a manifestelor și lockfile-ului;
- **Quality gates** — format, lint, typecheck, teste și build;
- **Documentation** — verificarea linkurilor locale din documentație;
- **Supply-chain security** — scanare de secrete și audit al dependențelor;
- **Accessibility** — axe-core și teste de tastatură în Chromium;
- **Visual regression** — comparație Playwright cu baseline-uri desktop și mobil versionate;
- **Release readiness** — tarball, SBOM, hash-uri și conținut publicabil.

Regulile recomandate pentru branch-ul principal sunt documentate în [Protecția branch-ului `main`](docs/governance/branch-protection.md).

## Arhitectură

```text
apps/
  website/
    src/content/          # sitemap canonic și conținut MDX
    src/app/              # routing și pagini publice
packages/
  tokens/
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
  research/
  content/
  architecture/
  governance/
  accessibility/
  security/
  contribution/
```

## Stadiu și planificare

**M0 — Fundația proiectului** este finalizat. **M2 — Biblioteca de componente MVP** este complet tehnic în stadiu alpha și așteaptă auditul manual #53. Proiectul se află în **M3 — Platforma publică și catalogul interactiv**.

- [Roadmap public — GitHub Project](https://github.com/users/ciprian-rus/projects/5)
- [Backlog — GitHub Issues](https://github.com/ciprian-rus/sistem.digital/issues)
- [Roadmap M0–M7](ROADMAP.md)

## Domeniu

Platforma publică este disponibilă la **sistem.digital**.

## Licență

Codul este publicat sub licența Apache 2.0. Documentația și conținutul vor putea utiliza o licență deschisă distinctă, stabilită înainte de prima versiune publică.
