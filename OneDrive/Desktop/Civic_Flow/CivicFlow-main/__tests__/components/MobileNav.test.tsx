import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MobileBottomNav from "@/components/layout/MobileBottomNav";

const mockDict = {
  home: "Home",
  timeline: "Timeline",
  learn: "Learn",
  assistant: "Assistant",
  glossary: "Glossary",
  checklist: "Checklist",
  resources: "Resources",
  askAssistant: "Ask Assistant",
};

describe("MobileBottomNav", () => {
  it("renders all 5 navigation tabs", () => {
    render(<MobileBottomNav locale="en" dict={mockDict} />);
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Timeline").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Assistant").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Checklist").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Glossary").length).toBeGreaterThan(0);
  });

  it("has mobile bottom nav role for accessibility", () => {
    render(<MobileBottomNav locale="en" dict={mockDict} />);
    expect(
      screen.getByRole("navigation", { name: /mobile bottom navigation/i })
    ).toBeInTheDocument();
  });

  it("home tab links to /en", () => {
    render(<MobileBottomNav locale="en" dict={mockDict} />);
    const links = screen.getAllByRole("link");
    const homeLink = links.find((l) =>
      (l as HTMLAnchorElement).href.endsWith("/en")
    );
    expect(homeLink).toBeDefined();
  });

  it("assistant tab links to /en/assistant", () => {
    render(<MobileBottomNav locale="en" dict={mockDict} />);
    const links = screen.getAllByRole("link");
    const assistantLink = links.find((l) =>
      (l as HTMLAnchorElement).href.includes("/assistant")
    );
    expect(assistantLink).toBeDefined();
  });

  it("renders nav is hidden on large screens (has lg:hidden class)", () => {
    render(<MobileBottomNav locale="en" dict={mockDict} />);
    const nav = screen.getByRole("navigation", {
      name: /mobile bottom navigation/i,
    });
    expect(nav.className).toContain("lg:hidden");
  });
});
