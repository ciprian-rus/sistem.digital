import { expect, test } from '@playwright/test';

import { themeStorageKey } from '@sistem-digital/tokens';

const scenarios = [
  { project: 'desktop-chromium', theme: 'light' },
  { project: 'mobile-chromium', theme: 'high-contrast-dark' },
] as const;

for (const scenario of scenarios) {
  test(`${scenario.project} ${scenario.theme}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== scenario.project);

    await page.addInitScript(({ key, value }) => window.localStorage.setItem(key, value), {
      key: themeStorageKey,
      value: scenario.theme,
    });
    await page.goto('/componente/catalog?tip=component&familie=interactive');
    await expect(page.locator('html')).toHaveAttribute('data-sd-theme', scenario.theme);
    await page.evaluate(() => document.fonts.ready);

    await expect(page).toHaveScreenshot(`catalog-${scenario.theme}.png`, {
      fullPage: true,
    });
  });
}
