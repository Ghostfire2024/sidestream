# Sidestream

A static directory of legitimate alternative income — ways to earn money outside a
traditional paycheck, mostly online but not exclusively. It is deliberately **not** a
job board: nothing here is an application to be someone's employee.

Built with HTML, Tailwind CSS and vanilla JavaScript. No build step, no dependencies,
no backend.

**Live: <https://ghostfire2024.github.io/sidestream/>**

---

## Running it locally

Any static server works. A dependency-free one is included:

```bash
node server.js
```

Then open <http://localhost:4173>.

Opening `index.html` directly from the filesystem also works, though a server is
preferable so relative asset paths and `history.replaceState` behave normally.

## Tests

No framework and no dependencies — a small DOM stub boots the real `index.html` and
the three scripts, then exercises the dataset contract, rendering, filtering, the
shortlist, sharing and the matcher.

```bash
node test/run.js
```

---

## Tests

```bash
node test/run.js
```

No dependencies and no runner — the same rule as the site itself. `test/dom-stub.js`
is a small DOM (elements, classList, a permissive `querySelector`, and an HTML parser
good enough for attribute lookups) and `test/harness.js` boots the real `index.html`
and the three real scripts inside a `vm` context. Each test gets a clean app.

It covers the dataset contract on every entry — required fields, enum values,
ascending pay triples, non-empty steps/pros/cons, absolute platform URLs, no
duplicate ids, no empty category and no filter option that matches nothing — plus
rendering, URL state, the shortlist, comparing, and the matcher at both ends of the
answer space. Adding an entry to `data.js` with a typo'd `cost` or a backwards `pay`
range fails the suite rather than quietly producing a card that no filter reaches.

---

## What is in it

- **113 income streams** across **11 categories** — creator work, freelancing, selling
  products, micro-work, renting assets you own, investing, local hands-on work,
  growing and smallholding, teaching, royalties and rewards.
- Each entry carries a researched monthly range, startup cost, time to first payment,
  ongoing effort, skill level, scalability and risk ratings, a how-to-start sequence,
  honest pros and cons, scam warnings specific to that field, and links to the
  platforms people actually use.
- **Matchmaker** — six questions scored against all 113 entries, returning a ranked
  shortlist with the reasoning shown, including why an entry is a stretch.
- **Compare** — put your shortlist side by side across pay, cost, speed, effort,
  skill, scalability and risk. Rows with a better direction mark the winner, ties
  mark nobody, and the whole shortlist travels in a link.
- **Scam watch** — the eight-point test every entry had to pass, plus a pre-commitment
  checklist.

## Features

| | |
|---|---|
| Search | Full-text with synonym expansion, so "passive", "free", "quick" match the right entries |
| Filters | Category, startup cost, time to first payment, effort, skill, location, minimum income |
| Sorting | Best match, earning potential, lowest cost, fastest payment, A–Z |
| Shortlist | Bookmark entries, persisted in `localStorage` |
| Compare | Shortlisted entries side by side across every decision field, with the better number in each row marked |
| Shareable state | Search, category and the shortlist itself sync to the URL query string |
| Theming | Light/dark, follows system preference, choice remembered |
| Accessibility | Keyboard navigable, focus-visible rings, ARIA on tabs/dialogs/toggles, `prefers-reduced-motion` respected |
| Responsive | Single column at 375px through three columns on desktop; print stylesheet included |

## Structure

```
index.html            markup, Tailwind config, section shells
server.js             zero-dependency static server for local preview
assets/
  css/styles.css      component layer Tailwind utilities cannot express
  js/data.js          the dataset — streams, categories, facets, safety copy, FAQs
  js/matcher.js       quiz definition and the weighted scoring model
  js/app.js           filtering, rendering, modals, shortlist, compare, quiz UI
test/
  dom-stub.js         a DOM small enough to read, large enough to run app.js
  harness.js          boots index.html + the three scripts in a vm context
  run.js              the tests
```

`data.js` is the only file you need to touch to add or edit an entry. Each stream is a
plain object; the field contract is documented in the header comment at the top of that
file. Category chip counts, stat counters, facet options and search indexing all derive
from the data automatically — nothing needs updating by hand.

## Adding an income stream

Append an object to `STREAMS` in `assets/js/data.js`:

```js
{
  id: 'unique-slug', name: 'Display name', cat: 'freelance',
  tagline: 'One sentence on what it actually is.',
  summary: 'A paragraph with real numbers and the honest tradeoffs.',
  pay: [low, typical, high],          // monthly USD
  cost: 'none|low|mid|high',  costLabel: '$0–$200',
  speed: 'days|weeks|months|long',  speedLabel: '2–6 weeks',
  effort: 'active|semi|passive',
  skill: 'beginner|intermediate|advanced',
  where: 'online|hybrid|local',
  scale: 1-5, risk: 1-5,
  likes: ['writing', 'research'],     // drives matcher interest scoring
  platforms: [['Name', 'https://…']],
  steps: [], pros: [], cons: [], flags: [], tags: []
}
```

## Editorial rules

Every entry had to pass the same test, which is also published on the site:

1. A real customer pays for real value.
2. Income never depends on recruiting other people.
3. No fee is required in order to be allowed to work.
4. The downsides, failure rates and costs are stated plainly.

That is why multi-level marketing, "done-for-you" store automation packages, and
turnkey-business schemes are absent. Where something is legal but frequently mis-sold —
dropshipping, Amazon private label, vending routes, patent licensing, adult subscription
platforms — it is included with the real numbers and the risk stated in the entry itself.

There are no affiliate links anywhere in this project, and no sponsored placements.
Platform links exist purely for orientation.

## Production note

Tailwind is loaded from the CDN, which prints a console warning and ships more CSS than
needed. For a real deployment, generate a build instead:

```bash
npx tailwindcss -i ./src/input.css -o ./assets/css/tailwind.css --minify
```

Then move the `tailwind.config` object from `index.html` into `tailwind.config.js`,
replace the CDN `<script>` with a `<link>` to the generated file, and keep
`assets/css/styles.css` as-is.

## Licence

Split deliberately, because the code and the research are different kinds of thing:

- **Code** — MIT. Do what you like with the site, the matcher and the tests. See [LICENSE](LICENSE).
- **Dataset and editorial content** — CC BY-SA 4.0. Reuse it, including commercially,
  but attribute it and publish your version under the same terms. See [LICENSE-DATA](LICENSE-DATA).

ShareAlike on the data is the point: it stays open to researchers, educators and
anyone building in the open, while being unattractive to the affiliate-funded
content mills this directory exists as an alternative to.

## Disclaimer

Educational information only — not financial, tax or legal advice. Income figures are
researched ranges, not promises, and most people land at the low end. The investing
entries can lose money. Tax, licensing, insurance and subletting rules vary by country
and city.
