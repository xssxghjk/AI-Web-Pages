// Shared sport calorie calculation functions — single source of truth used by
// calorie-tracker, calendar, and profile pages.
//
// All functions return kcal (integer) or null when weight is unavailable.

var ActivityCalc = (function() {

  // Running: ~1 kcal / kg / km (steady-state rule of thumb).
  // Falls back to 8.0 MET × weight × time when only duration is available.
  function runningKcal(weightKg, km, timeMin) {
    if (!weightKg) return null;
    if (km)      return Math.round(weightKg * km);
    if (timeMin) return Math.round(8.0 * weightKg * timeMin / 60);
    return null;
  }

  // Bouldering: effective MET accounts for ~1/5 active climbing + ~4/5 rest.
  // Grade-based to distinguish easy vs hard sessions.
  var _BOULDER_GRADES = [1, 2, 3, 4, 5, 6, 7];
  function boulderingMet(wavg) {
    return wavg <= 2 ? 1.6 : wavg <= 4 ? 1.8 : 2.0;
  }
  // Computes calories for a single session object { grades: {1..7: count}, duration: minutes|null }.
  function boulderingSessionKcal(weightKg, session) {
    var grades = (session && session.grades) || {};
    var total  = _BOULDER_GRADES.reduce(function(n, g) { return n + (grades[g] || 0); }, 0);
    var wavg   = total > 0
      ? _BOULDER_GRADES.reduce(function(n, g) { return n + (grades[g] || 0) * g; }, 0) / total
      : 0;
    var met  = boulderingMet(wavg);
    var dur  = (session.duration || 90) / 60;
    var kcal = weightKg ? Math.round(met * weightKg * dur) : null;
    return {
      kcal: kcal, met: met, wavg: wavg,
      totalClimbs: total,
      duration: session.duration || 90,
      durationEstimated: !session.duration,
    };
  }
  // Sums calories across an array of sessions (all sessions on one day).
  function boulderingKcal(weightKg, sessions) {
    if (!sessions || sessions.length === 0) return 0;
    return sessions.reduce(function(n, s) {
      return n + (boulderingSessionKcal(weightKg, s).kcal || 0);
    }, 0);
  }

  // Strength / resistance training: effective MET 3.0 (includes rest periods).
  var STRENGTH_MET = 3.0;
  function strengthKcal(weightKg, duration) {
    if (!weightKg) return null;
    return Math.round(STRENGTH_MET * weightKg * ((duration || 60) / 60));
  }

  // Walking: ~0.5 kcal / kg / km (distance-based) or MET 3.5 (time-based).
  var WALKING_MET = 3.5;
  function walkingKcal(weightKg, km, timeMin) {
    if (!weightKg) return null;
    if (km)      return Math.round(0.5 * weightKg * km);
    if (timeMin) return Math.round(WALKING_MET * weightKg * timeMin / 60);
    return null;
  }

  return {
    runningKcal:           runningKcal,
    boulderingMet:         boulderingMet,
    boulderingSessionKcal: boulderingSessionKcal,
    boulderingKcal:        boulderingKcal,
    strengthKcal:          strengthKcal,
    STRENGTH_MET:          STRENGTH_MET,
    walkingKcal:           walkingKcal,
    WALKING_MET:           WALKING_MET,
  };
})();
