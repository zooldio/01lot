import type { ReactNode } from "react";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";

/**
 * Standard wrapper for every non-home page.
 * Renders Nav (fixed) + a top-padded <main> + Footer.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main className="relative min-h-screen bg-bg pt-24 sm:pt-28">{children}</main>
      <Footer />
    </>
  );
}

/**
 * Hero block for inner pages — eyebrow, display title, lead, optional CTAs.
 * Uses the same display type + radial glow as the home hero, scaled down.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line bg-bg">
      <div className="pointer-events-none absolute inset-0 bg-stripes opacity-40" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[80%] bg-radial-orange opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40 mix-blend-overlay" />
      <div className={`container-x relative py-16 sm:py-24 ${align === "center" ? "text-center" : ""}`}>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="text-display mt-4 text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] text-text">
          {title}
        </h1>
        {lead && (
          <p className={`mt-5 max-w-2xl text-[16px] leading-relaxed text-text-dim ${align === "center" ? "mx-auto" : ""}`}>
            {lead}
          </p>
        )}
        {children && <div className={`mt-8 ${align === "center" ? "flex justify-center" : ""}`}>{children}</div>}
      </div>
    </section>
  );
}

/** Wrapper for medium-size content sections inside an inner page. */
export function PageSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative bg-bg py-16 sm:py-24 ${className}`}>
      <div className="container-x">{children}</div>
    </section>
  );
}

/** Long-form prose container — used by legal & support pages. */
export function ProsePage({
  children,
  lastUpdated,
}: {
  children: ReactNode;
  lastUpdated?: string;
}) {
  return (
    <PageSection>
      {lastUpdated && (
        <p className="text-mono text-[12px] uppercase tracking-widest text-text-muted">
          Last updated · {lastUpdated}
        </p>
      )}
      <article className="mt-6 max-w-3xl space-y-4 text-[15.5px] leading-relaxed text-text-dim [&_h2]:text-display [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-[1.6rem] [&_h2]:tracking-wide [&_h2]:text-text [&_h3]:mt-8 [&_h3]:mb-2 [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_h3]:text-text [&_p]:my-4 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_a]:text-orange [&_a]:underline [&_a:hover]:text-orange-bright [&_strong]:text-text [&_code]:bg-surface [&_code]:rounded [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] [&_code]:text-mono">
        {children}
      </article>
    </PageSection>
  );
}
