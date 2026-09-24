import { Locator, Page } from '@playwright/test';
import { AdminPage } from './AdminPage';
import { UserData } from '../test-data/users';

export class UserManagementPage extends AdminPage {
  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await this.page.getByText('User Management', { exact: true }).click();
    await this.page.getByRole('menuitem', { name: 'Users', exact: true }).click();
  }

  private async selectOption(index: number, value: string): Promise<void> {
    await this.page.locator('.oxd-select-text').nth(index).click();
    await this.page.getByRole('option', { name: value, exact: true }).click();
  }

  async addUser(user: UserData): Promise<void> {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.selectOption(0, user.role);

    const employee = this.page.getByPlaceholder('Type for hints...');
    await employee.fill(user.employeeName);
    await this.page.getByRole('option', { name: new RegExp(user.employeeName, 'i') }).click();

    await this.selectOption(1, user.status);
    const form = this.page.locator('form');
    await form.getByRole('textbox').nth(1).fill(user.username);
    await form.getByRole('textbox').nth(2).fill(user.password);
    await form.getByRole('textbox').nth(3).fill(user.password);
    await form.getByRole('button', { name: 'Save' }).click();
  }

  async submitEmptyUser(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async searchUser(username: string): Promise<void> {
    const search = this.page.locator('form');
    await search.getByRole('textbox').nth(0).fill(username);
    await search.getByRole('button', { name: 'Search' }).click();
  }

  async deleteUser(username: string): Promise<void> {
    const row = this.page.getByRole('row').filter({ hasText: username });
    await row.getByRole('button').last().click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  }

  getRow(username: string): Locator {
    return this.page.getByRole('row').filter({ hasText: username });
  }
}
