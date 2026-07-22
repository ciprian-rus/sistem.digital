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
```

Platforma locală este disponibilă implicit la `http://localhost:3000`.

## Integrare continuă

Fiecare pull request trebuie să treacă trei status checks stabile:

- **Quality gates** — format, lint, typecheck, teste și build;
- **Documentation** — verificarea linkurilor locale din documentație;
- **Supply-chain security** — scanare de secrete și audit al dependențelor.

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
  architecture/
  governance/
  accessibility/
  contribution/
```

## Stadiu și planificare

Proiectul se află în **M0 — Fundația proiectului**.

- [Roadmap public — GitHub Project](https://github.com/users/ciprian-rus/projects/5)
- [Backlog — GitHub Issues](https://github.com/ciprian-rus/sistem.digital/issues)
- [Roadmap M0–M7](ROADMAP.md)

## Domeniu

Platforma publică va fi disponibilă la **sistem.digital**.

## Licență

Codul este publicat sub licența Apache 2.0. Documentația și conținutul vor putea utiliza o licență deschisă distinctă, stabilită înainte de prima versiune publică.
