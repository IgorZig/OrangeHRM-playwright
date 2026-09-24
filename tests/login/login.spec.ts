import { test, expect } from '../../fixtures/test-fixtures';

const admin = process.env.ADMIN_USERNAME ?? 'Admin';
const password = process.env.ADMIN_PASSWORD ?? 'admin123';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => loginPage.open());
  test('User should be able to log in with valid credentials', async ({
    loginPage,
    dashboardPage,
  }) => {
    await loginPage.login(admin, password);
    await dashboardPage.expectLoaded();
  });
  test('User should see an error for an invalid username', async ({ loginPage }) => {
    await loginPage.submitLogin('UnknownUser', password);
    await expect(loginPage.invalidCredentialsMessage).toBeVisible();
  });
  test('User should see an error for an invalid password', async ({ loginPage }) => {
    await loginPage.submitLogin(admin, 'wrong-password');
    await expect(loginPage.invalidCredentialsMessage).toBeVisible();
  });
  test('User should be told when username is empty', async ({ loginPage, page }) => {
    await loginPage.submitLogin('', password);
    await expect(page.getByText('Required')).toBeVisible();
  });
  test('User should be told when password is empty', async ({ loginPage, page }) => {
    await loginPage.submitLogin(admin, '');
    await expect(page.getByText('Required')).toBeVisible();
  });
  test('User should be told when both credentials are empty', async ({ loginPage, page }) => {
    await loginPage.submitLogin('', '');
    await expect(page.getByText('Required')).toHaveCount(2);
  });
  test('Logged-in user should be able to log out', async ({ loginPage }) => {
    await loginPage.login(admin, password);
    await loginPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
  });
});
