/* =====================================================================
   SEBASTIAN BARRAUD — PORTFOLIO  ·  app.js
   Renders everything from data/site.js + data/projects.js.
   You shouldn't need to edit this file to add projects.
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- data ---------- */
  var SITE = window.SITE || {};
  var CATS = SITE.categories || {};
  var seen = {};
  var PROJECTS = (window.PROJECTS || []).map(function (p, i) {
    var slug = p.slug || slugify(p.title || 'project-' + (i + 1));
    while (seen[slug]) slug += '-' + (i + 1);
    seen[slug] = true;
    return Object.assign({}, p, { slug: slug, index: i });
  });
  var bySlug = {};
  PROJECTS.forEach(function (p) { bySlug[p.slug] = p; });

  /* ---------- tiny helpers ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var pad2 = function (n) { return String(n).padStart(2, '0'); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var canHover = window.matchMedia('(hover: hover) and (min-width: 721px)');
  var heroBreak = window.matchMedia('(min-width: 721px)');

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function slugify(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
  function catOf(p) {
    var c = CATS[p.category];
    return c || { label: p.category ? p.category.charAt(0).toUpperCase() + p.category.slice(1) : 'Project', color: 'currentColor' };
  }
  function years(from) { return Math.max(0, new Date().getFullYear() - from); }
  function tokens(str) {
    return String(str || '')
      .replace(/\{years\}/g, years(SITE.careerStart || 2009))
      .replace(/\{uxYears\}/g, years(SITE.uxStart || 2014));
  }
  function paragraphs(text) {
    return String(text || '').split(/\n\s*\n/).map(function (t) { return '<p>' + esc(t.trim()) + '</p>'; }).join('');
  }
  function safeStore(key, val) {
    try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) {}
    return null;
  }

  /* Behance thumbnails are 404px wide; the same file usually exists in bigger
     sizes. Try the bigger one first, fall back to the original if it 404s. */
  function sizeUp(url, size) {
    return url && url.indexOf('/projects/404/') > -1 ? url.replace('/projects/404/', '/projects/' + size + '/') : url;
  }
  function uniq(a) { return a.filter(function (v, i) { return v && a.indexOf(v) === i; }); }
  function tileSrcs(p) { return uniq([sizeUp(p.img, 808), p.img]); }
  function heroSrcs(p) { return uniq([p.hero, sizeUp(p.img, 808), p.img]); }
  function imgTag(srcs, alt, extra) {
    return '<img ' + (extra || '') + ' alt="' + esc(alt || '') + '" data-srcs="' + esc(JSON.stringify(srcs)) + '" decoding="async">';
  }
  /* Optional p.imgPosition ("top"/"bottom"/"center"/etc.): the grid tile, list hover preview
     and next-project thumbnail all crop the cover image with object-fit:cover — this sets
     object-position on that crop so a specific part of the image stays in frame instead of
     the default center crop. The project page header is unaffected (it uses object-fit:contain,
     so the full cover always shows there regardless of this setting). */
  function posStyle(p) { return p.imgPosition ? ' style="object-position:' + esc(p.imgPosition) + '"' : ''; }

  /* Loads each <img data-srcs> trying sources in order; marks the box as broken if all fail. */
  function hydrate(root) {
    $$('img[data-srcs]', root).forEach(function (img) {
      var srcs;
      try { srcs = JSON.parse(img.getAttribute('data-srcs')); } catch (e) { srcs = []; }
      img.removeAttribute('data-srcs');
      var i = 0;
      function next() {
        if (i >= srcs.length) {
          var box = img.closest('[data-title]');
          if (box) box.classList.add('is-broken');
          img.remove();
          return;
        }
        img.src = srcs[i++];
      }
      img.addEventListener('error', next);
      next();
    });
  }

  /* ---------- view transitions (progressive enhancement) ---------- */
  var vtNamed = [];
  function vtName(el, name) {
    if (!el) return;
    el.style.viewTransitionName = name;
    vtNamed.push(el);
  }
  function transition(update) {
    if (!document.startViewTransition || reduce.matches) { update(); return; }
    var t = document.startViewTransition(function () { update(); });
    var clean = function () { vtNamed.forEach(function (el) { el.style.viewTransitionName = ''; }); vtNamed = []; };
    t.finished.then(clean, clean);
  }
  function scrollNow(y) { window.scrollTo({ top: y, left: 0, behavior: 'instant' }); }
  function inViewport(el) {
    var r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
  }

  /* =====================================================================
     STATIC PARTS  (hero, marquee, about, footer)
     ===================================================================== */
  var homeEl = $('#home');
  var projectEl = $('#project');
  var listEl = $('#workList');
  var defaultTitle = document.title;

  /* Optional full-bleed hero background (SITE.heroVideo in data/site.js).
     Desktop/tablet get the video; phones and prefers-reduced-motion get the
     poster image instead, so nothing autoplays where it'd just burn data
     or motion-trigger someone. Does nothing if heroVideo isn't set. */
  function renderHeroMedia() {
    var hv = SITE.heroVideo;
    var el = $('#heroMedia');
    if (!hv || !hv.src || !el) return;
    var html;
    if (heroBreak.matches && !reduce.matches) {
      var mime = { mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime' }[String(hv.src).split('.').pop().toLowerCase()] || '';
      html = '<video autoplay muted loop playsinline preload="auto"' + (hv.poster ? ' poster="' + esc(hv.poster) + '"' : '') + '>' +
        '<source src="' + esc(hv.src) + '"' + (mime ? ' type="' + mime + '"' : '') + '></video>';
    } else if (hv.poster) {
      html = '<img src="' + esc(hv.poster) + '" alt="" loading="eager">';
    } else {
      return;
    }
    el.innerHTML = html;
    el.classList.add('is-active');
    var v = $('video', el);
    if (v) {
      // pause off-screen tabs to save battery/CPU; resume on return
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) v.pause(); else v.play().catch(function () {});
      });
    }
  }

  function renderStatic() {
    var yrs = years(SITE.careerStart || 2009);
    $('#brandName').textContent = SITE.name || '';
    $('#heroKicker').textContent = (SITE.city || '') + (SITE.careerStart ? ' · Est. ' + SITE.careerStart : '');
    $('#heroFirst').textContent = SITE.firstName || '';
    $('#heroLast').textContent = SITE.lastName || '';
    $('#heroTagline').textContent = SITE.tagline || '';
    $('#heroCount').textContent = '(' + PROJECTS.length + ')';
    $('#heroMeta').innerHTML =
      '<dt>Role</dt><dd>' + esc(SITE.role || '') + '</dd>' +
      '<dt>Based</dt><dd>' + esc(SITE.city || '') + '</dd>' +
      '<dt>Since</dt><dd>' + esc(SITE.careerStart || '') + '</dd>';
    renderHeroMedia();

    /* marquee */
    var present = {};
    PROJECTS.forEach(function (p) { present[p.category] = true; });
    var words = SITE.marquee && SITE.marquee.length ? SITE.marquee :
      Object.keys(CATS).filter(function (k) { return present[k]; }).map(function (k) { return CATS[k].label; });
    var star = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg>';
    var half = words.concat(words).map(function (w) { return '<span class="marquee-item">' + esc(w) + star + '</span>'; }).join('');
    $('#marquee').innerHTML = half + half;
    if (!words.length) $('.marquee').hidden = true;

    /* about */
    var A = SITE.about || {};
    var st = tokens(A.statement || '').split(' ');
    var tail = st.length > 2 ? st.splice(-2).join(' ') : '';
    $('#aboutTitle').innerHTML = esc(st.join(' ')) + (tail ? ' <em>' + esc(tail) + '</em>' : '');
    $('#aboutCopy').innerHTML = (A.paragraphs || []).map(function (t) { return '<p>' + esc(tokens(t)) + '</p>'; }).join('');
    var stats = [
      { value: yrs + '+', label: 'Years creating' },
      { value: years(SITE.uxStart || 2014) + '+', label: 'Years in UX/UI' },
      { value: PROJECTS.length, label: 'Projects shown' }
    ].concat(A.stats || []);
    $('#aboutStats').innerHTML = stats.map(function (s) {
      return '<div class="reveal"><dt>' + esc(s.label) + '</dt><dd>' + esc(s.value) + '</dd></div>';
    }).join('');
    $('#skillList').innerHTML = (A.skills || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    $('#toolList').innerHTML = (A.tools || []).map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
    if (SITE.portrait) {
      var fig = $('#aboutPortrait');
      fig.hidden = false;
      fig.innerHTML = '<img src="' + esc(SITE.portrait) + '" alt="Portrait of ' + esc(SITE.name) + '" loading="lazy">';
    }

    /* footer */
    var mail = 'mailto:' + (SITE.email || '');
    $('#footerBig').setAttribute('href', mail);
    $('#footerEmail').setAttribute('href', mail);
    $('#footerEmail').textContent = SITE.email || '';
    $('#footerLinks').innerHTML = (SITE.links || []).map(function (l) {
      return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener">' + esc(l.label) + ' ↗</a>';
    }).join('');
    $('#year').textContent = new Date().getFullYear();
    $('#footName').textContent = SITE.name || '';
    $('#footWhere').textContent = SITE.role ? SITE.role + ' — ' + (SITE.city || '') : (SITE.city || '');
  }

  /* =====================================================================
     WORK  (filters, list/grid, hover preview)
     ===================================================================== */
  var rows = [];
  var rowBySlug = {};
  var activeFilter = 'all';

  function renderWork() {
    $('#workCount').textContent = '(' + PROJECTS.length + ')';

    /* filters — only categories that actually have projects */
    var counts = {};
    PROJECTS.forEach(function (p) { counts[p.category] = (counts[p.category] || 0) + 1; });
    var keys = Object.keys(CATS).filter(function (k) { return counts[k]; });
    Object.keys(counts).forEach(function (k) { if (keys.indexOf(k) < 0) keys.push(k); });
    var chips = '<button type="button" class="filter-chip" data-filter="all" aria-pressed="true">All<sup>' + PROJECTS.length + '</sup></button>';
    keys.forEach(function (k) {
      var c = CATS[k] || catOf({ category: k });
      chips += '<button type="button" class="filter-chip" data-filter="' + esc(k) + '" aria-pressed="false" style="--dot:' + esc(c.color) + '"><i></i>' + esc(c.label) + '<sup>' + counts[k] + '</sup></button>';
    });
    $('#filters').innerHTML = chips;
    if (keys.length < 2) $('#filters').hidden = true;

    /* rows */
    listEl.innerHTML = PROJECTS.map(function (p, i) {
      var c = catOf(p);
      return '<a class="row reveal" href="#/work/' + esc(p.slug) + '" data-cat="' + esc(p.category) + '" data-slug="' + esc(p.slug) + '" style="--dot:' + esc(c.color) + ';--d:' + ((i % 6) * 0.05) + 's">' +
        '<span class="row-num">' + pad2(i + 1) + '</span>' +
        '<span class="row-thumb" data-title="' + esc(p.title) + '">' + imgTag(tileSrcs(p), '', 'loading="lazy"' + posStyle(p)) + '</span>' +
        '<span class="row-title">' + esc(p.title) + '</span>' +
        '<span class="row-cat"><i class="row-dot"></i>' + esc(c.label) + '</span>' +
        '<span class="row-arrow" aria-hidden="true">↗</span>' +
        '</a>';
    }).join('');
    rows = $$('.row', listEl);
    rows.forEach(function (r) { rowBySlug[r.dataset.slug] = r; });
    hydrate(listEl);
    applyFilter('all', false);

    /* chips */
    $('#filters').addEventListener('click', function (e) {
      var b = e.target.closest('.filter-chip');
      if (b) applyFilter(b.dataset.filter, true);
    });

    /* view toggle (list / grid) */
    var saved = safeStore('portfolio-view');
    setView(saved === 'list' ? 'list' : 'grid', false);
    $$('.view-toggle button').forEach(function (b) {
      b.addEventListener('click', function () { setView(b.dataset.view, true); });
    });
  }

  function applyFilter(cat, animate) {
    activeFilter = cat;
    hidePreview();
    function update() {
      var n = 0;
      rows.forEach(function (r) {
        var show = cat === 'all' || r.dataset.cat === cat;
        r.hidden = !show;
        if (show) {
          n++;
          if (animate) vtName(r, 'row-' + r.dataset.slug.replace(/[^a-z0-9]/g, ''));
        }
      });
      $$('.filter-chip').forEach(function (c) { c.setAttribute('aria-pressed', String(c.dataset.filter === cat)); });
      $('#filterStatus').textContent = 'Showing ' + n + ' of ' + rows.length + ' projects';
    }
    if (animate) {
      // name the currently-visible rows so they glide to their new positions
      rows.forEach(function (r) { if (!r.hidden) vtName(r, 'row-' + r.dataset.slug.replace(/[^a-z0-9]/g, '')); });
      transition(update);
    } else update();
  }

  function setView(v, animate) {
    hidePreview();
    var update = function () {
      listEl.dataset.view = v;
      $$('.view-toggle button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.view === v)); });
    };
    if (animate) { transition(update); safeStore('portfolio-view', v); } else update();
  }

  /* cursor-following preview (list view, desktop pointers only) */
  var preview = $('#preview');
  var previewImg = $('#previewImg');
  var pv = { on: false, row: null, x: 0, y: 0, tx: 0, ty: 0, raf: 0 };

  function tickPreview() {
    var k = reduce.matches ? 1 : 0.17;
    pv.x += (pv.tx - pv.x) * k;
    pv.y += (pv.ty - pv.y) * k;
    var w = preview.offsetWidth, h = preview.offsetHeight;
    var left = pv.x + 30;
    if (left + w > window.innerWidth - 16) left = pv.x - w - 30;
    var top = Math.max(84, Math.min(window.innerHeight - h - 16, pv.y - h / 2));
    var tilt = reduce.matches ? 0 : Math.max(-7, Math.min(7, (pv.tx - pv.x) * 0.05));
    preview.style.transform = 'translate3d(' + left + 'px,' + top + 'px,0) rotate(' + tilt + 'deg)';
    if (pv.on || Math.abs(pv.tx - pv.x) > 0.3) pv.raf = requestAnimationFrame(tickPreview);
    else pv.raf = 0;
  }
  function showPreview(row, x, y) {
    var p = bySlug[row.dataset.slug];
    if (!p) return;
    var srcs = uniq([p.img, sizeUp(p.img, 808)]);
    var i = 0;
    previewImg.onerror = function () { if (i < srcs.length) previewImg.src = srcs[i++]; };
    previewImg.src = srcs[i++];
    previewImg.style.objectPosition = p.imgPosition || '';
    if (!pv.on) { pv.x = x; pv.y = y; }
    pv.on = true; pv.row = row;
    preview.classList.add('is-on');
    if (!pv.raf) pv.raf = requestAnimationFrame(tickPreview);
  }
  function hidePreview() {
    pv.on = false; pv.row = null;
    preview.classList.remove('is-on');
  }
  function initPreview() {
    listEl.addEventListener('pointermove', function (e) {
      pv.tx = e.clientX; pv.ty = e.clientY;
      if (e.pointerType !== 'mouse' || !canHover.matches || listEl.dataset.view !== 'list') return;
      var row = e.target.closest('.row');
      if (!row) { if (pv.on) hidePreview(); return; }
      if (row !== pv.row) showPreview(row, e.clientX, e.clientY);
      else if (!pv.raf) pv.raf = requestAnimationFrame(tickPreview);
    });
    listEl.addEventListener('pointerleave', hidePreview);
    window.addEventListener('scroll', function () { if (pv.on) hidePreview(); }, { passive: true });
    // warm the cache so the first hover is instant
    var warm = function () { PROJECTS.forEach(function (p) { var im = new Image(); im.src = p.img; }); };
    if (canHover.matches) {
      if (window.requestIdleCallback) window.requestIdleCallback(warm, { timeout: 2500 });
      else setTimeout(warm, 1500);
    }
  }

  /* =====================================================================
     PROJECT PAGE
     ===================================================================== */
  var currentSlug = null;
  var savedScroll = 0;

  function blockHTML(b) {
    switch (b && b.type) {
      case 'text':
        return '<section class="blk-text reveal">' + (b.heading ? '<h3>' + esc(b.heading) + '</h3>' : '<span></span>') +
          '<div class="body">' + paragraphs(b.body) + '</div></section>';
      case 'image':
        // Optional b.width (e.g. "70%"): constrains and centers the image instead of letting
        // it run the full content width — for an image that looks lost or oversized at full
        // bleed (e.g. a mockup shot on its own background, rather than a full-bleed photo).
        var imgFigStyle = b.width ? ' style="max-width:' + esc(b.width) + ';margin-inline:auto"' : '';
        return '<figure class="blk-image reveal"' + imgFigStyle + '><img src="' + esc(b.src) + '" alt="' + esc(b.alt || '') + '" loading="lazy">' +
          (b.caption ? '<figcaption class="caption">' + esc(b.caption) + '</figcaption>' : '') + '</figure>';
      case 'gallery':
        // Optional b.cols (a number): forces a fixed column count instead of the default
        // auto-fit grid, for a set of images (e.g. same-shaped screenshots) that should
        // line up in even rows rather than wrapping wherever they happen to fit.
        var galleryStyle = b.cols ? ' style="grid-template-columns:repeat(' + parseInt(b.cols, 10) + ',1fr)"' : '';
        return '<div class="blk-gallery reveal"' + galleryStyle + '>' + (b.images || []).map(function (im) {
          // Optional im.crop ("top"/"center"/"bottom"): crops just the grid PREVIEW to a
          // landscape frame anchored to that edge, for a portrait photo that would otherwise
          // make its whole grid row much taller than its neighbors. The lightbox still opens
          // the full, uncropped image (it's a separate <img>, not this thumbnail).
          var style = im.crop ? ' style="aspect-ratio:3/2;object-fit:cover;object-position:' + esc(im.crop) + '"' : '';
          return '<button type="button" class="lb-trigger"><img src="' + esc(im.src) + '" alt="' + esc(im.alt || '') + '" loading="lazy"' + style + '></button>';
        }).join('') + '</div>';
      case 'stats':
        return '<div class="blk-stats reveal">' + (b.items || []).map(function (s) {
          return '<div><b>' + esc(s.value) + '</b><span>' + esc(s.label) + '</span></div>';
        }).join('') + '</div>';
      case 'quote':
        return '<blockquote class="blk-quote reveal"><p>“' + esc(b.text) + '”</p>' + (b.by ? '<cite>' + esc(b.by) + '</cite>' : '') + '</blockquote>';
      case 'video':
        return videoBlockHTML(b);
      default:
        return '';
    }
  }

  /* Accepts either a local/hosted video file (b.src, e.g. an .mp4 in /images)
     or an embed URL from YouTube/Vimeo (b.embed, use the *embed* link, not the watch link). */
  function videoBlockHTML(b) {
    var fig = '<figure class="blk-video reveal">';
    if (b.embed) {
      fig += '<div class="video-frame"><iframe src="' + esc(b.embed) + '" title="' + esc(b.alt || 'Project video') + '" ' +
        'loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe></div>';
    } else if (b.src) {
      var mime = { mp4: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', m4v: 'video/mp4' }[String(b.src).split('.').pop().toLowerCase()] || '';
      var auto = !!b.autoplay;
      var attrs = ['playsinline', 'preload="metadata"'];
      if (b.controls !== false) attrs.push('controls');
      if (auto) attrs.push('autoplay');
      if (b.loop) attrs.push('loop');
      if (auto || b.muted) attrs.push('muted');
      if (b.poster) attrs.push('poster="' + esc(b.poster) + '"');
      // Reserve the right aspect ratio up front (avoids layout jump) and keeps
      // portrait phone-screen recordings from stretching edge-to-edge on desktop.
      if (b.width && b.height) attrs.push('style="aspect-ratio:' + Number(b.width) + '/' + Number(b.height) + '"');
      fig += '<video ' + attrs.join(' ') + '>' +
        '<source src="' + esc(b.src) + '"' + (mime ? ' type="' + mime + '"' : '') + '>' +
        'Your browser doesn’t support embedded video. <a href="' + esc(b.src) + '">Download the video</a>.' +
        '</video>';
    }
    fig += (b.caption ? '<figcaption class="caption">' + esc(b.caption) + '</figcaption>' : '') + '</figure>';
    return fig;
  }

  function projectHTML(p) {
    var c = catOf(p);
    var n = PROJECTS.length;
    var prev = PROJECTS[(p.index - 1 + n) % n];
    var next = PROJECTS[(p.index + 1) % n];
    var meta = [['Category', esc(c.label)]];
    if (p.year) meta.push(['Year', esc(p.year)]);
    if (p.client) meta.push(['Client', esc(p.client)]);
    if (p.role) meta.push(['Role', esc(p.role)]);
    if (p.tools && p.tools.length) meta.push(['Tools', esc(p.tools.join(', '))]);
    if (p.views != null) {
      var rec = Number(p.views).toLocaleString('en-US') + ' views';
      if (p.appr != null) rec += ' · ' + Number(p.appr).toLocaleString('en-US') + ' appreciations';
      meta.push(['On Behance', esc(rec)]);
    }
    if (p.link && p.blocks && p.blocks.length) {
      meta.push(['Link', '<a href="' + esc(p.link) + '" target="_blank" rel="noopener">' + esc(p.linkLabel || 'View project') + ' ↗</a>']);
    }

    var body = '';
    if (p.summary) body += '<p class="pj-summary reveal">' + esc(p.summary) + '</p>';
    if (p.blocks && p.blocks.length) {
      body += '<div class="pj-blocks">' + p.blocks.map(blockHTML).join('') + '</div>';
    } else {
      var first = (SITE.links && SITE.links[0]) || null;
      var href = p.link || (first && first.url);
      var label = p.link ? (p.linkLabel || 'View project') : (first ? 'Browse on ' + first.label : '');
      body += '<div class="pj-soon reveal"><p>Case study in progress.<span>The full write-up for this project is on its way. Meanwhile you can see more of the work in its original context.</span></p>' +
        (href ? '<a class="btn" href="' + esc(href) + '" target="_blank" rel="noopener">' + esc(label) + ' ↗</a>' : '') + '</div>';
    }

    return '' +
      '<div class="pj-top">' +
        '<a class="pj-back" href="#work" data-back><span aria-hidden="true">←</span> All work</a>' +
        '<div class="pj-pager">' +
          '<span class="pj-count" aria-label="Project ' + (p.index + 1) + ' of ' + n + '">' + pad2(p.index + 1) + ' / ' + pad2(n) + '</span>' +
          '<a class="pj-arrow" href="#/work/' + esc(prev.slug) + '" aria-label="Previous project: ' + esc(prev.title) + '">←</a>' +
          '<a class="pj-arrow" href="#/work/' + esc(next.slug) + '" aria-label="Next project: ' + esc(next.title) + '">→</a>' +
        '</div>' +
      '</div>' +
      '<p class="pj-cat" style="--dot:' + esc(c.color) + '"><i class="row-dot"></i>' + esc(c.label) + '</p>' +
      '<h1 class="pj-title' + (p.title.length > 22 ? ' is-long' : '') + '" tabindex="-1">' + esc(p.title) + '</h1>' +
      '<dl class="pj-meta">' + meta.map(function (m) { return '<div><dt>' + m[0] + '</dt><dd>' + m[1] + '</dd></div>'; }).join('') + '</dl>' +
      '<div class="pj-hero" data-title="' + esc(p.title) + '">' + imgTag(heroSrcs(p), p.alt || p.title) + '</div>' +
      body +
      '<a class="pj-next reveal" href="#/work/' + esc(next.slug) + '">' +
        '<div><span class="label">Next project — ' + pad2(next.index + 1) + ' / ' + pad2(n) + '</span><div class="pj-next-title">' + esc(next.title) + '</div></div>' +
        '<span class="row-thumb" data-title="' + esc(next.title) + '">' + imgTag(tileSrcs(next), '', 'loading="lazy"' + posStyle(next)) + '</span>' +
      '</a>';
  }

  function showProject(p, first) {
    var wasHome = !homeEl.hidden;
    if (wasHome) savedScroll = window.scrollY;
    var row = rowBySlug[p.slug];
    var th = row && row.querySelector('.row-thumb');
    var morph = !first && wasHome && th && th.offsetParent && inViewport(th);

    function update() {
      projectEl.innerHTML = projectHTML(p);
      projectEl.hidden = false;
      homeEl.hidden = true;
      hydrate(projectEl);
      observeReveals(projectEl);
      document.title = p.title + ' — ' + (SITE.name || '');
      scrollNow(0);
      if (morph) vtName($('.pj-hero', projectEl), 'pj-img');
      currentSlug = p.slug;
      if (!first) {
        var h = $('.pj-title', projectEl);
        if (h) h.focus({ preventScroll: true });
      }
      showHeader();
    }
    if (first) { update(); return; }
    if (morph) vtName(th, 'pj-img');
    transition(update);
  }

  function placeAtHash(hash, restore) {
    var id = String(hash || '').replace(/^#\/?/, '');
    if (restore && (id === '' || id === 'work') && savedScroll > 0) { scrollNow(savedScroll); return; }
    var el = id && id !== 'top' ? document.getElementById(id) : null;
    if (el) scrollNow(el.getBoundingClientRect().top + window.scrollY);
    else scrollNow(0);
  }

  function showHome(hash) {
    var slug = currentSlug;
    var hero = $('.pj-hero', projectEl);
    function update() {
      projectEl.hidden = true;
      projectEl.innerHTML = '';
      homeEl.hidden = false;
      document.title = defaultTitle;
      currentSlug = null;
      placeAtHash(hash, true);
      var row = slug && rowBySlug[slug];
      var th = row && row.querySelector('.row-thumb');
      if (th && th.offsetParent && inViewport(th)) vtName(th, 'pj-img');
      showHeader();
    }
    if (hero) vtName(hero, 'pj-img');
    transition(update);
  }

  /* =====================================================================
     ROUTER   #/work/<slug>  →  project page.  Anything else → home.
     ===================================================================== */
  function route(first) {
    if (lbOpen) closeLightbox();
    var hash = location.hash;
    var m = hash.match(/^#\/work\/([^/?#]+)/);
    if (m) {
      var p = bySlug[decodeURIComponent(m[1])];
      if (p) {
        if (currentSlug !== p.slug || projectEl.hidden) showProject(p, first);
        return;
      }
      history.replaceState(null, '', '#work');
      hash = '#work';
    }
    if (hash === '#contact') return;            // footer is visible on every view
    if (!projectEl.hidden) showHome(hash);
    else if (first && hash) placeAtHash(hash, false);
  }

  /* =====================================================================
     SMALL BEHAVIOURS
     ===================================================================== */
  var header = $('#siteHeader');
  function showHeader() { header.classList.remove('is-hidden'); lastY = window.scrollY; }
  var lastY = 0, ticking = false;
  function initHeader() {
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > lastY + 8 && y > 240) header.classList.add('is-hidden');
        else if (y < lastY - 8 || y < 120) header.classList.remove('is-hidden');
        lastY = y; ticking = false;
      });
    }, { passive: true });
    header.addEventListener('focusin', showHeader);
  }

  function initTheme() {
    var btn = $('#themeToggle');
    var sync = function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    };
    sync();
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      safeStore('theme', next);
      sync();
    });
  }

  function initClock() {
    var el = $('#clock');
    if (!SITE.timezone) { el.hidden = true; return; }
    var fmt;
    try { fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: SITE.timezone }); }
    catch (e) { el.hidden = true; return; }
    var label = (SITE.city || '').split(',')[0];
    var tick = function () { el.textContent = label + ' ' + fmt.format(new Date()); };
    tick();
    setInterval(tick, 15000);
  }

  var toastTimer;
  function toast(msg) {
    var t = $('#toast');
    t.textContent = msg;
    t.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('is-on'); }, 2200);
  }
  function initCopy() {
    $('#copyEmail').addEventListener('click', function () {
      var email = SITE.email || '';
      var done = function () { toast('Email copied to clipboard'); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(done, function () { fallbackCopy(email); done(); });
      } else { fallbackCopy(email); done(); }
    });
  }
  function fallbackCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:-100px;opacity:0';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
  }

  var io;
  function observeReveals(root) {
    var els = $$('.reveal:not(.is-in)', root);
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('is-in'); }); return; }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          el.classList.add('is-in');
          io.unobserve(el);
          setTimeout(function () { el.style.removeProperty('--d'); }, 1500);   // stagger only applies to the entrance
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    }
    els.forEach(function (e) { io.observe(e); });
  }

  function initKeys() {
    document.addEventListener('keydown', function (e) {
      if (lbOpen || projectEl.hidden || e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      var p = bySlug[currentSlug];
      if (!p) return;
      var n = PROJECTS.length;
      if (e.key === 'ArrowRight') location.hash = '#/work/' + PROJECTS[(p.index + 1) % n].slug;
      else if (e.key === 'ArrowLeft') location.hash = '#/work/' + PROJECTS[(p.index - 1 + n) % n].slug;
      else if (e.key === 'Escape') location.hash = '#work';
    });
  }

  /* =====================================================================
     LIGHTBOX  (click-to-enlarge for gallery blocks)
     ===================================================================== */
  var lb = { images: [], index: 0, trigger: null };
  var lbOpen = false;
  var lbHideTimer;
  var lbZoom = { active: false, scale: 2.5, tx: 0, ty: 0, w: 0, h: 0 };

  function resetZoomState() {
    lbZoom.active = false; lbZoom.tx = 0; lbZoom.ty = 0;
    var img = $('#lbImg');
    img.classList.remove('is-zoomed', 'is-panning');
    img.style.transform = '';
    img.style.transformOrigin = '';
  }
  function clampPan(tx, ty) {
    var minTx = lbZoom.w * (1 - lbZoom.scale), minTy = lbZoom.h * (1 - lbZoom.scale);
    return [Math.min(0, Math.max(minTx, tx)), Math.min(0, Math.max(minTy, ty))];
  }
  function toggleZoomAt(clientX, clientY) {
    var img = $('#lbImg');
    if (lbZoom.active) { resetZoomState(); return; }
    var rect = img.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var s = lbZoom.scale;
    lbZoom.w = rect.width; lbZoom.h = rect.height;
    lbZoom.tx = (clientX - rect.left) * (1 - s);
    lbZoom.ty = (clientY - rect.top) * (1 - s);
    lbZoom.active = true;
    img.style.transformOrigin = '0 0';
    img.style.transform = 'translate(' + lbZoom.tx + 'px,' + lbZoom.ty + 'px) scale(' + s + ')';
    img.classList.add('is-zoomed');
  }

  function renderLightboxImage() {
    resetZoomState();
    var im = lb.images[lb.index];
    var img = $('#lbImg');
    img.src = im.src;
    img.alt = im.alt || '';
    $('#lbCount').textContent = (lb.index + 1) + ' / ' + lb.images.length;
    var multi = lb.images.length > 1;
    $('#lbPrev').hidden = !multi;
    $('#lbNext').hidden = !multi;
  }
  function stepLightbox(dir) {
    if (lb.images.length < 2) return;
    lb.index = (lb.index + dir + lb.images.length) % lb.images.length;
    renderLightboxImage();
  }
  function openLightbox(images, index, triggerEl) {
    if (!images || !images.length) return;
    clearTimeout(lbHideTimer);
    lb.images = images; lb.index = index || 0; lb.trigger = triggerEl || null;
    lbOpen = true;
    renderLightboxImage();
    var el = $('#lightbox');
    el.classList.add('is-open');
    document.documentElement.classList.add('lb-open');
    requestAnimationFrame(function () { el.classList.add('is-visible'); });
    $('#lbClose').focus();
  }
  function closeLightbox() {
    if (!lbOpen) return;
    lbOpen = false;
    resetZoomState();
    var el = $('#lightbox');
    el.classList.remove('is-visible');
    document.documentElement.classList.remove('lb-open');
    var delay = reduce.matches ? 0 : 250;
    lbHideTimer = setTimeout(function () { el.classList.remove('is-open'); }, delay);
    if (lb.trigger) lb.trigger.focus();
  }
  function initLightbox() {
    var el = $('#lightbox');
    var img = $('#lbImg');
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest('.lb-trigger');
      if (trigger) {
        var group = trigger.closest('.blk-gallery');
        if (!group) return;
        var triggers = $$('.lb-trigger', group);
        var images = triggers.map(function (t) {
          var img = t.querySelector('img');
          return { src: img.src, alt: img.alt };
        });
        openLightbox(images, triggers.indexOf(trigger), trigger);
        return;
      }
      if (!lbOpen) return;
      if (e.target.closest('#lbClose') || e.target === el) closeLightbox();
      else if (e.target.closest('#lbPrev')) stepLightbox(-1);
      else if (e.target.closest('#lbNext')) stepLightbox(1);
    });
    document.addEventListener('keydown', function (e) {
      if (!lbOpen) return;
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight' && !lbZoom.active) stepLightbox(1);
      else if (e.key === 'ArrowLeft' && !lbZoom.active) stepLightbox(-1);
    });

    /* click / tap on the image to zoom in at that point; drag to pan while zoomed */
    var panPointerId = null, panMoved = false, panStartX = 0, panStartY = 0, panStartTx = 0, panStartTy = 0;
    img.addEventListener('pointerdown', function (e) {
      if (!lbZoom.active) return;
      panPointerId = e.pointerId; panMoved = false;
      panStartX = e.clientX; panStartY = e.clientY;
      panStartTx = lbZoom.tx; panStartTy = lbZoom.ty;
      img.classList.add('is-panning');
      img.setPointerCapture(e.pointerId);
    });
    img.addEventListener('pointermove', function (e) {
      if (panPointerId !== e.pointerId) return;
      var dx = e.clientX - panStartX, dy = e.clientY - panStartY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) panMoved = true;
      var clamped = clampPan(panStartTx + dx, panStartTy + dy);
      lbZoom.tx = clamped[0]; lbZoom.ty = clamped[1];
      img.style.transform = 'translate(' + lbZoom.tx + 'px,' + lbZoom.ty + 'px) scale(' + lbZoom.scale + ')';
    });
    function endPan(e) {
      if (panPointerId !== e.pointerId) return;
      panPointerId = null;
      img.classList.remove('is-panning');
    }
    img.addEventListener('pointerup', endPan);
    img.addEventListener('pointercancel', endPan);
    img.addEventListener('click', function (e) {
      if (panMoved) { panMoved = false; return; }
      toggleZoomAt(e.clientX, e.clientY);
      e.stopPropagation();
    });

    var touchX = null;
    el.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    el.addEventListener('touchend', function (e) {
      if (touchX == null || lbZoom.active) { touchX = null; return; }
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) stepLightbox(dx > 0 ? -1 : 1);
      touchX = null;
    }, { passive: true });
  }

  /* =====================================================================
     BOOT
     ===================================================================== */
  function boot() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    renderStatic();
    renderWork();
    initPreview();
    initHeader();
    initTheme();
    initClock();
    initCopy();
    initKeys();
    initLightbox();
    observeReveals(document);
    route(true);
    window.addEventListener('hashchange', function () { route(false); });

    var ready = function () { requestAnimationFrame(function () { document.documentElement.classList.add('is-loaded'); }); };
    var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fonts, new Promise(function (r) { setTimeout(r, 900); })]).then(ready);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
