import { test, expect } from '@playwright/test';

test.describe('Geolocation Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    // Set the browser's geolocation
    await context.grantPermissions(['geolocation']);
    await context.setGeolocation({ longitude: -122.03118, latitude: 37.33182 });
    await page.goto('https://qaplayground.dev/apps/geolocation/');
  });

  test('Assert Cupertino', async ({ page }) => {
    // Click the "Get Location" button
    await page.click('button#get-location');

    // Assert that the town Cupertino appears
    await expect(page.locator('#location-info')).toContainText('Cupertino');
    const location = await page.locator('#location-info').textContent();

    console.log(`Location: ${location}`);

    await page.pause();

  });
});