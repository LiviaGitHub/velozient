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
   - **First Name:** `Test`
   - **Last Name:** `Test`
   - **Email:** `test@gmail.com`
4. Enter an invalid phone number (e.g., `test`).
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

------------------------------------------------------

# Bug Report - Invalid Booking Dates Result in Application Error Instead of Validation

## Bug ID

BUG-002

## Title

The system allows users to proceed with a booking when the check-in and check-out dates are the same, resulting in an application error page.

## Severity

High

## Priority

High

## Environment

- URL: https://automationintesting.online/
- Browser: Chrome
- OS: macOS

## Preconditions

- The application is accessible.
- The user is on the booking page.

## Steps to Reproduce

1. Navigate to `https://automationintesting.online/`.
2. Click **Book**.
3. Enter the same future date for both **Check-in** and **Check-out**.
4. Click **Check Availability**.
5. Select an available room.
6. Complete the reservation form with valid data.
7. Click **Reserve Now**.

## Actual Result

The application allows the user to proceed through the booking flow with identical check-in and check-out dates.

After submitting the reservation, the application displays an error page:

> **This page couldn't load. Reload to try again, or go back.**

## Expected Result

The application should prevent the user from proceeding when the **Check-in** and **Check-out** dates are the same.

A clear validation message should be displayed, for example:

> **Check-out date must be later than the check-in date.**

The user should remain on the booking page and no reservation should be submitted.

## Impact

The application accepts an invalid zero-night booking flow and only fails after submission, resulting in a broken user experience and indicating missing date validation.

## Attachment

Screenshot showing the application error page after submitting a booking with identical check-in and check-out dates.

------------------------------------------------------------------------------------------------------------