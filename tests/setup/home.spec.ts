import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/BookingPage';

test.describe('Home Page', () => {
  test('deve carregar a página inicial', async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    await homePage.goto();

    await expect(page).toHaveURL(
      /automationintesting\.online/,
    );
    await expect(homePage.heading).toBeVisible();
  });
});
