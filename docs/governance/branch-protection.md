# Protecția branch-ului `main`

## Obiectiv

Nicio schimbare nu intră în `main` fără un pull request verificat automat și fără posibilitate de rescriere accidentală a istoricului.

## Ruleset recomandat

Creează un repository ruleset numit `Protect main` cu target `main` și următoarele reguli:

- restricționează ștergerea branch-ului;
- blochează force push;
- solicită pull request înainte de merge;
- solicită rezolvarea tuturor conversațiilor;
- solicită trecerea status checks obligatorii;
- permite doar merge prin squash;
- păstrează bypass pentru administratorul repository-ului numai pentru incidente documentate.

## Status checks obligatorii

- `Lockfile consistency`
- `Quality gates`
- `Documentation`
- `Supply-chain security`
- `Accessibility`
- `Release readiness`

Nu este necesară încă aprobarea unui reviewer, deoarece proiectul se află în etapa inițială și are un singur maintainer. După formarea echipei de maintainers se va solicita minimum o aprobare din partea unei alte persoane.

## Reguli care nu se activează încă

- signed commits obligatorii — integrarea GitHub utilizată pentru contribuții nu semnează toate commiturile;
- branch up-to-date obligatoriu — se activează după introducerea unui mecanism automat de actualizare a branch-urilor;
- linear history — squash merge asigură deja un istoric principal compact.

## Procedură de urgență

Orice bypass trebuie să fie urmat de:

1. issue public care explică incidentul;
2. verificare CI imediată pe `main`;
3. pull request de remediere, dacă este necesar;
4. consemnarea deciziei în registrul de arhitectură sau securitate.
