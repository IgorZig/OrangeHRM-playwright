# OrangeHRM Playwright QA portfolio

A focused UI automation project using Playwright, TypeScript, Page Object Model,
typed fixtures and generated test data against the public OrangeHRM demo.

**Latest local baseline, 29 September 2026: 22 passed, 1 failed, 0 skipped.**
All 23 tests ran in Chromium with one worker and zero retries in 216.484 seconds.
The department edit fails with an evidenced HTTP 422 application response. This
is not a claim of full regression stability.

## Automated coverage

| Area | Tests | Behaviour checked |
| --- | ---: | --- |
| Login | 7 | Valid/invalid login, field-specific required errors, logout and protected-route rejection |
| User management | 4 | ESS creation with username/role/status/employee checks, search/delete, field validation, duplicate username |
| Departments | 4 | Create, edit persistence, delete after reopening, required name; edit currently fails |
| Employment status | 4 | Create, edit persistence, delete after reopening, required name |
| Job titles | 4 | Create with description, edit persistence, delete after reopening, required title |
| **Total** | **23** | Chromium UI tests |

PIM employee creation supports User Management test setup; it is not a standalone
automated PIM suite. Observing HTTP responses for synchronization and diagnostics
does not constitute an API testing suite.

## Manual work and planned coverage

The manual test workbooks contain **72 cases and 72 scenarios**, with unique
IDs and matching module/number keys. They cover PIM, Admin, Login, Leave, Time and
Attendance, and Recruitment. Historical manual statuses are separate from the
current automation results. See the [test cases](docs/test-scenarious/I_Zigelbaum_TestScenarioAndTestCases.xlsx)
and [scenarios](docs/test-scenarious/I_Zigelbaum_TestScenarios.xlsx).

Standalone PIM, Leave, Time and Recruitment automation are possible future work;
they are not implemented here. The repository does not demonstrate automated SQL,
Jira/Xray integration, AI testing, comprehensive boundary coverage or a browser matrix.

## Architecture

```text
tests/login + tests/admin   Business scenarios and assertions
          |
fixtures/test-fixtures.ts   Typed page objects, login, resource cleanup, HTTP diagnostics
          |
pages/                     OrangeHRM interactions and field/record checks
utils/                     Exact/scoped locators, synchronized search, generated data, environment
scripts/                   Fresh demonstration runs and Allure generation
```

Tests register owned records before creation. Fixture teardown attempts cleanup
in reverse order, deleting users before employees, even after assertion failures.
Cleanup checks exact records after reopening/searching, attaches its outcomes and
fails visibly if cleanup fails. It cannot guarantee cleanup after process termination
or an unavailable application.

Locators use roles, exact values and labelled field containers. CSS remains where
OrangeHRM lacks associated labels or uses buttons with `role="none"`. Edit tests wait
for the existing value to load before filling, then reopen to check persistence.

## Run locally

Use Node.js 22 or later. The pipeline selects Node 22. Install the locked dependencies:

```bash
npm ci
npx playwright install chromium
npm run typecheck
npm run format:check
npx playwright test --list
npm run test:demo
```

The public demo is the default target. `.env.example` contains only its public demo
account. Copy it to an ignored `.env` for local configuration. For another target,
set `BASE_URL`, `ADMIN_USERNAME` and `ADMIN_PASSWORD`; credentials are required and
are not supplied by the demo fallback. Keep private passwords in secret variables.

`npm run test:demo` creates a timestamped `artifacts/baseline-*` directory and records
the Git commit, dirty-worktree flag, execution settings and exact report statistics.
It uses Chromium, one worker and zero retries. A focused run can pass Playwright filters:

```bash
npm run test:demo -- tests/login/login.spec.ts
```

The configuration uses a 60-second test timeout, 15-second action timeout and
10-second assertion timeout. Retries are disabled. The HTML report uses `open: 'never'`.
No global timeout was increased to mask the department failure.

## Reports and evidence

Each run contains Playwright HTML, JSON and JUnit reports, raw Allure results, and
failure traces/screenshots/videos. Business steps and cleanup outcomes appear in
reports; Allure includes browser, Node, commit and target metadata centrally.

For the recorded baseline:

```bash
npx playwright show-report artifacts/baseline-2026-09-29T14-09-27-059Z/playwright-report
npm run allure:report -- artifacts/baseline-2026-09-29T14-09-27-059Z
npm run allure:open -- artifacts/baseline-2026-09-29T14-09-27-059Z/allure-report
```

For a new run, substitute its printed directory. `npm run allure:report` with no
argument selects the latest demonstration run. Generated evidence is ignored by
Git and available locally or as a CI artifact; a fresh clone does not contain it.

## Azure DevOps

The [pipeline](azure-pipelines.yml) installs Node 22,
locked dependencies and Chromium, type-checks, and runs one worker with no retries.
It maps environment variables, publishes JUnit through `PublishTestResults@2`,
generates Allure when results exist and publishes the `qa-evidence` directory with
HTML, raw results and failure evidence, including after test failures.

Configure `BASE_URL` and `ADMIN_USERNAME` in Azure and mark `ADMIN_PASSWORD` as a
secret variable. These variables are explicitly referenced by the YAML and must be
configured before running it. No Azure build was launched or verified during this
local baseline; the YAML is implementation evidence, not proof of a successful CI run.

## Defect investigation and limitations

[Department edit investigation](docs/bug-reports/department-edit-investigation.md):
creation accepts empty Unit Id and Description, returns them as null, and the edit
request sends null values that the API rejects with 422. The new name reaches the
API correctly. The failing test remains enabled; exact backend implementation
responsibility is not established without server source/logs.

The shared demo can reset or be changed by other users. Generated names reduce
collisions but do not isolate the environment. These results are one dated baseline,
not a reliability trend. Configuration-list cleanup operates on the rendered list;
it has not been validated against large, paginated installations.

## Author

**Igor Zigelbaum** — QA Engineer | Software Tester | Test Automation

- GitHub: [IgorZig](https://github.com/IgorZig)
- LinkedIn: [Igor Zigelbaum](https://www.linkedin.com/in/igorzigelbaum)
