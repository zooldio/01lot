import type { Metadata } from "next";
import { PageShell, PageHeader, ProsePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Compliance — 01LOT",
  description: "Licenses, regulators, sub-processors, audits, and how we handle law-enforcement requests.",
};

export default function CompliancePage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal · Compliance"
        title="Compliance & disclosures."
        lead="The licenses we hold, the regulators we answer to, who processes your data, and how we handle official requests."
      />
      <ProsePage lastUpdated="2026-04-15">
        <h2>1. Licenses</h2>
        <ul>
          <li><strong>UK / EU:</strong> 01LOT Markets Ltd. — FCA-authorized Electronic Money Institution, Ref. 980012.</li>
          <li><strong>US:</strong> 01LOT US LLC — Money Service Business registered with FinCEN; state-by-state MTL coverage in progress.</li>
          <li><strong>Singapore:</strong> 01LOT APAC Pte Ltd. — MAS payments-institution licence (Standard).</li>
        </ul>

        <h2>2. Audits</h2>
        <ul>
          <li><strong>SOC 2 Type II</strong> · annual · auditor: A-LIGN. Latest report 2026-Q1, available on request.</li>
          <li><strong>Match-engine fairness</strong> · quarterly · auditor: Stillwater Markets Audit. Reports public; latest <a href="#">2026-Q1 (PDF)</a>.</li>
          <li><strong>Penetration testing</strong> · semi-annual · firm: Trail of Bits. Summary public, full reports under NDA.</li>
        </ul>

        <h2>3. Sub-processors</h2>
        <p>Companies that process personal or financial data on our behalf:</p>
        <ul>
          <li><strong>Cloud:</strong> AWS (us-east-1, eu-west-2, ap-southeast-1), Cloudflare (edge, WAF).</li>
          <li><strong>KYC / AML:</strong> Sumsub, Persona, ComplyAdvantage (sanctions screening).</li>
          <li><strong>Payments:</strong> Stripe, Modulr, Circle, Fireblocks.</li>
          <li><strong>Email / messaging:</strong> Postmark (transactional), Customer.io (lifecycle).</li>
          <li><strong>Analytics:</strong> Plausible (privacy-friendly, no cookies). We do not use Google Analytics.</li>
        </ul>

        <h2>4. Law enforcement requests</h2>
        <p>
          We respond to lawful requests from law enforcement and regulators. We require valid
          subpoenas, court orders, or equivalent in your jurisdiction. We notify affected users
          unless legally prohibited. Send requests to <a href="mailto:legal@01lot.example">legal@01lot.example</a> —
          we acknowledge within 1 business day.
        </p>
        <p>
          We publish a transparency report each January summarizing the prior year's requests
          (number, jurisdiction, outcome). 2025 report: 47 requests received, 31 produced, 16 declined,
          0 gag orders.
        </p>

        <h2>5. AML & global availability</h2>
        <p>
          01LOT is open to traders worldwide — there are no country restrictions on account
          creation. Standard identity verification applies to every signup. Suspicious transaction
          reports are filed where required by applicable law, and we will freeze funds where we
          have a reasonable basis to suspect proceeds of crime, consistent with our regulatory
          obligations.
        </p>

        <h2 id="cookies">6. Cookie policy</h2>
        <p>We use a small, audited set of cookies. None for advertising, none for tracking across third-party sites.</p>
        <h3>Strictly necessary</h3>
        <ul>
          <li><code>01lot_session</code> — keeps you signed in. Session duration.</li>
          <li><code>01lot_csrf</code> — CSRF protection. Session duration.</li>
        </ul>
        <h3>Preferences (optional)</h3>
        <ul>
          <li><code>01lot_theme</code> — remember theme choice. 365 days.</li>
          <li><code>01lot_locale</code> — remember language. 365 days.</li>
        </ul>
        <h3>Analytics (optional, no PII)</h3>
        <ul>
          <li>Plausible cookieless analytics. No fingerprinting, no third-party sharing.</li>
        </ul>
        <p>Manage preferences any time in <code>Settings → Privacy</code> inside your account.</p>

        <h2>7. Contact</h2>
        <p>
          Compliance team · <a href="mailto:compliance@01lot.example">compliance@01lot.example</a> ·
          Response inside 1 business day.
        </p>
      </ProsePage>
    </PageShell>
  );
}
