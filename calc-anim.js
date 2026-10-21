// Calcalist phone animation (see calc-anim.css). Every .ca-phone on the page plays once in view and again on hover.
document.querySelectorAll('.ca-phone').forEach(function (ph) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var running = false;
  function play() {
    if (running) return;
    running = true;
    var t = 0, at = function (ms, fn) { t += ms; setTimeout(fn, t); };
    ph.setAttribute('data-s', '1');
    at(1600, function () { ph.setAttribute('data-s', '2'); });
    at(1500, function () { ph.classList.add('tapping'); });
    at(250, function () { ph.setAttribute('data-s', '3'); });
    at(600, function () { ph.classList.remove('tapping'); running = false; });
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { io.disconnect(); play(); } }, { threshold: 0.5 });
    io.observe(ph);
  } else play();
  (ph.closest('.card') || ph).addEventListener('mouseenter', play);
});
