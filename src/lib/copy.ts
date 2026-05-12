/** All site copy in one place */

export const nav = {
  links: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Modes", href: "/#modes" },
    { label: "Compare", href: "/#compare" },
    { label: "FAQ", href: "/#faq" },
  ],
  signIn: "Sign in",
  signInHref: "/login",
  cta: "Enter the arena",
  ctaHref: "/signup",
};

export const hero = {
  eyebrow: "Skill-based trading arena · Live now",
  title: ["Trade.", "Compete.", "Win."],
  subtitle:
    "The arena for traders who want to prove it. Match into 1v1 battles or tournaments with real prize pools. No prop firms, no broker spreads — just edge, executed.",
  ctaPrimary: "Enter the arena",
  ctaPrimaryHref: "/signup",
  ctaSecondary: "How it works",
  ctaSecondaryHref: "/#how-it-works",
  liveLabel: "Live now",
  liveCount: "1,847 traders matched",
  ticker: [
    "BTC/USD +2.41%",
    "ETH/USD +1.07%",
    "EUR/USD −0.18%",
    "GBP/USD +0.42%",
    "XAU/USD +0.93%",
    "NAS100 +1.66%",
    "SPX500 +0.21%",
    "USDJPY −0.39%",
    "OIL −1.04%",
    "DOGE +5.12%",
  ],
};

export const steps = {
  eyebrow: "How it works",
  title: ["Three steps", "to your first win."],
  items: [
    {
      n: "01",
      label: "Deposit",
      body: "Fund your wallet from $20. Your stake is your stake — never margined, never lent.",
    },
    {
      n: "VS",
      label: "Challenge",
      body: "Pick a 1v1 opponent or join a tournament bracket. Symbol, duration, and stake locked before the bell.",
    },
    {
      n: "03",
      label: "Win",
      body: "Highest P&L at the buzzer takes the pot. Settlement in seconds. Withdraw anytime.",
    },
  ],
};

export const modes = {
  eyebrow: "Pick your battlefield",
  title: ["1v1 battle.", "Or tournament.", "You decide."],
  cards: [
    {
      tag: "Head to head",
      title: "1V1 Duel",
      body: "Pick an opponent at your level. Same symbol, same window, same starting balance. Highest P&L wins the pot.",
      bullets: [
        "One opponent. One pair. One winner.",
        "Stakes from $20 to $5,000",
        "Match in under 90 seconds",
      ],
      cta: "Find an opponent",
      href: "/duels",
    },
    {
      tag: "Bracket arena",
      title: "Tournament",
      body: "Up to 256 traders. Single-elimination ladder. Survive the bracket and you take the throne — and the prize pool.",
      bullets: [
        "Weekly traders, daily majors, monthly grand slam",
        "Prize pools up to $250,000",
        "Live leaderboard and spectator mode",
      ],
      cta: "View brackets",
      href: "/tournaments",
    },
  ],
};

export const compare = {
  eyebrow: "Why 01LOT",
  title: ["The smarter way", "to compete."],
  tabs: [
    { id: "prop", label: "vs Prop firms" },
    { id: "broker", label: "vs Brokers" },
    { id: "social", label: "vs Social trading" },
  ],
  rows: [
    {
      feature: "You keep 100% of winnings",
      "01lot": true,
      prop: false,
      broker: true,
      social: false,
    },
    {
      feature: "No evaluation phase or scaling rules",
      "01lot": true,
      prop: false,
      broker: true,
      social: true,
    },
    {
      feature: "Skill-matched opponents",
      "01lot": true,
      prop: false,
      broker: false,
      social: false,
    },
    {
      feature: "Withdraw same day",
      "01lot": true,
      prop: false,
      broker: false,
      social: true,
    },
    {
      feature: "Transparent prize pool",
      "01lot": true,
      prop: false,
      broker: false,
      social: false,
    },
    {
      feature: "Zero spread markup",
      "01lot": true,
      prop: false,
      broker: false,
      social: true,
    },
  ] as const,
  columns: [
    { id: "01lot", label: "01LOT" },
    { id: "prop", label: "Prop firms" },
    { id: "broker", label: "Brokers" },
    { id: "social", label: "Social trading" },
  ] as const,
};

export const stats = {
  eyebrow: "The competition never stops",
  title: ["The arena", "doesn't sleep."],
  items: [
    {
      value: 24847,
      label: "Matches played",
      prefix: "",
      // 14-day rolling trend (deterministic — won't shift on re-render)
      trend: [42, 48, 51, 47, 55, 62, 58, 67, 71, 78, 82, 89, 94, 102],
      delta: "+12.4%",
    },
    {
      value: 892340,
      label: "Prize pool, last 30 days",
      prefix: "$",
      trend: [320, 410, 380, 450, 510, 540, 590, 640, 700, 760, 810, 850, 880, 920],
      delta: "+18.7%",
    },
    {
      value: 3241,
      label: "Active traders right now",
      prefix: "",
      trend: [120, 140, 160, 145, 180, 210, 230, 250, 280, 305, 320, 335, 348, 362],
      delta: "+9.3%",
    },
  ],
};

export const faq = {
  eyebrow: "Everything you need to know",
  title: ["The fine print.", "Plain English."],
  items: [
    {
      q: "What pairs and timeframes can I trade?",
      a: "Forex majors, top-30 crypto, gold, oil, and the major US indices. Match windows from 5 minutes (sprint) to 24 hours (endurance).",
    },
    {
      q: "Do I need trading experience?",
      a: "No. We match you with traders at your skill level. Beginners start in the bronze pool — small stakes, slow markets, real opponents.",
    },
    {
      q: "What's the trading fee?",
      a: "We take 4% of the prize pool of completed matches. That's it. No spread markup, no commission, no inactivity fee.",
    },
    {
      q: "How do withdrawals work?",
      a: "Withdraw to crypto wallet (USDC, USDT, BTC, ETH) or bank transfer (US, EU, UK). Typically clears in under 4 hours.",
    },
    {
      q: "Is this legal where I live?",
      a: "01LOT is currently available in 64 countries. Check your jurisdiction at signup — we'll let you know in 2 seconds.",
    },
    {
      q: "How do I start?",
      a: "Create an account, deposit from $20, pick a 1v1 or tournament. You'll be matched and trading inside 90 seconds.",
    },
  ],
};

export const finalCta = {
  liveCount: "2,000 traders are live",
  title: ["Where", "are you?"],
  body: "Create your account. Deposit when you're ready. The next match starts in seconds.",
  cta: "Create your account",
  href: "/signup",
};

export const payments = {
  eyebrow: "Deposits & payouts",
  title: ["Pay in.", "Cash out.", "Anywhere."],
  subtitle:
    "30+ rails — cards, crypto, instant bank, mobile money. Same-day clearing on most. Pick yours at signup; switch any time.",
  categories: [
    {
      id: "cards",
      label: "Cards",
      methods: [
        { name: "Visa", note: "Debit & credit · instant deposit", deposit: "Instant", withdraw: "1–3 business days" },
        { name: "Mastercard", note: "Debit & credit · instant deposit", deposit: "Instant", withdraw: "1–3 business days" },
      ],
    },
    {
      id: "crypto",
      label: "Crypto",
      methods: [
        { name: "Crypto", note: "USDC · USDT · BTC · ETH · ETH-L2", deposit: "On-chain confirm", withdraw: "Under 5 min" },
      ],
    },
    {
      id: "bank",
      label: "Banking",
      methods: [
        { name: "Instant bank transfer", note: "SEPA Instant · UK FPS · US ACH-Now", deposit: "Instant (24/7)", withdraw: "Instant" },
        { name: "Virtual accounts", note: "Dedicated IBAN per trader", deposit: "Instant", withdraw: "Same day" },
        { name: "USSD", note: "Dial *01LOT# on partner networks", deposit: "Instant", withdraw: "Under 1 min" },
      ],
    },
    {
      id: "africa",
      label: "Mobile money — Africa",
      methods: [
        { name: "M-Pesa", note: "Vodacom · TZ / KE", deposit: "Instant", withdraw: "Under 2 min" },
        { name: "Airtel Money", note: "TZ · UG · ZM · MW · MG", deposit: "Instant", withdraw: "Under 2 min" },
        { name: "Mixx by Yas", note: "Tigo Pesa · TZ", deposit: "Instant", withdraw: "Under 2 min" },
        { name: "HaloPesa", note: "TZ", deposit: "Instant", withdraw: "Under 2 min" },
        { name: "MTN MoMo", note: "GH · UG · RW · ZA · CI", deposit: "Instant", withdraw: "Under 2 min" },
        { name: "Vodafone Cash", note: "Ghana", deposit: "Instant", withdraw: "Under 2 min" },
        { name: "AirtelTigo Money", note: "Ghana", deposit: "Instant", withdraw: "Under 2 min" },
        { name: "Orange Money", note: "SN · CI · ML · BF", deposit: "Instant", withdraw: "Under 2 min" },
        { name: "Wave", note: "SN · CI", deposit: "Instant", withdraw: "Under 2 min" },
        { name: "Moov Money", note: "BJ · TG · BF · NE", deposit: "Instant", withdraw: "Under 2 min" },
      ],
    },
  ],
  feeNote: "Fees: 0% on crypto · 0–0.5% on bank · 1.5% on cards · 0–1% on mobile money. No spread markup. No FX surprise.",
  cta: "See all rails, fees & limits",
  ctaHref: "/payments",
} as const;

export const testimonials = {
  eyebrow: "Voices from the arena",
  title: ["A real hub", "of traders."],
  subtitle:
    "Ten countries, ten matches, ten different P&Ls. The constant: everyone walks away respecting the format. Wins and losses both.",
  items: [
    {
      handle: "@lagos_long",
      flag: "🇳🇬",
      city: "Lagos",
      country: "Nigeria",
      elo: "Bronze · ELO 1820",
      outcome: "+$143",
      result: "win",
      quote:
        "Won my last bracket. First time real-money trading felt like skill — no spread tricks, no slippage excuses. Cash hit my MTN MoMo before I closed the laptop.",
    },
    {
      handle: "@kofi_pip",
      flag: "🇬🇭",
      city: "Accra",
      country: "Ghana",
      elo: "Silver · ELO 2010",
      outcome: "−$48",
      result: "loss",
      quote:
        "Lost the Sunday Grand Prix to a guy from Kumasi who out-traded me clean. Got smoked. Still respect the game — better trader took it. That's the whole point.",
    },
    {
      handle: "@dar_fast",
      flag: "🇹🇿",
      city: "Dar es Salaam",
      country: "Tanzania",
      elo: "Bronze · ELO 1750",
      outcome: "+$76",
      result: "win",
      quote:
        "Five-minute sprint, $50 stake, walked away with $126. Tigo Pesa hit within the minute. The arena doesn't sleep and I love that.",
    },
    {
      handle: "@sg_short",
      flag: "🇻🇳",
      city: "Ho Chi Minh City",
      country: "Vietnam",
      elo: "Silver · ELO 1965",
      outcome: "−$120",
      result: "loss",
      quote:
        "Made it to round 4 of last weekend's bracket, then a JPY trader ran me over. Best 11 minutes of my week. Already signed up for Saturday.",
    },
    {
      handle: "@bkk_gold",
      flag: "🇹🇭",
      city: "Bangkok",
      country: "Thailand",
      elo: "Gold · ELO 2150",
      outcome: "+$240",
      result: "win",
      quote:
        "Four-hour marathon on XAU/USD. The chart was the only thing in the room. Logged off +$240, walked the dog. Felt like trading is supposed to feel.",
    },
    {
      handle: "@paris_vol",
      flag: "🇫🇷",
      city: "Paris",
      country: "France",
      elo: "Silver · ELO 1880",
      outcome: "−$60",
      result: "loss",
      quote:
        "Got dropped from my first match in three minutes. Came back the next day at a smaller stake, started winning. Skill matchmaking actually works — they put me with my peers.",
    },
    {
      handle: "@nyc_scalp",
      flag: "🇺🇸",
      city: "New York",
      country: "USA",
      elo: "Silver · ELO 1995",
      outcome: "+$312",
      result: "win",
      quote:
        "Two prop-firm evaluations, three 'consistency rule' resets. Same week I made $312 here. The math finally makes sense. You earn, you keep.",
    },
    {
      handle: "@dxb_macro",
      flag: "🇦🇪",
      city: "Dubai",
      country: "UAE",
      elo: "Gold · ELO 2110",
      outcome: "−$85",
      result: "loss",
      quote:
        "Came in thinking trading was solo. First duel showed me the other guy traded better. Lost. Took notes. Won the next four. Best learning loop in this asset class.",
    },
    {
      handle: "@nbo_bid",
      flag: "🇰🇪",
      city: "Nairobi",
      country: "Kenya",
      elo: "Bronze · ELO 1820",
      outcome: "+$94",
      result: "win",
      quote:
        "Stake from M-Pesa, win settles to M-Pesa, money in my hand inside two minutes. 'Same-day withdraw' isn't a slogan here — it's the actual thing.",
    },
    {
      handle: "@jhb_short",
      flag: "🇿🇦",
      city: "Johannesburg",
      country: "South Africa",
      elo: "Silver · ELO 1925",
      outcome: "−$50",
      result: "loss",
      quote:
        "Lost a Tuesday bracket to someone I'm fairly sure is a quant. $50 down, an hour smarter. I'll take that trade every week of the year.",
    },
  ],
} as const;

export const footer = {
  tagline: "Trade. Compete. Win.",
  columns: [
    {
      title: "Product",
      links: [
        { label: "1v1 duels", href: "/duels" },
        { label: "Tournaments", href: "/tournaments" },
        { label: "Leaderboards", href: "/leaderboards" },
        { label: "Spectator", href: "/spectator" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Press", href: "/press" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Payments", href: "/payments" },
        { label: "Trading rules", href: "/rules" },
        { label: "API docs", href: "/api-docs" },
        { label: "Status", href: "/status" },
        { label: "Affiliate", href: "/affiliate" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
        { label: "Risk disclosure", href: "/risk" },
        { label: "Compliance", href: "/compliance" },
      ],
    },
  ],
  meta: "© 2026 01LOT Markets Ltd. Trading carries risk. Past performance is not indicative of future results.",
};
