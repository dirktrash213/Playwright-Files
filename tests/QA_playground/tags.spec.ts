import { test, expect } from '@playwright/test';

test.describe('Tags Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/tags-input-box/');
  });

  test('Add python tag', async ({ page }) => {

    // Select all current tags
    let tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));

    console.log('Current tags:', tags);
    
    // Add a new tag with the string "python"
    await page.getByRole('textbox').fill('python');
    await page.getByRole('textbox').press('Enter');

    // Verify the new tag has been added
    tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));
    console.log('Tags after adding "python":', tags);

    expect(tags).toContain('python');

  });

  test('Delete a random tag', async ({ page }) => {

    // Select all current tags
    let tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));

    console.log('Current tags:', tags);

    // Delete a random tag by clicking the "x" button
    const randomTagIndex = Math.floor(Math.random() * tags.length);
    const randomTag = tags[randomTagIndex];
    //await page.locator(`li:has-text("${randomTag}") >> button`).click();

    await page.getByRole('listitem').locator('i').nth(randomTagIndex).click();

    // Verify the tag has been deleted
    tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));
    console.log('Tags after deleting a random tag:', tags);

    expect(tags).not.toContain(randomTag);

  });

  test('Remove all tags', async ({ page }) => {

    // Select all current tags
    let tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));

    console.log('Current tags:', tags);
    
    //Remove all tags
    
    await page.getByRole('button', { name: 'Remove All' }).click();
    tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));

    console.log('Tags after clicking "Remove All":', tags);

    expect(tags).toHaveLength(0);
    await expect(page.getByText('10 tags are remaining')).toBeVisible();
    

  });

  test('Check max allowed tags', async ({ page }) => {

    // Select all current tags
    let tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));

    console.log('Current tags:', tags);
    
    for (let i = 0; i < 11; i++) {
      await page.getByRole('textbox').fill('filler' + i);
      await page.getByRole('textbox').press('Enter');
    }

    tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));
    console.log('Tags after adding attempting to add 11 filler tags:', tags);

    //Check that there are only 10 tags
    expect(tags).toHaveLength(10);
    await expect(page.getByText('0 tags are remaining')).toBeVisible();

  });

  test('Check duplicate tags', async ({ page }) => {

    // Select all current tags
    let tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));

    console.log('Current tags:', tags);
    
    //Check that duplicate tags are not allowed
    await page.getByRole('textbox').fill('duplicate');
    await page.getByRole('textbox').press('Enter');
    await page.getByRole('textbox').fill('duplicate');
    await page.getByRole('textbox').press('Enter');
    
    tags = await page.$$eval('li', tags => tags.map(tag => tag.textContent ? tag.textContent.trim() : ''));
    console.log('Tags after attempting to add two identical tags:', tags);

    expect(tags).toHaveLength(3);

    await expect(page.getByText('7 tags are remaining')).toBeVisible();

  });
});
