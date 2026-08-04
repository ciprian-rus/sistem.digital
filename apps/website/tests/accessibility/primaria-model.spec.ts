import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const primariaModelPaths = ['/exemple/primaria-model', '/exemple/primaria-model/servicii'] as const;

test.describe('Modelul sectorial Primăria Model (Epic E)', () => {
  for (const path of primariaModelPaths) {
    test(`${path} is accessible`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole('main')).toHaveAttribute('id', 'continut');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test('links from the institutional page to the services catalog', async ({ page }) => {
    await page.goto('/exemple/primaria-model');
    await page.getByRole('link', { name: 'Vezi serviciile disponibile' }).click();
    await expect(page).toHaveURL(/\/exemple\/primaria-model\/servicii$/u);
    await expect(page.getByRole('heading', { name: 'Servicii pentru cetățeni' })).toBeVisible();
  });

  test('marks in-preparation services distinctly and links the available one to the real flow', async ({
    page,
  }) => {
    await page.goto('/exemple/primaria-model/servicii');

    await expect(
      page.getByRole('link', { name: 'Solicită o adeverință de la primărie' }),
    ).toHaveAttribute('href', '/exemple/adeverinta');

    await expect(page.getByText('Disponibil online')).toBeVisible();
    await expect(page.getByText('În pregătire').first()).toBeVisible();
  });
});
