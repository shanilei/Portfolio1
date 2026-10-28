// Back-to-top button: appears after scrolling down a screen, scrolls smoothly to the top.
(function () {
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14.5V3.5M4 8.5l5-5 5 5"/></svg>';
  document.body.appendChild(btn);

  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });

  var ticking = false;
  function update() {
    ticking = false;
    btn.classList.toggle('show', window.scrollY > window.innerHeight * 0.8);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

// Contact cards: "Contact me", the Contact links and the email links scatter a few cards across the screen.
// They fly out from where you clicked and land tilted; hover straightens a card, and on desktop they can be dragged.
(function () {
  var EMAIL = 'shanilei.st2@gmail.com';
  var LINKEDIN = '';   // profile link; until it's set the card says it's on the way
  var CV = '';         // CV file; until it's set the card says it's on the way
  if (!document.querySelector('link[href*="Instrument+Serif"]')) {
    var f = document.createElement('link');
    f.rel = 'stylesheet';
    f.href = 'https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap';
    document.head.appendChild(f);
  }
  var icon = {
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5.5" width="18" height="13" rx="3"/><path d="M4 7.5l8 6 8-6"/></svg>',
    cv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.5 3h7.5l4.5 4.5v12.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M14 3v4.5h4.5M9 13h6M9 16.5h4"/></svg>',
    li: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3v-11zm6.5 0h3.8v1.5h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.55 4.78 5.87v5.58h-4v-4.95c0-1.18-.02-2.7-1.7-2.7-1.7 0-1.95 1.3-1.95 2.62v5.03h-4v-11z"/></svg>',
    copy: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="9" height="9" rx="2"/><path d="M12 6V4.5A1.5 1.5 0 0 0 10.5 3h-6A1.5 1.5 0 0 0 3 4.5v6A1.5 1.5 0 0 0 4.5 12H6"/></svg>',
    arrow: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M12.75 12.75V5.25H5.25M12.75 5.25l-7.5 7.5"/></svg>',
    close: '<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4.5 4.5l9 9M13.5 4.5l-9 9"/></svg>'
  };
  function soon(t) { return '<span class="ct-soon">' + t + '</span>'; }
  var cards = [
    { k: 'mail', html:
      '<span class="ct-ic">' + icon.mail + '</span>' +
      '<b class="ct-title">Email me</b>' +
      '<span class="ct-text">' + EMAIL + '</span>' +
      '<span class="ct-actions"><a class="ct-btn dark" href="mailto:' + EMAIL + '">Write to me' + icon.arrow + '</a>' +
      '<button type="button" class="ct-btn" data-copy="' + EMAIL + '">' + icon.copy + '<span>Copy</span></button></span>' },
    { k: 'cv', html:
      '<span class="ct-ic">' + icon.cv + '</span>' +
      '<b class="ct-title">My CV</b>' +
      '<span class="ct-text">Experience, skills and education, on one page.</span>' +
      (CV ? '<span class="ct-actions"><a class="ct-btn dark" href="' + CV + '" target="_blank" rel="noopener">Open CV' + icon.arrow + '</a></span>' : soon('Coming soon')) },
    { k: 'li', html:
      '<span class="ct-ic">' + icon.li + '</span>' +
      '<b class="ct-title">LinkedIn</b>' +
      '<span class="ct-text">Let’s connect.</span>' +
      (LINKEDIN ? '<span class="ct-actions"><a class="ct-btn dark" href="' + LINKEDIN + '" target="_blank" rel="noopener">View profile' + icon.arrow + '</a></span>' : soon('Link coming soon')) },
    { k: 'talk', html:
      '<span class="ct-emoji" aria-hidden="true">✈️</span>' +
      '<b class="ct-title">Beyond design</b>' +
      '<span class="ct-text">Happy to talk about other things too.</span>' +
      '<span class="ct-chips"><span>🎧 Music</span><span>🛠️ DIY and building</span><span>✈️ Flights</span></span>' },
    { k: 'me', html:
      '<span class="ct-role">Product designer</span>' +
      '<span class="ct-sig">Shanis</span>' +
      '<span class="ct-text">shanileibner.com</span>' }
  ];
  var box = document.createElement('div');
  box.className = 'ct';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Contact Shani');
  box.innerHTML = '<button type="button" class="ct-close" aria-label="Close">' + icon.close + '</button>' +
    '<p class="ct-hint">Drag the cards around</p>' +
    '<div class="ct-field">' + cards.map(function (c, i) {
      return '<div class="ct-card ct-' + c.k + '" style="--i:' + i + '">' + c.html + '</div>';
    }).join('') + '</div><span class="ct-toast" role="status" aria-live="polite"></span>';
  document.body.appendChild(box);

  var els = Array.prototype.slice.call(box.querySelectorAll('.ct-card'));
  var toast = box.querySelector('.ct-toast'), last = null, tt, z = 10;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canDrag = matchMedia('(hover: hover) and (min-width: 901px)').matches;
  function open(e) {
    if (e) e.preventDefault();
    last = document.activeElement;
    // the cards start where the click happened
    var r = e && e.currentTarget && e.currentTarget.getBoundingClientRect ? e.currentTarget.getBoundingClientRect() : null;
    var ox = r ? r.left + r.width / 2 : innerWidth / 2, oy = r ? r.top + r.height / 2 : innerHeight / 2;
    box.hidden = false;
    els.forEach(function (c) {
      c.style.removeProperty('--dx'); c.style.removeProperty('--dy'); c.style.zIndex = '';
      var cr = c.getBoundingClientRect();
      c.style.setProperty('--fx', (ox - (cr.left + cr.width / 2)) + 'px');
      c.style.setProperty('--fy', (oy - (cr.top + cr.height / 2)) + 'px');
    });
    box.classList.remove('show');
    void box.offsetWidth;
    box.classList.add('show');
    document.documentElement.classList.add('ct-lock');
    box.querySelector('.ct-close').focus();
  }
  function close() {
    box.classList.remove('show');
    document.documentElement.classList.remove('ct-lock');
    setTimeout(function () { box.hidden = true; }, 350);
    if (last) last.focus();
  }
  box.addEventListener('click', function (e) { if (e.target === box || e.target.classList.contains('ct-field')) close(); });
  box.querySelector('.ct-close').addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') {
      var f = box.querySelectorAll('a[href], button');
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });
  box.querySelectorAll('[data-copy]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-copy');
      function done() {
        toast.textContent = 'Email copied ✓';
        toast.classList.add('on'); b.classList.add('done');
        clearTimeout(tt);
        tt = setTimeout(function () { toast.classList.remove('on'); b.classList.remove('done'); }, 1600);
      }
      if (navigator.clipboard) navigator.clipboard.writeText(v).then(done, done); else done();
    });
  });
  // drag a card anywhere on the screen (desktop)
  if (canDrag && !reduced) {
    els.forEach(function (c) {
      var sx, sy, bx, by, moved;
      c.addEventListener('pointerdown', function (e) {
        if (e.target.closest('a, button')) return;
        sx = e.clientX; sy = e.clientY; moved = false;
        bx = parseFloat(c.style.getPropertyValue('--dx')) || 0;
        by = parseFloat(c.style.getPropertyValue('--dy')) || 0;
        c.style.zIndex = ++z; c.classList.add('drag');
        c.setPointerCapture(e.pointerId);
      });
      c.addEventListener('pointermove', function (e) {
        if (!c.classList.contains('drag')) return;
        moved = true;
        c.style.setProperty('--dx', (bx + e.clientX - sx) + 'px');
        c.style.setProperty('--dy', (by + e.clientY - sy) + 'px');
      });
      function end() { c.classList.remove('drag'); }
      c.addEventListener('pointerup', end);
      c.addEventListener('pointercancel', end);
    });
  }
  // every way in: mailto links, "#contact" links, and anything marked data-contact
  document.querySelectorAll('a[href^="mailto:"], a[href$="#contact"], [data-contact]').forEach(function (a) {
    if (box.contains(a)) return;
    a.addEventListener('click', open);
  });
  if (location.hash === '#contact') open();
})();
