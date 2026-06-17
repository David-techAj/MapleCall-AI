/* =============================================================
   NorthReach — Get Started Page Script
   Reads ?plan= URL param, populates plan card, handles form
   ============================================================= */

'use strict';

// ─── Plan data ────────────────────────────────────────────────
var PLANS = {
  starter: {
    name:     'Starter',
    tag:      'Perfect for solo agents',
    price:    '199',
    badge:    'Starter Plan',
    pro:      false,
    features: [
      '500 outbound calls per month',
      'English AI voice agent',
      'Automated voicemail drop',
      'Lead follow-up sequences',
      '1 CRM integration',
      'CRTC & DNCL compliant',
      '14-day free trial — no credit card',
    ],
  },
  pro: {
    name:     'Pro',
    tag:      'Most popular for active agents',
    price:    '349',
    badge:    'Pro Plan',
    pro:      true,
    features: [
      '2,000 outbound calls per month',
      'EN · FR · 普通話 · 廣東話 (all 4 languages)',
      'All CRM integrations',
      'Full analytics dashboard',
      'Call transcripts & recordings',
      'Priority email & chat support',
      '14-day free trial — no credit card',
    ],
  },
  team: {
    name:     'Team',
    tag:      'Built for brokerages & teams',
    price:    '599',
    badge:    'Team Plan',
    pro:      false,
    features: [
      'Unlimited outbound calls',
      'All 4 languages + custom voice',
      'Up to 10 agent seats',
      'Dedicated account manager',
      'Custom reporting & SLAs',
      'API & Zapier integration',
      '14-day free trial — no credit card',
    ],
  },
};

// ─── Read plan from URL (default: pro) ───────────────────────
(function initPlan() {
  var params  = new URLSearchParams(window.location.search);
  var planKey = (params.get('plan') || 'pro').toLowerCase().trim();

  if (!PLANS[planKey]) planKey = 'pro';

  var plan = PLANS[planKey];

  // Badge
  var badge = document.getElementById('gsPlanBadge');
  if (badge) badge.textContent = plan.badge;

  // Pro border highlight
  var card = document.getElementById('gsPlanCard');
  if (card) {
    card.classList.toggle('gs-plan-card--pro', plan.pro);
  }

  // Plan name / tag / amount
  var nameEl   = document.getElementById('gsPlanName');
  var tagEl    = document.getElementById('gsPlanTag');
  var amountEl = document.getElementById('gsPlanAmount');

  if (nameEl)   nameEl.textContent   = plan.name;
  if (tagEl)    tagEl.textContent    = plan.tag;
  if (amountEl) amountEl.textContent = plan.price;

  // Features list
  var featList = document.getElementById('gsPlanFeatures');
  if (featList) {
    featList.innerHTML = '';
    plan.features.forEach(function (feat) {
      var li = document.createElement('li');
      li.textContent = feat;
      featList.appendChild(li);
    });
  }

  // Hidden form input
  var hiddenPlan = document.getElementById('gsHiddenPlan');
  if (hiddenPlan) hiddenPlan.value = plan.name + ' Plan';
})();


// ─── Formspree form submission ─────────────────────────────────
(function initForm() {
  var form      = document.getElementById('gsForm');
  var submitBtn = document.getElementById('gsSubmitBtn');
  var errorBox  = document.getElementById('gsFormError');
  var successEl = document.getElementById('gsSuccess');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Client-side validation
    var firstNameInput = document.getElementById('gsFirstName');
    var emailInput     = document.getElementById('gsEmail');
    var valid = true;

    [firstNameInput, emailInput].forEach(function (input) {
      if (!input || !input.value.trim()) {
        if (input) {
          input.style.borderColor = '#ef4444';
          input.addEventListener('input', function clear() {
            input.style.borderColor = '';
            input.removeEventListener('input', clear);
          }, { once: true });
        }
        valid = false;
      }
    });

    if (!valid) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending&hellip;';
    if (errorBox) errorBox.style.display = 'none';

    // Submit to Formspree
    fetch(form.action, {
      method:  'POST',
      body:    new FormData(form),
      headers: { 'Accept': 'application/json' },
    })
    .then(function (res) {
      if (res.ok) {
        form.style.display = 'none';
        if (successEl) successEl.style.display = 'flex';
      } else {
        return res.json().then(function (j) { throw new Error(j.error || 'failed'); });
      }
    })
    .catch(function () {
      if (errorBox) errorBox.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Book My Free Demo <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });
  });
})();
