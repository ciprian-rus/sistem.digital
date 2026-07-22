import { expect, test, type Locator, type Page } from '@playwright/test';

async function tabUntilFocused(page: Page, target: Locator, maximumTabs = 24) {
  for (let index = 0; index < maximumTabs; index += 1) {
    if (await target.evaluate((element) => element === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  throw new Error(`Element was not reached after ${maximumTabs} Tab presses`);
}

async function expectVisibleFocus(target: Locator) {
  const focusStyle = await target.evaluate((element) => {
    const style = getComputedStyle(element);
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
      outlineColor: style.outlineColor,
      boxShadow: style.boxShadow,
    };
  });

  expect(focusStyle.outlineStyle).not.toBe('none');
  expect(focusStyle.outlineWidth).toBeGreaterThanOrEqual(3);
  expect(focusStyle.outlineColor).not.toBe('rgba(0, 0, 0, 0)');
  expect(focusStyle.boxShadow).not.toBe('none');
}

function durationInSeconds(value: string) {
  return value.split(',').map((item) => {
    const duration = item.trim();
    if (duration.endsWith('ms')) return Number.parseFloat(duration) / 1000;
    if (duration.endsWith('s')) return Number.parseFloat(duration);
    return Number.POSITIVE_INFINITY;
  });
}

test.describe('responsive structural foundations', () => {
  for (const scenario of [
    { label: '200 percent zoom equivalent', width: 640 },
    { label: '400 percent zoom equivalent', width: 320 },
  ]) {
    test(`reflows without page-level horizontal scrolling at ${scenario.label}`, async ({ page }) => {
      await page.setViewportSize({ width: scenario.width, height: 900 });
      await page.goto('/');

      const geometry = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        pageWidth: document.documentElement.scrollWidth,
        bodyWidth: document.body.scrollWidth,
      }));

      expect(geometry.pageWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
      expect(geometry.bodyWidth).toBeLessThanOrEqual(geometry.viewportWidth + 1);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('combobox', { name: 'Aspect' })).toBeVisible();
    });
  }

  test('keeps the main reading measure within a readable line length', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    const measure = await page.locator('.body-copy').first().evaluate((element) => {
      const style = getComputedStyle(element);
      return element.getBoundingClientRect().width / Number.parseFloat(style.fontSize);
    });

    expect(measure).toBeGreaterThanOrEqual(40);
    expect(measure).toBeLessThanOrEqual(70);
  });

  test('keeps interactive targets at least 44 CSS pixels high', async ({ page }) => {
    await page.goto('/');

    for (const target of [
      page.getByRole('combobox', { name: 'Aspect' }),
      page.getByRole('textbox', { name: 'Denumirea documentului' }),
      page.getByRole('button', { name: 'Continuă' }),
    ]) {
      const box = await target.boundingBox();
      expect(box).not.toBeNull();
      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });

  test('shows the common focus treatment on strong and light surfaces', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    const brand = page.getByRole('link', { name: 'Sistem Digital — pagina principală' });
    await expect(brand).toBeFocused();
    await expectVisibleFocus(brand);

    const input = page.getByRole('textbox', { name: 'Denumirea documentului' });
    await tabUntilFocused(page, input);
    await expect(input).toBeFocused();
    await expectVisibleFocus(input);
  });

  test('removes non-essential motion when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const styles = await page.evaluate(() => {
      const body = getComputedStyle(document.body);
      const button = getComputedStyle(document.querySelector('.button-primary') as HTMLElement);
      return {
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
        bodyDurations: body.transitionDuration,
        buttonDurations: button.transitionDuration,
      };
    });

    expect(styles.scrollBehavior).toBe('auto');
    expect(durationInSeconds(styles.bodyDurations).every((duration) => duration <= 0.00001)).toBe(true);
    expect(durationInSeconds(styles.buttonDurations).every((duration) => duration <= 0.00001)).toBe(
      true,
    );

    const button = page.getByRole('link', { name: 'Vezi codul sursă' });
    await button.hover();
    await expect(button).toHaveCSS('transform', 'none');
  });

  test('provides a legible print presentation without interactive chrome', async ({ page }) => {
    await page.emulateMedia({ media: 'print' });
    await page.goto('/');

    await expect(page.locator('.header-actions')).toBeHidden();
    await expect(page.locator('.site-footer')).toBeHidden();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
    await expect(page.locator('body')).toHaveCSS('color', 'rgb(0, 0, 0)');
  });
});
