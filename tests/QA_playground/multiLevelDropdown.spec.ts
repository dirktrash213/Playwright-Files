import { test, expect } from '@playwright/test';

test.describe('Multi-level Dropdown Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/multi-level-dropdown/#home');
  });

  test('Find Awesome!', async ({ page }) => {
   
    await page.getByRole('listitem').nth(3).click();
    await page.getByRole('link', { name: 'Settings' }).click();
    await expect(page.getByText('Awesome!')).toBeVisible();
    console.log('Awesome! verified');

  });

  test('List animals', async ({ page }) => {
   
    await page.getByRole('listitem').nth(3).click();
    await page.getByRole('link', { name: 'Animals' }).click();
    
     // Ensure the "Animals" submenu is expanded so as to not detect unwanted menu items
     await page.getByRole('link', { name: 'Animals' }).nth(1).hover();

    const animalNames: string[] = [];

    const animals = await page.locator('.menu-item').all();
  
    for (let i = 0; i < animals.length; i++) {
      const animal = animals[i];
      if (await animal.isVisible()) {
        let text = await animal.textContent() || '';
        text = text.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').replace(/\n/g, '').trim(); // Remove emojis and new line characters
        if (text && text !== 'Animals') {
          animalNames.push(text);
        }
      }
    }

    

    console.log('Animal names:', animalNames);

  });

  test('Check animal emojis', async ({ page }) => {

    await page.getByRole('listitem').nth(3).click();
    await page.getByRole('link', { name: 'Animals' }).click();

    // Ensure the "Animals" submenu is expanded so as to not detect unwanted menu items
    await page.getByRole('link', { name: 'Animals' }).nth(1).hover();

    const animalEmojis: { [key: string]: string } = {
      'Kangaroo': '🦘',
      'Frog': '🐸',
      'Horse': '🦄',
      'Hedgehog': '🦔'
    };

    const animals = await page.locator('.menu-item').all();

    for (let i = 0; i < animals.length; i++) {
      const animal = animals[i];
      if (await animal.isVisible()) {
        const text = await animal.textContent() || '';
        const emoji = text.match(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu)?.[0] || '';
        const animalName = text.replace(/[\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').replace(/\n/g, '').trim();

        if (animalEmojis[animalName] && animalEmojis[animalName] !== emoji) {
          console.log(`Mismatch: ${animalName} should have emoji ${animalEmojis[animalName]} but found ${emoji}`);
        }
      }
    }

  });
  
});