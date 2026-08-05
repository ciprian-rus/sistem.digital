import { withPage, type BrowserOptions } from '../browser-utils.js';
import type { RuleResult } from '../types.js';

export interface ComponentStructureCheckOptions extends BrowserOptions {
  /** Prefixul claselor CSS ale sistemului. Implicit "sd-". */
  classPrefix?: string;
}

interface ComponentMarkers {
  classRoots: string[];
  dataAttributes: string[];
}

const DEFAULT_CLASS_PREFIX = 'sd-';

async function collectComponentMarkers(
  url: string,
  options: BrowserOptions,
  classPrefix: string,
): Promise<ComponentMarkers> {
  return withPage(options, async (page) => {
    await page.goto(url, { waitUntil: 'networkidle' });
    return await page.evaluate((prefix) => {
      const classRootSet = new Set<string>();
      const dataAttributeSet = new Set<string>();
      const dataAttributePrefix = `data-${prefix}`;

      for (const element of Array.from(document.querySelectorAll('*'))) {
        const className = typeof element.className === 'string' ? element.className : '';
        for (const token of className.split(/\s+/u)) {
          if (!token.startsWith(prefix)) continue;
          // Rădăcina BEM a clasei (înainte de __element sau --modificator),
          // ca sd-alert, sd-alert__title și sd-alert--info să numere ca o
          // singură componentă folosită, nu trei.
          const root = token.split(/__|--/u)[0]!;
          classRootSet.add(root);
        }
        for (const attribute of Array.from(element.attributes)) {
          if (attribute.name.startsWith(dataAttributePrefix)) dataAttributeSet.add(attribute.name);
        }
      }

      return {
        classRoots: [...classRootSet].sort(),
        dataAttributes: [...dataAttributeSet].sort(),
      };
    }, classPrefix);
  });
}

/**
 * Regula sd-content-component-structure: verifică prezența claselor
 * `sd-*`/atributelor `data-sd-*` așteptate în markup-ul randat — singurul
 * mod indirect de a confirma că un proiect chiar randează componente
 * Sistem Digital, nu doar are pachetele instalate ca dependență neutilizată.
 * Vezi docs/product/validator-rules-inventory.md pentru context.
 */
export async function checkComponentStructure(
  url: string,
  options: ComponentStructureCheckOptions = {},
): Promise<RuleResult> {
  const classPrefix = options.classPrefix ?? DEFAULT_CLASS_PREFIX;
  const { classRoots, dataAttributes } = await collectComponentMarkers(url, options, classPrefix);
  const totalMarkers = classRoots.length + dataAttributes.length;

  return {
    id: 'sd-content-component-structure',
    category: 'content',
    severity: 'error',
    status: totalMarkers > 0 ? 'pass' : 'fail',
    summary:
      totalMarkers > 0
        ? `Pagina folosește ${classRoots.length} componente Sistem Digital distincte (clase „${classPrefix}*”) și ${dataAttributes.length} atribute „data-${classPrefix}*”.`
        : `Pagina nu conține niciun marker Sistem Digital (nicio clasă „${classPrefix}*” sau atribut „data-${classPrefix}*”).`,
    explanation:
      'Verifică markup-ul randat pentru prezența claselor CSS și a atributelor data- ale Sistem Digital, ca dovadă indirectă că proiectul chiar randează componente ale sistemului, nu doar are pachetele instalate ca dependență neutilizată.',
    remediation:
      totalMarkers > 0
        ? 'Nicio acțiune necesară.'
        : 'Verifică dacă CSS-ul Sistem Digital e încărcat pe această pagină, dacă markup-ul componentelor e prezent în HTML-ul randat și dacă un instrument de build nu a redenumit clasele.',
    evidence: { classRoots, dataAttributes },
    limitations:
      'Verifică doar prezența markerilor sintactici (clase, atribute data-) — nu validează dacă structura DOM respectă efectiv contractul complet al componentei (ordine, atribute ARIA necesare etc.), parțial acoperit de sd-a11y-axe-wcag. Un proiect care redenumește complet clasele (de exemplu printr-un instrument CSS Modules agresiv) ar putea produce fals-negativ.',
  };
}
