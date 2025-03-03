import { test, expect } from '@playwright/test';

test.describe('Verify Account Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/verify-account/');
  });

  test('Verify incorrect code', async ({ page }) => {
    // Extract the confirmation code from the message.
    const message = await page.locator('text=The confirmation code is').innerText();
    const code = message.match(/\d/g); // Extract all digits from the message using a regular expression
    console.log('Extracted code:', code);

    // Ensure code is not null
    if (code === null) {
      throw new Error('Failed to extract the confirmation code from the message.');
    }

    // Grab the input boxes
    const inputBoxes = await page.locator('.code').all();

    // Fill in the input boxes with a fake code
    for (const inputBox of inputBoxes) {
      await inputBox.fill('0');
    }

    // Press Enter to submit the code
    await page.locator('.code').nth(5).press('Enter');

    // Verify the success message is NOT displayed
    await expect(page.locator('text=Success')).not.toBeVisible();

    console.log('Fake code verified to not work');
  });

  test('Verify correct code', async ({ page }) => {
    // Extract the confirmation code from the message.
    const message = await page.locator('text=The confirmation code is').innerText();
    const code = message.match(/\d/g); // Extract all digits from the message using a regular expression
    console.log('Extracted code:', code);

    // Ensure code is not null
    if (code === null) {
      throw new Error('Failed to extract the confirmation code from the message.');
    }

    // Grab the input boxes
    const inputBoxes = await page.locator('.code').all();

    // Fill in the input boxes with the correct code
    for (let i = 0; i < inputBoxes.length; i++) {
      await inputBoxes[i].fill(code[i]);
    }

    // Press Enter to submit the code
    await page.locator('.code').nth(5).press('Enter');

    // Verify the success message is displayed
    await expect(page.locator('text=Success')).toBeVisible();

    console.log('Code ', code, ' verified to work');
  });
});