### Bug Report

**Title**
Validation message for invalid phone number is generic and does not identify the affected field.

**Type**
Bug – UI/UX Validation

**Priority**
Low

**Severity**
Minor

**Environment**
* Browser: Chrome
* Page: Room Booking

**Preconditions**

* Navigate to a room booking page.
* Select valid check-in and check-out dates.

**Steps to Reproduce**

1. Open any available room.
2. Fill in:

   * First Name: `qwe`
   * Last Name: `qwe`
   * Email: `qwe@dwf.com`
   * Phone: `wqeqw`
3. Click **Reserve Now**.

**Actual Result**
A generic validation message is displayed:

> `size must be between 11 and 21`

The message does not indicate which field is invalid and exposes an internal validation constraint ("size"), making it unclear for end users.

**Expected Result**
The application should display a user-friendly validation message clearly associated with the Phone field, for example:

> "Phone number must contain between 11 and 21 digits."

or

> "Please enter a valid phone number (11–21 characters)."

**Notes**
The validation itself appears to work correctly. The issue is that the error message is generic, technical, and not user-friendly, which may confuse users. This suggests the application is exposing the default backend validation message instead of a customized UI validation message.

___________________

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
The application allows the user to proceed through the booking flow with identical check-in and check-out dates. Instead of preventing the submission, the application navigates to an error page displaying:

> **"This page couldn't load. Reload to try again, or go back."**

## Expected Result
The application should validate the selected dates before allowing the user to continue.

If the **Check-out** date is equal to the **Check-in** date:
- The booking should not proceed.
- The user should remain on the booking page.
- A clear validation message should be displayed, such as:

> **Check-out date must be later than the check-in date.**

## Impact
Users are able to submit an invalid booking request, which leads to an application error instead of a user-friendly validation. This breaks the booking flow, creates a poor user experience, and indicates missing client-side and/or server-side validation for invalid booking dates.

## Attachment
Screenshot showing the application error page after submitting a booking with identical check-in and check-out dates.

___________________

