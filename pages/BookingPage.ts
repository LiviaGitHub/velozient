import {
  expect,
  type Locator,
  type Page,
} from '@playwright/test';

export class BookingPage {
  readonly page: Page;
  readonly checkInInput: Locator;
  readonly checkOutInput: Locator;
  readonly checkAvailabilityButton: Locator;
  readonly availableRoomCards: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkInInput = page.getByLabel('Check In');
    this.checkOutInput = page.getByLabel('Check Out');

    this.checkAvailabilityButton = page.getByRole(
      'button',
      {
        name: /check availability/i,
      },
    );

    this.availableRoomCards = page.locator('.room-card');
  }

  async open(): Promise<void> {
    await this.page.goto('/');

    await expect(
      this.checkAvailabilityButton,
    ).toBeVisible();
  }

  async searchAvailableRoom(): Promise<{
    checkIn: Date;
    checkOut: Date;
  }> {
    /*
     * Tenta diferentes períodos futuros.
     * Isso reduz o risco de escolher datas já reservadas.
     */
    for (let attempt = 0; attempt < 6; attempt++) {
      const checkIn = this.createFutureDate(
        60 + attempt * 10,
      );

      const checkOut = this.createFutureDate(
        63 + attempt * 10,
      );

      await this.checkInInput.fill(
        this.formatDateForInput(checkIn),
      );

      await this.checkOutInput.fill(
        this.formatDateForInput(checkOut),
      );

      await this.checkAvailabilityButton.click();

      const availableRoom = this.availableRoomCards
        .getByRole('link', {
          name: /book now/i,
        })
        .first();

      const roomIsAvailable = await availableRoom
        .isVisible({
          timeout: 5_000,
        })
        .catch(() => false);

      if (roomIsAvailable) {
        await availableRoom.click();

        return {
          checkIn,
          checkOut,
        };
      }
    }

    throw new Error(
      'No available room was found for the future date ranges tested.',
    );
  }

  async completeBooking(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
  ): Promise<void> {
    const openReservationButton = this.page.getByRole(
      'button',
      {
        name: /reserve now/i,
      },
    );

    await expect(openReservationButton).toBeVisible();

    await openReservationButton.click();

    const bookingForm = this.page.locator(
      '.booking-card form',
    );

    await expect(bookingForm).toBeVisible();

    await bookingForm
      .getByPlaceholder(/first.*name/i)
      .fill(firstName);

    await bookingForm
      .getByPlaceholder(/last.*name/i)
      .fill(lastName);

    await bookingForm
      .getByPlaceholder(/email/i)
      .fill(email);

    await bookingForm.getByLabel(/phone/i).fill(phone);
  }

  getSubmitBookingButton(): Locator {
    return this.page
      .locator('.booking-card form')
      .getByRole('button', {
        name: /reserve now/i,
      });
  }

  async expectBookingConfirmed(
    checkIn: Date,
    checkOut: Date,
  ): Promise<void> {
    await expect(
      this.page.getByRole('heading', {
        name: /booking confirmed/i,
      }),
    ).toBeVisible();

    const expectedDates = `${this.formatDateForConfirmation(
      checkIn,
    )} - ${this.formatDateForConfirmation(checkOut)}`;

    await expect(
      this.page.getByText(expectedDates, {
        exact: true,
      }),
    ).toBeVisible();
  }

  private createFutureDate(daysFromToday: number): Date {
    const date = new Date();

    /*
     * Setting the time to noon helps prevent unexpected
     * date changes caused by time zone differences.
     */
    date.setHours(12, 0, 0, 0);

    date.setDate(date.getDate() + daysFromToday);

    return date;
  }

  private formatDateForInput(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(
      2,
      '0',
    );

    const day = String(date.getDate()).padStart(2, '0');

    return `${month}/${day}/${date.getFullYear()}`;
  }

  private formatDateForConfirmation(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(
      2,
      '0',
    );

    const day = String(date.getDate()).padStart(2, '0');

    return `${date.getFullYear()}-${month}-${day}`;
  }
}
