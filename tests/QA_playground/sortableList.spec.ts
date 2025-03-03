import { test, expect, chromium } from '@playwright/test'

test('Check correct order', async () => {
  
  //IMPORTANT: If running this test in non-headless mode, do not move the mouse 
  //while the test is running
  //as it may interfere with the drag and drop actions  
  
  const browser = await chromium.launch({
        args: ['--start-maximized'],
    })
    const context = await browser.newContext({
        viewport: null,
    })
    const page = await context.newPage()
    await page.goto('https://qaplayground.dev/apps/sortable-list/')
    const correctOrder = [
        'Jeff Bezos',
        'Bill Gates',
        'Warren Buffet',
        'Bernard Arnault',
        'Carlos Slim Helu',
        'Amancio Ortega',
        'Larry Ellison',
        'Mark Zuckerberg',
        'Michael Bloomberg',
        'Larry Page',
    ]
    await page.locator(`text=Jeff Bezos`).dragTo(page.locator(`.draggable-list li:nth-child(1)`))
    await page.locator(`text=Bill Gates`).dragTo(page.locator(`.draggable-list li:nth-child(2)`))
    await page.locator(`text=Warren Buffet`).dragTo(page.locator(`.draggable-list li:nth-child(3)`))
    await page.locator(`text=Bernard Arnault`).dragTo(page.locator(`.draggable-list li:nth-child(4)`))
    await page.locator(`text=Carlos Slim Helu`).dragTo(page.locator(`.draggable-list li:nth-child(5)`))
    await page.locator(`text=Amancio Ortega`).dragTo(page.locator(`.draggable-list li:nth-child(6)`))
    await page.locator(`text=Larry Ellison`).dragTo(page.locator(`.draggable-list li:nth-child(7)`))
    await page.locator(`text=Mark Zuckerberg`).dragTo(page.locator(`.draggable-list li:nth-child(8)`))
    await page.locator(`text=Michael Bloomberg`).dragTo(page.locator(`.draggable-list li:nth-child(9)`))
    await page.locator(`text=Larry Page`).dragTo(page.locator(`.draggable-list li:nth-child(10)`))
    await page.getByRole('button', { name: 'Check Order' }).click()
    const correctElements = page.locator('.draggable-list li.right .person-name')
    await expect(correctElements).toHaveCount(10)
})

  test('Check incorrect order', async ({ page }) => {
   
     // Click the "Check Order" button
    await page.getByRole('button', { name: 'Check Order' }).click();

    // Confirm that at least one element's text is red in color
    const incorrectElements = await page.locator('.draggable-list li.wrong .person-name');
    let foundRedText = false;

    for (let i = 0; i < await incorrectElements.count(); i++) {
      const item = incorrectElements.nth(i);
      const color = await item.evaluate(el => window.getComputedStyle(el).color);
      console.log('Color:', color);
      if (color === 'rgb(255, 56, 56)') { // Check if the color is red (#ff3838)
        foundRedText = true;
        break;
      }
    }

    expect(foundRedText).toBe(true);

    console.log('At least one element with red text verified');

  });
  


/*

const first = await page.locator(`.draggable-list li:nth-child(1)`);
    const second = await page.locator(`.draggable-list li:nth-child(2)`);

    console.log('First element:', await first.innerHTML());
    console.log('Second element:', await second.innerHTML());
    
    await second.dragTo(first);

    await page.pause(); */