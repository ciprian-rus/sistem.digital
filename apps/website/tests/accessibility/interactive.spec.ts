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

test.describe('interactive components', () => {
  for (const theme of themeNames) {
    test(`has no automatically detectable WCAG violations in ${theme}`, async ({
      page,
    }, testInfo) => {
      await page.addInitScript(({ key, value }) => window.localStorage.setItem(key, value), {
        key: themeStorageKey,
        value: theme,
      });
      await page.goto('/componente/interactive');
      await expect(page.locator('html')).toHaveAttribute('data-sd-theme', theme);
      await expectNoAxeViolations(page, testInfo, `interactive-axe-${theme}`);
    });
  }

  test('keeps only one enhanced accordion item open', async ({ page }) => {
    await page.goto('/componente/interactive');
    const accordion = page.locator('[data-sd-accordion="single"]');
    const items = accordion.locator(':scope > details');

    await expect(items.nth(0)).toHaveAttribute('open', '');
    await items.nth(1).locator('summary').click();
    await expect(items.nth(1)).toHaveAttribute('open', '');
    await expect(items.nth(0)).not.toHaveAttribute('open', '');
  });

  test('opens the dialog, supports Escape and restores focus', async ({ page }) => {
    await page.goto('/componente/interactive');
    const trigger = page.getByRole('link', { name: 'Revizuiește trimiterea' });
    const dialog = page.getByRole('dialog', { name: 'Trimite cererea către instituție?' });

    await trigger.focus();
    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(page.getByRole('button', { name: 'Închide' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('implements automatic tabs with arrows, Home and End', async ({ page }) => {
    await page.goto('/componente/interactive');
    const tabs = page.getByRole('tab');

    await expect(tabs).toHaveCount(3);
    await tabs.nth(0).focus();
    await page.keyboard.press('ArrowRight');
    await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel', { name: 'La ghișeu' })).toBeVisible();

    await page.keyboard.press('End');
    await expect(tabs.nth(2)).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('Home');
    await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  });

  test('supports autocomplete arrows, Enter and Escape', async ({ page }) => {
    await page.goto('/componente/interactive');
    const input = page.getByRole('combobox', { name: 'Instituție' });

    await input.fill('Cluj');
    await expect(input).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('ArrowDown');
    await expect(input).toHaveAttribute('aria-activedescendant', /option-0$/u);
    await page.keyboard.press('Enter');
    await expect(input).toHaveValue('Primăria Cluj-Napoca');
    await expect(input).toHaveAttribute('aria-expanded', 'false');

    await input.fill('Primăria');
    await page.keyboard.press('Escape');
    await expect(input).toHaveAttribute('aria-expanded', 'false');
  });

  test('announces, lists and removes selected files', async ({ page }) => {
    await page.goto('/componente/interactive');
    const input = page.getByLabel('Documente justificative');

    await input.setInputFiles({
      name: 'cerere.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('document demonstrativ'),
    });

    await expect(page.getByText(/cerere\.pdf/u)).toBeVisible();
    await expect(page.locator('[data-sd-file-status]')).toHaveText('1 fișier selectat.');
    await page.getByRole('button', { name: 'Elimină cerere.pdf' }).click();
    await expect(page.getByText(/cerere\.pdf/u)).toHaveCount(0);
    await expect(page.locator('[data-sd-file-status]')).toHaveText('0 fișiere selectate.');
  });

  test('keeps a complete fallback when JavaScript is disabled', async ({ browser }) => {
    const page = await browser.newPage({
      javaScriptEnabled: false,
      viewport: { width: 800, height: 900 },
    });
    try {
      await page.goto('/componente/interactive');
      await expect(page.getByText('Trimite cererea către instituție?')).toBeVisible();
      await expect(page.locator('[data-sd-tab-list]')).toBeHidden();
      await expect(page.locator('[data-sd-tab-panel]')).toHaveCount(3);
      for (const panel of await page.locator('[data-sd-tab-panel]').all())
        await expect(panel).toBeVisible();
      await expect(page.getByLabel('Instituție')).toHaveAttribute('list', 'institution-options');
      await expect(page.getByLabel('Documente justificative')).toBeVisible();
    } finally {
      await page.close();
    }
  });

  test('reflows at 320 CSS pixels without global horizontal scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/componente/interactive');
    const geometry = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));

    expect(geometry.document).toBeLessThanOrEqual(geometry.viewport + 1);
    expect(geometry.body).toBeLessThanOrEqual(geometry.viewport + 1);
    await expect(page.getByRole('navigation', { name: 'Progresul cererii' })).toBeVisible();
  });
});
