import { randomUUID } from 'node:crypto';
import { test, expect } from '../../fixtures/test-fixtures';
import { uniqueValue } from '../../utils/data-generator';
import { validUser } from '../../test-data/users';

test.describe('Admin user management', () => {
  test.beforeEach(async ({ authenticatedLogin, userManagementPage }) => {
    await userManagementPage.open();
  });
  test('Admin should add an enabled ESS user with a selected employee', async ({
    pimPage,
    userManagementPage,
    resources,
  }) => {
    const firstName = uniqueValue('QA');
    const id = resources.track('employee', randomUUID().slice(0, 8));
    const username = resources.track('user', uniqueValue('ess'));
    const data = validUser(username, `${firstName} Smith`);
    await test.step('Create employee', async () => {
      await pimPage.open();
      await pimPage.addEmployee(firstName, 'Smith', id);
    });
    await test.step('Create ESS account', async () => {
      await userManagementPage.open();
      await userManagementPage.addUser(data);
    });
    await test.step('Verify account', async () => {
      await userManagementPage.open();
      await userManagementPage.expectUser(data);
    });
  });
  test('Admin should search and delete an enabled ESS user', async ({
    pimPage,
    userManagementPage,
    resources,
  }) => {
    const firstName = uniqueValue('QA');
    const id = resources.track('employee', randomUUID().slice(0, 8));
    const username = resources.track('user', uniqueValue('ess'));
    const data = validUser(username, `${firstName} Smith`);
    await test.step('Create employee', async () => {
      await pimPage.open();
      await pimPage.addEmployee(firstName, 'Smith', id);
    });
    await test.step('Create and find ESS account', async () => {
      await userManagementPage.open();
      await userManagementPage.addUser(data);
      await userManagementPage.open();
      await userManagementPage.expectUser(data);
    });
    await test.step('Delete and verify absence', async () => {
      await userManagementPage.deleteUser(username);
      await userManagementPage.searchUser(username);
      await expect(userManagementPage.getRow(username)).toHaveCount(0);
    });
  });
  test('Admin should require mandatory fields when adding a user', async ({
    userManagementPage,
  }) => {
    await userManagementPage.submitEmptyUser();
    for (const label of ['User Role', 'Employee Name', 'Status', 'Username']) {
      await test.step(`Validate ${label}`, async () => {
        await expect(userManagementPage.error(label)).toHaveText('Required');
      });
    }
    // Password rules are activated after a role is selected in this form.
    await userManagementPage.selectRole('ESS');
    await userManagementPage.save();
    await test.step('Validate password fields for ESS', async () => {
      await expect(userManagementPage.error('Password')).toHaveText('Required');
      // The demo reports a mismatch for the blank confirmation after selecting ESS.
      await expect(userManagementPage.error('Confirm Password')).toHaveText(
        'Passwords do not match',
      );
    });
  });
  test('Admin should reject a duplicate username', async ({
    pimPage,
    userManagementPage,
    resources,
  }) => {
    const firstName = uniqueValue('QA');
    const id = resources.track('employee', randomUUID().slice(0, 8));
    const username = resources.track('user', uniqueValue('ess'));
    const data = validUser(username, `${firstName} Smith`);
    await test.step('Create employee and original account', async () => {
      await pimPage.open();
      await pimPage.addEmployee(firstName, 'Smith', id);
      await userManagementPage.open();
      await userManagementPage.addUser(data);
      await userManagementPage.open();
      await userManagementPage.expectUser(data);
    });
    await test.step('Reject duplicate at username field', async () => {
      await userManagementPage.addUser(data);
      await expect(userManagementPage.error('Username')).toHaveText('Already exists');
      await userManagementPage.open();
      await userManagementPage.expectUser(data);
    });
  });
});
