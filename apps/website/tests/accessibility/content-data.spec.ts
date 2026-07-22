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

test.describe('content and data components', () => {
  for (const theme of themeNames) {
    test(`has no automatically detectable WCAG violations in ${theme}`, async ({
      page,
    }, testInfo) => {
      await page.addInitScript(({ key, value }) => window.localStorage.setItem(key, value), {
        key: themeStorageKey,
        value: theme,
      });
      await page.goto('/componente/continut-date');

      await expect(page.locator('html')).toHaveAttribute('data-sd-theme', theme);
      await expectNoAxeViolations(page, testInfo, `content-data-axe-${theme}`);
    });
  }

  test('keeps status meaning and external-link context in text', async ({ page }) => {
    await page.goto('/componente/continut-date');

    await expect(page.getByText('Activ', { exact: true })).toBeVisible();
    await expect(page.getByText('Necesită verificare', { exact: true })).toBeVisible();
    await expect(
      page.getByRole('link', { name: /repository-ul GitHub.*site extern/iu }),
    ).toBeVisible();
  });

  test('uses a semantic table with caption, scoped headers and local overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/componente/continut-date');

    const table = page.getByRole('table', {
      name: /Situația cererilor digitale — trimestrul II 2026/iu,
    });
    await expect(table).toBeVisible();
    await expect(table.locator('thead th[scope="col"]')).toHaveCount(4);
    await expect(table.locator('tbody th[scope="row"]')).toHaveCount(3);

    const region = page.getByRole('region', {
      name: /tabel derulabil orizontal/iu,
    });
    await region.focus();
    await expect(region).toBeFocused();

    const geometry = await region.evaluate((element) => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth,
    }));
    expect(geometry.scrollWidth).toBeGreaterThan(geometry.clientWidth);
  });

  test('keeps card interaction models unambiguous', async ({ page }) => {
    await page.goto('/componente/continut-date');

    const linkedCard = page.locator('.sd-card:not(.sd-card--actions)').first();
    await expect(linkedCard.getByRole('link')).toHaveCount(1);

    const actionsCard = page.locator('.sd-card--actions').first();
    await expect(actionsCard.getByRole('link')).toHaveCount(2);
    await expect(actionsCard.locator('.sd-card__link')).toHaveCount(0);
  });

  test('operates native details with the keyboard', async ({ page }) => {
    await page.goto('/componente/continut-date');

    const details = page.locator('details.sd-details').first();
    const summary = details.locator('summary');
    await summary.focus();
    await page.keyboard.press('Enter');
    await expect(details).toHaveAttribute('open', '');
    await expect(details).toContainText('instituția responsabilă a confirmat valorile');
  });

  test('publishes pagination and machine-readable update metadata', async ({ page }) => {
    await page.goto('/componente/continut-date');

    const pagination = page.getByRole('navigation', { name: 'Paginarea rezultatelor' });
    await expect(pagination.locator('[aria-current="page"]')).toContainText('2');
    await expect(pagination.getByRole('link', { name: 'Pagina 3', exact: true })).toHaveAttribute(
      'href',
      '?page=3',
    );
    await expect(page.locator('time')).toHaveAttribute('datetime', '2026-07-22T18:30:00+03:00');
  });

  test('reflows at 320 CSS pixels without page-level horizontal scrolling', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/componente/continut-date');

    const geometry = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));

    expect(geometry.document).toBeLessThanOrEqual(geometry.viewport + 1);
    expect(geometry.body).toBeLessThanOrEqual(geometry.viewport + 1);
    await expect(page.locator('.sd-summary-list__row').first()).toBeVisible();
    await expect(page.getByRole('navigation', { name: 'Paginarea rezultatelor' })).toBeVisible();
  });
});
