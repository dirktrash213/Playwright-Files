import { test, expect } from '@playwright/test';

test.describe('Rating Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/rating/');
  });

  test('Rate app', async ({ page }) => {
    // Generate a random rating between 1 and 5
    const rating = Math.floor(Math.random() * 5) + 1;

    console.log("Rating: ", rating);

    // Click the star corresponding to the random rating
    await page.locator(`label[for="star-${rating}"]`).click();

    // Verify the correct message and image appear
    const expectedMessage = rating === 1 ? 'I just hate it' :
                            rating === 2 ? 'I don\'t like it' :
                            rating === 3 ? 'This is awesome' :
                            rating === 4 ? 'I just like it' :
                            'I just love it';

    const expectedImage = rating === 1 ? 'emojis/emoji-1.png' :
                          rating === 2 ? 'emojis/emoji-2.png' :
                          rating === 3 ? 'emojis/emoji-3.png' :
                          rating === 4 ? 'emojis/emoji-4.png' :
                          'emojis/emoji-5.png';

    // Verify the correct image is visible
    await expect(page.locator(`.emojis li img[src="${expectedImage}"]`)).toBeVisible();

    console.log("Expected image: ", expectedImage, " is visible");

    // Verify the footer message using the ::before pseudo-element
    const footerMessage = await page.locator('.footer .text').evaluate(element => {
      return window.getComputedStyle(element, '::before').getPropertyValue('content');
    });
    expect(footerMessage).toBe(`"${expectedMessage}"`);

    // Verify the footer rating number using the ::before pseudo-element
    const footerRatingNumber = await page.locator('.footer .numb').evaluate(element => {
      return window.getComputedStyle(element, '::before').getPropertyValue('content');
    });
    expect(footerRatingNumber).toBe(`"${rating} out of 5"`);

    console.log(`Rated ${rating} stars: ${expectedMessage}`);
  });
});