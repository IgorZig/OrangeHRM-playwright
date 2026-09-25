import { test, expect } from '../../fixtures/test-fixtures';
import { uniqueValue } from '../../utils/data-generator';
import { validUser } from '../../test-data/users';
import { TIMEOUT } from 'node:dns';

const admin = process.env.ADMIN_USERNAME ?? 'Admin';

test.describe('Admin user management', () => {
  test.beforeEach(async ({ authenticatedLogin, userManagementPage }) => {
    await userManagementPage.open();
  });
 test('Admin should add an enabled ESS user with a selected employee', async ({
  userManagementPage,
  toastMessages,
  pimPage,
}) => {
  const firstName = uniqueValue('John');
  const lastName = 'Smith';
  const employeeName = `${firstName} ${lastName}`;
  const username = uniqueValue('essuser');

  const data = validUser(username, employeeName);

  try {
    // 1. Create a new employee
    await pimPage.open();
    await pimPage.addEmployee(firstName, lastName);

    // 2. Create an ESS user for the new employee
    await userManagementPage.open();
    await userManagementPage.addUser(data);

    // 3. Verify user was created
    await expect(toastMessages.successMessage).toBeVisible();

    const row = await userManagementPage.findRow(username);
    await expect(row).toBeVisible();

  } finally {
    await userManagementPage.cleanupUser(username);
  }
});

  test('Admin should search and delete an enabled ESS user', async ({
  pimPage,
  userManagementPage,
  toastMessages,
}) => {
  const firstName = uniqueValue('John');
  const lastName = 'Smith';
  const employeeName = `${firstName} ${lastName}`;
  const username = uniqueValue('essuser');

  const data = validUser(username, employeeName);

  try {
    // Create employee
    await pimPage.open();
    await pimPage.addEmployee(firstName, lastName);

    // Create ESS user linked to the new employee
    await userManagementPage.open();
    await userManagementPage.addUser(data);

    await expect(toastMessages.successMessage).toBeVisible();

    // Search and delete user
    await userManagementPage.searchUser(username);
    await userManagementPage.deleteUser(username);

    await expect(toastMessages.deletedMessage).toBeVisible();

    // Verify user was deleted
    await userManagementPage.searchUser(username);
    await expect(userManagementPage.getRow(username)).toHaveCount(0);
  } finally {
    await userManagementPage.cleanupUser(username);
  }
});
  test('Admin should require mandatory fields when adding a user', async ({
    userManagementPage,
    page,
  }) => {
    await userManagementPage.submitEmptyUser();
    await expect(page.getByText('Required').first()).toBeVisible();
  });
  test('Admin should reject a duplicate username', async ({
  pimPage,
  userManagementPage,
  page,
}) => {
  const firstName = uniqueValue('John');
  const lastName = 'Smith';
  const employeeName = `${firstName} ${lastName}`;

  const data = validUser(admin, employeeName);

  await pimPage.open();
  await pimPage.addEmployee(firstName, lastName);

  await userManagementPage.open();
  await userManagementPage.addUser(data);

  await expect(
    page.getByText(/Already exists|should be unique/i)
  ).toBeVisible();
});
});
