# Design Guide — AI Web Pages

Derived from `index.html` (the landing hub). All micro-pages must follow this guide.

---

## Color Palette

```css
:root {
  /* ── Base ── */
  --bg:           #0a0a0c;   /* page background */
  --surface:      #111114;   /* card / panel background */
  --surface-2:    #18181d;   /* hover state, nested surfaces */
  --border:       #222228;   /* dividers, card borders */
  --border-2:     #2e2e36;   /* secondary borders, separators */
  --accent:       #6c5ce7;   /* primary interactive color (purple) */
  --accent-dim:   rgba(108, 92, 231, 0.15); /* accent tint for backgrounds */
  --text:         #e2e2ea;   /* primary text */
  --muted:        #6b6b7e;   /* secondary text, placeholders */
  --muted-2:      #4a4a5a;   /* footer text, disabled states */

  /* ── Semantic — Status (trips) ── */
  --upcoming:        #f59e0b;
  --upcoming-bg:     rgba(245,158,11,0.08);
  --upcoming-border: rgba(245,158,11,0.25);
  --ongoing:         #22c55e;
  --ongoing-bg:      rgba(34,197,94,0.08);
  --ongoing-border:  rgba(34,197,94,0.25);
  --past:            #94a3b8;   /* neutral slate for past items */
  --past-bg:         rgba(148,163,184,0.08);
  --past-border:     rgba(148,163,184,0.25);
  --planning:        #14b8a6;   /* teal — avoids conflict with accent */
  --planning-bg:     rgba(20,184,166,0.08);
  --planning-border: rgba(20,184,166,0.25);

  /* ── Semantic — Tournament Tiers ── */
  --t1:        #6c5ce7;  /* RTN / PQ — accent */
  --t1-bg:     rgba(108,92,231,0.08);
  --t1-border: rgba(108,92,231,0.25);
  --t2:        #22c55e;  /* Battleground / Showdown — green */
  --t2-bg:     rgba(34,197,94,0.08);
  --t2-border: rgba(34,197,94,0.25);
  --t3:        #f59e0b;  /* Calling — amber */
  --t3-bg:     rgba(245,158,11,0.08);
  --t3-border: rgba(245,158,11,0.25);
  --t4:        #e879f9;  /* Worlds / Pro Tour — fuchsia */
  --t4-bg:     rgba(232,121,249,0.08);
  --t4-border: rgba(232,121,249,0.25);

  /* ── Semantic — Results ── */
  --win:      #22c55e;
  --win-bg:   rgba(34,197,94,0.08);
  --loss:     #ef4444;
  --loss-bg:  rgba(239,68,68,0.08);
  --red:      #ef4444;
  --green:    #22c55e;

  /* ── Semantic — Checklist Tags ── */
  /* hotel  → accent  (#6c5ce7) */
  /* event  → amber   (#f59e0b) */
  /* flight → fuchsia (#e879f9) */
  /* misc   → muted   (#94a3b8) */
}
```

---

## Typography

```css
font-family: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
-webkit-font-smoothing: antialiased;
```

| Role | Size | Weight | Notes |
|---|---|---|---|
| Page h1 | `clamp(1.75rem, 4vw, 2.5rem)` | 700 | Hub only |
| Section h1 | `clamp(1.3rem, 3vw, 1.9rem)` | 800 | Micro-page heroes |
| Card h2 | `1rem` | 600 | Hub card titles |
| Tile title | `1.1rem` | 800 | Micro-page tile titles |
| Body text | `0.875rem` | 400 | `line-height: 1.65` |
| Meta / muted | `0.875rem` | 400 | color: `--muted` |
| Labels / badges | `0.62–0.68rem` | 700–800 | `letter-spacing: 0.1em`, `text-transform: uppercase` |
| Nav text | `0.88rem` | 700 | |
| Nav back link | `0.82rem` | 400 | color: `--muted` |

---

## Layout

- **Max width:** `1100px` for list/hub pages · `1000px` for grid-list micro-pages · `860px` for content/detail pages
- **Side padding:** `2rem` desktop · `1.25rem` mobile
- **Body:** `display: flex; flex-direction: column; min-height: 100vh` (hub) or standard block with `min-height: 100vh`

---

## Components

### Sticky Nav (all micro-pages)
```html
<nav>
  <a class="nav-back" href="../">← Hub</a>
  <span class="nav-sep">|</span>
  <span class="nav-title">Page Title</span>
  <!-- optional: <ul class="nav-links">…</ul> pushed to margin-left: auto -->
</nav>
```
- Height: `52px`
- Background: `rgba(10,10,12,0.88)` + `backdrop-filter: blur(12px)`
- Border-bottom: `1px solid var(--border)`

### Hero Section (micro-pages)
```html
<header class="hero">
  <h1>Title</h1>
  <p>Subtitle</p>
  <!-- optional: <div class="hero-stats">…</div> -->
</header>
```
- Padding: `1.5rem 1.5rem 1.25rem`
- Text-align: center
- Background: `linear-gradient(180deg, var(--accent-dim) 0%, transparent 100%)`
- Border-bottom: `1px solid var(--border)`

### Cards (hub style — used on index)
- Grid with `gap: 1px` using `background: var(--border)` as the gap color
- Card bg: `--surface`, hover: `--surface-2`
- Padding: `1.75rem 2rem`
- Category label: `0.68rem`, `600`, uppercase, `letter-spacing: 0.12em`, color: `--accent`

### Tiles (micro-page style)
- Background: `--surface`, border: `1px solid var(--border)`
- Border-radius: `12–14px`
- Left accent border: `3px` in tier/status color
- Hover: `transform: translateY(-2px)` + `box-shadow: 0 8px 24px rgba(0,0,0,0.35)`

### Stat Pills (hero stats)
```css
.stat-pill {
  font-size: 0.8rem; font-weight: 700;
  padding: 0.3rem 0.85rem; border-radius: 999px;
  background: var(--surface); border: 1px solid var(--border-2);
  color: var(--muted);
}
```

### Filter System (toggle bar + collapsible panel)
- Toggle bar: `--surface` bg, `0.55rem 1.5rem` padding
- Active filter badge: pill style, `--accent` tinted background + border
- Filter pills: `0.72rem`, `600`, pill shape, `--border-2` default border
- Active pill: `--accent-dim` bg, `rgba(108,92,231,0.45)` border, `--accent` text

### Checklist Items
- Bg: `--surface`, border: `--border`, hover border: `rgba(108,92,231,0.35)` (accent)
- Done: `rgba(34,197,94,0.04)` bg, `rgba(34,197,94,0.2)` border
- Checkbox done: `--green` background

### Progress Bar
- Track: `--border`, 4px height
- Fill: `linear-gradient(90deg, var(--accent), var(--green))`

### Footer (all pages)
```html
<footer>
  <span>Built with Claude</span>
  <a href="https://github.com/xssxghjk/AI-Web-Pages" target="_blank" rel="noopener">View on GitHub</a>
</footer>
```
- Padding: `1.75rem 2rem`
- Font-size: `0.78rem`, color: `--muted-2`
- Border-top: `1px solid var(--border)`
- Flex row, space-between
- Link color: `--muted`, hover: `--text`

---

## Interaction / Motion

- Transition speed: `0.15s` for color/background · `0.2s` for color-only changes
- Hover lift: `transform: translateY(-2px)` on tiles/cards with box-shadow
- Arrow nudge: `transform: translateX(3px)` on `→` icons inside hovered links
- No heavy animations — subtle and fast

---

## Responsive Breakpoints

- **640px** (hub) / **600px** (micro): single-column grid, remove card descriptions, reduce padding
- Nav: hide `.nav-links` secondary links on mobile

---

## Extended Notes

- `--gold` (used in trip detail pages for calling events) = `#f59e0b` = `--upcoming` / `--t3`
- `--purple` (used in trip detail pages for pro tour events) = `#e879f9` = `--t4`
- `--accent2` (lighter accent, e.g. for tag text) = `#9b8ff5` (light purple)
- Tournament prep accent (orange `#f97316` in old version) → now uses `--accent` (`#6c5ce7`) for consistency
