/* ==========================================================================
   A DOM small enough to read, large enough to run app.js.

   The project has no build step and no dependencies, so the tests do not get
   to have any either. This is a deliberately permissive stub: every element
   supports every method app.js reaches for, elements are created on demand,
   and innerHTML is parsed just far enough that querySelector can find the
   attributes the app binds to ([data-open], [data-save], id, class).
   ========================================================================== */
'use strict';

/* ------------------------------------------------------------------ nodes */

function Element(tag) {
  this.tagName = (tag || 'div').toUpperCase();
  this.children = [];
  this.parent = null;
  this.attrs = {};
  this.dataset = {};
  this.style = {};
  this.listeners = {};
  this._text = '';
  this.value = '';
  this.checked = false;
  this.disabled = false;
  this.placeholder = '';
  this._html = '';
  this.classList = new ClassList(this);
}

function ClassList(el) { this.el = el; this._set = []; }
ClassList.prototype.add = function () {
  for (var i = 0; i < arguments.length; i++) {
    if (this._set.indexOf(arguments[i]) === -1) this._set.push(arguments[i]);
  }
};
ClassList.prototype.remove = function () {
  for (var i = 0; i < arguments.length; i++) {
    var j = this._set.indexOf(arguments[i]);
    if (j > -1) this._set.splice(j, 1);
  }
};
ClassList.prototype.contains = function (c) { return this._set.indexOf(c) > -1; };
ClassList.prototype.toggle = function (c, force) {
  var on = force === undefined ? !this.contains(c) : !!force;
  if (on) this.add(c); else this.remove(c);
  return on;
};

/* A real node stringifies whatever you assign, and app.js assigns numbers. */
Object.defineProperty(Element.prototype, 'textContent', {
  get: function () {
    return this._text + this.children.map(function (c) { return c.textContent; }).join('');
  },
  set: function (v) { this._text = String(v); this.children = []; }
});

Object.defineProperty(Element.prototype, 'className', {
  get: function () { return this.classList._set.join(' '); },
  set: function (v) { this.classList._set = String(v).split(/\s+/).filter(Boolean); }
});

Element.prototype.setAttribute = function (k, v) {
  this.attrs[k] = String(v);
  if (k.indexOf('data-') === 0) this.dataset[camel(k.slice(5))] = String(v);
  if (k === 'class') this.className = v;
  if (k === 'id') this.id = v;
};
Element.prototype.getAttribute = function (k) {
  return Object.prototype.hasOwnProperty.call(this.attrs, k) ? this.attrs[k] : null;
};
Element.prototype.removeAttribute = function (k) { delete this.attrs[k]; };
Element.prototype.hasAttribute = function (k) { return Object.prototype.hasOwnProperty.call(this.attrs, k); };

Element.prototype.addEventListener = function (type, fn) {
  (this.listeners[type] = this.listeners[type] || []).push(fn);
};
Element.prototype.removeEventListener = function (type, fn) {
  var l = this.listeners[type] || [];
  var i = l.indexOf(fn);
  if (i > -1) l.splice(i, 1);
};

/* Fires the handlers on this element, then bubbles to the document so the
   app's delegated [data-close] handler behaves the way it does in a browser. */
Element.prototype.dispatch = function (type, ev) {
  ev = ev || {};
  ev.type = type;
  ev.target = ev.target || this;
  ev.stopPropagation = ev.stopPropagation || function () { ev._stopped = true; };
  ev.preventDefault = ev.preventDefault || function () {};
  var self = this;
  (this.listeners[type] || []).slice().forEach(function (fn) { fn.call(self, ev); });
  if (!ev._stopped && this.doc) this.doc._bubble(type, ev);
  return ev;
};
Element.prototype.click = function () { return this.dispatch('click'); };

Element.prototype.appendChild = function (child) {
  child.parent = this;
  child.doc = this.doc;
  this.children.push(child);
  return child;
};

Element.prototype.closest = function (sel) {
  var node = this;
  while (node) {
    if (node.matches && node.matches(sel)) return node;
    node = node.parent;
  }
  return null;
};

Element.prototype.matches = function (sel) { return matchSel(this, sel); };

Object.defineProperty(Element.prototype, 'innerHTML', {
  get: function () { return this._html; },
  set: function (html) {
    this._html = String(html);
    /* Replacing, not appending — parse() builds onto the node it is given. */
    this.children = [];
    this._text = '';
    parse(String(html), this);
  }
});

Element.prototype.querySelector = function (sel) { return this.querySelectorAll(sel)[0] || null; };
Element.prototype.querySelectorAll = function (sel) {
  var out = [];
  (function walk(node) {
    node.children.forEach(function (c) {
      if (matchSel(c, sel)) out.push(c);
      walk(c);
    });
  })(this);
  return out;
};

function camel(s) { return s.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); }

/* --------------------------------------------------------------- selectors
   Supports the shapes app.js and the tests actually use: #id, .class, tag,
   [attr], [attr="value"], comma lists, and descendant combinators. */
function matchCompound(el, part) {
  var m, ok = true;
  var rest = part;

  var attrs = [];
  rest = rest.replace(/\[([^\]]+)\]/g, function (_, body) { attrs.push(body); return ''; });

  if (rest[0] === '*') rest = rest.slice(1);
  else if ((m = rest.match(/^([a-zA-Z][\w-]*)/))) {
    if (el.tagName !== m[1].toUpperCase()) ok = false;
    rest = rest.slice(m[1].length);
  }

  rest.replace(/#([\w-]+)/g, function (_, id) { if (el.id !== id) ok = false; return ''; });
  rest.replace(/\.([\w-]+)/g, function (_, c) { if (!el.classList.contains(c)) ok = false; return ''; });

  attrs.forEach(function (body) {
    var eq = body.match(/^([^=]+)=["']?([^"']*)["']?$/);
    if (eq) { if (el.getAttribute(eq[1]) !== eq[2]) ok = false; }
    else if (!el.hasAttribute(body)) ok = false;
  });

  return ok;
}

function matchSel(el, sel) {
  return String(sel).split(',').some(function (branch) {
    var parts = branch.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return false;
    if (!matchCompound(el, parts.pop())) return false;
    /* Walk up looking for each ancestor compound, right to left. */
    var node = el.parent;
    while (parts.length) {
      var want = parts[parts.length - 1];
      var found = false;
      while (node) {
        if (matchCompound(node, want)) { found = true; node = node.parent; break; }
        node = node.parent;
      }
      if (!found) return false;
      parts.pop();
    }
    return true;
  });
}

/* ------------------------------------------------------------------ parser
   Not a real HTML parser. It pulls out every open tag with its attributes and
   the text between tags, nesting by a stack. Void and self-closed tags do not
   push. That is enough for querySelector and textContent assertions. */
var VOID = ['br', 'hr', 'img', 'input', 'meta', 'link', 'path', 'circle', 'rect', 'source'];

function parse(html, root) {
  var stack = [{ el: root, kids: [] }];
  var re = /<\/?([a-zA-Z][\w-]*)((?:\s+[^\s=>]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/g;
  var m, last = 0;

  while ((m = re.exec(html))) {
    var text = html.slice(last, m.index).replace(/\s+/g, ' ');
    if (text.trim()) stack[stack.length - 1].el._text += text;
    last = re.lastIndex;

    var closing = m[0][1] === '/';
    var tag = m[1].toLowerCase();

    if (closing) {
      if (stack.length > 1) stack.pop();
      continue;
    }

    var el = new Element(tag);
    el.doc = root.doc;
    var attrRe = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
    var a;
    while ((a = attrRe.exec(m[2] || ''))) {
      var val = a[2] !== undefined ? a[2] : a[3] !== undefined ? a[3] : a[4] !== undefined ? a[4] : '';
      el.setAttribute(a[1], val);
    }
    stack[stack.length - 1].el.appendChild(el);

    if (VOID.indexOf(tag) === -1 && !m[3]) stack.push({ el: el, kids: [] });
  }

  var tail = html.slice(last).replace(/\s+/g, ' ');
  if (tail.trim()) stack[stack.length - 1].el._text += tail;

  return root.children;
}

/* --------------------------------------------------------------- document */

function createDocument() {
  var doc = new Element('#document');
  doc.doc = doc;
  doc.documentElement = new Element('html');
  doc.body = new Element('body');
  doc.documentElement.doc = doc;
  doc.body.doc = doc;
  doc.readyState = 'complete';
  doc.appendChild(doc.documentElement);
  doc.documentElement.appendChild(doc.body);

  doc.createElement = function (tag) { var el = new Element(tag); el.doc = doc; return el; };
  doc._bubble = function (type, ev) {
    (doc.listeners[type] || []).slice().forEach(function (fn) { fn.call(doc, ev); });
  };
  return doc;
}

module.exports = { Element: Element, createDocument: createDocument, matchSel: matchSel };
