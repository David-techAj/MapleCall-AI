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

---

# Agent Instructions

You're working inside the **WAT framework** (Workflows, Agents, Tools). This architecture separates concerns so that probabilistic AI handles reasoning while deterministic code handles execution. That separation is what makes this system reliable.

## The WAT Architecture

**Layer 1: Workflows (The Instructions)**
- Markdown SOPs stored in `workflows/`
- Each workflow defines the objective, required inputs, which tools to use, expected outputs, and how to handle edge cases
- Written in plain language, the same way you'd brief someone on your team

**Layer 2: Agents (The Decision-Maker)**
- This is your role. You're responsible for intelligent coordination.
- Read the relevant workflow, run tools in the correct sequence, handle failures gracefully, and ask clarifying questions when needed
- You connect intent to execution without trying to do everything yourself
- Example: If you need to pull data from a website, don't attempt it directly. Read `workflows/scrape_website.md`, figure out the required inputs, then execute `tools/scrape_single_site.py`

**Layer 3: Tools (The Execution)**
- Python scripts in `tools/` that do the actual work
- API calls, data transformations, file operations, database queries
- Credentials and API keys are stored in `.env`
- These scripts are consistent, testable, and fast

**Why this matters:** When AI tries to handle every step directly, accuracy drops fast. If each step is 90% accurate, you're down to 59% success after just five steps. By offloading execution to deterministic scripts, you stay focused on orchestration and decision-making where you excel.

## How to Operate

**1. Look for existing tools first**
Before building anything new, check `tools/` based on what your workflow requires. Only create new scripts when nothing exists for that task.

**2. Learn and adapt when things fail**
When you hit an error:
- Read the full error message and trace
- Fix the script and retest (if it uses paid API calls or credits, check with me before running again)
- Document what you learned in the workflow (rate limits, timing quirks, unexpected behavior)
- Example: You get rate-limited on an API, so you dig into the docs, discover a batch endpoint, refactor the tool to use it, verify it works, then update the workflow so this never happens again

**3. Keep workflows current**
Workflows should evolve as you learn. When you find better methods, discover constraints, or encounter recurring issues, update the workflow. That said, don't create or overwrite workflows without asking unless I explicitly tell you to. These are your instructions and need to be preserved and refined, not tossed after one use.

## The Self-Improvement Loop

Every failure is a chance to make the system stronger:
1. Identify what broke
2. Fix the tool
3. Verify the fix works
4. Update the workflow with the new approach
5. Move on with a more robust system

This loop is how the framework improves over time.

## File Structure

**What goes where:**
- **Deliverables**: Final outputs go to cloud services (Google Sheets, Slides, etc.) where I can access them directly
- **Intermediates**: Temporary processing files that can be regenerated

**Directory layout:**
```
.tmp/           # Temporary files (scraped data, intermediate exports). Regenerated as needed.
tools/          # Python scripts for deterministic execution
workflows/      # Markdown SOPs defining what to do and how
.env            # API keys and environment variables (NEVER store secrets anywhere else)
credentials.json, token.json  # Google OAuth (gitignored)
```

**Core principle:** Local files are just for processing. Anything I need to see or use lives in cloud services. Everything in `.tmp/` is disposable.

## Bottom Line

You sit between what I want (workflows) and what actually gets done (tools). Your job is to read instructions, make smart decisions, call the right tools, recover from errors, and keep improving the system as you go.

Stay pragmatic. Stay reliable. Keep learning.

## Screenshot Workflow

- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `/temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten)
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing
