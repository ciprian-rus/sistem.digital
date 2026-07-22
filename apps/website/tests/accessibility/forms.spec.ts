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

test.describe('form components', () => {
  for (const theme of themeNames) {
    test(`has no automatically detectable WCAG violations in ${theme}`, async ({
      page,
    }, testInfo) => {
      await page.addInitScript(({ key, value }) => window.localStorage.setItem(key, value), {
        key: themeStorageKey,
        value: theme,
      });
      await page.goto('/componente/formulare');

      await expect(page.locator('html')).toHaveAttribute('data-sd-theme', theme);
      await expect(page.locator('[data-sd-error-summary]')).toBeFocused();
      await expectNoAxeViolations(page, testInfo, `forms-axe-${theme}`);

      await testInfo.attach(`forms-${theme}`, {
        body: await page.screenshot({ fullPage: true }),
        contentType: 'image/png',
      });
    });
  }

  test('associates hints and errors with the invalid email field', async ({ page }) => {
    await page.goto('/componente/formulare');

    const email = page.getByRole('textbox', { name: 'Adresa de e-mail' });
    await expect(email).toHaveAttribute('aria-invalid', 'true');
    await expect(email).toHaveAccessibleDescription(
      /Vom trimite confirmarea cererii.*Introdu o adresă în formatul nume@exemplu\.ro/u,
    );

    const message = page.locator('#email-error');
    await expect(message).toContainText('Introdu o adresă');
    const prefix = await message.evaluate((element) => getComputedStyle(element, '::before').content);
    expect(prefix).toContain('Eroare:');
  });

  test('moves focus from the error summary link to the invalid field', async ({ page }) => {
    await page.goto('/componente/formulare');

    const summary = page.locator('[data-sd-error-summary]');
    await expect(summary).toBeFocused();
    await summary.getByRole('link', { name: 'Introdu adresa de e-mail' }).click();
    await expect(page.locator('#email')).toBeFocused();
  });

  test('keeps native radio and checkbox controls keyboard operable', async ({ page }) => {
    await page.goto('/componente/formulare');

    const counter = page.getByRole('radio', { name: /Ridicare de la ghișeu/u });
    await counter.focus();
    await page.keyboard.press('Space');
    await expect(counter).toBeChecked();

    const confirmation = page.getByRole('checkbox', {
      name: 'Confirm că informațiile introduse sunt corecte',
    });
    await confirmation.focus();
    await page.keyboard.press('Space');
    await expect(confirmation).toBeChecked();
  });

  test('reflows at 320 CSS pixels without page-level horizontal scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/componente/formulare');

    const geometry = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));

    expect(geometry.document).toBeLessThanOrEqual(geometry.viewport + 1);
    expect(geometry.body).toBeLessThanOrEqual(geometry.viewport + 1);
    await expect(page.getByRole('button', { name: 'Trimite din nou' })).toBeVisible();
  });

  test('keeps interactive targets at least 44 CSS pixels high', async ({ page }) => {
    await page.goto('/componente/formulare');

    const digitalRadio = page.getByRole('radio', { name: /În format digital/u });
    const confirmation = page.getByRole('checkbox', {
      name: 'Confirm că informațiile introduse sunt corecte',
    });

    for (const target of [
      page.locator('#email'),
      page.locator('#service-type'),
      page.locator('#attachment'),
      digitalRadio.locator('..'),
      confirmation.locator('..'),
      page.getByRole('button', { name: 'Trimite din nou' }),
    ]) {
      const box = await target.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });

  test('distinguishes readonly and disabled controls semantically', async ({ page }) => {
    await page.goto('/componente/formulare');

    const readonly = page.locator('#readonly-reference');
    const disabled = page.locator('#disabled-department');

    await expect(readonly).toHaveAttribute('readonly', '');
    await expect(readonly).toBeEditable({ editable: false });
    await expect(disabled).toBeDisabled();
    await expect(readonly).not.toHaveCSS('cursor', 'not-allowed');
    await expect(disabled).toHaveCSS('cursor', 'not-allowed');
  });
});
