import { Page } from '@playwright/test';
import { AdminPage } from './AdminPage';

export class DepartmentsPage extends AdminPage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await this.page.getByText('Organization').click();
    await this.page.getByRole('menuitem', { name: 'Structure' }).click();
  }

  async add(name: string): Promise<void> {
  await this.page.locator('.oxd-switch-input').click();
  await this.page.getByRole('checkbox', { name: 'Edit' }).check();

  await this.page.getByRole('button', { name: 'Add' }).click();
  const dialog = this.page.getByRole('dialog');
  await dialog.getByRole('textbox').nth(1).fill(name);
  await dialog.getByRole('button', { name: 'Save' }).click();

  }

  async edit(existing: string, replacement: string): Promise<void> {
    const unit = this.page
      .getByText(existing, { exact: true })
      .locator('xpath=ancestor::li[1]');

    await unit.locator('button.org-action-icon').nth(1).click();

    const dialog = this.page.getByRole('dialog');
    const input = dialog.getByRole('textbox').nth(1);
    await input.click();
    await input.fill(replacement);
    await dialog.getByRole('button', { name: 'Save' }).click();
  }

  async delete(name: string): Promise<void> {
    const unit = this.page
      .getByText(name, { exact: true })
      .locator('xpath=ancestor::li[1]');

    await unit.locator('button.org-action-icon').first().click();

    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  }
}
