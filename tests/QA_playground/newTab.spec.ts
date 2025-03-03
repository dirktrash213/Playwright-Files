import { test, expect } from '@playwright/test';

test.describe('New Tab Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/new-tab/');
  });

  test('Open new tab', async ({ page, context }) => {
   
    // Click the "Open New Tab" button
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByText('Open New Tab').click()
    ]);

    // Wait for the new tab to load
    await newPage.waitForLoadState();

    // Verify the message on the new tab
    await expect(newPage.getByText('Welcome to the new page!')).toBeVisible();

    console.log('New tab message verified');

  });
  
});