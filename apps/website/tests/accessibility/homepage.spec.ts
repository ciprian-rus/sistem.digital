import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page, type TestInfo } from '@playwright/test';

import { themeNames, themeStorageKey, themes } from '@sistem-digital/tokens';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function expectNoAxeViolations(page: Page, testInfo: TestInfo, attachmentName: string) {
  const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

  await testInfo.attach(attachmentName, {
    body: JSON.stringify(results, null, 2),
    contentType: 'application/json',
  });

  expect(
    results.violations,
    JSON.stringify(
      results.violations.map(({ id, impact, nodes }) => ({
        id,
        impact,
        targets: nodes.map((node) => node.target),
      })),
      null,
      2,
    ),
  ).toEqual([]);
}

test.describe('homepage accessibility', () => {
  for (const theme of themeNames) {
    test(`has no automatically detectable WCAG violations in ${theme}`, async ({
      page,
    }, testInfo) => {
      await page.addInitScript(({ key, value }) => window.localStorage.setItem(key, value), {
        key: themeStorageKey,
        value: theme,
      });
      await page.goto('/');

      await expect(page.locator('html')).toHaveAttribute('data-sd-theme', theme);
      await expect(page.locator('html')).toHaveCSS('color-scheme', themes[theme].colorScheme);
      await expectNoAxeViolations(page, testInfo, `axe-results-${theme}`);
    });
  }

  test('exposes the skip link as the first keyboard target', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: 'Sari la conținut' });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });

  test('persists an explicit theme selected by the user', async ({ page }) => {
    await page.goto('/');
    const selector = page.getByRole('combobox', { name: 'Aspect' });

    await selector.selectOption('high-contrast-dark');
    await expect(page.locator('html')).toHaveAttribute('data-sd-theme', 'high-contrast-dark');
    await expect
      .poll(() => page.evaluate((key) => window.localStorage.getItem(key), themeStorageKey))
      .toBe('high-contrast-dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-sd-theme', 'high-contrast-dark');
    await expect(selector).toHaveValue('high-contrast-dark');
  });

  test('returns to the operating system preference without keeping stale storage', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/');
    const selector = page.getByRole('combobox', { name: 'Aspect' });

    await selector.selectOption('light');
    await selector.selectOption('system');

    await expect(page.locator('html')).toHaveAttribute('data-sd-theme', 'dark');
    await expect
      .poll(() => page.evaluate((key) => window.localStorage.getItem(key), themeStorageKey))
      .toBeNull();
  });

  test('keeps content operable when forced colors are active', async ({ page }, testInfo) => {
    await page.emulateMedia({ forcedColors: 'active' });
    await page.goto('/');

    await expect(page.getByRole('button', { name: 'Continuă' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Denumirea documentului' })).toBeEditable();
    await expectNoAxeViolations(page, testInfo, 'axe-results-forced-colors');
  });
});
