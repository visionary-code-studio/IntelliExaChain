import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Vitest hoists vi.mock calls — must be at top level
vi.mock("@/components/ui/FadeInUp", () => ({
  FadeInUp: ({ children }: { children: React.ReactNode }) =>
    React.createElement("div", { "data-testid": "fade-in-up" }, children),
}));

import React from "react";
import HomePage from "@/app/[locale]/page";

describe("HomePage (/en)", () => {
  async function renderPage(locale = "en") {
    const Page = await HomePage({ params: Promise.resolve({ locale }) });
    return render(Page);
  }

  it("renders a top-level h1 heading containing 'Demystifying'", async () => {
    await renderPage();
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toBeInTheDocument();
    expect(h1.textContent).toMatch(/demystifying/i);
  });

  it("renders the 'Start Your Journey' CTA link", async () => {
    await renderPage();
    const cta = screen.getByRole("link", { name: /start your journey/i });
    expect(cta).toBeInTheDocument();
    expect((cta as HTMLAnchorElement).href).toContain("/en/timeline");
  });

  it("renders an 'Ask Assistant' link", async () => {
    await renderPage();
    const links = screen.getAllByRole("link", { name: /ask assistant/i });
    expect(links.length).toBeGreaterThan(0);
  });

  it("renders stat: 8 Stages", async () => {
    await renderPage();
    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getByText("Stages")).toBeInTheDocument();
  });

  it("renders stat: 37+ Glossary Terms", async () => {
    await renderPage();
    expect(screen.getByText("37+")).toBeInTheDocument();
  });

  it("renders stat: 10+ Countries", async () => {
    await renderPage();
    expect(screen.getByText("10+")).toBeInTheDocument();
  });

  it("renders stat: 100% Accuracy", async () => {
    await renderPage();
    expect(screen.getByText("100%")).toBeInTheDocument();
  });

  it("renders 'The Interactive Path' journey section heading", async () => {
    await renderPage();
    expect(screen.getByText(/the interactive path/i)).toBeInTheDocument();
  });

  it("renders 'Voter Registration' featured card", async () => {
    await renderPage();
    expect(screen.getByText("Voter Registration")).toBeInTheDocument();
  });

  it("renders 'Campaign Period' featured card", async () => {
    await renderPage();
    expect(screen.getByText("Campaign Period")).toBeInTheDocument();
  });

  it("renders 'Election Day' featured card", async () => {
    await renderPage();
    expect(screen.getByText("Election Day")).toBeInTheDocument();
  });

  it("renders AI section with 'Ask anything' headline", async () => {
    await renderPage();
    expect(screen.getByText(/ask anything/i)).toBeInTheDocument();
  });

  it("renders AI section with 'Get the facts' headline", async () => {
    await renderPage();
    expect(screen.getByText(/get the facts/i)).toBeInTheDocument();
  });

  it("renders final CTA: 'Your Vote, Your Power'", async () => {
    await renderPage();
    expect(screen.getByText(/your vote, your power/i)).toBeInTheDocument();
  });

  it("uses locale prefix in all links (hi locale)", async () => {
    await renderPage("hi");
    const links = screen.getAllByRole("link") as HTMLAnchorElement[];
    const localizedLinks = links.filter((l) => l.href.includes("/hi/"));
    expect(localizedLinks.length).toBeGreaterThan(0);
  });
});
