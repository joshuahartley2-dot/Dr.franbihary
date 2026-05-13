document.addEventListener('DOMContentLoaded', () => {

  /* year */
  document.querySelectorAll('#yr,.yr').forEach(e => e.textContent = new Date().getFullYear());

  /* scrolled header */
  const nw = document.getElementById('nav-wrap');
  if (nw) window.addEventListener('scroll', () => nw.classList.toggle('scrolled', scrollY > 20), {passive:true});

  /* burger */
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const o = nav.classList.toggle('open');
      burger.classList.toggle('open', o);
      document.body.style.overflow = o ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow = '';
    }));
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow = '';
      }
    });
  }

  /* smooth scroll */
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href').split('#')[1];
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;
      e.preventDefault();
      const hh = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hh')) || 72;
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - hh - 8, behavior: 'smooth' });
    });
  });

  /* reveal on scroll */
  const revealEls = document.querySelectorAll('.scard,.tcard,.np-step,.gal-card,.gp-item,.about-pill,.trust-item');
  if ('IntersectionObserver' in window) {
    revealEls.forEach(el => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    revealEls.forEach(el => io.observe(el));
  }

  /* gallery filter */
  const pills  = document.querySelectorAll('.fpill');
  const gcards = document.querySelectorAll('.gal-card');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('fpill--active'));
      pill.classList.add('fpill--active');
      const f = pill.dataset.filter;
      gcards.forEach(c => { c.hidden = f !== 'all' && c.dataset.cat !== f; });
    });
  });

  /* form */
  const form = document.getElementById('apptForm');
  const ok   = document.getElementById('formOK');
  if (form && ok) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true; btn.textContent = 'Sending…';
      setTimeout(() => {
        form.reset(); ok.hidden = false;
        ok.scrollIntoView({ behavior:'smooth', block:'nearest' });
        btn.disabled = false; btn.textContent = 'Submit Appointment Request →';
      }, 900);
    });
  }

});
