"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function MobileBottomNav({ locale, dict }: { locale: string; dict: any }) {
  const pathname = usePathname();

  const tabs = [
    {
      label: dict.home,
      href: `/${locale}`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      ),
    },
    {
      label: dict.timeline,
      href: `/${locale}/timeline`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"/>
          <line x1="8" y1="12" x2="21" y2="12"/>
          <line x1="8" y1="18" x2="21" y2="18"/>
          <line x1="3" y1="6" x2="3.01" y2="6"/>
          <line x1="3" y1="12" x2="3.01" y2="12"/>
          <line x1="3" y1="18" x2="3.01" y2="18"/>
        </svg>
      ),
    },
    {
      label: dict.assistant,
      href: `/${locale}/assistant`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
        </svg>
      ),
    },
    {
      label: dict.checklist,
      href: `/${locale}/checklist`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"/>
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
        </svg>
      ),
    },
    {
      label: dict.glossary,
      href: `/${locale}/glossary`,
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass border-t lg:hidden pb-safe"
      style={{ borderColor: "var(--border)" }}
      aria-label="Mobile bottom navigation"
    >
      <div className="flex items-stretch justify-around px-2">
        {tabs.map((tab) => {
          const isActive = tab.href === `/${locale}`
            ? pathname === `/${locale}` || pathname === `/${locale}/`
            : pathname?.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center justify-center gap-1.5 py-4 transition-all duration-300 relative"
              style={{
                color: isActive ? "var(--accent)" : "var(--text-muted)",
              }}
              aria-current={isActive ? "page" : undefined}
              aria-label={tab.label}
            >
              {isActive && (
                <div 
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-b-full bg-amber-500 animate-fade-in" 
                  aria-hidden="true"
                />
              )}
              <span 
                className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`} 
                aria-hidden="true"
              >
                {tab.icon}
              </span>
              <span className={`text-[10px] font-bold tracking-tight ${isActive ? "opacity-100" : "opacity-70"}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
