/* ==========================================================================
   Sidestream — application
   Vanilla JS, no build step. Depends on data.js and matcher.js being loaded
   first (both attach globals).
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------- helpers */
  const $ = function (sel, root) { return (root || document).querySelector(sel); };
  const $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  const esc = function (str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };

  const money = function (n) {
    if (n >= 1000) return '$' + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + 'k';
    return '$' + n;
  };

  const payRange = function (pay) { return money(pay[0]) + '–' + money(pay[2]); };

  const icon = function (name, cls) {
    return '<svg viewBox="0 0 24 24" class="' + (cls || 'h-4 w-4') + '" fill="none" stroke="currentColor" ' +
      'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="' + (ICONS[name] || '') + '"/></svg>';
  };

  const catById = function (id) {
    for (let i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i];
    return { name: id, icon: 'grid' };
  };

  /* Text blob used for searching, enriched with the words people actually
     type — "free", "passive", "quick" — rather than only the raw fields. */
  const SYNONYMS = {
    cost:   { none: 'free no cost zero nothing free to start', low: 'cheap low cost small budget', mid: 'moderate investment mid', high: 'expensive capital investment' },
    speed:  { days: 'fast quick immediate now days this week urgent', weeks: 'soon weeks quick month', months: 'medium term months', long: 'slow long term year patient' },
    effort: { active: 'active hands on hourly work trade time', semi: 'semi passive upkeep maintenance', passive: 'passive automatic hands off set and forget' },
    skill:  { beginner: 'beginner easy no experience entry level starter', intermediate: 'intermediate some experience', advanced: 'advanced expert professional skilled' },
    where:  { online: 'online remote from home anywhere', hybrid: 'online or local flexible remote', local: 'local in person offline nearby' }
  };

  STREAMS.forEach(function (s) {
    s._blob = [
      s.name, s.tagline, s.summary, s.tags.join(' '), s.likes.join(' '),
      catById(s.cat).name,
      SYNONYMS.cost[s.cost], SYNONYMS.speed[s.speed], SYNONYMS.effort[s.effort],
      SYNONYMS.skill[s.skill], SYNONYMS.where[s.where],
      s.platforms.map(function (p) { return p[0]; }).join(' ')
    ].join(' ').toLowerCase();
  });

  /* --------------------------------------------------------------- state */
  const PAGE = 12;
  const state = {
    q: '',
    cat: 'all',
    cost: [], speed: [], effort: [], skill: [], where: [],
    minPay: 0,
    sort: 'relevance',
    shown: PAGE,
    saved: []
  };

  try { state.saved = JSON.parse(localStorage.getItem('sidestream:saved') || '[]'); } catch (e) { state.saved = []; }

  const persist = function () {
    try { localStorage.setItem('sidestream:saved', JSON.stringify(state.saved)); } catch (e) {}
  };

  /* --------------------------------------------------------------- toast */
  let toastTimer;
  const toast = function (msg) {
    const el = $('#toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    el.classList.add('animate-pop');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.add('hidden'); }, 2200);
  };

  /* --------------------------------------------------------------- theme */
  $('#themeBtn').addEventListener('click', function () {
    const dark = document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('sidestream:theme', dark ? 'dark' : 'light'); } catch (e) {}
  });

  /* --------------------------------------------------------- mobile menu */
  const menuBtn = $('#menuBtn');
  menuBtn.addEventListener('click', function () {
    const open = $('#mobileMenu').classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', String(!open));
  });
  $$('#mobileMenu a').forEach(function (a) {
    a.addEventListener('click', function () { $('#mobileMenu').classList.add('hidden'); });
  });

  /* ================================================================ FILTER
     Pure function: state in, matching streams out. Category chips count
     against everything *except* the category filter itself, so the numbers
     on the chips stay useful while you browse.
     ==================================================================== */

  const matches = function (s, opts) {
    const o = opts || {};

    if (!o.ignoreCat && state.cat !== 'all' && s.cat !== state.cat) return false;
    if (state.cost.length && state.cost.indexOf(s.cost) === -1) return false;
    if (state.speed.length && state.speed.indexOf(s.speed) === -1) return false;
    if (state.effort.length && state.effort.indexOf(s.effort) === -1) return false;
    if (state.skill.length && state.skill.indexOf(s.skill) === -1) return false;
    if (state.where.length && state.where.indexOf(s.where) === -1) return false;
    if (state.minPay > 0 && s.pay[1] < state.minPay) return false;

    if (state.q) {
      const terms = state.q.toLowerCase().split(/\s+/).filter(Boolean);
      for (let i = 0; i < terms.length; i++) {
        if (s._blob.indexOf(terms[i]) === -1) return false;
      }
    }
    return true;
  };

  const relevance = function (s) {
    if (!state.q) return 0;
    const q = state.q.toLowerCase();
    let score = 0;
    if (s.name.toLowerCase().indexOf(q) > -1) score += 100;
    if (s.tagline.toLowerCase().indexOf(q) > -1) score += 40;
    if (s.tags.join(' ').indexOf(q) > -1) score += 25;
    return score;
  };

  const getResults = function () {
    const out = STREAMS.filter(function (s) { return matches(s); });

    const sorters = {
      relevance: function (a, b) {
        const d = relevance(b) - relevance(a);
        return d !== 0 ? d : b.pay[1] - a.pay[1];
      },
      'pay-desc':  function (a, b) { return b.pay[1] - a.pay[1]; },
      'cost-asc':  function (a, b) { return ORDER.cost[a.cost] - ORDER.cost[b.cost] || b.pay[1] - a.pay[1]; },
      'speed-asc': function (a, b) { return ORDER.speed[a.speed] - ORDER.speed[b.speed] || b.pay[1] - a.pay[1]; },
      az:          function (a, b) { return a.name.localeCompare(b.name); }
    };

    return out.sort(sorters[state.sort] || sorters.relevance);
  };

  /* ============================================================ CATEGORIES */

  const buildCats = function () {
    const wrap = $('#catChips');
    const counts = {};
    STREAMS.forEach(function (s) {
      if (matches(s, { ignoreCat: true })) counts[s.cat] = (counts[s.cat] || 0) + 1;
    });
    const totalAll = STREAMS.filter(function (s) { return matches(s, { ignoreCat: true }); }).length;

    let html = '<button class="cat-chip" role="tab" data-cat="all" aria-selected="' + (state.cat === 'all') + '">' +
      '<span>Everything</span><span class="n">' + totalAll + '</span></button>';

    CATEGORIES.forEach(function (c) {
      const n = counts[c.id] || 0;
      html += '<button class="cat-chip" role="tab" data-cat="' + c.id + '" aria-selected="' + (state.cat === c.id) + '"' +
        (n === 0 ? ' style="opacity:.45"' : '') + '>' +
        icon(c.icon, 'h-4 w-4 opacity-70') + '<span>' + esc(c.short) + '</span><span class="n">' + n + '</span></button>';
    });

    wrap.innerHTML = html;
    $$('.cat-chip', wrap).forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.cat = btn.dataset.cat;
        state.shown = PAGE;
        render();
      });
    });
  };

  /* ================================================================ FACETS */

  const buildFacets = function () {
    $$('[data-facet]').forEach(function (fs) {
      const key = fs.dataset.facet;
      const box = $('.facet-options', fs);
      box.innerHTML = FACETS[key].options.map(function (o) {
        return '<label class="facet-chip"><input type="checkbox" value="' + o.v + '" data-key="' + key + '">' +
          esc(o.label) + (o.hint ? ' <span class="opacity-60">' + esc(o.hint) + '</span>' : '') + '</label>';
      }).join('');
    });

    $$('.facet-chip input').forEach(function (input) {
      input.addEventListener('change', function () {
        const key = input.dataset.key;
        const v = input.value;
        const i = state[key].indexOf(v);
        if (input.checked && i === -1) state[key].push(v);
        if (!input.checked && i > -1) state[key].splice(i, 1);
        state.shown = PAGE;
        render();
      });
    });
  };

  /* ================================================================= CARDS */

  const isSaved = function (id) { return state.saved.indexOf(id) > -1; };

  const effortDots = function (effort) {
    const n = { passive: 1, semi: 2, active: 3 }[effort];
    let d = '<span class="dots" aria-hidden="true">';
    for (let i = 1; i <= 3; i++) d += '<i class="' + (i <= n ? 'on' : '') + '"></i>';
    return d + '</span>';
  };

  const cardHTML = function (s, i) {
    const c = catById(s.cat);
    return '' +
    '<article class="stream-card" style="animation-delay:' + Math.min(i * 28, 320) + 'ms">' +
      '<div class="flex items-start gap-3">' +
        '<span class="grid h-9 w-9 flex-none place-items-center rounded-xl bg-brand-500/12 text-brand-700 dark:text-brand-400">' + icon(c.icon, 'h-[18px] w-[18px]') + '</span>' +
        '<div class="min-w-0 flex-1">' +
          '<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400">' + esc(c.short) + '</p>' +
          '<h3 class="mt-0.5 text-[15px] font-extrabold leading-snug">' + esc(s.name) + '</h3>' +
        '</div>' +
        '<button class="save-btn -mr-1 -mt-1 grid h-8 w-8 flex-none place-items-center rounded-lg text-ink-300 hover:text-brand-600 dark:text-ink-500" ' +
          'data-save="' + s.id + '" aria-pressed="' + isSaved(s.id) + '" aria-label="Save ' + esc(s.name) + ' to shortlist">' +
          '<svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16l-6-4-6 4z"/></svg>' +
        '</button>' +
      '</div>' +

      '<p class="mt-3 text-sm leading-relaxed text-ink-600 dark:text-ink-400">' + esc(s.tagline) + '</p>' +

      '<div class="mt-3.5 flex items-baseline gap-2">' +
        '<span class="font-mono text-lg font-bold text-brand-700 dark:text-brand-400">' + payRange(s.pay) + '</span>' +
        '<span class="text-xs font-semibold text-ink-400">/ month realistic range</span>' +
      '</div>' +

      '<div class="meta-grid">' +
        '<div><p class="k">Start cost</p><p class="v">' + LABELS.cost[s.cost] + '</p></div>' +
        '<div><p class="k">First pay</p><p class="v">' + LABELS.speed[s.speed] + '</p></div>' +
        '<div><p class="k">Effort</p><p class="v">' + LABELS.effort[s.effort] + ' ' + effortDots(s.effort) + '</p></div>' +
      '</div>' +

      '<div class="mt-3.5 flex flex-wrap items-center gap-1.5">' +
        '<span class="tag">' + LABELS.skill[s.skill] + '</span>' +
        '<span class="tag">' + LABELS.where[s.where] + '</span>' +
        s.tags.slice(0, 1).map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') +
      '</div>' +

      '<button class="mt-4 w-full rounded-xl border border-ink-200 py-2.5 text-sm font-bold transition hover:border-brand-500 hover:bg-brand-500 hover:text-ink-950 dark:border-white/10" data-open="' + s.id + '">' +
        'See the detail' +
      '</button>' +
    '</article>';
  };

  /* ================================================================ RENDER */

  const syncUrl = function () {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.cat !== 'all') p.set('cat', state.cat);
    if (state.saved.length) p.set('saved', state.saved.join(','));
    const qs = p.toString();
    history.replaceState(null, '', qs ? '?' + qs + location.hash : location.pathname + location.hash);
  };

  const activePills = function () {
    const pills = [];
    const add = function (key, v, label) {
      pills.push('<span class="active-pill">' + esc(label) +
        '<button data-clear-facet="' + key + '" data-value="' + v + '" aria-label="Remove filter">' +
        '<svg viewBox="0 0 24 24" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button></span>');
    };

    ['cost', 'speed', 'effort', 'skill', 'where'].forEach(function (key) {
      state[key].forEach(function (v) { add(key, v, LABELS[key][v]); });
    });
    if (state.minPay > 0) add('minPay', '', money(state.minPay) + '+/mo');

    $('#activePills').innerHTML = pills.join('');
    $$('[data-clear-facet]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const key = btn.dataset.clearFacet;
        if (key === 'minPay') {
          state.minPay = 0;
          $('#payRange').value = 0;
          $('#payRangeLabel').textContent = '$0+';
        } else {
          const i = state[key].indexOf(btn.dataset.value);
          if (i > -1) state[key].splice(i, 1);
          const input = $('.facet-chip input[data-key="' + key + '"][value="' + btn.dataset.value + '"]');
          if (input) input.checked = false;
        }
        render();
      });
    });

    const count = ['cost', 'speed', 'effort', 'skill', 'where'].reduce(function (n, k) { return n + state[k].length; }, 0) + (state.minPay > 0 ? 1 : 0);
    const badge = $('#filterBadge');
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
  };

  const render = function () {
    const results = getResults();
    const page = results.slice(0, state.shown);

    $('#grid').innerHTML = page.map(cardHTML).join('');
    $('#emptyState').classList.toggle('hidden', results.length > 0);
    $('#grid').classList.toggle('hidden', results.length === 0);
    $('#loadMore').classList.toggle('hidden', results.length <= state.shown);

    $('#resultCount').textContent = results.length === STREAMS.length
      ? 'Showing all ' + results.length + ' income streams'
      : results.length + ' of ' + STREAMS.length + ' match';

    buildCats();
    activePills();
    updateSavedCount();
    syncUrl();

    /* Scoped to the grid: the drawer and detail panel bind their own copies
       of these buttons, and a global selector here would double-bind them. */
    const grid = $('#grid');
    $$('[data-open]', grid).forEach(function (b) {
      b.addEventListener('click', function () { openDetail(b.dataset.open); });
    });
    $$('[data-save]', grid).forEach(function (b) {
      b.addEventListener('click', function (e) { e.stopPropagation(); toggleSave(b.dataset.save); });
    });
  };

  /* =============================================================== SAVING */

  const updateSavedCount = function () {
    $('#savedCount').textContent = state.saved.length;
    /* Comparing needs two things to compare; sharing needs one. */
    $('#compareBtn').disabled = state.saved.length < 2;
    $('#shareSaved').disabled = state.saved.length === 0;
  };

  const toggleSave = function (id) {
    const i = state.saved.indexOf(id);
    if (i > -1) {
      state.saved.splice(i, 1);
      toast('Removed from shortlist');
    } else {
      state.saved.push(id);
      toast('Saved to shortlist');
    }
    persist();
    $$('[data-save="' + id + '"]').forEach(function (b) { b.setAttribute('aria-pressed', String(isSaved(id))); });
    updateSavedCount();
    syncUrl();
    if (!$('#shortlistDrawer').classList.contains('hidden')) renderShortlist();
  };

  const renderShortlist = function () {
    const body = $('#shortlistBody');
    if (!state.saved.length) {
      body.innerHTML = '<div class="py-16 text-center">' +
        '<div class="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ink-100 dark:bg-ink-800">' +
          '<svg viewBox="0 0 24 24" class="h-7 w-7 text-ink-400" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 4h12v16l-6-4-6 4z"/></svg></div>' +
        '<h3 class="mt-4 font-bold">Nothing saved yet</h3>' +
        '<p class="mx-auto mt-1 max-w-xs text-sm text-ink-500 dark:text-ink-400">Tap the bookmark on any card to keep it here while you compare.</p></div>';
      return;
    }

    const items = state.saved.map(function (id) {
      const s = STREAMS.filter(function (x) { return x.id === id; })[0];
      if (!s) return '';
      return '<div class="mb-3 rounded-2xl border border-ink-200 bg-white p-4 dark:border-white/10 dark:bg-ink-800">' +
        '<div class="flex items-start justify-between gap-3">' +
          '<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400">' + esc(catById(s.cat).short) + '</p>' +
          '<h3 class="mt-0.5 font-bold leading-snug">' + esc(s.name) + '</h3></div>' +
          '<button data-save="' + s.id + '" class="save-btn grid h-8 w-8 flex-none place-items-center rounded-lg text-brand-600" aria-pressed="true" aria-label="Remove">' +
            '<svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16l-6-4-6 4z"/></svg></button>' +
        '</div>' +
        '<p class="mt-2 font-mono text-sm font-bold text-brand-700 dark:text-brand-400">' + payRange(s.pay) + '<span class="ml-1 font-sans text-xs font-semibold text-ink-400">/mo</span></p>' +
        '<div class="mt-2 flex flex-wrap gap-1.5"><span class="tag">' + LABELS.cost[s.cost] + '</span><span class="tag">' + LABELS.speed[s.speed] + '</span></div>' +
        '<button data-open="' + s.id + '" class="mt-3 text-sm font-bold text-brand-700 underline-offset-4 hover:underline dark:text-brand-400">Open detail</button>' +
      '</div>';
    }).join('');

    body.innerHTML = items;
    $$('[data-save]', body).forEach(function (b) {
      b.addEventListener('click', function () { toggleSave(b.dataset.save); });
    });
    $$('[data-open]', body).forEach(function (b) {
      b.addEventListener('click', function () { closeAll(); openDetail(b.dataset.open); });
    });
  };

  /* ============================================================== COMPARING */

  /* A shortlist is only useful if you can put the entries next to each other.
     Rows with an objectively better direction get the winner marked, so the
     eye lands on the tradeoff rather than on ten columns of prose. */
  const RANKS = {
    cost:  { none: 0, low: 1, mid: 2, high: 3 },
    speed: { days: 0, weeks: 1, months: 2, long: 3 }
  };

  const dotScale = function (n, max) {
    let d = '<span class="dots" aria-hidden="true">';
    for (let i = 1; i <= max; i++) d += '<i class="' + (i <= n ? 'on' : '') + '"></i>';
    return d + '</span>';
  };

  /* Indices tying for the lowest score. Ties win together — naming one
     arbitrary winner among equals is a lie the eye believes. A row where
     everything is level has no winner worth drawing. */
  const bestBy = function (list, score) {
    if (list.length < 2) return {};
    let low = Infinity;
    const scores = list.map(function (s) {
      const v = score(s);
      if (v < low) low = v;
      return v;
    });
    const win = {};
    scores.forEach(function (v, i) { if (v === low) win[i] = true; });
    return Object.keys(win).length === list.length ? {} : win;
  };

  /* [label, cell(stream), winners(list) | null] */
  const COMPARE_ROWS = [
    ['Category', function (s) { return esc(catById(s.cat).short); }, null],
    ['Monthly range', function (s) {
      return '<span class="font-mono font-bold text-brand-700 dark:text-brand-400">' + payRange(s.pay) + '</span>';
    }, null],
    ['Typical month', function (s) {
      return '<span class="font-mono font-bold">' + money(s.pay[1]) + '</span>';
    }, function (list) { return bestBy(list, function (s) { return -s.pay[1]; }); }],
    ['Startup cost', function (s) {
      return esc(s.costLabel) + '<span class="block text-xs font-semibold text-ink-400">' + LABELS.cost[s.cost] + '</span>';
    }, function (list) { return bestBy(list, function (s) { return RANKS.cost[s.cost]; }); }],
    ['First payment', function (s) {
      return esc(s.speedLabel) + '<span class="block text-xs font-semibold text-ink-400">' + LABELS.speed[s.speed] + '</span>';
    }, function (list) { return bestBy(list, function (s) { return RANKS.speed[s.speed]; }); }],
    ['Ongoing effort', function (s) {
      return LABELS.effort[s.effort] + ' ' + effortDots(s.effort);
    }, null],
    ['Skill needed', function (s) { return LABELS.skill[s.skill]; }, null],
    ['Where', function (s) { return LABELS.where[s.where]; }, null],
    ['Scalability', function (s) {
      return dotScale(s.scale, 5) + '<span class="ml-1.5 text-xs font-semibold text-ink-400">' + s.scale + '/5</span>';
    }, function (list) { return bestBy(list, function (s) { return -s.scale; }); }],
    ['Risk', function (s) {
      return dotScale(s.risk, 5) + '<span class="ml-1.5 text-xs font-semibold text-ink-400">' + s.risk + '/5</span>';
    }, function (list) { return bestBy(list, function (s) { return s.risk; }); }],
    ['Main upside', function (s) { return esc(s.pros[0] || '—'); }, null],
    ['Main downside', function (s) { return esc(s.cons[0] || '—'); }, null]
  ];

  const savedStreams = function () {
    return state.saved.map(function (id) {
      return STREAMS.filter(function (x) { return x.id === id; })[0];
    }).filter(Boolean);
  };

  const renderCompare = function () {
    const list = savedStreams();
    const panel = $('#comparePanel');
    if (!list.length) return;

    const head = list.map(function (s) {
      return '<th scope="col" class="cmp-col">' +
        '<div class="flex items-start justify-between gap-2">' +
          '<span class="cmp-name">' + esc(s.name) + '</span>' +
          '<button data-drop="' + s.id + '" class="cmp-drop" aria-label="Remove ' + esc(s.name) + ' from the comparison">' +
            '<svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>' +
          '</button>' +
        '</div>' +
        '<button data-open="' + s.id + '" class="cmp-detail">See the detail</button>' +
      '</th>';
    }).join('');

    const body = COMPARE_ROWS.map(function (row) {
      const win = row[2] ? row[2](list) : {};
      return '<tr>' +
        '<th scope="row" class="cmp-label">' + row[0] + '</th>' +
        list.map(function (s, i) {
          return '<td class="cmp-cell' + (win[i] ? ' is-best' : '') + '">' + row[1](s) + '</td>';
        }).join('') +
      '</tr>';
    }).join('');

    panel.innerHTML = '' +
      '<header class="flex items-start justify-between gap-4 border-b border-ink-200 p-5 dark:border-white/10 sm:p-6">' +
        '<div>' +
          '<h2 id="compareTitle" class="text-xl font-extrabold leading-tight sm:text-2xl">Side by side</h2>' +
          '<p class="mt-1 text-sm text-ink-500 dark:text-ink-400">' + list.length + ' shortlisted ' +
            (list.length === 1 ? 'stream' : 'streams') + '. Ticks mark the better number in a row, not the better choice.</p>' +
        '</div>' +
        '<button data-close class="grid h-10 w-10 flex-none place-items-center rounded-xl border border-ink-200 dark:border-white/10" aria-label="Close">' +
          '<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
      '</header>' +

      '<div class="modal-scroll flex-1">' +
        '<div class="cmp-scroll">' +
          '<table class="cmp-table"><thead><tr><td class="cmp-corner"></td>' + head + '</tr></thead>' +
          '<tbody>' + body + '</tbody></table>' +
        '</div>' +
        '<p class="px-5 pb-5 pt-4 text-xs leading-relaxed text-ink-500 dark:text-ink-400 sm:px-6">' +
          'Ranges are researched figures for someone doing this seriously, not promises — most people land near the floor. ' +
          'A low risk score means little money at stake, not that the income is assured.</p>' +
      '</div>' +

      '<footer class="flex gap-2 border-t border-ink-200 p-4 dark:border-white/10">' +
        '<button data-back-to-list class="rounded-xl border border-ink-200 px-5 py-3 text-sm font-bold dark:border-white/10">Back to shortlist</button>' +
        '<button data-close class="flex-1 rounded-xl bg-brand-500 py-3 text-sm font-bold text-ink-950">Done</button>' +
      '</footer>';

    $$('[data-drop]', panel).forEach(function (b) {
      b.addEventListener('click', function () {
        toggleSave(b.dataset.drop);
        if (state.saved.length) renderCompare();
        else closeAll();
      });
    });
    $$('[data-open]', panel).forEach(function (b) {
      b.addEventListener('click', function () { closeAll(); openDetail(b.dataset.open); });
    });
    $('[data-back-to-list]', panel).addEventListener('click', function () {
      closeAll();
      renderShortlist();
      openModal($('#shortlistDrawer'));
    });
  };

  /* ================================================================ MODALS */

  const openModal = function (el) {
    el.classList.remove('hidden');
    el.setAttribute('data-state', 'open');
    document.body.classList.add('modal-open');
  };

  const closeAll = function () {
    ['#detailModal', '#quizModal', '#shortlistDrawer', '#compareModal'].forEach(function (sel) {
      const el = $(sel);
      el.classList.add('hidden');
      el.removeAttribute('data-state');
    });
    document.body.classList.remove('modal-open');
  };

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeAll();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAll();
  });

  /* ---------------------------------------------------------- detail view */

  const openDetail = function (id) {
    const s = STREAMS.filter(function (x) { return x.id === id; })[0];
    if (!s) return;
    const c = catById(s.cat);

    $('#detailPanel').innerHTML = '' +
      '<header class="flex items-start gap-4 border-b border-ink-200 p-5 dark:border-white/10 sm:p-6">' +
        '<span class="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-brand-500/12 text-brand-700 dark:text-brand-400">' + icon(c.icon, 'h-5 w-5') + '</span>' +
        '<div class="min-w-0 flex-1">' +
          '<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400">' + esc(c.name) + '</p>' +
          '<h2 id="detailTitle" class="mt-0.5 text-xl font-extrabold leading-tight sm:text-2xl">' + esc(s.name) + '</h2>' +
        '</div>' +
        '<div class="flex flex-none gap-2">' +
          '<button data-save="' + s.id + '" aria-pressed="' + isSaved(s.id) + '" class="save-btn grid h-10 w-10 place-items-center rounded-xl border border-ink-200 dark:border-white/10" aria-label="Save to shortlist">' +
            '<svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 4h12v16l-6-4-6 4z"/></svg></button>' +
          '<button data-close class="grid h-10 w-10 place-items-center rounded-xl border border-ink-200 dark:border-white/10" aria-label="Close">' +
            '<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        '</div>' +
      '</header>' +

      '<div class="modal-scroll flex-1 p-5 sm:p-6">' +
        '<div class="mx-auto max-w-3xl">' +
          '<p class="text-lg font-semibold leading-relaxed">' + esc(s.tagline) + '</p>' +

          '<div class="mt-5 grid gap-3 sm:grid-cols-3">' +
            '<div class="rounded-2xl border border-brand-200 bg-brand-50/70 p-4 dark:border-brand-500/25 dark:bg-brand-500/10">' +
              '<p class="text-[11px] font-extrabold uppercase tracking-wider text-brand-800 dark:text-brand-300">Realistic monthly</p>' +
              '<p class="mt-1 font-mono text-2xl font-bold text-brand-800 dark:text-brand-300">' + payRange(s.pay) + '</p>' +
              '<p class="mt-1 text-xs font-semibold text-brand-700/80 dark:text-brand-400/80">typical ' + money(s.pay[1]) + '/mo</p>' +
            '</div>' +
            '<div class="rounded-2xl border border-ink-200 p-4 dark:border-white/10">' +
              '<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400">To get started</p>' +
              '<p class="mt-1 text-lg font-bold">' + esc(s.costLabel) + '</p>' +
              '<p class="mt-1 text-xs font-semibold text-ink-400">' + LABELS.cost[s.cost] + '</p>' +
            '</div>' +
            '<div class="rounded-2xl border border-ink-200 p-4 dark:border-white/10">' +
              '<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400">First payment in</p>' +
              '<p class="mt-1 text-lg font-bold">' + esc(s.speedLabel) + '</p>' +
              '<p class="mt-1 text-xs font-semibold text-ink-400">' + LABELS.effort[s.effort] + '</p>' +
            '</div>' +
          '</div>' +

          '<p class="mt-6 leading-relaxed text-ink-700 dark:text-ink-300">' + esc(s.summary) + '</p>' +

          '<div class="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">' +
            '<div>' +
              '<h3 class="text-sm font-extrabold uppercase tracking-wider text-ink-400">How to start</h3>' +
              '<ol class="mt-4">' + s.steps.map(function (st, i) {
                return '<li class="step-item text-sm leading-relaxed" data-n="' + (i + 1) + '">' + esc(st) + '</li>';
              }).join('') + '</ol>' +

              '<div class="mt-8 grid gap-6 sm:grid-cols-2">' +
                '<div><h3 class="text-sm font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-400">What works</h3>' +
                  '<ul class="mt-3 space-y-2">' + s.pros.map(function (p) { return '<li class="bullet-good">' + esc(p) + '</li>'; }).join('') + '</ul></div>' +
                '<div><h3 class="text-sm font-extrabold uppercase tracking-wider text-rose-600 dark:text-rose-400">What to expect</h3>' +
                  '<ul class="mt-3 space-y-2">' + s.cons.map(function (p) { return '<li class="bullet-bad">' + esc(p) + '</li>'; }).join('') + '</ul></div>' +
              '</div>' +

              '<div class="mt-8 rounded-2xl border border-amber-300/70 bg-amber-50 p-4 dark:border-amber-500/25 dark:bg-amber-500/5">' +
                '<h3 class="flex items-center gap-2 text-sm font-extrabold text-amber-900 dark:text-amber-300">' +
                  '<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 9v4M12 16.5v.5" stroke-linecap="round"/><path d="M10.3 3.9 2.6 17.1A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.9L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>' +
                  'Watch out for</h3>' +
                '<ul class="mt-3 space-y-2 text-sm leading-relaxed text-amber-900/90 dark:text-amber-200/80">' +
                  s.flags.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
              '</div>' +
            '</div>' +

            '<div>' +
              '<h3 class="text-sm font-extrabold uppercase tracking-wider text-ink-400">At a glance</h3>' +
              '<dl class="mt-3">' +
                '<div class="dl-row"><dt>Skill needed</dt><dd>' + LABELS.skill[s.skill] + '</dd></div>' +
                '<div class="dl-row"><dt>Where you work</dt><dd>' + LABELS.where[s.where] + '</dd></div>' +
                '<div class="dl-row"><dt>Ongoing effort</dt><dd>' + LABELS.effort[s.effort] + '</dd></div>' +
                '<div class="dl-row"><dt>Room to scale</dt><dd>' + '★'.repeat(s.scale) + '<span class="opacity-25">' + '★'.repeat(5 - s.scale) + '</span></dd></div>' +
                '<div class="dl-row"><dt>Risk of loss</dt><dd>' + '★'.repeat(s.risk) + '<span class="opacity-25">' + '★'.repeat(5 - s.risk) + '</span></dd></div>' +
              '</dl>' +

              '<h3 class="mt-8 text-sm font-extrabold uppercase tracking-wider text-ink-400">Where people do this</h3>' +
              '<ul class="mt-3 space-y-2">' + s.platforms.map(function (p) {
                return '<li><a href="' + esc(p[1]) + '" target="_blank" rel="noopener noreferrer" ' +
                  'class="group flex items-center justify-between gap-2 rounded-xl border border-ink-200 px-3.5 py-2.5 text-sm font-bold transition hover:border-brand-500 hover:bg-brand-500/5 dark:border-white/10">' +
                  '<span>' + esc(p[0]) + '</span>' +
                  '<svg viewBox="0 0 24 24" class="h-3.5 w-3.5 flex-none opacity-40 transition group-hover:translate-x-0.5 group-hover:opacity-100" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M7 17 17 7M9 7h8v8"/></svg></a></li>';
              }).join('') + '</ul>' +
              '<p class="mt-3 text-xs leading-relaxed text-ink-400">Links are for orientation only. Sidestream has no affiliation with, and earns nothing from, any platform listed.</p>' +

              '<div class="mt-8 flex flex-wrap gap-1.5">' +
                s.tags.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    $$('[data-save]', $('#detailPanel')).forEach(function (b) {
      b.addEventListener('click', function () { toggleSave(b.dataset.save); });
    });

    openModal($('#detailModal'));
    $('#detailPanel').querySelector('.modal-scroll').scrollTop = 0;
  };

  /* ================================================================== QUIZ */

  let quizStep = 0;
  const answers = { likes: [] };

  const renderQuiz = function () {
    const panel = $('#quizPanel');

    /* ------- results screen ------- */
    if (quizStep >= QUIZ.length) {
      const results = runMatcher(answers, 6);
      panel.innerHTML = '' +
        '<header class="flex items-center justify-between gap-4 border-b border-ink-200 p-5 dark:border-white/10">' +
          '<div><p class="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400">Your matches</p>' +
          '<h2 id="quizTitle" class="text-xl font-extrabold">Six that fit your constraints</h2></div>' +
          '<button data-close class="grid h-10 w-10 flex-none place-items-center rounded-xl border border-ink-200 dark:border-white/10" aria-label="Close">' +
            '<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        '</header>' +
        '<div class="modal-scroll flex-1 p-5">' +
          results.map(function (r, i) {
            const s = r.stream;
            const dash = 2 * Math.PI * 22;
            return '<div class="mb-3 rounded-2xl border border-ink-200 bg-white p-4 dark:border-white/10 dark:bg-ink-800">' +
              '<div class="flex items-start gap-4">' +
                '<div class="relative grid h-14 w-14 flex-none place-items-center">' +
                  '<svg class="score-ring absolute inset-0 h-14 w-14" viewBox="0 0 50 50">' +
                    '<circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" class="text-ink-200 dark:text-white/10" stroke-width="4"/>' +
                    '<circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" class="text-brand-500" stroke-width="4" stroke-linecap="round" ' +
                      'stroke-dasharray="' + dash + '" stroke-dashoffset="' + (dash * (1 - r.score / 100)) + '"/></svg>' +
                  '<span class="font-mono text-sm font-bold">' + r.score + '</span>' +
                '</div>' +
                '<div class="min-w-0 flex-1">' +
                  '<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400">#' + (i + 1) + ' · ' + esc(catById(s.cat).short) + '</p>' +
                  '<h3 class="mt-0.5 font-extrabold leading-snug">' + esc(s.name) + '</h3>' +
                  '<p class="mt-1 font-mono text-sm font-bold text-brand-700 dark:text-brand-400">' + payRange(s.pay) + '<span class="ml-1 font-sans text-xs font-semibold text-ink-400">/mo</span></p>' +
                  (r.reasons.length ? '<p class="mt-2 text-sm text-ink-600 dark:text-ink-400"><span class="font-bold text-brand-700 dark:text-brand-400">Why:</span> ' + esc(r.reasons.join(', ')) + '</p>' : '') +
                  (r.warnings.length ? '<p class="mt-1 text-sm text-amber-700 dark:text-amber-400"><span class="font-bold">But:</span> ' + esc(r.warnings.join('; ')) + '</p>' : '') +
                  '<button data-open="' + s.id + '" class="mt-2.5 text-sm font-bold text-brand-700 underline-offset-4 hover:underline dark:text-brand-400">See the detail</button>' +
                '</div>' +
              '</div></div>';
          }).join('') +
          '<p class="mt-4 rounded-xl bg-ink-100 p-3 text-xs leading-relaxed text-ink-500 dark:bg-ink-800 dark:text-ink-400">' +
            'Scores reflect fit with your answers, not quality or likelihood of success. Pick one, give it sixty days of real effort, then judge it.</p>' +
        '</div>' +
        '<footer class="flex gap-2 border-t border-ink-200 p-4 dark:border-white/10">' +
          '<button data-restart class="flex-1 rounded-xl border border-ink-200 py-3 text-sm font-bold dark:border-white/10">Start over</button>' +
          '<button data-close class="flex-1 rounded-xl bg-brand-500 py-3 text-sm font-bold text-ink-950">Browse the directory</button>' +
        '</footer>';

      $$('[data-open]', panel).forEach(function (b) {
        b.addEventListener('click', function () { closeAll(); openDetail(b.dataset.open); });
      });
      $('[data-restart]', panel).addEventListener('click', function () {
        quizStep = 0;
        answers.likes = [];
        renderQuiz();
      });
      return;
    }

    /* ------- question screen ------- */
    const q = QUIZ[quizStep];
    const pct = Math.round((quizStep / QUIZ.length) * 100);
    const current = answers[q.id];

    panel.innerHTML = '' +
      '<header class="border-b border-ink-200 p-5 dark:border-white/10">' +
        '<div class="flex items-center justify-between gap-4">' +
          '<p class="text-[11px] font-extrabold uppercase tracking-wider text-ink-400">Question ' + (quizStep + 1) + ' of ' + QUIZ.length + '</p>' +
          '<button data-close class="grid h-9 w-9 place-items-center rounded-lg border border-ink-200 dark:border-white/10" aria-label="Close">' +
            '<svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
        '</div>' +
        '<div class="progress-track mt-3"><div class="progress-fill" style="width:' + pct + '%"></div></div>' +
      '</header>' +

      '<div class="modal-scroll flex-1 p-5 sm:p-6">' +
        '<h2 id="quizTitle" class="text-xl font-extrabold leading-snug sm:text-2xl">' + esc(q.q) + '</h2>' +
        (q.help ? '<p class="mt-2 text-sm text-ink-500 dark:text-ink-400">' + esc(q.help) + '</p>' : '') +
        '<div class="mt-5 ' + (q.type === 'multi' ? 'grid gap-2 sm:grid-cols-2' : 'space-y-2.5') + '">' +
          q.options.map(function (o) {
            const checked = q.type === 'multi'
              ? (answers.likes.indexOf(o.v) > -1)
              : (current === o.v);
            return '<label class="quiz-option"' + (q.type === 'single' ? ' data-single' : '') + '>' +
              '<input type="' + (q.type === 'multi' ? 'checkbox' : 'radio') + '" name="' + q.id + '" value="' + o.v + '"' + (checked ? ' checked' : '') + '>' +
              '<span class="box"></span>' +
              '<span class="min-w-0"><span class="block font-bold leading-snug">' + esc(o.label) + '</span>' +
              (o.desc ? '<span class="mt-0.5 block text-sm text-ink-500 dark:text-ink-400">' + esc(o.desc) + '</span>' : '') + '</span></label>';
          }).join('') +
        '</div>' +
      '</div>' +

      '<footer class="flex gap-2 border-t border-ink-200 p-4 dark:border-white/10">' +
        (quizStep > 0 ? '<button data-back class="rounded-xl border border-ink-200 px-5 py-3 text-sm font-bold dark:border-white/10">Back</button>' : '') +
        '<button data-next class="flex-1 rounded-xl bg-brand-500 py-3 text-sm font-bold text-ink-950 transition disabled:cursor-not-allowed disabled:opacity-40"' +
          (q.type === 'single' && !current ? ' disabled' : '') + '>' +
          (quizStep === QUIZ.length - 1 ? 'See my matches' : 'Continue') + '</button>' +
      '</footer>';

    $$('input', panel).forEach(function (input) {
      input.addEventListener('change', function () {
        if (q.type === 'multi') {
          const i = answers.likes.indexOf(input.value);
          if (input.checked && i === -1) answers.likes.push(input.value);
          if (!input.checked && i > -1) answers.likes.splice(i, 1);
        } else {
          answers[q.id] = input.value;
          $('[data-next]', panel).disabled = false;
        }
      });
    });

    $('[data-next]', panel).addEventListener('click', function () {
      quizStep++;
      renderQuiz();
    });
    const back = $('[data-back]', panel);
    if (back) back.addEventListener('click', function () { quizStep--; renderQuiz(); });
  };

  $$('[data-open-quiz]').forEach(function (b) {
    b.addEventListener('click', function () {
      renderQuiz();
      openModal($('#quizModal'));
    });
  });

  /* ========================================================= STATIC BLOCKS */

  const buildSafety = function () {
    $('#redFlags').innerHTML = RED_FLAGS.map(function (f) {
      return '<li class="flag-item"><strong>' + esc(f[0]) + '</strong>' + esc(f[1]) + '</li>';
    }).join('');

    $('#greenFlags').innerHTML = GREEN_FLAGS.map(function (f) {
      return '<li class="flag-item"><strong>' + esc(f[0]) + '</strong>' + esc(f[1]) + '</li>';
    }).join('');

    $('#checklist').innerHTML = CHECKLIST.map(function (c, i) {
      return '<div class="checklist-item"><span>' + String(i + 1).padStart(2, '0') + '</span><span>' + esc(c) + '</span></div>';
    }).join('');
  };

  const buildFaq = function () {
    $('#faqList').innerHTML = FAQS.map(function (f) {
      return '<details class="faq-item"><summary class="faq-q list-none">' + esc(f[0]) +
        '<svg viewBox="0 0 24 24" class="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>' +
        '</summary><div class="faq-a">' + esc(f[1]) + '</div></details>';
    }).join('');
  };

  const buildFooterCats = function () {
    $('#footerCats').innerHTML = CATEGORIES.slice(0, 6).map(function (c) {
      return '<li><a class="foot-link" href="#directory" data-footer-cat="' + c.id + '">' + esc(c.name) + '</a></li>';
    }).join('');
    $$('[data-footer-cat]').forEach(function (a) {
      a.addEventListener('click', function () {
        state.cat = a.dataset.footerCat;
        state.shown = PAGE;
        render();
      });
    });
  };

  /* ============================================================== CONTROLS */

  let searchTimer;
  const onSearch = function (value) {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () {
      state.q = value.trim();
      state.shown = PAGE;
      render();
    }, 160);
  };

  $('#searchInput').addEventListener('input', function (e) { onSearch(e.target.value); });

  $('#heroSearchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const v = $('#heroSearch').value.trim();
    $('#searchInput').value = v;
    state.q = v;
    state.shown = PAGE;
    render();
    document.getElementById('directory').scrollIntoView({ behavior: 'smooth' });
  });

  $$('.quick-tag').forEach(function (b) {
    b.addEventListener('click', function () {
      const q = b.dataset.q;
      $('#heroSearch').value = q;
      $('#searchInput').value = q;
      state.q = q;
      state.shown = PAGE;
      render();
      document.getElementById('directory').scrollIntoView({ behavior: 'smooth' });
    });
  });

  $('#sortSelect').addEventListener('change', function (e) {
    state.sort = e.target.value;
    render();
  });

  $('#filterToggle').addEventListener('click', function () {
    const hidden = $('#filterPanel').classList.toggle('hidden');
    $('#filterToggle').setAttribute('aria-expanded', String(!hidden));
  });

  $('#payRange').addEventListener('input', function (e) {
    state.minPay = Number(e.target.value);
    $('#payRangeLabel').textContent = money(state.minPay) + '+';
    state.shown = PAGE;
    render();
  });

  $('#loadMore').addEventListener('click', function () {
    state.shown += PAGE;
    render();
  });

  const resetAll = function () {
    state.q = '';
    state.cat = 'all';
    state.cost = []; state.speed = []; state.effort = []; state.skill = []; state.where = [];
    state.minPay = 0;
    state.sort = 'relevance';
    state.shown = PAGE;
    $('#searchInput').value = '';
    $('#heroSearch').value = '';
    $('#sortSelect').value = 'relevance';
    $('#payRange').value = 0;
    $('#payRangeLabel').textContent = '$0+';
    $$('.facet-chip input').forEach(function (i) { i.checked = false; });
    render();
  };

  $('#resetBtn').addEventListener('click', resetAll);
  $$('[data-reset]').forEach(function (b) { b.addEventListener('click', resetAll); });

  $('#shortlistBtn').addEventListener('click', function () {
    renderShortlist();
    openModal($('#shortlistDrawer'));
  });

  $('#compareBtn').addEventListener('click', function () {
    if (state.saved.length < 2) return;
    closeAll();
    renderCompare();
    openModal($('#compareModal'));
  });

  /* Puts the shortlist somewhere that outlives this browser. Falls back to a
     visible URL when the clipboard is unavailable, which it is on plain http
     in some browsers and whenever the page is not focused. */
  $('#shareSaved').addEventListener('click', function () {
    if (!state.saved.length) return;
    syncUrl();
    const url = location.href;
    const ok = function () { toast('Link copied — your shortlist travels with it'); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(ok, function () { prompt('Copy your shortlist link:', url); });
    } else {
      prompt('Copy your shortlist link:', url);
    }
  });

  $('#clearSaved').addEventListener('click', function () {
    if (!state.saved.length) return;
    state.saved = [];
    persist();
    renderShortlist();
    updateSavedCount();
    render();
    toast('Shortlist cleared');
  });

  /* ================================================================ EXTRAS */

  const animateCounters = function () {
    /* Every stat is derived from the data, so adding entries updates the hero
       numbers with no markup change. */
    const totals = {
      total: STREAMS.length,
      cats: CATEGORIES.length,
      free: STREAMS.filter(function (s) { return s.cost === 'none'; }).length,
      fast: STREAMS.filter(function (s) { return s.speed === 'days' || s.speed === 'weeks'; }).length
    };

    $$('.counter').forEach(function (el) {
      const target = totals[el.dataset.key] !== undefined ? totals[el.dataset.key] : Number(el.dataset.to);
      const dur = 900;
      const start = performance.now();
      const tick = function (now) {
        const p = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  const setupReveal = function () {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    $$('#match > div > div > div, #safety > div, #safety .rounded-3xl, #faq .faq-item').forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = Math.min(i * 50, 300) + 'ms';
      io.observe(el);
    });
  };

  /* Stats counter runs when the hero stats scroll into view. Falls back to
     running immediately when IntersectionObserver is unavailable, and a
     timeout guarantees the numbers are never left sitting at zero on short
     viewports where the observer may not fire. */
  const watchStats = function () {
    const first = $('.counter');
    if (!first) return;

    let done = false;
    const go = function () {
      if (done) return;
      done = true;
      animateCounters();
    };

    if (!('IntersectionObserver' in window)) { go(); return; }

    const io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { go(); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(first.closest('dl'));

    setTimeout(go, 2500);
  };

  /* ================================================================== INIT */

  const readUrl = function () {
    const p = new URLSearchParams(location.search);
    const q = p.get('q');
    const cat = p.get('cat');
    if (q) {
      state.q = q;
      $('#searchInput').value = q;
      $('#heroSearch').value = q;
    }
    if (cat && CATEGORIES.some(function (c) { return c.id === cat; })) state.cat = cat;

    /* A shortlist arriving by link is merged into whatever is already saved
       rather than replacing it — a shared link should never cost someone the
       list they built themselves. Unknown ids are dropped silently. */
    const shared = p.get('saved');
    if (shared) {
      shared.split(',').forEach(function (id) {
        if (state.saved.indexOf(id) > -1) return;
        if (STREAMS.some(function (x) { return x.id === id; })) state.saved.push(id);
      });
      persist();
    }
  };

  const init = function () {
    $('#heroCount').textContent = STREAMS.length;
    $('#searchInput').placeholder = 'Search ' + STREAMS.length + ' income streams...';
    $$('[data-count="total"]').forEach(function (el) { el.textContent = STREAMS.length; });

    readUrl();
    buildFacets();
    buildSafety();
    buildFaq();
    buildFooterCats();
    render();
    watchStats();
    setupReveal();
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
