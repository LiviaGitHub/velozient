# Bug Report - Generic Validation Message for Invalid Phone Number

## Bug ID

BUG-001

## Title

Validation message for an invalid phone number is generic and does not identify the affected field.

## Severity

Minor

## Priority

Low

## Environment

- URL: https://automationintesting.online/
- Browser: Chrome
- OS: macOS

## Preconditions

- The application is accessible.
- The user is on the reservation form.
- A room has been selected.

## Steps to Reproduce

1. Navigate to `https://automationintesting.online/`.
2. Select an available room.
3. Fill in the reservation form with valid values:
   - **First Name:** `qwe`
   - **Last Name:** `qwe`
   - **Email:** `qwe@dwf.com`
4. Enter an invalid phone number (e.g., `wqeqw`).
5. Click **Reserve Now**.

## Actual Result

The application displays the following generic validation message:

> **size must be between 11 and 21**

The message does not identify the affected field and exposes an internal validation constraint ("size"), making it unclear for end users which field contains the error.

## Expected Result

The application should display a clear, user-friendly validation message associated with the **Phone Number** field.

For example:

> **Phone number must contain between 11 and 21 characters.**

or

> **Please enter a valid phone number (11–21 characters).**

## Impact

Although the validation works correctly, the error message is generic, technical, and does not indicate which field is invalid. This may confuse users and negatively impact the user experience.

## Attachment

Screenshot showing the generic validation message displayed after entering an invalid phone number.

---