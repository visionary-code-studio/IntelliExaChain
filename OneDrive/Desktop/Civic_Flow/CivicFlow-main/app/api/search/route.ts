import { NextResponse } from 'next/server';

// ─── In-memory cache to avoid duplicate Google API calls ─────────────────────
const cache = new Map<string, { data: unknown; expiry: number }>();
const CACHE_TTL_MS = 60_000; // 60 seconds

function getCached(key: string): unknown | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiry) { cache.delete(key); return null; }
  return entry.data;
}

function setCached(key: string, data: unknown): void {
  cache.set(key, { data, expiry: Date.now() + CACHE_TTL_MS });
}

// ─── Fallback content when Google API is unavailable ─────────────────────────
const FALLBACK_ITEMS = [
  {
    title: "Election Commission of India — Official Portal",
    link: "https://eci.gov.in",
    snippet: "Official home of the Election Commission of India. Register to vote, find your polling booth, and check election schedules.",
    displayLink: "eci.gov.in",
  },
  {
    title: "Voter Registration — How to Enroll on the Electoral Roll",
    link: "https://voters.eci.gov.in",
    snippet: "Register online at voters.eci.gov.in. Check your name on the electoral roll and download your voter ID card (EPIC).",
    displayLink: "voters.eci.gov.in",
  },
  {
    title: "How EVMs Work — A Complete Guide",
    link: "https://eci.gov.in/evm/",
    snippet: "Learn how Electronic Voting Machines (EVMs) and VVPATs ensure transparent, tamper-proof elections in India.",
    displayLink: "eci.gov.in",
  },
  {
    title: "Supreme Court Guidelines on Electoral Bonds",
    link: "https://main.sci.gov.in",
    snippet: "The Supreme Court has issued landmark guidelines on electoral bond disclosures and political funding transparency.",
    displayLink: "main.sci.gov.in",
  },
  {
    title: "Model Code of Conduct — Election Commission of India",
    link: "https://eci.gov.in/model-code-of-conduct/",
    snippet: "The Model Code of Conduct (MCC) governs candidate and party behaviour during elections. Learn what is permitted and prohibited.",
    displayLink: "eci.gov.in",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query || query.trim().length === 0) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    );
  }

  // Sanitize: max 200 chars, strip HTML tags
  const safeQuery = query.slice(0, 200).replace(/<[^>]*>/g, '').trim();
  const cacheKey = safeQuery.toLowerCase();

  // Return cached result if available
  const cached = getCached(cacheKey);
  if (cached) {
    return NextResponse.json(cached, {
      headers: { 'X-Cache': 'HIT', 'Cache-Control': 'public, max-age=60' },
    });
  }

  // ─── Call Real Google Custom Search API ────────────────────────────────────
  const apiKey = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CX;

  if (apiKey && cx) {
    try {
      const googleUrl = `https://customsearch.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(safeQuery + ' election')}&num=5`;
      const googleRes = await fetch(googleUrl, { signal: AbortSignal.timeout(5000) });

      if (googleRes.ok) {
        const googleData = await googleRes.json() as {
          items?: { title: string; link: string; snippet: string; displayLink: string }[];
          searchInformation?: { totalResults: string; searchTime: number };
        };

        const result = {
          items: googleData.items ?? [],
          searchInformation: googleData.searchInformation ?? {
            totalResults: '0',
            searchTime: 0,
          },
          source: 'google',
        };

        setCached(cacheKey, result);

        return NextResponse.json(result, {
          headers: { 'X-Cache': 'MISS', 'Cache-Control': 'public, max-age=60' },
        });
      }
    } catch (err) {
      console.error('[search] Google API error:', err);
      // Fall through to fallback
    }
  }

  // ─── Fallback: filter static content by query ──────────────────────────────
  const lowerQuery = safeQuery.toLowerCase();
  const filtered = FALLBACK_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.snippet.toLowerCase().includes(lowerQuery)
  );
  const fallbackItems = filtered.length > 0 ? filtered : FALLBACK_ITEMS.slice(0, 3);

  const fallbackResult = {
    items: fallbackItems,
    searchInformation: { totalResults: fallbackItems.length.toString(), searchTime: 0 },
    source: 'fallback',
  };

  setCached(cacheKey, fallbackResult);

  return NextResponse.json(fallbackResult, {
    headers: { 'Cache-Control': 'public, max-age=60' },
  });
}
