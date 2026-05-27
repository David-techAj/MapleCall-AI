# MapleCall AI — Project Instructions for Claude

## What This Project Is

MapleCall AI is a Canadian SaaS product — an AI-powered outbound dialer built specifically for Canadian real estate agents. It follows up on leads automatically, books showings, and is fully CRTC-compliant. It supports four languages: English, French, Mandarin, and Cantonese.

This is a real business being built by the founder. Every decision should be practical, clean, and production-ready.

---

## The Stack

- **Frontend (website):** HTML + CSS + vanilla JavaScript
- **Deployment:** Vercel (maplecallai.ca)
- **AI calling engine:** Bland.ai or Retell AI (API integration)
- **CRM / dashboard:** GoHighLevel (white-labeled)
- **Canadian phone numbers:** Twilio
- **Payments:** Stripe
- **Code editor:** VS Code on Mac

No frameworks unless absolutely necessary. Keep it simple, fast, and easy to maintain.

---

## Brand

**Product name:** MapleCall AI

**Colors:**
- Background: `#060f1a` (dark navy)
- Primary accent: `#378ADD` (electric blue)
- Secondary text: `#5577aa`
- Muted text: `#3a5570`
- Card background: `#0d1a27`
- Card border: `#1a3a5c`
- Dividers: `#0d1f30`
- White text: `#ffffff`

**Typography:**
- Font: System font stack — `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Headings: `font-weight: 500`, `letter-spacing: -0.02em`
- Body: `font-size: 14px`, `line-height: 1.7`
- Small labels: `font-size: 11px`, `text-transform: uppercase`, `letter-spacing: 0.07em`

**Tone:** Professional, trustworthy, modern. Never salesy. Speaks to Canadian agents directly.

---

## Target Customer

Canadian real estate agents in Toronto and Vancouver who:
- Lose deals because they follow up on leads too slowly
- Serve multicultural clients (Chinese-speaking, French-speaking communities)
- Are worried about CRTC violations and getting sued
- Want a tool that is easy to set up and just works

---

## Core Value Propositions (Use These In Copy)

1. Calls every lead within 60 seconds automatically
2. Speaks English, French, Mandarin, and Cantonese
3. 100% CRTC compliant — Do Not Call list integrated
4. Books showings directly into the agent's calendar
5. Connects to their existing CRM (Follow Up Boss, GoHighLevel)
6. Set up in under 24 hours

---

## Website Structure

The website is a single-page marketing site with these sections in order:

1. **Navbar** — Logo left, nav links center, CTA button right
2. **Hero** — Main headline, subheadline, two CTA buttons, trust note
3. **Stats bar** — 3 key numbers (85% pickup rate, 60s response, EN/FR/ZH/YUE)
4. **Features** — 6 feature cards in a 3-column grid
5. **How it works** — 3 steps
6. **Pricing** — 3 tiers ($199 Starter / $349 Pro / $599 Team)
7. **CTA section** — Final call to action
8. **Footer** — Logo, links, copyright

---

## Design Rules

- Dark background throughout — never use white as a page background
- All cards use `background: #0d1a27` with `border: 0.5px solid #1a3a5c`
- Border radius: `8px` for small elements, `10px` for cards
- No gradients, no heavy shadows — flat and clean
- Accent color `#378ADD` for icons, highlights, numbers, and CTAs
- Buttons: primary = solid `#378ADD`, ghost = transparent with border
- Sections separated by `border-top: 0.5px solid #0d1f30`
- All section padding: `40px 32px`
- Mobile responsive — everything stacks to single column on small screens

---

## File Structure

```
maplecall-ai/
├── index.html          # Main landing page
├── styles/
│   └── main.css        # All styles
├── scripts/
│   └── main.js         # Any JS interactions
├── assets/
│   └── images/         # Any images or icons
├── claude.md           # This file
└── README.md           # Project notes
```

---

## Code Style Rules

- Clean, readable, well-commented HTML
- CSS uses logical naming — `.hero`, `.nav`, `.features-grid` etc.
- No inline styles unless absolutely necessary
- Mobile first — write mobile styles first, then desktop with media queries
- Breakpoint: `768px` for tablet, `1024px` for desktop
- No jQuery — vanilla JS only
- Every section gets its own CSS comment block for easy navigation

---

## Key Pages To Build (In Order)

1. `index.html` — Landing page (build this first)
2. Pricing page (can be a section on index for now)
3. Simple contact / demo booking form
4. Legal pages — Privacy Policy, Terms of Service, CRTC Compliance

---

## Compliance Notes (Important)

- CRTC = Canadian Radio-television and Telecommunications Commission
- Must integrate with Canada's National Do Not Call List (DNCL)
- Calling hours: 9am–9:30pm local time weekdays, 10am–6pm weekends
- Must identify the business at the start of every call
- Must allow opt-out immediately on request
- Call recording consent must be obtained
- These rules are a SELLING POINT — market them prominently

---

## Languages Supported

- English (all of Canada)
- French (Quebec and bilingual markets)
- Mandarin (Toronto and Vancouver Chinese communities)
- Cantonese (Vancouver and Toronto)

When writing copy, always mention all four languages. This is a major differentiator.

---

## Pricing Tiers

| Plan | Price | Key Features |
|------|-------|--------------|
| Starter | $199/month | 500 calls, English only, 1 CRM |
| Pro | $349/month | 2,000 calls, all 4 languages, all CRMs, dashboard |
| Team | $599/month | Unlimited calls, up to 10 agents, priority support |

---

## What Claude Should Always Do

- Write clean, production-quality code every time
- Follow the brand colors and design rules exactly
- Keep copy focused on the Canadian real estate agent customer
- Always mention CRTC compliance and multilingual support — these are the moat
- When building components, build them mobile-first
- Suggest improvements if you notice something that could be better
- Keep the codebase simple — this founder is building with VS Code and deploying to Vercel

## What Claude Should Never Do

- Use React, Vue, or any framework unless explicitly asked
- Add unnecessary dependencies or libraries
- Use white or light backgrounds on any page
- Change the brand colors without being asked
- Overcomplicate the code — simple and clean wins every time
- Forget that this is a Canadian product — US-centric copy is wrong
