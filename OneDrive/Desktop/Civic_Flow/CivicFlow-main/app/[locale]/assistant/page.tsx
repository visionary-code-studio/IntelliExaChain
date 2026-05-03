"use client";
import { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const suggestedPrompts = [
  "How do I register to vote?",
  "What happens on election day?",
  "How are votes counted?",
  "What documents do I need to vote?",
  "What is the difference between EVM and paper ballot?",
  "How are election results declared?",
  "What is NOTA?",
  "How does voter registration work in India?",
  "Explain the electoral process in simple words",
  "What is a hung parliament?",
];

function TypingDots() {
  return (
    <div
      className="flex items-center gap-1.5 p-4 rounded-2xl rounded-bl-sm w-fit"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2.5 h-2.5 rounded-full animate-pulse-dot"
          style={{ background: "var(--accent)", animationDelay: `${i * 0.2}s` }}
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Assistant is typing...</span>
    </div>
  );
}

function renderMarkdown(text: string) {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="space-y-1 my-1 pl-1">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm">
              <span
                className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "var(--accent)" }}
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("## ")) {
      flushList(String(i));
      elements.push(
        <p key={i} className="font-bold mt-3 mb-1 text-sm" style={{ color: "var(--text-primary)" }}>
          {line.slice(3)}
        </p>
      );
    } else if (line.startsWith("# ")) {
      flushList(String(i));
      elements.push(
        <p key={i} className="font-bold text-base mt-3 mb-1" style={{ color: "var(--text-primary)" }}>
          {line.slice(2)}
        </p>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      listItems.push(line.slice(2));
    } else if (line.startsWith("💡")) {
      flushList(String(i));
      elements.push(
        <p
          key={i}
          className="text-sm p-3 rounded-xl mt-2"
          style={{ background: "var(--accent-light)", color: "var(--clay)" }}
        >
          {line}
        </p>
      );
    } else if (line.trim() === "") {
      flushList(String(i));
      elements.push(<div key={i} className="h-1" aria-hidden="true" />);
    } else {
      flushList(String(i));
      elements.push(
        <p key={i} className="text-sm" style={{ color: "var(--text-secondary)" }}>
          {line}
        </p>
      );
    }
  });
  flushList("end");
  return elements;
}

function AssistantUI() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState(initialQ);
  const [loading, setLoading] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [sent, setSent] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (initialQ && !sent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSent(true);
      sendMessage(initialQ);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg = simpleMode
      ? `${text} (Please explain in very simple words.)`
      : text;
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg =
          data?.content ??
          data?.error ??
          "Sorry, something went wrong. Please try again.";
        setMessages([...newMessages, { role: "assistant", content: errorMsg }]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content:
              data.content ?? "Sorry, I couldn't get a response. Please try again.",
          },
        ]);
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong. Please check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "var(--bg-ivory)",
        paddingTop: "96px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ===== HEADER ===== */}
      <div className="section-full py-12" style={{ background: "#1C1917" }}>
        <div className="container-civic" style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <div className="text-4xl mb-3" aria-hidden="true">💬</div>
          <h1 style={{ color: "white" }}>Ask the Civic Assistant</h1>
          <p
            className="mt-3 text-base"
            style={{ color: "#A8A29E", maxWidth: 520, margin: "12px auto 0" }}
          >
            Ask any election question in plain language. The assistant is
            neutral, educational, and here to help — no sign-in required.
          </p>

          {/* Free AI badge */}
          <div style={{ marginTop: 12 }}>
            <span
              className="text-xs px-3 py-1 rounded-full"
              style={{ background: "rgba(34,197,94,0.15)", color: "#86EFAC" }}
            >
              ✓ Free AI · No sign-in required
            </span>
          </div>

          {/* Simple Words toggle */}
          <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => setSimpleMode(!simpleMode)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 shadow-sm ${
                simpleMode 
                  ? "bg-amber-600 text-white border-amber-500 hover:bg-amber-500 hover:-translate-y-0.5" 
                  : "bg-[#2A2624] text-gray-300 border-[#3F3A36] hover:bg-[#3F3A36] hover:-translate-y-0.5"
              }`}
              style={{
                borderWidth: "1.5px",
                cursor: "pointer",
                boxShadow: simpleMode ? "0 4px 12px rgba(217, 119, 6, 0.4)" : "none"
              }}
              aria-pressed={simpleMode}
            >
              <div className={`relative w-8 h-4 rounded-full transition-colors ${simpleMode ? "bg-amber-300" : "bg-gray-600"}`}>
                <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${simpleMode ? "translate-x-4" : "translate-x-0"}`} />
              </div>
              {simpleMode ? "Simple Mode Active" : "Enable Simple Mode"}
            </button>
          </div>
        </div>
      </div>

      {/* ===== CHAT AREA ===== */}
      <div
        className="flex-1 py-8 px-4"
        style={{ maxWidth: 760, margin: "0 auto", width: "100%" }}
      >
        {/* Suggested prompts */}
        {messages.length === 0 && !loading && (
          <div className="mb-8">
            <p
              className="text-sm font-semibold mb-4 text-center"
              style={{ color: "var(--text-muted)" }}
            >
              Try asking one of these:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="px-4 py-2 rounded-full text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{
                    background: "var(--surface)",
                    border: "1.5px solid var(--border)",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                  }}
                  aria-label={`Ask: ${prompt}`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        <div
          className="space-y-6"
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              } animate-fade-in`}
            >
              {msg.role === "assistant" && (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1 font-bold text-xs text-white"
                  style={{
                    background: "linear-gradient(135deg, #D97706, #92400E)",
                  }}
                  aria-hidden="true"
                >
                  CF
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-5 py-4 ${
                  msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"
                }`}
                style={
                  msg.role === "user"
                    ? { background: "var(--accent)", color: "white" }
                    : {
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                      }
                }
              >
                {msg.role === "user" ? (
                  <p className="text-sm text-white">
                    {msg.content.replace(
                      " (Please explain in very simple words.)",
                      ""
                    )}
                  </p>
                ) : (
                  <div className="space-y-1">{renderMarkdown(msg.content)}</div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1 font-bold text-xs text-white"
                style={{
                  background: "linear-gradient(135deg, #D97706, #92400E)",
                }}
                aria-hidden="true"
              >
                CF
              </div>
              <TypingDots />
            </div>
          )}
          <div ref={bottomRef} aria-hidden="true" />
        </div>

        {/* Disclaimer after first message */}
        {messages.length > 0 && !loading && (
          <p
            className="text-xs text-center mt-6"
            style={{ color: "var(--text-muted)" }}
          >
            ⚠️ AI responses are educational only. Always verify important
            details with your{" "}
            <Link
              href="/resources"
              className="underline hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              official election authority
            </Link>
            .
          </p>
        )}
      </div>

      {/* ===== INPUT BAR ===== */}
      <div
        className="sticky border-t glass py-4 px-4"
        style={{
          bottom: 0,
          borderColor: "var(--border)",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          style={{ maxWidth: 760, margin: "0 auto", width: "100%" }}
          className="flex gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about elections, voting, registration…"
            className="input-civic flex-1"
            aria-label="Your question"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn-primary px-5"
            style={{
              opacity: !input.trim() || loading ? 0.5 : 1,
              cursor: !input.trim() || loading ? "not-allowed" : "pointer",
            }}
            aria-label="Send message"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            paddingTop: 120,
            textAlign: "center",
            color: "var(--text-muted)",
          }}
        >
          Loading assistant…
        </div>
      }
    >
      <AssistantUI />
    </Suspense>
  );
}
