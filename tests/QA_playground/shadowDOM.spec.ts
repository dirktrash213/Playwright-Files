import { test, expect } from '@playwright/test';

test.describe('Shadow DOM Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/shadow-dom/');
  });

  test('Verify 95%', async ({ page }) => {
     // Click the "Boost" button
     const boostButton = await page.locator('button', { hasText: 'Boost' });
     await boostButton.click();
 
     // Wait for the meter to reach 95% progress
     const fillElement = await page.locator('.container .fill');
     await page.waitForFunction(
       (element) => {
         const width = element.getBoundingClientRect().width;
         return width >= 361;
       },
       await fillElement.evaluateHandle(el => el)
     );
 
     console.log('Meter reached 95% progress');
  });
});