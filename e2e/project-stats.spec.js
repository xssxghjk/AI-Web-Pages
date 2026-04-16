import { test, expect } from '@playwright/test';

// Tests for the Meta view (Project Stats page) — specifically the commit activity history.
// The /commits endpoint is mocked here so the chart renders reliably without network access.

test('project stats activity history renders bars when commit data is available', async ({ page }) => {
  // Build mock commits spread across the last 52 weeks
  const now = new Date();
  const mockCommits = Array.from({ length: 40 }, (_, i) => {
    const date = new Date(now.getTime() - i * 3 * 86400000);
    return {
      sha: 'abc' + i,
      commit: {
        author:    { name: 'Test', email: 'test@test.com', date: date.toISOString() },
        committer: { name: 'Test', email: 'test@test.com', date: date.toISOString() },
        message: 'Commit ' + i,
      },
    };
  });

  // Only intercept the timeline fetch (includes `since=`); let other commit calls through
  await page.route(
    url => url.href.includes('api.github.com') && url.href.includes('/commits') && url.href.includes('since='),
    async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockCommits),
      });
    }
  );

  await page.goto('/project-stats/');

  // Activity bars should be rendered once the API responds
  await expect(page.locator('.timeline-bar')).not.toHaveCount(0);
  // The loading placeholder is removed when bars are rendered
  await expect(page.locator('#timeline-loading')).not.toBeAttached();
});
