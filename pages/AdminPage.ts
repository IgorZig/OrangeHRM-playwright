import { expect, Page } from '@playwright/test';

export class AdminPage {
  constructor(protected readonly page: Page) {}
  async open(): Promise<void> {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await expect(this.page.getByRole('heading', { name: 'Admin' })).toBeVisible();
  }
  async openConfiguration(
    option: 'Job Titles' | 'Pay Grades' | 'Employment Status' | 'Job Categories' | 'Work Shifts',
  ): Promise<void> {
    await this.page.getByRole('link', { name: 'Admin' }).click();
    await this.page.getByText('Job', { exact: true }).click();
    await this.page.getByText(option, { exact: true }).click();
  }
  async openDepartments(): Promise<void> {
    await this.page.getByRole('link', { name: 'Admin' }).click();

    const organization = this.page.locator(
      'span.oxd-topbar-body-nav-tab-item',
      { hasText: /^Organization$/ },
    );
    const structure = this.page.getByRole('menuitem', {
      name: 'Structure',
      exact: true,
    });

    await organization.click();
    await structure.waitFor({ state: 'visible' });
    await structure.click();
    await this.page.locator('.oxd-switch-input').waitFor({ state: 'visible' });
  }
}
