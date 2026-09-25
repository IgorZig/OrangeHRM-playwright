import { Locator, Page } from '@playwright/test';
import { AdminPage } from './AdminPage';
export class JobTitlesPage extends AdminPage {
  constructor(page: Page) {
    super(page);
  }
  async open(): Promise<void> {
    await this.openConfiguration('Job Titles');
  }
  async add(title: string, description = ''): Promise<void> {
    await this.page.getByRole('button', { name: 'Add' }).click();
    const form = this.page.locator('form');
    await form.getByRole('textbox').first().fill(title);
    if (description) {
      await form.getByRole('textbox').nth(1).fill(description);
    }
    await form.getByRole('button', { name: 'Save' }).click();
  }

  getRow(title: string): Locator {
    return this.page.getByRole('row').filter({ hasText: title });
  }
  async edit(existing: string, replacement: string): Promise<void> {
    await this.page
      .getByRole('row')
      .filter({ hasText: existing })
      .getByRole('button')
      .nth(1)
      .click();

    const input = this.page.locator('form').getByRole('textbox').first();

    await input.click();
    await input.fill(replacement);

    await this.page.getByRole('button', { name: 'Save' }).click();
  }
  async delete(name: string): Promise<void> {
    await this.page.getByRole('row').filter({ hasText: name }).getByRole('button').first().click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();

  }
}
