import {
  expect,
  Locator,
  Page,
} from "@playwright/test";

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export class BookingFormPage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly reserveNowButton: Locator;
  readonly validationMessages: Locator;

  constructor(page: Page) {
    this.page = page;

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

  async fillForm(
    data: BookingData,
  ): Promise<void> {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
  }

  async submit(): Promise<void> {
    await this.reserveNowButton.click();
  }

  async expectInvalidEmail(
    email: string,
  ): Promise<void> {
    await expect(
      this.page.getByText(
        /must be a well-formed email address/i,
      ),
    ).toBeVisible();

    await expect(this.emailInput).toHaveValue(
      email,
    );
  }

  async expectRequiredFieldValidation(): Promise<void> {
    await expect(this.validationMessages).toHaveCount(7);
  }
}