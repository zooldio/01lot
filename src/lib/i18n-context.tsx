"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LOCALE,
  locales,
  lookup,
  type Locale,
  type TranslationKey,
} from "@/lib/i18n";

type LocaleCtx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey, fallback: string) => string;
};

const Ctx = createContext<LocaleCtx | null>(null);

const STORAGE_KEY = "01lot.locale";

function isLocale(s: string | null | undefined): s is Locale {
  return !!s && locales.some((l) => l.code === s);
}

/**
 * Reads the user's preferred locale from localStorage, then browser
 * navigator.language, then falls back to English. Server-side renders
 * always use the default to avoid hydration mismatches; the real locale
 * is picked up post-mount and applied client-side.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Detect preferred locale once mounted
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (isLocale(stored)) {
        setLocaleState(stored);
        document.documentElement.lang = stored;
        return;
      }
      const nav = window.navigator.language?.toLowerCase();
      if (nav) {
        // Try exact match (e.g. pt-br), then base (e.g. pt → pt-BR fallback)
        const exact = locales.find((l) => l.code.toLowerCase() === nav);
        if (exact) {
          setLocaleState(exact.code);
          document.documentElement.lang = exact.code;
          return;
        }
        const base = nav.split("-")[0];
        const baseMatch = locales.find((l) => l.code.toLowerCase().split("-")[0] === base);
        if (baseMatch) {
          setLocaleState(baseMatch.code);
          document.documentElement.lang = baseMatch.code;
        }
      }
    } catch {
      // localStorage / navigator can fail in sandboxed contexts — ignore
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {
      // ignore storage failures
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey, fallback: string) => lookup(locale, key, fallback),
    [locale],
  );

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, setLocale, t]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLocale() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useLocale must be used inside <LocaleProvider>");
  return v;
}

/** Convenience hook — returns just the translator function. */
export function useT() {
  return useLocale().t;
}
