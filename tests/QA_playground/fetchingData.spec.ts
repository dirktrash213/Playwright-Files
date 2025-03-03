import { test, expect } from '@playwright/test';

test.describe('Fetching Data Tests', () => {
  test.beforeEach(async ({ page }) => {
  

  });

  test('Verify data', async ({ page }) => {
 
    const postsResponsePromise = page.waitForResponse('https://jsonplaceholder.typicode.com/posts');
    //const imagesResponsePromise = page.waitForResponse((resp) => resp.url().includes("unsplash"));
    
    await page.goto("https://qaplayground.dev/apps/fetch/", { waitUntil: "commit" });
  
    const postsResponse = await postsResponsePromise;
    //const imagesResponse = await imagesResponsePromise;

    console.log('Posts response status: ', postsResponse.status());
    console.log('Posts response url: ', postsResponse.url());

    //console.log('Images response status: ', imagesResponse.status());
    //console.log('Images response url: ', imagesResponse.url());
   

  });
});

