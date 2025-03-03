import { test, expect } from '@playwright/test';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Right Click Context Tracker Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/context-menu/');
  });

  test('', async ({ page }) => {
   
    // Right click on the page to open the context menu
   await page.click('body', { button: 'right' });

   // Hover over the "Share" menu item
   await page.hover('text=Share');

   // Click the "Twitter" submenu item
   await page.click('text=Twitter');

   // Verify the message "Menu item Twitter clicked" is displayed on the page
   const message = await page.locator('text=Menu item Twitter clicked');
   await expect(message).toBeVisible();

   console.log('Twitter menu item clicked');

    // Save a screenshot to the "screenshots" folder
    const screenshotDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotDir)) {
      fs.mkdirSync(screenshotDir);
    }
    const screenshotPath = path.join(screenshotDir, 'screenshot.png');
    await page.screenshot({ path: screenshotPath });
    console.log(`Screenshot saved at: ${screenshotPath}`);

  });
  
});