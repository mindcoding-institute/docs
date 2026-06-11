/**
 * TypeShuffle — a fixed-grid "matrix" shuffle.
 *
 * Every phrase is word-wrapped into a fixed ROWS×COLS grid of monospace cells
 * (spaces included as cells), sized once from all phrases so dimensions never
 * change between phrases — no reflow, no jumps. A single ticker continuously
 * scrambles every *unlocked* cell, so unresolved cells keep shuffling while the
 * text reveals. A transition unlocks cells left-to-right (out) then locks them
 * to the new targets left-to-right (in), all on the same persistent cells — so
 * there is no switch between the out and in passes.
 *
 * Requires a monospace font on the element (1ch == one cell).
 */

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$<>/\\*+-=:;.'.split('');

// palette colours flashed on cells while they shuffle; cleared on lock
const COLORS = ['#bee4ea', '#1ba5b8', '#21e482', '#0e5172'];

const NBSP = ' ';

const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/** Word-wrap `text` into lines no wider than `cols` (hard-splitting any word
 *  longer than a full line). Returns an array of line strings. */
function wrapRows(text, cols) {
  const rows = [];
  let line = '';
  for (const word of text.split(' ')) {
    let w = word;
    while (w.length > cols) {
      if (line) {
        rows.push(line);
        line = '';
      }
      rows.push(w.slice(0, cols));
      w = w.slice(cols);
    }
    if (line === '') line = w;
    else if (line.length + 1 + w.length <= cols) line += ' ' + w;
    else {
      rows.push(line);
      line = w;
    }
  }
  if (line !== '') rows.push(line);
  return rows.length ? rows : [''];
}

export class TypeShuffle {
  /**
   * @param {HTMLElement} el
   * @param {string[]} phrases all phrases this element will cycle through
   * @param {{cols?: number}} opts
   */
  constructor(el, phrases, { cols } = {}) {
    this.el = el;
    this.phrases = phrases;
    // default: widest single line fits on one row
    this.cols = cols || Math.max(1, ...phrases.map((p) => p.length));
    this.wrapped = phrases.map((p) => wrapRows(p, this.cols));
    this.rows = Math.max(1, ...this.wrapped.map((r) => r.length));

    this.timers = [];
    this.#build();

    this.locked = new Array(this.cells.length).fill(true);
    this.#startTicker();
  }

  /** Build the ROWS×COLS grid of cells. */
  #build() {
    this.el.textContent = '';
    this.cells = [];
    for (let r = 0; r < this.rows; r++) {
      const row = document.createElement('span');
      row.className = 'row';
      for (let c = 0; c < this.cols; c++) {
        const cell = document.createElement('span');
        cell.className = 'cell';
        cell.textContent = NBSP;
        row.appendChild(cell);
        this.cells.push(cell);
      }
      this.el.appendChild(row);
    }
  }

  /** Flat array (row-major) of target glyphs for phrase `index`; ' ' for pad.
   *  Each line is centred within the grid (padded on both sides). */
  #targets(index) {
    const lines = this.wrapped[index] || [''];
    const out = [];
    for (let r = 0; r < this.rows; r++) {
      const line = lines[r] || '';
      const pad = Math.max(0, (this.cols - line.length) >> 1);
      for (let c = 0; c < this.cols; c++) {
        const li = c - pad;
        out.push(li >= 0 && li < line.length ? line[li] : ' ');
      }
    }
    return out;
  }

  #scramble(cell) {
    cell.textContent = CHARSET[rnd(0, CHARSET.length - 1)];
    cell.style.color = COLORS[rnd(0, COLORS.length - 1)];
  }

  #lock(cell, glyph) {
    cell.textContent = glyph === ' ' ? NBSP : glyph;
    cell.style.color = '';
  }

  #startTicker() {
    this.ticker = setInterval(() => {
      for (let i = 0; i < this.cells.length; i++) {
        if (!this.locked[i]) this.#scramble(this.cells[i]);
      }
    }, 45);
  }

  #stop() {
    for (const t of this.timers) clearTimeout(t);
    this.timers = [];
  }

  /** Instantly show phrase `index` (reduced-motion path). */
  set(index) {
    this.#stop();
    const target = this.#targets(index);
    for (let i = 0; i < this.cells.length; i++) {
      this.locked[i] = true;
      this.#lock(this.cells[i], target[i]);
    }
  }

  /**
   * Transition into phrase `index`: unlock cells left-to-right (they join the
   * running scramble), then lock them to the new glyphs left-to-right.
   */
  to(index, { spread = 1000, outSpread = spread } = {}) {
    this.#stop();
    const target = this.#targets(index);
    const n = this.cells.length;

    const outStep = n > 1 ? outSpread / (n - 1) : 0;
    const inStart = outSpread + 150;
    const inStep = n > 1 ? spread / (n - 1) : 0;

    for (let i = 0; i < n; i++) {
      const idx = i;
      // out: unlock so the ticker scrambles it
      this.timers.push(
        setTimeout(() => {
          this.locked[idx] = false;
        }, idx * outStep)
      );
      // in: lock to the final glyph
      this.timers.push(
        setTimeout(() => {
          this.locked[idx] = true;
          this.#lock(this.cells[idx], target[idx]);
        }, inStart + idx * inStep)
      );
    }
  }
}
