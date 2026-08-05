import { existsSync } from 'node:fs';

import { chromium } from 'playwright-core';
import { describe, expect, it } from 'vitest';

import { withPage } from './browser-utils.js';

// Vezi accessibility.test.ts pentru explicația acestui tipar de omitere.
const executablePath =
  process.env.SISTEM_DIGITAL_VALIDATOR_CHROMIUM ??
  (existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined);

const describeIfChromium = executablePath ? describe : describe.skip;

describeIfChromium('withPage', () => {
  it('launches and closes its own browser when none is provided', async () => {
    const result = await withPage({ executablePath }, async (page) => {
      await page.goto('about:blank');
      return page.url();
    });
    expect(result).toBe('about:blank');
  }, 30_000);

  it('reuses a provided browser instead of launching a new one, and leaves it open', async () => {
    const browser = await chromium.launch({ executablePath });
    try {
      const first = await withPage({ browser }, async (page) => {
        await page.goto('about:blank');
        return page.url();
      });
      // Dacă withPage ar fi închis browserul partajat, acest al doilea apel
      // ar eșua — dovada că browserul rămâne în grija apelantului, nu al
      // withPage, atunci când e primit prin opțiuni.
      const second = await withPage({ browser }, async (page) => {
        await page.goto('about:blank');
        return page.url();
      });
      expect(first).toBe('about:blank');
      expect(second).toBe('about:blank');
      expect(browser.isConnected()).toBe(true);
    } finally {
      await browser.close();
    }
  }, 30_000);
});
