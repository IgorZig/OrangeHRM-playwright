# OrangeHRM Playwright

Portfolio-grade end-to-end tests for the OrangeHRM demo application, using Playwright, TypeScript, Page Objects, and custom fixtures.

## Stack and architecture

- Playwright Test and TypeScript
- One page object per OrangeHRM area in `pages/`
- Scenario-only specifications in `tests/`
- Reusable page-object fixtures in `fixtures/test-fixtures.ts`
- Typed, value-only test data in `test-data/`
- `utils/data-generator.ts` creates unique records and future dates. It avoids collisions in a shared public demo.

Each test owns its setup. Admin create/edit/delete scenarios generate unique values and remove their record in the same test. The profile test restores the value it changes. Tests run in one worker because this is a shared demo environment.

## Setup

```bash
npm install
npx playwright install
```

Copy `.env.example` to `.env`, then set the target and credentials. `playwright.config.ts` reads this file before tests start:

```text
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
```

`.env` is intentionally ignored by Git. The configuration has public-demo defaults to make initial exploration simple; use environment variables in CI and for any non-demo target.

## Run

```bash
npx playwright test
npx playwright test --headed
npx playwright test tests/admin/users.spec.ts
npx playwright test --project=chromium
npx playwright show-report
```

`npm test`, `npm run test:headed`, `npm run test:ui`, and `npm run report` provide the same common workflows.

## Coverage design

The suite covers login validation/logout, user administration, job titles, departments, employment status, editable personal information, leave validation, and recruitment candidates. It applies positive and negative tests, equivalence partitions, validation/error guessing, and data-isolated CRUD flows. Assertions verify visible success, validation, persistence, and search outcomes rather than only clicks.

## POM and fixtures

Specs request page objects from the custom fixture, e.g. `({ loginPage, userManagementPage })`. Page objects own locators, navigation, and interactions; specs describe the business outcome. Credentials are read only from the environment/configuration, never from a spec.

## Demo assumptions and future improvements

OrangeHRM's public demo is shared and can be reset or rate-limited. Vacancy names and leave balance/type vary by demo seed; the leave and recruitment tests should be parameterized for a stable private demo in CI. Future work: authenticated storage state, API setup/teardown, role-specific accounts, accessibility checks, tags, and cross-browser projects.
