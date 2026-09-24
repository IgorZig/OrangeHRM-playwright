# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leave\leave.spec.ts >> Leave >> Employee should be required to select a leave type before applying
- Location: tests\leave\leave.spec.ts:7:7

# Error details

```
Error: locator.fill: Test ended.
Call log:
  - waiting for getByPlaceholder('yyyy-mm-dd').first()
  - operation was aborted: Test ended.

```

# Test source

```ts
  1  | import { expect, Page } from '@playwright/test';
  2  | 
  3  | export class LeavePage {
  4  |   constructor(private readonly page: Page) {}
  5  |   async openApply(): Promise<void> {
  6  |     await this.page.getByRole('link', { name: 'Leave' }).click();
  7  |     await this.page.getByText('Apply', { exact: true }).click();
  8  |     await expect(this.page.getByRole('heading', { name: 'Apply Leave' })).toBeVisible();
  9  |   }
  10 |   async apply(leaveType: string, from: string, to: string, comment = ''): Promise<void> {
  11 |     if (leaveType) {
  12 |       await this.page.locator('.oxd-select-text').first().click();
  13 |       await this.page.getByRole('option', { name: leaveType }).click();
  14 |     }
  15 |     const dates = this.page.getByPlaceholder('yyyy-mm-dd');
> 16 |     await dates.first().fill(from);
     |                         ^ Error: locator.fill: Test ended.
  17 |     await dates.nth(1).fill(to);
  18 |     if (comment) await this.page.getByRole('textbox').last().fill(comment);
  19 |     await this.page.getByRole('button', { name: 'Apply' }).click();
  20 |   }
  21 |   async openMyLeave(): Promise<void> {
  22 |     await this.page.getByRole('link', { name: 'Leave' }).click();
  23 |     await this.page.getByText('My Leave', { exact: true }).click();
  24 |   }
  25 | }
  26 | 
```