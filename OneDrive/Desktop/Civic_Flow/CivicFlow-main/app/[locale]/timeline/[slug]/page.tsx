import { notFound } from "next/navigation";
import Link from "next/link";
import { getStageBySlug, getAdjacentStages, timelineStages } from "@/lib/data/timeline";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return timelineStages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const stage = getStageBySlug(slug);
  if (!stage) return { title: "Not Found — CivicFlow" };
  return {
    title: `${stage.title} — CivicFlow Election Timeline`,
    description: stage.description,
  };
}

export default async function StageDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const stage = getStageBySlug(slug);
  if (!stage) notFound();
  const { prev, next } = getAdjacentStages(slug);

  return (
    <div style={{ background: "var(--bg-ivory)", paddingTop: "96px" }}>
      {/* Header */}
      <div className="section-full py-12" style={{ background: "#1C1917" }}>
        <div className="container-civic">
          <Link href={`/${locale}/timeline`} className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:opacity-80" style={{ color: "#A8A29E" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to Timeline
          </Link>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="step-number">{stage.id}</span>
            <span className="badge" style={{ background: "rgba(217,119,6,0.2)", color: "#FCD34D" }}>{stage.phase}</span>
            <span className="text-sm" style={{ color: "#78716C" }}>{stage.duration}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-5xl" aria-hidden="true">{stage.emoji}</span>
            <h1 style={{ color: "white" }}>{stage.title}</h1>
          </div>
          <p className="mt-4 text-lg max-w-2xl" style={{ color: "#A8A29E" }}>{stage.summary}</p>
        </div>
      </div>

      <div className="container-civic py-12">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Overview</h2>
              <p style={{ color: "var(--text-secondary)" }}>{stage.description}</p>
            </div>

            {/* What happens */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>What Happens During This Stage</h2>
              <ul className="space-y-3">
                {stage.whatHappens.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" style={{ background: "var(--accent-light)" }} aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--clay)" }}><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why it matters */}
            <div className="card" style={{ borderColor: "var(--clay-light)", background: "var(--accent-light)" }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: "var(--clay)" }}>Why This Matters</h2>
              <p style={{ color: "var(--text-secondary)" }}>{stage.whyItMatters}</p>
            </div>

            {/* Common mistakes */}
            <div className="card">
              <h2 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>Common Mistakes to Avoid</h2>
              <ul className="space-y-3">
                {stage.commonMistakes.map((mistake) => (
                  <li key={mistake} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0" style={{ background: "#FEE2E2" }} aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ color: "#DC2626" }}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </div>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{mistake}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="card">
              <h2 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
              <div className="space-y-6">
                {stage.faq.map((item) => (
                  <div key={item.question} className="border-b pb-6 last:border-b-0 last:pb-0" style={{ borderColor: "var(--border)" }}>
                    <p className="font-semibold mb-2" style={{ color: "var(--text-primary)" }}>{item.question}</p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Country notes */}
            <div className="card">
              <h2 className="text-lg font-bold mb-6" style={{ color: "var(--text-primary)" }}>How It Works Around the World</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {stage.countryNotes.map((cn) => (
                  <div key={cn.country} className="p-4 rounded-xl border" style={{ background: "var(--bg-sand)", borderColor: "var(--border)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl" aria-hidden="true">{cn.flag}</span>
                      <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{cn.country}</span>
                    </div>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>{cn.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Voter checklist for this stage */}
            <div className="card sticky top-24">
              <h2 className="text-base font-bold mb-4" style={{ color: "var(--text-primary)" }}>Your Checklist for This Stage</h2>
              <ul className="space-y-3">
                {stage.checklistItems.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <div className="w-5 h-5 rounded border-2 mt-0.5 flex-shrink-0" style={{ borderColor: "var(--accent)" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/checklist`} className="btn-primary w-full justify-center mt-6 text-sm">
                Track My Progress →
              </Link>
            </div>

            {/* Ask assistant */}
            <div className="card" style={{ background: "#1C1917" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "white" }}>Have a question about {stage.shortTitle}?</p>
              <p className="text-xs mb-4" style={{ color: "#78716C" }}>Ask CivicFlow&apos;s AI assistant in plain language.</p>
              <Link href={`/${locale}/assistant?q=${encodeURIComponent(`Explain ${stage.title} in simple words`)}`} className="btn-primary w-full justify-center text-sm">
                Ask the Assistant →
              </Link>
            </div>
          </aside>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 mt-12 pt-8 border-t" style={{ borderColor: "var(--border)" }}>
          {prev ? (
            <Link href={`/${locale}/timeline/${prev.slug}`} className="flex-1 card card-clickable group flex items-center gap-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Previous Stage</p>
                <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{prev.emoji} {prev.title}</p>
              </div>
            </Link>
          ) : <div className="flex-1" />}
          {next ? (
            <Link href={`/${locale}/timeline/${next.slug}`} className="flex-1 card card-clickable group flex items-center gap-4 justify-end text-right">
              <div>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Next Stage</p>
                <p className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{next.emoji} {next.title}</p>
              </div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </div>
  );
}
