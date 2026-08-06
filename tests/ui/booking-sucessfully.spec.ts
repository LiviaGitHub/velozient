import { expect, test } from '@playwright/test';
import { BookingPage } from '../../pages/BookingPage';

test.describe('Public Booking', () => {
  test('TC-001 - Guest can successfully create a booking', async ({
    page,
  }) => {
    const bookingPage = new BookingPage(page);

    await test.step('Open the public booking page', async () => {
      await bookingPage.open();
    });

    let checkIn: Date;
    let checkOut: Date;

    await test.step('Search for an available room using future dates', async () => {
      const dates = await bookingPage.searchAvailableRoom();

      checkIn = dates.checkIn;
      checkOut = dates.checkOut;
    });

    await test.step('Complete the booking form', async () => {
      await bookingPage.completeBooking(
        'Livia',
        'Bonifacio',
        `livia.booking.${Date.now()}@gmail.com`,
        '+5521998765432',
      );
    });

    await test.step('Create the booking and validate the API response', async () => {
      const bookingResponsePromise = page.waitForResponse(
        (response) => {
          const request = response.request();

          return (
            request.method() === 'POST' &&
            /booking|reservation/i.test(response.url())
          );
        },
      );

      const submitButton =
        bookingPage.getSubmitBookingButton();

      await expect(submitButton).toBeEnabled();

      await submitButton.click();

      const bookingResponse = await bookingResponsePromise;

      expect(
        [200, 201],
        `Expected booking API to return 200 or 201, but received ${bookingResponse.status()}`,
      ).toContain(bookingResponse.status());

      const responseBody = await bookingResponse.json();

      expect(
        responseBody,
        'Expected the booking API to return a response body',
      ).toBeDefined();
    });

    await test.step('Verify the booking confirmation', async () => {
      await bookingPage.expectBookingConfirmed(
        checkIn!,
        checkOut!,
      );
    });
  });
});
