# Velozient – booking form Test Cases

## Objective

Create test cases for Booking form.

---------------------------------------------------------------------------------------------------------------------------------------

# TC-001 - Successfully Book a Future Room

## Objective

Verify that a user can successfully book an available room by selecting future dates, checking availability, choosing a room, completing the reservation form, and submitting the booking.

## Preconditions

- The application is available at https://automationintesting.online/.
- At least one room is available for the selected future dates.
- The user has access to the booking page.

## Test Steps

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://automationintesting.online/`.  | The home page is displayed successfully. |
| 2 | Click **Book**. | The booking section is displayed. |
| 3 | Slect check-in and check-out dates. | Dates available to select |
| 4 | Click **Check Availability**. | The available rooms are displayed. |
| 5 | Select the first available room by clicking **Book now**. | The reservation page is displayed. |
| 7 | Click on Reserve now. | The reservation form is displayed.
| 6 | Enter a valid First Name. | The First Name field is populated. |
| 8 | Enter a valid Last Name. | The Last Name field is populated. |
| 9 | Enter a valid Email Address. | The Email field is populated. |
| 10 | Enter a valid Phone Number. | The Phone field is populated. |
| 11 | Click **Reserve Now**. | The booking request is submitted. |
| 12 | Verify the booking confirmation message. | A successful booking confirmation is displayed. |

## Expected Result

The user successfully books an available room for future dates, and a confirmation message is displayed after the reservation is completed.

------------------------------------------------------------------------------------------------------------------------------------

# TC-002 – User Cannot Complete a Booking with an Invalid Email Address

## Objective

Verify that the system prevents a user from completing a booking when an invalid email address is provided.

## Preconditions

- The application is available at https://automationintesting.online/.
- At least one room is available for the selected future dates.
- The user has navigated to the reservation form.

## Test Steps

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://automationintesting.online/`.  | The home page is displayed successfully. |
| 2 | Click **Book**. | The booking section is displayed. |
| 3 | Slect check-in and check-out dates. | Dates available to select |
| 4 | Click **Check Availability**. | The available rooms are displayed. |
| 5 | Select the first available room by clicking **Book now**. | The reservation page is displayed. |
| 6 | Click on Reserve now. | The reservation form is displayed.
| 7 | Enter a valid First Name. | The First Name field is populated. |
| 8 | Enter a valid Last Name. | The Last Name field is populated. |
| 9 | Enter an invalid email address (e.g., `invalid-email`). | The invalid email is accepted into the field. |
| 10 | Enter a valid Phone Number. | The Phone Number field is populated. |
| 11 | Click **Reserve Now**. | The booking request is submitted for validation. |
| 12 | Verify the email validation message is displayed. | A validation message stating "must be a well-formed email address" must be displayed. |
| 13 | Verify the booking is not created. | The user remains on the reservation form and no booking confirmation is displayed. |

## Expected Result

The system prevents the booking from being completed, displays a clear validation message indicating that the email address is invalid, and does not create the reservation.

---------------------------------------------------------------------------------------------------

# TC-003 – User Cannot Book a Room with Check-out Equal to Check-in

## Objective

Verify that the system prevents a user from booking a room when the check-out date is the same as the check-in date.

## Preconditions

- The application is available at https://automationintesting.online/.
- The user has access to the booking page.

## Test Steps

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://automationintesting.online/`. | The home page is displayed successfully. |
| 2 | Click **Book**. | The booking section is displayed. |
| 3 | Enter the same valid future date for both **Check-in** and **Check-out**. | Both date fields are populated with the same date. |
| 4 | Observe the **Check Availability** button. | The **Check Availability** button must be disabled because the selected date range is invalid. |
| 5 | Attempt to click **Check Availability**. | The button must remain disabled, and the booking flow must not continue. |

## Expected Result

- The **Check Availability** button must be disabled when the check-in and check-out dates are the same.
- The user must not be able to continue to room selection.
- No availability search or booking request must be submitted.

---------------------------------------------------------------------------------------------------

# TC-004 – User Cannot Book a Room When Check-out Is Before Check-in

## Objective

Verify that the system prevents a user from booking a room when the check-out date is earlier than the check-in date.

## Preconditions

- The application is available at https://automationintesting.online/.
- The user has access to the booking page.

## Test Steps

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://automationintesting.online/`. | The home page is displayed successfully. |
| 2 | Click **Book**. | The booking section is displayed. |
| 3 | Enter a valid future date as the **Check-in** date. | The Check-in field is populated successfully. |
| 4 | Enter a **Check-out** date that is earlier than the **Check-in** date. | The Check-out field is populated successfully. |
| 5 | Click **Check Availability**. | The system validates the selected dates. |
| 6 | Attempt to continue with the booking process. | The user is prevented from proceeding. |
| 7 | Verify the validation message. | A clear validation message indicates that the check-out date must be later than the check-in date. |
| 8 | Verify no rooms are available for selection and the reservation form cannot be accessed. | The booking flow is blocked until valid dates are entered. |

## Expected Result

The system does not allow the user to proceed when the **Check-out** date is earlier than the **Check-in** date. A clear validation message is displayed, the booking flow is blocked, and no reservation can be created until valid dates are provided.

---------------------------------------------------------------------------------------------------

# TC-005 – User Cannot Book a Room Using Past Dates

## Objective

Verify that the system prevents a user from booking a room using check-in and check-out dates in the past.

## Preconditions

- The application is available at https://automationintesting.online/.
- The user has access to the booking page.

## Test Steps

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://automationintesting.online/`. | The home page is displayed successfully. |
| 2 | Click **Book**. | The booking section is displayed. |
| 3 | Enter a past date as the **Check-in** date. | The Check-in field is populated. |
| 4 | Enter a past date later than the selected **Check-in** date as the **Check-out** date. | The Check-out field is populated. |
| 5 | Click **Check Availability**. | The system validates the selected dates. |
| 6 | Attempt to continue with the booking process. | The user is prevented from proceeding. |
| 7 | Verify the validation message. | A clear validation message indicates that past dates are not allowed. |
| 8 | Verify that no rooms are available for selection and the reservation form cannot be accessed. | The booking flow is blocked until valid future dates are entered. |

## Expected Result

The system does not allow the user to search for or book a room using past dates. A clear validation message is displayed informing the user that the selected dates must be in the future, and the booking process cannot continue until valid dates are entered.

---------------------------------------------------------------------------------------------------

# TC-006 – User Cannot Submit the Booking Form with All Fields Empty

## Objective

Verify that the system prevents a user from submitting the booking form when all required fields are left empty.

## Preconditions

- The application is available at https://automationintesting.online/.
- At least one room is available for the selected future dates.
- The user has navigated to the reservation form.

## Test Steps

| Step | Action | Expected Result |
|------|--------|-----------------|
| 1 | Navigate to `https://automationintesting.online/`. | The home page is displayed successfully. |
| 2 | Click **Book**. | The booking section is displayed. |
| 3 | Enter valid future check-in and check-out dates. | The dates are populated successfully. |
| 4 | Click **Check Availability**. | Available rooms are displayed. |
| 5 | Select the first available room by clicking **Book now**. | The reservation form is displayed. |
| 6 | Leave all form fields (First Name, Last Name, Email, and Phone) empty. | All required fields remain blank. |
| 7 | Click **Reserve Now**. | The booking request is submitted for validation. |
| 8 | Verify the validation messages. | Validation messages are displayed for all required fields. |
| 9 | Verify the booking is not created. | The user remains on the reservation form and no booking confirmation is displayed. |

## Expected Result

The system prevents the booking from being submitted, displays validation messages for all required fields, and does not create the reservation.

---------------------------------------------------------------------------------------------------

## TC-008 – User cannot complete a booking with an invalid email address

### Objective
Verify that the booking form rejects an invalid email address.

### Preconditions
- An available room has been selected.
- The booking form is displayed.

### Test Data
- First Name: Livia
- Last Name: Bonifacio
- Email: `livia.com`
- Phone: `07123456789`

### Steps
1. Fill in all fields with valid data except the email.
2. Enter `livia.com` in the Email field.
3. Click **Reserve Now**.

### Expected Result
- The booking must not be created.
- The message **"must be a well-formed email address"** must be displayed.
- The user must remain on the booking form.

---------------------------------------------------------------------------------------------------