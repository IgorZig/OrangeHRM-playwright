# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin\users.spec.ts >> Admin user management >> Admin should search and delete an enabled ESS user
- Location: tests\admin\users.spec.ts:20:7

# Error details

```
Error: locator.click: Error: strict mode violation: getByText('User Management', { exact: true }) resolved to 2 elements:
    1) <h6 data-v-7b563373="" data-v-c286b6e5="" class="oxd-text oxd-text--h6 oxd-topbar-header-breadcrumb-level">User Management</h6> aka getByRole('heading', { name: '/ User Management' })
    2) <span class="oxd-topbar-body-nav-tab-item">…</span> aka getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management')

Call log:
  - waiting for getByText('User Management', { exact: true })

```

# Page snapshot

```yaml
- generic [ref=f27e3]:
  - generic:
    - complementary [ref=f27e4]:
      - navigation "Sidepanel" [ref=f27e5]:
        - generic [ref=f27e6]:
          - link [ref=f27e7] [cursor=pointer]:
            - /url: https://www.orangehrm.com/
            - img "client brand banner" [ref=f27e9]
          - text: 
        - generic [ref=f27e10]:
          - generic [ref=f27e11]:
            - generic [ref=f27e12]:
              - textbox "Search" [ref=f27e15]
              - button "" [ref=f27e16] [cursor=pointer]
            - separator [ref=f27e18]
          - list [ref=f27e19]:
            - listitem [ref=f27e20]:
              - link "Admin" [ref=f27e21] [cursor=pointer]:
                - /url: /web/index.php/admin/viewAdminModule
            - listitem [ref=f27e25]:
              - link "PIM" [ref=f27e26] [cursor=pointer]:
                - /url: /web/index.php/pim/viewPimModule
            - listitem [ref=f27e41]:
              - link "Leave" [ref=f27e42] [cursor=pointer]:
                - /url: /web/index.php/leave/viewLeaveModule
            - listitem [ref=f27e46]:
              - link "Time" [ref=f27e47] [cursor=pointer]:
                - /url: /web/index.php/time/viewTimeModule
            - listitem [ref=f27e54]:
              - link "Recruitment" [ref=f27e55] [cursor=pointer]:
                - /url: /web/index.php/recruitment/viewRecruitmentModule
            - listitem [ref=f27e62]:
              - link "My Info" [ref=f27e63] [cursor=pointer]:
                - /url: /web/index.php/pim/viewMyDetails
            - listitem [ref=f27e70]:
              - link "Performance" [ref=f27e71] [cursor=pointer]:
                - /url: /web/index.php/performance/viewPerformanceModule
            - listitem [ref=f27e80]:
              - link "Dashboard" [ref=f27e81] [cursor=pointer]:
                - /url: /web/index.php/dashboard/index
            - listitem [ref=f27e85]:
              - link "Directory" [ref=f27e86] [cursor=pointer]:
                - /url: /web/index.php/directory/viewDirectory
            - listitem [ref=f27e90]:
              - link "Maintenance" [ref=f27e91] [cursor=pointer]:
                - /url: /web/index.php/maintenance/viewMaintenanceModule
            - listitem [ref=f27e96]:
              - link "Claim" [ref=f27e97] [cursor=pointer]:
                - /url: /web/index.php/claim/viewClaimModule
            - listitem [ref=f27e105]:
              - link "Buzz" [ref=f27e106] [cursor=pointer]:
                - /url: /web/index.php/buzz/viewBuzz
    - banner [ref=f27e110]:
      - generic [ref=f27e111]:
        - generic [ref=f27e112]:
          - text: 
          - generic [ref=f27e113]:
            - heading "Admin" [level=6] [ref=f27e114]
            - heading "/ User Management" [level=6] [ref=f27e115]
        - link [ref=f27e117]:
          - /url: https://orangehrm.com/open-source/upgrade-to-advanced
          - button "Upgrade" [ref=f27e118] [cursor=pointer]
        - list [ref=f27e124]:
          - listitem [ref=f27e125]:
            - generic [ref=f27e126] [cursor=pointer]:
              - img "profile picture" [ref=f27e127]
              - paragraph [ref=f27e128]: Demo Source
              - generic [ref=f27e129]: 
      - navigation "Topbar Menu" [ref=f27e131]:
        - list [ref=f27e132]:
          - listitem [ref=f27e133] [cursor=pointer]:
            - generic [ref=f27e134]:
              - text: User Management
              - generic [ref=f27e135]: 
          - listitem [ref=f27e136] [cursor=pointer]:
            - generic [ref=f27e137]:
              - text: Job
              - generic [ref=f27e138]: 
          - listitem [ref=f27e139] [cursor=pointer]:
            - generic [ref=f27e140]:
              - text: Organization
              - generic [ref=f27e141]: 
          - listitem [ref=f27e142] [cursor=pointer]:
            - generic [ref=f27e143]:
              - text: Qualifications
              - generic [ref=f27e144]: 
          - listitem [ref=f27e145] [cursor=pointer]:
            - link "Nationalities" [ref=f27e146]:
              - /url: "#"
          - listitem [ref=f27e147] [cursor=pointer]:
            - link "Corporate Branding" [ref=f27e148]:
              - /url: "#"
          - listitem [ref=f27e149] [cursor=pointer]:
            - generic [ref=f27e150]:
              - text: Configuration
              - generic [ref=f27e151]: 
          - button "" [ref=f27e153] [cursor=pointer]
  - generic [ref=f27e155]:
    - generic [ref=f27e157]:
      - generic [ref=f27e158]:
        - generic [ref=f27e159]:
          - heading "System Users" [level=5] [ref=f27e161]
          - button "" [ref=f27e164] [cursor=pointer]
        - separator [ref=f27e166]
        - generic [ref=f27e168]:
          - generic [ref=f27e170]:
            - generic [ref=f27e172]:
              - generic [ref=f27e173]: Username
              - textbox [ref=f27e176]
            - generic [ref=f27e178]:
              - generic [ref=f27e179]: User Role
              - generic [ref=f27e183] [cursor=pointer]:
                - generic [ref=f27e184]: "-- Select --"
                - generic [ref=f27e185]: 
            - generic [ref=f27e188]:
              - generic [ref=f27e189]: Employee Name
              - textbox "Type for hints..." [ref=f27e194]
            - generic [ref=f27e196]:
              - generic [ref=f27e197]: Status
              - generic [ref=f27e201] [cursor=pointer]:
                - generic [ref=f27e202]: "-- Select --"
                - generic [ref=f27e203]: 
          - separator [ref=f27e205]
          - generic [ref=f27e206]:
            - button "Reset" [ref=f27e207] [cursor=pointer]
            - button "Search" [ref=f27e208] [cursor=pointer]
      - generic [ref=f27e209]:
        - button " Add" [ref=f27e211] [cursor=pointer]:
          - generic [ref=f27e212]: 
          - text: Add
        - table [ref=f27e214]
    - generic [ref=f27e219]:
      - paragraph [ref=f27e220]: OrangeHRM OS 5.9
      - paragraph [ref=f27e221]:
        - text: © 2005 - 2026
        - link "OrangeHRM, Inc" [ref=f27e222] [cursor=pointer]:
          - /url: http://www.orangehrm.com
        - text: . All rights reserved.
```

# Test source

```ts
  1  | import { Locator, Page } from '@playwright/test';
  2  | import { AdminPage } from './AdminPage';
  3  | import { UserData } from '../test-data/users';
  4  | 
  5  | export class UserManagementPage extends AdminPage {
  6  |   constructor(page: Page) {
  7  |     super(page);
  8  |   }
  9  | 
  10 |   async open(): Promise<void> {
  11 |     await this.page.getByRole('link', { name: 'Admin' }).click();
> 12 |     await this.page.getByText('User Management', { exact: true }).click();
     |                                                                   ^ Error: locator.click: Error: strict mode violation: getByText('User Management', { exact: true }) resolved to 2 elements:
  13 |     await this.page.getByRole('menuitem', { name: 'Users', exact: true }).click();
  14 |   }
  15 | 
  16 |   private async selectOption(index: number, value: string): Promise<void> {
  17 |     await this.page.locator('.oxd-select-text').nth(index).click();
  18 |     await this.page.getByRole('option', { name: value, exact: true }).click();
  19 |   }
  20 | 
  21 |   async addUser(user: UserData): Promise<void> {
  22 |     await this.page.getByRole('button', { name: 'Add' }).click();
  23 |     await this.selectOption(0, user.role);
  24 | 
  25 |     const employee = this.page.getByPlaceholder('Type for hints...');
  26 |     await employee.fill(user.employeeName);
  27 |     await this.page.getByRole('option', { name: new RegExp(user.employeeName, 'i') }).click();
  28 | 
  29 |     await this.selectOption(1, user.status);
  30 |     const form = this.page.locator('form');
  31 |     await form.getByRole('textbox').nth(1).fill(user.username);
  32 |     await form.getByRole('textbox').nth(2).fill(user.password);
  33 |     await form.getByRole('textbox').nth(3).fill(user.password);
  34 |     await form.getByRole('button', { name: 'Save' }).click();
  35 |   }
  36 | 
  37 |   async submitEmptyUser(): Promise<void> {
  38 |     await this.page.getByRole('button', { name: 'Add' }).click();
  39 |     await this.page.getByRole('button', { name: 'Save' }).click();
  40 |   }
  41 | 
  42 |   async searchUser(username: string): Promise<void> {
  43 |     const search = this.page.locator('form');
  44 |     await search.getByRole('textbox').nth(0).fill(username);
  45 |     await search.getByRole('button', { name: 'Search' }).click();
  46 |   }
  47 | 
  48 |   async deleteUser(username: string): Promise<void> {
  49 |     const row = this.page.getByRole('row').filter({ hasText: username });
  50 |     await row.getByRole('button').last().click();
  51 |     await this.page.getByRole('button', { name: 'Yes, Delete' }).click();
  52 |   }
  53 | 
  54 |   getRow(username: string): Locator {
  55 |     return this.page.getByRole('row').filter({ hasText: username });
  56 |   }
  57 | }
  58 | 
```