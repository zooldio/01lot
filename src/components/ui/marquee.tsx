"use client";

import { cn } from "@/lib/utils";

export function Marquee({
  items,
  className,
  itemClassName,
  gap = 48,
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
  gap?: number;
}) {
  // duplicate so animation can loop seamlessly with translateX(-50%)
  const doubled = [...items, ...items];
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className="flex w-max animate-marquee whitespace-nowrap"
        style={{ gap: `${gap}px` }}
      >
        {doubled.map((it, i) => (
          <span key={i} className={cn("shrink-0", itemClassName)}>
            {it}
          </span>
        ))}
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
