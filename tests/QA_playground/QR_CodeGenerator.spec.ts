import { test, expect } from '@playwright/test';

function getRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

test.describe('QR Code Generator Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/qr-code-generator/');
  });

  test('Check QR code image', async ({ page }) => {
    // Generate a random string no longer than 10 characters
    const randomString = getRandomString(10);

    // Fill out the text box with the random string
    await page.fill('input[type="text"]', randomString);

    // Click the "Generate QR Code" button
    await page.getByText('Generate QR Code').click();

    // Confirm that the QR code appears on the screen
    const qrCode = page.locator('img[alt="qr-code"]');
    await expect(qrCode).toBeVisible();
  });
});