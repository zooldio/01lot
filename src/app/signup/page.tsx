import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";
import { SignupForm } from "@/components/site/signup-form";

export const metadata: Metadata = {
  title: "Create your account — 01LOT",
  description: "Open your 01LOT arena account in 90 seconds and enter your first match.",
};

const perks = [
  "Match into your first 1v1 in 90 seconds",
  "Stake from $20, withdraw same day",
  "Keep 100% of your winnings — no spread markup",
  "Live skill-matched opponents 24/7",
];

export default function SignupPage() {
  return (
    <PageShell>
      <section className="relative isolate overflow-hidden bg-bg pb-24 pt-8 sm:pt-16">
        <div className="pointer-events-none absolute inset-0 bg-stripes opacity-40" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-radial-orange opacity-60" />
        <div className="pointer-events-none absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />

        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            {/* Left — pitch */}
            <div>
              <span className="eyebrow">Enter the arena</span>
              <h1 className="text-display mt-3 text-[clamp(2.5rem,7vw,5rem)] leading-[0.92] text-text">
                Create your <span className="text-orange">account.</span>
              </h1>
              <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-text-dim">
                Two minutes to register. KYC is instant for 64 countries. Deposit when you&apos;re ready —
                we don&apos;t charge until your first match settles.
              </p>

              <ul className="mt-8 space-y-3 text-[14.5px] text-text-dim">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-orange/50 text-orange">
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 10.5L8 14.5L16 6" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-3 text-mono text-[11px] uppercase tracking-widest text-text-muted">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-orange/70" />
                  <span className="relative h-2 w-2 rounded-full bg-orange" />
                </span>
                1,847 traders matched right now
              </div>
            </div>

            {/* Right — form */}
            <SignupForm />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
