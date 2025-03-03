import { test, expect } from '@playwright/test';

test.describe('Navigation Menu Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/links/');
  });

  test('Open each link in a new tab', async ({ page, context }) => {
    
    await expect(page.locator("#nav")).toBeVisible();

    const links = page.locator("#nav > a");

    await expect(links).toHaveCount(5);

    // Create a new tab page
    const newPage = await context.newPage();

    for (let index = 1; index < (await links.count()); index++) {
      const menuItemText = (await links.nth(index).textContent()) || ''; //Avoids null or undefined
      const menuItemLink = await links.nth(index).getAttribute("href");

      await newPage.goto("https://qaplayground.dev/apps/links/" + menuItemLink); // Open a link

      await expect(newPage.locator("#title")).toContainText(menuItemText);

      console.log(menuItemText + " page opened in new tab, title verified");
    }

    newPage.close(); // Close the newly opened page
  });


  test('Open each link and return to home page', async ({ page, context }) => {

    await expect(page.locator("#nav")).toBeVisible();

    const links = page.locator("#nav > a");

    await expect(links).toHaveCount(5);

    for (let index = 1; index < (await links.count()); index++) {
      const menuItemText = (await links.nth(index).textContent()) || ''; // Avoids null or undefined
      const menuItemLink = await links.nth(index).getAttribute("href");

      // Click the link
      await links.nth(index).click();

      // Verify the title of the page
      await expect(page.locator("#title")).toContainText(menuItemText);

      console.log(menuItemText + " page opened, title verified");

      // Click the "Go back" button to return to the home page
      await page.goBack();

      // Verify that we are back on the home page
      await expect(page).toHaveURL('https://qaplayground.dev/apps/links/');
    }
  });
});