"use client";
import { useState, use } from "react";
import { glossaryTerms, searchTerms, getTermsByLetter, alphabet, type GlossaryTerm } from "@/lib/data/glossary";

function GlossaryCard({ term }: { term: GlossaryTerm }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="card" id={`term-${term.term.replace(/\s+/g, "-").toLowerCase()}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>{term.term}</h3>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>{term.definition}</p>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{ background: expanded ? "var(--accent-light)" : "var(--bg-sand)", color: expanded ? "var(--clay)" : "var(--text-muted)" }}
          aria-expanded={expanded}
          aria-label={expanded ? "Show less" : "Show example"}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            {expanded ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}
          </svg>
        </button>
      </div>
      {expanded && (
        <div className="mt-4 space-y-3 animate-fade-in">
          <div className="p-3 rounded-xl" style={{ background: "var(--bg-sand)" }}>
            <p className="text-xs font-semibold mb-1" style={{ color: "var(--text-muted)" }}>Example</p>
            <p className="text-sm italic" style={{ color: "var(--text-secondary)" }}>&ldquo;{term.example}&rdquo;</p>
          </div>
          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: "var(--text-muted)" }}>Related Terms</p>
              <div className="flex flex-wrap gap-2">
                {term.relatedTerms.map((rt) => (
                  <span key={rt} className="badge badge-neutral text-xs">{rt}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GlossaryPage({ params }: { params: Promise<{ locale: string }> }) {
  use(params);
  const [query, setQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  const filtered = query ? searchTerms(query) : activeLetter ? getTermsByLetter(activeLetter) : glossaryTerms;

  function jumpToLetter(letter: string) {
    setQuery("");
    setActiveLetter(letter === activeLetter ? null : letter);
  }

  return (
    <div style={{ background: "var(--bg-ivory)", paddingTop: "96px" }}>
      {/* Header */}
      <div className="section-full py-14" style={{ background: "#1C1917" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <div className="text-4xl mb-3" aria-hidden="true">📖</div>
          <h1 style={{ color: "white" }}>Election Glossary</h1>
          <p className="mt-3 text-base" style={{ color: "#A8A29E", maxWidth: 520, margin: "12px auto 0" }}>
            {glossaryTerms.length}+ election terms explained simply, with examples. Tap any term to see an example sentence.
          </p>
          <div className="mt-6" style={{ maxWidth: 400, margin: "24px auto 0" }}>
            <input
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveLetter(null); }}
              placeholder="Search terms…"
              className="input-civic w-full"
              style={{ textAlign: "center" }}
              aria-label="Search glossary terms"
            />
          </div>
        </div>
      </div>

      <section className="section">
        {/* Alphabet nav */}
        <nav className="flex flex-wrap gap-1.5 justify-center mb-10" aria-label="Jump to letter">
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((letter) => {
            const hasTerms = alphabet.includes(letter);
            return (
              <button
                key={letter}
                onClick={() => hasTerms && jumpToLetter(letter)}
                disabled={!hasTerms}
                className="w-9 h-9 rounded-xl text-sm font-semibold transition-all"
                style={
                  activeLetter === letter
                    ? { background: "var(--accent)", color: "white" }
                    : hasTerms
                    ? { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }
                    : { background: "transparent", color: "var(--border)", cursor: "default" }
                }
                aria-pressed={activeLetter === letter}
                aria-label={hasTerms ? `Show terms starting with ${letter}` : `No terms for ${letter}`}
              >
                {letter}
              </button>
            );
          })}
          {activeLetter && (
            <button onClick={() => setActiveLetter(null)} className="px-3 h-9 rounded-xl text-sm font-medium transition-all" style={{ background: "var(--bg-sand)", color: "var(--text-muted)" }}>
              Clear
            </button>
          )}
        </nav>

        {/* Results count */}
        <p className="text-sm text-center mb-8" style={{ color: "var(--text-muted)" }}>
          {filtered.length} term{filtered.length !== 1 ? "s" : ""}
          {query ? ` matching "${query}"` : activeLetter ? ` starting with "${activeLetter}"` : " in total"}
        </p>

        {/* Terms grid */}
        {filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {filtered.map((term) => (
              <GlossaryCard key={term.term} term={term} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
            <p className="font-semibold" style={{ color: "var(--text-primary)" }}>No terms found</p>
            <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>Try a different search or browse all terms.</p>
            <button onClick={() => { setQuery(""); setActiveLetter(null); }} className="btn-secondary mt-4">Show all terms</button>
          </div>
        )}
      </section>
    </div>
  );
}
