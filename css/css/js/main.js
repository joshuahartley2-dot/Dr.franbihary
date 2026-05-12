/* ============================================================
   FRAN BIHARY DMD — MAIN JAVASCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Footer year ---- */
  document.querySelectorAll('#year, .year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      toggle.classList.toggle('active', open);
    });
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      });
    });
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
      }
    });
  }

  /* ---- Sticky header shadow on scroll ---- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.style.boxShadow = window.scrollY > 8
        ? '0 4px 20px rgba(28,43,53,0.12)'
        : '0 2px 8px rgba(28,43,53,0.08)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Appointment form ---- */
  const form    = document.getElementById('appointmentForm');
  const success = document.getElementById('formSuccess');
  if (form && success) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Sending…';
      setTimeout(() => {
        form.reset();
        success.hidden = false;
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        btn.disabled = false;
        btn.textContent = 'Submit Request';
      }, 1000);
    });
  }

  /* ---- Gallery filter ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-full-item');
  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        galleryItems.forEach(item => {
          if (filter === 'all' || item.dataset.category === filter) {
            item.hidden = false;
          } else {
            item.hidden = true;
          }
        });
      });
    });
  }

  /* ---- Fade-in on scroll ---- */
  const fadeEls = document.querySelectorAll(
    '.service-card, .testimonial, .gallery-item, .gallery-full-item, .np-card'
  );
  if ('IntersectionObserver' in window && fadeEls.length) {
    const style = document.createElement('style');
    style.textContent = `
      .fade-hidden { opacity: 0; transform: translateY(20px); }
      .fade-in { animation: fadeUp 0.5s ease forwards; }
      @keyframes fadeUp {
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.animationDelay = `${i * 0.06}s`;
          el.classList.remove('fade-hidden');
          el.classList.add('fade-in');
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(el => {
      el.classList.add('fade-hidden');
      observer.observe(el);
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href*="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href').split('#')[1];
      if (!hash) return;
      const target = document.getElementById(hash);
      if (target) {
        e.preventDefault();
        const headerOffset = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h')
        ) || 72;
        const y = target.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

});
