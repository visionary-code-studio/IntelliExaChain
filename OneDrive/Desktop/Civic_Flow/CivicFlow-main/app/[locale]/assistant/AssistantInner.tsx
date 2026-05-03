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
    <div className="flex items-center gap-1.5 p-4 rounded-2xl rounded-bl-sm w-fit" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2.5 h-2.5 rounded-full"
          style={{ background: "var(--accent)", animationDelay: `${i * 0.2}s`, animation: "pulse-dot 2s ease-in-out infinite" }}
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
        <ul key={`list-${key}`} className="space-y-1 my-1">
          {listItems.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent)" }} aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    if (line.startsWith("## ")) { flushList(String(i)); elements.push(<h3 key={i} className="font-bold mt-3 mb-1 text-sm" style={{ color: "var(--text-primary)" }}>{line.slice(3)}</h3>); }
    else if (line.startsWith("# ")) { flushList(String(i)); elements.push(<h2 key={i} className="font-bold text-base mt-3 mb-1" style={{ color: "var(--text-primary)" }}>{line.slice(2)}</h2>); }
    else if (line.startsWith("- ") || line.startsWith("* ")) { listItems.push(line.slice(2)); }
    else if (line.startsWith("💡")) { flushList(String(i)); elements.push(<p key={i} className="text-sm p-3 rounded-xl mt-2" style={{ background: "var(--accent-light)", color: "var(--clay)" }}>{line}</p>); }
    else if (line.trim() === "") { flushList(String(i)); elements.push(<div key={i} className="h-1" aria-hidden="true" />); }
    else { flushList(String(i)); elements.push(<p key={i} className="text-sm">{line}</p>); }
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (initialQ && !sent) { setSent(true); sendMessage(initialQ); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg = simpleMode ? `${text} (Please explain in very simple words.)` : text;
    const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.content ?? "Sorry, I couldn't get a response. Please try again." }]);
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, something went wrong. Please check your connection and try again." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "var(--bg-ivory)", paddingTop: "64px", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div className="section-full py-10" style={{ background: "var(--text-primary)" }}>
        <div className="container-civic text-center">
          <div className="text-4xl mb-3" aria-hidden="true">💬</div>
          <h1 style={{ color: "white" }}>Ask the Civic Assistant</h1>
          <p className="mt-2 max-w-xl mx-auto" style={{ color: "#A8A29E" }}>
            Ask any election question in plain language. The assistant is neutral, educational, and here to help.
          </p>
          <button
            onClick={() => setSimpleMode(!simpleMode)}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all mx-auto"
            style={{
              background: simpleMode ? "var(--accent)" : "rgba(255,255,255,0.1)",
              color: simpleMode ? "white" : "#A8A29E",
              border: `1.5px solid ${simpleMode ? "var(--accent)" : "rgba(255,255,255,0.2)"}`,
            }}
            aria-pressed={simpleMode}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Simple Words Mode {simpleMode ? "● ON" : "○ OFF"}
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 py-8 px-4" style={{ maxWidth: 768, margin: "0 auto", width: "100%" }}>
        {messages.length === 0 && !loading && (
          <div className="mb-8">
            <p className="text-sm font-semibold mb-4 text-center" style={{ color: "var(--text-muted)" }}>Try asking one of these:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="px-4 py-2 rounded-full text-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: "var(--surface)", border: "1.5px solid var(--border)", color: "var(--text-secondary)" }}
                  aria-label={`Ask: ${prompt}`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-6" role="log" aria-live="polite" aria-label="Chat messages">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}>
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1 font-bold text-xs text-white shadow-accent" style={{ background: "linear-gradient(135deg, #D97706, #92400E)" }} aria-hidden="true">CF</div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-5 py-4 ${msg.role === "user" ? "rounded-br-sm" : "rounded-bl-sm"}`}
                style={msg.role === "user"
                  ? { background: "var(--accent)", color: "white" }
                  : { background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }
                }
              >
                {msg.role === "user"
                  ? <p className="text-sm text-white">{msg.content.replace(" (Please explain in very simple words.)", "")}</p>
                  : <div className="space-y-1">{renderMarkdown(msg.content)}</div>
                }
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-1 font-bold text-xs text-white" style={{ background: "linear-gradient(135deg, #D97706, #92400E)" }} aria-hidden="true">CF</div>
              <TypingDots />
            </div>
          )}
          <div ref={bottomRef} aria-hidden="true" />
        </div>

        {messages.length > 0 && !loading && (
          <p className="text-xs text-center mt-6" style={{ color: "var(--text-muted)" }}>
            ⚠️ AI responses are educational only. Always verify important details with your{" "}
            <Link href="/resources" className="underline hover:opacity-80" style={{ color: "var(--accent)" }}>official election authority</Link>.
          </p>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-16 lg:bottom-0 border-t glass py-4 px-4" style={{ borderColor: "var(--border)" }}>
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} style={{ maxWidth: 768, margin: "0 auto", width: "100%" }} className="flex gap-3">
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
            className="btn-primary px-5 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AssistantPageInner() {
  return (
    <Suspense>
      <AssistantUI />
    </Suspense>
  );
}
