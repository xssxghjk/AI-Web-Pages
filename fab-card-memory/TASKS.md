# Memory Game — Task Breakdown

Each task is one prompt. Complete them in order.

---

## ✅ Task 1 — Page shell

Create `fab-card-memory/index.html` as a self-contained page consistent with the site's dark theme (same CSS variables, Inter font, sticky nav, footer). Include the four state sections (`#screen-setup`, `#screen-memorize`, `#screen-recall`, `#screen-result`) as empty `<div>`s. Only the setup section is visible by default; the rest are hidden via CSS. Add a JS `STATE` variable and a `showScreen(name)` helper that swaps visibility. No other logic yet.

---

## ✅ Task 2 — Hub link

Add a link card for the Card Memory Game to `index.html`, grouped alongside the existing FaB Deck Viewer entry.

---

## ✅ Task 3 — Setup Screen

Populate `#screen-setup` with:
- A dropdown (`#deck-select`) populated from `localStorage` key `fab_saved_decks_v1`. Each `<option>` shows the deck name and saved date.
- A fallback message + link to `../fab-deck-viewer/` when no decks are saved.
- A number input (`#card-count`) with min 1, max = total weighted cards in the selected deck, default value 10.
- A **Start** button that is disabled until a deck is selected and a valid count is entered.

Clicking Start calls `startGame()` (stub for now).

---

## ✅ Task 4 — Card data fetch

Implement `fetchCardDb()`: fetch the card JSON from `https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/omens-of-the-third-age/json/english/card.json`, cache the result in `sessionStorage` under the key `fab_card_db`, and return it. Call this when the Start button is clicked (before entering the memorize phase) so the data is ready.

---

## ✅ Task 5 — Weighted sampling

Implement `buildSequence(deck, cardDb, n)`:
- For each card entry in the deck, compute `weight = quantity × pitchMultiplier` (blue pitch 3 → ×3, yellow pitch 2 → ×2, red/none → ×1).
- Expand into a weighted list, shuffle it, and take the first `n` entries.
- Return the array of card objects (with at least `id`, `name`, `image_url`, `pitch`).

Call this from `startGame()` and store the result as the current sequence.

---

## ✅ Task 6 — Memorization Phase

Populate `#screen-memorize` and implement the phase:
- Show one card at a time: large centered card image + card name below it.
- Progress indicator in the corner: `Card 3 / 10`.
- Clicking anywhere on the card/screen advances to the next card.
- Each card entrance uses a `fadeSlideIn` CSS `@keyframes` animation.
- After the last card, show a "Get ready…" overlay for ~1 s, then call `startRecall()` (stub).

---

## ✅ Task 7 — Recall Phase

Populate `#screen-recall` and implement the phase:
- **Target slot row** at the top — N numbered slots. Filled slots show the card image with a green ✓ or red ✗ badge.
- **Card pool grid** below — all unique cards in the deck as 130 px clickable cards, sorted by pitch color (blue → yellow → red → non-pitch).
- On each pick:
  - **Correct:** green glow + scale animation on clicked card; slot fills with green ✓ badge; score +1; advance to next position.
  - **Incorrect:** red shake animation on clicked card; correct card in pool briefly pulses; slot fills with red ✗ badge; auto-advance after 800 ms.
- When all positions are filled, call `showResult()` (stub).

Use CSS `@keyframes` only: `correctPulse`, `incorrectShake`, `slotFill`.

---

## ✅ Task 8 — Result Screen *(completes the basic game)*

Populate `#screen-result` and implement `showResult()`:
- Large score display: `7 / 10`.
- Full sequence replay: each card in order with a green ✓ or red ✗ overlay.
- Two buttons:
  - **Play again** — returns to Setup Screen with the same deck and count pre-filled.
  - **Change settings** — returns to Setup Screen with fields cleared.
