# Sursele canonice DTCG

Acest director conține singurele fișiere care se editează atunci când se adaugă sau se modifică design tokens.

## Fișiere

- `manifest.json` — ordinea surselor, straturile și verificările transversale;
- `core.tokens.json` — primitive;
- `semantic.tokens.json` — roluri publice stabile;
- `component.tokens.json` — decizii strict locale componentelor.

## Flux de lucru

1. Modifică fișierul canonic potrivit.
2. Rulează:

   ```bash
   pnpm --filter @sistem-digital/tokens tokens:generate
   ```

3. Verifică artefactele și testele:

   ```bash
   pnpm --filter @sistem-digital/tokens tokens:check
   pnpm --filter @sistem-digital/tokens test
   ```

4. Adaugă un Changeset pentru orice schimbare publică.
5. Documentează migrarea dacă se schimbă o cale, un tip sau o semantică.

În pull request-urile interne, workflow-ul de sincronizare regenerează automat artefactele și le comite pe branch.

## Alegerea stratului

### Core

Folosește `core` dacă valoarea nu exprimă un rol de interfață și poate alimenta mai multe roluri.

Exemplu:

```json
{
  "core": {
    "color": {
      "$type": "color",
      "blue": {
        "600": {
          "$value": {
            "colorSpace": "srgb",
            "components": [0.113725, 0.47451, 0.74902],
            "hex": "#1d79bf"
          }
        }
      }
    }
  }
}
```

### Semantic

Folosește `semantic` pentru un rol stabil pe care componentele și temele îl pot partaja.

```json
{
  "semantic": {
    "color": {
      "$type": "color",
      "link": {
        "default": {
          "$value": "{core.color.cyan.700}"
        }
      }
    }
  }
}
```

### Component

Folosește `component` numai dacă decizia nu are un sens reutilizabil global.

```json
{
  "component": {
    "button": {
      "minHeight": {
        "$type": "dimension",
        "$value": "{semantic.target.minimum}"
      }
    }
  }
}
```

## Reguli

- nu duplica o valoare dacă poate fi exprimată prin alias;
- nu folosi numele vizual al unei valori pentru un rol semantic;
- nu folosi primitive direct în componente dacă există rol semantic;
- nu introduce token-uri pentru fiecare proprietate CSS;
- nu schimba tipul unui alias;
- nu reutiliza un rol existent pentru alt sens;
- nu edita fișierele generate din `src`;
- nu introduce timestamp-uri sau date dependente de mediu în build.

## Deprecation

Un token public aflat în retragere primește `$deprecated` cu explicație și alternativă. Eliminarea are loc într-o versiune majoră, cu excepția incidentelor de securitate care impun o remediere accelerată.
