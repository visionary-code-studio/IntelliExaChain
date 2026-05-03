"use client";
import { useState, useEffect, use } from "react";
import { checklistGroups, allItems } from "@/lib/data/checklist";

const STORAGE_KEY = "civicflow_checklist";

export default function ChecklistPage({ params }: { params: Promise<{ locale: string }> }) {
  use(params);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setChecked(JSON.parse(saved));
    } catch {}
  }, []);

  function toggle(id: string) {
    const next = { ...checked, [id]: !checked[id] };
    setChecked(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  }

  function clearAll() {
    setChecked({});
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }

  const total = allItems.length;
  const done = allItems.filter((item) => checked[item.id]).length;
  const pct = Math.round((done / total) * 100);

  if (!mounted) return null;

  return (
    <div style={{ background: "var(--bg-ivory)", paddingTop: "96px" }}>
      {/* Header */}
      <div className="section-full py-14" style={{ background: "#1C1917" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <div className="text-4xl mb-3" aria-hidden="true">✅</div>
          <h1 style={{ color: "white" }}>Voter Readiness Checklist</h1>
          <p className="mt-3 text-base" style={{ color: "#A8A29E", maxWidth: 480, margin: "12px auto 0" }}>
            {total} tasks across 5 stages. Track your preparation and never miss a step.
          </p>

          {/* Progress */}
          <div style={{ marginTop: 28, maxWidth: 340, margin: "28px auto 0" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span className="text-sm" style={{ color: "#A8A29E" }}>{done} of {total} complete</span>
              <span className="text-sm font-bold" style={{ color: done === total ? "#4ADE80" : "var(--accent)" }}>{pct}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct}%` }} aria-label={`${pct}% complete`} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} />
            </div>
            {done === total && (
              <p className="mt-3 text-sm font-semibold" style={{ color: "#4ADE80" }}>🎉 You are fully prepared for election day!</p>
            )}
          </div>
        </div>
      </div>

      <section className="section">
        <div className="flex justify-center items-center gap-6 mb-8">
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>{done}/{total} tasks completed</p>
          {done > 0 && (
            <button onClick={clearAll} className="text-sm hover:underline" style={{ color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer" }}>Reset all</button>
          )}
        </div>

        <div className="space-y-10 max-w-3xl mx-auto">
          {checklistGroups.map((group) => {
            const groupItems = group.items;
            const groupDone = groupItems.filter((item) => checked[item.id]).length;
            const groupPct = Math.round((groupDone / groupItems.length) * 100);

            return (
              <div key={group.id} className="card">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl" aria-hidden="true">{group.emoji}</span>
                    <div>
                      <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>{group.title}</h2>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{group.description}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className={`text-sm font-bold ${groupDone === groupItems.length ? "text-green-600" : ""}`} style={groupDone !== groupItems.length ? { color: "var(--accent)" } : {}}>
                      {groupDone}/{groupItems.length}
                    </span>
                  </div>
                </div>

                {/* Group progress */}
                <div className="progress-bar mb-6">
                  <div className="progress-fill" style={{ width: `${groupPct}%` }} />
                </div>

                {/* Items */}
                <ul className="space-y-3">
                  {groupItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => toggle(item.id)}
                        className="w-full flex items-start gap-4 text-left p-3 rounded-xl transition-all hover:bg-sand"
                        style={checked[item.id] ? { background: "var(--success-light)" } : {}}
                        aria-pressed={!!checked[item.id]}
                        aria-label={item.task}
                      >
                        <div
                          className="w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all"
                          style={{
                            background: checked[item.id] ? "var(--success)" : "transparent",
                            borderColor: checked[item.id] ? "var(--success)" : "var(--border-strong)",
                          }}
                          aria-hidden="true"
                        >
                          {checked[item.id] && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${checked[item.id] ? "line-through" : ""}`} style={{ color: checked[item.id] ? "var(--text-muted)" : "var(--text-primary)" }}>
                            {item.task}
                          </p>
                          {item.hint && (
                            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>💡 {item.hint}</p>
                          )}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <p className="text-sm p-4 rounded-xl" style={{ background: "var(--accent-light)", color: "var(--clay)" }}>
            ⚠️ This checklist is a general guide. Always verify specific requirements (deadlines, ID rules, booth locations) with your official election authority.
          </p>
        </div>
      </section>
    </div>
  );
}
