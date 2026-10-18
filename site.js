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
