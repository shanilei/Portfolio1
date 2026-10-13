// Scroll reveal, shared by every page (styles in reveal.css).
// Pieces that enter the viewport together appear in document order, one after another.
(function () {
  window.__rv = true;
  var root = document.documentElement;
  if (!root.classList.contains('rv-on')) return;
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.remove('rv-on');
    return;
  }

  var SELECTOR = [
    '.cs-hero .wrap > *', '.cs-cover', '.dj-cover', '.dj-statement',
    '.cs-body section > *', '.cs-body > .next',
    '.statement > *', '.works-head', '.gallery > li', '.about .block', '.about .foot'
  ].join(',');
  var SKIP = '.loop, .tl-wrap, .drills, [role="tabpanel"]';
  var STEP = 110, MAX_DELAY = 900;

  var items = Array.prototype.filter.call(document.querySelectorAll(SELECTOR), function (el) {
    return !el.matches(SKIP);
  });

  var observer = new IntersectionObserver(function (entries) {
    var batch = entries.filter(function (e) { return e.isIntersecting; }).map(function (e) { return e.target; });
    batch.sort(function (a, b) { return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1; });
    batch.forEach(function (el, i) {
      el.style.setProperty('--rv-d', Math.min(i * STEP, MAX_DELAY) + 'ms');
      el.classList.add('rv-in');
      observer.unobserve(el);
      // clear the delay afterwards so hovers and later transitions aren't held back
      setTimeout(function () { el.style.removeProperty('--rv-d'); }, Math.min(i * STEP, MAX_DELAY) + 800);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  items.forEach(function (el) { observer.observe(el); });
})();
