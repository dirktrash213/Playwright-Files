import { test, expect } from '@playwright/test';

test.describe('Modal Popup Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/onboarding-modal/#');
  });

  test('Close modal popup', async ({ page }) => {
    // Check if the modal popup is present
    const modalCheckbox = page.locator('#active');
    if (await modalCheckbox.isChecked()) {
      // Click the "X" button to close the modal
      await page.locator('label.menu-btn').click();
      console.log('Modal closed');
      // Verify the "Welcome Peter Parker" message
      await expect(page.locator('text=Welcome Peter Parker')).toBeVisible();
      console.log('Peter Parker message verified');
    } else {
      console.log('Modal not present on page load');
    }
  });

  test('Open modal popup', async ({ page }) => {

    const modalCheckbox = page.locator('#active');
    if (await modalCheckbox.isChecked()) {
      console.log('Modal already open on page load');
    } else {
      // Click the button with the three bars to open the modal
      await page.locator('label.menu-btn').click();
      // Verify the "Welcome on board!" message
      await expect(page.locator('text=Welcome on board!')).toBeVisible();
      console.log('Modal opened and "Welcome on board!" message verified');
    }


  });

});