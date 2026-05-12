"use client";

import { motion } from "motion/react";
import { payments } from "@/lib/copy";
import { SectionHeader } from "@/components/site/three-steps";
import { PaymentIcon } from "@/components/ui/payment-icons";

/**
 * Homepage payments section — shows every supported rail grouped by category.
 * Visual treatment matches the rest of the site (eyebrow + display title +
 * surface cards). Each rail is a compact card with a glyph + name + note.
 */
export function Payments() {
  return (
    <section
      id="payments"
      className="relative overflow-hidden border-y border-line bg-bg py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] bg-radial-orange opacity-40" />
      <div className="container-x relative">
        <SectionHeader eyebrow={payments.eyebrow} titleParts={[...payments.title]} />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl text-[15px] leading-relaxed text-text-dim"
        >
          {payments.subtitle}
        </motion.p>

        <div className="mt-14 space-y-12">
          {payments.categories.map((cat) => (
            <Category key={cat.id} label={cat.label} methods={cat.methods} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6"
        >
          <p className="max-w-2xl text-[12.5px] text-text-muted">{payments.feeNote}</p>
          <a
            href={payments.ctaHref}
            className="text-mono text-[12px] uppercase tracking-widest text-orange transition hover:text-orange-bright"
          >
            {payments.cta} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Category({
  label,
  methods,
}: {
  label: string;
  methods: ReadonlyArray<{ name: string; note: string }>;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <h3 className="text-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
          {label}
        </h3>
        <span className="h-px flex-1 bg-line" />
        <span className="text-mono text-[10.5px] tabular-nums text-text-muted">
          {methods.length}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {methods.map((m, i) => (
          <MethodCard key={m.name} name={m.name} note={m.note} delay={i * 0.04} />
        ))}
      </div>
    </div>
  );
}

function MethodCard({ name, note, delay }: { name: string; note: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      className="surface-card group flex items-center gap-3 p-4 transition-colors hover:border-orange/40"
      data-cursor="grow"
    >
      <div className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-lg ring-1 ring-line transition-shadow group-hover:ring-orange/40 group-hover:shadow-[0_0_18px_-4px_rgba(61,255,85,0.55)]">
        <PaymentIcon name={name} className="h-full w-full" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[14px] font-medium text-text">{name}</div>
        <div className="mt-0.5 truncate text-[11.5px] text-text-muted">{note}</div>
      </div>
    </motion.div>
  );
}
