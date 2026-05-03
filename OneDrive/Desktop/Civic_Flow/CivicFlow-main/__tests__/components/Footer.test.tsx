import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

const mockDict = {
  navigation: {
    home: "Home",
    timeline: "Timeline",
    learn: "Learn",
    assistant: "Assistant",
    glossary: "Glossary",
    checklist: "Checklist",
    resources: "Resources",
    askAssistant: "Ask Assistant",
  },
};

describe("Footer", () => {
  it("renders the CivicFlow brand name", () => {
    render(<Footer locale="en" dict={mockDict} />);
    expect(screen.getByText("Civic")).toBeInTheDocument();
    expect(screen.getByText("Flow")).toBeInTheDocument();
  });

  it("renders copyright notice with current year", () => {
    render(<Footer locale="en" dict={mockDict} />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it("renders the 'Politically neutral' trust badge", () => {
    render(<Footer locale="en" dict={mockDict} />);
    expect(screen.getByText(/politically neutral/i)).toBeInTheDocument();
  });

  it("renders the 'Educational only' trust badge", () => {
    render(<Footer locale="en" dict={mockDict} />);
    expect(screen.getByText(/educational only/i)).toBeInTheDocument();
  });

  it("renders country section links (India, US, UK)", () => {
    render(<Footer locale="en" dict={mockDict} />);
    expect(screen.getByText(/India/)).toBeInTheDocument();
    expect(screen.getByText(/United States/)).toBeInTheDocument();
    expect(screen.getByText(/United Kingdom/)).toBeInTheDocument();
  });

  it("footer has contentinfo role for accessibility", () => {
    render(<Footer locale="en" dict={mockDict} />);
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("renders 'Vaibhav Shaw' in the credits", () => {
    render(<Footer locale="en" dict={mockDict} />);
    expect(screen.getByText(/Vaibhav Shaw/i)).toBeInTheDocument();
  });
});
