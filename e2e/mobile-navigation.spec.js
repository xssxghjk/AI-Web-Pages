import { test, expect } from '@playwright/test';

// All tests in this file run at a mobile viewport (390×844)
test.use({ viewport: { width: 390, height: 844 } });

test.describe('mobile navigation', () => {
  test('sidebar is hidden on mobile', async ({ page }) => {
    await page.goto('/calendar/');
    const sidebar = page.locator('.sidebar');
    await expect(sidebar).not.toBeVisible();
  });

  test('hamburger button is visible on mobile', async ({ page }) => {
    await page.goto('/calendar/');
    const hamburger = page.locator('#hamburger-btn');
    await expect(hamburger).toBeVisible();
  });

  test('mobile nav drawer is closed by default', async ({ page }) => {
    await page.goto('/calendar/');
    const drawer = page.locator('#mobile-nav-drawer');
    // Drawer exists in DOM but is translated off-screen (not open)
    await expect(drawer).not.toHaveClass(/open/);
  });

  test('hamburger button opens the nav drawer', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    const drawer = page.locator('#mobile-nav-drawer');
    await expect(drawer).toHaveClass(/open/);
  });

  test('nav drawer contains all page links', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    const drawer = page.locator('#mobile-nav-drawer');
    await expect(drawer.getByRole('link', { name: 'Calendar' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Trips' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Tournament Reports' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Tournament Prep' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Deck Viewer' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Card Memory' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Pitch Simulator' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Marathon Training' })).toBeVisible();
    await expect(drawer.getByRole('link', { name: 'Project Stats' })).toBeVisible();
  });

  test('close button closes the nav drawer', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await expect(page.locator('#mobile-nav-drawer')).toHaveClass(/open/);
    await page.locator('#mobile-nav-close').click();
    await expect(page.locator('#mobile-nav-drawer')).not.toHaveClass(/open/);
  });

  test('clicking overlay closes the nav drawer', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await expect(page.locator('#mobile-nav-drawer')).toHaveClass(/open/);
    // Click in the right portion of the overlay, outside the drawer (drawer is 260px wide)
    await page.locator('#mobile-nav-overlay').click({ position: { x: 350, y: 400 } });
    await expect(page.locator('#mobile-nav-drawer')).not.toHaveClass(/open/);
  });

  test('Escape key closes the nav drawer', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await expect(page.locator('#mobile-nav-drawer')).toHaveClass(/open/);
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-nav-drawer')).not.toHaveClass(/open/);
  });

  test('clicking Trips link navigates to trips page', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await page.locator('#mobile-nav-drawer').getByRole('link', { name: 'Trips' }).click();
    await expect(page).toHaveURL(/\/trips\//);
  });

  test('clicking Tournament Reports link navigates to reports page', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await page.locator('#mobile-nav-drawer').getByRole('link', { name: 'Tournament Reports' }).click();
    await expect(page).toHaveURL(/\/tcg-tournament-reports\//);
  });

  test('clicking Tournament Prep link navigates to prep page', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await page.locator('#mobile-nav-drawer').getByRole('link', { name: 'Tournament Prep' }).click();
    await expect(page).toHaveURL(/\/tcg-tournament-prep\//);
  });

  test('clicking Deck Viewer link navigates to deck viewer page', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await page.locator('#mobile-nav-drawer').getByRole('link', { name: 'Deck Viewer' }).click();
    await expect(page).toHaveURL(/\/fab-deck-viewer\//);
  });

  test('clicking Card Memory link navigates to card memory page', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await page.locator('#mobile-nav-drawer').getByRole('link', { name: 'Card Memory' }).click();
    await expect(page).toHaveURL(/\/fab-card-memory\//);
  });

  test('clicking Pitch Simulator link navigates to pitch simulator page', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await page.locator('#mobile-nav-drawer').getByRole('link', { name: 'Pitch Simulator' }).click();
    await expect(page).toHaveURL(/\/fab-pitch-simulator\//);
  });

  test('clicking Marathon Training link navigates to marathon training page', async ({ page }) => {
    await page.goto('/calendar/');
    await page.locator('#hamburger-btn').click();
    await page.locator('#mobile-nav-drawer').getByRole('link', { name: 'Marathon Training' }).click();
    await expect(page).toHaveURL(/\/marathon-training\//);
  });

  test('calendar main has same side padding as card views on mobile', async ({ page }) => {
    await page.goto('/calendar/');
    const calPadding = await page.locator('.main').evaluate(el => {
      const style = window.getComputedStyle(el);
      return { left: style.paddingLeft, right: style.paddingRight };
    });

    await page.goto('/trips/');
    const tripsPadding = await page.locator('.main').evaluate(el => {
      const style = window.getComputedStyle(el);
      return { left: style.paddingLeft, right: style.paddingRight };
    });

    expect(calPadding.left).toBe(tripsPadding.left);
    expect(calPadding.right).toBe(tripsPadding.right);
  });
});
