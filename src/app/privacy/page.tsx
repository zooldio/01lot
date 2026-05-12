import type { Metadata } from "next";
import { PageShell, PageHeader, ProsePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy — 01LOT",
  description: "How 01LOT collects, uses, and protects your personal data.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Legal · Privacy"
        title="Privacy policy."
        lead="What we collect, why, who we share it with, and the controls you have. Written to GDPR and CCPA standards."
      />
      <ProsePage lastUpdated="2026-04-15">
        <h2>1. What we collect</h2>
        <h3>1.1 You give us</h3>
        <ul>
          <li><strong>Identity:</strong> name, date of birth, ID document (for KYC), photo.</li>
          <li><strong>Contact:</strong> email, phone, postal address.</li>
          <li><strong>Financial:</strong> bank or crypto wallet details for deposits/payouts.</li>
          <li><strong>Trading:</strong> every order, fill, and match settlement.</li>
        </ul>
        <h3>1.2 We collect automatically</h3>
        <ul>
          <li>Device, browser, IP address (used for fraud/abuse detection).</li>
          <li>Behavioral analytics — clicks, page views, match outcomes (used to improve the product).</li>
          <li>Cookies — see <a href="#cookies">cookies</a> below.</li>
        </ul>

        <h2>2. Why we have it</h2>
        <ul>
          <li><strong>Run the service</strong> — match you with opponents, settle pots, pay you out.</li>
          <li><strong>Comply with law</strong> — KYC/AML, sanctions screening, suspicious activity reporting.</li>
          <li><strong>Protect the platform</strong> — fraud, collusion, and manipulation detection.</li>
          <li><strong>Improve the product</strong> — analyze how features are used.</li>
        </ul>

        <h2>3. Who we share with</h2>
        <p>Only a short list:</p>
        <ul>
          <li><strong>KYC vendors</strong> (Sumsub, Persona) — for identity checks.</li>
          <li><strong>Payment processors</strong> (Stripe, Circle, Fireblocks) — for moving money.</li>
          <li><strong>Cloud infrastructure</strong> (AWS, Cloudflare) — to run the platform.</li>
          <li><strong>Regulators</strong> — when legally required.</li>
        </ul>
        <p>We never sell personal data. Full sub-processor list at <a href="/compliance">compliance</a>.</p>

        <h2>4. Your rights</h2>
        <p>You can request access, correction, deletion, or export of your data at any time. Email
          {" "}<a href="/contact">privacy@01lot.example</a> — we reply within 30 days (most within 5).
          For EU residents, you also have the right to lodge a complaint with your local data
          protection authority.</p>

        <h2>5. Retention</h2>
        <p>We keep your trading records and KYC data for 7 years after account closure, as required by UK financial
          regulation. Behavioral analytics is anonymized after 24 months. Marketing data is deleted on request.</p>

        <h2 id="cookies">6. Cookies</h2>
        <p>Details on what cookies we set and what each does — see <a href="/compliance#cookies">our cookie policy</a>.
          You can change preferences at any time in <code>Settings → Privacy</code>.</p>

        <h2>7. Security</h2>
        <p>All data in transit is encrypted (TLS 1.3). Data at rest is encrypted with AES-256.
          We rotate keys quarterly and audit access monthly. We're SOC 2 Type II audited annually —
          report available on request.</p>

        <h2>8. Contact</h2>
        <p>Data protection officer · <a href="mailto:privacy@01lot.example">privacy@01lot.example</a></p>
      </ProsePage>
    </PageShell>
  );
}
