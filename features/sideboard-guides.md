# Feature: Sideboard Guides

## Context

`fab-deck-viewer/index.html` is a single-file app (HTML + CSS + JS in one file) with no build step.
All state is persisted to `localStorage` via `loadDecks()` / `saveDecks()`.

### FaB sideboarding mechanics

In Flesh and Blood there is no separate sideboard pool. Before each game, the opponent
announces their hero and you cut some cards out of your 80-card deck. The remaining cards
are what you play. A sideboard guide is therefore a set of per-hero entries that each
describe which cards to remove.

---

## Data model

Extend each deck object stored in localStorage with a `sideboardGuide` field:

```js
// Full deck object shape (existing fields + new field)
{
  id: 'abc123',              // unchanged
  name: 'Briar Redline',     // unchanged
  decklist: '...',           // unchanged — raw paste text
  cardCount: 80,             // unchanged
  savedAt: '2026-04-01T...',  // unchanged

  // NEW — defaults to [] for decks that predate this feature
  sideboardGuide: [
    {
      id: 'kayo',                      // lowercase slug derived from hero name, used as DOM id prefix
      hero: 'Kayo',                    // display name, free text
      rating: 'favoured',              // one of: 'auto-win' | 'favoured' | 'even' | 'unfavoured' | 'auto-loss'
      goFirst: null,                   // one of: 'first' | 'second' | null (null = doesn't matter)
      note: 'Block efficiently...',    // freeform text, may be empty string
      cardsOutRaw: '2 Fry (red)\n1 Electrify (blue)', // raw text, same format as decklist
    }
  ]
}
```

### cardsOutRaw format

Identical to the existing decklist paste format. Reuse `parseDecklist(raw)` from the
existing code to parse it. Each line: `<qty> <card name> (<pitch>)` where pitch is
optional. Example:

```
2 Fry (red)
1 Electrify (blue)
3 Sink Below
```

`parseDecklist` returns `[{ qty, name, hint }]` where `hint` is `'red'|'yellow'|'blue'|null`.

---

## Files to modify

1. **`fab-deck-viewer/index.html`** — all changes go here (single-file app)
2. **`version.json`** — bump MINOR: `3.5.0` → `3.6.0` (new feature on existing page)

No new files are needed.

---

## HTML changes

### Add a third tab button

In the tab bar (around line 823), add after the existing two tab buttons:

```html
<button class="tab-btn" id="tab-btn-sideboard">Sideboard</button>
```

### Add the third tab panel

After `#tab-analysis` (around line 835), add:

```html
<div id="tab-sideboard" class="tab-panel" style="display:none">
  <div id="sideboard-content"></div>
</div>
```

---

## CSS changes

Add styles for the following new components. Match the existing aesthetic exactly:
dark theme, Cormorant Garamond / DM Serif Text fonts, CSS variables from `:root`.

### Rating badge colors

```
auto-win:   background #16a34a, text #fff
favoured:   background #15803d, text #fff
even:       background var(--border-2), text var(--muted-2)
unfavoured: background #b45309, text #fff
auto-loss:  background #991b1b, text #fff
```

### Go-first indicator colors

```
first:  color var(--accent)
second: color var(--blue-c)
null:   color var(--muted)
```

### Key component styles needed

- `.sb-overview` — summary strip (matchup counts by rating)
- `.sb-matchup-row` — clickable accordion row for each matchup
- `.sb-matchup-row.expanded` — expanded state
- `.sb-matchup-body` — accordion body (cards out + note), hidden by default
- `.sb-rating-badge` — pill badge for rating
- `.sb-cards-out` — grid of cut cards inside the accordion body (reuse `.card-grid` layout)
- `.sb-heatmap` — heatmap section container
- `.sb-heatmap-row` — one row per unique card (card name + bar + label)
- `.sb-heatmap-fill` — filled portion of the bar
- `.sb-cut-candidate` — class added when survivedMatchups ≤ 1 (amber highlight on label)
- `.sb-editor` — full editor form container
- `.sb-editor-field` — label + input wrapper
- `.sb-seg` — segmented control container (rating + go-first toggles)
- `.sb-seg-btn` — individual segment button
- `.sb-seg-btn.active` — selected segment
- `.sb-add-btn` — "+ Add matchup" button, styled like a secondary action

---

## JavaScript changes

All JS goes inside the existing IIFE in `index.html`.

### Helper: saveSideboardGuide(deckId, guide)

```js
function saveSideboardGuide(deckId, guide) {
  const decks = loadDecks();
  const deck = decks.find(d => d.id === deckId);
  if (!deck) return;
  deck.sideboardGuide = guide;
  saveDecks(decks);
}
```

### Helper: getSideboardGuide(deck)

```js
function getSideboardGuide(deck) {
  return Array.isArray(deck.sideboardGuide) ? deck.sideboardGuide : [];
}
```

### Helper: computeHeatmap(deckPairs, guide)

Returns an array of objects, one per unique card name in the deck, sorted by
`survivedMatchups` ascending (most-cut first):

```js
function computeHeatmap(deckPairs, guide) {
  const total = guide.length;
  // Build a map: cardName (lowercase) -> matchupsWhereCardIsCut (count of matchups)
  const cutCounts = {};
  for (const matchup of guide) {
    const cuts = parseDecklist(matchup.cardsOutRaw || '');
    const seen = new Set();
    for (const { name } of cuts) {
      const key = name.toLowerCase();
      if (!seen.has(key)) {
        cutCounts[key] = (cutCounts[key] || 0) + 1;
        seen.add(key);
      }
    }
  }
  // One entry per unique card name in the deck (by display name from first occurrence)
  const seen = new Set();
  const rows = [];
  for (const { entry } of deckPairs) {
    const key = entry.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    const matchupsCut = cutCounts[key] || 0;
    const survivedMatchups = total - matchupsCut;
    rows.push({ name: entry.name, matchupsCut, survivedMatchups, total });
  }
  rows.sort((a, b) => a.survivedMatchups - b.survivedMatchups);
  return rows;
}
```

**Signal:** a card with `survivedMatchups <= 1` (out in almost every matchup) is flagged
as a **cut candidate** — it may be worth removing from the deck entirely.

### Helper: slugify(hero)

```js
function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
```

Used to generate the `id` field when creating a new matchup. If a slug already exists in
the guide, append `-2`, `-3`, etc.

### renderSideboard(deck, deckPairs)

Called from `renderDetail` when the Sideboard tab is selected (lazy render, same pattern
as Analysis tab). Renders into `#sideboard-content`.

**Structure rendered:**

1. **Overview strip** — `X matchups · Y favoured · Z even · …` (only show non-zero ratings)
2. **Heatmap section** (only if `guide.length > 0`) — title "Card Coverage", one row per
   card sorted by survivedMatchups ascending. Bar shows `survivedMatchups / total` as a
   percentage fill. Label: `"X / Y matchups"`. Flag cut candidates with `.sb-cut-candidate`.
3. **Matchup list** — one `.sb-matchup-row` per matchup entry. Each row:
   - Collapsed: hero name, rating badge, go-first indicator, cards-out count (`"X cards out"`)
   - Clicking toggles expanded state
   - Expanded body: cards-out grid (reuse `makeCard` for each cut card — requires `db` to
     be loaded; if `db` is null show name-only fallback), go-first text, note text
4. **"+ Add matchup" button** — calls `openMatchupEditor(deck, deckPairs, null)`

### openMatchupEditor(deck, deckPairs, matchupIdOrNull)

Renders the editor form into `#sideboard-content`, replacing the guide view. If
`matchupIdOrNull` is non-null, pre-populates with the existing matchup data for editing.

**Editor fields:**

| Field | Element | Notes |
|---|---|---|
| Hero name | `<input type="text">` | Required, trimmed |
| Rating | Segmented control (5 buttons) | Default: `'even'` |
| Go first | Segmented control (3 buttons: First / Either / Second) | Default: `null` |
| Cards out | `<textarea rows="10">` | Same format as decklist, `parseDecklist` parses it |
| Gameplan note | `<textarea rows="4">` | Optional |

**Validation on save:**
- Hero name must be non-empty.
- Parse `cardsOutRaw` with `parseDecklist`. For each parsed card, check if its name
  (case-insensitive) exists in `deckPairs`. If any card is not found, show a warning
  message (do NOT block save — the card db may not be loaded or card may be misspelled).
- Warn if the total `qty` of cut cards exceeds 80.

**Save logic:**
1. Build the matchup object (generate `id` via `slugify` for new, preserve for edits).
2. For edits: replace the existing matchup in the guide array (match by `id`).
3. For new: push to end of guide array.
4. Call `saveSideboardGuide(deck.id, guide)`.
5. Re-render `renderSideboard(deck, deckPairs)`.

**Delete logic (edit mode only):**
- Confirm with `window.confirm('Delete this matchup?')`.
- Remove the matchup from the guide array, save, re-render.

**Cancel:** re-render `renderSideboard(deck, deckPairs)` without saving.

### Tab switching

Add a third tab handler alongside the existing two:

```js
document.getElementById('tab-btn-sideboard').addEventListener('click', () => {
  document.getElementById('tab-btn-decklist').className = 'tab-btn';
  document.getElementById('tab-btn-analysis').className = 'tab-btn';
  document.getElementById('tab-btn-sideboard').className = 'tab-btn active';
  document.getElementById('tab-decklist').style.display = 'none';
  document.getElementById('tab-analysis').style.display = 'none';
  document.getElementById('tab-sideboard').style.display = '';
  if (!sideboardRendered) {
    sideboardRendered = true;
    const deck = loadDecks().find(d => d.id === currentDeckId);
    if (deck) renderSideboard(deck, currentDeckPairs);
  }
});
```

Add two new variables alongside `let analysisAnimated = false`:

```js
let sideboardRendered = false;
let currentDeckPairs  = [];   // set in renderDetail so sideboard can access it
```

In `renderDetail`, after setting `analysisAnimated = false`, also set:

```js
sideboardRendered = false;
currentDeckPairs = pairs;
```

Also reset the sideboard tab button/panel to the hidden/inactive state in `renderDetail`:

```js
document.getElementById('tab-btn-sideboard').className = 'tab-btn';
document.getElementById('tab-sideboard').style.display = 'none';
```

---

## Behaviour details

### Accordion interaction

Only one matchup row is expanded at a time. Clicking an already-expanded row collapses it.
Clicking the edit icon/button inside a row opens the editor (stopPropagation so it doesn't
toggle the accordion).

### Cards-out display in expanded body

Reuse `makeCard(entry, card)` to render each cut card visually (card image + name + pitch
dot). Call `lookup(name, hint)` for each parsed card. If `db` is null (not yet loaded),
show a name-only text list instead (do not trigger a db fetch from the sideboard tab).

### Empty state

If `guide.length === 0`, show a simple empty state:
- Title: "No sideboard guides yet"
- Subtitle: "Add a matchup to start building your guide"
- Button: "+ Add matchup"

---

## Print / PDF notes (future-proofing)

The data is already print-ready. When a PDF feature is added later, each matchup renders as:

```
vs KAYO   ▸ Favoured   ▸ Go First

Cards out:
  2× Fry (red)
  1× Electrify (blue)

Gameplan:
  Block efficiently to preserve life...
```

No structural changes to the data model are needed for this. The `cardsOutRaw` field gives
the human-readable text directly; `parseDecklist` gives the structured form for visual
rendering.

---

## Versioning

Update `version.json` from `3.5.0` to `3.6.0` (MINOR: new feature on existing page).

---

## Tests

Add a new file `e2e/deck-viewer-sideboard.spec.js` with the following test cases.
Use `localStorage` injection to seed deck data — do not depend on the live card DB.

### Seed data helper

```js
const SEED_DECK = {
  id: 'test-deck-1',
  name: 'Test Briar',
  decklist: '3 Fry (red)\n3 Sink Below (blue)\n3 Pummel (red)',
  cardCount: 9,
  savedAt: new Date().toISOString(),
  sideboardGuide: []
};

async function seedDeck(page, deck) {
  await page.addInitScript((d) => {
    localStorage.setItem('fab_saved_decks_v1', JSON.stringify([d]));
  }, deck);
}
```

### Test cases

1. **Sideboard tab is visible on deck detail page**
   - Seed deck, open `/fab-deck-viewer/`, click into deck, assert `#tab-btn-sideboard` is visible.

2. **Empty state renders when guide is empty**
   - Seed deck with empty `sideboardGuide`, open sideboard tab, assert empty-state heading
     "No sideboard guides yet" is visible.

3. **Add matchup — saves and renders in list**
   - Open sideboard tab → click "+ Add matchup" → fill hero "Kayo", select rating "Favoured",
     set go-first "First", paste `"2 Fry (red)"` into cards-out textarea, click Save.
   - Assert matchup row with text "Kayo" and rating badge "Favoured" is visible.
   - Assert "2 cards out" is shown on the row.

4. **Expand matchup accordion**
   - Seed deck with one matchup (`cardsOutRaw: '2 Fry (red)'`), open sideboard tab,
     click the matchup row, assert the expanded body is visible and contains "Fry".

5. **Edit matchup — changes persist**
   - Seed deck with one matchup, open sideboard tab, click edit on the matchup,
     change hero name to "Ira", save. Assert "Ira" appears in the matchup list.

6. **Delete matchup**
   - Seed deck with one matchup, open sideboard tab, click edit, click Delete, confirm.
   - Assert empty state is visible again.

7. **Heatmap renders with correct cut candidate flag**
   - Seed deck with two matchups, both cutting "Fry".
   - Open sideboard tab, assert heatmap shows "Fry" flagged as a cut candidate
     (element has class `.sb-cut-candidate` or attribute that identifies it).

8. **Sideboard tab resets between deck navigations**
   - Seed two decks. Open deck 1, switch to sideboard tab, go back to list, open deck 2.
   - Assert `#sideboard-content` does not show deck 1's data.
