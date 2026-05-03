import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CivicFlow — Our Mission",
  description: "CivicFlow is a civic education platform helping citizens understand elections worldwide through clear, neutral, and engaging content. Learn about our mission and values.",
};

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div style={{ background: "var(--bg-ivory)", paddingTop: "96px" }}>
      {/* Hero */}
      <div className="section-full py-20" style={{ background: "#1C1917" }}>
        <div className="container-civic max-w-3xl mx-auto text-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-6 shadow-xl"
            style={{ background: "linear-gradient(135deg, #D97706, #92400E)" }}
            aria-hidden="true"
          >
            CF
          </div>
          <h1 style={{ color: "white" }}>About CivicFlow</h1>
          <p className="mt-4 text-lg" style={{ color: "#A8A29E" }}>
            A civic education platform built to make elections understandable for everyone — first-time voters, students, teachers, and curious citizens worldwide.
          </p>
        </div>
      </div>

      <section className="section max-w-4xl mx-auto">
        {/* Mission */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Our Mission</h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Elections are one of the most important events in any democracy — yet millions of citizens, especially first-time voters, feel confused and unprepared. CivicFlow exists to change that.
          </p>
          <p className="mt-4" style={{ color: "var(--text-secondary)" }}>
            We believe that an informed voter is a more confident, more engaged citizen. By explaining the election process in clear, simple steps — with visual timelines, interactive tools, and an AI-powered assistant — CivicFlow helps people navigate the full journey from voter registration to result declaration.
          </p>
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {[
            { emoji: "🛡️", title: "Politically Neutral", desc: "CivicFlow does not endorse, support, or oppose any political party, candidate, or ideology. Our content is factual, balanced, and strictly educational." },
            { emoji: "📚", title: "Educational First", desc: "Everything we build serves one purpose: to educate. Not to influence, promote, or politicize. We are a learning tool, not a campaign platform." },
            { emoji: "🌍", title: "Global Perspective", desc: "Elections work differently in India, the US, the UK, Nepal, Russia, China, Iran, North Korea, and beyond. We cover them all — with context and nuance." },
            { emoji: "🔍", title: "Accuracy & Trust", desc: "We source information from official election authorities and civic documentation. Where information may vary or change, we direct users to official sources." },
            { emoji: "♿", title: "Accessible to All", desc: "CivicFlow is built with accessibility in mind — keyboard navigation, screen reader support, high contrast, and plain language. Civic education is for everyone." },
            { emoji: "📱", title: "Mobile First", desc: "Most of our users are on mobile. Every feature — from the timeline to the AI assistant — is designed to work beautifully on any screen size." },
          ].map((value) => (
            <div key={value.title} className="card">
              <div className="text-3xl mb-3" aria-hidden="true">{value.emoji}</div>
              <h3 className="font-bold text-base mb-2" style={{ color: "var(--text-primary)" }}>{value.title}</h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{value.desc}</p>
            </div>
          ))}
        </div>

        {/* What we are not */}
        <div className="card mb-8" style={{ background: "var(--accent-light)", borderColor: "var(--clay-light)" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--clay)" }}>What CivicFlow Is NOT</h2>
          <ul className="space-y-2">
            {[
              "A tool to tell you who to vote for",
              "A replacement for your official election commission website",
              "A source of legal or political advice",
              "A platform that supports or opposes any government, party, or candidate",
              "A voting app — you cannot vote here",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#FEE2E2" }} aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Built with */}
        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>Built With</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Next.js 14", desc: "App Router, SSR, SSG" },
              { label: "TypeScript", desc: "Type-safe codebase" },
              { label: "Tailwind CSS", desc: "Civic design system" },
              { label: "OpenAI GPT-4o", desc: "AI civic assistant" },
              { label: "Firebase", desc: "Auth + Firestore DB" },
              { label: "Framer Motion", desc: "Smooth animations" },
            ].map((tech) => (
              <div key={tech.label} className="p-3 rounded-xl" style={{ background: "var(--bg-sand)" }}>
                <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{tech.label}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center rounded-3xl p-12" style={{ background: "#1C1917" }}>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "white" }}>Ready to Learn?</h2>
          <p className="mb-8" style={{ color: "#A8A29E" }}>Start with the election timeline or ask the assistant your first question.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/${locale}/timeline`} className="btn-primary text-base px-8 py-4">Explore the Timeline →</Link>
            <Link href={`/${locale}/assistant`} className="btn-secondary text-base px-8 py-4">Ask a Question</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
