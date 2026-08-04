import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const ministerModelPaths = [
  '/exemple/minister-model',
  '/exemple/minister-model/servicii',
  '/exemple/cerere-informatii-publice',
] as const;

test.describe('Modelul sectorial Ministerul Model (Epic E)', () => {
  for (const path of ministerModelPaths) {
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
    await page.goto('/exemple/minister-model');
    await page.getByRole('link', { name: 'Vezi serviciile disponibile' }).click();
    await expect(page).toHaveURL(/\/exemple\/minister-model\/servicii$/u);
    await expect(
      page.getByRole('heading', { name: 'Servicii pentru cetățeni și instituții' }),
    ).toBeVisible();
  });

  test('marks in-preparation services distinctly and links the available one to the real flow', async ({
    page,
  }) => {
    await page.goto('/exemple/minister-model/servicii');

    await expect(
      page.getByRole('link', { name: 'Solicită informații de interes public' }),
    ).toHaveAttribute('href', '/exemple/cerere-informatii-publice');

    await expect(page.getByText('Disponibil online')).toBeVisible();
    await expect(page.getByText('În pregătire').first()).toBeVisible();
  });

  test('completes the public information request end-to-end without requiring a CNP', async ({
    page,
  }) => {
    await page.goto('/exemple/cerere-informatii-publice');
    await page.evaluate(() => window.localStorage.clear());
    await page.reload();

    await expect(
      page.getByRole('heading', { name: 'Solicită informații de interes public' }),
    ).toBeVisible();
    await page.getByRole('button', { name: 'Începe' }).click();
    await page.getByLabel('Da').check();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Fără cont').check();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Nume complet').fill('Persoană Exemplu');
    await page
      .getByLabel('Adresă de contact (e-mail sau adresă poștală)')
      .fill('persoana@exemplu.ro');
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByRole('button', { name: 'Continuă', exact: true }).click();
    await page.getByLabel('Declar că informațiile furnizate de mine sunt corecte.').check();
    await page.getByRole('button', { name: 'Trimite cererea demonstrativă' }).click();

    await expect(
      page.getByRole('heading', { name: 'Cererea demonstrativă a fost trimisă' }),
    ).toBeVisible();
  });
});
