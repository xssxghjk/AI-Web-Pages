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
