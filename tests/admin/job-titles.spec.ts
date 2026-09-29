import { test, expect } from '../../fixtures/test-fixtures';
import { uniqueValue } from '../../utils/data-generator';
test.describe('Job titles', () => {
  test.beforeEach(async ({ authenticatedLogin, jobTitlesPage }) => {
    await jobTitlesPage.open();
  });
  test('Admin should add a job title', async ({ jobTitlesPage, resources }) => {
    const name = resources.track('jobTitle', uniqueValue('QA Title'));
    await test.step('Create record', async () => {
      await jobTitlesPage.add(name, 'Created by automated test');
    });
    await test.step('Reopen and verify saved record', async () => {
      await jobTitlesPage.open();
      await expect(jobTitlesPage.getRow(name)).toHaveCount(1);
      await expect(
        jobTitlesPage
          .getRow(name)
          .getByRole('cell', { name: 'Created by automated test', exact: true }),
      ).toBeVisible();
    });
  });
  test('Admin should persist an edited job title', async ({ jobTitlesPage, resources }) => {
    const name = resources.track('jobTitle', uniqueValue('QA Title'));
    const edited = resources.track('jobTitle', name + ' Updated');
    await test.step('Create record', async () => {
      await jobTitlesPage.add(name);
    });
    await test.step('Edit record', async () => {
      await jobTitlesPage.edit(name, edited);
      await expect(jobTitlesPage.getRow(edited)).toHaveCount(1);
    });
    await test.step('Reopen and verify persistence', async () => {
      await jobTitlesPage.open();
      await expect(jobTitlesPage.getRow(edited)).toHaveCount(1);
      await expect(jobTitlesPage.getRow(name)).toHaveCount(0);
    });
  });
  test('Admin should delete a job title', async ({ jobTitlesPage, resources }) => {
    const name = resources.track('jobTitle', uniqueValue('QA Title'));
    await test.step('Create record', async () => {
      await jobTitlesPage.add(name);
    });
    await test.step('Delete record', async () => {
      await jobTitlesPage.delete(name);
    });
    await test.step('Refresh and verify absence', async () => {
      await jobTitlesPage.open();
      await expect(jobTitlesPage.getRow(name)).toHaveCount(0);
    });
  });
  test('Admin should require a job title name', async ({ jobTitlesPage }) => {
    await jobTitlesPage.add('');
    await expect(jobTitlesPage.nameError).toHaveText('Required');
  });
});
