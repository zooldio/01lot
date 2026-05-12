import type { Metadata } from "next";
import { PageShell, PageHeader, ProsePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Trading Rules — 01LOT",
  description: "The rules of engagement for 01LOT matches and tournaments. Plain English, no surprises.",
};

export default function RulesPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Resources · Trading rules"
        title="Rules of engagement."
        lead="The shortest version we could write while still being useful. If a rule isn't here, it doesn't exist."
      />
      <ProsePage lastUpdated="2026-04-30">
        <h2>1. Matches</h2>
        <p>
          Every match begins on a pre-agreed <strong>symbol</strong>, <strong>window</strong>,
          <strong> stake</strong>, and <strong>starting balance</strong>. Both sides are bound to
          those parameters from the bell — no early exit, no late entry, no parameter renegotiation.
        </p>
        <h3>1.1 Eligible symbols</h3>
        <ul>
          <li>Forex majors and minors (EUR/USD, GBP/USD, USD/JPY, AUD/USD, USD/CAD, USD/CHF, NZD/USD, EUR/GBP, EUR/JPY)</li>
          <li>Top-30 crypto by 30-day median volume (USDT pairs)</li>
          <li>Gold (XAU/USD), oil (WTI), and US index CFDs (NAS100, SPX500, US30)</li>
        </ul>
        <h3>1.2 Match windows</h3>
        <ul>
          <li>Sprint — 5 minutes</li>
          <li>Standard — 30 minutes</li>
          <li>Marathon — 4 hours</li>
          <li>Endurance — 24 hours</li>
        </ul>

        <h2>2. Stakes & settlement</h2>
        <p>
          Stakes sit in 01LOT escrow from the moment the match opens. Settlement is automatic at
          the close — the side with the higher closing P&amp;L receives the full pot,
          minus a 4% house rake on the pool.
        </p>
        <p>
          Ties are resolved by total notional traded (most active trader wins). If still tied,
          the pot is split 50/50.
        </p>

        <h2>3. Banned behavior</h2>
        <ul>
          <li><strong>Copy trading.</strong> Mirror-trade bots, signal services, or cross-account coordination across opponents.</li>
          <li><strong>Wash matching.</strong> Setting up matches with yourself or with a colluding partner to inflate stats.</li>
          <li><strong>Quote manipulation.</strong> Any attempt to influence the price feed used to settle.</li>
          <li><strong>Latency abuse.</strong> Exploiting predictable lag in our or your local market data feed.</li>
        </ul>
        <p>
          We use behavioral and statistical detectors plus manual review for the top of the
          leaderboard. Confirmed violators are banned permanently and forfeit any unsettled stakes.
        </p>

        <h2>4. Disputes</h2>
        <p>
          If a match settles incorrectly — for instance, a quote spike on our feed that doesn't
          appear on a primary venue — open a dispute inside 24 hours via
          {" "}<a href="/contact">support@01lot.example</a>. We review every dispute manually and
          publish anonymized post-mortems monthly.
        </p>

        <h2>5. Fairness audits</h2>
        <p>
          Match settlement, rake calculation, and bracket draws are audited quarterly by an
          independent third party. Reports are public — see <a href="/compliance">compliance</a>.
        </p>
      </ProsePage>
    </PageShell>
  );
}
