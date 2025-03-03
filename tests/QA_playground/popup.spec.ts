import { test, expect } from '@playwright/test';

test.describe('Popup Tests9', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/popup/');
  });

  test('Open new popup', async ({ page, context }) => {
    // Click the "Open" button
    const [popup] = await Promise.all([
      context.waitForEvent('page'),
      page.getByText('Open', {exact : true}).click() //Use exact, otherwise it will click on the "Click to open pop-up" text
    ]);

    // Wait for the popup to load
    await popup.waitForLoadState();

    // Click the "Submit" button on the popup
    await popup.getByRole('button', { name: 'Submit' }).click();

    console.log('Popup submit button clicked');
  });
  
});