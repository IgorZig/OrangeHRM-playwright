# Department edit rejects blank optional fields

**Environment:** OrangeHRM public demo, Chromium

**Observed:** 29 September 2026

**Status:** Reproduced in the recorded test run

## Reproduction

1. Log in as an administrator and open Admin > Organization > Structure.
2. Enable Edit and add a uniquely named department, leaving Unit Id and Description blank.
3. Save, then open the new department's edit action.
4. Change only the department name and save.

**Expected:** The new name is saved and remains visible after reopening the structure.

**Actual:** The update returns HTTP 422, and the edit dialog remains open.

## Request and response evidence

```text
POST /web/index.php/api/v2/admin/subunits -> 200
request:  unitId="", description="", name=<test name>, parentId=1
response: unitId=null, description=null, name=<test name>

PUT /web/index.php/api/v2/admin/subunits/<id> -> 422
request:  unitId=null, description=null, name=<updated test name>
response: {"error":{"status":"422","message":"Invalid Parameter",
          "data":{"invalidParamKeys":["unitId","description"]}}}
```

The requested new name reaches the API correctly. Creation returns null values for
the blank optional fields, while the update rejects those values. Application source
or server logs are needed to determine which component should normalize them.

## Automated regression and cleanup

The [department edit test](../../tests/admin/departments.spec.ts) waits for the saved
name to load, submits the replacement and checks the save response. After a successful
update, it reopens the structure to verify persistence.

The recorded full run completed with 22 passed and 1 failed test; department editing
was the sole failure. Cleanup confirmed absence of both the original and replacement
names. Local reports contain the response assertion, HTTP diagnostics and failure trace.

## Suggested fix and retest

Align optional-field normalization with update validation. Retest the name-only edit
with blank Unit Id and Description, then reopen the structure and verify the saved name.
