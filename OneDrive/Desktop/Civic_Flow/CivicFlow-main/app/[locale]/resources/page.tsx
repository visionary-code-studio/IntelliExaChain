import Link from "next/link";
import type { Metadata } from "next";
import NewsSearch from "@/components/resources/NewsSearch";

export const metadata: Metadata = {
  title: "Official Election Resources — CivicFlow",
  description: "Official election commission links, voter portals, and verified civic resources for India, US, UK, Nepal, Russia, China, Iran, North Korea, Italy, and more.",
};

const countries = [
  {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    system: "Parliamentary Republic",
    body: "Election Commission of India (ECI)",
    resources: [
      { label: "Voter Registration Portal", url: "https://voters.eci.gov.in" },
      { label: "ECI Official Website", url: "https://eci.gov.in" },
      { label: "Know Your Candidate", url: "https://affidavit.eci.gov.in" },
      { label: "NVSP (National Voters' Service Portal)", url: "https://www.nvsp.in" },
    ],
    note: "India uses EVMs with VVPAT. Voter ID (EPIC) or 12 alternative IDs accepted. Multi-phase national elections.",
  },
  {
    id: "usa",
    name: "United States",
    flag: "🇺🇸",
    system: "Federal Presidential Republic",
    body: "Federal Election Commission (FEC) + State Election Offices",
    resources: [
      { label: "USA Official Voting Portal", url: "https://vote.gov" },
      { label: "Federal Election Commission", url: "https://www.fec.gov" },
      { label: "USPS Vote by Mail", url: "https://www.usps.com/vote" },
    ],
    note: "Elections are administered by states. Voting methods, ID requirements, and registration deadlines vary by state.",
  },
  {
    id: "uk",
    name: "United Kingdom",
    flag: "🇬🇧",
    system: "Parliamentary Constitutional Monarchy",
    body: "Electoral Commission",
    resources: [
      { label: "Register to Vote", url: "https://www.gov.uk/register-to-vote" },
      { label: "Find Your Polling Station", url: "https://www.gov.uk/polling-station-finder" },
      { label: "Electoral Commission", url: "https://www.electoralcommission.org.uk" },
      { label: "Find Your MP", url: "https://www.parliament.uk/find-your-mp" },
    ],
    note: "Paper ballots, counted by hand. Photo ID required since 2023. Voter Authority Certificate available for those without photo ID.",
  },
  {
    id: "nepal",
    name: "Nepal",
    flag: "🇳🇵",
    system: "Federal Parliamentary Republic",
    body: "Election Commission of Nepal",
    resources: [
      { label: "Election Commission of Nepal", url: "https://www.election.gov.np" },
    ],
    note: "Nepal held its first federal elections after transitioning to a federal republic. Biometric registration introduced.",
  },
  {
    id: "russia",
    name: "Russia",
    flag: "🇷🇺",
    system: "Federal Semi-Presidential Republic",
    body: "Central Election Commission (CEC)",
    resources: [
      { label: "Central Election Commission of Russia", url: "https://www.cikrf.ru" },
    ],
    note: "Registration is automatic via residence registration (propiska). Presidential elections held every 6 years. International observers have raised concerns about election integrity.",
  },
  {
    id: "china",
    name: "China",
    flag: "🇨🇳",
    system: "Single-Party Socialist Republic",
    body: "National People's Congress Standing Committee",
    resources: [
      { label: "National People's Congress", url: "http://www.npc.gov.cn" },
    ],
    note: "Direct public elections are only held for local People's Congresses. Higher-level officials are elected by the respective People's Congresses, not directly by citizens. The Chinese Communist Party (CCP) guides candidate selection.",
  },
  {
    id: "northkorea",
    name: "North Korea",
    flag: "🇰🇵",
    system: "Single-Party Juche State",
    body: "Central Election Committee",
    resources: [],
    note: "Elections are held for the Supreme People's Assembly, but only one candidate appears per seat. Voting is effectively compulsory and turnout is officially reported at near 100%. No meaningful political competition exists.",
  },
  {
    id: "iran",
    name: "Iran",
    flag: "🇮🇷",
    system: "Islamic Republic",
    body: "Ministry of Interior / Guardian Council",
    resources: [
      { label: "Iran Ministry of Interior", url: "https://www.moi.ir" },
    ],
    note: "Candidates must be vetted and approved by the Guardian Council before they can stand for election. This significantly restricts the field of candidates. Voting is by paper ballot.",
  },
  {
    id: "italy",
    name: "Italy",
    flag: "🇮🇹",
    system: "Parliamentary Republic",
    body: "Ministry of Interior — Department for Internal Affairs and Territory",
    resources: [
      { label: "Italian Ministry of Interior", url: "https://www.interno.gov.it" },
      { label: "Italian Parliament", url: "https://www.parlamento.it" },
    ],
    note: "Italy uses a mixed proportional and majoritarian electoral system. Voting is by paper ballot. A 24-hour electoral silence applies before polls open.",
  },
];

export default async function ResourcesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div style={{ background: "var(--bg-ivory)", paddingTop: "96px" }}>
      {/* Header */}
      <div className="section-full py-14" style={{ background: "#1C1917" }}>
        <div className="container-civic text-center">
          <div className="text-4xl mb-3" aria-hidden="true">🌍</div>
          <h1 style={{ color: "white" }}>Official Election Resources</h1>
          <p className="mt-2 max-w-2xl mx-auto" style={{ color: "#A8A29E" }}>
            Verified links to official election commissions, voter portals, and civic resources across {countries.length}+ countries. Always use official sources to verify election information.
          </p>
          <div className="trust-badge mx-auto mt-6">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Official sources only — no third-party links
          </div>
        </div>
      </div>

      <section className="section">
        {/* Disclaimer */}
        <div className="p-5 rounded-2xl border mb-12 text-center" style={{ background: "var(--accent-light)", borderColor: "var(--clay-light)" }}>
          <p className="text-sm" style={{ color: "var(--clay)" }}>
            ⚠️ <strong>Important:</strong> Always verify election rules with your official national election authority. Rules change. CivicFlow is an educational guide only.
          </p>
        </div>

        {/* Live News Search */}
        <NewsSearch />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {countries.map((country) => (
            <div key={country.id} id={country.id} className="card space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl" aria-hidden="true">{country.flag}</span>
                <div>
                  <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{country.name}</h2>
                  <span className="badge badge-neutral text-xs">{country.system}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Electoral Body</p>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{country.body}</p>
              </div>

              <div className="p-3 rounded-xl text-sm" style={{ background: "var(--bg-sand)" }}>
                <p style={{ color: "var(--text-secondary)" }}>{country.note}</p>
              </div>

              {country.resources.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>Official Links</p>
                  {country.resources.map((r) => (
                    <a
                      key={r.url}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-md"
                      style={{ background: "var(--accent-light)", color: "var(--clay)" }}
                      aria-label={`${r.label} (opens in new tab)`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                      {r.label}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-xs p-3 rounded-xl" style={{ background: "var(--bg-sand)", color: "var(--text-muted)" }}>
                  No public official electoral portal available. Refer to state-owned media or official government websites.
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Ask assistant prompt */}
        <div className="mt-16 text-center rounded-3xl p-10" style={{ background: "#1C1917" }}>
          <p className="text-2xl font-bold mb-2" style={{ color: "white" }}>Have a specific question?</p>
          <p className="mb-6" style={{ color: "#A8A29E" }}>Ask CivicFlow&apos;s AI assistant about any country&apos;s election process.</p>
          <Link href={`/${locale}/assistant`} className="btn-primary text-base px-8 py-4">
            Ask the Civic Assistant →
          </Link>
        </div>
      </section>
    </div>
  );
}
