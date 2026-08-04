import type { RuleResult } from '../types.js';

const hexPattern = /^#[0-9a-f]{6}$/iu;

export interface ContrastPair {
  /** Identificator citit de om pentru pereche, folosit doar în dovezi (`evidence`). */
  id: string;
  foreground: string;
  background: string;
  /** Prag minim WCAG — 4.5 pentru text normal, 3 pentru text mare (18pt+/14pt bold+). */
  required: number;
}

function assertHex(value: string, context: string): string {
  if (!hexPattern.test(value)) {
    throw new Error(
      `${context} trebuie să fie o culoare hexazecimală pe șase cifre, primit: ${value}`,
    );
  }
  return value.toLowerCase();
}

// Algoritm identic cu packages/tokens/scripts/build-themes.mjs — luminanță
// relativă și raport de contrast WCAG. Orice modificare aici trebuie
// verificată și acolo, ca cele două să nu diveargă.
function relativeLuminance(hex: string): number {
  const components = [1, 3, 5]
    .map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255)
    .map((component) =>
      component <= 0.04045 ? component / 12.92 : ((component + 0.055) / 1.055) ** 2.4,
    );
  const weights = [0.2126, 0.7152, 0.0722];
  return components.reduce((sum, component, index) => sum + component * weights[index]!, 0);
}

export function contrastRatio(foreground: string, background: string): number {
  const first = relativeLuminance(assertHex(foreground, 'foreground'));
  const second = relativeLuminance(assertHex(background, 'background'));
  const lighter = Math.max(first, second);
  const darker = Math.min(first, second);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Regula sd-a11y-contrast: verifică fiecare pereche text/fundal furnizată
 * față de pragul ei minim. Vezi docs/product/validator-rules-inventory.md
 * pentru limitările documentate ale acestei reguli.
 */
export function checkContrast(pairs: readonly ContrastPair[]): RuleResult {
  if (pairs.length === 0) {
    return {
      id: 'sd-a11y-contrast',
      category: 'accessibility',
      severity: 'error',
      status: 'not-applicable',
      summary: 'Nicio pereche de culori furnizată pentru verificare.',
      explanation:
        'Regula calculează raportul de contrast WCAG (luminanță relativă) între fiecare pereche text/fundal declarată.',
      remediation:
        'Furnizează perechile de culori ale temei (vezi docs/product/theme-policy.md) pentru ca regula să se poată aplica.',
      evidence: [],
      limitations:
        'Verifică doar valorile de culoare furnizate, nu randarea reală a paginii — CSS suprascris la nivel de proiect poate produce un contrast real diferit.',
    };
  }

  const evidence = pairs.map((pair) => {
    const ratio = contrastRatio(pair.foreground, pair.background);
    return { id: pair.id, ratio: Math.round(ratio * 100) / 100, required: pair.required };
  });

  const failing = evidence.filter((entry) => entry.ratio < entry.required);

  return {
    id: 'sd-a11y-contrast',
    category: 'accessibility',
    severity: 'error',
    status: failing.length > 0 ? 'fail' : 'pass',
    summary:
      failing.length > 0
        ? `Contrastul e sub prag în ${failing.length} din ${pairs.length} perechi verificate.`
        : `Toate cele ${pairs.length} perechi verificate ating pragul minim de contrast.`,
    explanation:
      'Regula calculează raportul de contrast WCAG (luminanță relativă) între fiecare pereche text/fundal declarată. Un raport sub prag nu îndeplinește WCAG 2.2 AA.',
    remediation:
      'Ajustează valorile temei (vezi docs/product/theme-policy.md) sau alege un accent instituțional cu contrast suficient pentru perechile care eșuează.',
    evidence,
    limitations:
      'Verifică doar valorile de culoare furnizate, nu randarea reală a paginii — CSS suprascris la nivel de proiect poate produce un contrast real diferit.',
  };
}
