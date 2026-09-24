# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin\departments.spec.ts >> Departments >> Admin should edit a department
- Location: tests\admin\departments.spec.ts:13:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Successfully Updated', { exact: true })
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('Successfully Updated', { exact: true }) with timeout 150000ms
  - waiting for getByText('Successfully Updated', { exact: true })
  - operation was aborted: Test ended.

```

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "Admin" [level=6]
  - heading "/ Organization" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: Demo Source
      - text: 
  - navigation "Topbar Menu":
    - list:
      - listitem: User Management 
      - listitem: Job 
      - listitem: Organization 
      - listitem: Qualifications 
      - listitem:
        - link "Nationalities":
          - /url: "#"
      - listitem:
        - link "Corporate Branding":
          - /url: "#"
      - listitem: Configuration 
      - button ""
- heading "Organization Structure" [level=6]
- text: Edit
- checkbox "Edit" [checked]
- separator
- paragraph: OrangeHRM
- button " Add"
- list:
  - listitem:
    - list:
      - listitem:
        - text: "100: Administration"
        - button ""
        - button ""
        - button ""
      - listitem:
        - button ""
        - text: Engineering
        - button ""
        - button ""
        - button ""
      - listitem:
        - button ""
        - text: Sales & Marketing
        - button ""
        - button ""
        - button ""
      - listitem:
        - button ""
        - text: Client Services
        - button ""
        - button ""
        - button ""
      - listitem:
        - text: Finance
        - button ""
        - button ""
        - button ""
      - listitem:
        - text: Human Resources
        - button ""
        - button ""
        - button ""
      - listitem:
        - text: "1: hola"
        - button ""
        - button ""
        - button ""
      - listitem:
        - text: juan perez
        - button ""
        - button ""
        - button ""
      - listitem:
        - text: Automation Dept-1790252522769-lj5ga
        - button ""
        - button ""
        - button ""
      - listitem:
        - text: Automation Dept-1790252541839-91se2
        - button ""
        - button ""
        - button ""
- dialog:
  - document:
    - button "×"
    - paragraph: Edit Organization Unit
    - separator
    - text: Unit Id
    - textbox
    - text: Name*
    - textbox: Automation Dept-1790252541839-91se2 Updated
    - text: Description
    - textbox "Type description here"
    - separator
    - paragraph: "* Required"
    - button "Cancel"
    - button "Save"
- paragraph: OrangeHRM OS 5.9
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '../../fixtures/test-fixtures';
  2  | 
  3  | test.describe('Departments', () => {
  4  |   test.beforeEach(async ({ authenticatedLogin, departmentsPage }) => {
  5  |     await departmentsPage.open();
  6  |   });
  7  |   test('Admin should add a department', async ({ departmentsPage, toastMessages, departmentName }) => {
  8  | 
  9  |     await departmentsPage.add(departmentName);
  10 |     await expect(toastMessages.successMessage).toBeVisible();
  11 |   });
  12 | 
  13 |   test('Admin should edit a department', async ({ departmentsPage, toastMessages, departmentName }) => {
  14 |   const edited = `${departmentName} Updated`;
  15 | 
  16 |     await departmentsPage.add(departmentName);
  17 |     await departmentsPage.edit(departmentName, edited);
> 18 |     await expect(toastMessages.updatedMessage).toBeVisible();
     |                                                ^ Error: expect(locator).toBeVisible() failed
  19 |   });
  20 | 
  21 |   test('Admin should delete a department', async ({ departmentsPage, toastMessages, departmentName }) => {
  22 |     await departmentsPage.add(departmentName);
  23 |     await departmentsPage.delete(departmentName);
  24 |     await expect(toastMessages.deletedMessage).toBeVisible();
  25 |     await expect(departmentsPage.getDepartment(departmentName)).not.toBeVisible();
  26 |   });
  27 |   
  28 |   test('Admin should require a department name', async ({ departmentsPage, page }) => {
  29 |     await departmentsPage.add('');
  30 |     await expect(
  31 |       page
  32 |         .getByRole('dialog')
  33 |         .getByText('Required', { exact: true }),
  34 |     ).toBeVisible();
  35 |   });
  36 | });
  37 | 
```