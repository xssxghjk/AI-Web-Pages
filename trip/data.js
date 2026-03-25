/**
 * Trip Page Data
 *
 * Add a new trip by adding a key to TRIP_PAGES below.
 *
 * Badge types  : 'calling' | 'bh' | 'premiere' | 'showdown' | 'protour'
 * Timeline types: null | 'drive' | 'fly' | 'calling' | 'bh' | 'premiere' | 'showdown' | 'protour' | 'event'
 * Tag types    : 'event' | 'hotel' | 'travel' | 'misc'
 *
 * countdown    : null (TBC) or { date: 'YYYY-MM-DD', type: <badge type> }
 * overview note: optional second line shown below the value
 */

const TRIP_PAGES = {

  'fab-asia-tour-2026': {
    title:      'FAB Asia Tour 2026',
    navTitle:   'FAB Asia Tour 2026',
    heroText:   'Frankfurt → Shanghai → Japan → Frankfurt · Mar 26 – Apr 14',
    storageKey: 'fab-asia-2026-checklist',

    events: [
      { date: 'Apr 3–5, 2026',  name: 'Calling: Shanghai', venue: 'Ritz-Carlton Shanghai Pudong, 8 Pudong Avenue',
        badge: 'calling', countdown: { date: '2026-04-03', type: 'calling' } },
      { date: 'Apr 9–12, 2026', name: 'Pro Tour: Yokohama', venue: 'Yokohama',
        badge: 'protour', countdown: { date: '2026-04-09', type: 'protour' } },
    ],

    overview: [
      { key: 'Dates',         value: 'Thu 26 Mar – Tue 14 Apr 2026' },
      { key: 'Duration',      value: '19 days' },
      { key: 'Destination',   value: 'Shanghai & Yokohama' },
      { key: 'Travel',        value: 'FRA → PVG → NRT → FRA' },
      { key: 'Accommodation', value: 'Shanghai hotel (Mar 28 – Apr 6) · Tokyo/Yokohama hotel (Apr 6 – 13)' },
    ],

    timeline: [
      { day: 'Thu Mar 26',          type: 'fly',     title: 'Fly Frankfurt → Shanghai ✈️',  desc: 'FRA → PVG. Arrive Shanghai Pudong Friday morning.' },
      { day: 'Fri Mar 27 – Tue Apr 2', type: null,   title: 'Shanghai',                      desc: 'Free days for exploration and tournament prep.' },
      { day: 'Fri Apr 3 – Sun Apr 5 ⭐', type: 'calling', title: 'Calling: Shanghai',        desc: 'Ritz-Carlton Shanghai Pudong. Friday–Saturday Swiss rounds, Sunday top cut.' },
      { day: 'Sun Apr 6',           type: 'fly',     title: 'Fly Shanghai → Tokyo ✈️',      desc: 'PVG → NRT, ~3h. Check into Tokyo/Yokohama hotel.' },
      { day: 'Mon Apr 7 – Wed Apr 8', type: null,    title: 'Tokyo / Yokohama',              desc: 'Recovery, deck review, and exploration.' },
      { day: 'Thu Apr 9 – Sun Apr 12 ⭐⭐', type: 'protour', title: 'Pro Tour: Yokohama',   desc: 'Thursday–Friday Swiss rounds, Saturday top cut, Sunday finals.' },
      { day: 'Tue Apr 14',          type: 'fly',     title: 'Fly Japan → Frankfurt ✈️',     desc: 'NRT → FRA. Early check-out, head to Narita Airport.' },
    ],

    checklist: [
      { id: 'leg1',          label: 'Book Leg 1: FRA → PVG (Thu, Mar 26)',                         tag: 'travel' },
      { id: 'leg2',          label: 'Book Leg 2: PVG → NRT (Sun, Apr 6)',                          tag: 'travel' },
      { id: 'leg3',          label: 'Book Leg 3: NRT → FRA (Tue, Apr 14)',                         tag: 'travel' },
      { id: 'hotel-shanghai', label: 'Book hotel Shanghai (Mar 28 – Apr 6, near Pudong/Bund)',     tag: 'hotel'  },
      { id: 'hotel-tokyo',   label: 'Book hotel Tokyo/Yokohama (Apr 6–13)',                        tag: 'hotel'  },
      { id: 'reg-shanghai',  label: 'Register for Calling: Shanghai',                              tag: 'event'  },
      { id: 'reg-yokohama',  label: 'Register for Pro Tour: Yokohama',                             tag: 'event'  },
      { id: 'insurance',     label: 'Travel health insurance (China + Japan, Mar 26 – Apr 14)',    tag: 'misc'   },
    ],
  },

  'rotterdam-2026': {
    title:      'Rotterdam – Apr 2026',
    navTitle:   'Rotterdam – Apr 2026',
    heroText:   'Karlsruhe → Rotterdam → Karlsruhe · Apr 24 – 27',
    storageKey: 'rotterdam-2026-checklist',

    events: [
      { date: 'Apr 25, 2026', name: 'Calling: Rotterdam', venue: 'Rotterdam, Netherlands',
        badge: 'calling', countdown: { date: '2026-04-25', type: 'calling' } },
    ],

    overview: [
      { key: 'Dates',         value: 'Fri 24 Apr – Mon 27 Apr 2026' },
      { key: 'Duration',      value: '3 nights / 4 days' },
      { key: 'Destination',   value: 'Rotterdam, Netherlands' },
      { key: 'Travel',        value: 'Car from the Karlsruhe area' },
      { key: 'Accommodation', value: 'Airbnb · Fri 24 Apr – Mon 27 Apr' },
    ],

    timeline: [
      { day: 'Fri Apr 24',    type: 'drive',   title: 'Drive to Rotterdam 🚗',      desc: 'Karlsruhe → Rotterdam. Check in to Airbnb.' },
      { day: 'Sat Apr 25 ⭐', type: 'calling', title: 'Calling: Rotterdam',          desc: 'Full day Swiss rounds. Rotterdam, Netherlands.' },
      { day: 'Sun Apr 26',    type: null,       title: 'Rotterdam',                   desc: 'Free day. Explore the city.' },
      { day: 'Mon Apr 27',    type: 'drive',   title: 'Drive back to Karlsruhe 🚗', desc: 'Check out of Airbnb and drive home.' },
    ],

    checklist: [
      { id: 'reg-rotterdam',   label: 'Register for Calling: Rotterdam',               tag: 'event' },
      { id: 'confirm-airbnb', label: 'Confirm Airbnb extra night (Sun → Mon Apr 27)', tag: 'hotel' },
      { id: 'confirm-car',    label: 'Confirm car ride & departure time (Fri Apr 24)', tag: 'misc'  },
    ],
  },

  'german-nationals-2026': {
    title:      'German Nationals – July 2026',
    navTitle:   'DE Nationals 2026',
    heroText:   'Gelsenkirchen · Jul 3 – 6, 2026',
    storageKey: 'german-nationals-2026-checklist',

    events: [
      { date: 'Sat–Sun Jul 4–5, 2026', name: 'German National Championship', venue: 'Event Center Kaue, Gelsenkirchen · Classic Constructed',
        badge: 'calling', countdown: { date: '2026-07-04', type: 'calling' } },
    ],

    overview: [
      { key: 'Dates',         value: 'Fri 3 Jul – Mon 6 Jul 2026' },
      { key: 'Duration',      value: '3 nights / 4 days' },
      { key: 'Destination',   value: 'Gelsenkirchen, Germany' },
      { key: 'Travel',        value: 'TBC' },
      { key: 'Accommodation', value: 'TBC · Fri 3 Jul – Mon 6 Jul (3 nights)' },
      { key: 'Venue',         value: 'Event Center Kaue, Gelsenkirchen' },
    ],

    timeline: [
      { day: 'Fri Jul 3',     type: 'drive',   title: 'Travel to Gelsenkirchen',          desc: 'Depart and travel to Gelsenkirchen. Check in to accommodation.' },
      { day: 'Sat Jul 4 ⭐',  type: 'event',   title: 'DE Nationals – Day 1',             desc: 'German National Championship. Classic Constructed Swiss rounds. Event Center Kaue.' },
      { day: 'Sun Jul 5 ⭐',  type: 'event',   title: 'DE Nationals – Day 2',             desc: 'German National Championship continues. Top cut and finals.' },
      { day: 'Mon Jul 6',     type: 'drive',   title: 'Travel home',                      desc: 'Check out and return home.' },
    ],

    checklist: [
      { id: 'reg-nationals',      label: 'Register for German National Championship (Jul 4–5)', tag: 'event'  },
      { id: 'book-accommodation', label: 'Book accommodation in Gelsenkirchen (Fri Jul 3 – Mon Jul 6, 3 nights)', tag: 'hotel'  },
      { id: 'book-travel',        label: 'Book travel to/from Gelsenkirchen',                   tag: 'travel' },
    ],
  },

  'hamburg-2026': {
    title:      'The Calling: Hamburg – August 2026',
    navTitle:   'The Calling: Hamburg',
    heroText:   'Hamburg · Aug 21 – 24, 2026',
    storageKey: 'hamburg-2026-checklist',

    events: [
      { date: 'Fri–Sun Aug 21–23, 2026', name: 'The Calling: Hamburg',     venue: 'Hamburg · Classic Constructed · $20,000 USD prize pool',
        badge: 'calling', countdown: { date: '2026-08-21', type: 'calling' } },
      { date: 'Sun Aug 23, 2026',         name: 'Battle Hardened: Hamburg', venue: 'Hamburg · Living Legend · $2,000 USD prize pool',
        badge: 'bh',      countdown: { date: '2026-08-23', type: 'bh'      } },
    ],

    overview: [
      { key: 'Dates',         value: 'Fri 21 Aug – Mon 24 Aug 2026' },
      { key: 'Duration',      value: '3 nights / 4 days' },
      { key: 'Destination',   value: 'Hamburg, Germany' },
      { key: 'Travel',        value: 'TBC' },
      { key: 'Accommodation', value: 'TBC · Fri 21 Aug – Mon 24 Aug (3 nights)' },
      { key: 'Venue',         value: 'TBC · Hamburg' },
    ],

    timeline: [
      { day: 'Fri Aug 21',    type: 'drive',   title: 'Travel to Hamburg',                              desc: 'Depart and travel to Hamburg. Check in to accommodation. The Calling begins.' },
      { day: 'Sat Aug 22 ⭐', type: 'calling', title: 'The Calling: Hamburg – Day 2',                   desc: 'Classic Constructed. Full day of Swiss rounds. $20,000 USD prize pool.' },
      { day: 'Sun Aug 23 ⭐', type: 'calling', title: 'The Calling: Hamburg – Day 3 + Battle Hardened', desc: 'Calling concludes. Battle Hardened: Living Legend also runs today. $2,000 USD prize pool.' },
      { day: 'Mon Aug 24',    type: 'drive',   title: 'Travel home',                                    desc: 'Check out and travel home.' },
    ],

    checklist: [
      { id: 'reg-calling',        label: 'Register for The Calling: Hamburg (Aug 21–23) – Classic Constructed', tag: 'event'  },
      { id: 'reg-bh',             label: 'Register for Battle Hardened: Hamburg (Sun Aug 23) – Living Legend',  tag: 'event'  },
      { id: 'book-accommodation', label: 'Book accommodation in Hamburg (Fri Aug 21 – Mon Aug 24, 3 nights)',    tag: 'hotel'  },
      { id: 'book-travel',        label: 'Book travel to/from Hamburg',                                          tag: 'travel' },
    ],
  },

  'hamburg-calling-2026': {
    title:      'Hamburg – The Calling 2026',
    navTitle:   'Hamburg – The Calling 2026',
    heroText:   'Karlsruhe → Hamburg → Karlsruhe · Dates TBC',
    storageKey: 'hamburg-calling-2026-checklist',

    events: [
      { date: 'TBC', name: 'The Calling: Hamburg',     venue: 'MesseHalle Hamburg-Schnelsen · Classic Constructed · 75€ · $20,000 USD prize pool · 500 cap',
        badge: 'calling', countdown: null },
      { date: 'TBC', name: 'Battle Hardened: Hamburg', venue: 'MesseHalle Hamburg-Schnelsen · Living Legend · 60€ · $2,000 USD prize pool · 128 cap',
        badge: 'bh',      countdown: null },
    ],

    overview: [
      { key: 'Dates',         value: 'TBC' },
      { key: 'Duration',      value: 'TBC' },
      { key: 'Destination',   value: 'Hamburg, Germany' },
      { key: 'Travel',        value: 'TBC', note: '~500 km from Karlsruhe, ~5h drive' },
      { key: 'Accommodation', value: 'TBC' },
      { key: 'Venue',         value: 'MesseHalle Hamburg-Schnelsen, Modering 1a, 22457 Hamburg' },
    ],

    timeline: [
      { day: 'Day 1 – Travel',      type: 'drive',   title: 'Drive to Hamburg',                           desc: 'Depart Karlsruhe. ~5h drive. Check in to accommodation.' },
      { day: 'Day 2 ⭐',            type: 'calling', title: 'The Calling: Hamburg – Day 1',               desc: 'Classic Constructed. Swiss rounds, best-of-one. MesseHalle Hamburg-Schnelsen. 9:00 AM.' },
      { day: 'Day 3 ⭐',            type: 'calling', title: 'The Calling: Hamburg – Day 2 / Battle Hardened', desc: 'Day 2 cut for Calling finalists. Battle Hardened (Living Legend) for Day 1 knockouts. 9:00 AM.' },
      { day: 'Day 4 – Travel home', type: 'drive',   title: 'Drive back to Karlsruhe',                    desc: 'Check out and return home.' },
    ],

    checklist: [
      { id: 'reg-calling',        label: 'Register for The Calling: Hamburg – 75€',               tag: 'event'  },
      { id: 'reg-bh',             label: 'Register for Battle Hardened: Hamburg – 60€',           tag: 'event'  },
      { id: 'book-accommodation', label: 'Book accommodation in Hamburg',                          tag: 'hotel'  },
      { id: 'plan-travel',        label: 'Plan travel to/from Hamburg (~5h drive from Karlsruhe)', tag: 'travel' },
    ],
  },

  'prague-omens-2026': {
    title:      'Prague – Omens World Premiere – May 2026',
    navTitle:   'Prague – Omens World Premiere',
    heroText:   'Karlsruhe → Prague → Karlsruhe · May 19 – 25, 2026',
    storageKey: 'prague-omens-2026-checklist',

    events: [
      { date: 'Fri May 22, 2026', name: 'World Premiere: Omens of the Third Age', venue: 'PVA EXPO PRAHA · Sealed Deck · 10:00 AM · 80€ · 1,200 cap',
        badge: 'premiere', countdown: { date: '2026-05-22', type: 'premiere' } },
      { date: 'Sat May 23, 2026', name: 'The Calling: Prague',                    venue: 'PVA EXPO PRAHA · Sealed Deck · $20,000 USD prize pool',
        badge: 'calling',  countdown: { date: '2026-05-23', type: 'calling'  } },
      { date: 'Sun May 24, 2026', name: 'Sunday Showdown: Prague',                venue: 'PVA EXPO PRAHA · Silver Age · 9:00 AM · 60€ · 736 cap · $5,000 USD prize pool',
        badge: 'showdown', countdown: { date: '2026-05-24', type: 'showdown' } },
    ],

    overview: [
      { key: 'Dates',         value: 'Tue 19 May – Mon 25 May 2026' },
      { key: 'Duration',      value: '6 nights / 7 days' },
      { key: 'Destination',   value: 'Prague, Czech Republic' },
      { key: 'Travel',        value: 'TBC' },
      { key: 'Accommodation', value: 'TBC · Tue 19 May – Mon 25 May (6 nights)' },
      { key: 'Venue',         value: 'PVA EXPO PRAHA, Prague' },
    ],

    timeline: [
      { day: 'Tue May 19',    type: 'drive',    title: 'Travel to Prague',                        desc: 'Depart Karlsruhe. Check in to accommodation.' },
      { day: 'Wed May 20',    type: null,        title: 'Prague',                                  desc: 'Free day. Explore the city.' },
      { day: 'Thu May 21',    type: null,        title: 'Prague',                                  desc: 'Free day. Prep for the weekend.' },
      { day: 'Fri May 22 ⭐', type: 'premiere', title: 'World Premiere – Omens of the Third Age', desc: 'Sealed Deck. 10:00 AM. PVA EXPO PRAHA. First chance to play with the new set.' },
      { day: 'Sat May 23 ⭐', type: 'calling',  title: 'The Calling: Prague',                     desc: 'Sealed Deck. Full day Swiss rounds. $20,000 USD prize pool. PVA EXPO PRAHA.' },
      { day: 'Sun May 24 ⭐', type: 'showdown', title: 'Sunday Showdown: Prague',                 desc: 'Silver Age. 9:00 AM. $5,000 USD prize pool. PVA EXPO PRAHA.' },
      { day: 'Mon May 25',    type: 'drive',    title: 'Travel home',                              desc: 'Check out and return to Karlsruhe.' },
    ],

    checklist: [
      { id: 'reg-premiere',       label: 'Register for World Premiere (Fri May 22) – 80€',                    tag: 'event'  },
      { id: 'reg-calling',        label: 'Register for The Calling: Prague (Sat May 23)',                       tag: 'event'  },
      { id: 'reg-showdown',       label: 'Register for Sunday Showdown (Sun May 24) – 60€',                    tag: 'event'  },
      { id: 'book-accommodation', label: 'Book accommodation in Prague (Tue May 19 – Mon May 25, 6 nights)',    tag: 'hotel'  },
      { id: 'book-travel',        label: 'Book travel to/from Prague',                                          tag: 'travel' },
    ],
  },

};
