# OrangeHRM Playwright Test Automation

QA automation project for the **OrangeHRM** web application using **Playwright and TypeScript**.

The project combines manual test design with automated UI testing and CI/CD execution through **Azure DevOps**.

## Project Overview

* **72 functional test cases** designed for OrangeHRM
* Selected test cases automated using **Playwright**
* Tests written in **TypeScript**
* **Page Object Model (POM)** for page interactions
* Reusable **Playwright fixtures**
* Dynamic test data generation
* **GitHub** for source control
* **Azure DevOps** for CI/CD test execution
* **Allure** for test reporting
* Playwright HTML reports for local test results

## Automated Test Coverage

The current Playwright automation covers selected OrangeHRM functionality.

### Login

* Valid login
* Invalid username
* Invalid password
* Empty username
* Empty password
* Empty username and password
* Logout

### Admin

#### User Management

* Add user
* User management scenarios

#### Departments

* Add department
* Edit department
* Delete department

#### Employment Status

* Add employment status
* Edit employment status
* Delete employment status

#### Job Titles

* Add job title
* Edit job title
* Delete job title

> Automated coverage is being expanded progressively from the manually designed test suite.

## Technology Stack

| Technology             | Purpose                              |
| ---------------------- | ------------------------------------ |
| Playwright             | UI test automation                   |
| TypeScript             | Test development                     |
| Node.js                | Runtime and package management       |
| Page Object Model      | Maintainable page interactions       |
| Playwright Fixtures    | Reusable test setup and dependencies |
| GitHub                 | Source control and project hosting   |
| Azure DevOps           | CI/CD test execution                 |
| Allure                 | Test reporting                       |
| Playwright HTML Report | Local test reporting                 |

## Test Automation Architecture

The project follows a Page Object Model structure to separate test logic from page interactions.

```text
tests
   │
   ├── login
   └── admin
        ├── users
        ├── departments
        ├── employment-status
        └── job-titles

pages
   └── Page Object classes

fixtures
   └── Reusable Playwright test fixtures

utils
   └── Test utilities and dynamic test data

test-data
   └── Test data files
```

This structure helps keep test cases readable while making page interactions and common setup reusable.

## Project Structure

```text
OrangeHRM-playwright/
│
├── .github/
│   └── workflows/
│
├── fixtures/
│   └── Test fixtures
│
├── pages/
│   └── Page Object classes
│
├── test-data/
│   └── Test data
│
├── tests/
│   ├── admin/
│   │   ├── departments.spec.ts
│   │   ├── employment-status.spec.ts
│   │   ├── job-titles.spec.ts
│   │   └── users.spec.ts
│   │
│   └── login/
│
├── utils/
│   └── Test utilities
│
├── .env.example
├── .gitignore
├── .prettierrc
├── azure-pipelines.yml
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## CI/CD

The project uses **Azure DevOps** to execute the Playwright test suite.

The current workflow is:

```text
GitHub
   ↓
Azure DevOps Pipeline
   ↓
Install dependencies
   ↓
Run Playwright tests
   ↓
Test results / reports
```

The Azure DevOps pipeline is defined in:

```text
azure-pipelines.yml
```

This demonstrates integration between source control and automated test execution.

## Running Tests Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Install Playwright browsers

```bash
npx playwright install
```

### 3. Run the test suite

```bash
npx playwright test
```

### 4. Run tests in headed mode

```bash
npx playwright test --headed
```

### 5. Run a specific test file

```bash
npx playwright test tests/admin/departments.spec.ts
```

### 6. Open the Playwright HTML report

```bash
npx playwright show-report
```

## Test Reporting

The project uses Playwright reporting for local test execution and **Allure** for additional test reporting.

Test results can be reviewed after execution to investigate failed tests and understand the outcome of the automation suite.

## Test Data

The project uses dynamic test data for scenarios where unique values are required.

For example, generated values can be used when creating entities such as departments or employment statuses. This reduces conflicts between repeated test executions.

Environment-specific configuration is kept outside the source code using environment variables.

An example configuration is provided in:

```text
.env.example
```

## Quality Approach

The project demonstrates a combination of manual and automated testing practices:

* Functional test design
* Positive test scenarios
* Negative test scenarios
* Boundary and edge-case considerations
* UI automation
* Page Object Model
* Reusable fixtures
* Dynamic test data
* Test reporting
* CI/CD execution

The manual test suite provides broader functional coverage, while Playwright automation focuses on selected high-value scenarios.

## Project Goal

The goal of this project is to demonstrate practical QA automation skills using a realistic web application.

It demonstrates experience with:

* **Playwright**
* **TypeScript**
* **Page Object Model**
* **Test fixtures**
* **Test data management**
* **GitHub**
* **Azure DevOps CI/CD**
* **Automated test reporting**

## Author

**Igor Zigelbaum**

QA Engineer | Software Tester | Test Automation

* GitHub: [IgorZig](https://github.com/IgorZig)
* LinkedIn: [Igor Zigelbaum](https://www.linkedin.com/in/igorzig/)


Project Goal

Demonstrate practical QA automation skills using Playwright, TypeScript, GitHub, Azure DevOps CI/CD and Allure reporting.
