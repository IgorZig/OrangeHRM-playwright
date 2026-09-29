import { expect, Locator } from '@playwright/test';
import { AdminPage } from './AdminPage';
import { UserData } from '../test-data/users';
import { exactRow, field, rowAction, search, waitForList } from '../utils/ui';

export class UserManagementPage extends AdminPage {
  async open() {
    await this.page.goto('/web/index.php/admin/viewSystemUsers');
    await waitForList(this.page);
  }
  error(label: string): Locator {
    return field(this.page, label).locator('.oxd-input-field-error-message');
  }
  async selectRole(role: 'Admin' | 'ESS') {
    await this.selectOption('User Role', role);
  }
  private async selectOption(label: string, value: string) {
    await field(this.page, label).locator('.oxd-select-text').click();
    await this.page.getByRole('option', { name: value, exact: true }).click();
  }
  async addUser(user: UserData) {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.selectRole(user.role);
    await field(this.page, 'Employee Name').locator('input').fill(user.employeeName);
    await this.page.getByRole('option', { name: user.employeeName, exact: true }).click();
    await this.selectOption('Status', user.status);
    for (const [label, value] of [
      ['Username', user.username],
      ['Password', user.password],
      ['Confirm Password', user.password],
    ]) {
      await field(this.page, label).locator('input').fill(value);
    }
    await this.save();
    await expect(
      this.page.getByText('Successfully Saved', { exact: true }).or(this.error('Username')),
    ).toBeVisible();
  }
  async save() {
    await this.page.getByRole('button', { name: 'Save', exact: true }).click();
  }
  async submitEmptyUser() {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.save();
  }
  async searchUser(username: string) {
    await field(this.page, 'Username').locator('input').fill(username);
    await search(this.page, '/api/v2/admin/users');
  }
  getRow(username: string) {
    return exactRow(this.page, username);
  }
  async expectUser(user: UserData) {
    await this.searchUser(user.username);
    const row = this.getRow(user.username);
    await expect(row).toHaveCount(1);
    for (const value of [user.username, user.role, user.status, user.employeeName]) {
      await expect(row.getByRole('cell', { name: value, exact: true })).toBeVisible();
    }
  }
  async deleteUser(username: string) {
    await rowAction(this.getRow(username), 'delete').click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await expect(this.page.getByText('Successfully Deleted', { exact: true })).toBeVisible();
  }
  async cleanupUser(username: string) {
    await this.open();
    await this.searchUser(username);
    if (await this.getRow(username).count()) await this.deleteUser(username);
    await this.searchUser(username);
    await expect(this.getRow(username)).toHaveCount(0);
  }
}
