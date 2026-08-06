# Velozient – Booking Form Test Cases

## Objective

Create test cases for the Booking form.

---

# TC-001 – Successfully Book a Future Room

## Objective

Verify that a user can successfully book an available room.

## Preconditions

- The application is available at https://automationintesting.online/.
- At least one room is available for the selected dates.
- The booking page is accessible.

## Test Data

- Check-in: Future date
- Check-out: Future date
- First Name: Livia
- Last Name: Bonifacio
- Email: livia@example.com
- Phone: 07123456789

## Steps

1. Navigate to `https://automationintesting.online/`.
2. Click **Book**.
3. Select valid future check-in and check-out dates.
4. Click **Check Availability**.
5. Select the first available room by clicking **Book now**.
6. Click **Reserve Now**.
7. Complete the booking form with valid data.
8. Click **Reserve Now**.

## Expected Result

- The booking is successfully created.
- A booking confirmation message is displayed.

---

# TC-002 – User Cannot Complete a Booking with an Invalid Email Address

## Objective

Verify that the booking form rejects an invalid email address.

## Preconditions

- An available room has been selected.
- The booking form is displayed.

## Test Data

- First Name: Livia
- Last Name: Bonifacio
- Email: `invalid-email`
- Phone: 07123456789

## Steps

1. Fill in all fields with valid data except the email.
2. Enter `invalid-email` in the Email field.
3. Click **Reserve Now**.

## Expected Result

- The booking must not be created.
- The message **"must be a well-formed email address"** must be displayed.
- The user must remain on the booking form.

---

# TC-003 – User Cannot Book a Room with Check-out Equal to Check-in

## Objective

Verify that the system prevents bookings when the check-out date is equal to the check-in date.

## Preconditions

- The booking page is displayed.

## Test Data

- Check-in: 2026-09-10
- Check-out: 2026-09-10

## Steps

1. Enter the same date for **Check-in** and **Check-out**.
2. Click **Check Availability**.

## Expected Result

- The booking flow must not continue.
- The user must be informed that the check-out date must be later than the check-in date.

---

# TC-004 – User Cannot Book a Room When Check-out Is Before Check-in

## Objective

Verify that the system prevents bookings when the check-out date is earlier than the check-in date.

## Preconditions

- The booking page is displayed.

## Test Data

- Check-in: 2026-09-10
- Check-out: 2026-09-09

## Steps

1. Enter a valid future check-in date.
2. Enter a check-out date earlier than the check-in date.
3. Click **Check Availability**.

## Expected Result

- The booking flow must not continue.
- A validation message must indicate that the check-out date must be later than the check-in date.

---

# TC-005 – User Cannot Book a Room Using Past Dates

## Objective

Verify that the system prevents bookings using past dates.

## Preconditions

- The booking page is displayed.

## Test Data

- Check-in: Yesterday
- Check-out: Today

## Steps

1. Enter a past check-in date.
2. Enter a past check-out date.
3. Click **Check Availability**.

## Expected Result

- The booking flow must not continue.
- A validation message indicating that past dates are not allowed must be displayed.

---

# TC-006 – User Cannot Submit the Booking Form with All Fields Empty

## Objective

Verify that the booking form cannot be submitted when all required fields are empty.

## Preconditions

- An available room has been selected.
- The booking form is displayed.

## Test Data

- First Name: *(empty)*
- Last Name: *(empty)*
- Email: *(empty)*
- Phone: *(empty)*

## Steps

1. Leave all fields empty.
2. Click **Reserve Now**.

## Expected Result

- The booking must not be created.
- Validation messages must be displayed for all required fields.
- The user must remain on the booking form.

---

# TC-007 – User Cannot Complete a Booking with an Invalid Phone Number

## Objective

Verify that the booking form rejects an invalid phone number.

## Preconditions

- An available room has been selected.
- The booking form is displayed.

## Test Data

- First Name: Livia
- Last Name: Bonifacio
- Email: livia@example.com
- Phone: `12345`

## Steps

1. Fill in all required fields with valid data except the phone number.
2. Enter `12345` in the Phone field.
3. Click **Reserve Now**.

## Expected Result

- The booking must not be created.
- A validation message indicating that the phone number is invalid must be displayed.
- The user must remain on the booking form.

---

# TC-008 – User Cannot Complete a Booking with an Invalid Email Address

## Objective

Verify that the booking form rejects an invalid email address.

## Preconditions

- An available room has been selected.
- The booking form is displayed.

## Test Data

- First Name: Livia
- Last Name: Bonifacio
- Email: `livia.com`
- Phone: 07123456789

## Steps

1. Fill in all fields with valid data except the email.
2. Enter `livia.com` in the Email field.
3. Click **Reserve Now**.

## Expected Result

- The booking must not be created.
- The message **"must be a well-formed email address"** must be displayed.
- The user must remain on the booking form.