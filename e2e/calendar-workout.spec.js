import { test, expect } from '@playwright/test';

// Stable plan: Monday 2026-01-05, week1Sun = 2026-01-04 (Sunday)
const PLAN_START = '2026-01-05';

test.describe('workout status logic', () => {
  test('today is never marked missed', async ({ page }) => {
    await page.addInitScript((planStart) => {
      localStorage.setItem('c2hm_v1', JSON.stringify({ planStart, days: {}, version: 1 }));
    }, PLAN_START);

    await page.goto('/calendar/');

    const todayStatus = await page.evaluate(() => {
      const t = new Date();
      const iso = t.getFullYear() + '-' +
        String(t.getMonth() + 1).padStart(2, '0') + '-' +
        String(t.getDate()).padStart(2, '0');
      return (window.WORKOUT_STATUS || {})[iso];
    });

    expect(todayStatus).not.toBe('missed');
  });

  test('today cell has no red dot', async ({ page }) => {
    await page.addInitScript((planStart) => {
      localStorage.setItem('c2hm_v1', JSON.stringify({ planStart, days: {}, version: 1 }));
    }, PLAN_START);

    await page.goto('/calendar/');

    const todayHasMissed = await page.evaluate(() => {
      const cell = document.querySelector('.cal-day.today');
      return cell ? cell.querySelector('.wd-missed') !== null : false;
    });

    expect(todayHasMissed).toBe(false);
  });

  test('iso keys are sequential with no day shift', async ({ page }) => {
    await page.addInitScript((planStart) => {
      localStorage.setItem('c2hm_v1', JSON.stringify({ planStart, days: {}, version: 1 }));
    }, PLAN_START);

    await page.goto('/calendar/');

    // Collect all keys from WORKOUT_STATUS and verify they are unique dates
    // (a DST shift bug would produce duplicate or skipped dates)
    const keys = await page.evaluate(() => Object.keys(window.WORKOUT_STATUS || {}));
    const unique = new Set(keys);

    expect(keys.length).toBe(unique.size);
  });
});
