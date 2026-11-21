// Silver Arrows — menu, colour themes, gallery, lightbox, scroll reveal, contact form.
(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  menuBtn.addEventListener('click', function () {
    setTheme.close();
    setMenu(!nav.classList.contains('open'));
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') setMenu(false);
  });

  /* ---------- Colour themes ---------- */
  var themeBtn = document.querySelector('.theme-btn');
  var pop = document.getElementById('theme-pop');
  var swatches = pop.querySelectorAll('.swatch');
  var metaTheme = document.querySelector('meta[name="theme-color"]');

  function setTheme(name) {
    root.dataset.theme = name;
    store('sa-theme', name);
    swatches.forEach(function (s) { s.setAttribute('aria-checked', s.dataset.set === name); });
    // Match the browser bar to the nav colour.
    var ink = getComputedStyle(document.querySelector('.nav-bar')).getPropertyValue('--ink').trim();
    if (ink) metaTheme.setAttribute('content', ink);
  }
  setTheme.open = function () {
    pop.dataset.open = 'true';
    themeBtn.setAttribute('aria-expanded', 'true');
    var current = pop.querySelector('[aria-checked="true"]') || swatches[0];
    current.focus({ preventScroll: true });
  };
  setTheme.close = function (returnFocus) {
    if (pop.dataset.open !== 'true') return;
    pop.dataset.open = 'false';
    themeBtn.setAttribute('aria-expanded', 'false');
    if (returnFocus) themeBtn.focus();
  };

  setTheme(root.dataset.theme || 'copper');

  themeBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    setMenu(false);
    pop.dataset.open === 'true' ? setTheme.close() : setTheme.open();
  });
  swatches.forEach(function (s) {
    s.addEventListener('click', function () { setTheme(s.dataset.set); });
  });
  // Arrow keys move between swatches.
  pop.addEventListener('keydown', function (e) {
    var list = Array.prototype.slice.call(swatches);
    var i = list.indexOf(document.activeElement);
    var step = { ArrowRight: 1, ArrowDown: 2, ArrowLeft: -1, ArrowUp: -2 }[e.key];
    if (step && i > -1) {
      e.preventDefault();
      list[Math.max(0, Math.min(list.length - 1, i + step))].focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (!pop.contains(e.target)) setTheme.close();
  });

  /* ---------- Gallery carousel ---------- */
  var gallery = document.querySelector('.gallery');
  var prev = document.querySelector('.chip-btn[data-dir="-1"]');
  var next = document.querySelector('.chip-btn[data-dir="1"]');
  function updateGallery() {
    var max = gallery.scrollWidth - gallery.clientWidth - 2;
    var x = gallery.scrollLeft;
    gallery.classList.toggle('mid', x > 2 && x < max);
    gallery.classList.toggle('end', x >= max);
    prev.disabled = x <= 2;
    next.disabled = x >= max;
  }
  [prev, next].forEach(function (b) {
    b.addEventListener('click', function () {
      var item = gallery.querySelector('.g-item');
      var stepPx = item.getBoundingClientRect().width + 14;
      gallery.scrollBy({ left: stepPx * Number(b.dataset.dir), behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  });
  gallery.addEventListener('scroll', updateGallery, { passive: true });
  window.addEventListener('resize', updateGallery);
  updateGallery();

  /* ---------- Lightbox: grows from the photo you tapped ---------- */
  var box = document.querySelector('.lightbox');
  var boxFig = box.querySelector('figure');
  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('.lightbox-caption');
  var closeBtn = box.querySelector('.lightbox-close');
  var lastFocus = null;

  function openBox(btn) {
    var img = btn.querySelector('img');
    var r = btn.getBoundingClientRect();
    // Origin = centre of the tapped photo, relative to the viewport centre.
    var ox = r.left + r.width / 2 - window.innerWidth / 2;
    var oy = r.top + r.height / 2 - window.innerHeight / 2;
    boxFig.style.transformOrigin = 'calc(50% + ' + ox + 'px) calc(50% + ' + oy + 'px)';
    boxImg.src = img.src;
    boxImg.alt = img.alt;
    boxCap.textContent = btn.dataset.caption || '';
    lastFocus = btn;
    box.dataset.open = 'true';
    closeBtn.focus();
  }
  function closeBox() {
    if (box.dataset.open !== 'true') return;
    box.dataset.open = 'false';
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  document.querySelectorAll('.g-item').forEach(function (btn) {
    btn.addEventListener('click', function () { openBox(btn); });
  });
  box.addEventListener('click', function (e) { if (e.target !== boxImg) closeBox(); });
  box.addEventListener('keydown', function (e) { if (e.key === 'Tab') { e.preventDefault(); closeBtn.focus(); } });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeBox();
    setTheme.close(true);
    setMenu(false);
  });

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Contact form (Formspree, no page reload) ---------- */
  var form = document.querySelector('.form');
  var note = form.querySelector('.form-note');
  var sendBtn = form.querySelector('button[type="submit"]');
  var label = sendBtn.querySelector('.btn-label');
  var done = form.querySelector('.form-done');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var bad = Array.prototype.filter.call(form.elements, function (el) {
      return el.willValidate && !el.checkValidity();
    });
    form.querySelectorAll('.bad').forEach(function (el) { el.classList.remove('bad'); });
    if (bad.length) {
      bad.forEach(function (el) { void el.offsetWidth; el.classList.add('bad'); });
      bad[0].focus();
      note.textContent = 'Please fill in your name, a valid email and a message.';
      return;
    }
    if (/\[|%5B/.test(form.getAttribute('action'))) {
      note.textContent = 'Form not set up yet. Please email us instead.';
      return;
    }
    // Respond at once (under 100 ms), then wait for the network.
    sendBtn.classList.add('busy');
    label.textContent = 'Sending';
    note.textContent = '';
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      form.reset();
      done.hidden = false;
    }).catch(function () {
      note.textContent = 'Could not send. Please email us instead.';
    }).finally(function () {
      sendBtn.classList.remove('busy');
      label.textContent = 'Send message';
    });
  });
  form.addEventListener('input', function (e) { e.target.classList.remove('bad'); });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
