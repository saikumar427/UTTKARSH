/**
 * Uttkarsh Student Learning Arcade (Home Page — Interactive Educational Lab)
 * Zero-lag, mobile-first, 60fps interactive educational mini-games for Nursery to Grade X.
 * Strictly zero-orange color palette (Royal Blue, Sky Cyan, Indigo, Emerald, Violet-Magenta).
 */
(function () {
  'use strict';

  const ICONS = {
    star: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2l2.95 6.08L21.66 9l-4.88 4.72 1.18 6.7L12 17.24 6.04 20.42l1.18-6.7L2.34 9l6.71-.92L12 2z"/></svg>`,
    soundOn: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    soundOff: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    math: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="12" x2="10" y2="12"/><line x1="14" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="10" y2="16"/><line x1="14" y1="16" x2="16" y2="16"/></svg>`,
    memory: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
    word: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>`,
    quiz: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    refresh: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`,
    hint: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`
  };

  const WORD_BANKS = {
    kg: [
      { word: 'BOOK', clue: '📘', hint: 'We read stories inside it!' },
      { word: 'STAR', clue: '⭐', hint: 'Twinkles brightly in the night sky!' },
      { word: 'TREE', clue: '🌳', hint: 'Gives us shade, fruits, and fresh air!' },
      { word: 'FISH', clue: '🐟', hint: 'Swims happily in water!' },
      { word: 'BALL', clue: '⚽', hint: 'Round toy we kick and catch!' },
      { word: 'RAIN', clue: '🌧️', hint: 'Water drops falling from clouds!' },
      { word: 'BIRD', clue: '🐦', hint: 'Has wings and flies high!' },
      { word: 'MOON', clue: '🌙', hint: 'Shines gently at night!' }
    ],
    primary: [
      { word: 'SCHOOL', clue: '🏫', hint: 'Where we learn, play, and grow together!' },
      { word: 'PLANET', clue: '🌍', hint: 'Earth is our home ___ in space!' },
      { word: 'FRIEND', clue: '💠', hint: 'A classmate you share and play with!' },
      { word: 'GARDEN', clue: '🌿', hint: 'A green place full of plants and flowers!' },
      { word: 'LAPTOP', clue: '💻', hint: 'Portable computer we use for digital learning!' },
      { word: 'MEDALS', clue: '🥈', hint: 'Prizes won by champions on Sports Day!' },
      { word: 'INDIA', clue: '🇮🇳', hint: 'Our beloved country!' },
      { word: 'MUSIC', clue: '🎵', hint: 'Sweet melodies in Singing Competition!' }
    ],
    secondary: [
      { word: 'SCIENCE', clue: '🔬', hint: 'Exploring nature through experiments in the lab!' },
      { word: 'COMPUTER', clue: '💻', hint: 'Smart digital machine for coding and learning!' },
      { word: 'ROBOTICS', clue: '🤖', hint: 'Designing intelligent machines in the STEM Lab!' },
      { word: 'EQUALITY', clue: '⚖️', hint: 'Treating every boy and girl with equal respect!' },
      { word: 'SCHOLAR', clue: '🎓', hint: 'A dedicated learner striving for excellence!' },
      { word: 'KNOWLEDGE', clue: '📘', hint: 'Education empowers us with wisdom and ___!' },
      { word: 'TEAMWORK', clue: '⚽', hint: 'Working together on the football & cricket field!' },
      { word: 'DISCOVER', clue: '🌐', hint: 'Finding new ideas and scientific inventions!' }
    ]
  };

  const QUIZ_BANKS = {
    kg: [
      { q: 'How many legs does a butterfly have?', opts: ['6 Legs', '2 Legs', '10 Legs', '0 Legs'], ans: 0, fact: 'All insects, including butterflies, have 6 legs!' },
      { q: 'Which color are healthy tree leaves on Green Day?', opts: ['Blue', 'Green', 'Purple', 'Pink'], ans: 1, fact: 'Chlorophyll makes leaves bright green!' },
      { q: 'Which shape has 3 corners and 3 sides?', opts: ['Circle', 'Square', 'Triangle', 'Star'], ans: 2, fact: 'Tri means three — a triangle has 3 sides!' },
      { q: 'How many days are there in one week?', opts: ['5 Days', '6 Days', '7 Days', '10 Days'], ans: 2, fact: 'Monday to Sunday makes 7 wonderful days!' },
      { q: 'What do plants need to grow big and strong?', opts: ['Water & Sunlight', 'Ice Cream', 'Plastic', 'Chalk'], ans: 0, fact: 'Plants drink water through roots and use sunlight!' },
      { q: 'Which aquatic animal breathes underwater using gills?', opts: ['Fish', 'Rabbit', 'Pigeon', 'Elephant'], ans: 0, fact: 'Fish use gills to absorb oxygen dissolved in water!' }
    ],
    primary: [
      { q: 'Which planet is known as the Blue Planet?', opts: ['Mars', 'Earth', 'Jupiter', 'Venus'], ans: 1, fact: 'Over 70% of Earth is covered with blue oceans!' },
      { q: 'On which date do we celebrate World Environment Day?', opts: ['5th June', '15th August', '2nd October', '14th November'], ans: 0, fact: 'Uttkarsh students celebrate World Environment Day every 5th June!' },
      { q: 'Which gas do green plants release that we breathe in?', opts: ['Nitrogen', 'Oxygen', 'Helium', 'Carbon'], ans: 1, fact: 'Trees give us life-saving Oxygen during photosynthesis!' },
      { q: 'How many players are on one Cricket team on the field?', opts: ['9 Players', '11 Players', '7 Players', '15 Players'], ans: 1, fact: 'Both Cricket and Football teams field 11 players!' },
      { q: 'Who is fondly remembered on 2nd October every year?', opts: ['Mahatma Gandhi', 'C.V. Raman', 'Kalpana Chawla', 'Aryabhata'], ans: 0, fact: 'Gandhi Jayanti honors Mahatma Gandhi, Father of the Nation!' },
      { q: 'What is the brain of a Computer called?', opts: ['Keyboard', 'Mouse', 'CPU', 'Speaker'], ans: 2, fact: 'CPU stands for Central Processing Unit!' }
    ],
    secondary: [
      { q: 'What is the chemical formula of pure water?', opts: ['CO₂', 'H₂O', 'NaCl', 'O₂'], ans: 1, fact: 'Each water molecule bonds 2 Hydrogen atoms with 1 Oxygen atom!' },
      { q: 'When did the Constitution of India come into effect (Republic Day)?', opts: ['26 January 1950', '15 August 1947', '2 October 1950', '26 November 1947'], ans: 0, fact: 'India became a sovereign democratic republic on 26 January 1950!' },
      { q: 'What is the value of √144 + 5²?', opts: ['27', '37', '41', '22'], ans: 1, fact: '√144 = 12 and 5² = 25, so 12 + 25 = 37!' },
      { q: 'Which powerhouse organelle produces energy (ATP) inside a cell?', opts: ['Ribosome', 'Nucleus', 'Mitochondria', 'Vacuole'], ans: 2, fact: 'Mitochondria are the powerhouses of living cells!' },
      { q: 'Which Indian scientist won the Nobel Prize for the Raman Effect?', opts: ['Sir C.V. Raman', 'Homi Bhabha', 'Vikram Sarabhai', 'S. Ramanujan'], ans: 0, fact: 'National Science Day celebrates Sir C.V. Raman’s discovery!' },
      { q: 'In binary code used by computers, what does 1010 equal in decimal?', opts: ['8', '10', '12', '6'], ans: 1, fact: '8 + 0 + 2 + 0 = 10 in base-10!' }
    ]
  };

  // Strictly cool/school-themed emoji deck (zero orange icons)
  const MEMORY_ICONS = ['📘', '🔬', '💻', '⚽', '🌍', '🎓', '🎵', '🌱'];

  // Balloon colors: Sky Cyan, Royal Blue, Indigo, Emerald, Violet-Magenta (ZERO orange!)
  const BALLOON_THEMES = [
    { bg: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', border: '#0369a1' },
    { bg: 'linear-gradient(135deg, #60a5fa 0%, #0052cc 100%)', border: '#1e40af' },
    { bg: 'linear-gradient(135deg, #818cf8 0%, #4338ca 100%)', border: '#312e81' },
    { bg: 'linear-gradient(135deg, #34d399 0%, #059669 100%)', border: '#047857' },
    { bg: 'linear-gradient(135deg, #c084fc 0%, #7c3aed 100%)', border: '#5b21b6' }
  ];

  class SoundFX {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }

    init() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new Ctx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    tone(freq, duration, type = 'sine', delay = 0, gainVal = 0.08) {
      if (!this.enabled) return;
      try {
        this.init();
        if (!this.ctx) return;
        const now = this.ctx.currentTime + delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(gainVal, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + duration);
      } catch (_) {
        // Ignore audio context restrictions
      }
    }

    pop() {
      this.tone(523.25, 0.1, 'triangle', 0, 0.09);
      this.tone(783.99, 0.14, 'sine', 0.05, 0.09);
    }

    win() {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
        this.tone(f, 0.18, 'triangle', idx * 0.08, 0.09);
      });
    }

    wrong() {
      this.tone(240, 0.16, 'sawtooth', 0, 0.05);
    }

    tap() {
      this.tone(660, 0.06, 'sine', 0, 0.05);
    }
  }

  class UttkarshArcade {
    constructor(rootEl) {
      this.root = rootEl;
      this.sfx = new SoundFX();
      this.grade = 'primary'; // 'kg' | 'primary' | 'secondary'
      this.mode = 'balloon'; // 'balloon' | 'memory' | 'word' | 'quiz'
      this.totalStars = Number(localStorage.getItem('uttkarsh_stars') || 0);
      this.activeInterval = null;
      this.activeTimeouts = [];
      this.isVisible = true;
      this.renderShell();
      this.bindShellEvents();
      this.startMode('balloon');
    }

    clearTimers() {
      if (this.activeInterval) {
        clearInterval(this.activeInterval);
        this.activeInterval = null;
      }
      while (this.activeTimeouts.length) {
        clearTimeout(this.activeTimeouts.pop());
      }
    }

    later(fn, ms) {
      const id = setTimeout(() => {
        this.activeTimeouts = this.activeTimeouts.filter((t) => t !== id);
        fn();
      }, ms);
      this.activeTimeouts.push(id);
      return id;
    }

    addStars(count) {
      this.totalStars += count;
      try {
        localStorage.setItem('uttkarsh_stars', String(this.totalStars));
      } catch (_) {}
      const badge = this.root.querySelector('#arcade-star-count');
      if (badge) {
        badge.textContent = String(this.totalStars);
        badge.parentElement.classList.remove('pulse-pop');
        void badge.parentElement.offsetWidth;
        badge.parentElement.classList.add('pulse-pop');
      }
    }

    renderShell() {
      this.root.innerHTML = `
        <div class="arcade-wrapper">
          <div class="arcade-header">
            <div class="arcade-title-group">
              <span class="eyebrow-pill">INTERACTIVE LEARNING LAB</span>
              <h2 class="official-section-title arcade-heading">Uttkarsh Student Learning Arcade</h2>
              <p class="arcade-subtitle">Select a grade group and explore interactive Math, Memory, Vocabulary &amp; STEM challenges.</p>
            </div>
            <div class="arcade-status-bar">
              <div class="star-counter" title="Total Stars Earned">
                <span class="star-icon" aria-hidden="true">${ICONS.star}</span>
                <span id="arcade-star-count">${this.totalStars}</span>
                <span class="star-label">Stars</span>
              </div>
              <button type="button" class="arcade-sound-btn" id="arcade-sound-toggle" aria-pressed="true" title="Toggle Game Sound">
                ${ICONS.soundOn}
                <span>Sound On</span>
              </button>
            </div>
          </div>

          <div class="arcade-controls-row">
            <div class="grade-switcher" role="group" aria-label="Select Grade Level">
              <button type="button" class="grade-chip ${this.grade === 'kg' ? 'active' : ''}" data-grade="kg">Nursery – Sr. KG</button>
              <button type="button" class="grade-chip ${this.grade === 'primary' ? 'active' : ''}" data-grade="primary">Grade I – IV</button>
              <button type="button" class="grade-chip ${this.grade === 'secondary' ? 'active' : ''}" data-grade="secondary">Grade V – X</button>
            </div>

            <div class="game-mode-tabs" role="tablist" aria-label="Choose Mini Game">
              <button type="button" role="tab" class="mode-tab active" data-mode="balloon" aria-selected="true">${ICONS.math}<span>Math Pop</span></button>
              <button type="button" role="tab" class="mode-tab" data-mode="memory" aria-selected="false">${ICONS.memory}<span>Flip &amp; Match</span></button>
              <button type="button" role="tab" class="mode-tab" data-mode="word" aria-selected="false">${ICONS.word}<span>Word Quest</span></button>
              <button type="button" role="tab" class="mode-tab" data-mode="quiz" aria-selected="false">${ICONS.quiz}<span>Super Quiz</span></button>
            </div>
          </div>

          <div class="arcade-stage" id="arcade-stage" aria-live="polite"></div>
        </div>
      `;
      this.stage = this.root.querySelector('#arcade-stage');
    }

    bindShellEvents() {
      this.root.addEventListener('click', (e) => {
        const gradeBtn = e.target.closest('.grade-chip');
        if (gradeBtn) {
          const g = gradeBtn.dataset.grade;
          if (g && g !== this.grade) {
            this.sfx.tap();
            this.grade = g;
            this.root.querySelectorAll('.grade-chip').forEach((b) => b.classList.toggle('active', b.dataset.grade === g));
            this.startMode(this.mode);
          }
          return;
        }

        const modeBtn = e.target.closest('.mode-tab');
        if (modeBtn) {
          const m = modeBtn.dataset.mode;
          if (m && m !== this.mode) {
            this.sfx.tap();
            this.startMode(m);
          }
          return;
        }

        const soundBtn = e.target.closest('#arcade-sound-toggle');
        if (soundBtn) {
          this.sfx.enabled = !this.sfx.enabled;
          soundBtn.setAttribute('aria-pressed', String(this.sfx.enabled));
          soundBtn.innerHTML = this.sfx.enabled
            ? `${ICONS.soundOn}<span>Sound On</span>`
            : `${ICONS.soundOff}<span>Muted</span>`;
          if (this.sfx.enabled) this.sfx.tap();
        }
      });

      window.addEventListener('uttkarsh:pagechange', (e) => {
        const activePage = e.detail && e.detail.page;
        this.setPaused(activePage !== 'home');
      });

      document.addEventListener('visibilitychange', () => {
        this.setPaused(document.hidden);
      });

      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              this.setPaused(!entry.isIntersecting);
            });
          },
          { threshold: 0.05 }
        );
        io.observe(this.root);
      }
    }

    setPaused(paused) {
      this.isVisible = !paused;
      if (this.stage) {
        this.stage.classList.toggle('is-paused', paused);
      }
    }

    startMode(mode) {
      this.clearTimers();
      this.mode = mode;
      this.root.querySelectorAll('.mode-tab').forEach((b) => {
        const active = b.dataset.mode === mode;
        b.classList.toggle('active', active);
        b.setAttribute('aria-selected', String(active));
      });

      if (mode === 'balloon') this.initBalloonMath();
      else if (mode === 'memory') this.initMemoryMatch();
      else if (mode === 'word') this.initWordRocket();
      else if (mode === 'quiz') this.initSuperQuiz();
    }

    /* =====================================================================
       GAME 1: BALLOON POP MATH (GPU CSS Transforms, Zero Main-Thread Lag)
       ===================================================================== */
    generateMathQuestion() {
      const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
      let prompt = '';
      let answer = 0;

      if (this.grade === 'kg') {
        if (Math.random() < 0.45) {
          const n = rand(2, 7);
          prompt = `Count the stars: ${'★'.repeat(n)}`;
          answer = n;
        } else {
          const a = rand(1, 5);
          const b = rand(1, 5);
          prompt = `${a} + ${b} = ?`;
          answer = a + b;
        }
      } else if (this.grade === 'primary') {
        const op = rand(0, 2);
        if (op === 0) {
          const a = rand(6, 25);
          const b = rand(4, 19);
          prompt = `${a} + ${b} = ?`;
          answer = a + b;
        } else if (op === 1) {
          const a = rand(14, 35);
          const b = rand(4, 13);
          prompt = `${a} − ${b} = ?`;
          answer = a - b;
        } else {
          const a = rand(2, 9);
          const b = rand(2, 9);
          prompt = `${a} × ${b} = ?`;
          answer = a * b;
        }
      } else {
        const op = rand(0, 3);
        if (op === 0) {
          const a = rand(7, 15);
          const b = rand(6, 13);
          prompt = `${a} × ${b} = ?`;
          answer = a * b;
        } else if (op === 1) {
          const b = rand(4, 12);
          const ans = rand(4, 12);
          prompt = `${b * ans} ÷ ${b} = ?`;
          answer = ans;
        } else if (op === 2) {
          const n = rand(4, 13);
          prompt = `${n}² (Square of ${n}) = ?`;
          answer = n * n;
        } else {
          const base = [20, 40, 60, 80, 120][rand(0, 4)];
          prompt = `25% of ${base} = ?`;
          answer = base / 4;
        }
      }

      const choices = new Set([answer]);
      while (choices.size < 5) {
        const delta = rand(-6, 7);
        const candidate = Math.max(1, answer + (delta === 0 ? 3 : delta));
        choices.add(candidate);
      }
      const shuffled = Array.from(choices).sort(() => Math.random() - 0.5);
      return { prompt, answer, options: shuffled };
    }

    initBalloonMath() {
      let score = 0;
      let streak = 0;
      let round = 1;
      const maxRounds = 8;

      this.stage.innerHTML = `
        <div class="balloon-game">
          <div class="game-hud">
            <div class="hud-pill">Round <strong id="bm-round">1/${maxRounds}</strong></div>
            <div class="hud-question" id="bm-question">Loading...</div>
            <div class="hud-pill">Score <strong id="bm-score">0</strong> <span id="bm-streak" class="streak-tag"></span></div>
          </div>
          <div class="balloon-sky" id="bm-sky"></div>
          <div class="game-footer-hint">Select the balloon carrying the correct answer to earn stars.</div>
        </div>
      `;

      const sky = this.stage.querySelector('#bm-sky');
      const qEl = this.stage.querySelector('#bm-question');
      const rEl = this.stage.querySelector('#bm-round');
      const sEl = this.stage.querySelector('#bm-score');
      const stEl = this.stage.querySelector('#bm-streak');

      const nextRound = () => {
        if (round > maxRounds) {
          this.sfx.win();
          this.addStars(3);
          sky.innerHTML = `
            <div class="arcade-victory-card">
              <div class="victory-medal-badge">★</div>
              <h3>Excellent Math Champion!</h3>
              <p>You scored <strong>${score} points</strong> and earned <strong>+3 Bonus Stars</strong>!</p>
              <button type="button" class="btn-official-primary" id="bm-replay">Play Again</button>
            </div>
          `;
          const replayBtn = sky.querySelector('#bm-replay');
          if (replayBtn) replayBtn.addEventListener('click', () => this.initBalloonMath());
          return;
        }

        rEl.textContent = `${round}/${maxRounds}`;
        const q = this.generateMathQuestion();
        qEl.textContent = q.prompt;
        sky.innerHTML = '';

        q.options.forEach((val, idx) => {
          const theme = BALLOON_THEMES[idx % BALLOON_THEMES.length];
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'math-balloon';
          btn.style.setProperty('--b-bg', theme.bg);
          btn.style.setProperty('--b-border', theme.border);
          btn.style.setProperty('--b-delay', `${(idx * 0.35).toFixed(2)}s`);
          btn.style.setProperty('--b-dur', `${(4.2 + (idx % 3) * 0.5).toFixed(1)}s`);
          btn.innerHTML = `<span class="balloon-num">${val}</span><span class="balloon-knot" aria-hidden="true"></span>`;

          btn.addEventListener('click', () => {
            if (btn.disabled) return;
            if (val === q.answer) {
              btn.disabled = true;
              btn.classList.add('popped');
              this.sfx.pop();
              streak += 1;
              score += 10 + (streak > 1 ? streak * 2 : 0);
              this.addStars(1);
              sEl.textContent = String(score);
              stEl.textContent = streak > 1 ? `• ${streak}x` : '';
              round += 1;
              this.later(nextRound, 420);
            } else {
              btn.disabled = true;
              btn.classList.add('wrong-shake');
              this.sfx.wrong();
              streak = 0;
              stEl.textContent = '';
            }
          });

          sky.appendChild(btn);
        });
      };

      nextRound();
    }

    /* =====================================================================
       GAME 2: FLIP & MATCH (3D Hardware-Accelerated Memory Cards)
       ===================================================================== */
    initMemoryMatch() {
      const pairsCount = this.grade === 'kg' ? 4 : this.grade === 'primary' ? 6 : 8;
      const icons = MEMORY_ICONS.slice(0, pairsCount);
      const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);

      let flipped = [];
      let matchedCount = 0;
      let moves = 0;
      let locked = false;
      let seconds = 0;

      const colsClass = pairsCount === 4 ? 'cols-4-sm' : 'cols-4';

      this.stage.innerHTML = `
        <div class="memory-game">
          <div class="game-hud">
            <div class="hud-pill">Pairs <strong id="mm-pairs">0/${pairsCount}</strong></div>
            <div class="hud-pill">Moves <strong id="mm-moves">0</strong></div>
            <div class="hud-pill">Time <strong id="mm-time">0s</strong></div>
            <button type="button" class="hud-reset-btn" id="mm-reset">${ICONS.refresh}<span>Shuffle</span></button>
          </div>
          <div class="memory-grid ${colsClass}" id="mm-grid"></div>
        </div>
      `;

      const grid = this.stage.querySelector('#mm-grid');
      const pEl = this.stage.querySelector('#mm-pairs');
      const mEl = this.stage.querySelector('#mm-moves');
      const tEl = this.stage.querySelector('#mm-time');
      this.stage.querySelector('#mm-reset').addEventListener('click', () => {
        this.sfx.tap();
        this.initMemoryMatch();
      });

      this.activeInterval = setInterval(() => {
        if (!this.isVisible || matchedCount === pairsCount) return;
        seconds += 1;
        if (tEl) tEl.textContent = `${seconds}s`;
      }, 1000);

      deck.forEach((icon, index) => {
        const card = document.createElement('button');
        card.type = 'button';
        card.className = 'mem-card';
        card.dataset.icon = icon;
        card.dataset.index = String(index);
        card.setAttribute('aria-label', `Memory Card ${index + 1}`);
        card.innerHTML = `
          <span class="mem-card-inner">
            <span class="mem-card-front">U</span>
            <span class="mem-card-back">${icon}</span>
          </span>
        `;

        card.addEventListener('click', () => {
          if (locked || card.classList.contains('is-flipped') || card.classList.contains('is-matched')) return;
          this.sfx.tap();
          card.classList.add('is-flipped');
          flipped.push(card);

          if (flipped.length === 2) {
            moves += 1;
            mEl.textContent = String(moves);
            const [c1, c2] = flipped;
            if (c1.dataset.icon === c2.dataset.icon) {
              c1.classList.add('is-matched');
              c2.classList.add('is-matched');
              flipped = [];
              matchedCount += 1;
              pEl.textContent = `${matchedCount}/${pairsCount}`;
              this.sfx.pop();
              this.addStars(1);

              if (matchedCount === pairsCount) {
                this.clearTimers();
                this.sfx.win();
                this.addStars(3);
                this.later(() => {
                  grid.innerHTML = `
                    <div class="arcade-victory-card span-all">
                      <div class="victory-medal-badge">★</div>
                      <h3>Super Memory Master!</h3>
                      <p>Matched all ${pairsCount} pairs in <strong>${moves} moves</strong> (${seconds}s) — <strong>+3 Bonus Stars</strong>!</p>
                      <button type="button" class="btn-official-primary" id="mm-play-again">Play Again</button>
                    </div>
                  `;
                  const btn = grid.querySelector('#mm-play-again');
                  if (btn) btn.addEventListener('click', () => this.initMemoryMatch());
                }, 550);
              }
            } else {
              locked = true;
              this.later(() => {
                c1.classList.remove('is-flipped');
                c2.classList.remove('is-flipped');
                flipped = [];
                locked = false;
              }, 650);
            }
          }
        });

        grid.appendChild(card);
      });
    }

    /* =====================================================================
       GAME 3: WORD QUEST (Interactive Letter Tiles + Progress Meter)
       ===================================================================== */
    initWordRocket() {
      const bank = [...WORD_BANKS[this.grade]].sort(() => Math.random() - 0.5).slice(0, 5);
      let idx = 0;

      const renderRound = () => {
        if (idx >= bank.length) {
          this.sfx.win();
          this.addStars(3);
          this.stage.innerHTML = `
            <div class="arcade-victory-card">
              <div class="victory-medal-badge">★</div>
              <h3>Uttkarsh Word Explorer!</h3>
              <p>You completed 100% of the vocabulary mission and earned <strong>+3 Bonus Stars</strong>!</p>
              <button type="button" class="btn-official-primary" id="wr-replay">Start New Mission</button>
            </div>
          `;
          this.stage.querySelector('#wr-replay').addEventListener('click', () => this.initWordRocket());
          return;
        }

        const item = bank[idx];
        const letters = item.word.split('');
        const scrambled = letters.map((ch, i) => ({ ch, id: i })).sort(() => Math.random() - 0.5);
        if (scrambled.map((x) => x.ch).join('') === item.word) {
          scrambled.reverse();
        }
        let picked = [];
        const fuelPct = Math.round((idx / bank.length) * 100);

        this.stage.innerHTML = `
          <div class="word-game">
            <div class="game-hud">
              <div class="hud-pill">Word <strong>${idx + 1}/${bank.length}</strong></div>
              <div class="rocket-fuel-bar" title="Mission Progress">
                <span class="rocket-fuel-fill" style="width:${fuelPct}%"></span>
                <span class="rocket-fuel-label">Progress: ${fuelPct}%</span>
              </div>
              <button type="button" class="hud-reset-btn" id="wr-hint-btn">${ICONS.hint}<span>Hint</span></button>
            </div>

            <div class="word-clue-box">
              <span class="word-clue-emoji">${item.clue}</span>
              <p class="word-clue-text">${item.hint}</p>
            </div>

            <div class="word-slots" id="wr-slots"></div>
            <div class="word-tiles" id="wr-tiles"></div>
          </div>
        `;

        const slotsEl = this.stage.querySelector('#wr-slots');
        const tilesEl = this.stage.querySelector('#wr-tiles');

        const syncUI = () => {
          slotsEl.innerHTML = '';
          letters.forEach((_, sIdx) => {
            const slotBtn = document.createElement('button');
            slotBtn.type = 'button';
            const entry = picked[sIdx];
            slotBtn.className = `word-slot ${entry ? 'filled' : ''}`;
            slotBtn.textContent = entry ? entry.ch : '';
            slotBtn.disabled = !entry;
            slotBtn.addEventListener('click', () => {
              if (!entry) return;
              this.sfx.tap();
              picked.splice(sIdx, 1);
              syncUI();
            });
            slotsEl.appendChild(slotBtn);
          });

          tilesEl.innerHTML = '';
          scrambled.forEach((tile) => {
            const isUsed = picked.some((p) => p.id === tile.id);
            const tBtn = document.createElement('button');
            tBtn.type = 'button';
            tBtn.className = `word-tile ${isUsed ? 'used' : ''}`;
            tBtn.textContent = tile.ch;
            tBtn.disabled = isUsed;
            tBtn.addEventListener('click', () => {
              if (isUsed || picked.length >= letters.length) return;
              this.sfx.tap();
              picked.push(tile);
              syncUI();

              if (picked.length === letters.length) {
                const attempt = picked.map((p) => p.ch).join('');
                if (attempt === item.word) {
                  slotsEl.classList.add('word-correct');
                  this.sfx.pop();
                  this.addStars(1);
                  idx += 1;
                  this.later(renderRound, 520);
                } else {
                  slotsEl.classList.add('wrong-shake');
                  this.sfx.wrong();
                  this.later(() => {
                    picked = [];
                    slotsEl.classList.remove('wrong-shake');
                    syncUI();
                  }, 520);
                }
              }
            });
            tilesEl.appendChild(tBtn);
          });
        };

        this.stage.querySelector('#wr-hint-btn').addEventListener('click', () => {
          if (picked.length >= letters.length) return;
          for (let i = 0; i < letters.length; i++) {
            if (!picked[i] || picked[i].ch !== letters[i]) {
              picked = picked.slice(0, i);
              const neededChar = letters[i];
              const nextTile = scrambled.find((t) => t.ch === neededChar && !picked.some((p) => p.id === t.id));
              if (nextTile) {
                this.sfx.tap();
                picked.push(nextTile);
                syncUI();
                if (picked.length === letters.length) {
                  slotsEl.classList.add('word-correct');
                  this.sfx.pop();
                  this.addStars(1);
                  idx += 1;
                  this.later(renderRound, 520);
                }
              }
              break;
            }
          }
        });

        syncUI();
      };

      renderRound();
    }

    /* =====================================================================
       GAME 4: SUPER QUIZ (STEM, GK & Values Quiz with Instant Fun Facts)
       ===================================================================== */
    initSuperQuiz() {
      const questions = [...QUIZ_BANKS[this.grade]].sort(() => Math.random() - 0.5).slice(0, 5);
      let qIndex = 0;
      let correctTotal = 0;

      const renderQuestion = () => {
        if (qIndex >= questions.length) {
          this.sfx.win();
          this.addStars(3);
          this.stage.innerHTML = `
            <div class="arcade-victory-card">
              <div class="victory-medal-badge">★</div>
              <h3>Uttkarsh Junior Scholar!</h3>
              <p>You answered <strong>${correctTotal} out of ${questions.length}</strong> accurately and earned <strong>+3 Bonus Stars</strong>!</p>
              <button type="button" class="btn-official-primary" id="sq-replay">Take Another Quiz</button>
            </div>
          `;
          this.stage.querySelector('#sq-replay').addEventListener('click', () => this.initSuperQuiz());
          return;
        }

        const item = questions[qIndex];
        this.stage.innerHTML = `
          <div class="quiz-game">
            <div class="game-hud">
              <div class="hud-pill">Question <strong>${qIndex + 1}/${questions.length}</strong></div>
              <div class="hud-pill">Score <strong>${correctTotal}/${questions.length}</strong></div>
            </div>
            <h3 class="quiz-question-title">${item.q}</h3>
            <div class="quiz-options-grid" id="sq-options"></div>
            <div class="quiz-feedback" id="sq-feedback" hidden></div>
          </div>
        `;

        const optsWrap = this.stage.querySelector('#sq-options');
        const fbEl = this.stage.querySelector('#sq-feedback');

        item.opts.forEach((optText, oIdx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'quiz-opt-btn';
          btn.innerHTML = `<span class="opt-letter">${String.fromCharCode(65 + oIdx)}</span><span>${optText}</span>`;

          btn.addEventListener('click', () => {
            optsWrap.querySelectorAll('.quiz-opt-btn').forEach((b, bIdx) => {
              b.disabled = true;
              if (bIdx === item.ans) b.classList.add('correct');
            });

            if (oIdx === item.ans) {
              correctTotal += 1;
              this.sfx.pop();
              this.addStars(1);
              fbEl.className = 'quiz-feedback is-good';
              fbEl.innerHTML = `<div><strong>Correct!</strong> ${item.fact}</div><button type="button" class="quiz-next-btn" id="sq-next">Next Question →</button>`;
            } else {
              btn.classList.add('incorrect');
              this.sfx.wrong();
              fbEl.className = 'quiz-feedback is-info';
              fbEl.innerHTML = `<div><strong>Did You Know?</strong> ${item.fact}</div><button type="button" class="quiz-next-btn" id="sq-next">Next Question →</button>`;
            }
            fbEl.hidden = false;
            fbEl.querySelector('#sq-next').addEventListener('click', () => {
              this.sfx.tap();
              qIndex += 1;
              renderQuestion();
            });
          });

          optsWrap.appendChild(btn);
        });
      };

      renderQuestion();
    }
  }

  window.initUttkarshArcade = function () {
    const mount = document.getElementById('uttkarsh-arcade-mount');
    if (mount && !mount.dataset.initialized) {
      mount.dataset.initialized = 'true';
      new UttkarshArcade(mount);
    }
  };
})();
