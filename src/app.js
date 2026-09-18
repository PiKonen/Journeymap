// Interaction layer: the card detail modal, ticket copying and keyboard access.

import { STAGES } from './data/journey.js';
import { CARDS } from './data/cards.js';
import { INITIATIVES } from './data/initiatives.js';
import { renderJourney } from './render.js';

const KIND_LABEL = { pain: 'Pain point', opportunity: 'Opportunity' };
const PRIORITY_LABEL = { high: 'High priority', medium: 'Medium priority', low: 'Low priority' };
const STAGE_NAME = Object.fromEntries(STAGES.map(s => [s.id, s.name]));

let lastFocused = null;

function el(tag, cls, text) {
  const node = document.createElement(tag);
  if (cls) node.className = cls;
  if (text !== undefined) node.textContent = text;
  return node;
}

function section(label, value) {
  const wrap = el('div', 'info-section');
  wrap.appendChild(el('div', 'info-label', label));
  wrap.appendChild(el('div', 'info-value', value));
  return wrap;
}

function ticketButton(key) {
  const button = el('button', 'ticket-key');
  button.type = 'button';
  button.dataset.key = key;
  button.title = `Copy ${key} to the clipboard`;
  button.addEventListener('click', () => copyTicket(button));
  button.appendChild(el('span', 'ticket-key-system', 'Jira'));
  button.appendChild(el('span', 'ticket-key-id', key));
  return button;
}

function initiativeBlock(ticketKey, init) {
  const wrap = el('div', 'initiative-block');

  const head = el('div', 'initiative-block-head');
  head.appendChild(el('span', `status-badge ${init.status}`, init.status_label));
  head.appendChild(ticketButton(ticketKey));
  wrap.appendChild(head);

  wrap.appendChild(section('Initiative', init.name));
  wrap.appendChild(section('Owner', init.owner));

  if (init.progress !== null && init.progress !== undefined) {
    const progress = el('div', 'info-section');
    progress.appendChild(el('div', 'info-label', 'Progress'));
    const bar = el('div', 'progress-bar');
    const fill = el('div', 'progress-fill');
    fill.style.width = `${init.progress}%`;
    bar.appendChild(fill);
    progress.appendChild(bar);
    progress.appendChild(el('div', 'info-value', `${init.progress}% complete`));
    wrap.appendChild(progress);
  }

  wrap.appendChild(section('Timeline', init.timeline.replace(/&middot;/g, '·')));

  const impact = el('div', 'info-section');
  impact.appendChild(el('div', 'info-label', 'Expected impact'));
  const box = el('div', 'impact-box');
  init.impact.forEach(([caption, figure]) => {
    const item = el('div', 'impact-item');
    item.appendChild(el('div', 'impact-current', caption));
    item.appendChild(el('div', 'impact-projected', figure));
    box.appendChild(item);
  });
  impact.appendChild(box);
  wrap.appendChild(impact);

  if (init.note) wrap.appendChild(section('Notes', init.note));
  return wrap;
}

export function openCard(id) {
  const card = CARDS[id];
  if (!card) return;

  document.getElementById('card-modal-title').textContent = card.title;

  const kind = document.getElementById('card-modal-kind');
  kind.className = `card-kind ${card.kind}`;
  kind.textContent = KIND_LABEL[card.kind];

  const meta = document.getElementById('card-modal-meta');
  meta.textContent = '';
  meta.appendChild(el('span', 'modal-meta-item', STAGE_NAME[card.stage] || card.stage));
  meta.appendChild(el('span', 'modal-meta-sep', '·'));
  meta.appendChild(el('span', 'modal-meta-item', PRIORITY_LABEL[card.priority]));

  const body = document.getElementById('card-modal-body');
  body.textContent = '';
  body.appendChild(section('What this means', card.meaning));
  body.appendChild(section('How we measured it', card.measurement));

  if (card.ticket && INITIATIVES[card.ticket]) {
    body.appendChild(initiativeBlock(card.ticket, INITIATIVES[card.ticket]));
  } else {
    const none = el('div', 'info-section');
    none.appendChild(el('div', 'info-label', 'Work underway'));
    none.appendChild(el('div', 'info-value no-initiative',
      'Nothing scheduled yet — this one sits in the backlog.'));
    body.appendChild(none);
  }

  lastFocused = document.activeElement;
  document.getElementById('card-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
  document.getElementById('card-modal-close').focus();
}

export function closeCard() {
  document.getElementById('card-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
  if (lastFocused && lastFocused.focus) lastFocused.focus();
  lastFocused = null;
}

export function copyTicket(button) {
  const key = button.dataset.key;
  const idEl = button.querySelector('.ticket-key-id');

  const confirmCopy = () => {
    idEl.textContent = 'Copied';
    button.classList.add('copied');
    clearTimeout(button._resetTimer);
    button._resetTimer = setTimeout(() => {
      idEl.textContent = key;
      button.classList.remove('copied');
    }, 1400);
  };

  // Clipboard access can be denied in a sandboxed frame, so fall back to a
  // hidden textarea, and finally to selecting the text for a manual copy.
  const fallback = () => legacyCopy(key, confirmCopy, () => selectText(idEl));

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(key).then(confirmCopy, fallback);
  } else {
    fallback();
  }
}

function legacyCopy(text, onSuccess, onFailure) {
  try {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.top = '-1000px';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(area);
    ok ? onSuccess() : onFailure();
  } catch (error) {
    onFailure();
  }
}

function selectText(node) {
  try {
    const range = document.createRange();
    range.selectNodeContents(node);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  } catch (error) {
    /* nothing more we can do */
  }
}

function wireEvents() {
  // One delegated listener covers every card, however many the data defines.
  document.addEventListener('click', event => {
    const card = event.target.closest('[data-card]');
    if (card) {
      openCard(card.dataset.card);
      return;
    }
    if (event.target.id === 'card-modal' || event.target.id === 'card-modal-close') closeCard();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeCard();
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      const card = event.target.closest && event.target.closest('[data-card]');
      if (card) {
        event.preventDefault();
        openCard(card.dataset.card);
      }
    }
  });
}

function start() {
  renderJourney(document.getElementById('journey-mount'));
  wireEvents();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}

// Exposed for the browser console and for tests.
window.CARDS = CARDS;
window.INITIATIVES = INITIATIVES;
window.openCard = openCard;
window.closeCard = closeCard;
window.copyTicket = copyTicket;
