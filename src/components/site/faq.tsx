"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { faq } from "@/lib/copy";
import { SectionHeader } from "@/components/site/three-steps";

export function Faq() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-line bg-bg-elev py-24 sm:py-32"
    >
      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeader eyebrow={faq.eyebrow} titleParts={faq.title} />

        <Accordion.Root type="single" collapsible className="divide-y divide-line border-y border-line">
          {faq.items.map((it, i) => (
            <Accordion.Item key={it.q} value={`f-${i}`}>
              <Accordion.Header>
                <Accordion.Trigger
                  className="group flex w-full items-center justify-between gap-4 py-5 text-left text-[15.5px] font-medium uppercase tracking-wider text-text transition-colors hover:text-orange"
                  data-cursor="grow"
                >
                  <span>{it.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong text-text-dim transition-all group-hover:border-orange group-hover:text-orange group-data-[state=open]:rotate-45 group-data-[state=open]:border-orange group-data-[state=open]:text-orange">
                    <Icon.Plus className="h-4 w-4" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-[accClose_280ms_ease] data-[state=open]:animate-[accOpen_320ms_ease]">
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                  className="pb-6 pr-12 text-[14.5px] leading-relaxed text-text-dim"
                >
                  {it.a}
                </motion.p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>

      <style>{`
        @keyframes accOpen { from { height: 0 } to { height: var(--radix-accordion-content-height) } }
        @keyframes accClose { from { height: var(--radix-accordion-content-height) } to { height: 0 } }
      `}</style>
    </section>
  );
}
