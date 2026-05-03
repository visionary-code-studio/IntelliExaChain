import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = `You are CivicFlow Assistant — a friendly, neutral, and knowledgeable civic education guide. Your role is to help users understand election processes, voter registration, voting procedures, ballot counting, and result declaration.

CORE RULES:
1. Always remain POLITICALLY NEUTRAL. Do not favor or criticize any political party, candidate, government, or ideology.
2. Explain concepts clearly in plain, simple language. Avoid jargon unless you immediately define the term.
3. If the question is about a specific country, provide country-specific information (India, US, UK, Nepal, China, Russia, Italy, Iran, North Korea, etc.) but note that rules change — always recommend users verify with their official election commission.
4. If the user asks to "explain simpler," use shorter sentences, simpler words, and a friendly, reassuring tone.
5. Keep responses concise but complete. Use short paragraphs. Use bullet points for step-by-step processes.
6. Always end with a helpful note to verify important details with official local election authorities.
7. Do NOT engage with: political opinions, partisan debates, voting advice ("who to vote for"), legal advice, or anything unrelated to civic/election education.
8. If asked something outside your scope, politely redirect: "I'm designed to help with election education. For that topic, I'd recommend consulting a legal or political expert."

FORMAT:
- Use clear headings where helpful (##)
- Use bullet points for lists
- Keep paragraphs to 2–3 sentences max
- Include country-specific examples when relevant
- Always add a "💡 Tip:" line with a practical takeaway

TOPIC AREAS:
- Voter registration & eligibility
- Election timeline stages
- Voting process & methods (EVM, paper ballot, postal vote)
- Ballot counting & transparency
- Result declaration & government formation
- Election terminology & glossary
- Civic rights & responsibilities
- How different countries conduct elections`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages.slice(-20), // keep last 20 messages for context
      ],
      max_tokens: 700,
      temperature: 0.5,
    });

    const content =
      completion.choices[0]?.message?.content ??
      "I'm sorry, I couldn't generate a response. Please try again.";

    return NextResponse.json({ content });
  } catch (error: unknown) {
    console.error("Groq API error:", error);

    const errObj = error as {
      status?: number;
      message?: string;
    };

    const isQuota =
      errObj?.status === 429 ||
      (errObj?.message ?? "").toLowerCase().includes("rate limit") ||
      (errObj?.message ?? "").toLowerCase().includes("quota");

    if (isQuota) {
      return NextResponse.json(
        {
          error: "rate_limit",
          content:
            "⚠️ The assistant is briefly rate-limited. Please wait a moment and try again — free usage limits reset every minute.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to get a response. Please try again." },
      { status: 500 }
    );
  }
}
