/* =============================================================
   MapleCall AI — Pricing Page Script
   Handles: monthly/annual toggle with animated count
   ============================================================= */

'use strict';

(function initPricingToggle() {
  var btnMonthly = document.getElementById('toggleMonthly');
  var btnAnnual  = document.getElementById('toggleAnnual');
  var amounts    = document.querySelectorAll('.pricing__amount');
  var savings    = document.querySelectorAll('.pricing__savings');

  if (!btnMonthly || !btnAnnual || !amounts.length) return;

  // ── Smooth number count animation ──
  function animateCount(el, from, to, duration) {
    var start = null;
    var fromN = parseInt(from, 10);
    var toN   = parseInt(to,   10);

    function ease(t) {
      return 1 - Math.pow(1 - t, 3); // ease-out cubic
    }

    function step(timestamp) {
      if (!start) start = timestamp;
      var elapsed  = timestamp - start;
      var progress = Math.min(elapsed / duration, 1);
      var current  = Math.round(fromN + (toN - fromN) * ease(progress));
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = toN;
    }

    requestAnimationFrame(step);
  }

  // ── Show / hide savings badges ──
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

  // ── Set period ──
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
