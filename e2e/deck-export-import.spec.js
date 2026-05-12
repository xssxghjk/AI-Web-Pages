import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import os from 'os';

const SEED_DECK = {
  id: 'export-test-deck-1',
  name: 'Export Test Briar',
  decklist: '3 Fry (red)\n3 Sink Below (blue)\n3 Pummel (red)',
  cardCount: 9,
  savedAt: new Date().toISOString(),
  sideboardGuide: [
    {
      id: 'kayo',
      hero: 'Kayo',
      rating: 'favoured',
      goFirst: 'first',
      note: 'Test note',
      cardsOutRaw: '2 Fry (red)',
    },
  ],
};

async function seedDeck(page, deck) {
  await page.addInitScript((d) => {
    localStorage.setItem('fab_saved_decks_v1', JSON.stringify([d]));
  }, deck);
}

test.describe('deck export / import', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/card.json', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '[]',
    }));
  });

  test('export button is visible on deck detail page', async ({ page }) => {
    await seedDeck(page, SEED_DECK);
    await page.goto('/fab-deck-viewer/');
    await page.locator('.deck-row:not(.deck-row-preset)').first().click();
    await page.waitForSelector('#btn-deck-actions', { state: 'visible' });
    await page.click('#btn-deck-actions');
    await expect(page.locator('#btn-export-deck')).toBeVisible();
  });

  test('export triggers a file download with correct filename', async ({ page }) => {
    await seedDeck(page, SEED_DECK);
    await page.goto('/fab-deck-viewer/');
    await page.locator('.deck-row:not(.deck-row-preset)').first().click();
    await page.waitForSelector('#btn-deck-actions', { state: 'visible' });
    await page.click('#btn-deck-actions');
    await page.waitForSelector('#btn-export-deck', { state: 'visible' });

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#btn-export-deck'),
    ]);

    expect(download.suggestedFilename()).toMatch(/Export-Test-Briar.*\.json$/);
  });

  test('exported file contains deck name, decklist, and sideboard guide', async ({ page }) => {
    await seedDeck(page, SEED_DECK);
    await page.goto('/fab-deck-viewer/');
    await page.locator('.deck-row:not(.deck-row-preset)').first().click();
    await page.waitForSelector('#btn-deck-actions', { state: 'visible' });
    await page.click('#btn-deck-actions');
    await page.waitForSelector('#btn-export-deck', { state: 'visible' });

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('#btn-export-deck'),
    ]);

    const tmpPath = path.join(os.tmpdir(), download.suggestedFilename());
    await download.saveAs(tmpPath);
    const raw = fs.readFileSync(tmpPath, 'utf-8');
    const data = JSON.parse(raw);

    expect(data.format).toBe('fab-deck-viewer/v1');
    expect(data.name).toBe('Export Test Briar');
    expect(data.decklist).toContain('Fry');
    expect(Array.isArray(data.sideboardGuide)).toBe(true);
    expect(data.sideboardGuide[0].hero).toBe('Kayo');

    fs.unlinkSync(tmpPath);
  });

  test('import file button is visible on list page', async ({ page }) => {
    await page.goto('/fab-deck-viewer/');
    await expect(page.locator('#btn-file-import')).toBeVisible();
  });

  test('importing a valid deck file creates the deck and navigates to it', async ({ page }) => {
    await page.goto('/fab-deck-viewer/');

    const exportPayload = {
      format: 'fab-deck-viewer/v1',
      name: 'Imported Via File',
      decklist: '3 Fry (red)\n3 Sink Below (blue)',
      sideboardGuide: [
        {
          id: 'bravo',
          hero: 'Bravo',
          rating: 'unfavoured',
          goFirst: 'second',
          note: 'Be careful',
          cardsOutRaw: '1 Fry (red)',
        },
      ],
    };

    const tmpPath = path.join(os.tmpdir(), 'test-import-deck.json');
    fs.writeFileSync(tmpPath, JSON.stringify(exportPayload));

    await page.locator('#file-import-input').setInputFiles(tmpPath);

    // Should navigate to detail view of the imported deck
    await page.waitForSelector('#detail-name', { state: 'visible' });
    await expect(page.locator('#detail-name')).toContainText('Imported Via File');

    fs.unlinkSync(tmpPath);
  });

  test('imported deck sideboard guide is preserved', async ({ page }) => {
    await page.goto('/fab-deck-viewer/');

    const exportPayload = {
      format: 'fab-deck-viewer/v1',
      name: 'Sideboard Import Test',
      decklist: '3 Fry (red)\n3 Sink Below (blue)',
      sideboardGuide: [
        {
          id: 'kayo',
          hero: 'Kayo',
          rating: 'favoured',
          goFirst: 'first',
          note: '',
          cardsOutRaw: '2 Fry (red)',
        },
      ],
    };

    const tmpPath = path.join(os.tmpdir(), 'test-sb-import.json');
    fs.writeFileSync(tmpPath, JSON.stringify(exportPayload));

    await page.locator('#file-import-input').setInputFiles(tmpPath);
    await page.waitForSelector('#tab-btn-sideboard', { state: 'visible' });
    await page.click('#tab-btn-sideboard');
    await page.waitForSelector('#sideboard-content', { state: 'visible' });

    await expect(page.locator('#sideboard-content')).toContainText('Kayo');

    fs.unlinkSync(tmpPath);
  });

  test('importing a file without a decklist shows an error toast', async ({ page }) => {
    await page.goto('/fab-deck-viewer/');

    const tmpPath = path.join(os.tmpdir(), 'test-bad-import.json');
    fs.writeFileSync(tmpPath, JSON.stringify({ name: 'No Decklist' }));

    await page.locator('#file-import-input').setInputFiles(tmpPath);
    await page.waitForSelector('#toast.toast-visible', { state: 'attached' });

    await expect(page.locator('#toast')).toContainText('missing decklist');

    fs.unlinkSync(tmpPath);
  });

  test('adding a new deck does not show warnings for existing decks in the list', async ({ page }) => {
    await seedDeck(page, SEED_DECK);
    await page.goto('/fab-deck-viewer/');

    // View the existing deck first to load the db
    await page.locator('.deck-row:not(.deck-row-preset)').first().click();
    await page.waitForSelector('#detail-name', { state: 'visible' });

    // Navigate back to the list
    await page.click('#btn-back-from-detail');
    await page.waitForSelector('#deck-list', { state: 'visible' });

    // Go to import form and create a new deck
    await page.click('#btn-go-import');
    await page.fill('#deck-name', 'New Test Deck');
    await page.fill('#decklist', '3 Fry (red)\n3 Pummel (red)');
    await page.click('#btn-import');

    // Should navigate to detail view of the new deck
    await page.waitForSelector('#detail-name', { state: 'visible' });

    // Navigate back to the list
    await page.click('#btn-back-from-detail');
    await page.waitForSelector('#deck-list', { state: 'visible' });

    // No deck-row-equip-warn divs should be visible for decks with unrecognized cards
    // (db is mocked empty so all card lookups fail — warnings must be suppressed)
    const warnings = page.locator('.deck-row-equip-warn');
    await expect(warnings).toHaveCount(0);
  });
});

test.describe('deck validation after delete', () => {
  const POOL_DECK = {
    id: 'sage-pool-deck-test',
    name: 'SAGE Pool Deck',
    // 45 colored cards — a pool deck with off-color sideboard options (> 40)
    decklist: '45x Fry (red)',
    cardCount: 45,
    savedAt: new Date().toISOString(),
  };

  const DECK_TO_DELETE = {
    id: 'deck-to-delete-test',
    name: 'Deck To Delete',
    decklist: '3x Fry (red)',
    cardCount: 3,
    savedAt: new Date().toISOString(),
  };

  test.beforeEach(async ({ page }) => {
    // Mock db with Fry as a colored card so all lookups succeed
    await page.route('**/card.json', route => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        {
          name: 'Fry',
          pitch: '1',
          cost: '0',
          power: '3',
          defense: '3',
          color: 'red',
          types: ['Action', 'Attack Action'],
          card_keywords: [],
          printings: [{ image_url: null, rarity: 'C' }],
        },
      ]),
    }));

    await page.addInitScript((decks) => {
      localStorage.setItem('fab_saved_decks_v1', JSON.stringify(decks));
    }, [POOL_DECK, DECK_TO_DELETE]);
  });

  test('deleting a deck does not show a false validation warning on remaining decks with more than 40 colored cards', async ({ page }) => {
    await page.goto('/fab-deck-viewer/');

    // Click "Deck To Delete" to trigger db load via viewDeck → ensureDb
    await page.locator('.deck-row:not(.deck-row-preset)', { hasText: 'Deck To Delete' }).click();
    await page.waitForSelector('#detail-name', { state: 'visible' });

    // Delete via actions menu
    await page.click('#btn-deck-actions');
    await page.waitForSelector('#btn-delete-deck', { state: 'visible' });
    await page.click('#btn-delete-deck');

    // Confirm deletion
    await page.waitForSelector('#delete-confirm-checkbox', { state: 'visible' });
    await page.check('#delete-confirm-checkbox');
    await page.click('#delete-deck-confirm');

    // Should be back on the list view showing only SAGE Pool Deck
    await page.waitForSelector('#deck-list', { state: 'visible' });
    await expect(page.locator('.deck-row', { hasText: 'SAGE Pool Deck' })).toBeVisible();

    // No deck-count warning should appear — pool decks with > 40 colored cards are valid
    await expect(page.locator('.deck-row-equip-warn', { hasText: /Silver Age deck has/ })).toHaveCount(0);
  });

  test('deck list still warns when a deck has fewer than 40 colored cards', async ({ page }) => {
    await page.goto('/fab-deck-viewer/');

    // View Deck To Delete (3 colored cards) to trigger db load
    await page.locator('.deck-row:not(.deck-row-preset)', { hasText: 'Deck To Delete' }).click();
    await page.waitForSelector('#detail-name', { state: 'visible' });

    // Go back to list
    await page.click('#btn-back-from-detail');
    await page.waitForSelector('#deck-list', { state: 'visible' });

    // "Deck To Delete" has only 3 colored cards — should warn (missing 37)
    await expect(page.locator('.deck-row-equip-warn', { hasText: /Silver Age deck has 3 deck cards/ })).toBeVisible();
  });
});
