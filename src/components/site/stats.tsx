"use client";

import { motion } from "motion/react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Sparkline } from "@/components/ui/sparkline";
import { stats } from "@/lib/copy";
import { SectionHeader } from "@/components/site/three-steps";

export function Stats() {
  return (
    <section className="bg-aurora relative overflow-hidden bg-bg py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-dots-fine opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent_85%)]" />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <SectionHeader eyebrow={stats.eyebrow} titleParts={stats.title} />
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {stats.items.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="glass group relative min-w-0 overflow-hidden p-7 transition-all hover:-translate-y-0.5"
              data-cursor="grow"
            >
              {/* corner accent */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Label + delta */}
              <div className="flex items-center justify-between">
                <div className="text-mono text-[10.5px] uppercase tracking-[0.2em] text-text-muted">
                  {s.label}
                </div>
                <div className="text-mono text-[10.5px] tabular-nums text-orange">
                  ▲ {s.delta}
                </div>
              </div>

              {/* Big number */}
              <div className="text-display mt-5 truncate text-[clamp(2.25rem,3.6vw,3.25rem)] leading-none text-text">
                <AnimatedCounter to={s.value} prefix={s.prefix} duration={2.2} />
              </div>

              {/* Sparkline */}
              <div className="relative mt-5 h-9">
                <Sparkline
                  values={s.trend}
                  width={260}
                  height={36}
                  stroke="#3dff55"
                  fill="#3dff55"
                  strokeWidth={1.5}
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
