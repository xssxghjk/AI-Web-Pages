import { test, expect } from '@playwright/test';

const SEED_DECK = {
  id: 'test-deck-1',
  name: 'Test Briar',
  decklist: '3 Fry (red)\n3 Sink Below (blue)\n3 Pummel (red)',
  cardCount: 9,
  savedAt: new Date().toISOString(),
  sideboardGuide: [],
};

const SEED_DECK_2 = {
  id: 'test-deck-2',
  name: 'Second Deck',
  decklist: '3 Fry (red)\n3 Sink Below (blue)',
  cardCount: 6,
  savedAt: new Date().toISOString(),
  sideboardGuide: [
    {
      id: 'kayo',
      hero: 'Kayo',
      rating: 'favoured',
      goFirst: 'first',
      note: 'Deck 2 note',
      cardsOutRaw: '3 Fry (red)',
    },
  ],
};

async function seedDeck(page, deck) {
  await page.addInitScript((d) => {
    localStorage.setItem('fab_saved_decks_v1', JSON.stringify([d]));
  }, deck);
}

async function seedDecks(page, decks) {
  await page.addInitScript((ds) => {
    localStorage.setItem('fab_saved_decks_v1', JSON.stringify(ds));
  }, decks);
}

async function openDeckSideboard(page) {
  await page.goto('/fab-deck-viewer/');
  await page.click('.deck-row');
  // Wait for detail view
  await page.waitForSelector('#tab-btn-sideboard', { state: 'visible' });
  await page.click('#tab-btn-sideboard');
  await page.waitForSelector('#sideboard-content', { state: 'visible' });
}

test.describe('sideboard guide', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the card DB so tests don't depend on external network
    await page.route('**/card.json', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '[]',
    }));
  });

  test('1: sideboard tab is visible on deck detail page', async ({ page }) => {
    await seedDeck(page, SEED_DECK);
    await page.goto('/fab-deck-viewer/');
    await page.click('.deck-row');
    await expect(page.locator('#tab-btn-sideboard')).toBeVisible();
  });

  test('2: empty state renders when guide is empty', async ({ page }) => {
    await seedDeck(page, SEED_DECK);
    await openDeckSideboard(page);
    await expect(page.locator('#sideboard-content')).toContainText('No sideboard guides yet');
  });

  test('3: add matchup — saves and renders in list', async ({ page }) => {
    await seedDeck(page, SEED_DECK);
    await openDeckSideboard(page);

    await page.click('text=+ Add matchup');
    await page.fill('#sb-hero-input', 'Kayo');

    // Select "Favoured" rating dropdown
    await page.selectOption('#sb-rating-select', 'favoured');
    // Select "First" go-first dropdown
    await page.selectOption('#sb-go-select', 'first');

    // Click – twice on Fry to board out 2 copies
    const fryRow = page.locator('.sb-picker-row', { hasText: 'Fry' });
    await fryRow.locator('.sb-picker-minus').click();
    await fryRow.locator('.sb-picker-minus').click();

    await page.click('#sb-save');

    await expect(page.locator('.sb-matchup-row')).toContainText('Kayo');
    await expect(page.locator('.sb-matchup-row')).toContainText('favoured');
    // count is shown in the collapsible body, not the header
    await page.click('.sb-matchup-head');
    await expect(page.locator('.sb-matchup-body')).toContainText('Fry');
  });

  test('4: expand matchup accordion shows cards', async ({ page }) => {
    const deck = {
      ...SEED_DECK,
      sideboardGuide: [
        { id: 'kayo', hero: 'Kayo', rating: 'favoured', goFirst: 'first', note: '', cardsOutRaw: '2 Fry (red)' },
      ],
    };
    await seedDeck(page, deck);
    await openDeckSideboard(page);

    await page.click('.sb-matchup-head');
    const body = page.locator('.sb-matchup-body');
    await expect(body).toBeVisible();
    await expect(body).toContainText('Fry');
  });

  test('5: edit matchup — changes persist', async ({ page }) => {
    const deck = {
      ...SEED_DECK,
      sideboardGuide: [
        { id: 'kayo', hero: 'Kayo', rating: 'favoured', goFirst: 'first', note: '', cardsOutRaw: '2 Fry (red)' },
      ],
    };
    await seedDeck(page, deck);
    await openDeckSideboard(page);

    // Expand the matchup row to reveal the Edit button
    await page.click('.sb-matchup-head');
    await page.waitForSelector('.sb-matchup-edit-btn', { state: 'visible' });
    await page.click('.sb-matchup-edit-btn');
    await page.fill('#sb-hero-input', 'Ira');
    await page.click('#sb-save');

    await expect(page.locator('.sb-matchup-row')).toContainText('Ira');
  });

  test('6: delete matchup — empty state appears', async ({ page }) => {
    const deck = {
      ...SEED_DECK,
      sideboardGuide: [
        { id: 'kayo', hero: 'Kayo', rating: 'favoured', goFirst: 'first', note: '', cardsOutRaw: '2 Fry (red)' },
      ],
    };
    await seedDeck(page, deck);
    await openDeckSideboard(page);

    // Expand the matchup row to reveal the Edit button
    await page.click('.sb-matchup-head');
    await page.waitForSelector('.sb-matchup-edit-btn', { state: 'visible' });
    await page.click('.sb-matchup-edit-btn');
    page.once('dialog', dialog => dialog.accept());
    await page.click('#sb-delete');

    await expect(page.locator('#sideboard-content')).toContainText('No sideboard guides yet');
  });

  test('7: heatmap shows cut candidate flag', async ({ page }) => {
    const deck = {
      ...SEED_DECK,
      sideboardGuide: [
        { id: 'kayo',  hero: 'Kayo',  rating: 'favoured', goFirst: null, note: '', cardsOutRaw: '3 Fry (red)' },
        { id: 'dorinthea', hero: 'Dorinthea', rating: 'even', goFirst: null, note: '', cardsOutRaw: '3 Fry (red)' },
      ],
    };
    await seedDeck(page, deck);
    await openDeckSideboard(page);

    // Fry is cut in both matchups → survivedMatchups = 0 ≤ 1 → cut candidate
    const candidateRow = page.locator('.sb-heatmap-row', { hasText: 'Fry' });
    await expect(candidateRow.locator('.sb-cut-candidate')).toBeVisible();
  });

  test('9: export PDF button is visible when guide has matchups', async ({ page }) => {
    const deck = {
      ...SEED_DECK,
      sideboardGuide: [
        { id: 'kayo', hero: 'Kayo', rating: 'favoured', goFirst: 'first', note: '', cardsOutRaw: '2 Fry (red)' },
      ],
    };
    await seedDeck(page, deck);
    await openDeckSideboard(page);
    await expect(page.locator('#sb-export-pdf')).toBeVisible();
  });

  test('8: sideboard tab resets between deck navigations', async ({ page }) => {
    await seedDecks(page, [SEED_DECK_2, SEED_DECK]);
    await page.goto('/fab-deck-viewer/');

    // Open first deck (index 0 = SEED_DECK_2, has Kayo matchup)
    await page.locator('.deck-row').first().click();
    await page.waitForSelector('#tab-btn-sideboard', { state: 'visible' });
    await page.click('#tab-btn-sideboard');
    await expect(page.locator('#sideboard-content')).toContainText('Kayo');

    // Go back and open second deck (no matchups)
    await page.click('#btn-back-from-detail');
    await page.locator('.deck-row').nth(1).click();
    await page.waitForSelector('#tab-btn-sideboard', { state: 'visible' });
    await page.click('#tab-btn-sideboard');

    await expect(page.locator('#sideboard-content')).not.toContainText('Kayo');
    await expect(page.locator('#sideboard-content')).toContainText('No sideboard guides yet');
  });
});
