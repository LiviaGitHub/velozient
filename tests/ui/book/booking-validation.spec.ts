import { expect, test } from "@playwright/test";
import { BookingPage } from "../../../pages/BookingPage";

test.describe("Booking form validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test(
    "TC-006 - User cannot submit the booking form with all fields empty",
    async ({ page }) => {
      const bookingPage = new BookingPage(page);

      await bookingPage.clickBookingSection();
      await bookingPage.clickCheckAvailability();
      await bookingPage.selectFirstAvailableRoom();

      await expect(page).toHaveURL(
        /\/reservation\/\d+\?checkin=.*&checkout=.*/,
      );

      await bookingPage.openReservationForm();
      await bookingPage.submitReservation();

      await bookingPage.expectRequiredFieldValidation();
    },
  );

  test(
    "TC-002 - User cannot complete a booking with an invalid email address",
    async ({ page }) => {
      const bookingPage = new BookingPage(page);
      const invalidEmail = "invalid-email";

      await bookingPage.clickBookingSection();
      await bookingPage.clickCheckAvailability();
      await bookingPage.selectFirstAvailableRoom();

      await expect(page).toHaveURL(
        /\/reservation\/\d+\?checkin=.*&checkout=.*/,
      );

      await bookingPage.openReservationForm();

      await bookingPage.completeBookingForm({
        firstName: "Livia",
        lastName: "Bonifacio",
        email: invalidEmail,
        phone: "07123456789",
      });

      await bookingPage.submitReservation();

      await bookingPage.expectInvalidEmailValidation(
        invalidEmail,
      );

      await expect(page).toHaveURL(
        /\/reservation\/\d+\?checkin=.*&checkout=.*/,
      );
    },
  );
});