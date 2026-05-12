import type { Metadata } from "next";
import { PageShell, PageHeader, ProsePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Terms of Service — 01LOT",
  description: "The terms of service for using 01LOT.",
};

export default function TermsPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal · Terms"
        title="Terms of service."
        lead="The contract between you and 01LOT Markets Ltd. Written so a human can read it; reviewed by lawyers so it holds up."
      />
      <ProsePage lastUpdated="2026-04-15">
        <h2>1. Who we are</h2>
        <p>
          01LOT is operated by <strong>01LOT Markets Ltd.</strong>, registered in England and Wales
          (Company No. 14817392), licensed as an Electronic Money Institution by the FCA (Ref. 980012).
          Our registered office is 5 Bishopsgate, Floor 14, London EC2N 3AR.
        </p>

        <h2>2. Account eligibility</h2>
        <p>You must be 18 or older. 01LOT is open to traders worldwide — there are no country
          restrictions. You must complete identity verification before depositing or trading.</p>

        <h2>3. Your account</h2>
        <p>You are responsible for keeping your credentials private. We will never ask for your password. Notify us at
          {" "}<a href="/contact">security@01lot.example</a> within 24 hours of suspected unauthorized access.</p>

        <h2>4. Funds & escrow</h2>
        <p>Deposited funds sit in a segregated client-money account held with a UK tier-1 bank. Match stakes move
          into escrow when a match opens and settle to the winner's wallet at the close. We never lend, lever, or
          rehypothecate your balance.</p>

        <h2>5. Matches & rake</h2>
        <p>Match parameters — symbol, window, stake, starting balance — are immutable from the moment a match opens.
          We take a 4% house rake on the total pool of completed matches. No spread markup, no other fees.</p>

        <h2>6. Banned conduct</h2>
        <p>The full list is at <a href="/rules">trading rules</a>. Short version: no copy trading, no wash matching,
          no quote manipulation, no latency abuse. Violations forfeit unsettled stakes and result in a permanent ban.</p>

        <h2>7. Service availability</h2>
        <p>We aim for 99.95% uptime on the match engine. Real-time status at <a href="/status">status.01lot.example</a>.
          Scheduled maintenance windows are announced 48 hours in advance.</p>

        <h2>8. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, our aggregate liability for any claim arising from your use of
          01LOT is limited to the greater of (a) the total fees you paid us in the 12 months preceding the claim,
          or (b) £100.</p>

        <h2>9. Termination</h2>
        <p>Either of us can close your account at any time. On closure, we settle any open matches, pay you any
          remaining balance to your verified withdrawal method, and retain transaction records for 7 years as
          required by UK financial regulations.</p>

        <h2>10. Disputes & governing law</h2>
        <p>These terms are governed by the laws of England and Wales. Any dispute will be heard in the English courts,
          except where local consumer-protection law guarantees you the right to sue in your home jurisdiction.</p>

        <p className="text-text-muted">
          Questions? <a href="/contact">help@01lot.example</a> — same-day reply, every weekday.
        </p>
      </ProsePage>
    </PageShell>
  );
}
