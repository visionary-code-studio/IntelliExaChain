import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Footer({ locale, dict }: { locale: string; dict: any }) {
  const year = new Date().getFullYear();

  const footerLinks = {
    [dict.navigation.learn]: [
      { label: dict.navigation.timeline, href: `/${locale}/timeline` },
      { label: "Step-by-Step Guide", href: `/${locale}/learn` }, // Could add to dict
      { label: dict.navigation.glossary, href: `/${locale}/glossary` },
      { label: dict.navigation.checklist, href: `/${locale}/checklist` },
    ],
    "Get Help": [
      { label: dict.navigation.askAssistant, href: `/${locale}/assistant` },
      { label: dict.navigation.resources, href: `/${locale}/resources` },
      { label: "About CivicFlow", href: `/${locale}/about` },
    ],
    Countries: [
      { label: "India (ECI)", href: `/${locale}/resources#india` },
      { label: "United States", href: `/${locale}/resources#usa` },
      { label: "United Kingdom", href: `/${locale}/resources#uk` },
      { label: "More Countries", href: `/${locale}/resources` },
    ],
  };

  return (
    <footer
      className="border-t"
      style={{ background: "var(--bg-sand)", borderColor: "var(--border)" }}
      role="contentinfo"
    >
      <div className="container-civic py-16 pb-32 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={`/${locale}`} className="flex items-center gap-2.5 group w-fit">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background: "linear-gradient(135deg, #D97706, #92400E)" }}
                aria-hidden="true"
              >
                CF
              </div>
              <span className="font-bold text-xl tracking-tight" style={{ color: "var(--text-primary)" }}>
                Civic<span style={{ color: "var(--accent)" }}>Flow</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-secondary)" }}>
              Helping citizens understand elections worldwide through clear, neutral, and engaging civic education.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="trust-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Politically neutral
              </span>
              <span className="trust-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Educational only
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-muted)", fontSize: "0.7rem" }}>
                {section}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:underline"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 mt-12 border-t text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
        >
          <div className="flex flex-col gap-1">
            <p>© {year} CivicFlow. Built for civic education, not partisan purposes.</p>
            <p style={{ color: "var(--text-primary)", fontWeight: "500" }}>Powered by Vaibhav Shaw & Visionary_Coders Co.</p>
          </div>
          <p>
            Content is informational only.{" "}
            <span style={{ color: "var(--warning)" }}>
              Always verify with your local official election authority.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
