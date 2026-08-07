import { expect, test } from '@playwright/test';
import { BookingFormPage } from '../../../pages/BookingFormPage';
import { HomePage } from '../../../pages/HomePage';
import { ReservationPage } from '../../../pages/ReservationPage';

test.describe('Booking form validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('TC-006 - User cannot submit the booking form with all fields empty', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const reservationPage = new ReservationPage(page);
    const bookingFormPage = new BookingFormPage(page);

    await homePage.openBookingSection();
    await homePage.checkAvailability();

    await reservationPage.selectFirstAvailableRoom();

    await expect(page).toHaveURL(
      /\/reservation\/\d+\?checkin=.*&checkout=.*/,
    );

    await reservationPage.openReservationForm();
    await bookingFormPage.submit();

    await bookingFormPage.expectRequiredFieldValidation();
  });

  test('TC-002 - User cannot complete a booking with an invalid email address', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const reservationPage = new ReservationPage(page);
    const bookingFormPage = new BookingFormPage(page);

    const invalidEmail = 'invalid-email';

    await homePage.openBookingSection();
    await homePage.checkAvailability();

    await reservationPage.selectFirstAvailableRoom();

    await expect(page).toHaveURL(
      /\/reservation\/\d+\?checkin=.*&checkout=.*/,
    );

    await reservationPage.openReservationForm();

    await bookingFormPage.fillForm({
      firstName: 'Livia',
      lastName: 'Bonifacio',
      email: invalidEmail,
      phone: '07123456789',
    });

    await bookingFormPage.submit();

    await bookingFormPage.expectInvalidEmail(invalidEmail);

    await expect(page).toHaveURL(
      /\/reservation\/\d+\?checkin=.*&checkout=.*/,
    );
  });
});