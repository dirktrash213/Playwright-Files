import { test, expect } from '@playwright/test';

test.describe('iFrame Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/iframe/');
  });

  test('Click the button', async ({ page }) => {
   
    await page.locator('iframe[name="frame1"]').contentFrame().locator('iframe[name="frame2"]').contentFrame().getByRole('link', { name: 'Click Me' }).click();
    await expect(page.locator('iframe[name="frame1"]').contentFrame().locator('iframe[name="frame2"]').contentFrame().getByText('Button Clicked')).toBeVisible();

    console.log('Button clicked and message verified');

  });
  
});