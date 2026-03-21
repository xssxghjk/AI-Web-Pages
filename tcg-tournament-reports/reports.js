/**
 * Tournament Reports Data
 *
 * To add a new report, copy one of the objects below and paste it at the
 * TOP of the REPORTS array (newest first), then fill in the fields.
 *
 * Fields reference:
 *   id          – unique kebab-case string, e.g. 'rtn-hagen-2026-01-03'
 *   hero        – hero name, title-cased, e.g. 'Slippy'
 *   date        – ISO date for sorting, e.g. '2026-01-03'
 *   displayDate – human-readable date shown on the card, e.g. '03.01.26'
 *   event       – event name, e.g. 'RTN Hagen'
 *   eventType   – one of: RTN | PQ | Battleground | Showdown | Calling | Worlds | PT
 *   tier        – 1–4, auto-derived from eventType but can be overridden
 *   generalNotes – array of rough note strings (shown collapsed)
 *   rounds      – array of round objects (shown collapsed), listed highest R# first:
 *                   { number, opponent, result: 'win'|'loss', score: '2–1'|null, notes: [] }
 *   summary     – free-form paragraph shown at the top of the card
 *   learnings   – array of { tag, text } shown expanded as key takeaways
 */

const REPORTS = [

  // ── PASTE YOUR NEXT REPORT HERE (newest first) ────────────────────────────

  {
    id: 'pq-darmstadt-2026-03-21',
    hero: 'Mario',
    date: '2026-03-21',
    displayDate: '21.03.26',
    event: 'PQ Darmstadt',
    eventType: 'PQ',
    generalNotes: [
      'Anti-fatigue package needed vs Valda — Fatigue is their backup plan',
      'Pilfer the Tomb would have been useful vs Gravy',
      'Need more reps vs Ira — play midrange, not fatigue',
      'Need to find correct sideboard plan vs Gravy',
      'Awareness of damage left in deck is key',
      'Remembrance is very good for getting back Retrieve',
      'Need more Gravy reps',
      'Need more full fatigue reps',
      'Need more Vynnset reps (did not come up but a matchup to study)',
      'Time to finalize sideboard guide',
    ],
    rounds: [
      {
        number: 7,
        opponent: 'Gravy',
        result: 'loss',
        score: '0–8',
        notes: [
          'Top 4 — went first',
          'Had complicated lines that were not seen or played optimally',
          'Good early game but denied hard by 4 d-reacts',
          'All 3 Blood in the Waters blocked 6 (twice discarded from hand, 1 from top)',
          'Did not get the life lead needed',
          'Chum takes so many cards',
          'Need to find the correct sideboard plan',
        ],
      },
      {
        number: 6,
        opponent: 'Kassai',
        result: 'win',
        score: '31–0',
        notes: [
          'Top 8 — went second',
          'Presented 70 and tried to fatigue — was not close',
          'Made sure to get as much damage as possible from the deck once far enough ahead',
          'IPed on double tarantula for 6 value per card',
        ],
      },
      {
        number: 5,
        opponent: 'Ira',
        result: 'loss',
        score: '0–7',
        notes: [
          'Went first',
          'Brain was fried — misplayed multiple times',
          'Thought defensive Ira is closer to fatigue but got beaten up',
          'Should be ready to play a midrange game, not a fatigue game',
          'Need more reps',
        ],
      },
      {
        number: 4,
        opponent: 'Jarl',
        result: 'win',
        score: '19–0',
        notes: [
          'Went second — 3 cards left in deck',
          'Early game was miserable, could not get Chelicera online',
          'Turnaround play with Spreading Plague for 5 bloodrots',
          'All anti-fatigue plays worked out perfectly',
          'Remembrance was really good getting back Retrieve',
          'Awareness of damage left in deck is key — do not sacrifice deck damage for panic plays',
        ],
      },
      {
        number: 3,
        opponent: 'Gravy',
        result: 'win',
        score: '19–0',
        notes: [
          'Went first',
          'Early turns a little awkward playing around Chum',
          'Opponent never got to resolve second Chum or any Sawbones — made it easy',
          "Using Mario's go-again on-hit is pretty important — okay to be greedy sometimes",
          'Sequencing can be pretty complicated playing around allies',
          'Did not have Pilfer the Tomb in the list — would have been nice',
        ],
      },
      {
        number: 2,
        opponent: 'Valda',
        result: 'win',
        score: '18–0',
        notes: [
          'Went second',
          'Valda low-rolled really hard',
          'Hit good value turns',
          'Was not greedy with flicking Klaive since already ahead',
          'D-reacts bricked hard but mostly because Valda bricked as well',
          'Fatigue is their backup plan — consider anti-fatigue package',
          'D-reacts are really good to cover the crushes',
        ],
      },
      {
        number: 1,
        opponent: 'Fang',
        result: 'win',
        score: '11–0',
        notes: [
          'Went second',
          'Fang was online early (turn 3)',
          'Hit Codex into Codex into Codex — put very far ahead',
          'First Codex very awkward — saw Blunten from Cut from the Same Cloth, had to discard and IP but Frailty still worth',
          'Flicked Klaive in the midgame for a big play',
          'Found the Retrieve in time',
        ],
      },
    ],
    summary: 'Went 4–1 Swiss and finished Top 4 at PQ Darmstadt with Mario. Wins against Fang (Codex into Codex into Codex highroll), Valda (opponent low-rolled; d-reacts and Klaive timing were key), Gravy in Swiss (opponent never resolved second Chum or Sawbones), Jarl (Spreading Plague for 5 bloodrots as a turnaround), and Kassai in Top 8 (31–0 fatigue — not close). Loss in Swiss to Ira (misplays on a fried brain — played it as a fatigue matchup instead of midrange) and in Top 4 to Gravy (denied by 4 d-reacts; all three Blood in the Waters were blocked for 6 combined).',
    learnings: [
      { tag: 'Codex Chains',  text: 'Hitting multiple Codexes in a row is a massive swing — prioritise setting up the chain. The first Codex can be awkward (saw Blunten from Cut from the Same Cloth, had to discard and IP) but Frailty value makes it still worth.' },
      { tag: 'Klaive Timing', text: 'Flicking Klaive in the midgame for a big play is strong. Do not be greedy when already ahead — hold it until actually needed for maximum impact.' },
      { tag: 'vs Valda',      text: 'D-reacts are very good to cover the crushes. Fatigue is their backup plan — consider bringing an anti-fatigue package. Did not need to be greedy with Klaive when already far ahead.' },
      { tag: 'vs Gravy',      text: "Chum takes a lot of cards and complicates sequencing. Mario's go-again on-hit is important — okay to be greedy. Blood in the Water can be blanked by d-reacts; did not get the life lead needed in Top 4. Need to find the correct sideboard plan. Pilfer the Tomb would have been useful." },
      { tag: 'vs Jarl',       text: 'Spreading Plague for 5 bloodrots was a game-changing turnaround. Anti-fatigue plays are critical — have a dedicated package. Remembrance getting back Retrieve is very strong. Always track damage remaining in deck and do not make panic plays that sacrifice it.' },
      { tag: 'vs Kassai',     text: 'Presented 70 and played fatigue — not close. IP on double tarantula for 6 value per card. Get as much deck damage as possible once far enough ahead.' },
      { tag: 'vs Ira',        text: 'Do not approach defensive Ira as a fatigue matchup — it is midrange. Need many more reps. Avoid playing important rounds on a fatigued brain.' },
      { tag: 'Deck Build',    text: 'Add Pilfer the Tomb for the Gravy matchup. Evaluate an anti-fatigue package for Valda and similar matchups.' },
      { tag: 'Reps Needed',   text: 'Priority matchups to get more reps in: Gravy (full sideboard lines, complicated sequencing around allies), full fatigue mirror situations, Ira (midrange game plan), and Vynnset (not encountered yet but a matchup to study proactively).' },
      { tag: 'Sideboard',     text: 'Time to finalize the sideboard guide — multiple matchups have unresolved plans (Gravy, Valda anti-fatigue). Consolidate learnings from this event into a concrete guide.' },
    ],
  },

  {
    id: 'pq-mainz-2026-03-15',
    hero: 'Mario',
    date: '2026-03-15',
    displayDate: '15.03.26',
    event: 'PQ Mainz',
    eventType: 'PQ',
    generalNotes: [
      'Need more stealth attacks if playing this many Take Up the Mantles — Whittle from Bones especially',
      'Cremation not convincing',
      'Need more reps',
      'Need to work on correct sideboard ratios',
    ],
    rounds: [
      {
        number: 7,
        opponent: 'Ira',
        result: 'loss',
        score: '0–8',
        notes: [
          'Shouldve won — lost to two misplays',
          'Missed 4 damage due to missed trigger',
          'Allowed a free MoM trigger unnecessarily',
          'Missed frailty trap',
        ],
      },
      {
        number: 6,
        opponent: 'Puffin',
        result: 'win',
        score: '1–0',
        notes: [
          'Really close tight game',
          'Kept getting punished by CNCs',
          'Puffin had 2x Soup Up into Dovetail Palantir with 3 cogs — shouldve lost at that point',
          'Managed to come back at 1 with cool gold plays from the scoundrels',
          'Matchup not great overall',
        ],
      },
      {
        number: 5,
        opponent: 'Teklovossen',
        result: 'win',
        score: '17–0',
        notes: [
          'Boost Teklo — felt closer than it was',
          'Very midrangy; endgame feels pretty favoured if they dont have Singularity',
          'Deck damage is a real factor — was on 9 cards when he died, but wouldve won the fatigue game too',
          'Piercing is really good since cards from hand are also affected',
        ],
      },
      {
        number: 4,
        opponent: 'Dio',
        result: 'win',
        score: '1–0',
        notes: [
          'Really close, shouldve lost',
          '3 blocks good',
          'Probably shouldnt threaten fatigue when really ahead',
          'MaxV double grenade blowout wouldve lost the game',
          'Hard to say when to block how much',
          'Won on 1 — opponent gave tempo out of fatigue fear, wouldve lost otherwise',
        ],
      },
      {
        number: 3,
        opponent: 'Verdance',
        result: 'loss',
        score: null,
        notes: [
          'Lost to time — conceded',
          'Really good early game, was far ahead',
          'D-reacts and Take Up the Mantle bricked hard',
          'Went to time due to slow play — definitely winnable',
          'Codex of Inertia is very good in these midrangy matchups',
        ],
      },
      {
        number: 2,
        opponent: 'Levia',
        result: 'win',
        score: '2–0',
        notes: [
          'Used head for Orb Weaver',
          'Really tight — first Shadow Realm hit 3',
          'Scabs rolls: 4, 2',
          'Got opponent to exactly 13 with reactions to prevent Blasmo',
          'Summoned Blasmo and attacked with it twice',
          'Died to 9 blood debt due to disruption',
          'Critically important to deny Blasmo when behind — she has to lose to herself',
        ],
      },
      {
        number: 1,
        opponent: 'Verdance',
        result: 'win',
        score: '18–0',
        notes: [
          'Won die-roll',
          'Got Orb Weaver turn 0',
          'Early high roll — non-game',
          'Codex of Inertia really good',
          'Used head for go-again stealth into Codex',
        ],
      },
    ],
    summary: 'Went 5–2 at PQ Mainz with Slippy. Wins against Verdance (18–0 turn-0 highroll), Levia, Dio, Teklovossen, and Puffin. Losses to Verdance (bricked on d-reacts and Take Up the Mantle, went to time) and Ira (two punishing misplays — missed trigger cost 4 damage and a free MoM window). Deck performed well when hands aligned; slow play and execution errors were the differentiating factors in the losses.',
    learnings: [
      { tag: 'Deck Build',      text: 'Need more stealth attacks to support Take Up the Mantle — Whittle from Bones in particular. Cremation underperformed and should be reconsidered.' },
      { tag: 'Sideboard',       text: 'Work on correct sideboard ratios — current split not optimised.' },
      { tag: 'Codex',           text: 'Codex of Inertia is excellent in midrangy matchups (Verdance, Teklovossen) — keep and prioritise.' },
      { tag: 'vs Levia',        text: 'Denying Blasmo when behind is critical — Levia has to lose to herself when Blasmo is off the table. Track blood debt carefully.' },
      { tag: 'vs Dio',          text: "Don't threaten fatigue when clearly ahead — it gifted opponent tempo. MaxV double grenade is a potential blowout; blocking decisions are crucial." },
      { tag: 'vs Teklovossen',  text: 'Piercing is very strong (hits cards from hand too). Without Singularity the endgame is favoured; deck damage is a real concern so track card counts.' },
      { tag: 'vs Puffin',       text: 'Matchup is not favourable overall. Watch out for CNCs and the Soup Up into Dovetail Palantir line. Gold/scoundrel plays can claw back from bad spots.' },
      { tag: 'vs Ira',          text: "Never miss triggers — cost 4 damage here. Don't give free MoM triggers. Watch for frailty trap." },
      { tag: 'Pacing',          text: 'Slow play led to a time loss against Verdance in a winning position. Work on play speed.' },
    ],
  },

  {
    id: 'rtn-hagen-2026-01-03',
    hero: 'Slippy',
    date: '2026-01-03',
    displayDate: '03.01.26',
    event: 'RTN Hagen',
    eventType: 'RTN',
    tier: 1,
    generalNotes: [
      'Razor reflex really good',
      'Always use the first nimbilism if no jack was seen yet',
      'More stealth attacks? Too many stealth reactions compared to attacks — double trouble?',
      'Snappies not useful in a lot of games; should be cut — blade beckoner / blacktec / armory deck',
      'Blood splattered vest sideboard for aggro?',
      'Find earth tech',
      'AB1 probably',
    ],
    rounds: [
      {
        number: 6,
        opponent: 'Verdance',
        result: 'loss',
        score: null,
        notes: [
          '8 value behind turn 0',
          'Hands aligned really badly',
          'Not much agency',
        ],
      },
      {
        number: 5,
        opponent: 'Cindra',
        result: 'win',
        score: '0–5',
        notes: [
          'Somewhat close',
          "Misplayed: didn't arsenal a relevant on-hit — threw 3 when it wasn't relevant",
          'Misplayed when opponent bricked — blocked with flick knives instead of hand ("safe play")',
          'Need extra block value',
        ],
      },
      {
        number: 4,
        opponent: 'Kayo',
        result: 'win',
        score: '2–0',
        notes: [
          'Very close',
          'Stampede is busted — might need to block equip earlier',
          'Used snappies very greedy early, probably game-losing',
          'Gotta play around fleshbag',
        ],
      },
      {
        number: 3,
        opponent: 'Slippy',
        result: 'win',
        score: '13–0',
        notes: [
          'Not close',
          'Opponent on standard list with weird adaptations (leyline, surgical)',
          'Deck was smooth, although no codex drawn',
          'Boarding out codex of inertia feels right in the mirror',
        ],
      },
      {
        number: 2,
        opponent: 'Florian',
        result: 'loss',
        score: '0–9',
        notes: [
          'Cursed game: 2 codex with 3 stealth reactions and no stealth attack until turn 3',
          "Hands didn't align",
          'Average Florian hands — no "highroll" turns',
          'Really hard to flick / hit daggers; cut through is a liability',
          'Florian created 4 runechants turn 0',
          "It's a race — probably shouldn't fatstack",
          'First earth banish gives him so much value; meet madness lost the game (equip + felling for 8)',
        ],
      },
      {
        number: 1,
        opponent: 'Puffin',
        result: 'win',
        score: '17–0',
        notes: [
          'No boost — lost in champ select',
          'Good value from savour bloodshed (cost codex value — needed to pitch yellow)',
          'Sketchy double react hand without stealth',
          'No snapdragon scalers value',
          'Yellows are decent filler (shouldn\'t be too many)',
          'No codex of inertias felt correct',
        ],
      },
    ],
    summary: 'Went 4–2 at RTN Hagen with Slippy. Wins against Puffin, the Slippy mirror, Kayo, and Cindra. Losses to Florian (dead opening hand — 2 codex with only reactions, no stealth attack until turn 3) and Verdance (8-value swing on turn 0 with no agency to recover). Deck felt smooth when hands aligned; variance in the Florian and Verdance matches was too swingy to overcome.',
    learnings: [
      { tag: 'Deck Cut',        text: 'Snapdragon scalers underperformed in most games — cut them and replace with blade beckoner, blacktec, or armory deck package.' },
      { tag: 'Card Quality',    text: 'Razor reflex was consistently high value across games — keep and consider increasing.' },
      { tag: 'Sequencing',      text: "Always use the first nimbilism if jack hasn't been seen yet — don't save it." },
      { tag: 'vs Florian',      text: "It's a race — avoid fatstacking. Beware the earth banish engine: first banish gives massive value, and meet madness (equip + felling for 8) can end the game. Cut through is a liability. Flick knives too hard to connect with daggers." },
      { tag: 'vs Kayo',         text: 'Stampede is a blowout — consider blocking equip earlier. Avoid greedy early snappies (probably game-losing). Play around fleshbag.' },
      { tag: 'vs Verdance',     text: 'Very hard to recover from 8+ value disadvantage on turn 0. Hand-dependent matchup with limited agency when behind.' },
      { tag: 'Arsenal',         text: "Arsenal relevant on-hits before throwing non-relevant attacks, especially when opponent bricks — don't waste tempo." },
      { tag: 'Sideboard',       text: 'Blood splattered vest could be a strong sideboard option against aggro — test in upcoming events.' },
      { tag: 'Mirror (Slippy)', text: 'Boarding out codex of inertia feels correct. Standard list played smoothly even without drawing codex.' },
    ],
  },

];
