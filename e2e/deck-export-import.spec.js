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
    await page.click('.deck-row');
    await page.waitForSelector('#btn-export-deck', { state: 'visible' });
    await expect(page.locator('#btn-export-deck')).toBeVisible();
  });

  test('export triggers a file download with correct filename', async ({ page }) => {
    await seedDeck(page, SEED_DECK);
    await page.goto('/fab-deck-viewer/');
    await page.click('.deck-row');
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
    await page.click('.deck-row');
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
});
