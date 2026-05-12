"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  countryByCode,
  flagOf,
  searchCountries,
  type Country,
} from "@/lib/countries";
import { cn } from "@/lib/utils";

type Props = {
  /** Selected dial-code country (ISO-2). */
  country: string;
  onCountryChange: (code: string) => void;
  /** Phone number digits only (without the dial code). */
  number: string;
  onNumberChange: (n: string) => void;
  /** Form field name for the digits portion. */
  name?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

/**
 * International phone input: country/dial-code picker on the left, free-form
 * number entry on the right. The dial-code picker is its own dropdown with
 * search; selecting a country sets the prefix shown in the trigger pill.
 *
 * The component does NOT validate against country-specific number formats —
 * keep that on the server, where you can use a real phone library
 * (libphonenumber). Here we just strip everything that isn't a digit / space
 * / dash / parenthesis from the digits field.
 */
export function PhoneInput({
  country,
  onCountryChange,
  number,
  onNumberChange,
  name = "phone",
  required,
  placeholder = "Phone number",
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selected = countryByCode(country);
  const list = useMemo(() => searchCountries(query), [query]);

  useEffect(() => setHighlight(0), [query]);

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => searchRef.current?.focus(), 30);
      return () => window.clearTimeout(id);
    }
  }, [open]);

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

  useEffect(() => {
    const el = listRef.current?.children[highlight] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight]);

  const pick = (c: Country) => {
    onCountryChange(c.code);
    setOpen(false);
    setQuery("");
  };

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const c = list[highlight];
      if (c) pick(c);
    }
  };

  const onNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip anything that isn't digit / space / dash / parens / dot
    const cleaned = e.target.value.replace(/[^\d\s\-().]/g, "");
    onNumberChange(cleaned);
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <div className="flex w-full overflow-hidden rounded-md border border-line-strong bg-bg-elev focus-within:border-orange focus-within:ring-4 focus-within:ring-orange/20">
        {/* Dial-code trigger */}
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={
            selected
              ? `Country code: ${selected.name} ${selected.dial}. Click to change.`
              : "Select country code"
          }
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "flex shrink-0 items-center gap-2 border-r border-line px-3 text-[14px] transition-colors hover:bg-white/[0.03]",
            open && "bg-white/[0.04]",
          )}
        >
          <span className="flag-row text-[16px] leading-none" aria-hidden>
            {selected ? flagOf(selected.code) : "🌐"}
          </span>
          <span className="text-mono text-[12.5px] tabular-nums text-text">
            {selected ? selected.dial : "+ —"}
          </span>
          <svg
            width="10"
            height="10"
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

        {/* Number input */}
        <input
          type="tel"
          name={name}
          required={required}
          inputMode="tel"
          autoComplete="tel-national"
          value={number}
          onChange={onNumberInput}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[14px] text-text placeholder:text-text-muted outline-none tabular-nums"
        />
      </div>

      {/* Optional hidden field carrying the FULL E.164-ish string. Useful so
       * the form submits "+44 7700 900000" rather than just "7700 900000". */}
      {name && (
        <input
          type="hidden"
          name={`${name}-full`}
          value={selected ? `${selected.dial} ${number}`.trim() : number}
          readOnly
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            role="listbox"
            className="absolute left-0 top-[calc(100%+6px)] z-50 w-full max-w-md overflow-hidden rounded-lg border border-line bg-bg-elev/95 shadow-2xl backdrop-blur-xl sm:w-[420px]"
          >
            <div className="border-b border-line p-2">
              <input
                ref={searchRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onSearchKey}
                placeholder="Search country or dial code…"
                className="w-full rounded-md border border-line-strong bg-bg/50 px-3 py-2 text-[13px] text-text placeholder:text-text-muted focus:border-orange/40 focus:outline-none"
                autoComplete="off"
              />
            </div>
            <div ref={listRef} className="max-h-72 overflow-y-auto py-1">
              {list.length === 0 ? (
                <div className="px-4 py-6 text-center text-[13px] text-text-muted">
                  No matches for &ldquo;{query}&rdquo;
                </div>
              ) : (
                list.map((c, i) => {
                  const selected = c.code === country;
                  return (
                    <button
                      key={c.code}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => pick(c)}
                      onMouseEnter={() => setHighlight(i)}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2 text-left text-[13.5px] transition-colors",
                        highlight === i
                          ? "bg-white/[0.05] text-text"
                          : "text-text-dim hover:bg-white/[0.03] hover:text-text",
                        selected && "text-orange",
                      )}
                    >
                      <span className="flag-row text-[16px] leading-none" aria-hidden>
                        {flagOf(c.code)}
                      </span>
                      <span className="flex-1 truncate">{c.name}</span>
                      <span className="text-mono text-[11.5px] text-text-muted tabular-nums">
                        {c.dial}
                      </span>
                    </button>
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
