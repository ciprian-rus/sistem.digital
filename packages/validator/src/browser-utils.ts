import { chromium, type Browser, type Page } from 'playwright-core';

export interface BrowserOptions {
  /**
   * Cale către un executabil Chromium existent. Acest pachet nu descarcă
   * browsere — utilizatorul trebuie să aibă unul disponibil (de exemplu prin
   * `npx playwright install chromium`) și să indice calea, sau să seteze
   * variabila de mediu SISTEM_DIGITAL_VALIDATOR_CHROMIUM.
   */
  executablePath?: string;
  /**
   * O instanță de browser deja lansată, de partajat între mai multe reguli
   * (de exemplu cea creată de CLI, care rulează toate regulile Chromium
   * împotriva aceleiași ținte). Dacă lipsește, funcția își lansează și
   * închide propriul browser, ca înainte — comportament neschimbat pentru
   * apelurile directe de bibliotecă.
   */
  browser?: Browser;
}

/**
 * Rulează `fn` cu o pagină nouă, fie dintr-un browser partajat
 * (`options.browser`), fie dintr-unul lansat și închis doar pentru acest
 * apel. Pagina e închisă mereu; browserul e închis doar dacă a fost lansat
 * aici — un browser primit prin `options.browser` rămâne deschis, în grija
 * apelantului (de obicei CLI-ul, care îl închide o singură dată la final).
 */
export async function withPage<T>(
  options: BrowserOptions,
  fn: (page: Page) => Promise<T>,
): Promise<T> {
  const executablePath = options.executablePath ?? process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM;
  const browser =
    options.browser ?? (await chromium.launch(executablePath ? { executablePath } : {}));
  const ownsBrowser = !options.browser;
  const page = await browser.newPage();
  try {
    return await fn(page);
  } finally {
    await page.close();
    if (ownsBrowser) await browser.close();
  }
}
