import { test, expect } from '@playwright/test';

test.describe('Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/range-slider/');
  });

  test('', async ({ page }) => {
    const slider = page.locator('input[type="range"]');
   
    // Check slider at 0%
    await slider.fill('0');
    await expect(page.locator(`.emojis li img[src="emojis/emoji-1.png"]`)).toBeVisible();

    console.log("Slider at 0%");
    console.log("Expected image: emojis/emoji-1.png is visible");

    // Check slider at 25%
    await slider.fill('25');
    await expect(page.locator(`.emojis li img[src="emojis/emoji-2.png"]`)).toBeVisible();

    console.log("Slider at 25%");
    console.log("Expected image: emojis/emoji-2.png is visible");

    // Check slider at 50%
    await slider.fill('50');
    await expect(page.locator(`.emojis li img[src="emojis/emoji-3.png"]`)).toBeVisible();

    console.log("Slider at 50%");
    console.log("Expected image: emojis/emoji-3.png is visible");

    // Check slider at 75%
    await slider.fill('75');
    await expect(page.locator(`.emojis li img[src="emojis/emoji-4.png"]`)).toBeVisible();

    console.log("Slider at 75%");
    console.log("Expected image: emojis/emoji-4.png is visible");

    // Check slider at 100%
    await slider.fill('100');
    await expect(page.locator(`.emojis li img[src="emojis/emoji-5.png"]`)).toBeVisible();

    console.log("Slider at 100%");
    console.log("Expected image: emojis/emoji-5.png is visible");

  });
  
});