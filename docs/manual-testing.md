# Manual test inventory

Read-only review on 29 September 2026. The owner-updated Excel files were preserved.

| Module | Case rows |
| --- | ---: |
| Personal Information Management | 13 |
| Admin | 20 |
| Login | 8 |
| Leave | 13 |
| Time and Attendance | 7 |
| Recruitment | 11 |
| **Total** | **72** |

[Detailed cases](test-scenarious/I_Zigelbaum_TestScenarioAndTestCases.xlsx) contain
72 unique case IDs. The [scenario inventory](test-scenarious/I_Zigelbaum_TestScenarios.xlsx)
contains 72 scenario rows. This supersedes the earlier audit's 71-case count.
Workbook execution statuses are historical manual records, not results of the
current automated run. The 23 automated tests are not a one-to-one mapping to
23 of these manual cases, so a coverage percentage would be misleading.

## Remaining review items

- ADM-TC-005 and ADM-TC-006 acknowledge that the Manager role needs requirement
  clarification, but their objectives, expected results and historical FAIL/BLOCKED
  statuses still assume that role exists. LOGIN-TC-001 also depends on this model.
  Confirm the requirement before presenting these as established product defects.
- TIME-TC-002 expects future attendance to be rejected. No supplied requirement
  establishes that restriction; its FAIL status alone does not establish a defect.
- PIM-TC-003, PIM-TC-004, ADM-TC-007 and LOGIN-TC-005/006/007 still use wording such
  as "appropriate error". Future revisions should name the field and observable
  validation outcome. They were not rewritten during this read-only review.
- ADM-TC-010 now describes an ESS session and a direct Admin URL access check.
  It remains manual coverage; it is not part of the automated suite.

The current Word defect reports use BUG-001 for profile-photo deletion, BUG-002
for the Manager role and BUG-003 for future attendance. The separate
[department investigation](bug-reports/department-edit-investigation.md) avoids
reusing those identifiers.
