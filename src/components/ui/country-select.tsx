"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  countries,
  countryByCode,
  COUNTRY_COUNT,
  flagOf,
  searchCountries,
  type CountryRow,
} from "@/lib/countries";
import { cn } from "@/lib/utils";

type Props = {
  /** Selected ISO code (controlled). Empty string = no selection. */
  value: string;
  onChange: (code: string) => void;
  placeholder?: string;
  /** Optional name attribute for forms. */
  name?: string;
  required?: boolean;
  /** Show the dial code next to the country name in options. */
  showDial?: boolean;
  className?: string;
};

/**
 * Searchable country dropdown — replaces a native `<select>` with a typeahead
 * list that shows flag + name (+ optional dial code). Click-outside / Esc to
 * close. Highlighted option follows arrow keys; Enter selects.
 */
export function CountrySelect({
  value,
  onChange,
  placeholder = "Select your country",
  name,
  required,
  showDial = false,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = countryByCode(value);
  const list = useMemo(() => searchCountries(query), [query]);

  // Reset highlight when filter changes
  useEffect(() => {
    setHighlight(0);
  }, [query]);

  // Focus search when opening
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Click-outside / Esc
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Scroll highlighted into view
  useEffect(() => {
    const el = listRef.current?.children[highlight] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = list[highlight];
      if (pick) {
        onChange(pick.code);
        setOpen(false);
        setQuery("");
      }
    }
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      {/* Hidden input so the value participates in form submission */}
      {name && (
        <input type="hidden" name={name} value={value} required={required} readOnly />
      )}

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex w-full items-center gap-3 rounded-md border border-line-strong bg-bg-elev px-4 py-3 text-left text-[14px] outline-none transition focus:border-orange focus:ring-4 focus:ring-orange/20",
          selected ? "text-text" : "text-text-muted",
          open && "border-orange ring-4 ring-orange/20",
        )}
      >
        {selected ? (
          <>
            <span className="flag-row text-[18px] leading-none" aria-hidden>
              {flagOf(selected.code)}
            </span>
            <span className="flex-1 truncate">{selected.name}</span>
            {showDial && (
              <span className="text-mono text-[12px] text-text-muted">{selected.dial}</span>
            )}
          </>
        ) : (
          <span className="flex-1 truncate">{placeholder}</span>
        )}
        <svg
          width="12"
          height="12"
          viewBox="0 0 10 10"
          fill="none"
          className={cn("text-text-muted transition-transform", open && "rotate-180")}
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
            initial={{ opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-80 overflow-hidden rounded-lg border border-line bg-bg-elev/95 shadow-2xl backdrop-blur-xl"
            role="listbox"
          >
            <div className="border-b border-line p-2">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Search country, code, or dial…"
                className="w-full rounded-md border border-line-strong bg-bg/50 px-3 py-2 text-[13px] text-text placeholder:text-text-muted focus:border-orange/40 focus:outline-none"
                autoComplete="off"
              />
              <div className="mt-1.5 flex items-center justify-between px-1 text-mono text-[10.5px] uppercase tracking-[0.16em] text-text-muted">
                <span>
                  {query
                    ? `${list.length} of ${COUNTRY_COUNT}`
                    : `${COUNTRY_COUNT} countries`}
                </span>
                <span>↑↓ navigate · ↵ select</span>
              </div>
            </div>
            <div
              ref={listRef}
              className="max-h-64 overflow-y-auto py-1"
            >
              {list.length === 0 ? (
                <div className="px-4 py-6 text-center text-[13px] text-text-muted">
                  No countries match &ldquo;{query}&rdquo;
                </div>
              ) : (
                list.map((c, i) => {
                  const prev = list[i - 1];
                  const showDivider = !query && (i === 0 || (prev && prev.section !== c.section));
                  return (
                    <div key={c.code}>
                      {showDivider && (
                        <div className="px-4 pb-1 pt-3 text-mono text-[9.5px] font-semibold uppercase tracking-[0.18em] text-text-muted">
                          {c.section === "popular" ? "Popular" : "All countries · A–Z"}
                        </div>
                      )}
                      <Row
                        c={c}
                        active={highlight === i}
                        selected={c.code === value}
                        showDial={showDial}
                        onClick={() => {
                          onChange(c.code);
                          setOpen(false);
                          setQuery("");
                        }}
                        onHover={() => setHighlight(i)}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Row({
  c,
  active,
  selected,
  showDial,
  onClick,
  onHover,
}: {
  c: CountryRow;
  active: boolean;
  selected: boolean;
  showDial: boolean;
  onClick: () => void;
  onHover: () => void;
}) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      onClick={onClick}
      onMouseEnter={onHover}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-2 text-left text-[13.5px] transition-colors",
        active
          ? "bg-white/[0.05] text-text"
          : "text-text-dim hover:bg-white/[0.03] hover:text-text",
        selected && "text-orange",
      )}
    >
      <span className="flag-row text-[16px] leading-none" aria-hidden>
        {flagOf(c.code)}
      </span>
      <span className="flex-1 truncate">{c.name}</span>
      {showDial && (
        <span className="text-mono text-[11.5px] text-text-muted">{c.dial}</span>
      )}
      {selected && !showDial && (
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
}

// Re-export for convenience
export { countries };
