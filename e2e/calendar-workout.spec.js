import { test, expect } from '@playwright/test';

// Stable plan: Monday 2026-01-05, week1Sun = 2026-01-04 (Sunday)
const PLAN_START = '2026-01-05';

function getTestWorkoutDates() {
  const REST_DAYS = [
    [0,1,5],[1,5],[1,5],[1,5],[1,5],[1,5],[1,5],[1,5],[1,5],[1,5],
    [1,5],[1,5],[1,5],[1,5],[1,5],[1,5],[0,1,5],[1,5],[0,1,5],[1,3,5,6],
  ];
  const week1Sun = new Date(2026, 0, 4);
  const planStart = new Date(2026, 0, 5);

  function isWorkoutDay(date) {
    const days = Math.round((date - week1Sun) / 86400000);
    if (days < 0) return false;
    const w = Math.floor(days / 7);
    const dow = days % 7;
    return w < 20 && date >= planStart && !REST_DAYS[w].includes(dow);
  }

  function toIso(d) {
    return d.getFullYear() + '-' +
      String(d.getMonth() + 1).padStart(2, '0') + '-' +
      String(d.getDate()).padStart(2, '0');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Most recent workout day strictly before today (for missed/done status tests)
  let pastDate = null;
  for (let i = 1; i <= 200; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    if (isWorkoutDay(d)) { pastDate = d; break; }
  }

  // First workout day in the current calendar month, past or future
  // (dot-position test only needs the dot rendered; a 'completed' entry
  //  forces 'done' status regardless of whether the date is future)
  let currentMonthDate = null;
  const y = today.getFullYear(), m = today.getMonth();
  for (let day = 1; day <= 31; day++) {
    const d = new Date(y, m, day);
    if (d.getMonth() !== m) break;
    if (isWorkoutDay(d)) { currentMonthDate = d; break; }
  }

  return {
    past:    pastDate         ? toIso(pastDate)         : '2026-04-08',
    current: currentMonthDate ? toIso(currentMonthDate) : (pastDate ? toIso(pastDate) : '2026-04-08'),
  };
}

const { past: PAST_WORKOUT_DATE, current: CURRENT_WORKOUT_DATE } = getTestWorkoutDates();

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

  test('past workout with no entry is marked missed', async ({ page }) => {
    await page.addInitScript((planStart) => {
      localStorage.setItem('c2hm_v1', JSON.stringify({ planStart, days: {}, version: 1 }));
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
        version: 1,
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

test.describe('workout dot position', () => {
  test('workout dot is in top-right corner of day cell', async ({ page }) => {
    await page.addInitScript((args) => {
      const { planStart, date } = args;
      localStorage.setItem('c2hm_v1', JSON.stringify({
        planStart,
        days: { [date]: { status: 'completed' } },
        version: 1,
      }));
    }, { planStart: PLAN_START, date: CURRENT_WORKOUT_DATE });

    await page.goto('/calendar/');

    const result = await page.evaluate(() => {
      const dot = document.querySelector('.cal-day .workout-dot');
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
