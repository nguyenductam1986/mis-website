(function () {
  document.documentElement.classList.add('js');

  // Mobile menu
  var burger = document.querySelector('.burger'), nav = document.querySelector('.nav');
  if (burger && nav) burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // Reveal sections as they scroll into view
  function reveal(scope) {
    var els = (scope || document).querySelectorAll('.rv:not(.in)');
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e) { io.observe(e); });
  }

  // News list: category filter on the cards built into the page
  var list = document.getElementById('news-list');
  if (list) {
    var chips = document.querySelectorAll('.chip'), empty = document.createElement('p');
    empty.textContent = 'No posts in this category yet.'; empty.hidden = true; list.after(empty);
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var cat = c.getAttribute('data-cat'), shown = 0;
        chips.forEach(function (x) { x.classList.remove('on'); x.setAttribute('aria-pressed', 'false'); });
        c.classList.add('on'); c.setAttribute('aria-pressed', 'true');
        list.querySelectorAll('.card').forEach(function (k) {
          var on = cat === 'All' || k.getAttribute('data-cat') === cat;
          k.hidden = !on; if (on) { shown++; k.classList.add('in'); }
        });
        empty.hidden = shown > 0;
      });
    });
  }

  reveal();

  // Contact form: sends the message directly to info@mi-energies.com
  // through the MiS Google Apps Script web app (see FORM_ENDPOINT below).
  var FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbyyoLw0xOt1htYWCSdscMSe7NHjPzW1LJxF63zi7sAlgl6IZdzOSJJKrMFVWE13i6JlFQ/exec';
  var form = document.getElementById('contact-form');
  if (form) {
    var sent = document.getElementById('contact-sent');
    var msg = form.querySelector('.form-msg');
    var started = Date.now();
    var setMsg = function (t, err) { msg.textContent = t; msg.classList.toggle('err', !!err); };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements, bad = [];
      [f.name, f.email].forEach(function (el) { el.classList.remove('bad'); });
      if (!f.name.value.trim()) bad.push(f.name);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.value.trim())) bad.push(f.email);
      if (bad.length) { bad.forEach(function (el) { el.classList.add('bad'); }); bad[0].focus(); setMsg('Please enter your name and a valid work email.', true); return; }
      if (FORM_ENDPOINT.indexOf('https://') !== 0) { setMsg('The form is not connected yet. Please email info@mi-energies.com.', true); return; }
      var data = new URLSearchParams();
      ['name', 'company', 'email', 'topic', 'message', 'website'].forEach(function (k) { data.append(k, (f[k].value || '').trim()); });
      data.append('elapsed', String(Date.now() - started));
      data.append('page', location.href);
      form.classList.add('busy'); setMsg('Sending…');
      fetch(FORM_ENDPOINT, { method: 'POST', body: data })
        .then(function (r) { return r.json(); })
        .then(function (res) {
          if (!res || !res.ok) throw new Error(res && res.error || 'failed');
          document.getElementById('sent-email').textContent = f.email.value.trim();
          form.hidden = true; sent.hidden = false; sent.focus({ preventScroll: true });
          sent.scrollIntoView({ behavior: 'smooth', block: 'center' });
          form.reset(); setMsg('');
        })
        .catch(function () { setMsg('Sorry, the message could not be sent. Please try again or email info@mi-energies.com.', true); })
        .then(function () { form.classList.remove('busy'); });
    });
    document.getElementById('contact-again').addEventListener('click', function () {
      sent.hidden = true; form.hidden = false; started = Date.now(); form.elements.name.focus();
    });
  }
})();
