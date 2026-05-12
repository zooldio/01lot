"use client";

import { useEffect, useRef } from "react";

/**
 * Minimal cursor: a tiny dot that softly follows the mouse, expands to a
 * 28px ring on `[data-cursor="grow"]` elements. No mix-blend, faster follow,
 * cleaner read against any background.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const dot = dotRef.current!;
    let x = -100, y = -100, dx = -100, dy = -100;
    let target = 6;        // dot diameter
    let current = 6;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const grow = (e.target as HTMLElement | null)?.closest("[data-cursor='grow']");
      target = grow ? 30 : 6;
    };

    let raf = 0;
    const loop = () => {
      dx += (x - dx) * 0.35;
      dy += (y - dy) * 0.35;
      current += (target - current) * 0.18;
      const r = current / 2;
      dot.style.transform = `translate(${dx - r}px, ${dy - r}px)`;
      dot.style.width = dot.style.height = `${current}px`;
      dot.style.borderRadius = `${current}px`;
      dot.style.borderWidth = current > 12 ? "1px" : "0";
      dot.style.background = current > 12 ? "transparent" : "var(--orange)";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    document.addEventListener("mousemove", onMove);
    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden border-orange md:block"
      style={{ transition: "background 200ms, border-width 200ms" }}
    />
  );
}
