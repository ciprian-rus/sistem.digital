# Configurare GitHub Project — Sistem Digital

## Project

**Nume:** Sistem Digital — Roadmap

**Descriere:** Roadmap-ul public pentru dezvoltarea sistemului de design, platformei sistem.digital, comunității și instrumentelor de conformare.

## Câmpuri

### Status
- Backlog
- Ready
- In progress
- In review
- Blocked
- Done

### Milestone logic
- M0 — Fundația proiectului
- M1 — Fundamente și design tokens
- M2 — Componente MVP
- M3 — Platforma sistem.digital
- M4 — Pattern-uri și serviciu de referință
- M5 — Startere și distribuție
- M6 — Comunitate și guvernanță publică
- M7 — Validator și adopție pilot

### Priority
- P0 — Critical
- P1 — High
- P2 — Medium
- P3 — Low

### Type
- Epic
- Feature
- Component
- Pattern
- Documentation
- Research
- Infrastructure
- Governance
- Security

### Area
- Product
- UX research
- Foundations
- Components
- Accessibility
- Content design
- Website
- Distribution
- Community
- Validator
- Adoption

### Effort
- XS
- S
- M
- L
- XL

### Target release
Câmp text sau iterație, completat numai după estimarea capacității echipei.

## Views

### 1. Roadmap
Layout: Roadmap
Group by: Milestone logic
Filter: status is not Done

### 2. Delivery board
Layout: Board
Group by: Status
Sort: Priority asc

### 3. Current milestone
Layout: Table
Filter: milestone logic = milestone-ul activ
Fields: Status, Priority, Type, Area, Effort, Assignees

### 4. Components
Layout: Table
Filter: Type = Component OR Pattern
Group by: Area

### 5. Community proposals
Layout: Table
Filter: Type = Research OR Governance
Sort: reactions and updated date

### 6. Blocked and risks
Layout: Table
Filter: Status = Blocked OR Priority = P0

### 7. Completed
Layout: Table
Filter: Status = Done
Group by: Milestone logic

## Automatizări recomandate

- issue nou → Backlog;
- pull request asociat deschis → In review;
- pull request asociat merged → Done;
- issue redeschis → Ready;
- item cu status Blocked este afișat în view-ul de riscuri.

## Milestones GitHub

Milestones repository-level recomandate:

1. M0 — Fundația proiectului
2. M1 — Fundamente și design tokens
3. M2 — Componente MVP
4. M3 — Platforma sistem.digital
5. M4 — Pattern-uri și serviciu de referință
6. M5 — Startere și distribuție
7. M6 — Comunitate și guvernanță publică
8. M7 — Validator și adopție pilot

Datele limită nu se completează până când există o echipă și o estimare realistă a capacității.
