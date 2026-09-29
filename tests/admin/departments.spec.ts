import { test, expect } from '../../fixtures/test-fixtures';
import { uniqueValue } from '../../utils/data-generator';
test.describe('Departments', () => {
  test.beforeEach(async ({ authenticatedLogin, departmentsPage }) => {
    await departmentsPage.open();
  });
  test('Admin should add a department', async ({ departmentsPage, resources }) => {
    const name = resources.track('department', uniqueValue('QA Dept'));
    await test.step('Create record', async () => {
      await departmentsPage.add(name);
    });
    await test.step('Reopen and verify saved record', async () => {
      await departmentsPage.open();
      await expect(departmentsPage.getRow(name)).toHaveCount(1);
    });
  });
  test('Admin should persist an edited department', async ({ departmentsPage, resources }) => {
    const name = resources.track('department', uniqueValue('QA Dept'));
    const edited = resources.track('department', name + ' Updated');
    await test.step('Create record', async () => {
      await departmentsPage.add(name);
    });
    await test.step('Edit record', async () => {
      await departmentsPage.edit(name, edited);
      await expect(departmentsPage.getRow(edited)).toHaveCount(1);
    });
    await test.step('Reopen and verify persistence', async () => {
      await departmentsPage.open();
      await expect(departmentsPage.getRow(edited)).toHaveCount(1);
      await expect(departmentsPage.getRow(name)).toHaveCount(0);
    });
  });
  test('Admin should delete a department', async ({ departmentsPage, resources }) => {
    const name = resources.track('department', uniqueValue('QA Dept'));
    await test.step('Create record', async () => {
      await departmentsPage.add(name);
    });
    await test.step('Delete record', async () => {
      await departmentsPage.delete(name);
    });
    await test.step('Refresh and verify absence', async () => {
      await departmentsPage.open();
      await expect(departmentsPage.getRow(name)).toHaveCount(0);
    });
  });
  test('Admin should require a department name', async ({ departmentsPage }) => {
    await departmentsPage.add('');
    await expect(departmentsPage.nameError).toHaveText('Required');
  });
});
