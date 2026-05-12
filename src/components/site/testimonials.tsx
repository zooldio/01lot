"use client";

import { motion } from "motion/react";
import { testimonials } from "@/lib/copy";
import { SectionHeader } from "@/components/site/three-steps";
import { cn } from "@/lib/utils";

type Item = (typeof testimonials.items)[number];

/**
 * Testimonials — ten traders, ten countries. Mix of winners and losers, all
 * positive on the concept. Country flag + city + ELO + outcome chip on each
 * card. Quotes vary on tone to avoid a uniform copy block.
 */
export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-line bg-bg py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[40%] bg-radial-orange opacity-30" />
      <div className="container-x relative">
        <SectionHeader eyebrow={testimonials.eyebrow} titleParts={[...testimonials.title]} />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-[15px] leading-relaxed text-text-dim"
        >
          {testimonials.subtitle}
        </motion.p>

        {/* Card grid */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.items.map((item, i) => (
            <Card key={item.handle} item={item} delay={i * 0.05} />
          ))}
        </div>

        {/* Footer stats — 10 countries, ten flags in a row, decorative */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex flex-col items-center gap-4 border-t border-line pt-8 sm:flex-row sm:justify-between"
        >
          <div className="text-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
            64 countries · 3,241 traders live · 24/7
          </div>
          <div
            aria-hidden
            className="flag-row flex gap-1.5 text-[18px] leading-none"
          >
            {testimonials.items.map((it) => (
              <span key={it.country} title={it.country}>
                {it.flag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Card({ item, delay }: { item: Item; delay: number }) {
  const isWin = item.result === "win";
  return (
    <motion.figure
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -3 }}
      className="surface-card group relative flex h-full flex-col p-6 transition-colors hover:border-orange/40 sm:p-7"
      data-cursor="grow"
    >
      {/* Header row — flag + place */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flag-row grid h-9 w-9 shrink-0 place-items-center rounded-md bg-bg-elev text-[18px] leading-none ring-1 ring-line"
            aria-hidden
          >
            {item.flag}
          </span>
          <div className="min-w-0">
            <div className="text-[13.5px] font-medium text-text">{item.city}</div>
            <div className="mt-0.5 text-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
              {item.country}
            </div>
          </div>
        </div>

        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-1 text-mono text-[10.5px] font-semibold tabular-nums tracking-wider",
            isWin
              ? "bg-orange/12 text-orange ring-1 ring-orange/30"
              : "bg-cyan/10 text-cyan ring-1 ring-cyan/25",
          )}
        >
          {item.outcome}
        </span>
      </header>

      {/* Quote */}
      <blockquote className="mt-6 flex-1 text-[14.5px] leading-[1.55] text-text-dim">
        <span
          aria-hidden
          className="text-display mr-1 text-orange opacity-50"
          style={{ fontSize: "1.4em", lineHeight: 0 }}
        >
          “
        </span>
        {item.quote}
      </blockquote>

      {/* Footer row — handle + tier */}
      <footer className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <div className="text-mono text-[12px] font-medium text-text">{item.handle}</div>
        <div className="text-mono text-[10.5px] uppercase tracking-[0.18em] text-text-muted">
          {item.elo}
        </div>
      </footer>
    </motion.figure>
  );
}
