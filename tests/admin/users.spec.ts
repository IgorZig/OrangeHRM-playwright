import { test, expect } from '../../fixtures/test-fixtures';
import { uniqueValue } from '../../utils/data-generator';
import { validUser } from '../../test-data/users';

const admin = process.env.ADMIN_USERNAME ?? 'Admin';

test.describe('Admin user management', () => {
  test.beforeEach(async ({ authenticatedLogin, userManagementPage }) => {
    await userManagementPage.open();
  });
  test('Admin should add an enabled ESS user with a selected employee', async ({
    userManagementPage,
    toastMessages,
  }) => {
    const data = validUser(uniqueValue('essuser'));
    await userManagementPage.addUser(data);
    await expect(toastMessages.successMessage).toBeVisible();
  });

  test('Admin should search and delete an enabled ESS user', async ({
    userManagementPage,
    toastMessages,
  }) => {
    const data = validUser(uniqueValue('essuser'));
    await userManagementPage.addUser(data);
    await expect(toastMessages.successMessage).toBeVisible();
    await userManagementPage.open();
    await userManagementPage.searchUser(data.username);
    await userManagementPage.deleteUser(data.username);
    await expect(toastMessages.deletedMessage).toBeVisible();
    await userManagementPage.searchUser(data.username);
    await expect(userManagementPage.getRow(data.username)).toHaveCount(0);
  });
  test('Admin should require mandatory fields when adding a user', async ({
    userManagementPage,
    page,
  }) => {
    await userManagementPage.submitEmptyUser();
    await expect(page.getByText('Required').first()).toBeVisible();
  });
  test('Admin should reject a duplicate username', async ({ userManagementPage, page }) => {
    const data = validUser(admin);
    await userManagementPage.addUser(data);
    await expect(page.getByText(/Already exists|should be unique/i)).toBeVisible();
  });
});
