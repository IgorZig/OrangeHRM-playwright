import { test, expect } from '../../fixtures/test-fixtures';

import { adminCredentials } from '../../utils/environment';
const { username: admin, password } = adminCredentials();

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
    await expect(loginPage.error('Username')).toHaveText('Required');
  });
  test('User should be told when password is empty', async ({ loginPage, page }) => {
    await loginPage.submitLogin(admin, '');
    await expect(loginPage.error('Password')).toHaveText('Required');
  });
  test('User should be told when both credentials are empty', async ({ loginPage, page }) => {
    await loginPage.submitLogin('', '');
    await expect(loginPage.error('Username')).toHaveText('Required');
    await expect(loginPage.error('Password')).toHaveText('Required');
  });
  test('Logged-in user should be able to log out and lose protected access', async ({
    loginPage,
    page,
  }) => {
    await loginPage.login(admin, password);
    await loginPage.logout();
    await expect(loginPage.loginButton).toBeVisible();
    await page.goto('/web/index.php/dashboard/index');
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});
