# 01LOT — Developer Handoff

A Next.js 16 (App Router) marketing site. Dark, neon-green palette. Pure client-side; no backend, no DB, no auth wired — the forms and CTAs are presentational. Designed to be the marketing surface in front of whatever trading product is built later.

## Quick deploy — Vercel (5 min)

This stack is Vercel-native. Recommended path:

```bash
# 1. Unzip the handoff
tar -xzf 01lot-handoff.tar.gz
cd 01lot

# 2. Install
npm install

# 3. Push to your git remote
git init && git add -A
git commit -m "chore: import 01lot landing site"
git branch -M main
git remote add origin git@github.com:YOUR_ORG/01lot.git
git push -u origin main

# 4. Import the repo in https://vercel.com/new — no env vars needed.
#    Build command: next build  (auto-detected)
#    Output:        .next       (auto-detected)
#    Node version:  20 or 22    (set in project settings)
```

Vercel will build, deploy, and give you a `*.vercel.app` URL. Point a custom domain at it from **Project → Settings → Domains**.

## Quick deploy — anything else

The output is a vanilla Next.js app. It also runs on:

| Host | Build command | Output | Notes |
|---|---|---|---|
| **Netlify** | `next build` | `.next/` | Use the `@netlify/plugin-nextjs` adapter. |
| **Cloudflare Pages** | `npx @cloudflare/next-on-pages` | `.vercel/output/static` | Or use Cloudflare's Workers adapter for SSR. |
| **Node host (Docker / VPS)** | `npm run build && npm run start` | runs on port 3000 | Bare `next start`. Put behind nginx + TLS. |
| **Static export** | not supported as-is | — | Hero uses client-only animation; one or two inner pages use motion that need React on the client. Static export would need a refactor. |

The site has **no environment variables** today. When you wire signup / login / payments to a backend, common ones to add:

```
NEXT_PUBLIC_SITE_URL=https://01lot.example
NEXT_PUBLIC_API_BASE_URL=https://api.01lot.example
AUTH_SECRET=...
KYC_VENDOR_KEY=...
```

## Local dev

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build, validates the whole tree
npm run start      # serve the built app
npm run lint       # eslint
```

Node 20.x or 22.x. Tested with npm 10 and pnpm 9 (both work; package-lock is npm).

## Project structure

```
01lot/
├─ src/
│  ├─ app/                       # App-Router routes
│  │  ├─ layout.tsx              # Root layout: fonts, Lenis smooth-scroll, custom cursor
│  │  ├─ page.tsx                # Home — composes Hero + ThreeSteps + BattleCards + Comparison + Stats + Payments + Faq + FinalCta
│  │  ├─ globals.css             # Brand tokens + custom utilities (aurora, dots, glass, ring-conic, globe styles, orbital animations)
│  │  ├─ favicon.ico
│  │  ├─ login/page.tsx          # /login — auth form (presentational)
│  │  ├─ signup/page.tsx         # /signup — registration form
│  │  ├─ duels/page.tsx          # /duels — 1v1 product page
│  │  ├─ tournaments/page.tsx    # /tournaments — bracket product page
│  │  ├─ leaderboards/page.tsx   # /leaderboards
│  │  ├─ spectator/page.tsx      # /spectator
│  │  ├─ payments/page.tsx       # /payments — rail-by-rail table with brand icons
│  │  ├─ about/page.tsx
│  │  ├─ press/page.tsx
│  │  ├─ careers/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ rules/page.tsx
│  │  ├─ api-docs/page.tsx
│  │  ├─ status/page.tsx
│  │  ├─ affiliate/page.tsx
│  │  ├─ terms/page.tsx
│  │  ├─ privacy/page.tsx
│  │  ├─ risk/page.tsx
│  │  └─ compliance/page.tsx
│  ├─ components/
│  │  ├─ site/                   # Page-level sections
│  │  │  ├─ nav.tsx              # Sticky top nav (scroll-aware blur)
│  │  │  ├─ hero.tsx             # Headline + CTAs + orbital globe stage + LiveMatchCard
│  │  │  ├─ three-steps.tsx      # "How it works" (also exports SectionHeader used elsewhere)
│  │  │  ├─ battle-cards.tsx     # 1v1 vs Tournament tilt cards
│  │  │  ├─ comparison.tsx       # vs Prop / vs Broker / vs Social tabs
│  │  │  ├─ stats.tsx            # Counters + sparklines
│  │  │  ├─ payments.tsx         # NEW — rails grouped by category
│  │  │  ├─ faq.tsx              # Radix accordion
│  │  │  ├─ cta.tsx              # Final CTA with matchmaking-state widget
│  │  │  ├─ footer.tsx
│  │  │  ├─ page-shell.tsx       # NEW — Nav + main + Footer wrapper used by every inner route
│  │  │  ├─ lenis-provider.tsx   # Smooth scroll
│  │  │  └─ cursor.tsx           # Custom cursor
│  │  └─ ui/                     # Primitives
│  │     ├─ logo.tsx             # Hexagonal mark + "01LOT" wordmark
│  │     ├─ magnetic-button.tsx  # Buttons with cursor-pull
│  │     ├─ marquee.tsx          # Hero ticker
│  │     ├─ animated-counter.tsx # Stats numbers
│  │     ├─ sparkline.tsx        # Inline SVG sparkline
│  │     ├─ candlestick-chart.tsx
│  │     ├─ live-match-card.tsx  # Hero bespoke widget (ticking P&L, sparklines, countdown)
│  │     ├─ orbital-globe.tsx    # NEW — dark planet, candle belt, city lights, comet streaks, orbit rings
│  │     ├─ payment-icons.tsx    # NEW — 16 inline-SVG brand marks
│  │     └─ icons.tsx            # Generic icon set (Check, X, Sword, Trophy, …)
│  └─ lib/
│     ├─ copy.ts                 # ALL site copy + nav/footer wiring — edit this to change content
│     └─ utils.ts                # cn() + formatters
├─ public/                       # Static assets (logo, silhouette, sword, etc.)
├─ next.config.ts                # Standard Next config
├─ postcss.config.mjs            # Tailwind v4 plugin
├─ tsconfig.json
├─ eslint.config.mjs
├─ package.json
└─ HANDOFF.md                    # This file
```

## What's where: at a glance

- **All copy** lives in `src/lib/copy.ts`. Change headlines, body text, payment-method labels, footer links — all here. Inner pages have their own copy inline.
- **Brand colors** live in `src/app/globals.css` under `:root`. The variables are still named `--orange*` for historical reasons but currently carry the neon-green palette. Change those 3 lines to repaint the entire site.
- **Routes** are all under `src/app/<route>/page.tsx`. App Router conventions — adding `pricing/page.tsx` adds the `/pricing` route automatically.
- **Footer links** are in `copy.ts` under `footer.columns`. Add/remove links here; they sync to every page that uses `<Footer />`.

## Notable custom components

- **`OrbitalGlobe`** (`src/components/ui/orbital-globe.tsx`) — The hero centerpiece. Pure SVG + a single `requestAnimationFrame` loop driving 56 candles, 5 comet streaks across 3 orbital planes, 110 city lights, 64 stars. ~290 lines, zero deps.
- **`LiveMatchCard`** (`src/components/ui/live-match-card.tsx`) — Hero secondary widget. Two opponents with ticking P&L and sparklines. Seeded RNG so SSR matches CSR.
- **`PaymentIcon`** (`src/components/ui/payment-icons.tsx`) — Recognition glyphs for 16 payment rails (Visa, Mastercard, Crypto, M-Pesa, MTN, Orange Money, Wave, …). Inline SVG, ~6 KB total. **For production, swap these for the official brand-asset SVGs with permission.**
- **`PageShell`** (`src/components/site/page-shell.tsx`) — Wraps every non-home page with Nav + Footer and provides `<PageHeader>`, `<PageSection>`, `<ProsePage>` helpers. Inner pages stay short because of this.

## Conventions worth keeping

- All page-section files are `"use client"` so motion/react animations work. The exception is legal/prose pages, which are server components.
- Every CTA goes through `<MagneticButton>` to stay consistent. Don't add raw `<button>`s in section components — they'll lose the magnetic hover.
- Brand tokens are referenced via Tailwind utilities like `text-orange`, `bg-orange/40`, `from-orange-bright`. The token *names* still say "orange" but the *values* are green. We chose not to rename to avoid a sweeping refactor across 60+ files. **Treat `--orange*` as the brand-primary token.** If you do rename later, update the CSS file + all usage in one shot.

## Known TODOs / things the dev should know

- **Forms** at `/login`, `/signup`, `/contact` are presentational (`action="#"`). Wire them to your backend / Clerk / Supabase / whichever auth service.
- **Payments page** has illustrative limits and fees. Replace `payments` in `copy.ts` with the real numbers when ready.
- **Stats** in the homepage Stats section and Leaderboards are hard-coded illustrative values in `copy.ts` and `src/app/leaderboards/page.tsx`. Hook these to real data when available.
- **Brand icons** — see note above; swap for licensed brand assets before launch.
- **`.next/` and `node_modules/`** are not in the tarball — they're regenerated by `npm install` + the first build.
- **`AGENTS.md`** at the repo root says "This is NOT the Next.js you know" — that was a guard left by the original scaffold. Standard App Router conventions apply.

## License & attribution

Copy and code authored for this project. Brand marks in `payment-icons.tsx` are simplified recognition glyphs, not licensed reproductions — use the official brand assets before going to production.

— Built on Next.js 16 + React 19 + Tailwind v4 + motion/react + Radix + Lenis.
