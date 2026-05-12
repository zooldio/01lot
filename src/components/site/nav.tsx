"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { nav } from "@/lib/copy";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[backdrop-filter,background] duration-300",
        scrolled
          ? "bg-bg/65 backdrop-blur-xl border-b border-line/60"
          : "bg-transparent"
      )}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="/" className="shrink-0" aria-label="01LOT home">
          <Logo />
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-text-dim transition-colors hover:text-text"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={nav.signInHref}
            className="hidden text-[13px] font-medium text-text-dim transition-colors hover:text-text md:inline-flex md:px-3 md:py-2"
          >
            {nav.signIn}
          </a>
          <MagneticButton href={nav.ctaHref} variant="primary" className="text-[12px]">
            {nav.cta} →
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
