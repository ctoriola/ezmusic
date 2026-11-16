(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Letter-roll hover on buttons (Gelaf-style). Text stays readable to
     screen readers through aria-label; the animated copy is hidden. */
  document.querySelectorAll('.btn').forEach((btn) => {
    const text = btn.textContent.trim();
    if (!text || btn.querySelector('.roll')) return;
    if (!btn.hasAttribute('aria-label')) btn.setAttribute('aria-label', text);
    const roll = document.createElement('span');
    roll.className = 'roll';
    roll.setAttribute('aria-hidden', 'true');
    [...text].forEach((ch, i) => {
      const col = document.createElement('span');
      col.style.transitionDelay = `${i * 14}ms`;
      const a = document.createElement('span');
      const b = document.createElement('span');
      a.textContent = b.textContent = ch === ' ' ? ' ' : ch;
      col.append(a, b);
      roll.append(col);
    });
    btn.textContent = '';
    btn.append(roll);
  });

  /* Header shadow on scroll */
  const header = document.querySelector('.site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  const menuBtn = document.querySelector('.menu-btn');
  const setMenu = (open) => {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
  document.querySelectorAll('.mobile-menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* Active nav link for on-page sections */
  const navLinks = [...document.querySelectorAll('.nav-pill a[href^="#"]')];
  const targetOf = (href) => (href === '#top' ? document.querySelector('.hero') : document.querySelector(href));
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => {
          if (targetOf(a.getAttribute('href')) === en.target) a.setAttribute('aria-current', 'page');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    navLinks.map((a) => targetOf(a.getAttribute('href'))).filter(Boolean).forEach((s) => spy.observe(s));
  }

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  }

  /* Stat counters */
  const counters = document.querySelectorAll('[data-count]');
  if (!reduce && 'IntersectionObserver' in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target; const end = +el.dataset.count; const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min(1, (t - t0) / 1400);
          el.textContent = `${Math.round(end * (1 - Math.pow(1 - p, 3)))}+`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  /* Opt-in background music (never autoplays) */
  const sound = document.querySelector('.sound-toggle');
  if (sound) {
    let audio;
    const label = sound.querySelector('.sound-label');
    sound.addEventListener('click', () => {
      if (!audio) { audio = new Audio(sound.dataset.src); audio.loop = true; audio.volume = 0.5; }
      const on = sound.getAttribute('aria-pressed') !== 'true';
      if (on) {
        audio.play().then(() => { sound.setAttribute('aria-pressed', 'true'); label.textContent = 'Music on'; })
          .catch(() => { label.textContent = 'Audio unavailable'; });
      } else {
        audio.pause(); sound.setAttribute('aria-pressed', 'false'); label.textContent = 'Play music';
      }
    });
  }

  /* Contact form: validates, then hands off to the visitor's email app.
     Swap the handler body for a fetch() to your backend (Supabase, n8n, Formspree...). */
  const form = document.getElementById('contact-form');
  if (form) {
    const note = form.querySelector('.form-note');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      const bad = [...form.elements].find((el) => el.required && !el.checkValidity());
      if (bad) { note.textContent = 'Please complete every field with a valid email address.'; bad.focus(); return; }
      const body = `${data.message}\n\n${data.name}\n${data.email}`;
      window.location.href = `mailto:hello@eezeeconceptz.org?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
      note.textContent = 'Opening your email app to send this message...';
    });
  }

  /* Newsletter: same hand-off until a mailing provider is connected */
  const sub = document.getElementById('sub-form');
  if (sub) {
    const note = document.querySelector('.sub-note');
    sub.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = sub.querySelector('input');
      if (!input.checkValidity()) { note.textContent = 'Please enter a valid email address.'; input.focus(); return; }
      window.location.href = `mailto:hello@eezeeconceptz.org?subject=${encodeURIComponent('Newsletter subscription')}&body=${encodeURIComponent(`Please add ${input.value} to the EeZee Conceptz newsletter.`)}`;
      note.textContent = 'Opening your email app to confirm your subscription...';
    });
  }

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
