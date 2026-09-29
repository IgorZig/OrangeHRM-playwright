# Local execution baseline — 29 September 2026

| Setting/result | Value |
| --- | --- |
| Discovered and executed | 23 tests, 5 spec files |
| Passed | 22 |
| Failed | 1 |
| Skipped / flaky | 0 / 0 |
| Playwright duration | 216484.398 ms (3m 36.484s) |
| Browser | Chromium, headless |
| Workers / retries | 1 / 0 |
| Playwright | 1.63.0 |
| Target | Public OrangeHRM demo |
| Base commit | `2cb18f61e2b05b5f9370b3b8ff402145dd0c92f5` |
| Working tree | Modified; the reapplied implementation is not committed |
| Runner started, UTC | 2026-09-29T14:09:27.125Z |
| Runner finished, UTC | 2026-09-29T14:13:04.096Z |
| Exit code | 1, reflecting the real failed test |

Command: `npm run test:demo`.
Run directory: `artifacts/baseline-2026-09-29T14-09-27-059Z`.
`execution.json` records runner metadata; `results.json` contains Playwright results.
TypeScript checking and Prettier checking passed before execution. Source files were
not changed during the full suite. Documentation was updated separately.

## Results by area

| Area | Passed | Failed |
| --- | ---: | ---: |
| Departments | 3 | 1 |
| Employment status | 4 | 0 |
| Job titles | 4 | 0 |
| User management | 4 | 0 |
| Login | 7 | 0 |

The sole failure is `Admin should persist an edited department`. Its save response
is HTTP 422 with `invalidParamKeys: ["unitId", "description"]`. See the
[investigation](bug-reports/department-edit-investigation.md) for request/response
evidence and the limits of the root-cause conclusion. No tests are skipped or marked
as expected failures. One baseline with a failure is not evidence of full-suite stability.

Twelve cleanup attachments cover eighteen resource/name checks (including original
and replacement names). All report absence after cleanup, including the failed
department test. This is observed teardown success, not a guarantee against abrupt
process termination or environment outages.

The user required-field test checks each field separately. After selecting ESS,
the demo reports `Required` for Password and `Passwords do not match` for the blank
Confirm Password. The assertion reflects that observed field-level behaviour rather
than incorrectly assuming every field uses the same message.

## Evidence produced

- `playwright-report/index.html`: full HTML report and attachments.
- `results.json` and `junit.xml`: machine-readable full-run outcomes.
- `allure-results/`: raw results, attachments and central environment metadata.
- `allure-report/`: generated successfully with the installed Allure CLI.
- `test-results/`: failure screenshot, video, trace and error context.
- `execution.json`: commit, dirty-worktree status, timestamps and exact totals.

These generated directories are Git-ignored. Use the commands in the README to view
them locally, or retain the whole run directory when sharing. No Azure execution or
artifact-publication result was verified in this session.

Earlier investigative runs are kept separate: the first full run had 10 passes and
13 failures while routes/synchronization were under investigation; the later five-test
targeted run had 3 passes and 2 failures. Neither is substituted for this final full
baseline. The targeted failures led to the explicit department response assertion and
the field-specific confirmation message correction.
