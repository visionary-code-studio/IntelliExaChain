"use client";

import { usePathname, useRouter } from "next/navigation";
import { i18n, localeNames } from "@/i18n.config";
import { useState, useRef, useEffect } from "react";

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    setIsOpen(false);
    router.push(newPath);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-ghost flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-xl"
        aria-label="Change language"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <span className="hidden sm:inline uppercase text-xs font-semibold">{currentLocale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-[340px] rounded-xl shadow-xl overflow-hidden z-50 animate-fade-in py-2" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="max-h-[80vh] overflow-y-auto scrollbar-hide grid grid-cols-2 gap-1 px-2">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className="w-full text-left px-3 py-2 text-sm transition-colors rounded-lg font-medium"
                style={
                  currentLocale === locale
                    ? { color: "var(--accent)", background: "var(--accent-light)" }
                    : { color: "var(--text-primary)", background: "transparent" }
                }
                onMouseEnter={(e) => {
                  if (currentLocale !== locale) {
                    e.currentTarget.style.background = "var(--surface-2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (currentLocale !== locale) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
