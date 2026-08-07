import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly bookButton: Locator;
  readonly checkAvailabilityButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.bookButton = page
      .locator('a[href="#booking"]')
      .first();

    this.checkAvailabilityButton = page.getByRole("button", {
      name: "Check Availability",
      exact: true,
    });
  }

  async openBookingSection(): Promise<void> {
    await this.bookButton.click();

    await expect(
      this.checkAvailabilityButton,
    ).toBeVisible();
  }

  async checkAvailability(): Promise<void> {
    await this.checkAvailabilityButton.click();
  }
}