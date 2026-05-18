import { test, expect } from '@playwright/test';

// Minimal fixture exercising every filter branch:
//   - OMN card detected via set_id (NOT set_printing_unique_id)
//   - Majestic / Legendary / B (hero) rarities excluded
//   - Weapon / Equipment types excluded
//   - Classification: Illusionist, Runeblade, Wizard, Lightning, Generic
const FIXTURE = [
  // ── Should be INCLUDED ──────────────────────────────────────────────
  // Illusionist (Lightning+Illusionist → non-lightning class wins)
  { unique_id: 'i1', name: 'Illusionist Card A', color: 'Red',    pitch: '1', cost: '2', power: '3', defense: '2', types: ['Lightning','Illusionist','Action','Attack'], card_keywords: ['Phantasm'], printings: [{ set_id: 'OMN', set_printing_unique_id: 'hash1', id: 'OMN101', rarity: 'C' }] },
  { unique_id: 'i2', name: 'Illusionist Card B', color: 'Blue',   pitch: '3', cost: '0', power: '',  defense: '3', types: ['Lightning','Illusionist','Action'],         card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'hash2', id: 'OMN102', rarity: 'R' }] },
  // Runeblade
  { unique_id: 'r1', name: 'Runeblade Card A',   color: 'Red',    pitch: '1', cost: '2', power: '4', defense: '2', types: ['Lightning','Runeblade','Action','Attack'], card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'hash3', id: 'OMN201', rarity: 'C' }] },
  { unique_id: 'r2', name: 'Runeblade Card B',   color: 'Yellow', pitch: '2', cost: '1', power: '2', defense: '3', types: ['Lightning','Runeblade','Action'],         card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'hash4', id: 'OMN202', rarity: 'R' }] },
  // Wizard
  { unique_id: 'w1', name: 'Wizard Card A',      color: 'Blue',   pitch: '3', cost: '0', power: '',  defense: '3', types: ['Lightning','Wizard','Action'],            card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'hash5', id: 'OMN301', rarity: 'C' }] },
  { unique_id: 'w2', name: 'Wizard Card B',      color: 'Red',    pitch: '1', cost: '3', power: '5', defense: '',  types: ['Lightning','Wizard','Action','Attack'],    card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'hash6', id: 'OMN302', rarity: 'R' }] },
  // Lightning-only
  { unique_id: 'l1', name: 'Lightning Card',     color: 'Yellow', pitch: '2', cost: '1', power: '3', defense: '2', types: ['Lightning','Action','Attack'],            card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'hash7', id: 'OMN401', rarity: 'C' }] },
  // Generic (no class)
  { unique_id: 'g1', name: 'Generic Card',       color: 'Blue',   pitch: '3', cost: '0', power: '',  defense: '3', types: ['Generic','Action'],                       card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'hash8', id: 'OMN501', rarity: 'C' }] },

  // ── Should be EXCLUDED ─────────────────────────────────────────────
  // Majestic
  { unique_id: 'x1', name: 'Excluded Majestic',  color: 'Red',    pitch: '1', cost: '2', power: '6', defense: '',  types: ['Lightning','Illusionist','Action','Attack'], card_keywords: [], printings: [{ set_id: 'OMN', set_printing_unique_id: 'hashA', id: 'OMN601', rarity: 'M' }] },
  // Legendary
  { unique_id: 'x2', name: 'Excluded Legendary', color: '',       pitch: '',  cost: '',  power: '',  defense: '',  types: ['Lightning','Runeblade','Weapon','Sword','2H'], card_keywords: [], printings: [{ set_id: 'OMN', set_printing_unique_id: 'hashB', id: 'OMN602', rarity: 'L' }] },
  // Hero (B rarity)
  { unique_id: 'x3', name: 'Excluded Hero',      color: '',       pitch: '',  cost: '',  power: '',  defense: '',  types: ['Lightning','Illusionist','Hero','Young'],    card_keywords: [], printings: [{ set_id: 'OMN', set_printing_unique_id: 'hashC', id: 'OMN603', rarity: 'B' }] },
  // Weapon (even if rarity would pass)
  { unique_id: 'x4', name: 'Excluded Weapon',    color: '',       pitch: '',  cost: '',  power: '',  defense: '',  types: ['Lightning','Illusionist','Weapon','Orb','2H'], card_keywords: [], printings: [{ set_id: 'OMN', set_printing_unique_id: 'hashD', id: 'OMN604', rarity: 'C' }] },
  // Equipment
  { unique_id: 'x5', name: 'Excluded Equipment', color: '',       pitch: '',  cost: '',  power: '',  defense: '',  types: ['Generic','Equipment','Head'],                 card_keywords: [], printings: [{ set_id: 'OMN', set_printing_unique_id: 'hashE', id: 'OMN605', rarity: 'C' }] },
  // Non-OMN card (different set_id)
  { unique_id: 'x6', name: 'Excluded Other Set', color: 'Red',    pitch: '1', cost: '2', power: '3', defense: '2', types: ['Generic','Action'],                        card_keywords: [],          printings: [{ set_id: 'EVO', set_printing_unique_id: 'hashF', id: 'EVO001', rarity: 'C' }] },
];

test('omn set stats filters and classifies cards correctly', async ({ page }) => {
  // Intercept the external card API and return our controlled fixture
  await page.route('**flesh-and-blood-cards**card.json', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FIXTURE) })
  );

  await page.goto('/tcg-tournament-prep/omn-set-stats.html');

  // Stats panel should appear quickly once the (mocked) fetch resolves
  await expect(page.locator('#stats-content')).toBeVisible({ timeout: 5000 });
  await expect(page.locator('#loading-state')).not.toBeVisible();
  await expect(page.locator('#error-state')).not.toBeVisible();

  // Total and per-class pill counts
  await expect(page.locator('#pill-total')).toContainText('8 cards');
  await expect(page.locator('#pill-illusionist')).toContainText('Illusionist: 2');
  await expect(page.locator('#pill-runeblade')).toContainText('Runeblade: 2');
  await expect(page.locator('#pill-wizard')).toContainText('Wizard: 2');
  await expect(page.locator('#pill-lightning')).toContainText('Lightning: 1');
  await expect(page.locator('#pill-generic')).toContainText('Generic: 1');

  // Illusionist panel (active by default) shows 2 total cards
  const illusionistPanel = page.locator('#panel-illusionist');
  await expect(illusionistPanel.locator('.ov-pill').first().locator('.ov-val')).toHaveText('2');

  // Helper: click a tab via JS to avoid mobile-header pointer intercepts
  const clickTab = (tab) => page.evaluate(t =>
    document.querySelector(`.tab-btn[data-tab="${t}"]`).click(), tab
  );

  // Runeblade tab
  await clickTab('runeblade');
  await expect(page.locator('#panel-runeblade').locator('.ov-pill').first().locator('.ov-val')).toHaveText('2');

  // Wizard tab
  await clickTab('wizard');
  await expect(page.locator('#panel-wizard').locator('.ov-pill').first().locator('.ov-val')).toHaveText('2');

  // Lightning tab
  await clickTab('lightning');
  await expect(page.locator('#panel-lightning').locator('.ov-pill').first().locator('.ov-val')).toHaveText('1');

  // Generic tab
  await clickTab('generic');
  await expect(page.locator('#panel-generic').locator('.ov-pill').first().locator('.ov-val')).toHaveText('1');
});
