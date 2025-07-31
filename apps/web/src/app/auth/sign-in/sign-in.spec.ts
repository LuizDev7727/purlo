import { expect, test } from '@playwright/test';

test('should login with credentials', async ({ page }) => {
  await page.goto('/auth/sign-in');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('should not login with e-mail not found', async ({ page }) => {
  await page.goto('/auth/sign-in');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});

test('should not login with password not match', async ({ page }) => {
  await page.goto('/auth/sign-in');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});

test("should show 'User not found' ", async ({ page }) => {
  await page.goto('/auth/sign-in');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});
