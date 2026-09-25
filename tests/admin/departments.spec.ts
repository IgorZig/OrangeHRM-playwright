import { test, expect } from '../../fixtures/test-fixtures';

test.describe('Departments', () => {
  test.beforeEach(async ({ authenticatedLogin, departmentsPage }) => {
    await departmentsPage.open();
  });
  test('Admin should add a department', async ({
    departmentsPage,
    toastMessages,
    departmentName,
  }) => {
    await departmentsPage.add(departmentName);
    await expect(toastMessages.successMessage).toBeVisible();
    await expect(departmentsPage.getRow(departmentName)).toBeVisible();
  });

  test('Admin should edit a department', async ({
    departmentsPage,
    toastMessages,
    departmentName,
  }) => {
    const edited = `${departmentName} Updated`;

    await departmentsPage.add(departmentName);
    await departmentsPage.edit(departmentName, edited);
    await expect(toastMessages.updatedMessage).toBeVisible();
    await expect(departmentsPage.getRow(edited)).toBeVisible();
  });

  test('Admin should delete a department', async ({
    departmentsPage,
    toastMessages,
    departmentName,
    page,
  }) => {
    await departmentsPage.add(departmentName);
    await departmentsPage.delete(departmentName);
    await expect(toastMessages.deletedMessage).toBeVisible();
    await expect(page.getByText(departmentName, { exact: true })).toHaveCount(0);
  });

  test('Admin should require a department name', async ({ departmentsPage, page }) => {
    await departmentsPage.add('');
    await expect(page.getByRole('dialog').getByText('Required', { exact: true })).toBeVisible();
  });
});
