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

    // First click: warnings appear (mocked empty card DB triggers deck-count and equipment warnings)
    await page.click('#sb-save');
    await expect(page.locator('#sb-warn')).toBeVisible();
    // Second click: save proceeds despite warnings
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
    // First click: warnings; second click: save anyway
    await page.click('#sb-save');
    await expect(page.locator('#sb-warn')).toBeVisible();
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

    // Switch to Coverage sub-tab
    await page.click('#sb-sub-tab-coverage');
    await page.waitForSelector('#sideboard-heatmap', { state: 'visible' });

    // Fry is cut in both matchups → survivedMatchups = 0 ≤ 1 → cut candidate
    const candidateRow = page.locator('.sb-heatmap-row', { hasText: 'Fry' });
    await expect(candidateRow.locator('.sb-cut-candidate')).toBeVisible();
  });

  test('12: clicking a coverage row expands matchup list', async ({ page }) => {
    const deck = {
      ...SEED_DECK,
      sideboardGuide: [
        { id: 'kayo',      hero: 'Kayo',      rating: 'favoured', goFirst: null, note: '', cardsOutRaw: '3 Fry (red)' },
        { id: 'dorinthea', hero: 'Dorinthea', rating: 'even',     goFirst: null, note: '', cardsOutRaw: '3 Fry (red)' },
        { id: 'rhinar',    hero: 'Rhinar',    rating: 'favoured', goFirst: null, note: '', cardsOutRaw: '' },
      ],
    };
    await seedDeck(page, deck);
    await openDeckSideboard(page);

    await page.click('#sb-sub-tab-coverage');
    await page.waitForSelector('#sideboard-heatmap', { state: 'visible' });

    // Detail section hidden before clicking
    const detail = page.locator('.sb-heatmap-item', { hasText: 'Fry' }).locator('.sb-heatmap-detail');
    await expect(detail).not.toBeVisible();

    // Click the row to expand — detail shows matchups where Fry is used (not cut)
    await page.locator('.sb-heatmap-row', { hasText: 'Fry' }).click();
    await expect(detail).toBeVisible();
    await expect(detail).toContainText('Used in');
    await expect(detail).toContainText('Rhinar');
    await expect(detail).not.toContainText('Kayo');
    await expect(detail).not.toContainText('Dorinthea');

    // Click again to collapse
    await page.locator('.sb-heatmap-row', { hasText: 'Fry' }).click();
    await expect(detail).not.toBeVisible();
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

  test('10: opening sideboard editor scrolls to the top of the page', async ({ page }) => {
    const deck = {
      ...SEED_DECK,
      sideboardGuide: [
        { id: 'kayo', hero: 'Kayo', rating: 'favoured', goFirst: 'first', note: '', cardsOutRaw: '2 Fry (red)' },
      ],
    };
    await seedDeck(page, deck);
    // Use a short viewport so the page is definitely scrollable
    await page.setViewportSize({ width: 800, height: 300 });
    await openDeckSideboard(page);

    // Scroll down so we are not at the top
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForFunction(() => window.scrollY > 0);

    // Open editor via edit button
    await page.click('.sb-matchup-head');
    await page.waitForSelector('.sb-matchup-edit-btn', { state: 'visible' });
    await page.click('.sb-matchup-edit-btn');

    // Page should scroll back to top
    await page.waitForFunction(() => window.scrollY === 0);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test('11: save with warnings shows inline warning and toast, requires second click to save', async ({ page }) => {
    await seedDeck(page, SEED_DECK);
    await openDeckSideboard(page);

    await page.click('text=+ Add matchup');
    await page.fill('#sb-hero-input', 'Kayo');

    // First click: warnings are shown, save is blocked
    await page.click('#sb-save');
    await expect(page.locator('#sb-warn')).toBeVisible();
    // Warning text includes "Click Save again"
    await expect(page.locator('#sb-warn')).toContainText('Click Save again');
    // Editor stays open (no matchup row yet)
    await expect(page.locator('.sb-matchup-row')).not.toBeVisible();

    // Second click: save proceeds
    await page.click('#sb-save');
    await expect(page.locator('.sb-matchup-row')).toContainText('Kayo');
  });

  test('18: save warning includes "Not found in database" when deck cards are unknown', async ({ page }) => {
    // Empty DB means all deck cards (Fry, Sink Below, Pummel) are unrecognised
    await seedDeck(page, SEED_DECK);
    await openDeckSideboard(page);

    await page.click('text=+ Add matchup');
    await page.fill('#sb-hero-input', 'Kayo');

    // First click: warning includes the not-found message
    await page.click('#sb-save');
    await expect(page.locator('#sb-warn')).toBeVisible();
    await expect(page.locator('#sb-warn')).toContainText('Not found in database');

    // Second click: save proceeds despite warnings
    await page.click('#sb-save');
    await expect(page.locator('.sb-matchup-row')).toContainText('Kayo');
  });
});

test.describe('weapon setup validation', () => {
  const WEAPON_DB = JSON.stringify([
    { name: 'Helm',       color: '', types: ['Head'],     pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Vambraces',  color: '', types: ['Arms'],     pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Chestplate', color: '', types: ['Chest'],    pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Greaves',    color: '', types: ['Legs'],     pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'BigBlade',   color: '', types: ['2H'],       pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'MainSword',  color: '', types: ['1H'],       pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'OffSword',   color: '', types: ['1H'],       pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Shield',     color: '', types: ['Off-Hand'], pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
  ]);

  const FULL_ARMOR = '1 Helm\n1 Vambraces\n1 Chestplate\n1 Greaves\n';

  const makeWeaponDeck = (weaponLines) => ({
    id: 'weapon-test-deck',
    name: 'Weapon Test Deck',
    decklist: FULL_ARMOR + weaponLines,
    cardCount: 0,
    savedAt: new Date().toISOString(),
    sideboardGuide: [],
  });

  test.beforeEach(async ({ page }) => {
    await page.route('**/card.json', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: WEAPON_DB,
    }));
  });

  test('12: 2H weapon — no weapon warning in sideboard', async ({ page }) => {
    await seedDeck(page, makeWeaponDeck('1 BigBlade'));
    await openDeckSideboard(page);
    await expect(page.locator('.sb-equip-warn')).not.toBeVisible();
  });

  test('13: two different 1H weapons — no weapon warning in sideboard', async ({ page }) => {
    await seedDeck(page, makeWeaponDeck('1 MainSword\n1 OffSword'));
    await openDeckSideboard(page);
    await expect(page.locator('.sb-equip-warn')).not.toBeVisible();
  });

  test('14: same 1H weapon × 2 (qty 2) — no weapon warning in sideboard', async ({ page }) => {
    await seedDeck(page, makeWeaponDeck('2 MainSword'));
    await openDeckSideboard(page);
    await expect(page.locator('.sb-equip-warn')).not.toBeVisible();
  });

  test('15: 1H weapon + Off-Hand — no weapon warning in sideboard', async ({ page }) => {
    await seedDeck(page, makeWeaponDeck('1 MainSword\n1 Shield'));
    await openDeckSideboard(page);
    await expect(page.locator('.sb-equip-warn')).not.toBeVisible();
  });

  test('16: single 1H weapon only — warns about missing Off-Hand', async ({ page }) => {
    await seedDeck(page, makeWeaponDeck('1 MainSword'));
    await openDeckSideboard(page);
    await expect(page.locator('.sb-equip-warn')).toBeVisible();
    await expect(page.locator('.sb-equip-warn')).toContainText('Off-Hand');
  });
});

test.describe('sideboard save — valid deck skips warnings', () => {
  // A CC-format deck with all 60 colored cards found in DB and complete equipment
  const VALID_DB = JSON.stringify([
    { name: 'DeckCard', color: 'red', types: [], pitch: '1', cost: '0', power: '4', defense: '3', printings: [], card_keywords: [] },
    { name: 'Helm',       color: '', types: ['Head'],  pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Vambraces',  color: '', types: ['Arms'],  pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Chestplate', color: '', types: ['Chest'], pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Greaves',    color: '', types: ['Legs'],  pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'BigBlade',   color: '', types: ['2H'],    pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
  ]);

  const VALID_DECK = {
    id: 'valid-deck',
    name: 'Valid CC Deck',
    decklist: '60 DeckCard (red)\n1 Helm\n1 Vambraces\n1 Chestplate\n1 Greaves\n1 BigBlade',
    cardCount: 65,
    savedAt: new Date().toISOString(),
    sideboardGuide: [],
  };

  test('17: valid deck saves on first click without any warning', async ({ page }) => {
    await page.route('**/card.json', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: VALID_DB,
    }));
    await seedDeck(page, VALID_DECK);
    await openDeckSideboard(page);

    await page.click('text=+ Add matchup');
    await page.fill('#sb-hero-input', 'Kayo');

    // Single click should save immediately — no warning step needed
    await page.click('#sb-save');
    await expect(page.locator('#sb-warn')).not.toBeVisible();
    await expect(page.locator('.sb-matchup-row')).toContainText('Kayo');
  });
});

test.describe('sideboard save — post-cut warnings', () => {
  const POST_CUT_DB = JSON.stringify([
    { name: 'DeckCard', color: 'red', types: [], pitch: '1', cost: '0', power: '4', defense: '3', printings: [], card_keywords: [] },
    { name: 'Helm',       color: '', types: ['Head'],     pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Vambraces',  color: '', types: ['Arms'],     pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Chestplate', color: '', types: ['Chest'],    pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Greaves',    color: '', types: ['Legs'],     pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'MainSword',  color: '', types: ['1H'],       pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
    { name: 'Shield',     color: '', types: ['Off-Hand'], pitch: '', cost: '', power: '', defense: '', printings: [], card_keywords: [] },
  ]);

  const POST_CUT_DECK = {
    id: 'post-cut-deck',
    name: 'Post Cut Test Deck',
    decklist: '60 DeckCard (red)\n1 Helm\n1 Vambraces\n1 Chestplate\n1 Greaves\n1 MainSword\n1 Shield',
    cardCount: 66,
    savedAt: new Date().toISOString(),
    sideboardGuide: [],
  };

  test.beforeEach(async ({ page }) => {
    await page.route('**/card.json', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: POST_CUT_DB,
    }));
    await seedDeck(page, POST_CUT_DECK);
  });

  test('19: cutting deck cards below 60 warns before saving', async ({ page }) => {
    await openDeckSideboard(page);
    await page.click('text=+ Add matchup');
    await page.fill('#sb-hero-input', 'Kayo');

    // Cut 1 DeckCard — leaves 59 pitch cards in a CC deck (below 60)
    const deckCardRow = page.locator('.sb-picker-row', { hasText: 'DeckCard' });
    await deckCardRow.locator('.sb-picker-minus').click();

    // First click: post-cut count warning shown, save blocked
    await page.click('#sb-save');
    await expect(page.locator('#sb-warn')).toBeVisible();
    await expect(page.locator('#sb-warn')).toContainText('After cuts');
    await expect(page.locator('.sb-matchup-row')).not.toBeVisible();

    // Second click: save proceeds
    await page.click('#sb-save');
    await expect(page.locator('.sb-matchup-row')).toContainText('Kayo');
  });

  test('20: cutting equipment that invalidates weapon setup warns before saving', async ({ page }) => {
    await openDeckSideboard(page);
    await page.click('text=+ Add matchup');
    await page.fill('#sb-hero-input', 'Ira');

    // Cut Shield (Off-Hand) — leaves single 1H MainSword with no Off-Hand
    const shieldRow = page.locator('.sb-picker-row', { hasText: 'Shield' });
    await shieldRow.locator('.sb-picker-minus').click();

    // First click: post-cut equipment warning shown, save blocked
    await page.click('#sb-save');
    await expect(page.locator('#sb-warn')).toBeVisible();
    await expect(page.locator('#sb-warn')).toContainText('After cuts');
    await expect(page.locator('.sb-matchup-row')).not.toBeVisible();

    // Second click: save proceeds
    await page.click('#sb-save');
    await expect(page.locator('.sb-matchup-row')).toContainText('Ira');
  });

  test('21: warning indicator is visible on matchup row before expanding', async ({ page }) => {
    // Save a matchup with a post-cut count warning (59 cards after cut)
    const deck = {
      id: 'post-cut-deck',
      name: 'Post Cut Test Deck',
      decklist: '60 DeckCard (red)\n1 Helm\n1 Vambraces\n1 Chestplate\n1 Greaves\n1 MainSword\n1 Shield',
      cardCount: 66,
      savedAt: new Date().toISOString(),
      sideboardGuide: [
        { id: 'kayo', hero: 'Kayo', rating: 'favoured', goFirst: 'first', note: '', cardsOutRaw: '1 DeckCard (red)' },
      ],
    };
    await seedDeck(page, deck);
    await openDeckSideboard(page);

    // Warning indicator should be visible in the collapsed row header
    const row = page.locator('.sb-matchup-row', { hasText: 'Kayo' });
    await expect(row.locator('.sb-matchup-warn-indicator')).toBeVisible();

    // A matchup with no cuts should not show the indicator
    const deck2 = {
      id: 'clean-deck',
      name: 'Clean Deck',
      decklist: '60 DeckCard (red)\n1 Helm\n1 Vambraces\n1 Chestplate\n1 Greaves\n1 MainSword\n1 Shield',
      cardCount: 66,
      savedAt: new Date().toISOString(),
      sideboardGuide: [
        { id: 'kayo', hero: 'Kayo', rating: 'favoured', goFirst: 'first', note: '', cardsOutRaw: '' },
      ],
    };
    await seedDeck(page, deck2);
    await openDeckSideboard(page);

    const cleanRow = page.locator('.sb-matchup-row', { hasText: 'Kayo' });
    await expect(cleanRow.locator('.sb-matchup-warn-indicator')).not.toBeVisible();
  });
});
