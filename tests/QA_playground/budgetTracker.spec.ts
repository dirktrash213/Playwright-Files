import { test, expect } from '@playwright/test';

function getRandomDate(startYear: number, endYear: number): string {
  const start = new Date(startYear, 0, 1);
  const end = new Date(endYear, 11, 31);
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, '0');
  const day = String(randomDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getRandomDescription(): string {
  const descriptions = ['Food', 'Travel', 'Business', 'Leisure', 'Other'];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function formatCurrency(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  const absoluteAmount = Math.abs(amount);
  const dollars = absoluteAmount.toLocaleString();
  return `${sign}$${dollars}.00`;
}

async function logTableRows(page) {
  const rows = await page.locator('tbody.entries tr').count();
  for (let i = 0; i < rows; i++) {
    const date = await page.locator('tbody.entries tr').nth(i).locator('input.input-date').inputValue();
    const description = await page.locator('tbody.entries tr').nth(i).locator('input.input-description').inputValue();
    const type = await page.locator('tbody.entries tr').nth(i).locator('select.input-type').inputValue();
    const amount = await page.locator('tbody.entries tr').nth(i).locator('input.input-amount').inputValue();
    console.log(`Row ${i + 1}: Date: ${date}, Description: ${description}, Type: ${type}, Amount: ${amount}`);
  }
}

test.describe('Budget Tracker Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://qaplayground.dev/apps/budget-tracker/');
  });

  test('Add and verify an entry', async ({ page }) => {
   
    // Click the "New Entry" button
    await page.locator('button.new-entry').click();

    // Fill in the date, description, type, and amount
    await page.locator('input.input-date').fill('2025-02-27'); // Date before 2/28
    await page.locator('input.input-description').fill('Test Entry');
    await page.locator('select.input-type').selectOption('income');
    await page.locator('input.input-amount').fill('100'); // Non-zero amount

    // Verify that the entry is added to the table
    const dateCell = page.locator('input[type=date]');
    const descriptionCell = page.locator('input[type=text]');
    const typeSelect = page.locator('tbody.entries tr:last-child select.input-type');
    const amountCell = page.locator('input[type=number]');

    await expect(dateCell).toHaveValue('2025-02-27');
    await expect(descriptionCell).toHaveValue('Test Entry');
    await expect(typeSelect).toHaveValue('income');
    await expect(amountCell).toHaveValue('100');

    // Log the values
    const dateValue = await dateCell.inputValue();
    const descriptionValue = await descriptionCell.inputValue();
    const typeValue = await typeSelect.inputValue();
    const amountValue = await amountCell.inputValue();

    console.log(`Date: ${dateValue}`);
    console.log(`Description: ${descriptionValue}`);
    console.log(`Type: ${typeValue}`);
    console.log(`Amount: ${amountValue}`);

    console.log('Entry added and verified');

    //await page.pause();
    
  });

  test('Add and verify multiple entries, calculate total', async ({ page }) => {
   
    // Generate a random number between 1 and 5 for the number of entries
    const numberOfEntries = Math.floor(Math.random() * 5) + 1;

    // Click the "New Entry" button the random number of times
    for (let i = 0; i < numberOfEntries; i++) {
      await page.locator('button.new-entry').click();
    }

    console.log(`Number of entries: ${numberOfEntries}`);

    let totalAmount = 0;

    for (let i = 0; i < numberOfEntries; i++) {
      
      // Generate a random amount between 100 and 10,000
      const randomAmount = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;

      // Randomly choose either "income" or "expense"
      const randomType = Math.random() < 0.5 ? 'income' : 'expense';

      // Generate a random date between 2020 and 2024
      const randomDate = getRandomDate(2020, 2024);

       // Randomly choose a description
       let randomDescription = getRandomDescription();

       if (randomType == 'income') {
        randomDescription = "Sale";
        totalAmount += randomAmount;
      } else {
        totalAmount -= randomAmount;
      }

      

       // Fill in the date, description, type, and amount
      await page.locator('input.input-date').nth(i).fill(randomDate); 
      await page.locator('input.input-description').nth(i).fill(randomDescription);
      await page.locator('select.input-type').nth(i).selectOption(randomType);
      await page.locator('input.input-amount').nth(i).fill(randomAmount.toString()); // Non-zero amount
      
      // Verify that the entry is added to the table
      const dateCell = page.locator('input[type=date]').nth(i);
      const descriptionCell = page.locator('input[type=text]').nth(i);
      const typeSelect = page.locator('tbody.entries select.input-type').nth(i);
      const amountCell = page.locator('input[type=number]').nth(i);

      await expect(dateCell).toHaveValue(randomDate);
      await expect(descriptionCell).toHaveValue(randomDescription);
      await expect(typeSelect).toHaveValue(randomType);
      await expect(amountCell).toHaveValue(randomAmount.toString());

      // Log the values
      const dateValue = await dateCell.inputValue();
      const descriptionValue = await descriptionCell.inputValue();
      const typeValue = await typeSelect.inputValue();
      const amountValue = await amountCell.inputValue();

      console.log(`Date: ${dateValue}`);
      console.log(`Description: ${descriptionValue}`);
      console.log(`Type: ${typeValue}`);
      console.log(`Amount: ${amountValue}`);

      console.log(`Entry ${i+1} added and verified`);
      console.log("Current total amount: ", totalAmount);
      console.log(`-------`);

    }

    await page.locator('span.total').click(); //This is needed because otherwise the latest entry is sometimes not added to the total
   
    // Verify the total balance
    const totalBalance = await page.locator('span.total').textContent();
    const formattedTotalAmount = formatCurrency(totalAmount);
    
    await expect(page.locator('span.total')).toHaveText(formattedTotalAmount);

    console.log(`Total balance shown in app: ${totalBalance}`);
    console.log(`Calculated and formatted total amount: ${formattedTotalAmount}`);

    await page.pause();

  });

  test('Delete random entry', async ({ page }) => {

      // Add three entries to the table
      for (let i = 0; i < 3; i++) {
        await page.locator('button.new-entry').click();
  
        // Generate a random amount between 100 and 10,000
        const randomAmount = Math.floor(Math.random() * (10000 - 100 + 1)) + 100;
  
        // Randomly choose either "income" or "expense"
        const randomType = Math.random() < 0.5 ? 'income' : 'expense';
  
        // Generate a random date between 2020 and 2024
        const randomDate = getRandomDate(2020, 2024);
  
        // Randomly choose a description
        const randomDescription = getRandomDescription();
  
        // Fill in the date, description, type, and amount
        await page.locator('input.input-date').nth(i).fill(randomDate);
        await page.locator('input.input-description').nth(i).fill(randomDescription);
        await page.locator('select.input-type').nth(i).selectOption(randomType);
        await page.locator('input.input-amount').nth(i).fill(randomAmount.toString());
      }
  
      // Log the details of each row before deletion
      console.log('Table rows before deletion:');
      await logTableRows(page);
  
      // Get the number of entries before deletion
      const numberOfEntriesBefore = await page.locator('tbody.entries tr').count();
      console.log(`Number of entries before deletion: ${numberOfEntriesBefore}`);
  
      // Randomly choose an entry to delete
      const entryToDelete = Math.floor(Math.random() * numberOfEntriesBefore);
      console.log(`Entry to delete: ${entryToDelete + 1}`);
  
      // Click the delete button for the chosen entry
      await page.locator('tbody.entries tr').nth(entryToDelete).locator('button.delete-entry').click();
  
      // Verify that the entry has been deleted
      const numberOfEntriesAfter = await page.locator('tbody.entries tr').count();
      console.log(`Number of entries after deletion: ${numberOfEntriesAfter}`);
  
      await expect(numberOfEntriesAfter).toBe(numberOfEntriesBefore - 1);
  
      // Log the details of each row after deletion
      console.log('Table rows after deletion:');
      await logTableRows(page);
  
      console.log('Entry deleted and verified');

  });
  
});