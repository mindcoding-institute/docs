/**
 * TypeShuffle — a shuffling/sliding type animation.
 *
 * Re-implementation of the codrops TypeShuffle effect
 * (https://github.com/codrops/TypeShuffleAnimation), trimmed to the `fx1`
 * left-to-right slide and adapted to cycle between phrases.
 *
 * Self-contained: splits text into per-character <span class="char"> nodes
 * itself (no Splitting.js dependency), then cascades random glyphs into each
 * cell before settling on the final character.
 */

const CHARSET =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$<>/\\*+-=:;.'.split('');

const NBSP = ' ';

const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export class TypeShuffle {
  /** @param {HTMLElement} el */
  constructor(el) {
    this.el = el;
    this.isAnimating = false;
    this.timers = [];
    this.text = (this.el.textContent || '').trim();
    this.#build();
  }

  /** Wrap each visible character in a .char span; keep spaces as real
   *  breaking whitespace so multi-word lines can wrap normally. */
  #build() {
    this.#stop();
    this.el.textContent = '';
    this.chars = [];
    for (const ch of [...this.text]) {
      if (ch === ' ') {
        this.el.appendChild(document.createTextNode(' '));
        continue;
      }
      const span = document.createElement('span');
      span.className = 'char';
      span.dataset.char = ch;
      span.textContent = ch;
      this.el.appendChild(span);
      this.chars.push(span);
    }
    this.total = this.chars.length;
  }

  /** Swap in new text and rebuild (used to cycle phrases). */
  setText(text) {
    this.text = text;
    this.#build();
  }

  #randomChar() {
    return CHARSET[randomNumber(0, CHARSET.length - 1)];
  }

  #stop() {
    if (this.timers) for (const t of this.timers) clearTimeout(t);
    this.timers = [];
  }

  /** fx1 — characters slide/cascade in from left to right.
   *  `spread` bounds the total stagger (ms) so long strings still settle
   *  quickly regardless of length. */
  fx1(spread = 1000) {
    if (this.isAnimating || this.total === 0) return;
    this.isAnimating = true;

    // start every cell blank
    for (const c of this.chars) c.textContent = NBSP;

    const step = this.total > 1 ? spread / (this.total - 1) : 0;

    let settled = 0;
    this.chars.forEach((char, position) => {
      const finalChar = char.dataset.char;
      const cycles = randomNumber(3, 10);
      let i = 0;

      // staggered start → the left-to-right slide
      const startTimer = setTimeout(() => {
        const tick = () => {
          if (i >= cycles) {
            char.textContent = finalChar;
            settled += 1;
            if (settled === this.total) this.isAnimating = false;
            return;
          }
          char.textContent = this.#randomChar();
          i += 1;
          this.timers.push(setTimeout(tick, 40));
        };
        tick();
      }, position * step);

      this.timers.push(startTimer);
    });
  }

  trigger(opts = {}) {
    this.fx1(opts.spread);
  }
}

/**
 * Mount a cycling shuffle on an element: shuffle the first phrase in, hold,
 * then shuffle to the next, looping forever. Honours reduced-motion.
 *
 * @param {HTMLElement} el
 * @param {string[]} phrases
 * @param {number} holdMs how long to rest on each phrase
 */
export function mountShuffle(el, phrases, holdMs = 3000) {
  const list =
    phrases && phrases.length ? phrases : [(el.textContent || '').trim()];

  const reduce =
    typeof matchMedia === 'function' &&
    matchMedia('(prefers-reduced-motion: reduce)').matches;

  const ts = new TypeShuffle(el);

  if (reduce) {
    // No animation: just rotate the text plainly.
    let i = 0;
    ts.setText(list[0]);
    if (list.length > 1) {
      setInterval(() => {
        i = (i + 1) % list.length;
        ts.setText(list[i]);
      }, holdMs);
    }
    return;
  }

  ts.setText(list[0]);
  ts.trigger();

  if (list.length <= 1) return;

  let i = 0;
  setInterval(() => {
    i = (i + 1) % list.length;
    ts.setText(list[i]);
    ts.trigger();
  }, holdMs);
}
