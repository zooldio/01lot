import type { Metadata } from "next";
import { PageShell } from "@/components/site/page-shell";

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
                Create your <span className="text-orange text-glow-orange">account.</span>
              </h1>
              <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-text-dim">
                Two minutes to register. KYC is instant for 64 countries. Deposit when you're ready —
                we don't charge until your first match settles.
              </p>

              <ul className="mt-8 space-y-3 text-[14.5px] text-text-dim">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-orange/50 text-orange">
                      <svg viewBox="0 0 20 20" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            <form className="surface-card relative p-6 sm:p-8" action="#" method="post" noValidate>
              <h2 className="text-display text-[1.4rem] tracking-wide text-text">Start your arena account</h2>
              <p className="mt-1 text-[13px] text-text-muted">Free forever. No card required.</p>

              <div className="mt-7 space-y-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field label="First name">
                    <input type="text" required autoComplete="given-name" className="input" />
                  </Field>
                  <Field label="Last name">
                    <input type="text" required autoComplete="family-name" className="input" />
                  </Field>
                </div>
                <Field label="Email">
                  <input type="email" required autoComplete="email" placeholder="trader@01lot.example" className="input" />
                </Field>
                <Field label="Password" hint="Min 10 characters, 1 number, 1 symbol.">
                  <input type="password" required autoComplete="new-password" placeholder="••••••••" className="input" />
                </Field>
                <Field label="Country">
                  <select required className="input">
                    <option value="">Select your country</option>
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="AE">United Arab Emirates</option>
                    <option value="SG">Singapore</option>
                    <option value="AU">Australia</option>
                  </select>
                </Field>

                <label className="flex items-start gap-2 text-[12.5px] text-text-dim">
                  <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-line-strong bg-bg-elev accent-orange" />
                  <span>
                    I'm 18+ and accept the{" "}
                    <a href="/terms" className="text-orange underline-offset-4 hover:underline">terms</a>,{" "}
                    <a href="/privacy" className="text-orange underline-offset-4 hover:underline">privacy</a>, and{" "}
                    <a href="/risk" className="text-orange underline-offset-4 hover:underline">risk disclosure</a>.
                  </span>
                </label>

                <button type="submit" className="btn-primary w-full justify-center !text-[13px]">
                  Create account →
                </button>
              </div>

              <p className="mt-6 text-center text-[13px] text-text-dim">
                Already have one?{" "}
                <a href="/login" className="text-orange underline-offset-4 hover:underline">
                  Sign in
                </a>
                .
              </p>
            </form>
          </div>
        </div>

        <style>{`
          .input {
            width: 100%;
            border-radius: 6px;
            background: var(--bg-elev);
            border: 1px solid var(--line-strong);
            color: var(--text);
            padding: 0.75rem 1rem;
            font-size: 14px;
            outline: none;
            transition: border-color 150ms, box-shadow 150ms;
          }
          .input::placeholder { color: var(--text-muted); }
          .input:focus { border-color: var(--orange); box-shadow: 0 0 0 4px rgba(255,90,31,0.18); }
        `}</style>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-mono text-[11px] uppercase tracking-widest text-text-muted">{label}</span>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1.5 text-[11.5px] text-text-muted">{hint}</p>}
    </label>
  );
}
