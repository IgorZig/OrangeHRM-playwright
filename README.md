# OrangeHRM Playwright QA Portfolio

UI test automation for the [OrangeHRM public demo](https://opensource-demo.orangehrmlive.com),
built with **Playwright, TypeScript, Page Object Model and Azure DevOps**.

The project demonstrates independent test setup, generated test data, cleanup after
failures, persisted-state assertions and investigation of application defects.

## Coverage and results

**Recorded local run — 29 September 2026:** 22 passed, 1 failed, 0 skipped.
All 23 tests ran in headless Chromium with one worker and no retries in approximately
3 minutes 36 seconds. The failure concerns department editing and is documented in
the [defect investigation](docs/bug-reports/department-edit-investigation.md).

| Area | Tests | Behaviour checked |
| --- | ---: | --- |
| Login | 7 | Valid and invalid credentials, required fields, logout and protected-route access |
| User management | 4 | ESS creation, employee association, search/delete, required fields and duplicate usernames |
| Departments | 4 | Create, edit persistence, delete and required name; edit fails in the recorded run |
| Employment status | 4 | Create, edit persistence, delete and required name |
| Job titles | 4 | Create with description, edit persistence, delete and required title |
| **Total** | **23** | **Chromium UI tests** |

PIM employee creation supplies test-owned data for user-management scenarios.
The current automated scope is Login and selected Admin workflows.

## Manual testing

The [test-case workbook](docs/test-scenarious/I_Zigelbaum_TestScenarioAndTestCases.xlsx)
contains 72 cases across PIM, Admin, Login, Leave, Time and Attendance, and Recruitment.
A separate [scenario workbook](docs/test-scenarious/I_Zigelbaum_TestScenarios.xlsx)
contains 72 scenarios. Workbook execution statuses are historical manual records,
separate from the automated results above.

The [defect reports](docs/bug-reports) include reproduction steps, expected and actual
results, and supporting observations.

## Architecture

```text
tests/       Business scenarios and assertions
    |
fixtures/    Typed page objects, authentication, cleanup and HTTP diagnostics
    |
pages/       Page interactions and reusable record checks
    |
utils/       Scoped locators, search synchronization and data generation

test-data/   Typed test data
scripts/     Execution and report generation
```

- Each test creates its own required records and registers them for cleanup.
- Teardown deletes accounts before their employees and reports cleanup failures.
- Create, edit and delete checks reopen the page or repeat a search to verify persistence.
- Locators use roles and exact, scoped text, with CSS for controls lacking accessible labels.
- Edit actions wait for the existing value to load before changing it.

## Run locally

Use **Node.js 22**, matching the Azure pipeline.

```bash
npm ci
npx playwright install chromium
npm run typecheck
npm run format:check
npm run test:demo
```

The public demo is the default target. Copy `.env.example` to an ignored `.env` to
configure `BASE_URL`, `ADMIN_USERNAME` and `ADMIN_PASSWORD`. The demo fallback is
limited to the public demo host; other environments require their own credentials.

Useful commands:

```bash
npx playwright test --list
npm run test:demo -- tests/login/login.spec.ts
npm run test:headed
npm run test:ui
```

The configuration uses a 60-second test timeout, 15-second action timeout and
10-second assertion timeout. Tests run with one worker and no retries.

## Reports

`npm run test:demo` prints a new `artifacts/baseline-*` directory. It records the
source commit, working-tree state, execution settings and results in `execution.json`.
The directory also contains Playwright HTML, JSON, JUnit and Allure results, with
screenshots, videos and traces retained for failures.

Replace `<run-directory>` with the path printed by the runner:

```bash
npx playwright show-report <run-directory>/playwright-report
npm run allure:report -- <run-directory>
npm run allure:open -- <run-directory>/allure-report
```

Generated reports are Git-ignored and must be produced locally or downloaded from
a CI run. Review reports before sharing: diagnostic attachments can contain account
and session data.

## Azure DevOps

The [Azure pipeline](azure-pipelines.yml) installs Node 22, locked npm dependencies,
Chromium and system dependencies, then type-checks and runs the tests. It publishes
JUnit results and an evidence artifact containing reports and failure diagnostics.
Reporting steps also run after test failures.

Configure `BASE_URL` and `ADMIN_USERNAME` as pipeline variables and `ADMIN_PASSWORD`
as a secret variable. The documented execution result above is local; an Azure run
result is not included. Azure DevOps is the current CI configuration; the earlier
GitHub Actions workflow has been retired.

## Scope and next steps

The shared demo can reset or be modified by other users. Generated names reduce
collisions, but runs remain dependent on demo availability. Configuration-list cleanup
currently checks rendered records and has not been validated with large paginated lists.

Next priorities are ESS permission checks, disabled-account behaviour and selected
field boundaries. Standalone PIM, Leave, Time and Recruitment automation remain planned.

## Author

**Igor Zigelbaum** — QA Engineer | Software Tester | Test Automation

- GitHub: [IgorZig](https://github.com/IgorZig)
- LinkedIn: [Igor Zigelbaum](https://www.linkedin.com/in/igorzigelbaum)
