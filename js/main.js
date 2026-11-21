// Silver Arrows — small helpers: mobile menu, gallery lightbox, contact form.
(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Gallery lightbox
  var box = document.querySelector('.lightbox');
  var boxImg = box.querySelector('img');
  var boxCap = box.querySelector('.lightbox-caption');
  var lastFocus = null;
  function closeBox() {
    box.hidden = true;
    if (lastFocus) lastFocus.focus();
  }
  document.querySelectorAll('.g-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var img = btn.querySelector('img');
      lastFocus = btn;
      boxImg.src = img.src;
      boxImg.alt = img.alt;
      boxCap.textContent = btn.dataset.caption || '';
      box.hidden = false;
      box.querySelector('.lightbox-close').focus();
    });
  });
  box.addEventListener('click', function (e) {
    if (e.target !== boxImg) closeBox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !box.hidden) closeBox();
  });

  // Contact form: send with Formspree without leaving the page
  var form = document.querySelector('.form');
  var note = form.querySelector('.form-note');
  form.addEventListener('submit', function (e) {
    if (form.action.indexOf('%5B') !== -1 || form.action.indexOf('[') !== -1) {
      e.preventDefault();
      note.textContent = 'Form not set up yet. Please email us instead.';
      return;
    }
    e.preventDefault();
    note.textContent = 'Sending…';
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (res.ok) {
        form.reset();
        note.textContent = 'Thanks! We will reply soon.';
      } else {
        note.textContent = 'Something went wrong. Please email us.';
      }
    }).catch(function () {
      note.textContent = 'Network error. Please email us.';
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
