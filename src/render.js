// Builds the journey grid from the data modules. Nothing about the map is
// hand-written markup, so editing a data file is enough to change the page.

import { STAGES, MOODS } from './data/journey.js';
import { CARDS, CARD_ORDER } from './data/cards.js';
import { METRICS, COMPARISON_WINDOW } from './data/metrics.js';

const COLUMN_WIDTH = 280;
const CURVE_HEIGHT = 140;

const PRIORITY_ARROW = { high: '⬆️', medium: '➡️', low: '⬇️' };
const TREND_ARROW = { up: '▲', down: '▼', flat: '–' };
const TREND_WORD = { up: 'up', down: 'down', flat: 'no change' };

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function svg(tag, attrs) {
  const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [k, v] of Object.entries(attrs || {})) node.setAttribute(k, v);
  return node;
}

/** Horizontal centre of a stage column, in curve coordinates. */
function columnCentre(index) {
  return COLUMN_WIDTH / 2 + index * COLUMN_WIDTH;
}

/**
 * Smooth cubic path through one point per stage, with a horizontal tangent at
 * each point so the curve reads as a settled mood rather than a spike. Runs in
 * from the left edge and out past the last stage.
 */
function moodPath(points, totalWidth) {
  const reach = COLUMN_WIDTH / 3;
  let d = `M 0 ${points[0].y} L ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    d += ` C ${a.x + reach} ${a.y}, ${b.x - reach} ${b.y}, ${b.x} ${b.y}`;
  }
  const last = points[points.length - 1];
  return d + ` L ${totalWidth} ${last.y}`;
}

function stageHeaders(grid) {
  STAGES.forEach(stage => {
    const header = el('div', `stage-header ${stage.performance}`);
    header.appendChild(document.createTextNode(stage.name));
    header.appendChild(el('div', 'performance-indicator', stage.indicator));
    grid.appendChild(header);
  });
}

function actionRow(grid) {
  STAGES.forEach(stage => {
    const lane = el('div', 'swimlane');
    lane.appendChild(el('div', 'swimlane-label', 'Action'));
    lane.appendChild(el('div', 'action-text', stage.action));
    grid.appendChild(lane);
  });
}

function feelingRow(grid) {
  const totalWidth = STAGES.length * COLUMN_WIDTH;
  const points = STAGES.map((stage, i) => ({
    x: columnCentre(i),
    y: MOODS[stage.mood].y,
    mood: MOODS[stage.mood],
    stage,
  }));

  const row = el('div', 'feeling-journey-row');
  const chart = svg('svg', {
    viewBox: `0 0 ${totalWidth} ${CURVE_HEIGHT}`,
    preserveAspectRatio: 'none',
    role: 'img',
    'aria-label':
      'Emotional journey across the eight stages: ' +
      points.map(p => `${p.stage.name} — ${p.mood.label.toLowerCase()}`).join(', ') + '.',
  });

  const defs = svg('defs');
  const gradient = svg('linearGradient', {
    id: 'moodGradient', x1: '0%', y1: '0%', x2: '0%', y2: '100%',
  });
  gradient.appendChild(svg('stop', { offset: '0%', 'stop-color': '#3b82f6', 'stop-opacity': '0.15' }));
  gradient.appendChild(svg('stop', { offset: '100%', 'stop-color': '#3b82f6', 'stop-opacity': '0' }));
  defs.appendChild(gradient);
  chart.appendChild(defs);

  const line = moodPath(points, totalWidth);

  chart.appendChild(svg('path', {
    d: `${line} L ${totalWidth} ${CURVE_HEIGHT} L 0 ${CURVE_HEIGHT} Z`,
    fill: 'url(#moodGradient)',
  }));
  chart.appendChild(svg('path', {
    d: line, stroke: '#3b82f6', 'stroke-width': '3',
    fill: 'none', 'stroke-linecap': 'round',
  }));

  points.forEach(point => {
    chart.appendChild(svg('circle', {
      cx: point.x, cy: point.y, r: '6',
      fill: point.mood.color, stroke: 'var(--surface)', 'stroke-width': '2',
    }));
    const face = svg('text', {
      x: point.x, y: CURVE_HEIGHT - 12,
      'text-anchor': 'middle', 'font-size': '18',
    });
    face.textContent = point.mood.emoji;
    chart.appendChild(face);
  });

  row.appendChild(chart);
  grid.appendChild(row);
}

function cardElement(id) {
  const card = CARDS[id];
  const base = card.kind === 'pain' ? 'pain-point' : 'opportunity';
  const node = el('div', card.ticket ? `${base} has-initiative` : base);
  node.dataset.card = id;
  node.setAttribute('role', 'button');
  node.tabIndex = 0;

  node.appendChild(el('span', null, card.title));

  const icons = el('span', 'card-icons');
  if (card.ticket) {
    const wrench = el('span', 'initiative-badge', '🔧');
    wrench.setAttribute('aria-hidden', 'true');
    icons.appendChild(wrench);
  }
  const priority = el('span', `priority-badge priority-${card.priority}`, PRIORITY_ARROW[card.priority]);
  priority.setAttribute('aria-hidden', 'true');
  icons.appendChild(priority);
  node.appendChild(icons);

  return node;
}

function cardRow(grid, kind, label, containerClass) {
  STAGES.forEach(stage => {
    const lane = el('div', 'swimlane');
    lane.appendChild(el('div', 'swimlane-label', label));
    const container = el('div', containerClass);
    (CARD_ORDER[stage.id][kind] || []).forEach(id => container.appendChild(cardElement(id)));
    lane.appendChild(container);
    grid.appendChild(lane);
  });
}

function metricsRow(grid) {
  STAGES.forEach(stage => {
    const lane = el('div', 'swimlane metrics');

    const label = el('div', 'swimlane-label');
    label.appendChild(document.createTextNode('GA '));
    label.appendChild(el('span', 'swimlane-note', COMPARISON_WINDOW));
    lane.appendChild(label);

    const rows = el('div', 'metric-row');
    (METRICS[stage.id] || []).forEach(metric => {
      const item = el('div', 'metric-item');
      item.appendChild(el('span', 'metric-label', metric.label));
      item.appendChild(el(
        'span',
        metric.valueClass ? `metric-value ${metric.valueClass}` : 'metric-value',
        metric.value,
      ));

      let tip = `${metric.label}: ${TREND_WORD[metric.direction]} ${metric.delta} `
        + 'vs the previous 4-week average';
      if (metric.note) tip += ` — ${metric.note}`;

      const trend = el('span', `trend ${metric.direction} ${metric.sentiment}`);
      trend.title = tip;
      trend.setAttribute('aria-label', tip);
      const arrow = el('span', 'trend-arrow', TREND_ARROW[metric.direction]);
      arrow.setAttribute('aria-hidden', 'true');
      trend.appendChild(arrow);
      trend.appendChild(document.createTextNode(
        metric.direction === 'flat' ? 'flat' : metric.delta,
      ));
      item.appendChild(trend);

      rows.appendChild(item);
    });
    lane.appendChild(rows);
    grid.appendChild(lane);
  });
}

export function renderJourney(mount) {
  const grid = el('div', 'journey-grid');
  grid.style.gridTemplateColumns = `repeat(${STAGES.length}, ${COLUMN_WIDTH}px)`;

  stageHeaders(grid);
  actionRow(grid);
  feelingRow(grid);
  cardRow(grid, 'pain', 'Pain Points', 'pain-points-container');
  cardRow(grid, 'opportunity', 'Opportunities', 'opportunities-container');
  metricsRow(grid);

  mount.textContent = '';
  mount.appendChild(grid);
  return grid;
}
