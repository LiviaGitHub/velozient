# QA Automation Challenge – Public Booking Flow

This repository contains my solution for the Velozient QA Automation Challenge.

The project validates the public booking flow of a Bed & Breakfast application using Playwright and TypeScript. It includes manual test cases, automated end-to-end tests, bug reports, and documentation.

## Project Structure

```
.
├── pages/                  # Page Objects
├── tests/
│   └── ui/                 # End-to-end tests
├── TEST_CASES.md           # Manual test cases
├── BUG_REPORT.md           # Bugs found during exploratory testing
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model (POM)

## Test Coverage

The automated tests cover the application's critical booking flow, including:

- Public booking page
- Dynamic date selection
- Room availability search
- Room selection
- Booking creation
- Booking confirmation
- API validation (Senior requirement)

The check-in and check-out dates are generated dynamically during execution, ensuring the tests remain stable regardless of when they are run.

## Project Design

The framework follows Playwright best practices:

- Page Object Model
- Readable test steps
- Dynamic locators
- Test isolation
- Clear assertions
- Reusable helper methods
- Maintainable structure

## Installation

Clone the repository:

```bash
git clone https://github.com/velozient/liviabonifacio-qa-automation.git
cd liviabonifacio-qa-automation
```

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
BASE_URL=https://automationintesting.online
```

## Running the Tests

Run all tests:

```bash
npm test
```

Run in headed mode:

```bash
npm run test:headed
```

Run with the Playwright UI:

```bash
npm run test:ui
```

Debug tests:

```bash
npm run test:debug
```

View the HTML report:

```bash
npm run report
```

## Documentation

This repository also includes:

- `TEST_CASES.md` — Manual test cases for the booking flow
- `BUG_REPORT.md` — Defects identified during exploratory testing

## AI Usage

AI was used to assist with:

- brainstorming edge cases
- improving test documentation
- refining Playwright code
- reviewing project structure

All generated suggestions were manually reviewed, validated, and adapted before being included in the final solution.

AI conversation transcripts are included in the `ai-transcripts` folder, as requested.

## Author

Livia Bonifácio
Senior QA Automation Engineer