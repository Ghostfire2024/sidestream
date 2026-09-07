/* ==========================================================================
   Boots index.html + the three scripts inside the DOM stub, and hands back
   the globals a test needs to poke at. No dependencies.
   ========================================================================== */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { createDocument } = require('./dom-stub');

const ROOT = path.join(__dirname, '..');
const SCRIPTS = ['assets/js/data.js', 'assets/js/matcher.js', 'assets/js/app.js'];

/* Every test boots a fresh app, so read and compile once and reuse. V8 keeps
   the compiled form, which is most of the cost of a 270KB dataset. */
const compiled = SCRIPTS.map(function (rel) {
  return new vm.Script(fs.readFileSync(path.join(ROOT, rel), 'utf8'), { filename: rel });
});

const PAGE_HTML = (function () {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const body = html.slice(html.indexOf('<body'), html.lastIndexOf('</body>'));
  return body.slice(body.indexOf('>') + 1);
})();

function boot(opts) {
  opts = opts || {};
  const search = opts.search || '';
  const stored = opts.storage || {};

  const document = createDocument();
  document.body.innerHTML = PAGE_HTML;

  const store = Object.assign({}, stored);
  const localStorage = {
    getItem: function (k) { return Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null; },
    setItem: function (k, v) { store[k] = String(v); },
    removeItem: function (k) { delete store[k]; },
    _dump: function () { return store; }
  };

  const location = {
    pathname: '/',
    search: search,
    hash: '',
    get href() { return 'http://localhost:4173' + this.pathname + this.search + this.hash; }
  };

  const timers = [];
  const sandbox = {
    document: document,
    localStorage: localStorage,
    location: location,
    history: {
      replaceState: function (_s, _t, url) {
        const q = url.indexOf('?');
        location.search = q > -1 ? url.slice(q) : '';
        location.pathname = (q > -1 ? url.slice(0, q) : url).split('#')[0] || '/';
      }
    },
    navigator: { clipboard: { writeText: function (t) { sandbox.__copied = t; return Promise.resolve(); } } },
    URLSearchParams: URLSearchParams,
    console: console,
    Promise: Promise,
    Math: Math,
    JSON: JSON,
    Date: Date,
    performance: { now: function () { return 0; } },
    prompt: function (_m, v) { sandbox.__prompted = v; return v; },
    /* Deferred work is collected rather than run, so a test can flush it
       deliberately instead of racing it. */
    setTimeout: function (fn, ms) { timers.push({ fn: fn, ms: ms || 0 }); return timers.length; },
    clearTimeout: function (i) { if (timers[i - 1]) timers[i - 1].fn = null; },
    requestAnimationFrame: function (fn) { timers.push({ fn: fn, ms: 0 }); },
    /* Observing fires straight away, which is what the app expects to happen
       eventually anyway — everything it defers is a reveal or a counter. */
    IntersectionObserver: function (cb) {
      const self = this;
      this.observe = function (el) { cb([{ isIntersecting: true, target: el }], self); };
      this.unobserve = function () {};
      this.disconnect = function () {};
    },
    matchMedia: function () { return { matches: false, addEventListener: function () {} }; }
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;

  vm.createContext(sandbox);
  compiled.forEach(function (script) { script.runInContext(sandbox); });

  /* data.js and friends declare with const, which lands in the context's
     lexical scope rather than on the sandbox object. Pull them across so a
     test can reach them. */
  ['STREAMS', 'CATEGORIES', 'FACETS', 'LABELS', 'QUIZ', 'scoreAll'].forEach(function (name) {
    try { sandbox[name] = vm.runInContext(name, sandbox); } catch (e) {}
  });

  sandbox.flush = function () {
    let guard = 0;
    while (timers.length && guard++ < 500) {
      const t = timers.shift();
      if (t.fn) t.fn();
    }
  };
  sandbox.$ = function (sel) { return document.querySelector(sel); };
  sandbox.$$ = function (sel) { return document.querySelectorAll(sel); };
  sandbox.storage = localStorage;

  return sandbox;
}

module.exports = { boot: boot };
