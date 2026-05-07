import { test, expect } from '@playwright/test';

test('dashboard chart canvas height stays stable across repeated tab switches', async ({ page }) => {
  await page.goto('/calorie-tracker/');

  const clickDashboard = () => page.click('[data-tab="dashboard"]');
  const clickLog       = () => page.click('[data-tab="log"]');

  const canvasHeight = () =>
    page.$eval('#chart-weekly', el => el.offsetHeight);

  await clickDashboard();
  const h1 = await canvasHeight();
  expect(h1).toBeGreaterThan(0);

  await clickLog();
  await clickDashboard();
  const h2 = await canvasHeight();
  expect(h2).toBe(h1);

  await clickLog();
  await clickDashboard();
  const h3 = await canvasHeight();
  expect(h3).toBe(h1);
});
