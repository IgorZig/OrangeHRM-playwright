import { Locator, test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { JobTitlesPage } from '../pages/JobTitlesPage';
import { DepartmentsPage } from '../pages/DepartmentsPage';
import { EmploymentStatusPage } from '../pages/EmploymentStatusPage';
import { UserManagementPage } from '../pages/UserManagementPage';
import { PimPage } from '../pages/PimPage';
import { uniqueValue } from '../utils/data-generator';

type ToastMessages = {
  successMessage: Locator;
  updatedMessage: Locator;
  deletedMessage: Locator;
};

type TestFixtures = {
  loginPage: LoginPage;
  authenticatedLogin: LoginPage;
  toastMessages: ToastMessages;
  dashboardPage: DashboardPage;
  jobTitlesPage: JobTitlesPage;
  departmentsPage: DepartmentsPage;
  pimPage : PimPage;
  employmentStatusPage: EmploymentStatusPage;
  userManagementPage: UserManagementPage;
  departmentName: string;
  employmentStatusName: string;
};
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  authenticatedLogin: async ({ loginPage }, use) => {
    const username = process.env.ADMIN_USERNAME ?? 'Admin';
    const password = process.env.ADMIN_PASSWORD ?? 'admin123';

    await loginPage.open();
    await loginPage.login(username, password);
    await use(loginPage);
  },
  toastMessages: async ({ page }, use) => {
    await use({
      successMessage: page.getByText('Successfully Saved', { exact: true }),
      updatedMessage: page.getByText('Successfully Updated', { exact: true }),
      deletedMessage: page.getByText('Successfully Deleted', { exact: true }),
    });
  },
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  jobTitlesPage: async ({ page }, use) => use(new JobTitlesPage(page)),
  departmentsPage: async ({ page }, use) => use(new DepartmentsPage(page)),
  employmentStatusPage: async ({ page }, use) => use(new EmploymentStatusPage(page)),
  userManagementPage: async ({ page }, use) => use(new UserManagementPage(page)),
  pimPage: async ({ page }, use) => use(new PimPage(page)),
  departmentName: async ({}, use) => {
    const name = uniqueValue('Automation Dept');
    await use(name);
  },
  employmentStatusName: async ({}, use) => {
    const name = uniqueValue('Contractor');
    await use(name);
  },
});
export { expect } from '@playwright/test';
