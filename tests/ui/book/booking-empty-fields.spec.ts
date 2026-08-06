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

      await bookingPage.clickReserveNow();
      await bookingPage.clickReserveNow();

      await bookingPage.expectRequiredFieldValidation();
    },
  );

  test("TC-002 - User cannot complete a booking with an invalid email address", async ({
    page,
  }) => {
    const bookingPage = new BookingPage(page);

      await bookingPage.clickBookingSection();
      await bookingPage.clickCheckAvailability();
      await bookingPage.selectFirstAvailableRoom();

      await expect(page).toHaveURL(
        /\/reservation\/\d+\?checkin=.*&checkout=.*/,
      );

            await bookingPage.clickReserveNow();

    await bookingPage.completeBookingForm({
      firstName: "Livia",
      lastName: "Bonifacio",
      email: "invalid-email",
      phone: "07123456789",
    });

    await bookingPage.clickReserveNow();

    await bookingPage.expectInvalidEmailValidation();

    await expect(
      bookingPage.bookingConfirmationMessage,
    ).not.toBeVisible();
  });
});