import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as os from 'os';

test.describe('Upload File Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/upload/');
  });

  test('Upload one file', async ({ page }) => {
   
    // Path to the image file to be uploaded
    const homeDir = os.homedir();
    //const filePath = path.join(homeDir, 'Desktop', 'Playwright Files', 'Sample.png');
    const filePath = path.resolve(__dirname, '..', '..', 'Sample.png');
   //const filePath = 'C:/Users/Tarik/Desktop/Playwright Files/Sample.png';

    // Log the file path name
    console.log(`File path: ${filePath}`);

    // Upload the file
    const fileInput = await page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    // Verify that the file's name is visible on the page
    const fileName = path.basename(filePath);
    await expect(page.locator(`text=${fileName}`)).toBeVisible();

    // Verify that the image itself is visible on the page
    await expect(page.locator('figure img')).toBeVisible();

    console.log('File uploaded and verified');


  });

  test('Upload two files', async ({ page }) => {
    // Paths to the image files to be uploaded
    const homeDir = os.homedir();
    //const filePath1 = path.join(homeDir, 'Desktop', 'Playwright Files', 'Sample.png');
    //const filePath2 = path.join(homeDir, 'Desktop', 'Playwright Files', 'Sample2.png');
    const filePath1 = path.resolve(__dirname, '..', '..', 'Sample.png');
    const filePath2 = path.resolve(__dirname, '..', '..', 'Sample2.png');


    // Upload the files
    const fileInput = await page.locator('input[type="file"]');
    await fileInput.setInputFiles([filePath1, filePath2]);

    // Verify that the file names are visible on the page
    const fileName1 = path.basename(filePath1);
    const fileName2 = path.basename(filePath2);
    await expect(page.locator(`text=${fileName1}`)).toBeVisible();
    await expect(page.locator(`text=${fileName2}`)).toBeVisible();

    // Verify that the images themselves are visible on the page
    await expect(page.locator('figure img')).toHaveCount(2);

    console.log('Files uploaded and verified');
  });
  
  
});