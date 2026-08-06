import {
  expect,
  type Locator,
  type Page,
} from "@playwright/test";

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class BookingPage {
  readonly page: Page;
  readonly bookNowButton: Locator;
  readonly checkInInput: Locator;
  readonly checkOutInput: Locator;
  readonly checkAvailabilityButton: Locator;
  readonly availableRoomBookNowButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly reserveNowButton: Locator;
  readonly validationMessages: Locator;
  readonly bookingConfirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.bookNowButton = page.locator('a[href="#booking"]');

    this.checkInInput = page.locator('input[name="checkin"]');
    this.checkOutInput = page.locator('input[name="checkout"]');

    this.checkAvailabilityButton = page.getByRole("button", {
      name: "Check Availability",
    });

    this.bookingConfirmationMessage = page.getByText(
  /booking confirmed|booking successful/i,
);

    this.availableRoomBookNowButton = page
      .locator('a[href^="/reservation/"]')
      .first();

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
  }

  async clickBookingSection(): Promise<void> {
    await expect(this.bookNowButton).toBeVisible();
    await this.bookNowButton.click();
  }

  async clickCheckAvailability(): Promise<void> {
    await expect(
      this.checkAvailabilityButton,
    ).toBeVisible();

    await this.checkAvailabilityButton.click();
  }

  async selectFirstAvailableRoom(): Promise<void> {
    await expect(
      this.availableRoomBookNowButton,
    ).toBeVisible();

    await this.availableRoomBookNowButton.click();
  }

  async clickReserveNow(): Promise<void> {
    await expect(this.reserveNowButton).toBeVisible();
    await this.reserveNowButton.click();
  }

  async completeBookingForm(
    data: BookingData,
  ): Promise<void> {
    await expect(this.firstNameInput).toBeVisible();

    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  async expectInvalidEmailValidation(): Promise<void> {
  const emailValidationMessage = this.page.getByText(
    /invalid email|email.*valid|must be a well-formed email address/i,
  );

  await expect(emailValidationMessage).toBeVisible();

  await expect(this.emailInput).toHaveValue("invalid-email");
}

  async expectRequiredFieldValidation(): Promise<void> {
    await expect(this.validationMessages).toHaveCount(7);

    await expect(
      this.validationMessages.filter({
        hasText: /^Firstname should not be blank$/,
      }),
    ).toBeVisible();

    await expect(
      this.validationMessages.filter({
        hasText: /^Lastname should not be blank$/,
      }),
    ).toBeVisible();

    await expect(
      this.validationMessages.filter({
        hasText: /^size must be between 3 and 30$/,
      }),
    ).toBeVisible();

    await expect(
      this.validationMessages.filter({
        hasText: /^size must be between 3 and 18$/,
      }),
    ).toBeVisible();

    await expect(
      this.validationMessages.filter({
        hasText: /^size must be between 11 and 21$/,
      }),
    ).toBeVisible();

    await expect(
      this.validationMessages.filter({
        hasText: /^must not be empty$/,
      }),
    ).toHaveCount(2);
  }
}