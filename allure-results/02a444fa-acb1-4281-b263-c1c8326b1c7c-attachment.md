# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin\job-titles.spec.ts >> Job titles >> Admin should add, edit, and delete a valid job title
- Location: tests\admin\job-titles.spec.ts:7:7

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for locator('.oxd-dialog-container-default').getByRole('textbox').first()

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { AdminPage } from './AdminPage';
  3  | export class JobTitlesPage extends AdminPage {
  4  |   constructor(page: Page) {
  5  |     super(page);
  6  |   }
  7  |   async open(): Promise<void> {
  8  |     await this.openConfiguration('Job Titles');
  9  |   }
  10 |   async add(title: string, description = ''): Promise<void> {
  11 |     await this.page.getByRole('button', { name: 'Add' }).click();
  12 |     const form = this.page.locator('form');
  13 |     await form.getByRole('textbox').first().fill(title);
  14 |   await form.getByRole('button', { name: 'Save' }).click();
  15 |     if (description) await form.getByRole('textbox').nth(1).fill(description);
  16 |     await form.getByRole('button', { name: 'Save' }).click();
  17 |   }
  18 |   async edit(existing: string, replacement: string): Promise<void> {
  19 |     await this.page
  20 |       .getByRole('row')
  21 |       .filter({ hasText: existing })
  22 |       .getByRole('button')
  23 |       .first()
  24 |       .click();
  25 |     const dialog = this.page.locator('.oxd-dialog-container-default');
  26 |     const input = dialog.getByRole('textbox').first();
> 27 |     await input.click();
     |                 ^ Error: locator.click: Target page, context or browser has been closed
  28 |     await input.fill(replacement);
  29 |     await dialog.getByRole('button', { name: 'Save' }).click();
  30 |   }
  31 |   async delete(title: string): Promise<void> {
  32 |     await this.page.getByRole('row').filter({ hasText: title }).getByRole('button').last().click();
  33 |     await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  34 |   }
  35 | }
  36 | 
```