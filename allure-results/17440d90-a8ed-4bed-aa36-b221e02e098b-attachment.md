# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin\job-titles.spec.ts >> Job titles >> Admin should edit a valid job title
- Location: tests\admin\job-titles.spec.ts:14:7

# Error details

```
Error: locator.click: Test ended.
Call log:
  - waiting for locator('.oxd-dialog-container-default').getByRole('textbox').first()
  - operation was aborted: Test ended.

```

# Test source

```ts
  1  | import { Locator, Page } from '@playwright/test';
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
  14 |     if (description) {
  15 |       await form.getByRole('textbox').nth(1).fill(description);
  16 |     }
  17 |     await form.getByRole('button', { name: 'Save' }).click();
  18 |   }
  19 | 
  20 |   getRow(title: string): Locator {
  21 |     return this.page.getByRole('row').filter({ hasText: title });
  22 |   }
  23 |   async edit(existing: string, replacement: string): Promise<void> {
  24 |     await this.page
  25 |       .getByRole('row')
  26 |       .filter({ hasText: existing })
  27 |       .getByRole('button')
  28 |       .first()
  29 |       .click();
  30 |     const dialog = this.page.locator('.oxd-dialog-container-default');
  31 |     const input = dialog.getByRole('textbox').first();
> 32 |     await input.click();
     |                 ^ Error: locator.click: Test ended.
  33 |     await input.fill(replacement);
  34 |     await dialog.getByRole('button', { name: 'Save' }).click();
  35 |   }
  36 |   async delete(title: string): Promise<void> {
  37 |     await this.page.getByRole('row').filter({ hasText: title }).getByRole('button').last().click();
  38 |     await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  39 |   }
  40 | }
  41 | 
```