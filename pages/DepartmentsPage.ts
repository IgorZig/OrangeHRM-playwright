import { expect } from '@playwright/test';
import { AdminPage } from './AdminPage';
import { field } from '../utils/ui';
export class DepartmentsPage extends AdminPage {
  async open() {
    await this.page.goto('/web/index.php/admin/viewCompanyStructure');
    await expect(this.page.locator('.oxd-switch-input')).toBeVisible();
    await expect(this.page.locator('.oxd-loading-spinner')).toHaveCount(0);
  }
  getRow(name: string) {
    return this.page.locator('.org-name').getByText(name, { exact: true });
  }
  get nameError() {
    return field(this.page, 'Name', this.page.getByRole('dialog')).locator(
      '.oxd-input-field-error-message',
    );
  }
  private async enableEditing() {
    const checkbox = this.page.getByRole('checkbox', { name: 'Edit' });
    if (!(await checkbox.isChecked())) await this.page.locator('.oxd-switch-input').click();
    await expect(checkbox).toBeChecked();
  }
  private action(name: string, icon: string) {
    // These buttons deliberately have role="none"; CSS is necessary here.
    return this.getRow(name)
      .locator('xpath=ancestor::li[1]')
      .locator('button.org-action-icon')
      .filter({ has: this.page.locator(icon) });
  }
  async add(name: string) {
    await this.enableEditing();
    await this.page.getByRole('button', { name: 'Add' }).click();
    const dialog = this.page.getByRole('dialog');
    await expect(dialog.locator('.oxd-form-loader')).toHaveCount(0);
    await field(this.page, 'Name', dialog).locator('input').fill(name);
    await dialog.getByRole('button', { name: 'Save', exact: true }).click();
    if (name) {
      await expect(dialog).toHaveCount(0);
      await expect(this.getRow(name)).toHaveCount(1);
    }
  }
  async edit(existing: string, replacement: string) {
    await this.enableEditing();
    await this.action(existing, '.bi-pencil-fill').click();
    const dialog = this.page.getByRole('dialog');
    const input = field(this.page, 'Name', dialog).locator('input');
    await expect(input).toHaveValue(existing);
    await input.fill(replacement);
    const saved = this.page.waitForResponse(
      (response) =>
        response.request().method() === 'PUT' &&
        new URL(response.url()).pathname.includes('/api/v2/admin/subunits/'),
    );
    await dialog.getByRole('button', { name: 'Save', exact: true }).click();
    const response = await saved;
    expect(
      response.ok(),
      `Department save returned ${response.status()}: ${await response.text()}`,
    ).toBeTruthy();
    await expect(dialog).toHaveCount(0);
    await expect(this.getRow(replacement)).toHaveCount(1);
  }
  async delete(name: string) {
    await this.enableEditing();
    await this.action(name, '.bi-trash-fill').click();
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
