"use client";

import { useState } from "react";
import { Search, Loader2, ExternalLink, Newspaper } from "lucide-react";
import { FadeInUp } from "@/components/ui/FadeInUp";

interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  source: string;
}

export default function NewsSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError("");
    setHasSearched(true);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching the news. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-20">
      {/* Search Bar */}
      <FadeInUp>
        <div className="bg-civic-surface border border-civic-border rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-6 h-6 text-civic-accent" />
            <h2 className="text-xl font-bold text-civic-primary">Live Indian Election News</h2>
          </div>
          <p className="text-sm text-civic-secondary mb-6">
            Search for live updates, polling phases, or any current event related to the Indian Elections.
          </p>
          
          <form onSubmit={handleSearch} className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-civic-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g., Phase 1 voter turnout..."
              className="w-full bg-civic-surface-2 border border-civic-border text-civic-primary rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-civic-accent/50 transition-shadow"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 bg-civic-accent hover:bg-civic-accent-hover text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
            </button>
          </form>
        </div>
      </FadeInUp>

      {/* Results Area */}
      {hasSearched && (
        <FadeInUp delay={0.2}>
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 text-civic-muted">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-civic-accent" />
                <p>Fetching latest updates from Google...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-center border border-red-200 dark:border-red-800">
                {error}
              </div>
            ) : results.length > 0 ? (
              <div className="grid gap-4">
                {results.map((result, idx) => (
                  <a
                    key={idx}
                    href={result.link !== "#" ? result.link : undefined}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-civic-surface border border-civic-border rounded-xl p-6 transition-all hover:shadow-md hover:border-civic-accent group"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-lg font-bold text-civic-primary group-hover:text-civic-accent transition-colors">
                        {result.title}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-civic-muted flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-sm text-civic-secondary mb-4 leading-relaxed">
                      {result.snippet}
                    </p>
                    <div className="flex items-center gap-2 text-xs font-medium text-civic-accent">
                      <span className="w-2 h-2 rounded-full bg-civic-accent"></span>
                      {result.source}
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-civic-muted">
                No results found for &quot;{query}&quot;. Try a different search term.
              </div>
            )}
          </div>
        </FadeInUp>
      )}
    </div>
  );
}
