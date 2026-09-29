import { expect, Locator, Page } from '@playwright/test';
// OrangeHRM labels lack for/id associations. Match their containing input group.
export function field(page: Page, label: string, scope = page.locator('form')): Locator {
  return scope
    .locator('.oxd-input-group')
    .filter({ has: page.locator('label').filter({ hasText: new RegExp('^' + label + '$') }) });
}
export function exactRow(page: Page, value: string): Locator {
  return page
    .getByRole('row')
    .filter({ has: page.getByRole('cell', { name: value, exact: true }) });
}
export function rowAction(row: Locator, action: 'edit' | 'delete'): Locator {
  return row
    .getByRole('button')
    .filter({ has: row.page().locator(action === 'edit' ? '.bi-pencil-fill' : '.bi-trash') });
}
export async function waitForList(page: Page) {
  await expect(page.locator('.oxd-table')).toBeVisible();
  await expect(page.locator('.oxd-table-loader')).toHaveCount(0);
}
export async function search(page: Page, endpoint: string) {
  const response = page.waitForResponse(
    (r) => r.url().includes(endpoint) && r.request().method() === 'GET',
  );
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  expect((await response).ok(), 'Search request must succeed').toBeTruthy();
  await waitForList(page);
}
