(function () {
  // Services: interactive project lifecycle. Select a package to open its details.
  // Wide screens: card beside the map, joined to the selected package by a light beam.
  // Below 1360px wide or 800px high: the card opens as a pop-up (drawer from the right; bottom sheet on phones).
  var lc = document.getElementById('lc');
  if (lc) {
    var card = lc.querySelector('.lc-card'), beam = lc.querySelector('.lc-beam');
    var bars = [].slice.call(lc.querySelectorAll('.lc-bar')), pks = {}, cur = null, last = null;
    [].forEach.call(lc.querySelectorAll('.lc-pk'), function (p) { pks[p.getAttribute('data-pkg')] = p; });
    var sheet = window.matchMedia('(max-width:1359px),(max-height:799px)');
    var drawBeam = function () {
      var b = cur && lc.querySelector('.lc-bar[data-pkg="' + cur + '"]');
      if (!b || sheet.matches) { beam.classList.remove('on'); return; }
      var o = lc.getBoundingClientRect(), r = b.getBoundingClientRect(), c = card.getBoundingClientRect();
      var x1 = r.right - o.left, y1 = r.top - o.top, y2 = r.bottom - o.top, x2 = c.left - o.left + 2;
      var ct = c.top - o.top, cb = c.bottom - o.top, cl = function (v, a, z) { return Math.max(a, Math.min(z, v)); };
      var hb = lc.querySelector('.lc-ph').getBoundingClientRect().bottom - o.top + 10;
      var t = Math.max(hb, cl(y1 - 50, ct + 24, cb - 120)), btm = cl(y2 + 50, t + 80, cb - 24);
      if (x2 - x1 < 8) { beam.classList.remove('on'); return; }
      beam.style.clipPath = 'polygon(' + x1 + 'px ' + (y1 + 4) + 'px,' + x2 + 'px ' + t + 'px,' + x2 + 'px ' + btm + 'px,' + x1 + 'px ' + (y2 - 4) + 'px)';
      beam.classList.add('on');
    };
    // Side panel: if the card or the stage headers are out of view, bring the whole map and card into view.
    var fit = function () {
      var top = lc.getBoundingClientRect().top, c = card.getBoundingClientRect();
      if (c.bottom > window.innerHeight - 8 || top < 80) window.scrollBy({ top: top - 88, behavior: 'smooth' });
    };
    var show = function (k, opener) {
      cur = k;
      bars.forEach(function (b) {
        var on = b.getAttribute('data-pkg') === k;
        b.classList.toggle('on', on); b.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
      Object.keys(pks).forEach(function (x) { pks[x].classList.toggle('on', x === k); });
      var st = k ? (lc.querySelector('.lc-bar[data-pkg="' + k + '"]').getAttribute('data-stages') || '').split(' ') : [];
      [].forEach.call(lc.querySelectorAll('.lc-ph'), function (h) { h.classList.toggle('hl', st.indexOf(h.getAttribute('data-st')) > -1); });
      card.classList.toggle('empty', !k);
      lc.classList.toggle('open', !!k && sheet.matches);
      document.documentElement.style.overflow = (k && sheet.matches) ? 'hidden' : '';
      if (k && sheet.matches) { last = opener || null; card.scrollTop = 0; card.focus({ preventScroll: true }); }
      if (!k && last) { last.focus(); last = null; }
      requestAnimationFrame(drawBeam); setTimeout(drawBeam, 380);
      if (k && !sheet.matches && opener) setTimeout(fit, 60);
    };
    card.setAttribute('tabindex', '-1');
    bars.forEach(function (b) { b.addEventListener('click', function () { show(b.getAttribute('data-pkg'), b); }); });
    lc.querySelector('.lc-x').addEventListener('click', function () { show(null); });
    lc.querySelector('.lc-backdrop').addEventListener('click', function () { show(null); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && cur) show(null); });
    // Links elsewhere on the page, e.g. the "Which package fits" table: <a href="#advisory" data-go="av2">
    [].forEach.call(document.querySelectorAll('[data-go]'), function (a) {
      a.addEventListener('click', function (e) {
        var k = a.getAttribute('data-go'); if (!pks[k]) return;
        e.preventDefault(); show(k);
        if (!sheet.matches) lc.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
    var onMode = function () { show(sheet.matches ? null : (cur || 'av5')); };
    if (sheet.addEventListener) sheet.addEventListener('change', onMode); else sheet.addListener(onMode);
    window.addEventListener('resize', drawBeam);
    show(sheet.matches ? null : 'av5');
    var h = location.hash.replace('#', ''); if (pks[h]) show(h);
  }
})();
