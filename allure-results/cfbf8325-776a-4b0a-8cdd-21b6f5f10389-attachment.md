# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login\login.spec.ts >> Login >> User should see an error for an invalid username
- Location: tests\login\login.spec.ts:15:7

# Error details

```
Error: page.waitForURL: Target page, context or browser has been closed
=========================== logs ===========================
waiting for navigation to "**/dashboard/index" until "load"
  navigated to "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
============================================================
```

# Test source

```ts
  1  | import { expect, Locator, Page } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  |   readonly usernameInput: Locator;
  5  |   readonly passwordInput: Locator;
  6  |   readonly loginButton: Locator;
  7  |   readonly invalidCredentialsMessage: Locator;
  8  | 
  9  |   constructor(private readonly page: Page) {
  10 |     this.usernameInput = page.getByPlaceholder('Username');
  11 |     this.passwordInput = page.getByPlaceholder('Password');
  12 |     this.loginButton = page.getByRole('button', { name: 'Login' });
  13 |     this.invalidCredentialsMessage = page.getByText('Invalid credentials');
  14 |   }
  15 | 
  16 |   async open(): Promise<void> {
  17 |     await this.page.goto('/web/index.php/auth/login');
  18 |   }
  19 | 
  20 |   async login(username: string, password: string): Promise<void> {
  21 |     await this.usernameInput.fill(username);
  22 |     await this.passwordInput.fill(password);
  23 | 
  24 |     await Promise.all([
> 25 |       this.page.waitForURL('**/dashboard/index'),
     |                 ^ Error: page.waitForURL: Target page, context or browser has been closed
  26 |       this.loginButton.click(),
  27 |     ]);
  28 |   }
  29 | 
  30 |   async submitLogin(username: string, password: string): Promise<void> {
  31 |     await this.usernameInput.fill(username);
  32 |     await this.passwordInput.fill(password);
  33 |     await this.loginButton.click();
  34 |   }
  35 | 
  36 |   async expectInvalidCredentials(): Promise<void> {
  37 |     await expect(this.invalidCredentialsMessage).toBeVisible();
  38 |   }
  39 | 
  40 |   async expectRequiredFields(count: number): Promise<void> {
  41 |     await expect(this.page.getByText('Required', { exact: true })).toHaveCount(count);
  42 |   }
  43 | 
  44 |   async logout(): Promise<void> {
  45 |     await this.page.getByAltText('profile picture').click();
  46 |     await this.page.getByText('Logout').click();
  47 |   }
  48 | }
  49 | 
```