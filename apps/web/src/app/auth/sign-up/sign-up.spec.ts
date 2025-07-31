import { expect, test } from '@playwright/test';

test('should register with credentials', async ({ page }) => {
  await page.goto('/auth/sign-in');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('should not register with invalid e-mail', async ({ page }) => {
  await page.goto('/auth/sign-in');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});

test('should not register with invalid password', async ({ page }) => {
  await page.goto('/auth/sign-in');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});

test('should not register with password and confirmPassword not match', async ({
  page,
}) => {
  await page.goto('/auth/sign-in');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});

test('should not register with a user already registered', async ({ page }) => {
  await page.goto('/auth/sign-in');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole('heading', { name: 'Installation' })
  ).toBeVisible();
});
