/* =============================================================
   NorthReach — Main JavaScript
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


// ─── Mobile nav overlay panel ─────────────────────────────────
(function initMobileMenu() {
  const toggle  = document.getElementById('navToggle');
  const overlay = document.getElementById('navOverlay');
  const closeBtn = document.getElementById('navClose');
  const links   = document.querySelectorAll('.nav__panel-link, .nav__panel-cta');

  if (!toggle || !overlay) return;

  function openMenu() {
    toggle.classList.add('active');
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    toggle.classList.remove('active');
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', function () {
    const isOpen = overlay.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close button (✕)
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close on any link click
  links.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking ANYWHERE outside the panel
  document.addEventListener('click', function (e) {
    if (!overlay.classList.contains('open')) return;
    const panel = overlay.querySelector('.nav__panel');
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
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
  const savings    = document.querySelectorAll('.pricing__savings');

  if (!btnMonthly || !btnAnnual || !amounts.length) return;

  // ── Smooth number count animation ──
  function animateCount(el, from, to, duration) {
    var start = null;
    var fromN = parseInt(from, 10);
    var toN   = parseInt(to,   10);

    function ease(t) {
      // ease-out cubic
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
      if (!start) start = timestamp;
      var elapsed  = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var current  = Math.round(fromN + (toN - fromN) * ease(progress));
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = toN; // snap to exact final value
    }

    requestAnimationFrame(step);
  }

  // ── Show / hide savings notes ──
  function setSavings(show) {
    savings.forEach(function (el) {
      if (show) {
        var amt = parseInt(el.dataset.savings, 10);
        var formatted = amt.toLocaleString('en-CA');
        el.textContent = '🎉 You save $' + formatted + '/yr';
        el.classList.add('pricing__savings--visible');
      } else {
        el.textContent = '';
        el.classList.remove('pricing__savings--visible');
      }
    });
  }

  // ── Set period with animation ──
  function setPeriod(period) {
    amounts.forEach(function (el) {
      var from = el.textContent;
      var to   = el.dataset[period];
      animateCount(el, from, to, 420);
    });

    if (period === 'annual') {
      btnAnnual.classList.add('toggle__btn--active');
      btnMonthly.classList.remove('toggle__btn--active');
      setSavings(true);
    } else {
      btnMonthly.classList.add('toggle__btn--active');
      btnAnnual.classList.remove('toggle__btn--active');
      setSavings(false);
    }
  }

  btnMonthly.addEventListener('click', function () { setPeriod('monthly'); });
  btnAnnual.addEventListener('click',  function () { setPeriod('annual');  });
})();


// ─── Pricing "Get Started" → smooth scroll + pre-fill form ────
(function initPricingCTAs() {
  var ctaBtns  = document.querySelectorAll('.pricing__cta');
  var planInput = document.getElementById('selectedPlan');
  var planPill  = document.getElementById('formPlanPill');
  var planName  = document.getElementById('formPlanName');
  var planClear = document.getElementById('formPlanClear');

  if (!ctaBtns.length) return;

  ctaBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Don't preventDefault — let the global smooth scroll handler
      // own the actual scrolling to #demo cleanly.

      var plan = btn.dataset.plan || '';

      // Pre-fill the plan pill on the form
      if (planInput) planInput.value = plan;
      if (planName)  planName.textContent = plan + ' Plan';
      if (planPill)  planPill.style.display = 'flex';

      // Pulse-highlight the form card after scroll lands (~700ms)
      setTimeout(function () {
        var formWrap = document.querySelector('.cta__form-wrap');
        if (formWrap) {
          formWrap.classList.add('form--highlight');
          setTimeout(function () {
            formWrap.classList.remove('form--highlight');
          }, 1400);
        }
      }, 700);
    });
  });

  // ✕ to clear the selected plan pill
  if (planClear) {
    planClear.addEventListener('click', function () {
      if (planInput) planInput.value = '';
      if (planPill)  planPill.style.display = 'none';
      if (planName)  planName.textContent = '';
    });
  }
})();


// ─── Demo form → Formspree (AJAX) ─────────────────────────────
(function initDemoForm() {
  const form      = document.getElementById('demoForm');
  const success   = document.getElementById('formSuccess');
  const errorBox  = document.getElementById('formError');
  const submitBtn = document.getElementById('formSubmitBtn');

  if (!form || !success) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // ── Client-side validation ──
    const nameInput  = form.querySelector('#firstName');
    const emailInput = form.querySelector('#email');
    const required   = [nameInput, emailInput];
    let valid = true;

    required.forEach(function (input) {
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        input.addEventListener('input', function clear() {
          input.style.borderColor = '';
          input.removeEventListener('input', clear);
        }, { once: true });
        valid = false;
      }
    });

    if (!valid) return;

    // ── Loading state ──
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending&hellip;';
    if (errorBox) errorBox.style.display = 'none';

    // ── Submit to Formspree via fetch ──
    var data = new FormData(form);

    fetch('https://formspree.io/f/mojbywll', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
      if (response.ok) {
        // ── Success ──
        form.style.display = 'none';
        success.classList.add('visible');
      } else {
        // ── Formspree returned an error ──
        return response.json().then(function (json) {
          throw new Error(json.error || 'Submission failed');
        });
      }
    })
    .catch(function () {
      // ── Network / server error ──
      if (errorBox) errorBox.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Book My Free Demo <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });
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

  // Lock the feed height once so the page never shifts when items swap
  feed.style.height = feed.offsetHeight + 'px';

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
    const entry = newEntries[idx % newEntries.length];
    const items = feed.querySelectorAll('.feed__item');
    const last  = items[items.length - 1];

    // Remove the bottom item FIRST — count stays at 4, height never changes
    if (last) last.remove();

    // Build new item (starts invisible)
    const newItem = document.createElement('div');
    newItem.className = 'feed__item' + (entry.isSuccess ? ' feed__item--success' : '');
    newItem.style.cssText = 'opacity:0; transform:translateY(-6px); transition:opacity 0.4s ease, transform 0.4s ease;';
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

    // Prepend then animate in — two rAFs ensure the initial style is painted first
    feed.insertBefore(newItem, feed.firstChild);
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        newItem.style.opacity = '1';
        newItem.style.transform = 'translateY(0)';
      });
    });

    // Tick up the calls counter
    const callsEl = feed.closest('.mockup__body') &&
                    feed.closest('.mockup__body').querySelector('.mockup__stat-value');
    if (callsEl) {
      const n = parseInt(callsEl.textContent, 10);
      if (!isNaN(n)) callsEl.textContent = n + 1;
    }

    idx++;
  }

  // Run ticker every ~5s
  setInterval(tick, 5200);
})();
