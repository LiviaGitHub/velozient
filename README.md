# QA Automation Challenge – Public Booking Flow

This repository contains my solution for the Velozient QA Automation Challenge.

The project validates the public booking flow using Playwright and TypeScript. It includes manual test cases, automated tests, API testing, bug reports, and documentation.

## Project Structure

```
├── pages/
│   └── BookingPage.ts
├── tests/
│   ├── api/
│   │   └── create-booking.spec.ts
│   └── ui/
│       └── book/
│           └── booking-validation.spec.ts
├── utils/
│   └── date-helper.ts
├── TEST_CASES.md
├── BUG_REPORTS.md
├── playwright.config.ts
└── README.md
```

## Installation

Clone the repository:

```bash
git clone git@github.com:LiviaGitHub/velozient.git
cd velozient
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
