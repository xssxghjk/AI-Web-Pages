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

test('calories burned pie chart canvas height stays stable across range switches', async ({ browser }) => {
  // deviceScaleFactor > 1 is required to reproduce the doubling bug: canvas.height
  // is set to H * dpr, and on dpr === 1 that leaves the stored height unchanged.
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await context.newPage();

  await page.addInitScript(() => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem('activity_tracker_v1', JSON.stringify([
      { date: today, type: 'run', km: 5 },
    ]));
    localStorage.setItem('calorie_weights', JSON.stringify({ [today]: 70 }));
  });
  await page.goto('/calorie-tracker/');
  await page.click('[data-tab="dashboard"]');

  const burnedCanvasHeight = () =>
    page.$eval('#chart-burned', el => el.offsetHeight);

  const h30 = await burnedCanvasHeight();
  expect(h30).toBeGreaterThan(0);

  await page.click('[data-burn-range="60"]');
  const h60 = await burnedCanvasHeight();
  expect(h60).toBe(h30);

  await page.click('[data-burn-range="90"]');
  const h90 = await burnedCanvasHeight();
  expect(h90).toBe(h30);

  await page.click('[data-burn-range="30"]');
  await page.click('[data-burn-range="60"]');
  await page.click('[data-burn-range="90"]');
  await page.click('[data-burn-range="30"]');
  const hFinal = await burnedCanvasHeight();
  expect(hFinal).toBe(h30);

  await context.close();
});
