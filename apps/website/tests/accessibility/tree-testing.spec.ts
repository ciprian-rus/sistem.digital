import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('tree testing', () => {
  test('supports the anonymous participant flow with keyboard-accessible controls', async ({
    page,
  }) => {
    await page.goto('/cercetare/tree-testing');

    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Structura platformei trebuie să fie clară înainte să devină standard.',
      }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Începe testul' }).click();
    await page.getByLabel('Design sau cercetare UX').check();
    await page.getByLabel('Nu', { exact: true }).check();
    await page.getByRole('button', { name: 'Continuă la sarcini' }).click();

    await expect(page.getByText('Sarcina 1 din 10')).toBeVisible();
    await page.getByRole('button', { name: 'Fundamente' }).click();
    await page.getByLabel('Prezentare generală').check();
    await expect(page.getByRole('button', { name: 'Următoarea sarcină' })).toBeEnabled();

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('is not indexable while the study is collecting responses', async ({ page }) => {
    await page.goto('/cercetare/tree-testing');
    await expect(page.locator('meta[name="robots"]').first()).toHaveAttribute('content', /noindex/);
  });
});
