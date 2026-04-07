# Feature Request: Card Memory Game

## Overview

A standalone training tool where the user draws a random sequence of cards from a saved deck, memorizes them one by one, and is then tested on whether they can recall the sequence in order by clicking cards from a pool of all unique cards in that deck.

---

## User Flow

```
Setup Screen → Memorization Phase → Recall Phase → Result Screen
```

---

## Step-by-Step Plan

### Step 1 – New Page

Create `fab-card-memory/index.html` as a self-contained app, consistent with the site's dark theme and existing design system (same CSS variables, Inter font, sticky nav, footer).

Link it from the main hub (`index.html`) alongside the deck viewer.

---

### Step 2 – Setup Screen

The entry point where the user configures their session.

**Elements:**
- **Deck selector** — Dropdown populated from `localStorage` key `fab_saved_decks_v1` (same storage the deck viewer uses). Each option shows the deck name and saved date.
- **"Create new deck" link** — If no decks are saved, show a prompt. Always show a secondary link pointing to `../fab-deck-viewer/` for deck creation/saving.
- **Card count input** — Number input: how many cards the game will cycle through. Minimum 1, maximum = total card count of the selected deck (accounting for quantities). Default suggestion: 10.
- **Start button** — Disabled until a deck is selected and a valid count is entered.

---

### Step 3 – Memorization Phase

The user sees cards one at a time and memorizes the sequence.

**Mechanics:**
- Randomly sample N cards from the selected deck. Sampling respects card quantities as weights (a card with 3 copies is 3× more likely to appear than a 1-of). Duplicates are allowed in the sequence.
- Display one card at a time: large centered card image, card name below.
- **Advance on interaction** — clicking or tapping anywhere on the card/screen shows the next card. No auto-advance timer.
- Progress indicator in the corner: `Card 3 / 10`.
- Subtle entrance animation on each card (fade-in or slide-up).
- After the final card: a short "Get ready…" transition, then the Recall Phase begins.

---

### Step 4 – Recall Phase

The user reconstructs the sequence they just saw by clicking cards in order.

**Layout:**
- **Target slot row** at the top — shows N numbered slots (1 through N). As the user picks correctly, slots fill with the card image. Incorrect picks briefly flash the correct card in that slot before moving on.
- **Card pool grid** below — all unique cards in the deck displayed as a clickable grid (same 130px card style as the deck viewer). Cards are sorted by pitch color for readability, not shuffled.

**Interaction per pick:**
- The game always asks for the next card in the sequence (position 1, then 2, etc.).
- **Correct pick:**
  - Green glow + scale-up animation on the clicked card.
  - Slot fills with the card image and a green checkmark badge.
  - Score increments by 1.
  - Move to next position.
- **Incorrect pick:**
  - Red shake animation on the clicked card.
  - The correct card in the pool briefly pulses/glows to reveal itself.
  - Slot fills with the correct card image and a red ✗ badge.
  - Score does not increment.
  - Move to next position automatically (short delay ~800ms so user can see the reveal).
- Cards in the pool are never disabled or removed — the same card can be the answer multiple times.

---

### Step 5 – Result Screen

Shown after all N positions have been evaluated.

**Elements:**
- Large score display: `7 / 10`
- A replay of the full sequence: each card shown in order with a green ✓ or red ✗ overlay, so the user can review what they got right and wrong.
- Two action buttons:
  - **Play again** — returns to the Setup Screen with the same deck and count pre-filled.
  - **Change settings** — returns to the Setup Screen cleared.

---

## Technical Notes

### Card Data
- Reuse the same card database fetch from `https://raw.githubusercontent.com/the-fab-cube/flesh-and-blood-cards/omens-of-the-third-age/json/english/card.json` (already familiar to the codebase).
- Cache in memory (or `sessionStorage`) for the session.

### Sampling Logic
```
Expand deck into a weighted list (3× copies = 3 entries), shuffle it,
take the first N entries as the sequence.
```

### State Machine
The app moves through four explicit states managed in JS:
`SETUP → MEMORIZE → RECALL → RESULT`

Each state renders its own section; others are hidden via CSS.

### Animations
Use CSS `@keyframes` only — no animation libraries. Key animations needed:
- Card entrance: `fadeSlideIn`
- Correct pick: `correctPulse` (green glow + scale)
- Incorrect pick: `incorrectShake` (horizontal shake + red glow)
- Slot fill: `slotFill` (scale from 0.8 to 1.0)

### Persistence
No new localStorage keys needed. Deck data is read-only from `fab_saved_decks_v1`.

---

## Open Questions / Future Ideas

- Should the card pool in the Recall Phase be filtered to only cards that appear in the drawn sequence, or all unique cards in the full deck? (Smaller pool = easier, larger pool = harder mode.)
- Optional: a hard mode where the card name is hidden during memorization (image only).
- Optional: keyboard shortcuts (arrow keys to advance, number keys to pick).
