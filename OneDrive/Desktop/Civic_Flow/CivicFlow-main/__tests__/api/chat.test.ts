import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Stable mock references (must be declared before vi.mock) ────────────────
const mockGroqCreate = vi.fn();

// vi.mock is hoisted to top of file by vitest — Groq constructor returns
// an object pointing to mockGroqCreate, so per-test control works via
// mockGroqCreate.mockResolvedValueOnce / mockRejectedValueOnce
vi.mock("groq-sdk", () => ({
  default: vi.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: mockGroqCreate,
      },
    },
  })),
}));

vi.mock("@google/generative-ai", () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn().mockReturnValue({
      generateContent: vi.fn().mockResolvedValue({
        response: { text: () => "Gemini answer" },
      }),
    }),
  })),
  HarmCategory: {},
  HarmBlockThreshold: {},
}));

// ─── Helpers ─────────────────────────────────────────────────────────────────
function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ─── Tests ───────────────────────────────────────────────────────────────────
describe("POST /api/chat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GROQ_API_KEY = "test-groq-key";
    process.env.GOOGLE_AI_API_KEY = "test-google-key";
  });

  it("returns 400 if messages field is missing", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(makeRequest({}) as never);
    expect(res.status).toBe(400);
    const data = await res.json();
    expect(data.error).toBeDefined();
  });

  it("returns 400 if messages is not an array", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(makeRequest({ messages: "not an array" }) as never);
    expect(res.status).toBe(400);
  });

  it("returns 400 if messages is an empty array", async () => {
    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(makeRequest({ messages: [] }) as never);
    expect(res.status).toBe(400);
  });

  it("returns 200 with content when Groq succeeds", async () => {
    mockGroqCreate.mockResolvedValueOnce({
      choices: [{ message: { content: "Here is your answer." } }],
    });

    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "What is an election?" }] }) as never
    );
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.content).toBe("Here is your answer.");
  });

  it("returns 429 when Groq returns a rate limit error", async () => {
    const rateLimitError = Object.assign(new Error("rate limit exceeded"), {
      status: 429,
    });
    mockGroqCreate.mockRejectedValueOnce(rateLimitError);

    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "Tell me about voting." }] }) as never
    );
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toBe("rate_limit");
  });

  it("returns 500 when Groq throws an unexpected error", async () => {
    mockGroqCreate.mockRejectedValueOnce(new Error("Network error"));

    const { POST } = await import("@/app/api/chat/route");
    const res = await POST(
      makeRequest({ messages: [{ role: "user", content: "Hello" }] }) as never
    );
    expect(res.status).toBe(500);
  });
});
