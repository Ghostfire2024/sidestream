/* ==========================================================================
   Sidestream — tests.   node test/run.js
   Covers the dataset contract and the behaviour that is easy to break by
   editing data.js: rendering, filtering, the shortlist, and comparing.
   ========================================================================== */
'use strict';

const { boot } = require('./harness');

let pass = 0;
const fails = [];
const groups = [];

function group(name, fn) { groups.push([name, fn]); }
function ok(cond, msg) {
  if (cond) { pass++; return; }
  fails.push(msg);
}
function eq(actual, expected, msg) {
  ok(actual === expected, msg + '  (expected ' + JSON.stringify(expected) + ', got ' + JSON.stringify(actual) + ')');
}

/* ------------------------------------------------------------------- data */

group('dataset contract', function () {
  const w = boot();
  const { STREAMS, CATEGORIES, LABELS } = w;
  const catIds = CATEGORIES.map(function (c) { return c.id; });

  const enums = {
    cost: ['none', 'low', 'mid', 'high'],
    speed: ['days', 'weeks', 'months', 'long'],
    effort: ['active', 'semi', 'passive'],
    skill: ['beginner', 'intermediate', 'advanced'],
    where: ['online', 'hybrid', 'local']
  };
  const required = ['id', 'name', 'cat', 'tagline', 'summary', 'pay', 'cost', 'costLabel',
    'speed', 'speedLabel', 'effort', 'skill', 'where', 'scale', 'risk', 'likes',
    'platforms', 'steps', 'pros', 'cons', 'flags', 'tags'];

  ok(STREAMS.length > 0, 'STREAMS is not empty');

  const seen = {};
  let bad = [];
  STREAMS.forEach(function (s) {
    const who = s.id || '(no id)';
    required.forEach(function (f) { if (!(f in s)) bad.push(who + ' missing ' + f); });
    if (seen[s.id]) bad.push('duplicate id ' + s.id);
    seen[s.id] = true;
    if (!/^[a-z0-9-]+$/.test(s.id || '')) bad.push(who + ' id is not slug-safe');
    if (catIds.indexOf(s.cat) === -1) bad.push(who + ' unknown category ' + s.cat);
    Object.keys(enums).forEach(function (k) {
      if (enums[k].indexOf(s[k]) === -1) bad.push(who + ' bad ' + k + ': ' + s[k]);
    });
    if (!Array.isArray(s.pay) || s.pay.length !== 3) bad.push(who + ' pay is not a triple');
    else if (!(s.pay[0] <= s.pay[1] && s.pay[1] <= s.pay[2])) bad.push(who + ' pay is not ascending');
    [['scale', 5], ['risk', 5]].forEach(function (p) {
      if (!(s[p[0]] >= 1 && s[p[0]] <= p[1])) bad.push(who + ' ' + p[0] + ' out of range');
    });
    ['steps', 'pros', 'cons'].forEach(function (k) {
      if (!Array.isArray(s[k]) || !s[k].length) bad.push(who + ' ' + k + ' is empty');
    });
    (s.platforms || []).forEach(function (p) {
      if (!Array.isArray(p) || p.length !== 2) bad.push(who + ' platform is not [name, url]');
      else if (!/^https?:\/\//.test(p[1])) bad.push(who + ' platform url is not absolute: ' + p[1]);
    });
  });
  ok(bad.length === 0, 'every stream satisfies the field contract:\n      ' + bad.slice(0, 12).join('\n      '));

  /* Every facet value the UI offers must match something, or the filter is a
     dead end the user can still click. */
  const dead = [];
  Object.keys(enums).forEach(function (k) {
    enums[k].forEach(function (v) {
      if (!STREAMS.some(function (s) { return s[k] === v; })) dead.push(k + '=' + v);
      if (!LABELS[k] || !LABELS[k][v]) dead.push('no label for ' + k + '=' + v);
    });
  });
  ok(dead.length === 0, 'no filter option is a dead end: ' + dead.join(', '));

  const emptyCats = CATEGORIES.filter(function (c) {
    return !STREAMS.some(function (s) { return s.cat === c.id; });
  }).map(function (c) { return c.id; });
  ok(emptyCats.length === 0, 'no category is empty: ' + emptyCats.join(', '));
});

/* ------------------------------------------------------------------ render */

group('directory renders', function () {
  const w = boot();
  ok(w.$('#grid').children.length > 0, 'the grid renders cards');
  eq(w.$('#heroCount').textContent, String(w.STREAMS.length), 'hero count matches the dataset');
  eq(w.$('#catChips').children.length, w.CATEGORIES.length + 1, 'a chip per category, plus All');
  ok(w.$('#faqList').children.length > 0, 'the FAQ renders');
  ok(w.$('#checklist').children.length > 0, 'the checklist renders');
  ok(w.$('#redFlags').children.length > 0, 'red flags render');
  ok(/Showing all|match/.test(w.$('#resultCount').textContent), 'the result count is written');
  ok(w.$('#searchInput').placeholder.indexOf(String(w.STREAMS.length)) > -1, 'the search placeholder counts the dataset');
});

group('search and url state', function () {
  const w = boot({ search: '?q=writing&cat=creator' });
  eq(w.$('#searchInput').value, 'writing', 'the query is restored from the url');
  ok(w.$('#grid').children.length > 0, 'a restored query still matches something');

  const c = boot({ search: '?cat=nonsense' });
  ok(c.$('#grid').children.length > 0, 'an unknown category falls back rather than emptying the grid');
});

/* --------------------------------------------------------------- shortlist */

group('shortlist', function () {
  const w = boot();
  eq(w.$('#savedCount').textContent, '0', 'starts empty');
  eq(w.$('#compareBtn').disabled, true, 'compare is off with nothing saved');
  eq(w.$('#shareSaved').disabled, true, 'sharing is off with nothing saved');

  const first = w.$$('#grid [data-save]')[0];
  ok(!!first, 'cards carry a save control');
  first.click();
  eq(w.$('#savedCount').textContent, '1', 'saving one is counted');
  eq(w.$('#compareBtn').disabled, true, 'one entry is not a comparison');
  eq(w.$('#shareSaved').disabled, false, 'one entry is enough to share');

  w.$$('#grid [data-save]')[1].click();
  eq(w.$('#savedCount').textContent, '2', 'saving a second is counted');
  eq(w.$('#compareBtn').disabled, false, 'two entries can be compared');

  ok(w.location.search.indexOf('saved=') > -1, 'the shortlist reaches the url');
  ok(JSON.parse(w.storage.getItem('sidestream:saved')).length === 2, 'the shortlist is persisted');

  first.click();
  eq(w.$('#savedCount').textContent, '1', 'un-saving removes it');

  w.$('#clearSaved').click();
  eq(w.$('#savedCount').textContent, '0', 'clearing empties the shortlist');
  eq(w.location.search.indexOf('saved='), -1, 'and drops it from the url');
});

group('a shortlist survives the link', function () {
  const ids = boot().STREAMS.slice(0, 3).map(function (s) { return s.id; });
  const w = boot({ search: '?saved=' + ids.join(',') });
  eq(w.$('#savedCount').textContent, '3', 'a shared link restores the shortlist');
  eq(w.$('#compareBtn').disabled, false, 'and it is ready to compare');

  const bogus = boot({ search: '?saved=' + ids[0] + ',not-a-real-stream' });
  eq(bogus.$('#savedCount').textContent, '1', 'unknown ids in a link are ignored');

  /* Opening someone else's link must not cost you your own list. */
  const mine = boot().STREAMS[8].id;
  const merged = boot({
    search: '?saved=' + ids[0],
    storage: { 'sidestream:saved': JSON.stringify([mine]) }
  });
  eq(merged.$('#savedCount').textContent, '2', 'a shared link merges with what was already saved');

  const dupe = boot({
    search: '?saved=' + mine,
    storage: { 'sidestream:saved': JSON.stringify([mine]) }
  });
  eq(dupe.$('#savedCount').textContent, '1', 'an id already saved is not added twice');
});

/* ----------------------------------------------------------------- compare */

group('compare', function () {
  const all = boot().STREAMS;
  /* Two entries chosen so every scored row has a clear winner. */
  const cheap = all.filter(function (s) { return s.cost === 'none' && s.speed === 'days'; })[0];
  const rich = all.filter(function (s) { return s.cost === 'high' && s.pay[1] > (cheap ? cheap.pay[1] : 0); })[0];
  ok(!!cheap && !!rich, 'the dataset contains contrasting entries to compare');
  if (!cheap || !rich) return;

  const w = boot({ search: '?saved=' + cheap.id + ',' + rich.id });
  eq(w.$('#compareModal').classList.contains('hidden'), true, 'the compare modal starts closed');

  w.$('#compareBtn').click();
  eq(w.$('#compareModal').classList.contains('hidden'), false, 'compare opens');

  const panel = w.$('#comparePanel');
  const rows = panel.querySelectorAll('tbody tr');
  ok(rows.length >= 10, 'every comparison row is drawn (' + rows.length + ')');
  eq(panel.querySelectorAll('thead th').length, 2, 'one column per shortlisted stream');

  const cells = panel.querySelectorAll('.cmp-cell');
  eq(cells.length, rows.length * 2, 'each row has a cell per stream');

  const best = panel.querySelectorAll('.cmp-cell.is-best');
  ok(best.length > 0, 'the better number in a row is marked');
  ok(best.length < cells.length, 'not every cell is marked a winner');

  /* Startup cost: free must beat expensive, and only one of them wins. */
  const costRow = rows.filter(function (r) {
    return ((r.querySelector('.cmp-label') || {}).textContent || '').indexOf('Startup cost') > -1;
  })[0];
  ok(!!costRow, 'there is a startup cost row');
  if (costRow) {
    const winners = costRow.querySelectorAll('.cmp-cell.is-best');
    eq(winners.length, 1, 'exactly one startup cost wins');
    const cellsInRow = costRow.querySelectorAll('.cmp-cell');
    eq(cellsInRow.indexOf(winners[0]), 0, 'the free option is the one marked');
  }

  /* Dropping a column re-renders rather than leaving a stale table. */
  panel.querySelectorAll('[data-drop]')[1].click();
  eq(w.$('#savedCount').textContent, '1', 'dropping a column un-saves it');
  eq(w.$('#comparePanel').querySelectorAll('thead th').length, 1, 'the table re-renders with one column');

  /* Dropping the last one has nowhere to go, so it closes. */
  w.$('#comparePanel').querySelectorAll('[data-drop]')[0].click();
  eq(w.$('#compareModal').classList.contains('hidden'), true, 'emptying the comparison closes it');
});

group('compare marks no winner when entries tie', function () {
  const all = boot().STREAMS;
  /* Same stream twice cannot happen through the UI, but two entries with
     identical scores can — nothing should be crowned. */
  const byCost = {};
  all.forEach(function (s) { (byCost[s.cost + '|' + s.pay[1]] = byCost[s.cost + '|' + s.pay[1]] || []).push(s); });
  const twins = Object.keys(byCost).map(function (k) { return byCost[k]; })
    .filter(function (g) { return g.length >= 2; })[0];
  ok(!!twins, 'the dataset has two entries that tie on cost and typical pay');
  if (!twins) return;

  const w = boot({ search: '?saved=' + twins[0].id + ',' + twins[1].id });
  w.$('#compareBtn').click();
  const rows = w.$('#comparePanel').querySelectorAll('tbody tr');
  const costRow = rows.filter(function (r) {
    return ((r.querySelector('.cmp-label') || {}).textContent || '').indexOf('Startup cost') > -1;
  })[0];
  eq(costRow.querySelectorAll('.cmp-cell.is-best').length, 0, 'a tied row crowns nobody');
});

group('sharing copies a link that carries the shortlist', function () {
  const id = boot().STREAMS[3].id;
  const w = boot({ search: '?saved=' + id });
  w.$('#shareSaved').click();
  ok(typeof w.__copied === 'string', 'a link is put on the clipboard');
  ok(w.__copied.indexOf('saved=' + id) > -1, 'and it carries the shortlist: ' + w.__copied);
});

/* -------------------------------------------------------------------- quiz */

group('matcher', function () {
  const w = boot();
  ok(w.QUIZ.length > 0, 'the quiz has questions');

  /* Answer every question with its first option, then with its last, so the
     scorer is exercised at both ends rather than on one lucky path. */
  [0, -1].forEach(function (pick) {
    const answers = { likes: [] };
    w.QUIZ.forEach(function (q) {
      const o = pick === 0 ? q.options[0] : q.options[q.options.length - 1];
      if (q.type === 'multi') answers.likes.push(o.v);
      else answers[q.id] = o.v;
    });

    const ranked = w.runMatcher(answers, 10);
    const label = pick === 0 ? 'first options' : 'last options';
    ok(ranked.length > 0, 'scoring returns a ranked list (' + label + ')');
    ok(ranked.length <= 10, 'the limit is honoured (' + label + ')');
    ok(ranked[0].score >= ranked[ranked.length - 1].score, 'ordered best first (' + label + ')');
    ok(ranked.every(function (r) {
      return typeof r.score === 'number' && isFinite(r.score) && r.score >= 0 && r.score <= 100;
    }), 'every score is a real number in 0-100 (' + label + ')');
    ok(ranked.every(function (r) { return Array.isArray(r.reasons) && Array.isArray(r.warnings); }),
      'every match explains itself (' + label + ')');
    ok(ranked.some(function (r) { return r.reasons.length > 0; }),
      'at least one match gives a reason (' + label + ')');
  });

  /* An empty answer sheet is reachable by closing the quiz early. */
  const blank = w.runMatcher({ likes: [] }, 6);
  ok(blank.length > 0, 'an unanswered quiz still ranks rather than throwing');
});

/* ------------------------------------------------------------------- runner */

groups.forEach(function (g) {
  const before = fails.length;
  try {
    g[1]();
  } catch (e) {
    fails.push(g[0] + ' threw: ' + (e && e.stack ? e.stack.split('\n').slice(0, 3).join('\n      ') : e));
  }
  const bad = fails.length - before;
  console.log((bad ? ' FAIL ' : ' ok   ') + g[0]);
  if (bad) fails.slice(before).forEach(function (f) { console.log('       - ' + f); });
});

console.log('\n' + pass + ' passed, ' + fails.length + ' failed');
process.exit(fails.length ? 1 : 0);
