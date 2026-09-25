import { test, expect } from '../../fixtures/test-fixtures';
//test.describe.configure({ mode: 'parallel' });
test.describe('Employment status', () => {
  test.beforeEach(async ({ authenticatedLogin, employmentStatusPage }) => {
    await employmentStatusPage.open();
  });
  test('Admin should add an employment status', async ({
    employmentStatusPage,
    toastMessages,
    employmentStatusName,
  }) => {
    await employmentStatusPage.add(employmentStatusName);
    await expect(toastMessages.successMessage).toBeVisible();
    await expect(employmentStatusPage.getRow(employmentStatusName)).toBeVisible();
  });

  test('Admin should edit an employment status', async ({
    employmentStatusPage,
    toastMessages,
    employmentStatusName,
  }) => {
    const edited = `${employmentStatusName} Updated`;

    await employmentStatusPage.add(employmentStatusName);
    await employmentStatusPage.edit(employmentStatusName, edited);
    await expect(toastMessages.updatedMessage).toBeVisible();
    await expect(employmentStatusPage.getRow(edited)).toBeVisible();
  });

  test('Admin should delete an employment status', async ({
    employmentStatusPage,
    toastMessages,
    employmentStatusName,
  }) => {
    await employmentStatusPage.add(employmentStatusName);
    await employmentStatusPage.delete(employmentStatusName);
    await expect(toastMessages.deletedMessage).toBeVisible();
    await expect(employmentStatusPage.getRow(employmentStatusName)).not.toBeVisible();
  });
  test('Admin should require an employment status name', async ({ employmentStatusPage, page }) => {
    await employmentStatusPage.add('');
    await expect(page.getByText('Required')).toBeVisible();
  });
});
