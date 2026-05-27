/* =============================================================
   MapleCall AI — Get Started Page Script
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
      '200 AI-powered outbound calls/mo',
      'English voice agent',
      'Automated voicemail drop',
      'Lead follow-up sequences',
      'CRM sync (HubSpot, Follow Up Boss)',
      'CRTC-compliant calling windows',
      '14-day free trial',
    ],
  },
  pro: {
    name:     'Pro',
    tag:      'Most popular for growing teams',
    price:    '349',
    badge:    'Pro Plan',
    pro:      true,
    features: [
      '600 AI-powered outbound calls/mo',
      'English + French voice agents',
      'Multilingual support (Mandarin, Punjabi)',
      'Smart callback scheduling',
      'Priority lead routing',
      'Advanced analytics dashboard',
      'Dedicated onboarding specialist',
      '14-day free trial',
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
      'All Pro languages + custom voices',
      'Multi-agent seat management',
      'White-label calling ID',
      'API & Zapier integration',
      'Custom reporting & SLAs',
      'Dedicated account manager',
      '14-day free trial',
    ],
  },
};

// ─── Read plan from URL ────────────────────────────────────────
(function initPlan() {
  var params  = new URLSearchParams(window.location.search);
  var planKey = (params.get('plan') || 'starter').toLowerCase();

  if (!PLANS[planKey]) planKey = 'starter';

  var plan = PLANS[planKey];

  // Badge
  var badge = document.getElementById('gsPlanBadge');
  if (badge) badge.textContent = plan.badge;

  // Plan card Pro border
  var card = document.getElementById('gsPlanCard');
  if (card && plan.pro) card.classList.add('gs-plan-card--pro');

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

    // ── Client-side validation ──
    var firstNameInput = document.getElementById('gsFirstName');
    var emailInput     = document.getElementById('gsEmail');
    var required = [firstNameInput, emailInput];
    var valid = true;

    required.forEach(function (input) {
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

    // ── Loading state ──
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Sending&hellip;';
    if (errorBox) errorBox.style.display = 'none';

    // ── Submit to Formspree ──
    var data = new FormData(form);

    fetch(form.action, {
      method:  'POST',
      body:    data,
      headers: { 'Accept': 'application/json' },
    })
    .then(function (response) {
      if (response.ok) {
        // ── Success ──
        form.style.display = 'none';
        if (successEl) successEl.style.display = 'flex';
      } else {
        return response.json().then(function (json) {
          throw new Error(json.error || 'Submission failed');
        });
      }
    })
    .catch(function () {
      // ── Error ──
      if (errorBox) errorBox.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Book My Free Demo <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    });
  });
})();
