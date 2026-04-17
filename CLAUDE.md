# Project Instructions

## Before Every Push

Always run the full test suite and fix any failures before pushing:

```bash
npm test
```

This runs all Playwright e2e tests across both desktop (`chromium`) and mobile (`mobile-chrome`) projects. All tests must pass before a push is made.

## Tool Usage

**Never use the Agent tool (subagents).** Do all work directly using the available tools (Read, Edit, Write, Bash, Grep, Glob, etc.). Do not delegate tasks to subagents under any circumstances.

## Versioning

The project version is stored in `version.json` as `{ "version": "MAJOR.MINOR.PATCH" }` and displayed in the footer of every page.

Follow semantic versioning rules when bumping the version:

- **MAJOR** — a new page is added (e.g. a new tool, section, or standalone page added to the sidebar)
- **MINOR** — a new feature is added to an existing page (e.g. new UI component, new data source, new interaction)
- **PATCH** — a bug fix or minor correction to existing functionality

When committing a change, always update `version.json` to reflect the correct bump before pushing. The footer script in every HTML page reads `v.version` from this file.

## UI Design Standards

All UI implementation must follow these design principles to produce distinctive, production-grade interfaces that avoid generic aesthetics.

### Design Thinking

Before coding any UI, commit to a bold aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc.
- **Differentiation**: What makes this unforgettable? Execute the vision with precision and intentionality.

### Aesthetics Guidelines

- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial, Inter, Roboto, and system fonts. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic using CSS variables. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. One well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Use unexpected layouts — asymmetry, overlap, diagonal flow, grid-breaking elements, generous negative space or controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth. Add gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, or grain overlays as appropriate.

### What to Avoid

Never use generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, Space Grotesk, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and cookie-cutter component patterns
- Designs that lack context-specific character

### Execution

- Match implementation complexity to the aesthetic vision: maximalist designs need elaborate animations and effects; minimalist designs need restraint, precision, and careful spacing.
- Vary between light and dark themes across pages — never converge on the same choices.
- Production-grade, functional, visually striking, and cohesive with a clear aesthetic point-of-view.

## Tournament Reports

When writing the `summary` field for a tournament report, **do not include any numbers** — no digits, no written-out numbers (e.g. avoid "three losses", "two misplays", "4–2"). Describe results qualitatively instead: use terms like "strong run", "positive record", "mixed finish", "dropped with an even record", "several losses", "wall of d-reacts", etc.

When adding a new tournament report, always link it to the calendar:

1. Add the report entry to `tcg-tournament-reports/reports.js` (newest first).
2. Find the matching event in `trips/trips.js` (inside `FAB_WORLD_TOUR`) and add `reportId: '<report-id>'` to that event object.
   - The `reportId` value must match the `id` field used in the report entry.
   - This causes a "Tournament Report" button to appear in the calendar popup for that event.
