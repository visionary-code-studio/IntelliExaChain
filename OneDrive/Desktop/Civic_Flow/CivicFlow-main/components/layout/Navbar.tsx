"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Navbar({ locale, dict }: { locale: string; dict: any }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: dict.home, href: `/${locale}` },
    { label: dict.timeline, href: `/${locale}/timeline` },
    { label: dict.learn, href: `/${locale}/learn` },
    { label: dict.assistant, href: `/${locale}/assistant` },
    { label: dict.glossary, href: `/${locale}/glossary` },
    { label: dict.checklist, href: `/${locale}/checklist` },
    { label: dict.resources, href: `/${locale}/resources` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-civic-md" : "bg-transparent"
      }`}
      role="banner"
    >
      <div className="container-civic">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2.5 group" aria-label="CivicFlow Home">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-accent transition-transform group-hover:scale-105"
              style={{ background: "linear-gradient(135deg, #D97706, #92400E)" }}
              aria-hidden="true"
            >
              CF
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>
              Civic<span style={{ color: "var(--accent)" }}>Flow</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {navLinks.map((link) => {
              // Special handling for the home route matching
              const isActive = link.href === `/${locale}` 
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`btn-ghost text-sm ${
                    isActive
                      ? "font-semibold"
                      : ""
                  }`}
                  style={isActive ? { color: "var(--accent)", background: "var(--accent-light)" } : {}}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA & Toggles */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle />
            {pathname !== `/${locale}/assistant` && (
              <Link href={`/${locale}/assistant`} className="btn-primary text-sm px-5 py-2.5 ml-1">
                {dict.askAssistant}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile toggles (No Hamburger) */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
