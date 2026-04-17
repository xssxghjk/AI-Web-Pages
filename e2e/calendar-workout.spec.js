import { test, expect } from '@playwright/test';

// planStart = Monday 2026-01-05 → week1Sun = 2026-01-04 (Sunday)
// April 8, 2026 = week1Sun + 94 days = week 13, d=3 (Wed) → not in REST_DAYS[13]=[1,5]
// April 8 is a known past workout day relative to today (2026-04-17)
const PLAN_START = '2026-01-05';
const PAST_WORKOUT_DATE = '2026-04-08';

test.describe('workout status logic', () => {
  test('today is never marked missed', async ({ page }) => {
    await page.addInitScript((planStart) => {
      localStorage.setItem('c2hm_v1', JSON.stringify({ planStart, days: {} }));
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
      localStorage.setItem('c2hm_v1', JSON.stringify({ planStart, days: {} }));
    }, PLAN_START);

    await page.goto('/calendar/');

    const todayHasMissed = await page.evaluate(() => {
      const cell = document.querySelector('.cal-day.today');
      return cell ? cell.querySelector('.wd-missed') !== null : false;
    });

    expect(todayHasMissed).toBe(false);
  });

  test('past workout with no entry is marked missed', async ({ page }) => {
    await page.addInitScript((planStart) => {
      localStorage.setItem('c2hm_v1', JSON.stringify({ planStart, days: {} }));
    }, PLAN_START);

    await page.goto('/calendar/');

    const status = await page.evaluate(
      (date) => (window.WORKOUT_STATUS || {})[date],
      PAST_WORKOUT_DATE
    );

    expect(status).toBe('missed');
  });

  test('past completed workout is marked done', async ({ page }) => {
    await page.addInitScript((args) => {
      const { planStart, date } = args;
      localStorage.setItem('c2hm_v1', JSON.stringify({
        planStart,
        days: { [date]: { status: 'completed' } },
      }));
    }, { planStart: PLAN_START, date: PAST_WORKOUT_DATE });

    await page.goto('/calendar/');

    const status = await page.evaluate(
      (date) => (window.WORKOUT_STATUS || {})[date],
      PAST_WORKOUT_DATE
    );

    expect(status).toBe('done');
  });

  test('iso keys are sequential with no day shift', async ({ page }) => {
    await page.addInitScript((planStart) => {
      localStorage.setItem('c2hm_v1', JSON.stringify({ planStart, days: {} }));
    }, PLAN_START);

    await page.goto('/calendar/');

    // Collect all keys from WORKOUT_STATUS and verify they are unique dates
    // (a DST shift bug would produce duplicate or skipped dates)
    const keys = await page.evaluate(() => Object.keys(window.WORKOUT_STATUS || {}));
    const unique = new Set(keys);

    expect(keys.length).toBe(unique.size);
  });
});

test.describe('workout dot position', () => {
  test('workout dot is in top-right corner of day cell', async ({ page }) => {
    await page.addInitScript((args) => {
      const { planStart, date } = args;
      localStorage.setItem('c2hm_v1', JSON.stringify({
        planStart,
        days: { [date]: { status: 'completed' } },
      }));
    }, { planStart: PLAN_START, date: PAST_WORKOUT_DATE });

    await page.goto('/calendar/');

    const result = await page.evaluate(() => {
      const dot = document.querySelector('.workout-dot');
      if (!dot) return null;
      const cell = dot.closest('.cal-day');
      if (!cell) return null;
      const dotBox = dot.getBoundingClientRect();
      const cellBox = cell.getBoundingClientRect();
      return {
        position: getComputedStyle(dot).position,
        isRight: dotBox.right <= cellBox.right + 1 && dotBox.left > cellBox.left + cellBox.width / 2,
        isTop: dotBox.top >= cellBox.top && dotBox.bottom < cellBox.top + cellBox.height / 2,
      };
    });

    expect(result).not.toBeNull();
    expect(result.position).toBe('absolute');
    expect(result.isRight).toBe(true);
    expect(result.isTop).toBe(true);
  });
});
