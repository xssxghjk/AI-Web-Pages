import { test, expect } from '@playwright/test';

test('home redirects to calendar', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/calendar\//);
  await expect(page).toHaveTitle(/Calendar/);
});

test('calendar page loads', async ({ page }) => {
  await page.goto('/calendar/');
  await expect(page).toHaveTitle(/Calendar/);
  await expect(page.locator('h1')).toContainText('Calendar');
  // Navigation is accessible via sidebar (desktop) or hamburger button (mobile)
  const sidebarVisible = await page.locator('.sidebar').isVisible();
  const hamburgerVisible = await page.locator('#hamburger-btn').isVisible();
  expect(sidebarVisible || hamburgerVisible).toBe(true);
});

test('tournament reports page loads', async ({ page }) => {
  await page.goto('/tcg-tournament-reports/');
  await expect(page).toHaveTitle(/Tournament Reports/);
  await expect(page.locator('h1')).toContainText('Tournament Reports');
});

test('trips page loads', async ({ page }) => {
  await page.goto('/trips/');
  await expect(page).toHaveTitle(/Trips/);
});

test('fab deck viewer page loads', async ({ page }) => {
  await page.goto('/fab-deck-viewer/');
  await expect(page).toHaveTitle(/Deck Viewer/);
  const sidebarVisible = await page.locator('.sidebar').isVisible();
  const hamburgerVisible = await page.locator('#hamburger-btn').isVisible();
  expect(sidebarVisible || hamburgerVisible).toBe(true);
});

test('fab pitch simulator page loads', async ({ page }) => {
  await page.goto('/fab-pitch-simulator/');
  await expect(page).toHaveTitle(/Pitch Simulator/);
  await expect(page.locator('h1')).toContainText('Pitch Simulator');
});

test('fab card memory page loads', async ({ page }) => {
  await page.goto('/fab-card-memory/');
  await expect(page).toHaveTitle(/Memorization/i);
});

test('marathon training page loads', async ({ page }) => {
  await page.goto('/marathon-training/');
  await expect(page).toHaveTitle(/Marathon/);
});

test('tournament prep page loads', async ({ page }) => {
  await page.goto('/tcg-tournament-prep/');
  await expect(page).toHaveTitle(/Tournament Prep/);
});

test('rotterdam 2026 page loads', async ({ page }) => {
  await page.goto('/rotterdam-2026/');
  await expect(page).toHaveTitle(/Rotterdam/);
});

test('prague omens 2026 page loads', async ({ page }) => {
  await page.goto('/prague-omens-2026/');
  await expect(page).toHaveTitle(/Prague/);
});

test('hamburg calling 2026 page loads', async ({ page }) => {
  await page.goto('/hamburg-calling-2026/');
  await expect(page).toHaveTitle(/Hamburg/);
});

test('yokohama pro tour page loads', async ({ page }) => {
  await page.goto('/yokohama-pro-tour/');
  await expect(page).toHaveTitle(/.+/);
  await expect(page.locator('body')).not.toBeEmpty();
});

test('project stats page loads', async ({ page }) => {
  await page.goto('/project-stats/');
  await expect(page).toHaveTitle(/Project Stats/);
  await expect(page.locator('h1')).toContainText('Project Stats');
});
