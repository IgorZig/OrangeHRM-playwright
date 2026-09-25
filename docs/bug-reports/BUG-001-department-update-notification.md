# Defect Report

## BUG-001 — Department edit changes are not saved

| Field | Details |
| --- | --- |
| **Defect ID** | BUG-001 |
| **Title/Summary** | Department edit changes are not saved |
| **Description** | When an Admin edits an existing department and changes the department name, the updated value is not saved after clicking **Save**. An error message is displayed. |
| **Steps to Reproduce** | 1. Log in to the OrangeHRM application as an Admin user.<br>2. Open **Admin**.<br>3. Navigate to **Organization → Departments**.<br>4. Select an existing department and choose **Edit**.<br>5. Change the department name.<br>6. Click **Save**.<br>7. Check the department record. |
| **Expected Result** | After the Admin clicks **Save**, the department name should be updated and the new value should be saved to the department record. |
| **Actual Result** | The changed department name is not saved. After clicking **Save**, an error message is displayed and the department record remains unchanged. |
| **Severity** | Major |
| **Priority** | High |
| **Environment** | Application: OrangeHRM Demo web application<br>Browser: Chromium (Playwright)<br>CI Environment: Azure DevOps hosted Ubuntu agent<br>App version: Not available |
