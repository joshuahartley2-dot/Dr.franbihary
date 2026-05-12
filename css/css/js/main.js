/* ================================================================
   FRAN BIHARY DMD — main.js
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Year ── */
  document.querySelectorAll('#yr, .yr').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ── Sticky header shadow ── */
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ── Mobile nav ── */
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Smooth scroll with header offset ── */
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const raw  = link.getAttribute('href');
      const hash = raw.includes('#') ? raw.split('#')[1] : null;
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;
      e.preventDefault();
      const hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hh')) || 76;
      const y  = target.getBoundingClientRect().top + window.scrollY - hh - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });

  /* ── Fade-in on scroll ── */
  const fadeTargets = document.querySelectorAll(
    '.service-card, .testimonial-card, .np-card, .gfull-item, .gtease-item, .stat-item, .pillar'
  );
  if ('IntersectionObserver' in window && fadeTargets.length) {
    fadeTargets.forEach(el => el.classList.add('fade-up'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeTargets.forEach(el => io.observe(el));
  }

  /* ── Gallery filter ── */
  const pills   = document.querySelectorAll('.pill');
  const gItems  = document.querySelectorAll('.gfull-item');
  if (pills.length && gItems.length) {
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const f = pill.dataset.filter;
        gItems.forEach(item => {
          item.hidden = f !== 'all' && item.dataset.cat !== f;
        });
      });
    });
  }

  /* ── Appointment form ── */
  const form = document.getElementById('apptForm');
  const ok   = document.getElementById('formOK');
  if (form && ok) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      /* Replace setTimeout with real Formspree/Netlify fetch when ready */
      setTimeout(() => {
        form.reset();
        ok.hidden = false;
        ok.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        btn.disabled = false;
        btn.textContent = 'Submit Appointment Request';
      }, 900);
    });
  }

});
