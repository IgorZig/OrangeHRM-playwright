OrangeHRM Playwright Test Automation

QA automation project for the OrangeHRM web application using Playwright + TypeScript.

The project combines manual test design with automated UI testing and CI/CD execution through Azure DevOps.

Project Overview

- 72 functional test cases designed for OrangeHRM
- Selected test cases automated using Playwright
- Tests written in TypeScript
- Page Object Model (POM) for page interactions
- Reusable Playwright fixtures
- Dynamic test data generation
- GitHub for source control
- Azure DevOps for CI/CD test execution
- Allure for test reporting

Current Automated Coverage

The current Playwright automation covers selected OrangeHRM functionality:

Login

- Valid login
- Invalid username
- Invalid password
- Empty username
- Empty password
- Empty username and password
- Logout

Admin

- User Management
- Departments
- Employment Status
- Job Titles

The automated test suite is being expanded progressively.

Technology Stack

Technology| Purpose
Playwright| UI test automation
TypeScript| Test development
Node.js| Runtime
Page Object Model| Test structure
Playwright Fixtures| Reusable test setup
GitHub| Source control
Azure DevOps| CI/CD
Allure| Test reporting

CI/CD

Playwright tests are executed through an Azure DevOps pipeline.

GitHub
   ↓
Azure DevOps
   ↓
Playwright
   ↓
Test Execution
   ↓
Allure Report

Project Structure

tests/
├── admin/
│   ├── departments.spec.ts
│   ├── employment-status.spec.ts
│   ├── job-titles.spec.ts
│   └── users.spec.ts
│
├── login/

pages/
fixtures/
utils/

playwright.config.ts
package.json
azure-pipelines.yml

playwright.config.ts
package.json
azure-pipelines.yml

Run Tests Locally

Install dependencies:

npm install

Install Playwright browsers:

npx playwright install

Run tests:

npx playwright test

Open the Playwright HTML report:

npx playwright show-report

Project Goal

Demonstrate practical QA automation skills using Playwright, TypeScript, GitHub, Azure DevOps CI/CD and Allure reporting.
