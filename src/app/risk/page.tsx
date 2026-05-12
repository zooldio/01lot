import type { Metadata } from "next";
import { PageShell, PageHeader, ProsePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Risk Disclosure — 01LOT",
  description: "Trading carries risk. Read this before you deposit or place a match.",
};

export default function RiskPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal · Risk"
        title="Risk disclosure."
        lead="Trading is hard. Skill helps, but it does not eliminate risk. Read this — really — before you stake real money."
      />
      <ProsePage lastUpdated="2026-04-15">
        <h2>1. You can lose your stake</h2>
        <p>
          When you enter a 1v1 match or tournament, your stake is locked in escrow. If your opponent
          finishes with a higher P&amp;L at the buzzer, your stake — minus our 4% house rake on the
          pool — goes to them. There is no insurance, no &ldquo;risk-free trial,&rdquo; and no minimum payout.
        </p>

        <h2>2. Past performance is not future performance</h2>
        <p>
          A trader with a 78% all-time win rate can lose their next 10 matches. ELO ratings and
          leaderboard standings describe past behavior — they are not a prediction of future results
          and not a substitute for your own judgment.
        </p>

        <h2>3. Markets are volatile</h2>
        <p>
          Forex, crypto, commodities, and indices can move violently in seconds — especially around
          economic releases. We do not delay or filter market data. A position that looked safe at
          14:29 can be underwater at 14:30:01.
        </p>

        <h2>4. Sprint windows are extremely high-variance</h2>
        <p>
          5-minute Sprint matches reward execution speed and pattern recognition under tight time
          pressure. They also produce wider P&amp;L swings per dollar staked than longer windows. If
          you're new to 01LOT, start with Standard (30m) or Marathon (4h).
        </p>

        <h2>5. Compulsive trading is a real risk</h2>
        <p>
          The arena format is engaging by design. If you're chasing losses, increasing stakes after a
          bad week, or feeling out of control — stop, and reach out:
        </p>
        <ul>
          <li>In-product cooling-off (<code>Settings → Limits → Pause</code>): instant, 7 / 30 / 90 days.</li>
          <li>Self-exclusion: permanent or up to 5 years. Cannot be reversed.</li>
          <li><a href="https://www.begambleaware.org" target="_blank" rel="noopener">BeGambleAware</a> (UK), <a href="https://www.ncpgambling.org" target="_blank" rel="noopener">NCPG</a> (US): independent help, 24/7.</li>
        </ul>

        <h2>6. Tax</h2>
        <p>
          Winnings are taxable in most jurisdictions. We report to relevant authorities where required
          and provide you with an annual statement (in your dashboard, by January 31 each year).
          Whether you owe tax on a specific match or a season's worth depends on where you live and
          how the tax authority treats skill-based trading — talk to a qualified accountant.
        </p>

        <h2>7. We are not your broker, advisor, or fiduciary</h2>
        <p>
          01LOT is a venue for skill-based trading matches, not investment advice. Nothing on this
          site is a recommendation to buy or sell a particular instrument. You alone are responsible
          for the decisions you make inside a match.
        </p>

        <h2>8. Bottom line</h2>
        <p>
          Only stake what you can comfortably lose. Tune your match sizes to a fixed percentage of
          your bankroll. Walk away when you're tilted. The arena will still be here tomorrow.
        </p>
      </ProsePage>
    </PageShell>
  );
}
