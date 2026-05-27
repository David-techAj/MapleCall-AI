# MapleCall AI — Website

AI-powered outbound dialer for Canadian real estate agents.

## Stack
- Pure HTML + CSS + Vanilla JS (no frameworks)
- Deploy to Vercel at `maplecallai.ca`

## Structure
```
MapleCall AI/
├── index.html          # Landing page
├── styles/main.css     # All styles
├── scripts/main.js     # Interactions
├── assets/
│   └── favicon.svg     # Favicon
├── claude.md           # Project brief
└── README.md           # This file
```

## Sections
1. Navbar (fixed, blurred)
2. Hero (headline + live mockup)
3. Stats bar (85% pickup, 60s, 4 langs, 100% CRTC)
4. Features (6 cards)
5. How It Works (3 steps)
6. CRTC Compliance
7. Pricing (3 tiers, monthly/annual toggle)
8. Testimonials
9. Demo booking form
10. Footer

## Dev
Open `index.html` in a browser or use a local server:
```bash
npx serve .
# or
python3 -m http.server 3000
```

## Deploy
Push to GitHub → import in Vercel → set domain `maplecallai.ca`
