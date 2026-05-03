import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock global fetch for Google Custom Search
const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

function makeSearchRequest(query: string | null): Request {
  const url = query
    ? `http://localhost/api/search?q=${encodeURIComponent(query)}`
    : "http://localhost/api/search";
  return new Request(url, { method: "GET" });
}

describe("GET /api/search", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GOOGLE_API_KEY = "test-api-key";
    process.env.GOOGLE_CX = "test-cx-id";
  });

  it("returns 400 if query parameter q is missing", async () => {
    const { GET } = await import("@/app/api/search/route");
    const req = makeSearchRequest(null);
    const res = await GET(req as never);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it("returns 200 with items when search succeeds", async () => {
    const mockItems = [
      {
        title: "Indian Election News",
        link: "https://eci.gov.in",
        snippet: "Election news snippet.",
        displayLink: "eci.gov.in",
      },
    ];
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: mockItems,
        searchInformation: { totalResults: "1", searchTime: 0.3 },
      }),
    });

    const { GET } = await import("@/app/api/search/route");
    const req = makeSearchRequest("election");
    const res = await GET(req as never);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.items).toBeDefined();
    expect(Array.isArray(data.items)).toBe(true);
  });

  it("returns empty items array when API returns no results", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        searchInformation: { totalResults: "0", searchTime: 0.1 },
      }),
    });

    const { GET } = await import("@/app/api/search/route");
    const req = makeSearchRequest("xyzabc123nonexistent");
    const res = await GET(req as never);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data.items)).toBe(true);
  });

  it("returns 200 with fallback when fetch throws", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network failure"));
    const { GET } = await import("@/app/api/search/route");
    const req = makeSearchRequest("voter registration");
    const res = await GET(req as never);
    // Should not crash — either 200 with fallback or 500 with error message
    expect([200, 500]).toContain(res.status);
  });

  it("does not include artificial delays in response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        items: [],
        searchInformation: { totalResults: "0", searchTime: 0.1 },
      }),
    });

    const { GET } = await import("@/app/api/search/route");
    const start = Date.now();
    const req = makeSearchRequest("test");
    await GET(req as never);
    const elapsed = Date.now() - start;
    // Should complete in under 500ms — no fake 1200ms delay
    expect(elapsed).toBeLessThan(500);
  });
});
