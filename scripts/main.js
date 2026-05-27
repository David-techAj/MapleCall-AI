/* =============================================================
   MapleCall AI — Main JavaScript
   Handles: nav scroll, mobile menu, pricing toggle, form submit
   ============================================================= */

'use strict';

// ─── Navbar: add scrolled class ───────────────────────────────
(function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
})();


// ─── Mobile nav toggle ────────────────────────────────────────
(function initMobileMenu() {
  const toggle  = document.getElementById('navToggle');
  const mobile  = document.getElementById('navMobile');
  const links   = document.querySelectorAll('.nav__mobile-link, .nav__mobile .btn');

  if (!toggle || !mobile) return;

  function openMenu() {
    toggle.classList.add('active');
    mobile.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    mobile.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    mobile.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    mobile.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    const isOpen = mobile.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on any link click
  links.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();


// ─── Smooth scroll for anchor links ───────────────────────────
(function initSmoothScroll() {
  document.addEventListener('click', function (e) {
    const target = e.target.closest('a[href^="#"]');
    if (!target) return;

    const id = target.getAttribute('href').slice(1);
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    e.preventDefault();

    const navHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({ top, behavior: 'smooth' });
  });
})();


// ─── Active nav link on scroll ────────────────────────────────
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = '#ffffff';
            }
          });
        }
      });
    },
    { rootMargin: '-64px 0px -60% 0px', threshold: 0 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();


// ─── Pricing toggle (monthly / annual) ────────────────────────
(function initPricingToggle() {
  const btnMonthly = document.getElementById('toggleMonthly');
  const btnAnnual  = document.getElementById('toggleAnnual');
  const amounts    = document.querySelectorAll('.pricing__amount');

  if (!btnMonthly || !btnAnnual || !amounts.length) return;

  function setPeriod(period) {
    amounts.forEach(function (el) {
      el.textContent = el.dataset[period];
    });

    if (period === 'monthly') {
      btnMonthly.classList.add('toggle__btn--active');
      btnAnnual.classList.remove('toggle__btn--active');
    } else {
      btnAnnual.classList.add('toggle__btn--active');
      btnMonthly.classList.remove('toggle__btn--active');
    }
  }

  btnMonthly.addEventListener('click', function () { setPeriod('monthly'); });
  btnAnnual.addEventListener('click',  function () { setPeriod('annual');  });
})();


// ─── Demo form submission ──────────────────────────────────────
(function initDemoForm() {
  const form    = document.getElementById('demoForm');
  const success = document.getElementById('formSuccess');

  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic validation
    const email = form.querySelector('#email');
    const name  = form.querySelector('#firstName');

    if (!email.value.trim() || !name.value.trim()) {
      // Highlight required fields
      [email, name].forEach(function (input) {
        if (!input.value.trim()) {
          input.style.borderColor = '#ef4444';
          input.addEventListener('input', function clear() {
            input.style.borderColor = '';
            input.removeEventListener('input', clear);
          }, { once: true });
        }
      });
      return;
    }

    // Simulate async submit
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(function () {
      form.style.display = 'none';
      success.classList.add('visible');
    }, 900);
  });
})();


// ─── Scroll-reveal animation ──────────────────────────────────
(function initScrollReveal() {
  if (!window.IntersectionObserver) return;

  const style = document.createElement('style');
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Add reveal class to cards, steps, etc.
  const targets = document.querySelectorAll(
    '.card, .pricing__card, .testimonial__card, .step, .compliance__badge, .stats__item'
  );

  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();


// ─── Stagger children animation ───────────────────────────────
(function initStagger() {
  const grids = document.querySelectorAll(
    '.features__grid, .pricing__grid, .testimonials__grid, .stats__grid'
  );

  grids.forEach(function (grid) {
    const children = grid.querySelectorAll('.reveal');
    children.forEach(function (child, i) {
      child.style.transitionDelay = (i * 70) + 'ms';
    });
  });
})();


// ─── Mock live feed ticker (hero mockup) ──────────────────────
(function initFeedTicker() {
  const feed = document.querySelector('.mockup__feed');
  if (!feed) return;

  const newEntries = [
    {
      label: 'Call Connected',
      name: 'Alex T. — Calgary, AB',
      detail: 'Lead from website · English · just now',
      status: 'LIVE',
      statusClass: 'feed__status--live',
      iconFill: '#378ADD',
      isSuccess: true,
    },
    {
      label: 'Showing Booked',
      name: 'Wei L. — Burnaby, BC',
      detail: '普通話 (Mandarin) · Sat June 7, 10:00 AM',
      status: 'Booked',
      statusClass: 'feed__status--booked',
      iconFill: '#378ADD',
      isSuccess: false,
    },
    {
      label: 'Voicemail Left',
      name: 'Priya S. — Mississauga, ON',
      detail: 'English · Follow-up #1 · 1 min ago',
      status: 'VM Left',
      statusClass: 'feed__status--voicemail',
      iconFill: '#5577aa',
      isSuccess: false,
    },
  ];

  let idx = 0;

  function tick() {
    const entry  = newEntries[idx % newEntries.length];
    const items  = feed.querySelectorAll('.feed__item');
    const last   = items[items.length - 1];

    if (last) {
      const newItem = document.createElement('div');
      newItem.className = 'feed__item' + (entry.isSuccess ? ' feed__item--success' : '');
      newItem.style.opacity = '0';
      newItem.style.transform = 'translateY(-8px)';
      newItem.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      newItem.innerHTML = `
        <div class="feed__icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11 21 3 13 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" fill="${entry.iconFill}"/>
          </svg>
        </div>
        <div class="feed__content">
          <span class="feed__label">${entry.label}</span>
          <span class="feed__name">${entry.name}</span>
          <span class="feed__detail">${entry.detail}</span>
        </div>
        <span class="feed__status ${entry.statusClass}">${entry.status === 'LIVE' ? '● LIVE' : entry.status}</span>
      `;

      // Prepend new item
      feed.insertBefore(newItem, feed.firstChild);

      // Animate in
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          newItem.style.opacity = '1';
          newItem.style.transform = 'translateY(0)';
        });
      });

      // Remove last item if too many
      if (items.length >= 4) {
        last.style.opacity = '0';
        last.style.transition = 'opacity 0.3s ease';
        setTimeout(function () { last.remove(); }, 320);
      }
    }

    // Update stats
    const callsEl = document.querySelector('.mockup__stat-value:nth-child(1)');
    if (callsEl) {
      const n = parseInt(callsEl.textContent, 10);
      if (!isNaN(n)) callsEl.textContent = n + 1;
    }

    idx++;
  }

  // Run ticker every ~5s
  setInterval(tick, 5200);
})();
