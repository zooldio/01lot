"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/logo";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { nav } from "@/lib/copy";
import { useT } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

// Translation key per nav entry, ordered the same as nav.links in copy.ts
const NAV_KEYS = ["nav.howItWorks", "nav.modes", "nav.compare", "nav.faq"] as const;

export function Nav() {
  const t = useT();
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
          {nav.links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-text-dim transition-colors hover:text-text"
            >
              {t(NAV_KEYS[i], l.label)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={nav.signInHref}
            className="hidden text-[13px] font-medium text-text-dim transition-colors hover:text-text md:inline-flex md:px-3 md:py-2"
          >
            {t("nav.signIn", nav.signIn)}
          </a>
          <LanguageSwitcher />
          <MagneticButton href={nav.ctaHref} variant="primary" className="text-[12px]">
            {t("nav.cta", nav.cta)} →
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
