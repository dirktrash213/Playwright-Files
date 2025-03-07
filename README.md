# Playwright Testing Project

This project contains automated tests for various web applications using Playwright. The tests cover functionalities such as file uploads, sortable lists, range sliders, and more.

## Table of Contents

- [Project Description](#project-description)
- [Setup Instructions](#setup-instructions)
- [Running Tests](#running-tests)
- [Configuration](#configuration)
- [Custom Reporter](#custom-reporter)
- [Contributing](#contributing)
- [License](#license)

## Project Description

This project is designed to automate the testing of web applications using Playwright. The tests are written in TypeScript and cover a range of functionalities including:

- Uploading files
- Sorting lists
- Interacting with range sliders
- Handling iframes

## Setup Instructions

To set up the project locally, follow these steps:

1. **Clone the repository:**
  
 ```sh
 git clone https://github.com/your-username/Playwright-Files.git
 cd Playwright-Files
 ```

2. **Install dependencies:**

- Download and Install [NodeJS](https://nodejs.org/en/download)

- Run
```bash
npm install playwright
```

3. **Ensure the required files are present:**

Make sure the Sample.png and Sample2.png files are present in the root directory of the project. These can be any png images.

## Running Tests
To run the tests, use the following commands:

**Run all tests:**
```bash
npx playwright test
```
**Run tests in a specific browser:**

*Chromium:*
```bash
npx playwright test --project=chromium
```
*Firefox:*
```bash
npx playwright test --project=firefox
```
*WebKit:*
```bash
npx playwright test --project=webkit
```
**Run a specific test file:**
```bash
npx playwright test tests/QA_playground/uploadFile.spec.ts
```
**Run tests with a custom reporter:**

The project includes a custom reporter that logs the start and end of each test. To use the custom reporter, ensure it is uncommented in the playwright.config.ts file:
```bash
reporter: [['html'], ['./custom-reporter']],
```
## Configuration
The Playwright configuration is defined in the playwright.config.ts file. Key settings include:

Test Directory: tests
Parallel Execution: fullyParallel: false
Retries: retries: process.env.CI ? 2 : 0
Headless Mode: headless: true
Trace Collection: trace: 'on-first-retry'
Projects: Configured for Chromium, Firefox, and WebKit

## Custom Reporter
The project includes a custom reporter (custom-reporter.ts) that logs the start and end of each test. The reporter is configured to log messages to the console.

**Example Custom Reporter**
```bash
import { Reporter, TestCase, TestResult } from '@playwright/test/reporter';

class CustomReporter implements Reporter {
  onTestBegin(test: TestCase) {
    console.log(`Starting test: ${test.title}`);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status === 'passed' ? 'PASSED' : 'FAILED';
    console.log(`Test ${test.title} ${status}`);
    console.log(`========================================`);
  }

  onEnd() {
    console.log('All tests finished');
  }
}

export default CustomReporter;
```
## Contributing
Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -m 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Create a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.


   
