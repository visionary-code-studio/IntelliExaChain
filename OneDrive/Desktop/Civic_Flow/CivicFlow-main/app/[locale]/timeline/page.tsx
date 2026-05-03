import Link from "next/link";
import { timelineStages } from "@/lib/data/timeline";
import type { Metadata } from "next";
import { FadeInUp } from "@/components/ui/FadeInUp";

export const metadata: Metadata = {
  title: "Election Timeline — CivicFlow",
  description: "Explore the full 8-stage election timeline — from voter registration to result declaration. Interactive, visual, and easy to follow.",
};

export default async function TimelinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div style={{ background: "var(--bg-ivory)", paddingTop: "96px" }}>
      {/* Header */}
      <div className="section-full py-16" style={{ background: "#1C1917" }}>
        <div className="container-civic text-center">
          <span className="badge" style={{ background: "rgba(217,119,6,0.2)", color: "#FCD34D" }}>8 Stages</span>
          <h1 className="mt-4 mb-4" style={{ color: "white" }}>The Election Timeline</h1>
          <p className="max-w-2xl mx-auto text-lg" style={{ color: "#A8A29E" }}>
            Follow the complete election process from beginning to end. Click any stage to dive deeper.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {["Pre-Election", "Election Day", "Post-Election"].map((phase) => (
              <span key={phase} className="px-4 py-1.5 rounded-full text-sm font-medium border" style={{ borderColor: "rgba(255,255,255,0.15)", color: "#D6D3CE" }}>
                {phase}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <section className="section py-16">
        <div className="max-w-3xl mx-auto">
          <div className="relative timeline-rail pl-14">
            {timelineStages.map((stage, index) => (
              <FadeInUp key={stage.slug} delay={index * 0.1}>
              <div className="mb-12 relative">
                {/* Connector dot */}
                <div
                  className="absolute -left-14 top-5 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white z-10 shadow-md animate-pulse-dot"
                  style={{ background: stage.color }}
                  aria-hidden="true"
                >
                  {stage.id}
                </div>

                {/* Card */}
                <Link href={`/timeline/${stage.slug}`} className="card card-clickable group block" aria-label={`Stage ${stage.id}: ${stage.title} — ${stage.summary}`}>
                  <div className="flex items-start gap-6">
                    <div className="text-4xl flex-shrink-0 mt-1" aria-hidden="true">{stage.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="badge badge-neutral text-xs">{stage.phase}</span>
                        <span className="text-xs" style={{ color: "var(--text-muted)" }}>{stage.duration}</span>
                      </div>
                      <h2 className="text-xl font-bold mb-2" style={{ fontSize: "1.15rem", color: "var(--text-primary)" }}>{stage.title}</h2>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{stage.summary}</p>

                      {/* What you should do */}
                      <div className="rounded-xl p-4" style={{ background: "var(--accent-light)" }}>
                        <p className="text-xs font-semibold mb-2" style={{ color: "var(--clay)" }}>What you should do here:</p>
                        <ul className="space-y-1">
                          {stage.voterAction.slice(0, 2).map((action) => (
                            <li key={action} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-secondary)" }}>
                              <svg className="mt-0.5 flex-shrink-0" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-4 flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all" style={{ color: "var(--accent)" }}>
                        Deep dive into Stage {stage.id}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              </FadeInUp>
            ))}

            {/* End marker */}
            <FadeInUp delay={0.8}>
            <div className="flex items-center gap-6 mt-8">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl bg-green-100 shadow-sm" aria-hidden="true">🎉</div>
              <p className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>You now understand the full election process!</p>
            </div>
            </FadeInUp>
          </div>
        </div>

        {/* Bottom CTA */}
        <FadeInUp delay={0.2}>
        <div className="mt-20 text-center">
          <p className="mb-6 text-xl font-bold" style={{ color: "var(--text-primary)" }}>Ready to prepare for election day?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href={`/${locale}/checklist`} className="btn-primary py-3 px-6">Start Your Voter Checklist →</Link>
            <Link href={`/${locale}/assistant`} className="btn-secondary py-3 px-6">Ask a Question</Link>
          </div>
        </div>
        </FadeInUp>
      </section>
    </div>
  );
}
