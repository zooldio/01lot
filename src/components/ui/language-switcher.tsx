"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { locales } from "@/lib/i18n";
import { useLocale } from "@/lib/i18n-context";
import { cn } from "@/lib/utils";

/**
 * Compact language switcher — flag + short code on the trigger, full menu of
 * eight locales with country flag + native-script label on open. Click
 * outside or Esc to close. Persists the choice via the LocaleProvider.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Click-outside + Esc to close
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = locales.find((l) => l.code === locale) ?? locales[0];

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${current.label}. Click to change.`}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-md border border-line-strong bg-bg-elev/50 px-2.5 text-[12px] font-medium text-text-dim transition-colors hover:border-orange/40 hover:text-text",
          open && "border-orange/50 text-text",
        )}
      >
        <span className="flag-row text-[15px] leading-none" aria-hidden>
          {current.flag}
        </span>
        <span className="text-mono text-[10.5px] uppercase tracking-[0.16em]">
          {current.short}
        </span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          className={cn("transition-transform", open && "rotate-180")}
          aria-hidden
        >
          <path
            d="M2.5 4 L5 6.5 L7.5 4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            aria-label="Language"
            className="absolute right-0 top-[calc(100%+8px)] z-50 w-52 overflow-hidden rounded-lg border border-line bg-bg-elev/95 p-1 shadow-2xl backdrop-blur-xl"
          >
            {locales.map((loc) => {
              const isActive = loc.code === locale;
              return (
                <button
                  key={loc.code}
                  role="option"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => {
                    setLocale(loc.code);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-2.5 py-2 text-left text-[13.5px] transition-colors",
                    isActive
                      ? "bg-orange/10 text-text"
                      : "text-text-dim hover:bg-white/[0.04] hover:text-text",
                  )}
                >
                  <span className="flag-row text-[18px] leading-none" aria-hidden>
                    {loc.flag}
                  </span>
                  <span className="flex-1 truncate">{loc.label}</span>
                  {isActive && (
                    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-orange" aria-hidden>
                      <path
                        d="M3 8.5 L6.5 12 L13 4.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
