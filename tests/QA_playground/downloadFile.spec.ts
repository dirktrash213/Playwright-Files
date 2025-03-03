import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test.describe('Download File Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/download/');
  });

  test('Download file', async ({ page }) => {
    // Click the Download button and wait for the download to complete
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.locator('a#file').click()
    ]);

    // Save the downloaded file to a temporary location
    const downloadPath = path.join(__dirname, 'downloads', await download.suggestedFilename());
    await download.saveAs(downloadPath);

    // Verify the file name
    const fileName = path.basename(downloadPath);
    expect(fileName).toBe('sample.pdf'); // Replace with the expected file name

    // Verify the file type
    const fileType = path.extname(downloadPath);
    expect(fileType).toBe('.pdf'); // Replace with the expected file extension

    // Verify the file size
    const fileSize = fs.statSync(downloadPath).size;
    expect(fileSize).toBeGreaterThan(0); // Replace with the expected file size if known

    // Log the file type, file name, and file size
    console.log(`File Name: ${fileName}`);
    console.log(`File Type: ${fileType}`);
    console.log(`File Size: ${fileSize} bytes`);

    console.log('File downloaded and verified');

    await page.pause();
  });
});