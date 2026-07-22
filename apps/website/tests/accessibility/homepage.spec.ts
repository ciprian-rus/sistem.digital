import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

test.describe('homepage accessibility', () => {
  test(
    'has no automatically detectable WCAG A or AA violations',
    async ({ page }, testInfo) => {
      await page.goto('/');

      const results = await new AxeBuilder({ page }).withTags(wcagTags).analyze();

      await testInfo.attach('axe-results', {
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
    },
  );

  test('exposes the skip link as the first keyboard target', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: 'Sari la conținut' });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();
  });
});
