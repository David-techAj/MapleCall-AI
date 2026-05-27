/* =============================================================
   MapleCall AI — Pricing Page Script
   Handles: nav hamburger, monthly/annual toggle with animation
   ============================================================= */

'use strict';


// ─── Navbar scroll shadow ─────────────────────────────────────
(function initNavScroll() {
  var nav = document.getElementById('nav');
  if (!nav) return;
  function onScroll() {
    nav.classList.toggle('nav--scrolled', window.scrollY > 10);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// ─── Hamburger overlay ────────────────────────────────────────
(function initMobileMenu() {
  var toggle   = document.getElementById('navToggle');
  var overlay  = document.getElementById('navOverlay');
  var closeBtn = document.getElementById('navClose');
  var links    = document.querySelectorAll('.nav__panel-link, .nav__panel-cta');

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
    overlay.classList.contains('open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  links.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on click outside the panel
  document.addEventListener('click', function (e) {
    if (!overlay.classList.contains('open')) return;
    var panel = overlay.querySelector('.nav__panel');
    if (!panel.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });
})();


// ─── Pricing toggle (monthly / annual) ───────────────────────
(function initPricingToggle() {
  var btnMonthly = document.getElementById('toggleMonthly');
  var btnAnnual  = document.getElementById('toggleAnnual');
  var amounts    = document.querySelectorAll('.pricing__amount');
  var savings    = document.querySelectorAll('.pricing__savings');

  if (!btnMonthly || !btnAnnual || !amounts.length) return;

  // Ease-out cubic counter animation
  function animateCount(el, from, to, duration) {
    var start = null;
    var fromN = parseInt(from, 10);
    var toN   = parseInt(to,   10);

    function ease(t) { return 1 - Math.pow(1 - t, 3); }

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      el.textContent = Math.round(fromN + (toN - fromN) * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = toN;
    }
    requestAnimationFrame(step);
  }

  function setSavings(show) {
    savings.forEach(function (el) {
      if (show) {
        var amt = parseInt(el.dataset.savings, 10);
        el.textContent = '🎉 You save $' + amt.toLocaleString('en-CA') + '/yr';
        el.classList.add('pricing__savings--visible');
      } else {
        el.textContent = '';
        el.classList.remove('pricing__savings--visible');
      }
    });
  }

  function setPeriod(period) {
    amounts.forEach(function (el) {
      animateCount(el, el.textContent, el.dataset[period], 420);
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
