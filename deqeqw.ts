import {
  expect,
  type Locator,
  type Page,
} from "@playwright/test";

import {
  generateFutureBookingDates,
  type BookingDates,
} from "../utils/date-helper";

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class BookingPage {
  readonly page: Page;

  readonly bookingSectionButton: Locator;
  readonly checkInInput: Locator;
  readonly checkOutInput: Locator;
  readonly checkAvailabilityButton: Locator;
  readonly availableRoomBookNowButtons: Locator;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;

  readonly reserveNowButton: Locator;
  readonly validationMessages: Locator;
  readonly bookingConfirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.bookingSectionButton = page
      .locator('a[href="#booking"]')
      .first();

    this.checkInInput = page.locator(
      'input[name="checkin"]',
    );

    this.checkOutInput = page.locator(
      'input[name="checkout"]',
    );

    this.checkAvailabilityButton = page.getByRole(
      "button",
      {
        name: "Check Availability",
        exact: true,
      },
    );

    this.availableRoomBookNowButtons = page.locator(
      'a[href^="/reservation/"]',
    );

    this.firstNameInput = page.locator(
      'input[name="firstname"]',
    );

    this.lastNameInput = page.locator(
      'input[name="lastname"]',
    );

    this.emailInput = page.locator(
      'input[name="email"]',
    );

    this.phoneInput = page.locator(
      'input[name="phone"]',
    );

    this.reserveNowButton = page.getByRole("button", {
      name: "Reserve Now",
      exact: true,
    });

    this.validationMessages = page.locator(
      ".alert.alert-danger li",
    );

    this.bookingConfirmationMessage = page.getByText(
      /booking confirmed|booking successful/i,
    );
  }

  async goto(): Promise<void> {
    await this.page.goto(
      "https://automationintesting.online/",
    );

    await expect(this.page).toHaveTitle(
      /Restful-booker-platform demo/i,
    );
  }

  async clickBookingSection(): Promise<void> {
    await expect(
      this.bookingSectionButton,
    ).toBeVisible();

    await this.bookingSectionButton.click();

    await expect(
      this.checkAvailabilityButton,
    ).toBeVisible();
  }

  async selectDates(
    dates: BookingDates,
  ): Promise<void> {
    await expect(this.checkInInput).toBeVisible();
    await expect(this.checkOutInput).toBeVisible();

    await this.checkInInput.fill(dates.checkIn);
    await this.checkOutInput.fill(dates.checkOut);
  }

  async clickCheckAvailability(): Promise<void> {
    await expect(
      this.checkAvailabilityButton,
    ).toBeVisible();

    await this.checkAvailabilityButton.click();
  }

  async findAvailableRoom(
    maxAttempts = 10,
  ): Promise<BookingDates> {
    for (
      let attempt = 1;
      attempt <= maxAttempts;
      attempt++
    ) {
      const dates = generateFutureBookingDates();

      console.log(
        `Attempt ${attempt}: checking ${dates.checkIn} to ${dates.checkOut}`,
      );

      await this.selectDates(dates);
      await this.clickCheckAvailability();

      await expect(
        this.availableRoomBookNowButtons.first(),
      )
        .toBeVisible({
          timeout: 5_000,
        })
        .catch(() => undefined);

      const roomCount =
        await this.availableRoomBookNowButtons.count();

      if (roomCount > 0) {
        const firstAvailableRoom =
          this.availableRoomBookNowButtons.first();

        const isVisible =
          await firstAvailableRoom.isVisible();

        if (isVisible) {
          await firstAvailableRoom.click();

          await expect(
            this.reserveNowButton,
          ).toBeVisible();

          return dates;
        }
      }

      console.log(
        "No available room found. Generating new dates.",
      );
    }

    throw new Error(
      `No available room was found after ${maxAttempts} attempts.`,
    );
  }

  async completeBookingForm(
    data: BookingData,
  ): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  async submitEmptyBookingForm(): Promise<void> {
    await expect(this.firstNameInput).toBeEmpty();
    await expect(this.lastNameInput).toBeEmpty();
    await expect(this.emailInput).toBeEmpty();
    await expect(this.phoneInput).toBeEmpty();

    await expect(this.reserveNowButton).toBeVisible();
    await this.reserveNowButton.click();
  }

  async expectRequiredFieldValidation(): Promise<void> {
    await expect(this.validationMessages).toBeVisible();

    await expect(
      this.validationMessages.filter({
        hasText: /firstname|first name/i,
      }),
    ).toBeVisible();

    await expect(
      this.validationMessages.filter({
        hasText: /lastname|last name/i,
      }),
    ).toBeVisible();

    await expect(
      this.validationMessages.filter({
        hasText: /email/i,
      }),
    ).toBeVisible();

    await expect(
      this.validationMessages.filter({
        hasText: /phone/i,
      }),
    ).toBeVisible();
  }
}