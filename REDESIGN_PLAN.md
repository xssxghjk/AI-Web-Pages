# UI Redesign Plan

Full application redesign to comply with the UI Design Standards in `CLAUDE.md`.

## Current Problems

All pages violate the guidelines in the same ways:
- `Inter` font used everywhere (explicitly banned)
- Identical dark `#0d0d0d` + blue `#3b82f6` accent palette across every page
- No animations or motion
- Predictable hero+list layouts with no distinctive character
- Every page converges on the same aesthetic

---

## Aesthetic Direction Per Page

| Page | Tone | Theme |
|------|------|-------|
| `nav.js` | Refined/editorial | Dark — distinctive, with character |
| `calendar/` | Editorial/magazine | **Light** — newspaper grid, bold date numbers |
| `trips/` | Luxury travel diary | **Dark** — cream-on-black, serif headlines |
| `trip/` | Soft editorial | **Light** — travel journal feel |
| `tcg-tournament-reports/` | Brutalist/raw | **Dark** — high-contrast, slab serif |
| `tcg-tournament-prep/` | Sports analytics | **Dark** — charcoal + sharp amber |
| `fab-deck-viewer/` | Art deco/geometric | **Light** — gold on off-white |
| `fab-card-memory/` | Playful/toy-like | **Light** — saturated pastels |
| `fab-pitch-simulator/` | Retro-futuristic terminal | **Dark** — phosphor green on black |
| `marathon-training/` | Organic/natural | **Light** — earthy tones |
| `project-stats/` | Cyberpunk terminal | **Dark** — cyan scanlines |
| `404.html` | Brutalist minimal | **Light** — giant oversized "404" |
| Trip pages (`rotterdam-2026/`, etc.) | Luxury travel (city-specific) | **Dark** — variant of trips aesthetic |

---

## Step-by-Step Execution Order

### Step 1 — `nav.js` (do this first, affects all pages)

- Replace `Inter`/system fonts with a distinctive font loaded via Google Fonts (e.g. `DM Mono`, `Syne`, or `Space Mono`)
- Keep dark sidebar but add atmosphere: noise texture overlay, subtle vertical gradient, or thin color-shifting border
- Add staggered CSS animation on sidebar links (fade + slide in on page load)
- Active link: replace flat blue with an underline or dot accent; allow pages to override via a CSS variable
- Brand name: make it typographically distinctive — larger, tracked-out, or in a contrasting font
- **Version bump**: PATCH

---

### Step 2 — `calendar/index.html`

- **Tone**: Editorial/magazine
- **Theme**: Light
- **Fonts**: Playfair Display (headings) + DM Serif Text (body) via Google Fonts
- **Colors**: `#faf7f2` bg, `#1a1a1a` text, `#c8102e` accent (editorial red)
- **Layout**: Month name as a massive background watermark; days in a tight editorial grid with asymmetric spacing
- **Motion**: Calendar cells reveal with staggered fade on load; event modals slide up from bottom
- **Details**: Subtle paper-grain noise texture on background via CSS `::before` pseudo-element
- **Version bump**: MINOR

---

### Step 3 — `trips/index.html` + `trip/index.html`

- **Tone**: Luxury travel diary
- **Theme**: Dark
- **Fonts**: Cormorant Garamond (display) + Lora (body) via Google Fonts
- **Colors**: `#0c0a08` bg, `#e8dcc8` text (warm cream), `#b8860b` accent (dark gold)
- **Layout**: Trip cards as tall portrait tiles with large location typography; diagonal or angled dividers between sections
- **Motion**: Cards slide in from alternating sides on scroll; slow parallax on hero
- **Details**: Map-grid pattern or vintage travel-stamp decorative SVG overlays
- **Version bump**: MINOR (×2 — one per file)

---

### Step 4 — `tcg-tournament-reports/index.html` + `detail.html`

- **Tone**: Brutalist/raw sports record
- **Theme**: Dark
- **Fonts**: Bebas Neue (headings) + IBM Plex Mono (data/body) via Google Fonts
- **Colors**: `#0a0a0a` bg, `#f0f0f0` text, `#ff2d20` accent (aggressive red)
- **Layout**: Report list as a dense ledger/table format (not cards); win/loss as stark symbols; detail page uses two-column split (matchups left, notes right)
- **Motion**: Rows flash in sequentially on load; hover lifts row with sharp left-border color flash
- **Details**: Large oversized round number in hero; decorative horizontal rules with tick marks
- **Version bump**: MINOR (×2)

---

### Step 5 — `tcg-tournament-prep/index.html` + `detail.html`

- **Tone**: Sports analytics dashboard
- **Theme**: Dark
- **Fonts**: Syne (headings) + JetBrains Mono (data) via Google Fonts
- **Colors**: `#111118` bg, `#e2e8f0` text, `#f59e0b` accent (sharp amber)
- **Layout**: Prep entries as large stat cards with prominent hero numbers; detail page with sidebar breakdown
- **Motion**: Numbers count up on page load; cards have sharp border-glow on hover
- **Details**: Thin grid lines as background texture; tag-style format indicators
- **Version bump**: MINOR (×2)

---

### Step 6 — `fab-deck-viewer/index.html`

- **Tone**: Art deco/geometric
- **Theme**: Light
- **Fonts**: Cinzel (headings) + Spectral (body) via Google Fonts
- **Colors**: `#fdf6e3` bg, `#2c1810` text, `#c9a227` gold accent
- **Layout**: Geometric art-deco borders on card display area; structured symmetrical grid
- **Motion**: Cards enter with an elegant fade and slight scale; hover adds a gold glow border
- **Details**: Art-deco geometric corner ornaments as SVG decorations
- **Version bump**: MINOR

---

### Step 7 — `fab-card-memory/index.html`

- **Tone**: Playful/toy-like
- **Theme**: Light
- **Fonts**: Fredoka One (headings) + Nunito (body) via Google Fonts
- **Colors**: `#fff9f0` bg, vivid saturated card colors for the grid
- **Layout**: Cards in a tight grid with rounded corners and drop shadows
- **Motion**: Card flip with satisfying 3D CSS `rotateY` transform; match animation with a pop + scale bounce
- **Details**: Soft pastel color scheme; playful confetti effect on game completion
- **Version bump**: MINOR

---

### Step 8 — `fab-pitch-simulator/index.html`

- **Tone**: Retro-futuristic terminal
- **Theme**: Dark
- **Fonts**: Share Tech Mono throughout (single font — monospaced only)
- **Colors**: `#000800` bg, `#00ff41` phosphor green text, `#003b00` surface
- **Layout**: All UI elements styled as terminal windows with `>` prompts and blinking cursors
- **Motion**: Text types out on load; results appear line by line like terminal output
- **Details**: Scanline overlay via CSS `repeating-linear-gradient`; subtle CRT glow effect on text
- **Version bump**: MINOR

---

### Step 9 — `marathon-training/index.html`

- **Tone**: Organic/natural
- **Theme**: Light
- **Fonts**: Playfair Display + Source Serif 4 via Google Fonts
- **Colors**: `#f4f1eb` bg, `#3d2b1f` text, `#7eb84e` green accent
- **Layout**: Training log as a vertical timeline; stats in organic-shaped containers
- **Motion**: Timeline segments draw in on scroll; progress bars animate from 0 on entry
- **Details**: Subtle topographic line pattern in background; leaf or trail SVG decorations
- **Version bump**: MINOR

---

### Step 10 — `project-stats/index.html`

- **Tone**: Cyberpunk data terminal
- **Theme**: Dark
- **Fonts**: Orbitron (headings) + Fira Code (stats/body) via Google Fonts
- **Colors**: `#030712` bg, `#67e8f9` cyan accent, `#0c1929` surface
- **Layout**: Stats dashboard with overlapping panels, grid-breaking elements
- **Motion**: Stats count up from zero on load; bar charts animate width from 0; subtle scanline flicker
- **Details**: Thin cyan grid overlay; glow effects on key numbers; decorative bracket `[ ]` ornaments
- **Version bump**: MINOR

---

### Step 11 — `404.html`

- **Tone**: Brutalist minimal
- **Theme**: Light
- **Fonts**: Bebas Neue (giant "404") + IBM Plex Mono (body)
- **Colors**: `#f5f5f5` bg, `#0a0a0a` text, `#ff2d20` accent
- **Layout**: Giant full-viewport "404" as background element; centered minimal copy; nav link below
- **Motion**: "404" glitches briefly on load (CSS keyframe color shift)
- **Version bump**: PATCH

---

### Step 12 — Trip HTML pages (`rotterdam-2026/`, `hamburg-2026/`, `hamburg-calling-2026/`, `yokohama-pro-tour/`, `prague-omens-2026/`)

Apply the Luxury Travel Diary aesthetic (Step 3) but with city-specific color accent variations:
- Rotterdam: industrial steel-blue `#4a6fa5`
- Hamburg: harbour teal `#2a7f72`
- Yokohama: cherry-blossom rose `#c45b78`
- Prague: gothic violet `#6b4f8e`

- **Version bump**: MINOR per file

---

## Rules for Each Step

1. Load all non-system fonts from Google Fonts via `<link>` in `<head>`
2. Define all colors as CSS variables in `:root` — do not hardcode hex values in rules
3. All animations must use CSS keyframes or the Web Animations API — no JS animation libraries
4. Every page must have at least one scroll-triggered or page-load reveal animation
5. Run `npm test` after completing each step — fix any failures before moving to the next
6. Bump `version.json` after completing all steps (single MINOR bump covers the whole redesign)

---

## Completion Checklist

- [ ] Step 1 — `nav.js`
- [ ] Step 2 — `calendar/index.html`
- [ ] Step 3 — `trips/index.html` + `trip/index.html`
- [ ] Step 4 — `tcg-tournament-reports/index.html` + `detail.html`
- [ ] Step 5 — `tcg-tournament-prep/index.html` + `detail.html`
- [ ] Step 6 — `fab-deck-viewer/index.html`
- [ ] Step 7 — `fab-card-memory/index.html`
- [ ] Step 8 — `fab-pitch-simulator/index.html`
- [ ] Step 9 — `marathon-training/index.html`
- [ ] Step 10 — `project-stats/index.html`
- [ ] Step 11 — `404.html`
- [ ] Step 12 — Trip HTML pages
- [ ] `version.json` bumped
- [ ] `npm test` passing
