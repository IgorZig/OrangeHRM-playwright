# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin\job-titles.spec.ts >> Job titles >> Admin should add, edit, and delete a valid job title
- Location: tests\admin\job-titles.spec.ts:7:7

# Error details

```
Error: locator.fill: Test ended.
Call log:
  - waiting for locator('.oxd-dialog-container-default').getByRole('textbox').first()
  - operation was aborted: Test ended.

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
  12 |     const dialog = this.page.locator('.oxd-dialog-container-default');
> 13 |     await dialog.getByRole('textbox').first().fill(title);
     |                                               ^ Error: locator.fill: Test ended.
  14 |     if (description) await dialog.getByRole('textbox').nth(1).fill(description);
  15 |     await dialog.getByRole('button', { name: 'Save' }).click();
  16 |   }
  17 |   async edit(existing: string, replacement: string): Promise<void> {
  18 |     await this.page
  19 |       .getByRole('row')
  20 |       .filter({ hasText: existing })
  21 |       .getByRole('button')
  22 |       .first()
  23 |       .click();
  24 |     const dialog = this.page.locator('.oxd-dialog-container-default');
  25 |     const input = dialog.getByRole('textbox').first();
  26 |     await input.click();
  27 |     await input.fill(replacement);
  28 |     await dialog.getByRole('button', { name: 'Save' }).click();
  29 |   }
  30 |   async delete(title: string): Promise<void> {
  31 |     await this.page.getByRole('row').filter({ hasText: title }).getByRole('button').last().click();
  32 |     await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  33 |   }
  34 | }
  35 | 
```