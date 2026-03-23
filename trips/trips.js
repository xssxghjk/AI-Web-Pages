/**
 * Trips Data
 *
 * To add a new trip, copy one of the objects below and paste it at the
 * TOP of the TRIPS array (newest/soonest first), then fill in the fields.
 *
 * Fields reference:
 *   id          – unique kebab-case string, e.g. 'japan-2026-04'
 *   title       – trip name shown on the card, e.g. 'FAB Asia Tour 2026'
 *   destination – city/country label, e.g. 'Shanghai & Yokohama'
 *   region      – broad region for filtering, e.g. 'Asia' | 'Europe' | 'Americas'
 *   status      – 'upcoming' | 'ongoing' | 'past' | 'planning'
 *   startDate   – ISO date for sorting, e.g. '2026-03-27'
 *   endDate     – ISO date, e.g. '2026-04-13'
 *   displayDates – human-readable date range shown on the card
 *   description – short paragraph describing the trip and what the page covers
 *   link        – relative URL to the trip's detail page
 *   tags        – array of short tag strings, e.g. ['FaB', 'Tournament', 'Leisure']
 */

const TRIPS = [

  // ── PASTE YOUR NEXT TRIP HERE (soonest/newest first) ──────────────────────

  {
    id: 'prague-omens-2026',
    title: 'Prague – Omens World Premiere',
    destination: 'Prague, Czech Republic',
    region: 'Europe',
    status: 'upcoming',
    startDate: '2026-05-19',
    endDate: '2026-05-25',
    displayDates: 'May 19 – 25, 2026',
    description: 'Week-long trip to Prague for the Omens of the Third Age World Premiere (May 22–24) at PVA EXPO Praha. Three events across the weekend: World Premiere (Fri), The Calling (Sat), and Sunday Showdown (Sun).',
    link: '../prague-omens-2026/',
    tags: ['FaB', 'Tournament', 'Europe'],
  },

  {
    id: 'rotterdam-2026-04',
    title: 'Rotterdam Trip',
    destination: 'Rotterdam, Netherlands',
    region: 'Europe',
    status: 'upcoming',
    startDate: '2026-04-24',
    endDate: '2026-04-27',
    displayDates: 'Apr 24 – 27, 2026',
    description: 'Long weekend in Rotterdam. Travelling by car from the Karlsruhe area on Friday 24th. Staying at an Airbnb Friday through Monday – most others check out Sunday, so the extra night (Sun → Mon) is still to be confirmed.',
    link: '../rotterdam-2026/',
    tags: ['Leisure', 'Europe', 'FaB'],
  },

  {
    id: 'fab-asia-tour-2026',
    title: 'FAB Asia Tour 2026',
    destination: 'Shanghai & Yokohama',
    region: 'Asia',
    status: 'upcoming',
    startDate: '2026-03-26',
    endDate: '2026-04-14',
    displayDates: 'Mar 26 – Apr 14, 2026',
    description: 'Two-stop Asia tour covering Calling: Shanghai (Apr 3–5) and Pro Tour: Yokohama (Apr 9–12). Frankfurt → Shanghai → Japan → Frankfurt. Day-by-day timeline and booking checklist.',
    link: '../yokohama-pro-tour/',
    tags: ['FaB', 'Tournament'],
  },

];
