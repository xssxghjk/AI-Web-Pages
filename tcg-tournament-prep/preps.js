const PREPS = [
  {
    id: 'pro-tour-yokohama-2026',
    event: 'Pro Tour Yokohama',
    eventType: 'PT',
    tier: 4,
    date: '2026-03-27',
    displayDate: '27.03.26',
    formats: [
      {
        id: 'sage',
        name: 'Silver Age',
        abbr: 'Sage',
        hero: 'Briar',
        heroReasons: [
          'Solid numbers',
          'Good matchups into aggro decks',
          'New list is also good into IYs and Kano',
          'Loses to Guardian and auto loss against Slop Oldhim',
        ],
        predictedMeta: [
          { matchup: 'Kayo', share: '~25%', note: 'A lot, but not as much as people think' },
          { matchup: 'Ira', share: '~15%', note: 'Safe, solid pick' },
          { matchup: 'Guardians (Valda / Flavo / Oldhim)', share: '~25%', note: '' },
          { matchup: 'Kano', share: '~10%', note: '' },
          { matchup: 'Misc aggro', share: '~20%', note: '' },
          { matchup: 'Misc midrange / defensive (Enigma, ...)', share: '~5%', note: '' },
        ],
        notes: [
          {
            date: '18.03.26',
            sections: [
              {
                heading: null,
                entries: [
                  'Still trying to find the right list. Nebular blade feels really good with the blues. Electrify mainboard is a little suspicious, but if you draw it early it just wins games so it\'s hard to remove overall. The malefics also don\'t feel too great.',
                  'The Oldhim matchup feels really doomed, it\'s so hard to get through.',
                  '"Normal" guardians are doable but not favoured, we can actually threaten by deck damage now.',
                  'Going first into Ira feels 50/50ish, second is a lot more favoured. The main issue is that we need to convert some cards defensively since we aren\'t as consistent as we used to be. This leads to a midrange game where kodachi endgame beats anything we have...',
                  'Maybe it\'s time for fry...',
                ],
              },
            ],
          },
          {
            date: '19.03.26',
            sections: [
              {
                heading: null,
                entries: [
                  'Tried cards like fry that are underrated but makes it possible to say "no-blocks" more often. This also allowed us to add more elemental pumps. The deck feels really smooth now, this should definitely improve the Ira matchup and gives us the choice to block or take tempo with any hand.',
                  'The play pattern into aggro is blocking efficiently when we can to preserve life, using that life lead to take tempo (usually going close to 1) so we can threaten lethal without ever being forced to block with 2-3 blocks. Since our hands convert a lot better now this works more consistently. We need to be very aware of when and how strong we present lethal. 1 turn value game into full on aggro is what it feels like, life is a resource we leverage to gain tempo.',
                  'Still not sure about the 2 sideboard slots we want into Oldhim... Emissary feels fine but the matchup is too bad for "fine" to work. Maybe just go with tall arcane damage...',
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'cc',
        name: 'Classic Constructed',
        abbr: 'CC',
        hero: 'Mario',
        heroReasons: [
          'Big wide meta, solid numbers, good disruption',
        ],
        predictedMeta: [],
        notes: [
          {
            date: '18.03.26',
            sections: [
              {
                heading: 'General',
                entries: [
                  'Hyper Inflation is just bad.',
                  'Frailty trap still feels really strong in some matchups.',
                ],
              },
              {
                heading: 'Victor (defensive)',
                entries: [
                  'Seeing Death Touch early is incredibly important in the slow matchups.',
                  'Always play around Iron Grip if you can.',
                  'Even if fatigue, we should play consistent 60.',
                  'Stealth Attack can be very bricky.',
                  'Deck damage is real as long as they don\'t represent multiple remembrances.',
                  'Codex of Inertia is good for resetting the board state.',
                  'Spreading Plague can be very clutch in the endgame.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
