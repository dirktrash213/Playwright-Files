import { test, expect } from '@playwright/test';

test.describe('Changing iFrame Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/changing-iframe/');
  });

  test('Log times and verify end message', async ({ page }) => {
    // Wait for the first iframe to load
    let iframe = await page.frame({ name: 'frame1' });
    await expect(iframe).not.toBeNull();

    if (iframe) {
      // Log the message every time it counts down by one second
      let previousTime = '';
      let countingDown = true;

      while (countingDown) {
       
        // Check if the iframe URL has changed
        const iframeUrl = iframe.url();

        //console.log('iFrame url: ', iframeUrl);

        if (iframeUrl.includes('iframe2')) {
          countingDown = false;
          break;
        }

        const currentTime = iframe ? (await iframe.locator('#time').textContent()) || '' : '';
        if (currentTime !== previousTime) {
          const message = iframe ? await iframe.locator('div.flex-center div').textContent() : '';
          console.log("iFrame message: ", message);
          previousTime = currentTime;
        }
        await page.waitForTimeout(1000); // Wait for 1 second  
      }

      // Wait for the second iframe to load
      iframe = await page.frame({ name: 'frame1' });
      await expect(iframe).not.toBeNull();

      if (iframe) {
        // Verify the "This is the end of the journey" message
        const endMessage = await iframe.locator('div#msg').textContent();
        await expect(endMessage).toContain('This is the end of the journey');
        console.log(endMessage, " - message verified");
      }
    }
  });
});