import { test, expect } from '@playwright/test';

test.describe('Covered Button Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/covered/');
  });

  test('Click hidden button', async ({ page }) => {
   
    // Locate the button with the text "You found me!"
   const hiddenButton = page.locator('text=You found me!');

   // Scroll the button into view if needed
   await hiddenButton.scrollIntoViewIfNeeded();

   // Click the button
   await hiddenButton.click();

   // Verify that the button was clicked (you can add any verification steps here if needed)
   console.log('Hidden button clicked');

  });
  
});