/* ==========================================================================
   Sidestream — matcher
   --------------------------------------------------------------------------
   Six questions, scored against every stream. Everything runs locally; no
   answer ever leaves the browser.

   Scoring model
   -------------
   Each question contributes a weighted 0..1 sub-score. Hard constraints
   (money you cannot spend, time you do not have) apply a heavy penalty rather
   than a hard filter, so the user still sees near-misses with an honest
   explanation of why they are a stretch.
   ========================================================================== */

const QUIZ = [
  {
    id: 'time',
    q: 'How many hours a week can you realistically give this?',
    help: 'Be honest — the plan that survives contact with a normal week is the one that works.',
    type: 'single',
    options: [
      { v: 'tiny',  label: 'Under 5 hours',  desc: 'Evenings here and there' },
      { v: 'some',  label: '5–15 hours',     desc: 'A couple of evenings plus part of a weekend' },
      { v: 'lots',  label: '15–30 hours',    desc: 'A serious second commitment' },
      { v: 'full',  label: '30+ hours',      desc: 'This is becoming the main thing' }
    ]
  },
  {
    id: 'money',
    q: 'How much money can you put in before earning anything back?',
    help: 'Money you could lose entirely without it affecting your rent.',
    type: 'single',
    options: [
      { v: 'none', label: 'Nothing at all', desc: 'It has to start free' },
      { v: 'low',  label: 'Up to $200',     desc: 'Basic tools or a small stock of materials' },
      { v: 'mid',  label: '$200 – $2,000',  desc: 'Equipment, inventory or software' },
      { v: 'high', label: 'Over $2,000',    desc: 'A real investment I can afford to lose' }
    ]
  },
  {
    id: 'urgency',
    q: 'How soon do you need the first payment?',
    help: 'This single answer rules more options in or out than any other.',
    type: 'single',
    options: [
      { v: 'days',   label: 'Within days',   desc: 'I need money now' },
      { v: 'weeks',  label: 'Within a month', desc: 'Soon, but I am not desperate' },
      { v: 'months', label: 'A few months is fine', desc: 'I can build toward it' },
      { v: 'long',   label: 'I am playing the long game', desc: 'A year of building is acceptable' }
    ]
  },
  {
    id: 'place',
    q: 'Where are you willing to work?',
    type: 'single',
    options: [
      { v: 'online', label: 'Online only',        desc: 'Remote, from home or anywhere' },
      { v: 'any',    label: 'Either is fine',     desc: 'Show me everything' },
      { v: 'local',  label: 'I prefer in-person', desc: 'Hands-on work near home' }
    ]
  },
  {
    id: 'level',
    q: 'What are you bringing to this?',
    type: 'single',
    options: [
      { v: 'beginner',     label: 'Starting from scratch', desc: 'No relevant experience yet' },
      { v: 'intermediate', label: 'Some real skills',      desc: 'I am competent at a few useful things' },
      { v: 'advanced',     label: 'Professional expertise', desc: 'People already pay me for what I know' }
    ]
  },
  {
    id: 'likes',
    q: 'What kind of work do you actually enjoy?',
    help: 'Pick as many as apply. Enjoyment is the only thing that keeps you going past month two.',
    type: 'multi',
    options: [
      { v: 'writing',  label: 'Writing' },
      { v: 'video',    label: 'Video & filming' },
      { v: 'design',   label: 'Design & visuals' },
      { v: 'code',     label: 'Coding & tech' },
      { v: 'teaching', label: 'Teaching & explaining' },
      { v: 'people',   label: 'Talking with people' },
      { v: 'physical', label: 'Hands-on physical work' },
      { v: 'admin',    label: 'Organising & admin' },
      { v: 'selling',  label: 'Selling & negotiating' },
      { v: 'finance',  label: 'Numbers & money' },
      { v: 'crafts',   label: 'Making things by hand' },
      { v: 'food',     label: 'Food & cooking' },
      { v: 'photo',    label: 'Photography' },
      { v: 'audio',    label: 'Audio & voice' },
      { v: 'pets',     label: 'Animals' },
      { v: 'driving',  label: 'Driving' },
      { v: 'research', label: 'Research & analysis' },
      { v: 'home',     label: 'Using space I already have' }
    ]
  }
];

/* ------------------------------------------------------------ scoring maps */

const RANK = {
  cost:  { none: 0, low: 1, mid: 2, high: 3 },
  speed: { days: 0, weeks: 1, months: 2, long: 3 },
  skill: { beginner: 0, intermediate: 1, advanced: 2 },
  time:  { tiny: 0, some: 1, lots: 2, full: 3 },
  money: { none: 0, low: 1, mid: 2, high: 3 },
  level: { beginner: 0, intermediate: 1, advanced: 2 }
};

/* Weekly hours a stream needs before it produces anything worthwhile. */
const TIME_NEED = {
  passive: 0,   // set up, then leave it
  semi:    1,   // a few hours a week of upkeep
  active:  2    // you trade hours for money
};

const WEIGHTS = { money: 24, urgency: 22, level: 15, likes: 20, time: 12, place: 7 };

/* Penalty applied when the user named interests and a stream matches none of
   them. Without it a low-ceiling, constraint-friendly entry (cashback, bank
   bonuses) outranks work the person actually said they want to do. */
const NO_INTEREST_PENALTY = 9;

/**
 * Score one stream against a full set of answers.
 * @returns {{score:number, reasons:string[], warnings:string[]}}
 */
function scoreStream(s, a) {
  let total = 0;
  const reasons = [];
  const warnings = [];

  /* --- budget ---------------------------------------------------------- */
  const need = RANK.cost[s.cost];
  const have = RANK.money[a.money];
  if (need <= have) {
    total += WEIGHTS.money;
    if (need === 0) reasons.push('costs nothing to start');
    else if (need < have) reasons.push('comfortably inside your budget');
  } else {
    const gap = need - have;
    total += Math.max(0, WEIGHTS.money - gap * 13);
    warnings.push(gap > 1 ? 'needs significantly more money than you have available' : 'needs a little more upfront money than you allowed for');
  }

  /* --- urgency --------------------------------------------------------- */
  const takes = RANK.speed[s.speed];
  const canWait = RANK.speed[a.urgency];
  if (takes <= canWait) {
    total += WEIGHTS.urgency;
    if (takes === 0) reasons.push('can pay within days');
    else if (takes < canWait) reasons.push('pays sooner than you need');
  } else {
    const gap = takes - canWait;
    total += Math.max(0, WEIGHTS.urgency - gap * 12);
    warnings.push(gap > 1 ? 'takes far longer to pay than your timeline allows' : 'pays a bit later than you would like');
  }

  /* --- skill ----------------------------------------------------------- */
  const needsSkill = RANK.skill[s.skill];
  const hasSkill = RANK.level[a.level];
  if (needsSkill <= hasSkill) {
    total += WEIGHTS.level;
    if (needsSkill === 0 && hasSkill > 0) reasons.push('well within your current ability');
    else if (needsSkill === hasSkill && needsSkill > 0) reasons.push('matches your experience level');
  } else {
    total += Math.max(0, WEIGHTS.level - (needsSkill - hasSkill) * 11);
    warnings.push('expects skills you would need to build first');
  }

  /* --- interests ------------------------------------------------------- */
  const likes = a.likes || [];
  if (!likes.length) {
    /* No preference stated: stay neutral rather than punishing everything. */
    total += WEIGHTS.likes * 0.5;
  } else {
    const hits = s.likes.filter(function (l) { return likes.indexOf(l) > -1; });
    const ratio = hits.length / Math.max(1, Math.min(s.likes.length, 3));
    total += WEIGHTS.likes * Math.min(1, ratio);
    if (hits.length) {
      reasons.push(hits.length > 1 ? 'plays to several things you enjoy' : 'uses work you said you enjoy');
    } else {
      total -= NO_INTEREST_PENALTY;
      warnings.push('is nothing like the work you said you enjoy');
    }
  }

  /* --- available time -------------------------------------------------- */
  const hours = RANK.time[a.time];
  const demand = TIME_NEED[s.effort];
  if (demand <= hours) {
    total += WEIGHTS.time;
    if (s.effort === 'passive') reasons.push('barely touches your week once running');
  } else {
    total += Math.max(0, WEIGHTS.time - (demand - hours) * 7);
    warnings.push('realistically needs more hours a week than you have');
  }

  /* --- location -------------------------------------------------------- */
  if (a.place === 'any' || s.where === 'hybrid' || s.where === a.place) {
    total += WEIGHTS.place;
  } else {
    warnings.push(s.where === 'local' ? 'requires working in person' : 'is online rather than in person');
  }

  /* --- small nudges ---------------------------------------------------- */
  if (a.urgency === 'long' && s.scale >= 4) { total += 3; reasons.push('can grow well beyond your own hours'); }
  if (a.money === 'none' && s.risk >= 4) total -= 6;
  if (a.time === 'tiny' && s.effort === 'active') total -= 3;

  return {
    score: Math.max(0, Math.min(100, Math.round(total))),
    reasons: reasons.slice(0, 3),
    warnings: warnings.slice(0, 2)
  };
}

/**
 * Rank every stream. Returns the best `limit` results, each annotated.
 */
function runMatcher(answers, limit) {
  return STREAMS
    .map(function (s) {
      const r = scoreStream(s, answers);
      return { stream: s, score: r.score, reasons: r.reasons, warnings: r.warnings };
    })
    .sort(function (a, b) {
      if (b.score !== a.score) return b.score - a.score;
      return b.stream.pay[1] - a.stream.pay[1];
    })
    .slice(0, limit || 6);
}
