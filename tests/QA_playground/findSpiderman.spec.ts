import { test, expect } from '@playwright/test';

test('Find Spiderman', async ({ page }) => {
  await page.goto('https://qaplayground.dev/apps/dynamic-table/');

  // Select the table rows
  const rows = await page.$$('table tbody tr');

  // Iterate over each row and log the character's details
  for (const row of rows) {
    const cells = await row.$$('td');
   
    const nameAndEmail = await cells[0].innerText();
    const status = await cells[1].innerText();
    const realName = await cells[2].innerText();

    // Split the name and email
    const [name, email] = nameAndEmail.split('\n');

    console.log('Character Details:');
    console.log(`  Name: ${name}`);
    if (name == 'Spider-Man') {
      console.log('[Found Spiderman!]');
    }
    console.log(`  Email: ${email}`);
    console.log(`  Status: ${status}`);
    console.log(`  Real Name: ${realName}`);
    console.log('----------------------');
  }

  // Pause the page to keep the browser window open
  //await page.pause();
});
