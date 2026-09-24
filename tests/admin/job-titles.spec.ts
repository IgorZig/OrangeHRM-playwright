import { test, expect } from '../../fixtures/test-fixtures';
import { uniqueValue } from '../../utils/data-generator';
test.describe('Job titles', () => {
  test.beforeEach(async ({ authenticatedLogin, jobTitlesPage }) => {
    await jobTitlesPage.open();
  });
  test('Admin should add a valid job title', async ({ jobTitlesPage, toastMessages }) => {
    const title = uniqueValue('QA Engineer');
    await jobTitlesPage.add(title, 'Created by automated test');
    await expect(toastMessages.successMessage).toBeVisible();
    await expect(jobTitlesPage.getRow(title)).toBeVisible();
  });

  test('Admin should edit a valid job title', async ({ jobTitlesPage, toastMessages }) => {
    const title = uniqueValue('QA Engineer');
    const edited = `${title} Senior`;
    await jobTitlesPage.add(title, 'Created by automated test');
    await jobTitlesPage.edit(title, edited);
    await expect(toastMessages.updatedMessage).toBeVisible();
    await expect(jobTitlesPage.getRow(edited)).toBeVisible();
  });

  test('Admin should delete a valid job title', async ({ jobTitlesPage, toastMessages }) => {
    const title = uniqueValue('QA Engineer');
    await jobTitlesPage.add(title, 'Created by automated test');
    await jobTitlesPage.delete(title);
    await expect(toastMessages.deletedMessage).toBeVisible();
    await expect(jobTitlesPage.getRow(title)).not.toBeVisible();
  });
  test('Admin should require a title', async ({ jobTitlesPage, page }) => {
    await jobTitlesPage.add('');
    await expect(page.getByText('Required', { exact: true })).toBeVisible();
  });
});
