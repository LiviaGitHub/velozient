import { expect, Locator, Page } from "@playwright/test";

export class ReservationPage {
  readonly page: Page;
  readonly firstAvailableRoom: Locator;
  readonly reserveNowButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstAvailableRoom = page
      .locator('a[href^="/reservation/"]')
      .first();

    this.reserveNowButton = page.getByRole("button", {
      name: "Reserve Now",
      exact: true,
    });
  }

  async selectFirstAvailableRoom(): Promise<void> {
    await expect(this.firstAvailableRoom).toBeVisible();
    await this.firstAvailableRoom.click();
  }

  async openReservationForm(): Promise<void> {
    await expect(this.reserveNowButton).toBeVisible();
    await this.reserveNowButton.click();
  }
}