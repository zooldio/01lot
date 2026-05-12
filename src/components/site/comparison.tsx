"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { compare } from "@/lib/copy";
import { SectionHeader } from "@/components/site/three-steps";
import { cn } from "@/lib/utils";

type ColId = (typeof compare.columns)[number]["id"];
type Row = (typeof compare.rows)[number];

export function Comparison() {
  const [active, setActive] = useState<"prop" | "broker" | "social">("prop");
  const cols: { id: ColId; label: string }[] = [
    compare.columns[0], // 01lot
    compare.columns.find((c) => c.id === active)!,
  ];

  return (
    <section
      id="compare"
      className="relative overflow-hidden border-y border-line bg-bg-elev py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent_75%)]" />
      <div className="container-x relative">
        <SectionHeader eyebrow={compare.eyebrow} titleParts={compare.title} />

        {/* Tabs */}
        <div role="tablist" className="mt-10 flex flex-wrap gap-2 border-b border-line">
          {compare.tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id as "prop" | "broker" | "social")}
              className={cn(
                "relative px-4 py-3 text-[13px] font-medium uppercase tracking-wider transition-colors",
                active === t.id ? "text-text" : "text-text-muted hover:text-text-dim"
              )}
              data-cursor="grow"
            >
              {t.label}
              {active === t.id && (
                <motion.span
                  layoutId="cmp-indicator"
                  className="absolute inset-x-2 -bottom-px h-[2px] bg-orange"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="mt-8 overflow-hidden rounded-xl border border-line bg-surface">
          <div className="grid grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))] border-b border-line bg-bg-elev/60 text-[12px] uppercase tracking-wider text-text-muted">
            <div className="p-4">Feature</div>
            {cols.map((c) => (
              <div
                key={c.id}
                className={cn(
                  "p-4 text-center font-semibold",
                  c.id === "01lot" ? "text-orange" : "text-text-dim"
                )}
              >
                {c.label}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {compare.rows.map((row: Row, i) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="grid grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))] border-t border-line first:border-t-0"
                >
                  <div className="px-4 py-4 text-[14px] text-text-dim">
                    {row.feature}
                  </div>
                  {cols.map((c) => {
                    const val = row[c.id as keyof Row] as boolean;
                    return (
                      <div
                        key={c.id}
                        className="flex items-center justify-center px-4 py-4"
                      >
                        {val ? (
                          <span
                            className={cn(
                              "inline-flex h-7 w-7 items-center justify-center rounded-full",
                              c.id === "01lot"
                                ? "bg-orange/15 text-orange ring-1 ring-orange/40"
                                : "bg-cyan/10 text-cyan ring-1 ring-cyan/30"
                            )}
                          >
                            <Icon.Check className="h-4 w-4" />
                          </span>
                        ) : (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-line/50 text-text-muted ring-1 ring-line">
                            <Icon.X className="h-4 w-4" />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
