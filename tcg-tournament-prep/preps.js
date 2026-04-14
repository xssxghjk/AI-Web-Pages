const PREPS = [
  {
    id: 'german-nationals-2026',
    event: 'German Nationals 2026',
    eventType: 'Nationals',
    tier: 4,
    date: '2026-04-06',
    displayDate: '03–06.04.26',
    formats: [
      {
        id: 'cc',
        name: 'Classic Constructed',
        abbr: 'CC',
        hero: 'Mario',
        summary: [],
        heroReasons: [],
        predictedMeta: [],
        notes: [],
      },
    ],
  },

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
        summary: [
          'Still searching for the optimal list — Nebular Blade + blues is smooth, Electrify is high-variance but hard to cut given its impact when drawn early.',
          'Oldhim is a near-auto-loss; sideboard solutions (Emissary, tall arcane) remain unsolved. Regular guardians are doable via deck damage threats.',
          'Ira matchup is roughly 50/50 going first, more favourable going second — card conversion consistency is the key issue.',
          'Updated list runs Fry + more elemental pumps for smoother hands, noticeably improving the Ira matchup and giving the option to block or take tempo on any hand.',
          'Core aggro pattern: block efficiently to preserve life → leverage that life lead to take tempo (go close to 1) → threaten lethal without being forced to block with 2–3 cards. Life is the main tempo resource.',
        ],
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
        summary: [
          'Hyper Inflation is not worth running — cut it.',
          'Frailty Trap remains strong and relevant in several matchups.',
          'Jakob shell is excellent — Whittles act as true-damage Cheliceras; transform to Kiss of Death in reactions for extra true damage. No need for a dedicated endgame plan.',
          'Relentless Pursuit provides an infinite Mark supply in the endgame.',
          '3x Incisions recommended; run both a stealth and non-stealth package and adapt to the matchup.',
          'vs Victor (defensive): seeing Death Touch early is critical; always play around Iron Grip; stick to a consistent 60-card build even in fatigue games. Codex of Inertia resets board state; Spreading Plague is clutch in the endgame.',
          'vs Gravy: be maximally disruptive OR play big hands (chained disruption etc.); clear allies, play the value game, force blocks — the blocking player gets fatigued. Defense reactions in arsenal are very good. Codex is risky; giving them Conqueror of the High Seas can be very bad.',
          'vs Oscilio: draw order is critical; key early decision between disruption and keeping Mark for Chelicera; use Amulet before GIAF resolves; watch for Wobble, Cloud Cover, Sigil of Solace; headpiece is strong for disruption.',
          'vs Vynnset: play all available blues and defense reactions; disruption may still be useful despite banishing from hand since they rarely have many Runegate cards in hand.',
        ],
        heroReasons: [
          'Big wide meta, solid numbers, good disruption',
        ],
        predictedMeta: [
          { matchup: 'Mario', share: '–', note: 'Tech target — mirror matchup' },
          { matchup: 'Oscilio', share: '–', note: 'Tech target' },
          { matchup: 'Gravy', share: '–', note: 'Potential tech target' },
          { matchup: 'Everything else', share: '–', note: 'Big wide open meta — need to be ready for anything' },
        ],
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
          {
            date: '25.03.26',
            sections: [
              {
                heading: 'Gravy Bones',
                entries: [
                  'Being as disruptive as possible is the priority.',
                  'Play defense reactions and small disruptive hands while blocking efficiently.',
                  'If they give us space, present more to push them into lethal range where we can cheat out the win.',
                  'Pilfer the Tomb is pretty good.',
                ],
              },
              {
                heading: 'Vynnset',
                entries: [
                  'Play all blues we can and defense reactions.',
                  'Unsure how much disruption we want — most of it banishes cards from hand.',
                  'That said, they shouldn\'t have that many Runegate cards in hand, so disruption could still be useful.',
                  'Check average statistics and get input from others on their boarding approach.',
                ],
              },
            ],
          },
          {
            date: '01.04.26',
            sections: [
              {
                heading: null,
                entries: [
                  'The Jakob shell is so good. No need for a dedicated endgame plan — the yellows and blues are doing what we want.',
                  'Whittles are true-damage-generating Cheliceras. We can transform them to Kiss of Death in reactions and flick that for extra true damage.',
                  'Everything left in the deck should support the endgame plan. And we have an "infinite" supply of Mark as long as we have a Relentless Pursuit.',
                  'The rest is the standard Mario pile. Liking a stealth and a non-stealth package depending on the matchup, and a huge fan of 3 Incisions.',
                  'Next up: find the correct gameplan and sideboard into every hero.',
                ],
              },
            ],
          },
          {
            date: '07.04.26',
            sections: [
              {
                heading: 'Mario (General / vs Gravy)',
                entries: [
                  'Learned a lot about Mario. Against Gravy it\'s important to either give him full tempo OR play big hands (chained disruption, etc.).',
                  'Clear allies, play the value game, and try to find an angle to force blocks — the player who blocks gets fatigued.',
                  'Always hide information when threatening on-hits to avoid making blocking easy.',
                  'Defense reactions in arsenal are really good.',
                  'Play a lot of blocking cards.',
                  'Codex can be very awkward — giving them a Conqueror of the High Seas can be very bad.',
                ],
              },
            ],
          },
          {
            date: '08.04.26',
            sections: [
              {
                heading: 'Oscilio',
                entries: [
                  'Draw order matters a lot.',
                  'Many decision points: disrupt vs. keep Mark for Chelicera early.',
                  'Use Amulet before GIAF resolves.',
                  'Be mindful of Wobble, Cloud Cover, and Sigil of Solace.',
                  'Headpiece for disruption is also really good.',
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
