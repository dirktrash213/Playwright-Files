import { test, expect } from '@playwright/test';

test.describe('Mouse Hover Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/mouse-hover/');
  });

  test('Verify Price', async ({ page }) => {
   
    // Hover over the movie poster
    await page.hover('img.poster');

      // Verify the price that appears
      const price = await page.locator('p.current-price').textContent();
      await expect(page.locator('p.current-price')).toBeVisible();
      console.log(`Price: ${price}`);

  });
  
});