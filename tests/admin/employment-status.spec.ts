import { test, expect } from '../../fixtures/test-fixtures';
import { uniqueValue } from '../../utils/data-generator';
test.describe('Employment status', () => {
  test.beforeEach(async ({ authenticatedLogin, employmentStatusPage }) => {
    await employmentStatusPage.open();
  });
  test('Admin should add an employment status', async ({ employmentStatusPage, resources }) => {
    const name = resources.track('employmentStatus', uniqueValue('QA Status'));
    await test.step('Create record', async () => {
      await employmentStatusPage.add(name);
    });
    await test.step('Reopen and verify saved record', async () => {
      await employmentStatusPage.open();
      await expect(employmentStatusPage.getRow(name)).toHaveCount(1);
    });
  });
  test('Admin should persist an edited employment status', async ({
    employmentStatusPage,
    resources,
  }) => {
    const name = resources.track('employmentStatus', uniqueValue('QA Status'));
    const edited = resources.track('employmentStatus', name + ' Updated');
    await test.step('Create record', async () => {
      await employmentStatusPage.add(name);
    });
    await test.step('Edit record', async () => {
      await employmentStatusPage.edit(name, edited);
      await expect(employmentStatusPage.getRow(edited)).toHaveCount(1);
    });
    await test.step('Reopen and verify persistence', async () => {
      await employmentStatusPage.open();
      await expect(employmentStatusPage.getRow(edited)).toHaveCount(1);
      await expect(employmentStatusPage.getRow(name)).toHaveCount(0);
    });
  });
  test('Admin should delete an employment status', async ({ employmentStatusPage, resources }) => {
    const name = resources.track('employmentStatus', uniqueValue('QA Status'));
    await test.step('Create record', async () => {
      await employmentStatusPage.add(name);
    });
    await test.step('Delete record', async () => {
      await employmentStatusPage.delete(name);
    });
    await test.step('Refresh and verify absence', async () => {
      await employmentStatusPage.open();
      await expect(employmentStatusPage.getRow(name)).toHaveCount(0);
    });
  });
  test('Admin should require a employment status name', async ({ employmentStatusPage }) => {
    await employmentStatusPage.add('');
    await expect(employmentStatusPage.nameError).toHaveText('Required');
  });
});
