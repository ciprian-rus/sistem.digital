import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page, type TestInfo } from '@playwright/test';

import { themeNames, themeStorageKey } from '@sistem-digital/tokens';

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

test.describe('versioned catalog', () => {
  for (const theme of themeNames) {
    test(`has no automatically detectable WCAG violations in ${theme}`, async ({
      page,
    }, testInfo) => {
      await page.addInitScript(({ key, value }) => window.localStorage.setItem(key, value), {
        key: themeStorageKey,
        value: theme,
      });
      await page.goto('/componente/catalog?tip=component&familie=interactive');
      await expect(page.locator('html')).toHaveAttribute('data-sd-theme', theme);
      await expectNoAxeViolations(page, testInfo, `catalog-axe-${theme}`);
    });
  }

  test('filters server-rendered results and keeps the state in the URL', async ({ page }) => {
    await page.goto('/componente/catalog');
    await page.getByLabel('Tip').selectOption('component');
    await page.getByLabel('Familie').selectOption('interactive');
    await page.getByRole('button', { name: 'Aplică filtrele' }).click();

    await expect(page).toHaveURL(/tip=component.*familie=interactive|familie=interactive.*tip=component/u);
    await expect(page.getByRole('heading', { name: '7 rezultate' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dialog', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Label', exact: true })).toHaveCount(0);
  });

  test('generates an individual page with explicit package version and imports', async ({ page }) => {
    await page.goto('/componente/catalog/interactive-dialog');

    await expect(page.getByRole('heading', { level: 1, name: 'Dialog' })).toBeVisible();
    await expect(page.getByText('@sistem-digital/components', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('0.1.0-alpha.0', { exact: true })).toBeVisible();
    await expect(page.getByText('@sistem-digital/components/interactive.css', { exact: true })).toBeVisible();
    await expect(page.getByText('enhanceDialogs', { exact: false })).toBeVisible();
    await expect(page.getByRole('link', { name: /Changelog/iu })).toBeVisible();
  });

  test('uses the same markup source for preview and displayed code', async ({ page }) => {
    await page.goto('/componente/catalog/interactive-dialog');

    const preview = page.getByRole('region', { name: 'Previzualizare Dialog' });
    await expect(preview.locator('[data-sd-dialog]')).toHaveCount(1);
    const code = page.getByLabel(/Markup canonic; cod html/iu);
    await expect(code).toContainText('data-sd-dialog');
    await expect(code).toContainText('catalog-dialog-title');
  });

  test('keeps progressive enhancement functional inside the catalog preview', async ({ page }) => {
    await page.goto('/componente/catalog/interactive-dialog');
    const preview = page.getByRole('region', { name: 'Previzualizare Dialog' });
    const trigger = preview.getByRole('link', { name: 'Revizuiește' });
    const dialog = page.getByRole('dialog', { name: 'Trimite cererea?' });

    await trigger.focus();
    await trigger.click();
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('keeps the canonical markup readable without JavaScript', async ({ browser }) => {
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 800, height: 900 } });
    try {
      await page.goto('/componente/catalog/interactive-dialog');
      await expect(page.getByText('Trimite cererea?')).toBeVisible();
      await expect(page.getByText('Vei primi confirmarea în inbox.')).toBeVisible();
      await expect(page.getByLabel(/Markup canonic; cod html/iu)).toBeVisible();
    } finally {
      await page.close();
    }
  });

  test('reflows list and detail pages at 320 CSS pixels', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });

    for (const pathname of [
      '/componente/catalog?familie=forms',
      '/componente/catalog/forms-error-summary',
    ]) {
      await page.goto(pathname);
      const geometry = await page.evaluate(() => ({
        viewport: document.documentElement.clientWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      expect(geometry.document).toBeLessThanOrEqual(geometry.viewport + 1);
      expect(geometry.body).toBeLessThanOrEqual(geometry.viewport + 1);
    }
  });
});
