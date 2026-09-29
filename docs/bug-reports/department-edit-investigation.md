# Department edit: blank optional fields rejected on save

Investigated 29 September 2026 against the public OrangeHRM demo, Chromium.
Status: reproduced; application change required. This was called BUG-001 in the
earlier repository audit. The owner's current BUG-001 Word document concerns
profile-photo deletion, so this investigation uses a descriptive identifier.

## Reproduction

1. Log in as the demo administrator and open Admin > Organization > Structure.
2. Enable Edit, add a uniquely named department, and leave Unit Id and Description blank.
3. Save successfully, then open the new department's own edit action.
4. Wait until the existing name has loaded, change only its name and save.

Expected: the renamed department is saved and remains renamed after reopening
the structure. Both optional fields were accepted as blank during creation.

Observed: the save request returns HTTP 422; the edit dialog remains open. The
automated persistence test fails. The test does not skip, expect failure, increase
timeouts, or populate unrelated optional fields to conceal this behaviour.

## Evidence and established failure mechanism

The targeted run `artifacts/baseline-2026-09-29T14-05-06-274Z` recorded:

```text
POST /web/index.php/api/v2/admin/subunits -> 200
request:  unitId="", description="", name=<generated name>, parentId=1
response: unitId=null, description=null, name=<generated name>

PUT /web/index.php/api/v2/admin/subunits/17 -> 422
request:  unitId=null, description=null, name=<generated name> Updated
response: {"error":{"status":"422","message":"Invalid Parameter",
          "data":{"invalidParamKeys":["unitId","description"]}}}
```

The trace proves the correct new name reached the API and identifies the two
rejected parameters. This rules out the name selector and edit-form hydration
race as the cause of this observed failure. It establishes an inconsistency
between the values returned after creation and accepted by the update endpoint.
The precise frontend/backend implementation responsible is not established:
application source and server logs were not available. No claim is made that all
department editing is broken or that shared-demo interference is impossible.

The repository fixes separately correct the structure route, scope edit/delete
actions to the exact department, set the Edit toggle only when necessary, and wait
for the old name to load. Save now asserts the API response immediately, producing
the 422 error rather than waiting for the dialog to disappear.

## Retest and cleanup

The targeted retest reproduced the 422 after those locator/synchronization fixes.
Its cleanup attachment verifies that both the original and replacement names are
absent afterward. The final full-run outcome is recorded in
[the execution baseline](../execution-baseline.md).

Failure evidence is in each run's `test-results/admin-departments-Departme-0c0a2-ersist-an-edited-department-chromium/`
directory: `trace.zip`, `test-failed-1.png`, video and `error-context.md`. The HTML
report includes the HTTP errors and cleanup attachments. These generated artifacts
are ignored by Git; preserve the run directory when sharing evidence.

Suggested application follow-up: align optional-field normalization and update
validation, then rerun the unchanged name-only edit and verify persistence. That
application-side change has not been made in this test repository.
