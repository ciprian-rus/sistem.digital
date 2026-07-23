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

test.describe('M3 documentation platform', () => {
  for (const theme of themeNames) {
    test(`has no automatically detectable WCAG violations in ${theme}`, async ({
      page,
    }, testInfo) => {
      await page.addInitScript(({ key, value }) => window.localStorage.setItem(key, value), {
        key: themeStorageKey,
        value: theme,
      });
      await page.goto('/fundamente');
      await expect(page.locator('html')).toHaveAttribute('data-sd-theme', theme);
      await expectNoAxeViolations(page, testInfo, `documentation-axe-${theme}`);
    });
  }

  test('uses the canonical editorial template and version metadata', async ({ page }) => {
    await page.goto('/fundamente');

    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Fundamentele Sistem Digital');
    await expect(page.getByRole('main')).toHaveAttribute('id', 'continut');
    await expect(page.getByRole('navigation', { name: 'În secțiunea Fundamente' })).toBeVisible();
    await expect(page.getByText('0.1.0-alpha.0', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Alpha', { exact: true }).first()).toBeVisible();
    await expect(page.locator('time[datetime="2026-07-23"]')).toBeVisible();
  });

  test('derives breadcrumbs and global navigation from the taxonomy', async ({ page }) => {
    await page.goto('/componente');

    const primaryNavigation = page.getByRole('navigation', { name: 'Navigație principală' });
    await expect(primaryNavigation.getByRole('link', { name: 'Componente' })).toHaveAttribute(
      'aria-current',
      'page',
    );
    const breadcrumb = page.locator('#continut > .sd-breadcrumb');
    await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText('Catalogul componentelor');
    await expect(page.getByRole('link', { name: 'Formulare și validare' })).toHaveAttribute(
      'href',
      '/componente/formulare',
    );
  });

  test('keeps essential documentation readable without JavaScript', async ({ browser }) => {
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 800, height: 900 } });
    try {
      await page.goto('/ghiduri');
      await expect(page.getByRole('heading', { name: 'Ghiduri de implementare și adopție' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Pentru dezvoltatori' })).toBeVisible();
      await expect(page.getByText('Conținutul este parte din serviciu')).toBeVisible();
    } finally {
      await page.close();
    }
  });

  test('offers an accessible code copy action while keeping the code selectable', async ({ page }) => {
    await page.goto('/fundamente');
    const button = page.getByRole('button', { name: 'Copiază codul' });
    const code = page.getByLabel(/Importul minim al fundației; cod css/iu);

    await expect(button).toBeVisible();
    await expect(code).toBeVisible();
    await button.click();
    await expect(page.getByText(/Cod copiat|Copierea automată/iu)).toBeAttached();
  });

  test('reflows the documentation layout at 320 CSS pixels', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/componente');

    const geometry = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));

    expect(geometry.document).toBeLessThanOrEqual(geometry.viewport + 1);
    expect(geometry.body).toBeLessThanOrEqual(geometry.viewport + 1);
    await expect(page.getByRole('navigation', { name: 'În secțiunea Componente' })).toBeVisible();
  });
});
