# Project Instructions

## Tool Usage

**Never use the Agent tool (subagents).** Do all work directly using the available tools (Read, Edit, Write, Bash, Grep, Glob, etc.). Do not delegate tasks to subagents under any circumstances.

## Tournament Reports

When adding a new tournament report, always link it to the calendar:

1. Add the report entry to `tcg-tournament-reports/reports.js` (newest first).
2. Find the matching event in `trips/trips.js` (inside `FAB_WORLD_TOUR`) and add `reportId: '<report-id>'` to that event object.
   - The `reportId` value must match the `id` field used in the report entry.
   - This causes a "Tournament Report" button to appear in the calendar popup for that event.
