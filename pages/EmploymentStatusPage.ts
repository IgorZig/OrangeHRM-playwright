import { Locator, Page } from '@playwright/test';
import { AdminPage } from './AdminPage';
export class EmploymentStatusPage extends AdminPage {
  constructor(page: Page) {
    super(page);
  }
  async open(): Promise<void> {
    await this.openConfiguration('Employment Status');
  }
  async add(name: string): Promise<void> {
  await this.page.getByRole('button', { name: 'Add' }).click();

  const form = this.page.locator('form');

  await form.getByRole('textbox').fill(name);
  await form.getByRole('button', { name: 'Save' }).click();

    
  }
  async edit(existing: string, replacement: string): Promise<void> {
  await this.page
    .getByRole('row')
    .filter({ hasText: existing })
    .getByRole('button')
    .nth(1)
    .click();

  const input = this.page.locator('form').getByRole('textbox');

  await input.click();
  await input.fill(replacement);

  await this.page.getByRole('button', { name: 'Save' }).click();

  
  }
  async delete(name: string): Promise<void> {
    await this.page.getByRole('row').filter({ hasText: name }).getByRole('button').first().click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  }
  
  getRow(name: string): Locator {
    return this.page
      .getByRole('row')
      .filter({ hasText: name });
  }
}
