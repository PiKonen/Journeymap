# Journeymap

An interactive eCommerce customer journey map. Eight stages laid out as
swimlanes, with the customer's emotional arc drawn as a curve, every pain point
and opportunity documented with the evidence behind it, and Google Analytics
figures carrying their four-week trend.

> **The data in this repository is sample data.** Every GA figure, research
> finding, sample size and Jira ticket number is invented for demonstration.
> Nothing here was measured. Replace the contents of `src/data/` before showing
> this to anyone who might act on it.

## Opening it

`dist/journey-map.html` is a single self-contained file with no dependencies —
open it directly in a browser, or serve it with GitHub Pages. It is committed so
the map can be read without installing anything.

To work on the source, serve `src/` over HTTP (ES modules will not load over
`file://`):

```sh
python3 -m http.server -d src 8000   # then open http://localhost:8000
```

After editing anything under `src/`, rebuild:

```sh
node build.mjs        # or: npm run build
```

Requires Node 18 or newer. There are no dependencies to install.

## Layout

```
src/
├── index.html          page shell: header, modal, legend
├── styles.css          all styling, including both colour themes
├── render.js           builds the grid from the data
├── app.js              modal, ticket copying, keyboard handling
└── data/
    ├── journey.js      the eight stages, their actions and moods
    ├── cards.js        48 pain points and opportunities
    ├── metrics.js      GA figures and their trends
    └── initiatives.js  active work, keyed by Jira ticket
build.mjs               inlines src/ into dist/
dist/
├── journey-map.html    standalone document (Pages, local viewing)
└── artifact.html       same page as a Claude Artifact fragment
```

Nothing about the map is hand-written markup. The grid, the emotional curve, all
48 cards and every metric are generated from `src/data/`, so content changes are
data edits rather than HTML surgery — and the cards can never drift out of sync
with the modals that describe them.

## Editing the content

**Adding a stage.** Append to `STAGES` in `journey.js`, then add matching entries
to `METRICS` and `CARD_ORDER` under the same `id`. The grid widens, and the
emotional curve extends to include it, automatically.

**Changing a mood.** Set `mood` on a stage to `delighted`, `happy`, `neutral` or
`anxious`. The curve height, the marker colour and the emoji all follow from
that one value — the curve is computed, not drawn by hand.

**Adding a card.** Add an entry to `CARDS` with a `meaning` and a `measurement`,
then list its id in `CARD_ORDER` under the stage and kind (`pain` or
`opportunity`) where it belongs. Give it a `ticket` to attach an initiative and
show the wrench badge.

## Two conventions worth knowing

**Trend direction and sentiment are separate fields.** `direction` is which way
a number moved; `sentiment` is whether that is good or bad news. They are
independent because the same direction means opposite things depending on the
metric — rising conversion is good, rising bounce is bad, and rising support
contacts are bad even though the arrow points the same way. A single
"up is green" rule would paint a worsening bounce rate as an improvement.

**`pp` and `%` are different units.** `pp` is percentage *points*, used for
rates: a bounce rate going 12% → 13.4% is `+1.4pp`. Bare `%` is relative change,
used for counts: 10,000 → 10,620 sessions is `+6.2%`. Conflating the two is a
common way for a dashboard to mislead.

## Accessibility

Cards are reachable by Tab and open with Enter or Space; the modal moves focus to
its close button, closes on Escape, and returns focus to the card you came from.
Trend indicators pair their colour with an arrow glyph and a text delta, so
direction never depends on colour alone, and each carries a description of the
exact change. Both colour themes were checked against WCAG AA contrast for small
text.

## Wiring up real data

`src/data/metrics.js` is the file to replace. Each metric needs a current value,
the previous four-week average, and a flag for whether higher is better — the
arrow direction and the sentiment colour both follow from those three inputs, so
a fetch that supplies them can drive the whole row.
