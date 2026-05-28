import { test, expect } from '@playwright/test';

test('home redirects to profile', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/profile\//);
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

test('trips page loads', async ({ page }) => {
  await page.goto('/trips/');
  await expect(page).toHaveTitle(/Trips/);
});

test('run walk tracker page loads', async ({ page }) => {
  await page.goto('/marathon-training/');
  await expect(page).toHaveTitle(/Run.*Walk Tracker|Walk.*Run Tracker/);
});

test('project stats page loads', async ({ page }) => {
  await page.goto('/project-stats/');
  await expect(page).toHaveTitle(/Project Stats/);
  await expect(page.locator('h1')).toContainText('Project Stats');
});

test('journal page loads', async ({ page }) => {
  await page.goto('/journal/');
  await expect(page).toHaveTitle(/Journal/);
  const sidebarVisible = await page.locator('.sidebar').isVisible();
  const hamburgerVisible = await page.locator('#hamburger-btn').isVisible();
  expect(sidebarVisible || hamburgerVisible).toBe(true);
});

test('bouldering tracker page loads', async ({ page }) => {
  await page.goto('/bouldering-tracker/');
  await expect(page).toHaveTitle(/Bouldering/);
  const sidebarVisible = await page.locator('.sidebar').isVisible();
  const hamburgerVisible = await page.locator('#hamburger-btn').isVisible();
  expect(sidebarVisible || hamburgerVisible).toBe(true);
});

test('calorie tracker page loads', async ({ page }) => {
  await page.goto('/calorie-tracker/');
  await expect(page).toHaveTitle(/Calorie Tracker/);
  const sidebarVisible = await page.locator('.sidebar').isVisible();
  const hamburgerVisible = await page.locator('#hamburger-btn').isVisible();
  expect(sidebarVisible || hamburgerVisible).toBe(true);
});

test('workout tracker page loads', async ({ page }) => {
  await page.goto('/workout/');
  await expect(page).toHaveTitle(/Workout/);
  const sidebarVisible = await page.locator('.sidebar').isVisible();
  const hamburgerVisible = await page.locator('#hamburger-btn').isVisible();
  expect(sidebarVisible || hamburgerVisible).toBe(true);
});

test('walk tracker page loads', async ({ page }) => {
  await page.goto('/walk-tracker/');
  await expect(page).toHaveTitle(/Walk Tracker/);
  const sidebarVisible = await page.locator('.sidebar').isVisible();
  const hamburgerVisible = await page.locator('#hamburger-btn').isVisible();
  expect(sidebarVisible || hamburgerVisible).toBe(true);
});

test('todos page loads', async ({ page }) => {
  await page.goto('/todos/');
  await expect(page).toHaveTitle(/To-Do List/);
  await expect(page.locator('h1')).toContainText('To-Do List');
  const sidebarVisible = await page.locator('.sidebar').isVisible();
  const hamburgerVisible = await page.locator('#hamburger-btn').isVisible();
  expect(sidebarVisible || hamburgerVisible).toBe(true);
});

