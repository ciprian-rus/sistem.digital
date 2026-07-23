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

test.describe('navigation and institutional shell', () => {
  for (const theme of themeNames) {
    test(`has no automatically detectable WCAG violations in ${theme}`, async ({
      page,
    }, testInfo) => {
      await page.addInitScript(({ key, value }) => window.localStorage.setItem(key, value), {
        key: themeStorageKey,
        value: theme,
      });
      await page.goto('/componente/navigatie');

      await expect(page.locator('html')).toHaveAttribute('data-sd-theme', theme);
      await expectNoAxeViolations(page, testInfo, `navigation-axe-${theme}`);
    });
  }

  test('exposes the authenticity banner, identity and canonical domain', async ({ page }) => {
    await page.goto('/componente/navigatie');

    await expect(
      page.getByRole('region', { name: 'Informație despre autenticitate' }),
    ).toContainText('Domeniul oficial este sistem.digital');
    await expect(page.getByRole('banner')).toContainText('Sistem Digital');
    await expect(page.getByRole('banner')).toContainText('Biblioteca de componente');
    await expect(page.getByRole('banner')).toContainText('sistem.digital');
  });

  test('uses correct landmarks and current-page semantics', async ({ page }) => {
    await page.goto('/componente/navigatie');

    const primaryNavigation = page.getByRole('navigation', { name: 'Navigație principală' });
    await expect(primaryNavigation).toBeVisible();
    await expect(page.getByRole('main')).toHaveAttribute('id', 'continut');
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(
      primaryNavigation.getByRole('link', { name: 'Componente', exact: true }),
    ).toHaveAttribute('aria-current', 'page');

    const breadcrumb = page.locator('#continut > .sd-breadcrumb');
    await expect(breadcrumb).toContainText('Acasă');
    await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText('Navigație');
  });

  test('opens and operates the mobile menu without JavaScript', async ({ browser }) => {
    const page = await browser.newPage({
      javaScriptEnabled: false,
      viewport: { width: 320, height: 900 },
    });

    try {
      await page.goto('/componente/navigatie');
      const disclosure = page.locator('details.sd-mobile-navigation');
      const summary = disclosure.locator('summary');

      await expect(summary).toBeVisible();
      await summary.focus();
      await page.keyboard.press('Enter');
      await expect(disclosure).toHaveAttribute('open', '');
      await expect(
        page.getByRole('navigation', { name: 'Navigație principală mobilă' }).getByRole('link', {
          name: 'Componente',
        }),
      ).toBeVisible();

      const box = await summary.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    } finally {
      await page.close();
    }
  });

  test('keeps a logical keyboard order through identity search theme and navigation', async ({
    page,
  }) => {
    await page.goto('/componente/navigatie');

    const expectedTargets = [
      page.getByRole('link', { name: 'Sari la conținut' }),
      page.getByRole('link', { name: 'sistem.digital', exact: true }),
      page.getByRole('link', { name: 'Sistem Digital — pagina principală' }),
      page.getByRole('searchbox', { name: 'Caută în Sistem Digital' }),
      page.getByRole('button', { name: 'Caută', exact: true }).first(),
      page.getByRole('combobox', { name: 'Aspect' }),
    ];

    for (const target of expectedTargets) {
      await page.keyboard.press('Tab');
      await expect(target).toBeFocused();
    }
  });

  test('returns linkable server-rendered search results', async ({ page }) => {
    await page.goto('/cautare?q=navigatie');

    await expect(page).toHaveURL(/\/cautare\?q=navigatie$/u);
    await expect(page.getByRole('heading', { name: /rezultat.*navigatie/iu })).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Navigație și structură instituțională' }),
    ).toHaveAttribute('href', '/componente/navigatie');
  });

  test('reflows the shell at 320 CSS pixels without horizontal page scrolling', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 900 });
    await page.goto('/componente/navigatie');

    const geometry = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
    }));

    expect(geometry.document).toBeLessThanOrEqual(geometry.viewport + 1);
    expect(geometry.body).toBeLessThanOrEqual(geometry.viewport + 1);
    await expect(page.locator('details.sd-mobile-navigation > summary')).toBeVisible();
    await expect(page.getByRole('searchbox', { name: 'Caută în Sistem Digital' })).toBeVisible();
  });
});
