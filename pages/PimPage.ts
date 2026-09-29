import { expect, Page } from '@playwright/test';
import { exactRow, field, rowAction, search, waitForList } from '../utils/ui';
export class PimPage {
  constructor(private readonly page: Page) {}
  async open() {
    await this.page.goto('/web/index.php/pim/viewEmployeeList');
    await waitForList(this.page);
  }
  async addEmployee(firstName: string, lastName: string, employeeId: string) {
    await this.page.getByRole('button', { name: 'Add' }).click();
    await this.page.getByRole('textbox', { name: 'First Name', exact: true }).fill(firstName);
    await this.page.getByRole('textbox', { name: 'Last Name', exact: true }).fill(lastName);
    await field(this.page, 'Employee Id').locator('input').fill(employeeId);
    await this.page.getByRole('button', { name: 'Save', exact: true }).click();
    await expect(this.page).toHaveURL(/\/pim\/viewPersonalDetails\/empNumber\/\d+/);
    await expect(this.page.getByRole('textbox', { name: 'First Name', exact: true })).toHaveValue(
      firstName,
    );
    await expect(this.page.getByRole('textbox', { name: 'Last Name', exact: true })).toHaveValue(
      lastName,
    );
  }
  async cleanupEmployee(id: string) {
    await this.open();
    await field(this.page, 'Employee Id').locator('input').fill(id);
    await search(this.page, '/api/v2/pim/employees');
    const row = exactRow(this.page, id);
    if (await row.count()) {
      await rowAction(row, 'delete').click();
      await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
      await expect(this.page.getByText('Successfully Deleted', { exact: true })).toBeVisible();
    }
    await search(this.page, '/api/v2/pim/employees');
    await expect(row).toHaveCount(0);
  }
}
