import { expect, test } from '@playwright/test';

import { themeStorageKey } from '@sistem-digital/tokens';

const scenarios = [
  { project: 'desktop-chromium', theme: 'light' },
  { project: 'desktop-chromium', theme: 'dark' },
  { project: 'mobile-chromium', theme: 'light' },
  { project: 'mobile-chromium', theme: 'high-contrast-dark' },
] as const;

for (const scenario of scenarios) {
  test(`${scenario.project} ${scenario.theme}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== scenario.project);

    await page.addInitScript(({ key, value }) => window.localStorage.setItem(key, value), {
      key: themeStorageKey,
      value: scenario.theme,
    });
    await page.goto('/componente/interactive');
    await expect(page.locator('html')).toHaveAttribute('data-sd-theme', scenario.theme);
    await page.evaluate(() => document.fonts.ready);
    await page.locator('dialog[data-sd-dialog]').evaluate((dialog) => {
      if (dialog instanceof HTMLDialogElement && dialog.open) dialog.close();
    });

    await expect(page).toHaveScreenshot(`interactive-${scenario.theme}.png`, {
      fullPage: true,
    });
  });
}
