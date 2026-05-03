import Link from "next/link";
import { FadeInUp } from "@/components/ui/FadeInUp";
import { 
  CheckCircle2, 
  BookOpen, 
  Globe, 
  MessageSquare,
  ShieldCheck,
  Search,
} from "lucide-react";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <div className="bg-civic-ivory min-h-screen">
      {/* ===== PREMIUM HERO WITH LIVING BACKGROUND ===== */}
      <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
        {/* Living Background Video Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-stone-900" aria-hidden="true">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105"
          >
            <source src="/Civic_Flow.mp4" type="video/mp4" />
          </video>
          {/* Multi-stage mask for depth and readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
          <div className="absolute inset-0 backdrop-blur-[1px]" />
        </div>

        <div className="container-civic relative z-10 py-24 md:py-32 w-full">
          <div className="max-w-4xl">
            <FadeInUp>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold mb-8 backdrop-blur-xl shadow-civic-lg">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="tracking-wide">Politically Neutral · Global Election Guide</span>
              </div>

              <h1 className="text-white mb-8 text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
                Demystifying <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-600">Democracy</span>
              </h1>

              <p className="text-lg md:text-2xl leading-relaxed mb-12 text-stone-300 max-w-2xl font-medium">
                Master the complexities of the electoral process with our interactive, AI-powered civic education guide. From registration to results.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <Link href={`/${locale}/timeline`} className="btn-primary text-lg px-10 py-5 bg-amber-600 hover:bg-amber-500 text-white rounded-2xl shadow-accent transition-all hover:scale-105 active:scale-95">
                  Start Your Journey
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="ml-2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href={`/${locale}/assistant`} className="btn-secondary text-lg px-10 py-5 bg-white/5 hover:bg-white/15 text-white border-white/20 backdrop-blur-xl rounded-2xl transition-all hover:scale-105 active:scale-95">
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Ask Assistant
                </Link>
              </div>
            </FadeInUp>
          </div>
        </div>

        {/* Scroll Indicator (Desktop Only) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce opacity-50">
          <span className="text-[10px] uppercase tracking-widest text-white font-bold">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* ===== SOCIAL PROOF / STATS STRIP ===== */}
      <section className="relative z-20 -mt-12 container-civic mb-24">
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-civic-xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center border border-white/10">
          {[
            { label: "Stages", val: "8", icon: "📍" },
            { label: "Glossary Terms", val: "37+", icon: "📖" },
            { label: "Countries", val: "10+", icon: "🌍" },
            { label: "Accuracy", val: "100%", icon: "✅" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-2xl mb-2">{stat.icon}</span>
              <span className="text-3xl font-black text-civic-primary leading-none">{stat.val}</span>
              <span className="text-xs uppercase tracking-widest font-bold text-civic-muted mt-2">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CORE JOURNEY (GRID) ===== */}
      <section className="section py-24 bg-civic-sand/30" aria-labelledby="journey-heading">
        <div className="container-civic">
          <FadeInUp>
            <div className="text-center mb-20">
              <span className="badge px-4 py-1.5 mb-6 shadow-sm">Guided Experience</span>
              <h2 id="journey-heading" className="text-4xl md:text-6xl font-black tracking-tight text-civic-primary">The Interactive Path</h2>
              <p className="mt-6 text-civic-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                We&apos;ve distilled complex constitutional laws into simple, digestible stages that anyone can understand.
              </p>
            </div>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Voter Registration", 
                desc: "The first and most crucial step. Learn who can vote and how to get on the official list.",
                stage: "Stage 01",
                slug: "voter-registration"
              },
              { 
                title: "Campaign Period", 
                desc: "Understanding the rules of political competition and the Model Code of Conduct.",
                stage: "Stage 04",
                slug: "campaign-period"
              },
              { 
                title: "Election Day", 
                desc: "What to expect at the polling station, from ID verification to casting your ballot.",
                stage: "Stage 05",
                slug: "election-day"
              },
            ].map((card, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <Link href={`/${locale}/timeline/${card.slug}`} className="group relative block p-10 bg-civic-surface rounded-3xl border border-civic-border shadow-civic-md transition-all hover:shadow-civic-lg hover:-translate-y-2 hover:border-amber-500/30 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600 mb-6 block">{card.stage}</span>
                  <h3 className="text-2xl font-black text-civic-primary mb-4 leading-tight group-hover:text-amber-700 transition-colors">{card.title}</h3>
                  <p className="text-civic-secondary leading-relaxed mb-8">{card.desc}</p>
                  <span className="inline-flex items-center text-sm font-bold text-civic-primary gap-2 group-hover:gap-3 transition-all">
                    Explore Stage <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </Link>
              </FadeInUp>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href={`/${locale}/timeline`} className="inline-flex items-center gap-3 font-bold text-civic-primary hover:text-amber-600 transition-colors group">
              View all 8 stages of the journey 
              <span className="w-10 h-10 rounded-full bg-civic-surface-2 flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONVERSATIONAL AI BLOCK ===== */}
      <section className="py-24 bg-civic-primary text-white overflow-hidden relative" aria-labelledby="ai-heading">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container-civic max-w-6xl relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
              <FadeInUp>
                <span className="text-amber-500 font-black uppercase tracking-widest text-xs mb-6 block">Always Available</span>
                <h2 id="ai-heading" className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight text-white">Ask anything. <br /> Get the facts.</h2>
                <p className="text-xl text-stone-400 mb-12 leading-relaxed font-medium">
                  Skip the long articles. Our AI assistant is trained on official election protocols to give you neutral, instant answers to your specific questions.
                </p>
                <div className="flex flex-wrap gap-6">
                  <Link href={`/${locale}/assistant`} className="btn-primary text-lg px-8 py-4 bg-white text-civic-primary hover:bg-stone-200">
                    Open Assistant
                  </Link>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-civic-primary bg-stone-700" />)}
                    </div>
                    <span className="text-sm font-bold text-stone-500">1.2k+ questions answered today</span>
                  </div>
                </div>
              </FadeInUp>
            </div>

            <div className="flex-1 w-full relative">
              <FadeInUp delay={0.2}>
                <div className="glass-card rounded-[2.5rem] p-1 shadow-2xl bg-white/5 border-white/10">
                  <div className="bg-[#1C1917] rounded-[2.25rem] p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-amber-600 flex items-center justify-center text-white font-black">CF</div>
                      <div>
                        <h4 className="text-white font-black text-sm">CivicFlow AI</h4>
                        <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Live · Online</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6 mb-10">
                      <div className="flex justify-end">
                        <div className="bg-stone-800 text-stone-200 px-6 py-4 rounded-3xl rounded-tr-sm text-sm font-medium max-w-[80%]">
                          How are votes counted in India?
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-amber-600 text-white px-6 py-4 rounded-3xl rounded-tl-sm text-sm font-bold max-w-[90%] shadow-lg leading-relaxed animate-pulse">
                          Votes are counted in multiple rounds under the supervision of Returning Officers and election agents...
                        </div>
                      </div>
                    </div>

                    <div className="bg-stone-800/50 border border-white/5 rounded-2xl p-4 flex items-center gap-3">
                      <div className="flex-1 text-stone-500 text-sm font-medium">Type your civic question...</div>
                      <div className="w-10 h-10 rounded-xl bg-stone-700 flex items-center justify-center">
                        <Search className="w-4 h-4 text-stone-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TOOLS GRID ===== */}
      <section className="py-32 bg-civic-ivory" aria-labelledby="tools-heading">
        <div className="container-civic">
          <div className="grid md:grid-cols-2 gap-12 items-end mb-20">
            <FadeInUp>
              <h2 id="tools-heading" className="text-4xl md:text-6xl font-black tracking-tight text-civic-primary">Beyond the Timeline.</h2>
            </FadeInUp>
            <FadeInUp delay={0.1}>
              <p className="text-lg text-civic-secondary font-medium">We&apos;ve built specialized tools to help you stay organized and informed throughout the entire election cycle.</p>
            </FadeInUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Interactive Glossary", desc: "Understand the jargon. 37+ terms explained in simple language with real-world examples.", href: `/${locale}/glossary` },
              { icon: CheckCircle2, title: "Readiness Checklist", desc: "Never miss a deadline. A comprehensive, stage-by-stage tracker for your voter preparation.", href: `/${locale}/checklist` },
              { icon: Globe, title: "Resource Directory", desc: "Direct access to official voter portals and commissions for over 10 different countries.", href: `/${locale}/resources` },
            ].map((tool, i) => (
              <FadeInUp key={i} delay={i * 0.1}>
                <Link href={tool.href} className="group bg-white p-12 rounded-[2.5rem] border border-civic-border shadow-civic-md hover:shadow-civic-xl transition-all hover:-translate-y-3">
                  <div className="w-16 h-16 rounded-3xl bg-civic-sand flex items-center justify-center mb-8 group-hover:bg-amber-600 transition-colors duration-500">
                    <tool.icon className="w-8 h-8 text-civic-accent group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="text-2xl font-black text-civic-primary mb-4 tracking-tight">{tool.title}</h3>
                  <p className="text-civic-secondary leading-relaxed mb-8 font-medium">{tool.desc}</p>
                  <div className="w-12 h-12 rounded-full border-2 border-civic-border flex items-center justify-center group-hover:border-amber-600 group-hover:bg-amber-600 transition-all duration-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-civic-muted group-hover:text-white"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </Link>
              </FadeInUp>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CALL TO ACTION ===== */}
      <section className="pb-32 container-civic">
        <FadeInUp>
          <div className="relative rounded-[3.5rem] p-12 md:p-24 text-center overflow-hidden bg-amber-600 shadow-civic-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700" />
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-black text-white mb-10 tracking-tighter leading-none">Your Vote, Your Power.</h2>
              <p className="text-xl md:text-2xl text-amber-50 mb-12 font-medium leading-relaxed">
                Knowledge is the foundation of a healthy democracy. Start learning today and participate with confidence.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href={`/${locale}/timeline`} className="px-12 py-5 bg-white text-amber-700 rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform active:scale-95">
                  Begin the Timeline
                </Link>
                <Link href={`/${locale}/assistant`} className="px-12 py-5 bg-amber-700 text-white rounded-2xl font-black text-lg border-2 border-amber-500/50 hover:bg-amber-800 transition-colors active:scale-95">
                  Talk to Assistant
                </Link>
              </div>
            </div>
          </div>
        </FadeInUp>
      </section>
    </div>
  );
}
