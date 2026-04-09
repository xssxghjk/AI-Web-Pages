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
    date: '2026-04-08',
    displayDate: '08.04.26',
    formats: [
      {
        id: 'sage',
        name: 'Silver Age',
        abbr: 'Sage',
        hero: 'Briar',
        summary: [
          'Pivoted from Nebula Blade aggro to a Redline list (similar to London) — the Nebula Blade list consistently lost into everything and could not convert the tempo it generated.',
          'Redline with Scepter is well-positioned: strongly favoured into Kayo, Ira, and most aggro decks; auto-loss to Oldhim; hard matchup into Kano.',
          'Valda is a tough matchup — the answer is blocking well and attacking at breakpoints, with d-reacts doing a lot of heavy lifting. Rootbound Carapace is likely necessary.',
          'Final structure: 37 mainboard with a 3-card switchboard "spectrum" (all-defensive to all-offensive); Swiftstrike Bracers into Oldhim and Florian (12 equips total).',
          'Sideboard: 2 extra yellow Arcane Polarities for Iyslander/Kano/Vynnset, AB3 + Spellvoid 1 to cover wizard and runeblade setups, 1 blue Evergreen for the deck-damage endgame push.',
          'Against Scurv: always bring Starfall + Resource Chest.',
        ],
        heroReasons: [
          'Solid numbers',
          'Strongly favoured into Kayo, Ira, and most aggro decks',
          'Redline + Scepter maintains good matchups into the aggro field without the conversion problems of the Nebula Blade list',
          'Auto-loss to Oldhim (acceptable given meta share); hard but not hopeless into Kano',
        ],
        predictedMeta: [
          { matchup: 'Kayo', share: '~15%', note: 'A lot, but not as much as people think' },
          { matchup: 'Ira', share: '~15%', note: 'Safe, solid pick' },
          { matchup: 'Valda', share: '~15%', note: '' },
          { matchup: 'Oldhim / Tera', share: '~5%', note: '' },
          { matchup: 'Kano', share: '~5%', note: '' },
          { matchup: 'Misc aggro', share: '~25%', note: '' },
          { matchup: 'Florian', share: '~5%', note: '' },
          { matchup: 'Rest', share: '~15%', note: '' },
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
                  'The play pattern into aggro is blocking efficiently when we can to preserve life, using that life lead to take tempo (usually going close to 1) so we can threaten lethal without ever being forced to block with 2–3 blocks. Since our hands convert a lot better now this works more consistently. We need to be very aware of when and how strong we present lethal. 1-turn value game into full-on aggro is what it feels like — life is a resource we leverage to gain tempo.',
                  'Still not sure about the 2 sideboard slots we want into Oldhim... Emissary feels fine but the matchup is too bad for "fine" to work. Maybe just go with tall arcane damage...',
                ],
              },
            ],
          },
          {
            date: '25.03.26',
            sections: [
              {
                heading: null,
                entries: [
                  'Pretty close to the final list. 1-of Electrify is very game-winning — feels really good. 5 blues seems to be the sweet spot.',
                  'The deck is pretty good into pretty much everything except Oldhim. Instead of trying to fix that matchup I\'ll just accept the loss.',
                  'Sideboard slots: 2 extra yellow Arcane Polarities for Iyslander, Kano and Vynnset; AB3 + Spellvoid 1 to cover both wizard and runeblade setups; 1 blue Evergreen for the final deck-damage push (fatiguing Valda / Flavo can work).',
                  'Face Adversity is no longer necessary since we only blade 2 Blade Beckoner.',
                  '2nd Second Strike still feels too clunky. Replaced 1 Emissary of the Tides — that card is a really good roleplayer and glue piece.',
                  'Favoured into pretty much everything except Guardians (slightly unfavoured) with an auto-loss to Oldhim, which is very acceptable given the meta prediction.',
                ],
              },
            ],
          },
          {
            date: '26.03.26',
            sections: [
              {
                heading: 'Enigma',
                entries: [
                  'Fine to play 1 Sigil of Suffering — it\'s key to get it out of the deck early.',
                  'Endgame plan: hope we leaked enough damage through so the 1-of Evergreen seals the deal.',
                ],
              },
            ],
          },
          {
            date: '27.03.26',
            sections: [
              {
                heading: 'Oldhim',
                entries: [
                  'Should probably just go for deck damage. The matchup is so doomed anyway — might as well hope his hammer loses the clash twice. Better than having no win condition.',
                  'Maximize weapon swings any time we play a non-attack action.',
                  'Maximize Crown of Dichotomy value.',
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
                  'The Nebula Blade aggro list consistently loses into everything. Cannot use the tempo gained when outvaluing the opponent — it\'s all bad. Pivoted to a Redline list like the one played in London.',
                  'With Scepter it\'s still good into aggro decks, and Ira should be favoured with blade. Now it\'s time to find the right 55.',
                  'Thinking about giving up the wizard matchup in favour of Florian, Oldhim aggro, and Ira — pretty much covering everything else.',
                  '37 mainboard with a 3-card switchboard "spectrum" from all-defensive to all-offensive.',
                  'Swiftstrike Bracers into Oldhim and Florian — exactly 12 equips.',
                  'Against Scurv: always bring Starfall + Resource Chest.',
                ],
              },
            ],
          },
          {
            date: '07.04.26',
            sections: [
              {
                heading: 'Valda',
                entries: [
                  'Valda is hard. Valda is good. Need to adjust.',
                  'The answer seems to be blocking well and attacking at breakpoints. D-reacts are really good.',
                  'Need to play Rootbound Carapace.',
                ],
              },
              {
                heading: 'Overall',
                entries: [
                  'Redline is really good. No need to adjust for Kayo and Ira — those matchups are great.',
                  'Auto-loss to Oldhim; hard into Kano.',
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
          'Jakob shell is very strong — yellows and blues support the endgame naturally without a dedicated plan. Whittles act as true-damage-generating Cheliceras; transform to Kiss of Death in reactions and flick for extra true damage.',
          'Running both a stealth and non-stealth package depending on the matchup; 3 Incisions feel right.',
          'Big, wide-open meta — need to be ready for everything. Key heroes to tech against: Oscilio, Mario mirror, possibly Gravy.',
          'Against Gravy: either give full tempo or play big chained-disruption hands. Clear allies, play the value game, find angles to force blocks — the person who blocks gets fatigued. D-reacts in arsenal are very good. Always hide info on on-hits to make blocking hard. Play a lot of blocking cards. Be careful with Codex — handing them a Conqueror of the High Seas can be very bad.',
          'Against Oscilio: draw order matters a lot. Constant decision point between disrupting and keeping Mark for Cheli early. Use Amulet before GIAF resolves. Be mindful of Wobble, Cloud Cover, and Sigil of Solace. Headpiece for disruption is also really good.',
          'Frailty Trap remains strong in several matchups. Stealth Attack can be bricky — be cautious with it.',
        ],
        heroReasons: [
          'Big wide meta, solid numbers, good disruption',
        ],
        predictedMeta: [
          { matchup: 'Oscilio', share: '—', note: 'Key tech target' },
          { matchup: 'Mario', share: '—', note: 'Key tech target; mirror practice needed' },
          { matchup: 'Gravy', share: '—', note: 'Possible tech target' },
          { matchup: 'Everything else', share: '—', note: 'Big wide open meta — need to be ready for anything' },
        ],
        notes: [
          {
            date: '18.03.26',
            sections: [
              {
                heading: 'General',
                entries: [
                  'Hyper Inflation is just bad.',
                  'Frailty Trap still feels really strong in some matchups.',
                ],
              },
              {
                heading: 'Victor (defensive)',
                entries: [
                  'Seeing Death Touch early is incredibly important in the slow matchups.',
                  'Always play around Iron Grip if you can.',
                  'Even if fatigue, we should play consistent 60.',
                  'Stealth Attack can be very bricky.',
                  'Deck damage is real as long as they don\'t represent multiple Remembrances.',
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
                  'Be as disruptive as possible. Play defense reactions. Play small disruptive hands while blocking efficiently.',
                  'If they give us space, present more damage to get them into lethal range where we can cheat out the win.',
                  'Pilfer the Tomb is pretty good here.',
                ],
              },
              {
                heading: 'Vynnset',
                entries: [
                  'Play all blues and defense reactions.',
                  'Unsure how much disruption we want — most of it banishes cards from hand, but she shouldn\'t have that many Runegate cards in hand so it could still be useful.',
                  'Check average statistics and consult others on the correct sideboard plan.',
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
                  'The Jakob shell is so good. No need for a dedicated endgame plan — yellows and blues are already doing what we want.',
                  'Whittles are true-damage-generating Cheliceras. Can transform them to Kiss of Death in reactions and flick for extra true damage.',
                  'Everything left in the deck should support this endgame plan.',
                  '"Infinite" supply of Mark as long as we have a Relentless Pursuit.',
                  'The rest is the standard Mario pile. Like having a stealth and a non-stealth package depending on the matchup — huge fan of 3 Incisions.',
                  'Now it\'s time to find the correct gameplan and sideboard into every hero.',
                ],
              },
            ],
          },
          {
            date: '07.04.26',
            sections: [
              {
                heading: 'Gravy',
                entries: [
                  'Either give him full tempo or play big hands against him (chained disruption, etc.).',
                  'Clear allies, play the value game, find an angle to force blocks — the person who blocks gets fatigued.',
                  'Always hide info when threatening on-hits to not make blocking easy.',
                  'D-reacts in arsenal are really good. Play a lot of blocking cards.',
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
                  'Many decision points: disrupt or keep Mark for Cheli early.',
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
