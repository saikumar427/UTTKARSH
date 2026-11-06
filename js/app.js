/**
 * Uttkarsh English High School Website — Main Application Controller
 * Handles SPA Top-Header Menu Routing, Lazy Tab Rendering, Video Lifecycle,
 * Google Photos Album Filtering, Lightbox Viewer, Partner External Links,
 * and Persistent Common Footer Sections (Social Media & Contact Us).
 */
(function () {
  'use strict';

  const DATA = window.UTTKARSH_DATA;
  if (!DATA) return;

  const VALID_PAGES = new Set(DATA.nav.map((n) => n.id));
  const renderedPages = new Set();
  let currentPage = 'home';
  let activeAlbumFilter = 'all';

  const UI_ICONS = {
    external: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`,
    soundOff: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
    soundOn: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
    pause: `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
    play: `<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><polygon points="6 4 20 12 6 20 6 4"/></svg>`,
    check: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,
    quote: `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" aria-hidden="true"><path d="M10 7H6a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H5v2h1a4 4 0 0 0 4-4V7zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7z"/></svg>`,
    zoom: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>`,
    mapPin: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    phone: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    clock: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    whatsapp: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm5.82 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.97-.31-1.67-.61-2.94-1.27-4.86-4.23-5.01-4.43-.15-.2-1.2-1.59-1.2-3.04 0-1.45.76-2.16 1.03-2.46.27-.3.59-.37.79-.37.2 0 .4 0 .57.01.18.01.43-.07.67.51.24.59.84 2.04.91 2.19.07.15.12.32.02.52-.1.2-.15.32-.3.49-.15.17-.31.38-.44.51-.15.15-.3.31-.13.61.17.3.76 1.25 1.63 2.02 1.12 1 2.06 1.31 2.36 1.46.3.15.47.12.64-.07.17-.2.74-.86.94-1.16.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.17 1.4z"/></svg>`,
    menu: `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`,
    close: `<svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2.2" fill="none" stroke-linecap="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
  };

  const STAT_ICONS = [
    `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 9h1"/><path d="M14 9h1"/><path d="M9 13h1"/><path d="M14 13h1"/><path d="M10 21v-4h4v4"/></svg>`,
    `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>`,
    `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`,
    `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`
  ];

  const SOCIAL_SVGS = {
    instagram: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.56A3.02 3.02 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.56 9.38.56 9.38.56s7.5 0 9.38-.56a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>`
  };

  function esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderPageHeroHeader(eyebrow, title, subtitle, tag = 'h1') {
    return `
      <header class="page-hero-header">
        <span class="eyebrow-pill">${esc(eyebrow)}</span>
        <${tag} class="official-page-title">${esc(title)}</${tag}>
        ${subtitle ? `<p class="official-page-subtitle">${esc(subtitle)}</p>` : ''}
      </header>
    `;
  }

  function renderSectionHeader(eyebrow, title, subtitle, idAttr = '') {
    return `
      <div class="section-header-center">
        <span class="eyebrow-pill">${esc(eyebrow)}</span>
        <h2 ${idAttr ? `id="${esc(idAttr)}"` : ''} class="official-section-title">${esc(title)}</h2>
        ${subtitle ? `<p class="section-sublead">${esc(subtitle)}</p>` : ''}
      </div>
    `;
  }

  /* =========================================================================
     PAGE 1: HOME
     ========================================================================= */
  function renderHome(container) {
    const h = DATA.home;
    const statsHtml = h.quickStats
      .map(
        (s, idx) => `
        <div class="stat-pill-card">
          <div class="stat-icon-box">${STAT_ICONS[idx % STAT_ICONS.length]}</div>
          <div class="stat-copy">
            <div class="stat-value">${esc(s.value)}</div>
            <div class="stat-label">${esc(s.label)}</div>
          </div>
        </div>`
      )
      .join('');

    const testimonialsHtml = h.testimonials
      .map(
        (t) => `
        <article class="testimonial-card">
          <div class="testimonial-card-top">
            <span class="testimonial-badge">${esc(t.badge)}</span>
            <span class="testimonial-quote-icon" aria-hidden="true">${UI_ICONS.quote}</span>
          </div>
          <p class="testimonial-quote">“${esc(t.quote)}”</p>
          <div class="testimonial-author">
            <strong>${esc(t.author)}</strong>
            <span>${esc(t.role)}</span>
          </div>
        </article>`
      )
      .join('');

    container.innerHTML = `
      <div class="hero-video-card">
        <h1 class="sr-only">Uttkarsh English High School – Best English Medium School in Malwani, Malad West, Mumbai – Education For All</h1>
      <div class="hero-badge-overlay">
          <span class="hero-badge-kicker">EST. 2006 • GOVT. RECOGNISED</span>
          <span class="hero-badge-divider" aria-hidden="true">•</span>
          <span>Uttkarsh English High School — Education For All</span>
        </div>
        <video
          id="home-hero-video"
          class="hero-video-el"
          src="${esc(h.heroVideo.src)}"
          poster="${esc(h.heroVideo.poster)}"
          autoplay
          muted
          loop
          playsinline
          preload="metadata"
        ></video>
      </div>

      <div class="quick-stats-bar">${statsHtml}</div>

      <section class="arch-section-card" aria-label="Uttkarsh Student Learning Arcade">
        <div id="uttkarsh-arcade-mount"></div>
      </section>

      <section class="arch-section-card" aria-labelledby="home-testimonials-heading">
        ${renderSectionHeader(
          'COMMUNITY VOICES',
          'Parent & Student Testimonials',
          'Reflections from proud parents, scholars, and community members across Malwani, Malad West.',
          'home-testimonials-heading'
        )}
        <div class="testimonials-grid">${testimonialsHtml}</div>
      </section>
    `;

    if (typeof window.initUttkarshArcade === 'function') {
      window.initUttkarshArcade();
    }
  }

  /* =========================================================================
     PAGE 2: ABOUT US
     ========================================================================= */
  function renderAbout(container) {
    const a = DATA.about;
    const introPs = a.schoolIntroParagraphs.map((p) => `<p>${esc(p)}</p>`).join('');
    const chips = a.highlights
      .map(
        (c) => `
        <div class="about-chip">
          <span class="about-chip-icon">${UI_ICONS.check}</span>
          <span>${esc(c)}</span>
        </div>`
      )
      .join('');
    const sahilPs = a.sahilParagraphs.map((p) => `<p>${esc(p)}</p>`).join('');
    const stripHtml = a.campusStrip
      .map(
        (item) => `
        <figure class="campus-strip-item" data-lightbox="${esc(item.src)}" data-caption="${esc(item.caption)}">
          <div class="campus-strip-thumb">
            <img src="${esc(item.src)}" alt="${esc(item.caption)}" loading="lazy" decoding="async" />
          </div>
          <figcaption>${esc(item.caption)}</figcaption>
        </figure>`
      )
      .join('');

    container.innerHTML = `
      <div class="about-split-row about-split-intro">
        <article class="about-content-card">
          <div class="about-card-head">
            <span class="eyebrow-pill">OUR INSTITUTIONAL STORY</span>
            <h1 class="about-box-title">${esc(a.schoolIntroTitle)}</h1>
          </div>
          <div class="about-prose">${introPs}</div>
          <div class="about-highlights-grid">${chips}</div>
        </article>

        <figure
          class="about-media-card"
          data-lightbox="${esc(a.entranceImage)}"
          data-caption="Uttkarsh English High School & Little World Kindergarten — Consistent 100% SSC Result"
        >
          <img
            src="${esc(a.entranceImage)}"
            alt="Uttkarsh English High School Entrance and 100% SSC Result Banner"
            loading="eager"
            decoding="async"
          />
          <figcaption class="about-media-caption">
            <span>Uttkarsh Campus Entrance • Consistent 100% SSC Result</span>
            <span class="caption-zoom-pill">${UI_ICONS.zoom}</span>
          </figcaption>
        </figure>
      </div>

      <figure
        class="about-panoramic-card"
        data-lightbox="${esc(a.bannerImage)}"
        data-caption="Uttkarsh Students & Faculty at the Elevate Leadership Programme"
      >
        <img
          src="${esc(a.bannerImage)}"
          alt="Students and Teachers of Uttkarsh English High School"
          loading="lazy"
          decoding="async"
        />
        <figcaption class="about-media-caption">
          <span>Uttkarsh Scholars &amp; Mentors • Elevate Student Leadership Showcase</span>
          <span class="caption-zoom-pill">${UI_ICONS.zoom}</span>
        </figcaption>
      </figure>

      <article class="about-quote-banner">
        <div class="about-quote-watermark" aria-hidden="true">${UI_ICONS.quote}</div>
        <span class="eyebrow-pill">FACULTY COMMITMENT</span>
        <h2 class="about-box-title">${esc(a.teachersTitle)}</h2>
        <p class="about-teachers-quote">${esc(a.teachersMessage)}</p>
        <div class="about-signature">${esc(a.teachersSignature)}</div>
      </article>

      <div class="about-split-row about-split-sahil">
        <article class="about-content-card">
          <div class="about-card-head">
            <span class="eyebrow-pill">LEADERSHIP VISION</span>
            <h2 class="about-box-title">${esc(a.sahilTitle)}</h2>
          </div>
          <div class="about-prose">${sahilPs}</div>
          <div class="about-signature about-signature-bottom">${esc(a.sahilSignature)}</div>
        </article>

        <figure
          class="about-media-card"
          data-lightbox="${esc(a.sahilImage)}"
          data-caption="Sahil Sir with Uttkarsh Faculty and Students"
        >
          <img
            src="${esc(a.sahilImage)}"
            alt="Sahil Sir with Uttkarsh Teachers and Students"
            loading="lazy"
            decoding="async"
          />
          <figcaption class="about-media-caption">
            <span>Sahil Sir with Uttkarsh Teaching Faculty &amp; Students</span>
            <span class="caption-zoom-pill">${UI_ICONS.zoom}</span>
          </figcaption>
        </figure>
      </div>

      <section class="arch-section-card" aria-label="Campus Life Glimpses">
        ${renderSectionHeader(
          'CAMPUS HIGHLIGHTS',
          'Glimpses of Uttkarsh',
          'Select any photograph to inspect full-resolution campus moments.'
        )}
        <div class="campus-strip-grid">${stripHtml}</div>
      </section>
    `;
  }

  /* =========================================================================
     PAGE 3: INSIDE SCHOOL
     ========================================================================= */
  function renderInsideSchool(container) {
    const ins = DATA.insideSchool;

    // Pair left and right activities row-by-row so all 22 activities align in a clean 2-column grid
    const combinedActivities = [];
    const maxLen = Math.max(ins.leftActivities.length, ins.rightActivities.length);
    for (let i = 0; i < maxLen; i++) {
      if (ins.leftActivities[i]) combinedActivities.push(ins.leftActivities[i]);
      if (ins.rightActivities[i]) combinedActivities.push(ins.rightActivities[i]);
    }

    const activitiesHtml = combinedActivities
      .map((act, idx) => {
        const indexNum = String(idx + 1).padStart(2, '0');
        const actionHtml = act.albumUrl
          ? `<a class="btn-card-link" href="${esc(act.albumUrl)}" target="_blank" rel="noopener noreferrer">
               <span>${esc(act.albumLabel || 'Full Album')}</span>
               ${UI_ICONS.external}
             </a>`
          : `<button type="button" class="btn-card-zoom" data-lightbox="${esc(act.src)}" data-caption="${esc(act.title)}" aria-label="Enlarge ${esc(act.title)}">
               ${UI_ICONS.zoom}
               <span>Enlarge</span>
             </button>`;

        return `
          <article class="activity-arch-card">
            <div class="activity-media-frame" data-lightbox="${esc(act.src)}" data-caption="${esc(act.title)}">
              <span class="activity-index-badge">${indexNum}</span>
              <img src="${esc(act.src)}" alt="${esc(act.title)}" loading="lazy" decoding="async" />
            </div>
            <div class="activity-card-footer">
              <h3 class="activity-card-title">${esc(act.title)}</h3>
              ${actionHtml}
            </div>
          </article>`;
      })
      .join('');

    const albumsCardsHtml = ins.googleAlbums
      .map(
        (alb) => `
        <article class="google-album-card" data-album-card="${esc(alb.id)}">
          <div class="album-cover-wrap" data-lightbox="${esc(alb.cover)}" data-caption="${esc(alb.title)}">
            <img class="album-cover-img" src="${esc(alb.cover)}" alt="${esc(alb.title)}" loading="lazy" decoding="async" />
          </div>
          <div class="album-card-body">
            <h3 class="album-card-title">${esc(alb.title)}</h3>
            <div class="album-card-meta">${esc(alb.date)}</div>
            <div class="album-card-actions">
              <button type="button" class="album-filter-btn" data-filter-album="${esc(alb.id)}">Preview</button>
              <a class="album-ext-link" href="${esc(alb.url)}" target="_blank" rel="noopener noreferrer">
                <span>Google Photos</span>
                ${UI_ICONS.external}
              </a>
            </div>
          </div>
        </article>`
      )
      .join('');

    const filterPillsHtml = [
      `<button type="button" class="filter-chip active" data-filter-album="all">All Event Highlights</button>`,
      ...ins.googleAlbums.map(
        (alb) =>
          `<button type="button" class="filter-chip" data-filter-album="${esc(alb.id)}">${esc(alb.title)}</button>`
      )
    ].join('');

    const prePrimaryHtml = ins.prePrimary.photos
      .map(
        (p) => `
        <figure class="polaroid-card scattered" style="--rot:${Number(p.rot || 0)}deg" data-lightbox="${esc(p.src)}" data-caption="${esc(p.caption)}">
          <div class="polaroid-img-wrap">
            <img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy" decoding="async" />
          </div>
          <figcaption class="polaroid-caption">${esc(p.caption)}</figcaption>
        </figure>`
      )
      .join('');

    const primaryHtml = ins.primary.photos
      .map(
        (p) => `
        <figure class="gallery-arch-card" data-lightbox="${esc(p.src)}" data-caption="${esc(p.caption)}">
          <div class="gallery-img-wrap">
            <img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy" decoding="async" />
          </div>
          <figcaption class="gallery-card-caption">${esc(p.caption)}</figcaption>
        </figure>`
      )
      .join('');

    const secondaryHtml = ins.secondary.photos
      .map(
        (p) => `
        <figure class="gallery-arch-card" data-lightbox="${esc(p.src)}" data-caption="${esc(p.caption)}">
          <div class="gallery-img-wrap">
            <img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy" decoding="async" />
          </div>
          <figcaption class="gallery-card-caption">${esc(p.caption)}</figcaption>
        </figure>`
      )
      .join('');

    container.innerHTML = `
      ${renderPageHeroHeader(
        'CAMPUS LIFE & CULTURE',
        ins.activitiesBanner,
        'Year-round cultural festivals, national celebrations, educational field expeditions, and student competitions.'
      )}

      <div class="activities-aligned-grid">${activitiesHtml}</div>

      <section class="arch-section-card" aria-labelledby="albums-hub-heading">
        ${renderSectionHeader(
          'OFFICIAL PHOTO ARCHIVES',
          'Shared Event Photo Albums',
          'Filter curated highlights below or open the complete official Google Photos shared albums.',
          'albums-hub-heading'
        )}
        <div class="albums-cards-grid">${albumsCardsHtml}</div>
        <div class="album-filter-toolbar" role="toolbar" aria-label="Filter Event Highlights">
          ${filterPillsHtml}
        </div>
        <div class="album-highlights-wall" id="album-highlights-wall"></div>
      </section>

      <section class="arch-section-card arch-section-tinted" aria-label="Pre-Primary Section Gallery">
        ${renderSectionHeader(
          'LITTLE WORLD KINDERGARTEN',
          ins.prePrimary.banner,
          'Joyful early-childhood discovery, storytelling, creative play, and Sr. KG graduation milestones.'
        )}
        <div class="polaroid-collage-stage">${prePrimaryHtml}</div>
      </section>

      <section class="arch-section-card" aria-label="Primary Section Gallery">
        ${renderSectionHeader(
          'FOUNDATIONAL SCHOLARS',
          ins.primary.banner,
          'Activity-based classroom collaboration, foundational STEM experiments, art, and computer literacy.'
        )}
        <div class="gallery-grid-3">${primaryHtml}</div>
      </section>

      <section class="arch-section-card" aria-label="Secondary Section Gallery">
        ${renderSectionHeader(
          'BOARD EXCELLENCE & LEADERSHIP',
          ins.secondary.banner,
          'Rigorous academic mentoring, practical science labs, athletic championships, and 100% SSC board preparation.'
        )}
        <div class="gallery-grid-3">${secondaryHtml}</div>
      </section>
    `;

    const renderAlbumWall = (filterId) => {
      activeAlbumFilter = filterId;
      const wall = container.querySelector('#album-highlights-wall');
      if (!wall) return;
      const items = [];
      ins.googleAlbums.forEach((alb) => {
        if (filterId === 'all' || filterId === alb.id) {
          alb.photos.forEach((ph) => items.push(ph));
        }
      });

      wall.innerHTML = items
        .map(
          (ph) => `
          <figure class="album-wall-item" data-lightbox="${esc(ph.src)}" data-caption="${esc(ph.caption)}">
            <div class="album-wall-thumb">
              <img src="${esc(ph.src)}" alt="${esc(ph.caption)}" loading="lazy" decoding="async" />
            </div>
            <figcaption>${esc(ph.caption)}</figcaption>
          </figure>`
        )
        .join('');

      container.querySelectorAll('[data-filter-album]').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.filterAlbum === filterId);
      });
      container.querySelectorAll('[data-album-card]').forEach((card) => {
        card.classList.toggle('is-selected', card.dataset.albumCard === filterId);
      });
    };

    container.addEventListener('click', (e) => {
      const fBtn = e.target.closest('[data-filter-album]');
      if (fBtn) {
        const nextFilter = fBtn.dataset.filterAlbum;
        renderAlbumWall(activeAlbumFilter === nextFilter && nextFilter !== 'all' ? 'all' : nextFilter);
      }
    });

    renderAlbumWall('all');
  }

  /* =========================================================================
     PAGE 4: FACILITIES
     ========================================================================= */
  function renderFacilities(container) {
    const fac = DATA.facilities;

    const blocksHtml = fac.blocks
      .map((block, bIdx) => {
        const numBadge = String(bIdx + 1).padStart(2, '0');

        if (block.layout === 'dual-labeled') {
          const cols = block.items
            .map(
              (item) => `
              <figure class="dual-lab-card" data-lightbox="${esc(item.src)}" data-caption="${esc(item.label)}">
                <div class="facility-media-box is-photo">
                  <img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy" decoding="async" />
                </div>
                <figcaption class="dual-lab-label">
                  <span>${esc(item.label)}</span>
                  <span class="caption-zoom-pill">${UI_ICONS.zoom}</span>
                </figcaption>
              </figure>`
            )
            .join('');

          return `
            <section class="facility-arch-card">
              <div class="facility-card-header">
                <div class="facility-header-left">
                  <span class="facility-num-pill">${numBadge}</span>
                  <div>
                    <span class="facility-cat-label">${esc(block.category || 'Campus Infrastructure')}</span>
                    <h2 class="facility-card-title">${esc(block.title)}</h2>
                  </div>
                </div>
              </div>
              <div class="facility-media-grid dual-labeled">${cols}</div>
            </section>`;
        }

        const mediaItems = block.items
          .map((item) => {
            if (item.type === 'video') {
              const isPortrait = item.height && item.width && item.height > item.width;
              return `
                <div
                  class="facility-media-box is-video ${isPortrait ? 'is-portrait-video' : 'is-landscape-video'}"
                  style="--poster-bg: url('${esc(item.poster)}')"
                >
                  <video
                    class="facility-video-el"
                    src="${esc(item.src)}"
                    poster="${esc(item.poster)}"
                    controls
                    playsinline
                    preload="none"
                  ></video>
                </div>`;
            }
            return `
              <div class="facility-media-box is-photo" data-lightbox="${esc(item.src)}" data-caption="${esc(block.title)}">
                <img src="${esc(item.src)}" alt="${esc(item.alt)}" loading="lazy" decoding="async" />
              </div>`;
          })
          .join('');

        return `
          <section class="facility-arch-card">
            <div class="facility-card-header">
              <div class="facility-header-left">
                <span class="facility-num-pill">${numBadge}</span>
                <div>
                  <span class="facility-cat-label">${esc(block.category || 'Campus Facility')}</span>
                  <h2 class="facility-card-title">${esc(block.title)}</h2>
                </div>
              </div>
            </div>
            <div class="facility-media-grid ${esc(block.layout)}">${mediaItems}</div>
          </section>`;
      })
      .join('');

    container.innerHTML = `
      ${renderPageHeroHeader('CAMPUS INFRASTRUCTURE', fac.banner, fac.subtitle)}
      <div class="facilities-stack">${blocksHtml}</div>
    `;

    const videos = Array.from(container.querySelectorAll('.facility-video-el'));
    videos.forEach((v) => {
      v.addEventListener('play', () => {
        videos.forEach((other) => {
          if (other !== v && !other.paused) other.pause();
        });
      });
    });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting && !entry.target.paused) {
              entry.target.pause();
            }
          });
        },
        { threshold: 0.1 }
      );
      videos.forEach((v) => io.observe(v));
    }
  }

  /* =========================================================================
     PAGE 5: OUR SUPPORTERS (WITH VERIFIED EXTERNAL PARTNER LINKS)
     ========================================================================= */
  function renderPartnerCard(card, extraClass = '') {
    const isDarkLogo = /Equal Lens|CMS Info/i.test(card.name || '');
    const extButton = card.url
      ? `<a
           href="${esc(card.url)}"
           target="_blank"
           rel="noopener noreferrer"
           class="partner-link-pill"
           aria-label="Visit ${esc(card.name)} official website (${esc(card.domain || 'External Link')})"
         >
           <span>${esc(card.domain || 'Visit Website')}</span>
           ${UI_ICONS.external}
         </a>`
      : `<span class="partner-verified-tag">Philanthropic Trust</span>`;

    let logoStageInner = '';
    if (card.textCrest) {
      logoStageInner = `<div class="supporter-text-crest">${esc(card.textCrest).replace(/\n/g, '<br/>')}</div>`;
    } else if (card.url) {
      logoStageInner = `
        <a
          href="${esc(card.url)}"
          target="_blank"
          rel="noopener noreferrer"
          class="partner-logo-anchor"
          aria-label="Open ${esc(card.name)} website"
        >
          <img src="${esc(card.logo)}" alt="${esc(card.name)}" loading="lazy" decoding="async" />
        </a>`;
    } else {
      logoStageInner = `<img src="${esc(card.logo)}" alt="${esc(card.name)}" loading="lazy" decoding="async" />`;
    }

    return `
      <article class="partner-arch-card ${extraClass}">
        <div class="partner-card-topbar">
          <span class="partner-cat-tag">${esc(card.category || 'Institutional Partner')}</span>
          ${extButton}
        </div>
        <div class="partner-logo-stage ${isDarkLogo ? 'is-dark-stage' : ''} ${card.textCrest ? 'is-crest-stage' : ''}">
          ${logoStageInner}
        </div>
        <div class="partner-card-body">
          <h2 class="partner-org-name">${esc(card.name)}</h2>
          <div class="partner-project-banner">${esc(card.project)}</div>
        </div>
      </article>
    `;
  }

  function renderSupporters(container) {
    const sup = DATA.supporters;

    const rowsHtml = sup.rows
      .map((row) => {
        if (row.type === 'pair') {
          const cardsHtml = row.cards.map((c) => renderPartnerCard(c)).join('');
          return `<div class="supporter-pair-grid">${cardsHtml}</div>`;
        }

        if (row.type === 'joint') {
          const logosHtml = row.logos
            .map((l) => {
              const isDark = /CMS Info/i.test(l.name || '');
              return `
                <div class="joint-partner-unit">
                  <a
                    href="${esc(l.url)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="partner-logo-stage ${isDark ? 'is-dark-stage' : ''}"
                    aria-label="Open ${esc(l.name)} official website"
                  >
                    <img src="${esc(l.logo)}" alt="${esc(l.name)}" loading="lazy" decoding="async" />
                  </a>
                  <div class="joint-partner-meta">
                    <span class="joint-partner-name">${esc(l.name)}</span>
                    <a
                      href="${esc(l.url)}"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="partner-link-pill"
                    >
                      <span>${esc(l.domain)}</span>
                      ${UI_ICONS.external}
                    </a>
                  </div>
                </div>`;
            })
            .join('');

          return `
            <article class="partner-arch-card partner-joint-card">
              <div class="partner-card-topbar">
                <span class="partner-cat-tag">${esc(row.category || 'Joint CSR Collaboration')}</span>
                <span class="partner-verified-tag">Co-Sponsored Initiative</span>
              </div>
              <div class="joint-partners-grid">${logosHtml}</div>
              <div class="partner-card-body">
                <div class="partner-project-banner">${esc(row.project)}</div>
              </div>
            </article>`;
        }

        return `<div class="supporter-single-wrap">${renderPartnerCard(row, 'partner-single-card')}</div>`;
      })
      .join('');

    container.innerHTML = `
      ${renderPageHeroHeader('CSR, NGO & EDTECH ECOSYSTEM', sup.banner, sup.subtitle)}
      <div class="supporters-stack">${rowsHtml}</div>
    `;
  }

  /* =========================================================================
     COMMON BOTTOM SECTIONS (SOCIAL MEDIA & CONTACT US ON EVERY PAGE)
     ========================================================================= */
  function renderCommonBottom() {
    const socialMount = document.getElementById('common-social-mount');
    const contactMount = document.getElementById('common-contact-mount');
    const s = DATA.school;

    if (socialMount) {
      const cardsHtml = DATA.socialMedia
        .map(
          (sm) => `
          <a
            href="${esc(sm.url)}"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link-card social-${esc(sm.id)}"
            aria-label="Visit Uttkarsh on ${esc(sm.name)}"
          >
            <div class="social-icon-circle">${SOCIAL_SVGS[sm.id] || ''}</div>
            <div class="social-platform-name">${esc(sm.name)}</div>
            <div class="social-handle">${esc(sm.handle)}</div>
            <span class="social-cta-pill">
              <span>${esc(sm.cta)}</span>
              ${UI_ICONS.external}
            </span>
          </a>`
        )
        .join('');

      socialMount.innerHTML = `
        ${renderSectionHeader(
          'OFFICIAL CHANNELS',
          'Connect on Social Media',
          'Follow daily classroom innovations, annual sports highlights, and student celebrations.',
          'common-social-heading'
        )}
        <div class="social-cards-grid">${cardsHtml}</div>
      `;
    }

    if (contactMount) {
      contactMount.innerHTML = `
        ${renderSectionHeader(
          'ADMISSIONS & CAMPUS DESK',
          'Contact Us',
          'Admissions Open — Nursery, Jr. KG, Sr. KG & Grade I to Grade X',
          'common-contact-heading'
        )}

        <div class="contact-grid">
          <div class="contact-info-panel">
            <div class="contact-identity-head">
              <h3 class="contact-school-title">${esc(s.name)}</h3>
              <div class="contact-school-sub">${esc(s.subName)} • “${esc(s.tagline)}”</div>
            </div>

            <div class="recognition-badges">
              <span class="rec-badge">Est. ${esc(s.established)}</span>
              <span class="rec-badge">${esc(s.sscResult)}</span>
              <span class="rec-badge">SSC Index: ${esc(s.sscIndex)}</span>
              <span class="rec-badge">UDISE Pri: ${esc(s.udisePrimary)}</span>
              <span class="rec-badge">UDISE Sec: ${esc(s.udiseSecondary)}</span>
            </div>

            <ul class="contact-details-list">
              <li>
                <span class="contact-icon-box" aria-hidden="true">${UI_ICONS.mapPin}</span>
                <div>
                  <strong>Campus Address</strong>
                  <p>${esc(s.address)}</p>
                  <a href="${esc(s.mapExternalUrl)}" target="_blank" rel="noopener noreferrer" class="inline-official-link">
                    <span>Open in Google Maps</span>
                    ${UI_ICONS.external}
                  </a>
                </div>
              </li>
              <li>
                <span class="contact-icon-box" aria-hidden="true">${UI_ICONS.phone}</span>
                <div>
                  <strong>Admission &amp; Office Desk</strong>
                  <p><a href="tel:${esc(s.phone.replace(/\s+/g, ''))}" class="contact-phone-link">${esc(s.phone)}</a></p>
                </div>
              </li>
              <li>
                <span class="contact-icon-box" aria-hidden="true">${UI_ICONS.clock}</span>
                <div>
                  <strong>School Hours</strong>
                  <p>${esc(s.hours)}</p>
                </div>
              </li>
            </ul>

            <div class="contact-map-frame">
              <iframe
                title="Uttkarsh English High School Location Map"
                src="${esc(s.mapEmbedUrl)}"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div class="contact-form-panel">
            <div class="contact-form-head">
              <h3 class="contact-form-title">Admission &amp; Parent Enquiry</h3>
              <p class="contact-form-note">Complete the form below to connect directly with our school office via WhatsApp or telephone.</p>
            </div>

            <form class="enquiry-form" id="uttkarsh-enquiry-form">
              <div class="form-row-2">
                <div class="form-field">
                  <label for="eq-parent">Parent / Guardian Name *</label>
                  <input type="text" id="eq-parent" name="parent" required placeholder="Enter full name" />
                </div>
                <div class="form-field">
                  <label for="eq-phone">Mobile Number *</label>
                  <input type="tel" id="eq-phone" name="phone" required placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>

              <div class="form-row-2">
                <div class="form-field">
                  <label for="eq-student">Student Name</label>
                  <input type="text" id="eq-student" name="student" placeholder="Child's full name" />
                </div>
                <div class="form-field">
                  <label for="eq-grade">Applying For Section *</label>
                  <select id="eq-grade" name="grade" required>
                    <option value="Pre-Primary (Nursery / Jr. KG / Sr. KG)">Pre-Primary (Nursery / Jr. KG / Sr. KG)</option>
                    <option value="Primary Section (Grade I – IV)">Primary Section (Grade I – IV)</option>
                    <option value="Secondary Section (Grade V – X)">Secondary Section (Grade V – X)</option>
                    <option value="CSR / Volunteering Partnership">CSR / Volunteering Partnership</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>
              </div>

              <div class="form-field">
                <label for="eq-message">Enquiry Details</label>
                <textarea id="eq-message" name="message" rows="4" placeholder="Ask about admissions, documents required, timings, or campus visit..."></textarea>
              </div>

              <div class="contact-actions-row">
                <button type="submit" class="btn-whatsapp-submit">
                  ${UI_ICONS.whatsapp}
                  <span>Send via WhatsApp</span>
                </button>
                <a href="tel:${esc(s.phone.replace(/\s+/g, ''))}" class="btn-call-direct">
                  ${UI_ICONS.phone}
                  <span>Call ${esc(s.phone)}</span>
                </a>
              </div>
              <div class="form-status-msg" id="eq-status" hidden></div>
            </form>
          </div>
        </div>
      `;

      const form = contactMount.querySelector('#uttkarsh-enquiry-form');
      const statusEl = contactMount.querySelector('#eq-status');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const parent = form.parent.value.trim();
          const phone = form.phone.value.trim();
          const student = form.student.value.trim();
          const grade = form.grade.value;
          const msg = form.message.value.trim();

          const lines = [
            `Hello Uttkarsh English High School,`,
            `I would like to enquire from the official school website:`,
            `• Parent/Name: ${parent}`,
            `• Contact: ${phone}`,
            student ? `• Student Name: ${student}` : '',
            `• Section/Grade: ${grade}`,
            msg ? `• Message: ${msg}` : ''
          ].filter(Boolean);

          const waUrl = `https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
          if (statusEl) {
            statusEl.textContent = 'Opening WhatsApp chat with Uttkarsh Admission Desk...';
            statusEl.hidden = false;
          }
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
      }
    }
  }

  /* =========================================================================
     ROUTER & VIDEO LIFECYCLE CONTROLLER
     ========================================================================= */
  function ensurePageRendered(pageId) {
    if (renderedPages.has(pageId)) return;
    const section = document.getElementById(`page-${pageId}`);
    if (!section) return;

    if (pageId === 'home') renderHome(section);
    else if (pageId === 'about-us') renderAbout(section);
    else if (pageId === 'inside-school') renderInsideSchool(section);
    else if (pageId === 'facilities') renderFacilities(section);
    else if (pageId === 'our-supporters') renderSupporters(section);

    renderedPages.add(pageId);
  }

  function pauseVideosIn(el) {
    if (!el) return;
    el.querySelectorAll('video').forEach((v) => {
      if (!v.paused) v.pause();
    });
  }

  function activatePage(rawPageId, opts = { updateHash: true, scrollTop: true }) {
    const pageId = VALID_PAGES.has(rawPageId) ? rawPageId : 'home';
    ensurePageRendered(pageId);

    document.querySelectorAll('.page-view').forEach((sec) => {
      const isTarget = sec.dataset.page === pageId;
      if (!isTarget) {
        pauseVideosIn(sec);
        sec.hidden = true;
        sec.classList.remove('active');
      } else {
        sec.hidden = false;
        sec.classList.add('active');
      }
    });

    if (pageId === 'home') {
      const heroVid = document.getElementById('home-hero-video');
      const playBtn = document.getElementById('hero-play-btn');
      if (heroVid && heroVid.paused && (!playBtn || playBtn.getAttribute('aria-pressed') !== 'false')) {
        heroVid.play().catch(() => {});
      }
    }

    document.querySelectorAll('.nav-pill').forEach((link) => {
      const active = link.dataset.nav === pageId;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });

    const topNav = document.getElementById('primary-top-nav');
    const menuBtn = document.getElementById('mobile-menu-toggle');
    if (topNav && topNav.classList.contains('is-open')) {
      topNav.classList.remove('is-open');
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.innerHTML = UI_ICONS.menu;
      }
    }

    currentPage = pageId;

    // === SEO: Dynamic page title, meta description, OG & Twitter tags ===
    (function updateSEOMeta() {
      var DATA = window.UTTKARSH_DATA;
      if (!DATA || !DATA.seo || !DATA.seo.pages) return;
      var pageSeo = DATA.seo.pages[pageId] || DATA.seo.pages['home'];
      var pageUrl = DATA.seo.siteUrl + (pageId === 'home' ? '' : '#' + pageId);
      if (pageSeo.title) document.title = pageSeo.title;
      var updates = [
        ['meta[name="description"]', 'content', pageSeo.description],
        ['meta[property="og:title"]', 'content', pageSeo.title],
        ['meta[property="og:description"]', 'content', pageSeo.description],
        ['meta[property="og:url"]', 'content', pageUrl],
        ['meta[name="twitter:title"]', 'content', pageSeo.title],
        ['meta[name="twitter:description"]', 'content', pageSeo.description],
        ['link[rel="canonical"]', 'href', pageUrl],
        ['link[rel="alternate"]', 'href', pageUrl]
      ];
      updates.forEach(function(u) {
        var el = document.querySelector(u[0]);
        if (el && u[2]) el.setAttribute(u[1], u[2]);
      });
    })();


    if (opts.updateHash) {
      const targetHash = `#${pageId}`;
      if (window.location.hash !== targetHash) {
        history.pushState(null, '', targetHash);
      }
    }

    if (opts.scrollTop) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    window.dispatchEvent(new CustomEvent('uttkarsh:pagechange', { detail: { page: pageId } }));
  }

  /* =========================================================================
     LIGHTBOX CONTROLLER
     ========================================================================= */
  function initLightbox() {
    const modal = document.getElementById('photo-lightbox');
    const imgEl = document.getElementById('lightbox-image');
    const capEl = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close-btn');
    if (!modal || !imgEl || !capEl || !closeBtn) return;

    const close = () => {
      modal.hidden = true;
      imgEl.src = '';
      document.body.style.overflow = '';
    };

    document.addEventListener('click', (e) => {
      if (e.target.closest('a[href]')) return;
      const trigger = e.target.closest('[data-lightbox]');
      if (trigger) {
        const src = trigger.dataset.lightbox;
        const caption = trigger.dataset.caption || '';
        if (src) {
          imgEl.src = src;
          imgEl.alt = caption;
          capEl.textContent = caption;
          modal.hidden = false;
          document.body.style.overflow = 'hidden';
        }
      }
    });

    closeBtn.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) close();
    });
  }

  /* =========================================================================
     OFFICIAL INSTITUTIONAL CONSTELLATION & SHOOTING-STAR ENGINE
     - Fills left & right margins with an official Royal Blue & Sky Cyan
       Constellation Network + Sculpted 4-Point North-Stars (✦) & Shooting Stars
     - Strictly ZERO circles, ZERO cards, ZERO orange/pink color clashes
     ========================================================================= */
  function initSideCelebrationEngine() {
    const leftCanvas = document.getElementById('side-canvas-left');
    const rightCanvas = document.getElementById('side-canvas-right');
    if (!leftCanvas || !rightCanvas) return;

    const COLORS = [
      '#0052cc', // Official Uttkarsh Royal
      '#2563eb', // Brilliant Royal Blue
      '#0284c7', // Sky Blue
      '#38bdf8', // Ice Cyan
      '#4338ca'  // Academic Indigo
    ];

    function drawSculptedNorthStar(ctx, x, y, radius, rotation, color, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = color;
      const c = radius * 0.22;
      ctx.beginPath();
      ctx.moveTo(0, -radius);
      ctx.quadraticCurveTo(c, -c, radius, 0);
      ctx.quadraticCurveTo(c, c, 0, radius);
      ctx.quadraticCurveTo(-c, c, -radius, 0);
      ctx.quadraticCurveTo(-c, -c, 0, -radius);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function drawFivePointStar(ctx, x, y, radius, rotation, color, alpha) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
      ctx.fillStyle = color;
      ctx.beginPath();
      const spikes = 5;
      const innerRadius = radius * 0.45;
      for (let i = 0; i < spikes * 2; i++) {
        const r = i % 2 === 0 ? radius : innerRadius;
        const angle = (i * Math.PI) / spikes - Math.PI / 2;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    function createStage(canvas, seedOffset) {
      const ctx = canvas.getContext('2d');
      let width = 160;
      let height = 800;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      function resize() {
        const rect = canvas.parentElement.getBoundingClientRect();
        width = Math.max(60, rect.width || 160);
        height = Math.max(400, rect.height || window.innerHeight - 80);
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      resize();

      // 20 Constellation Star Nodes evenly distributed across the full margin height
      const stars = Array.from({ length: 20 }, (_, i) => ({
        xRatio: 0.14 + ((i * 0.29 + seedOffset * 0.17) % 0.72),
        y: ((i / 20) * height + (seedOffset * 23)) % height,
        size: 5.2 + (i % 4) * 1.9,
        vy: 0.22 + (i % 4) * 0.07,
        swayAmp: 8 + (i % 3) * 5,
        swaySpeed: 0.011 + (i % 3) * 0.004,
        phase: i * 0.95 + seedOffset,
        rot: i * 0.35,
        vRot: (i % 2 === 0 ? 1 : -1) * 0.004,
        isFivePoint: i % 4 === 0,
        color: COLORS[(i + seedOffset) % COLORS.length],
        cx: 0,
        cy: 0
      }));

      // 2 Graceful upward Shooting-Star Light Streams per side
      const shootingStars = [
        { progress: 0.35, slot: 0.28, speed: 0.0045, dir: seedOffset === 1 ? 1 : -1 },
        { progress: 0.78, slot: 0.72, speed: 0.0052, dir: seedOffset === 1 ? -1 : 1 }
      ];

      let frameCount = seedOffset * 30;

      function step() {
        ctx.clearRect(0, 0, width, height);
        if (width < 40) return;
        frameCount++;

        // 1. Update Star Node Positions
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          s.y -= s.vy;
          s.rot += s.vRot;
          if (s.y < -15) {
            s.y = height + 15;
          }
          s.cx = width * s.xRatio + Math.sin(frameCount * s.swaySpeed + s.phase) * s.swayAmp;
          s.cy = s.y;
        }

        // 2. Draw Delicate Architectural Constellation Lines Connecting Nearby Stars
        const maxDist = Math.min(135, width * 0.95);
        ctx.save();
        ctx.lineWidth = 1.1;
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].cx - stars[j].cx;
            const dy = stars[i].cy - stars[j].cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxDist) {
              const lineAlpha = (1 - dist / maxDist) * 0.24;
              ctx.strokeStyle = `rgba(37, 99, 235, ${lineAlpha.toFixed(3)})`;
              ctx.beginPath();
              ctx.moveTo(stars[i].cx, stars[i].cy);
              ctx.lineTo(stars[j].cx, stars[j].cy);
              ctx.stroke();
            }
          }
        }
        ctx.restore();

        // 3. Draw Graceful Shooting-Star Light Trails
        for (let k = 0; k < shootingStars.length; k++) {
          const st = shootingStars[k];
          st.progress += st.speed;
          if (st.progress >= 1) {
            st.progress = 0;
            st.slot = 0.18 + Math.random() * 0.68;
          }
          const p = st.progress;
          const fade = p < 0.2 ? p / 0.2 : p > 0.8 ? (1 - p) / 0.2 : 1;
          const headX = width * (st.dir > 0 ? 0.2 + p * 0.6 : 0.8 - p * 0.6);
          const headY = height * st.slot - p * 110;
          const tailX = headX - st.dir * 38;
          const tailY = headY + 46;

          ctx.save();
          const grad = ctx.createLinearGradient(headX, headY, tailX, tailY);
          grad.addColorStop(0, `rgba(2, 132, 199, ${(fade * 0.65).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(56, 189, 248, 0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(headX, headY);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();
          ctx.restore();

          drawSculptedNorthStar(ctx, headX, headY, 6.5, frameCount * 0.02, '#0284c7', fade * 0.88);
        }

        // 4. Draw Sculpted Star Nodes (Zero Circles!)
        for (let i = 0; i < stars.length; i++) {
          const s = stars[i];
          const wave = 0.5 + 0.5 * Math.sin(frameCount * 0.038 + s.phase);
          const alpha = 0.38 + wave * 0.54;
          const scale = 0.85 + wave * 0.26;

          if (s.isFivePoint) {
            drawFivePointStar(ctx, s.cx, s.cy, s.size * 0.84 * scale, s.rot, s.color, alpha);
          } else {
            drawSculptedNorthStar(ctx, s.cx, s.cy, s.size * scale, s.rot * 0.35, s.color, alpha);
          }
        }
      }

      return { resize, step };
    }

    const leftStage = createStage(leftCanvas, 1);
    const rightStage = createStage(rightCanvas, 3);

    leftStage.step();
    rightStage.step();

    window.addEventListener('resize', () => {
      leftStage.resize();
      rightStage.resize();
      leftStage.step();
      rightStage.step();
    });

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      let animId = null;
      function loop() {
        if (window.innerWidth > 1260) {
          leftStage.step();
          rightStage.step();
        }
        animId = requestAnimationFrame(loop);
      }
      function startLoop() { if (!animId) loop(); }
      function stopLoop() { if (animId) { cancelAnimationFrame(animId); animId = null; } }
      document.addEventListener('visibilitychange', function() { document.hidden ? stopLoop() : startLoop(); });
      startLoop();
    }
  }

  /* =========================================================================
     INITIALIZATION
     ========================================================================= */
  function init() {
    renderCommonBottom();
    initLightbox();
    initSideCelebrationEngine();

    document.addEventListener('click', (e) => {
      const navEl = e.target.closest('[data-nav]');
      if (navEl) {
        e.preventDefault();
        const targetPage = navEl.dataset.nav;
        activatePage(targetPage, { updateHash: true, scrollTop: true });
      }
    });

    const menuBtn = document.getElementById('mobile-menu-toggle');
    const topNav = document.getElementById('primary-top-nav');
    if (menuBtn && topNav) {
      menuBtn.addEventListener('click', () => {
        const open = topNav.classList.toggle('is-open');
        menuBtn.setAttribute('aria-expanded', String(open));
        menuBtn.innerHTML = open ? UI_ICONS.close : UI_ICONS.menu;
      });
    }

    window.addEventListener('hashchange', () => {
      const hashPage = window.location.hash.replace(/^#/, '');
      if (hashPage && hashPage !== currentPage && VALID_PAGES.has(hashPage)) {
        activatePage(hashPage, { updateHash: false, scrollTop: true });
      }
    });

    const initialHash = window.location.hash.replace(/^#/, '');
    const startPage = VALID_PAGES.has(initialHash) ? initialHash : 'home';
    activatePage(startPage, { updateHash: false, scrollTop: false });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
