import { expect, Page } from '@playwright/test';

export class PimPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/web/index.php/pim/viewPimModule');
  }

  async addEmployee(
    firstName: string,
    lastName: string,
    middleName = ''
  ): Promise<void> {
    await this.page.getByRole('button', { name: 'Add' }).click();

    const form = this.page.locator('form');
    const textboxes = form.getByRole('textbox');

    await textboxes.nth(0).fill(firstName);

    if (middleName) {
      await textboxes.nth(1).fill(middleName);
    }

    await textboxes.nth(2).fill(lastName);

    await form.getByRole('button', { name: 'Save' }).click();

    await expect(
      this.page.getByText('Successfully Saved', { exact: true })
    ).toBeVisible();
  }
}