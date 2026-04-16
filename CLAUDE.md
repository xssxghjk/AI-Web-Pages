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

## Tournament Reports

When writing the `summary` field for a tournament report, **do not include any numbers** — no digits, no written-out numbers (e.g. avoid "three losses", "two misplays", "4–2"). Describe results qualitatively instead: use terms like "strong run", "positive record", "mixed finish", "dropped with an even record", "several losses", "wall of d-reacts", etc.

When adding a new tournament report, always link it to the calendar:

1. Add the report entry to `tcg-tournament-reports/reports.js` (newest first).
2. Find the matching event in `trips/trips.js` (inside `FAB_WORLD_TOUR`) and add `reportId: '<report-id>'` to that event object.
   - The `reportId` value must match the `id` field used in the report entry.
   - This causes a "Tournament Report" button to appear in the calendar popup for that event.
