import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn the Election Process — CivicFlow",
  description: "A beginner-friendly, step-by-step guide to understanding how elections work. Covers voter registration, the voting process, ballot counting, and result declaration.",
};

const learningFlow = [
  { q: "What is an election?", a: "An election is a formal process by which citizens choose their leaders and representatives by casting votes. It is the foundation of democracy — giving power to the people to decide who governs them.", emoji: "🗳️" },
  { q: "Who can vote?", a: "In most countries, any citizen above a minimum age (usually 18) who is registered on the electoral roll can vote. Some countries restrict voting based on residency, criminal history, or mental capacity. Check your country's specific eligibility rules.", emoji: "🙋" },
  { q: "How do you register?", a: "Voter registration is the process of adding your name to the official voters' list. In India, you register at voters.eci.gov.in. In the US, you register at vote.gov. In the UK, you register at gov.uk/register-to-vote. In most countries, you must register before a deadline.", emoji: "📝" },
  { q: "What happens before election day?", a: "Before election day, candidates are nominated, parties campaign, and the Model Code of Conduct takes effect. Voters receive their voter slips showing their booth location. It is important to verify your details and find your polling station in advance.", emoji: "📅" },
  { q: "What happens on election day?", a: "On election day, polling stations open early in the morning. Voters arrive, present their ID, have their name verified, enter a private booth, and cast their ballot — either on an EVM or via paper ballot. A mark is applied to the voter's finger to prevent double voting.", emoji: "✅" },
  { q: "How are votes counted?", a: "After polls close, ballot boxes or EVMs are transported under security to counting centers. Counting agents from each candidate observe the process. Votes are tallied in rounds, and results are tabulated with full transparency. Recounts can be requested if margins are very small.", emoji: "🔢" },
  { q: "How are results announced?", a: "Once counting is complete, the election commission officially declares the results. Winning candidates receive certificates of election. In parliamentary systems, the leader of the majority party is invited to form the government.", emoji: "🏆" },
  { q: "What happens after results?", a: "After results are confirmed, the elected government is formed. The winning party's leader is sworn in as head of government. The outgoing government enters caretaker mode. Defeated candidates may concede or file election petitions through the courts if they believe rules were violated.", emoji: "🎉" },
];

export default async function LearnPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div style={{ background: "var(--bg-ivory)", paddingTop: "96px" }}>
      {/* Header */}
      <div className="section-full py-14" style={{ background: "#1C1917" }}>
        <div className="container-civic text-center">
          <span className="badge" style={{ background: "rgba(217,119,6,0.2)", color: "#FCD34D" }}>Beginner Friendly</span>
          <h1 className="mt-4" style={{ color: "white" }}>Step-by-Step Election Guide</h1>
          <p className="mt-2 max-w-2xl mx-auto" style={{ color: "#A8A29E" }}>
            Everything you need to know about elections in 8 simple questions — from first principles to result declaration.
          </p>
        </div>
      </div>

      <section className="section max-w-3xl mx-auto">
        <div className="space-y-6">
          {learningFlow.map((step, i) => (
            <div key={i} className="card">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg, #D97706, #92400E)" }} aria-hidden="true">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl" aria-hidden="true">{step.emoji}</span>
                    <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{step.q}</h2>
                  </div>
                  <p style={{ color: "var(--text-secondary)" }}>{step.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Links to deeper content */}
        <div className="mt-12 card" style={{ background: "var(--accent-light)", borderColor: "var(--clay-light)" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--clay)" }}>Dive Deeper</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Full 8-Stage Timeline", href: `/${locale}/timeline`, icon: "📅" },
              { label: "Ask the AI Assistant", href: `/${locale}/assistant`, icon: "💬" },
              { label: "Election Glossary", href: `/${locale}/glossary`, icon: "📖" },
              { label: "Voter Checklist", href: `/${locale}/checklist`, icon: "✅" },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 p-3 rounded-xl transition-all hover:-translate-y-0.5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <span className="text-xl" aria-hidden="true">{item.icon}</span>
                <span className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{item.label}</span>
                <svg className="ml-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "var(--accent)" }} aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
