# Automation Exercise - Shopping Cart & Registration Tests

## Project Overview
This project contains automated test cases for the take-home exercise. The automation covers key functionalities such as:

- **User Registration and Login**:
  - Successful user registration and login.
  - Negative test cases for invalid email, mismatched passwords, and duplicate users.
- **Search Functionality**:
  - Searching for items with valid and invalid inputs.
  - Validating case-insensitive searches.
- **Shopping Cart Operations**:
  - Adding items to the cart from different categories.
  - Validating cart count and item additions.
- **Error Handling**:
  - Validating error messages for empty search, invalid login details, and missing inputs.

The scripts are written using Playwright for end-to-end testing and include detailed test cases for each scenario.

## Features

### User Registration and Login
- Successful user registration and login.
- Negative scenarios such as:
  - Invalid email formats.
  - Mismatched passwords.
  - Duplicate user registration.

### Search Functionality
- Search with valid inputs.
- Handle invalid or empty inputs.
- Validate case-insensitive search functionality.

### Shopping Cart Operations
- Add items to the cart from various categories.
- Validate cart counts and additions.

### Error Handling
- Display appropriate error messages for invalid inputs.

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:

- **Node.js** (v14 or higher)
- **Git**

### Clone the Repository
Run the following commands to clone the repository and navigate to the project directory:
```bash
git clone [Insert Repository URL Here]
cd [repository-folder]
```

### Install Dependencies
Install all the required dependencies using:
```bash
npm install
```

## Running the Tests

### Run All Tests
Execute the following command to run all test cases:
```bash
npx playwright test
```

### Run Specific Test Files
To run a specific test file, use:
```bash
npx playwright test [test-file-name]
```
For example:
```bash
npx playwright test shopping.test.ts
```

### View Test Reports
Playwright generates an HTML report for test execution. To view the report, run:
```bash
npx playwright show-report
```

## Test Cases
All test cases are documented in the attached Excel file, which includes:

- **Test Case ID**
- **Description**
- **Steps**
- **Expected Results**
- **Priority**

The file provides both positive and negative scenarios for each use case.

## Project Structure
The project is structured as follows:
```
.
├── pages
│   ├── loginPage.ts            # Page Object for login functionality
│   ├── registrationPage.ts     # Page Object for registration functionality
│   └── shoppingPage.ts         # Page Object for shopping cart functionality
├── tests
│   ├── login.test.ts           # Tests for login functionality
│   ├── registration.test.ts    # Tests for registration functionality
│   └── shopping.test.ts        # Tests for shopping cart functionality
├── README.md                   # Instructions for setup and usage
├── package.json                # Node.js project file
├── playwright.config.ts        # Playwright configuration
└── test-cases.xlsx             # Document containing test case details
```

## Playwright Configuration
You can configure Playwright settings like:

- Browser type (Chromium, Firefox, WebKit).
- Base URL.
- Test timeout.
- Reporter settings.

These settings are available in the `playwright.config.ts` file. Update this file as needed for your environment.

## How to Run the Automation
1. Clone the repository and navigate to the project folder.
2. Install dependencies using `npm install`.
3. Run tests with `npx playwright test`.
4. View the HTML report using `npx playwright show-report`.
