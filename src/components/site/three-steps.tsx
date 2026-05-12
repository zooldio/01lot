"use client";

import { motion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { steps } from "@/lib/copy";

const stepIcons = [Icon.Wallet, Icon.Sword, Icon.Trophy];

export function ThreeSteps() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-line bg-bg py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-stripes opacity-30" />
      <div className="container-x relative">
        <SectionHeader eyebrow={steps.eyebrow} titleParts={steps.title} />

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {steps.items.map((s, i) => {
            const I = stepIcons[i] ?? Icon.Bolt;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="surface-card group relative overflow-hidden p-6 transition-shadow hover:shadow-[0_20px_60px_-20px_rgba(255,90,31,0.35)]"
                data-cursor="grow"
              >
                {/* hover glow */}
                <div className="pointer-events-none absolute inset-0 -z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-radial-orange" />

                <div className="relative flex items-start justify-between">
                  <div className="text-display text-[2.6rem] leading-none text-orange/90 text-glow-orange">
                    {s.n}
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-line-strong bg-bg-elev text-text-dim transition-colors group-hover:border-orange/50 group-hover:text-orange">
                    <I className="h-5 w-5" />
                  </div>
                </div>

                <h3 className="text-display mt-6 text-2xl tracking-wide text-text">
                  {s.label}
                </h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-text-dim">
                  {s.body}
                </p>

                {/* footer accent line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-orange/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  titleParts,
  align = "left",
}: {
  eyebrow: string;
  titleParts: string[];
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="text-display mt-4 text-[clamp(2.25rem,5vw,4rem)] text-text">
        {titleParts.map((p, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="block"
          >
            {p}
            {i === titleParts.length - 1 ? null : null}
          </motion.span>
        ))}
      </h2>
    </div>
  );
}
