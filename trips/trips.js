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

/**
 * FaB World Tour Events 2026
 *
 * All Calling, Pro Tour, National Championship and Worlds events from the
 * official Flesh and Blood World Tour calendar. Shown as info bars on the
 * calendar only (not shown as trip cards on the trips index page).
 * Source: https://fabtcg.com/organised-play/
 */
const FAB_WORLD_TOUR = [

  {
    id: 'fab-calling-akihabara-2026',
    title: 'Calling – Akihabara',
    destination: 'Tokyo, Japan',
    region: 'Asia',
    status: 'fab-event',
    startDate: '2026-01-09',
    endDate: '2026-01-11',
    displayDates: 'Jan 9–11, 2026',
    description: 'The Calling + Battle Hardened + Super Armory in Tokyo\'s TCG hub, Akihabara.',
    link: 'https://fabtcg.com/organised-play/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-columbus-2026',
    title: 'Calling – Columbus',
    destination: 'Columbus, USA',
    region: 'Americas',
    status: 'fab-event',
    startDate: '2026-01-16',
    endDate: '2026-01-18',
    displayDates: 'Jan 16–18, 2026',
    description: 'The Calling (Classic Constructed, $20K) at Greater Columbus Convention Center, Ohio.',
    link: 'https://fabtcg.com/organised-play/2026/calling-columbus/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-london-2026',
    title: 'Calling – London',
    destination: 'London, UK',
    region: 'Europe',
    status: 'fab-event',
    startDate: '2026-02-06',
    endDate: '2026-02-08',
    displayDates: 'Feb 6–8, 2026',
    description: 'Compendium of Rathe World Premiere & Calling (Silver Age, $20K) at ExCeL London.',
    link: 'https://fabtcg.com/organised-play/2026/world-premiere-london/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-san-diego-2026',
    title: 'Calling – San Diego',
    destination: 'San Diego, USA',
    region: 'Americas',
    status: 'fab-event',
    startDate: '2026-02-14',
    endDate: '2026-02-15',
    displayDates: 'Feb 14–15, 2026',
    description: 'The Calling (Silver Age, $20K) at San Diego Convention Center, California.',
    link: 'https://fabtcg.com/organised-play/2026/calling-san-diego/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-montreal-2026',
    title: 'Calling – Montréal',
    destination: 'Montréal, Canada',
    region: 'Americas',
    status: 'fab-event',
    startDate: '2026-02-27',
    endDate: '2026-03-01',
    displayDates: 'Feb 27–Mar 1, 2026',
    description: 'The Calling (Classic Constructed, $20K) at Palais des congrès de Montréal.',
    link: 'https://fabtcg.com/organised-play/2026/calling-montreal-2/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-toulouse-2026',
    title: 'Calling – Toulouse',
    destination: 'Toulouse, France',
    region: 'Europe',
    status: 'fab-event',
    startDate: '2026-03-06',
    endDate: '2026-03-08',
    displayDates: 'Mar 6–8, 2026',
    description: 'The Calling (Classic Constructed, $20K) at MEETT – Toulouse Métropole, France.',
    link: 'https://fabtcg.com/organised-play/2026/calling-toulouse/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-brisbane-2026',
    title: 'Calling – Brisbane',
    destination: 'Brisbane, Australia',
    region: 'Asia',
    status: 'fab-event',
    startDate: '2026-03-13',
    endDate: '2026-03-15',
    displayDates: 'Mar 13–15, 2026',
    description: 'The Calling (Classic Constructed) at Brisbane Convention & Exhibition Centre, Australia.',
    link: 'https://fabtcg.com/organised-play/2026/calling-brisbane/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-memphis-2026',
    title: 'Calling – Memphis',
    destination: 'Memphis, USA',
    region: 'Americas',
    status: 'fab-event',
    startDate: '2026-03-20',
    endDate: '2026-03-22',
    displayDates: 'Mar 20–22, 2026',
    description: 'The Calling (Classic Constructed, $20K) at Renasant Convention Center, Memphis, TN.',
    link: 'https://fabtcg.com/organised-play/2026/calling-memphis-2/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-pro-tour-yokohama-2026',
    title: 'Pro Tour – Yokohama',
    destination: 'Yokohama, Japan',
    region: 'Asia',
    status: 'fab-event',
    startDate: '2026-04-09',
    endDate: '2026-04-12',
    displayDates: 'Apr 9–12, 2026',
    description: 'Pro Tour: Yokohama ($200K, Classic Constructed & Silver Age) + Calling ($20K) at Pacifico Yokohama.',
    link: 'https://fabtcg.com/organised-play/2026/pro-tour-yokohama/',
    tags: ['FaB', 'Pro Tour', 'World Tour'],
  },

  {
    id: 'fab-calling-shanghai-2026',
    title: 'Calling – Shanghai',
    destination: 'Shanghai, China',
    region: 'Asia',
    status: 'fab-event',
    startDate: '2026-04-03',
    endDate: '2026-04-05',
    displayDates: 'Apr 3–5, 2026',
    description: 'The Calling (Silver Age, $20K) + Showdown at The Ritz-Carlton Shanghai, Pudong.',
    link: 'https://fabtcg.com/organised-play/2026/calling-shanghai/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-prague-2026',
    title: 'Calling – Prague',
    destination: 'Prague, Czech Republic',
    region: 'Europe',
    status: 'fab-event',
    startDate: '2026-05-22',
    endDate: '2026-05-24',
    displayDates: 'May 22–24, 2026',
    description: 'Omens of the Third Age World Premiere & Calling (Sealed Deck, $20K) at PVA EXPO PRAHA.',
    link: 'https://fabtcg.com/organised-play/2026/omens-of-the-third-age-world-premiere-prague/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-minneapolis-2026',
    title: 'Calling – Minneapolis',
    destination: 'Minneapolis, USA',
    region: 'Americas',
    status: 'fab-event',
    startDate: '2026-06-12',
    endDate: '2026-06-14',
    displayDates: 'Jun 12–14, 2026',
    description: 'USA National Championship ($50K) & Calling (Omens Sealed + Draft, $20K) at Minneapolis Convention Center.',
    link: 'https://fabtcg.com/organised-play/2026/united-states-national-championship-2026-calling-minneapolis/',
    tags: ['FaB', 'Calling', 'Nationals', 'World Tour'],
  },

  {
    id: 'fab-nationals-germany-2026',
    title: 'DE Nationals',
    destination: 'Gelsenkirchen, Germany',
    region: 'Europe',
    status: 'fab-event',
    startDate: '2026-07-04',
    endDate: '2026-07-05',
    displayDates: 'Jul 4–5, 2026',
    description: 'German National Championship at Event Center Kaue, Gelsenkirchen.',
    link: 'https://fabtcg.com/organised-play/2026/national-championship-2026-germany/',
    tags: ['FaB', 'Nationals', 'World Tour'],
  },

  {
    id: 'fab-pro-tour-las-vegas-2026',
    title: 'Pro Tour – Las Vegas',
    destination: 'Las Vegas, USA',
    region: 'Americas',
    status: 'fab-event',
    startDate: '2026-07-16',
    endDate: '2026-07-19',
    displayDates: 'Jul 16–19, 2026',
    description: 'Pro Tour: Las Vegas (Classic Constructed & Set 19 Booster Draft) + Calling at Westgate Las Vegas Resort.',
    link: 'https://fabtcg.com/organised-play/2026/pro-tour-las-vegas/',
    tags: ['FaB', 'Pro Tour', 'World Tour'],
  },

  {
    id: 'fab-calling-shinjuku-2026',
    title: 'Calling – Shinjuku',
    destination: 'Tokyo, Japan',
    region: 'Asia',
    status: 'fab-event',
    startDate: '2026-07-10',
    endDate: '2026-07-12',
    displayDates: 'Jul 10–12, 2026',
    description: 'The Calling (Classic Constructed, $20K) at Bellesalle Shinjuku Central Park, Tokyo.',
    link: 'https://fabtcg.com/organised-play/2026/calling-shinjuku/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

  {
    id: 'fab-calling-hamburg-2026',
    title: 'Calling – Hamburg',
    destination: 'Hamburg, Germany',
    region: 'Europe',
    status: 'fab-event',
    startDate: '2026-08-21',
    endDate: '2026-08-23',
    displayDates: 'Aug 21–23, 2026',
    description: 'The Calling (Classic Constructed, $20K) + Battle Hardened (Living Legend, $2K) in Hamburg.',
    link: 'https://fabtcg.com/organised-play/2026/calling-hamburg-2/',
    tags: ['FaB', 'Calling', 'World Tour'],
  },

];

const TRIPS = [

  // ── PASTE YOUR NEXT TRIP HERE (soonest/newest first) ──────────────────────

  {
    id: 'hamburg-2026',
    title: 'The Calling: Hamburg',
    destination: 'Hamburg, Germany',
    region: 'Europe',
    status: 'upcoming',
    startDate: '2026-08-21',
    endDate: '2026-08-24',
    displayDates: 'Aug 21 – 24, 2026',
    description: 'Long weekend in Hamburg for The Calling (Classic Constructed, $20,000 USD) and Battle Hardened (Living Legend, $2,000 USD). Travelling Friday, events run Fri–Sun, home Monday.',
    link: '../hamburg-2026/',
    tags: ['FaB', 'Tournament', 'Europe'],
  },

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
