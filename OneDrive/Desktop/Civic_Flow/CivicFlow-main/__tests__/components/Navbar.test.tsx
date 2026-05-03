import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "@/components/layout/Navbar";

// dict mock matching the actual dictionary shape
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

describe("Navbar", () => {
  it("renders the CivicFlow logo text", () => {
    render(<Navbar locale="en" dict={mockDict} />);
    expect(screen.getByText("Civic")).toBeInTheDocument();
    expect(screen.getByText("Flow")).toBeInTheDocument();
  });

  it("renders all navigation links on desktop", () => {
    render(<Navbar locale="en" dict={mockDict} />);
    expect(screen.getAllByText("Home").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Timeline").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Glossary").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Checklist").length).toBeGreaterThan(0);
  });

  it("has correct href for home link", () => {
    render(<Navbar locale="en" dict={mockDict} />);
    const homeLinks = screen.getAllByRole("link", { name: /home/i });
    const homeLink = homeLinks.find((el) =>
      (el as HTMLAnchorElement).href.endsWith("/en")
    );
    expect(homeLink).toBeDefined();
  });

  it("has correct href for assistant link", () => {
    render(<Navbar locale="en" dict={mockDict} />);
    const links = screen.getAllByRole("link");
    const assistantLinks = links.filter((el) =>
      (el as HTMLAnchorElement).href.includes("/assistant")
    );
    expect(assistantLinks.length).toBeGreaterThan(0);
  });

  it("renders the Ask Assistant CTA button when not on assistant page", () => {
    render(<Navbar locale="en" dict={mockDict} />);
    expect(screen.getByText("Ask Assistant")).toBeInTheDocument();
  });

  it("renders with hi locale correctly", () => {
    const hiDict = { ...mockDict, home: "होम" };
    render(<Navbar locale="hi" dict={hiDict} />);
    expect(screen.getByText("होम")).toBeInTheDocument();
  });

  it("navbar has banner role for accessibility", () => {
    render(<Navbar locale="en" dict={mockDict} />);
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });
});
