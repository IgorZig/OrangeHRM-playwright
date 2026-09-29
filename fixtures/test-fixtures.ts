import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { JobTitlesPage } from '../pages/JobTitlesPage';
import { DepartmentsPage } from '../pages/DepartmentsPage';
import { EmploymentStatusPage } from '../pages/EmploymentStatusPage';
import { UserManagementPage } from '../pages/UserManagementPage';
import { PimPage } from '../pages/PimPage';
import { adminCredentials } from '../utils/environment';

type Resource = 'user' | 'employee' | 'department' | 'employmentStatus' | 'jobTitle';
type Fixtures = {
  loginPage: LoginPage;
  authenticatedLogin: LoginPage;
  dashboardPage: DashboardPage;
  jobTitlesPage: JobTitlesPage;
  departmentsPage: DepartmentsPage;
  employmentStatusPage: EmploymentStatusPage;
  userManagementPage: UserManagementPage;
  pimPage: PimPage;
  resources: { track: (kind: Resource, name: string) => string };
  diagnostics: void;
};
function cleanup(page: Page, kind: Resource, name: string) {
  switch (kind) {
    case 'user':
      return new UserManagementPage(page).cleanupUser(name);
    case 'employee':
      return new PimPage(page).cleanupEmployee(name);
    case 'department':
      return new DepartmentsPage(page).cleanup(name);
    case 'employmentStatus':
      return new EmploymentStatusPage(page).cleanup(name);
    case 'jobTitle':
      return new JobTitlesPage(page).cleanup(name);
  }
}
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  authenticatedLogin: async ({ loginPage }, use) => {
    const { username, password } = adminCredentials();
    await loginPage.open();
    await loginPage.login(username, password);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => use(new DashboardPage(page)),
  jobTitlesPage: async ({ page }, use) => use(new JobTitlesPage(page)),
  departmentsPage: async ({ page }, use) => use(new DepartmentsPage(page)),
  employmentStatusPage: async ({ page }, use) => use(new EmploymentStatusPage(page)),
  userManagementPage: async ({ page }, use) => use(new UserManagementPage(page)),
  pimPage: async ({ page }, use) => use(new PimPage(page)),
  resources: [
    async ({ context }, use, testInfo) => {
      const records: { kind: Resource; name: string }[] = [];
      await use({
        track: (kind, name) => {
          records.push({ kind, name });
          return name;
        },
      });
      if (!records.length) return;
      const page = await context.newPage();
      page.setDefaultTimeout(10_000);
      const errors: string[] = [];
      const outcomes: string[] = [];
      try {
        await base.step('Cleanup test-owned records', async () => {
          // Register before creation. Reverse order deletes accounts before their employees.
          for (const { kind, name } of records.reverse()) {
            try {
              await cleanup(page, kind, name);
              outcomes.push(`${kind}: ${name}: absent after cleanup`);
            } catch (error) {
              const message = `${kind}: ${name}: ${String(error)}`;
              errors.push(message);
              outcomes.push(message);
            }
          }
        });
      } finally {
        await testInfo.attach('cleanup', { body: outcomes.join('\n'), contentType: 'text/plain' });
        await page.close();
      }
      if (errors.length)
        throw new Error(
          `Cleanup failed for ${errors.length} resource(s). See cleanup attachment.\n${errors.join('\n')}`,
        );
    },
    { timeout: 90_000 },
  ],
  diagnostics: [
    async ({ page }, use, testInfo) => {
      const errors: string[] = [];
      page.on('response', (r) => {
        const path = new URL(r.url()).pathname;
        if (path.includes('/api/') && r.status() >= 400)
          errors.push(`${r.request().method()} ${path} ${r.status()}`);
      });
      await use();
      if (errors.length)
        await testInfo.attach('HTTP errors', {
          body: errors.join('\n'),
          contentType: 'text/plain',
        });
    },
    { auto: true },
  ],
});
export { expect } from '@playwright/test';
