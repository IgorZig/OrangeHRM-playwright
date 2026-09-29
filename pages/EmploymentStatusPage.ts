import { expect } from '@playwright/test';
import { AdminPage } from './AdminPage';
import { exactRow, field, rowAction, waitForList } from '../utils/ui';
export class EmploymentStatusPage extends AdminPage {
  async open() {
    await this.page.goto('/web/index.php/admin/employmentStatus');
    await waitForList(this.page);
  }
  getRow(name: string) {
    return exactRow(this.page, name);
  }
  get nameError() {
    return field(this.page, 'Name').locator('.oxd-input-field-error-message');
  }
  async add(name: string) {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await field(this.page, 'Name').locator('input').fill(name);

    await this.page.getByRole('button', { name: 'Save', exact: true }).click();
    if (name) {
      await expect(this.page.getByText('Successfully Saved', { exact: true })).toBeVisible();
      await waitForList(this.page);
      await expect(this.getRow(name)).toHaveCount(1);
    }
  }
  async edit(existing: string, replacement: string) {
    await rowAction(this.getRow(existing), 'edit').click();
    const input = field(this.page, 'Name').locator('input');
    await expect(input).toHaveValue(existing);
    await input.fill(replacement);
    await this.page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(this.page.getByText('Successfully Updated', { exact: true })).toBeVisible();
    await waitForList(this.page);
  }
  async delete(name: string) {
    await rowAction(this.getRow(name), 'delete').click();
    await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
    await expect(this.page.getByText('Successfully Deleted', { exact: true })).toBeVisible();
  }
  async cleanup(name: string) {
    await this.open();
    if (await this.getRow(name).count()) await this.delete(name);
    await this.open();
    await expect(this.getRow(name)).toHaveCount(0);
  }
}
