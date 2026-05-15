import { test, expect } from '@playwright/test';

// Minimal fixture – enough cards to render every section (tabs, charts, card grid)
const FIXTURE = [
  { unique_id: 'i1', name: 'Illusionist Card A', color: 'Red',    pitch: '1', cost: '2', power: '3', defense: '2', types: ['Lightning','Illusionist','Action','Attack'], card_keywords: ['Phantasm'], printings: [{ set_id: 'OMN', set_printing_unique_id: 'h1', id: 'OMN101', rarity: 'C' }] },
  { unique_id: 'i2', name: 'Illusionist Card B', color: 'Blue',   pitch: '3', cost: '0', power: '',  defense: '3', types: ['Lightning','Illusionist','Action'],         card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'h2', id: 'OMN102', rarity: 'R' }] },
  { unique_id: 'r1', name: 'Runeblade Card A',   color: 'Red',    pitch: '1', cost: '2', power: '4', defense: '2', types: ['Lightning','Runeblade','Action','Attack'], card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'h3', id: 'OMN201', rarity: 'C' }] },
  { unique_id: 'w1', name: 'Wizard Card A',      color: 'Blue',   pitch: '3', cost: '0', power: '',  defense: '3', types: ['Lightning','Wizard','Action'],            card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'h5', id: 'OMN301', rarity: 'C' }] },
  { unique_id: 'g1', name: 'Generic Card',       color: 'Blue',   pitch: '3', cost: '0', power: '',  defense: '3', types: ['Generic','Action'],                       card_keywords: [],          printings: [{ set_id: 'OMN', set_printing_unique_id: 'h8', id: 'OMN501', rarity: 'C' }] },
];

// Force phone viewport regardless of which Playwright project runs this file
test.use({ viewport: { width: 390, height: 844 } });

test.describe('OMN set stats – mobile overflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**flesh-and-blood-cards**card.json', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(FIXTURE) })
    );
    await page.goto('/omn-set-stats/');
    await expect(page.locator('#stats-content')).toBeVisible({ timeout: 5000 });
  });

  test('page has no horizontal overflow', async ({ page }) => {
    const { scrollWidth, clientWidth } = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
  });

  test('body does not exceed viewport width', async ({ page }) => {
    const overflow = await page.evaluate(() => {
      const vp = window.innerWidth;
      const offenders = [];
      function insideHScrollContainer(el) {
        let cur = el.parentElement;
        while (cur && cur !== document.body) {
          const ovX = window.getComputedStyle(cur).overflowX;
          if (ovX === 'auto' || ovX === 'scroll') return true;
          cur = cur.parentElement;
        }
        return false;
      }
      document.querySelectorAll('*').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > vp + 1 && !insideHScrollContainer(el)) {
          offenders.push({ tag: el.tagName, id: el.id, cls: el.className.toString().slice(0, 60), right: rect.right });
        }
      });
      return offenders;
    });
    expect(overflow).toHaveLength(0);
  });

  test('hbar rows do not overflow their container', async ({ page }) => {
    const offenders = await page.evaluate(() => {
      const vp = window.innerWidth;
      return Array.from(document.querySelectorAll('.hbar-row')).filter(el => {
        return el.getBoundingClientRect().right > vp + 1;
      }).length;
    });
    expect(offenders).toBe(0);
  });

  test('analysis sections do not overflow viewport', async ({ page }) => {
    const offenders = await page.evaluate(() => {
      const vp = window.innerWidth;
      return Array.from(document.querySelectorAll('.analysis-section')).filter(el => {
        return el.getBoundingClientRect().right > vp + 1;
      }).length;
    });
    expect(offenders).toBe(0);
  });

  test('card grid does not overflow viewport', async ({ page }) => {
    const offenders = await page.evaluate(() => {
      const vp = window.innerWidth;
      return Array.from(document.querySelectorAll('.cards-grid')).filter(el => {
        return el.getBoundingClientRect().right > vp + 1;
      }).length;
    });
    expect(offenders).toBe(0);
  });
});
