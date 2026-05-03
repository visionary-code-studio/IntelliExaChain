import "@testing-library/jest-dom";
import { vi } from "vitest";
import React from "react";

// ─── Next.js mocks ───────────────────────────────────────────────────────────
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    pathname: "/en",
  }),
  usePathname: () => "/en",
  useSearchParams: () => new URLSearchParams(),
}));

// Use React.createElement instead of JSX — esbuild cannot parse JSX in .ts files
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => React.createElement("a", { href, ...props }, children),
}));

// ─── next-themes mock ─────────────────────────────────────────────────────────
vi.mock("next-themes", () => ({
  useTheme: () => ({ theme: "light", setTheme: vi.fn() }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) =>
    React.createElement(React.Fragment, null, children),
}));

// ─── Layout sub-component mocks (used inside Navbar / Footer) ─────────────────
vi.mock("@/components/layout/LanguageSwitcher", () => ({
  LanguageSwitcher: () => React.createElement("div", { "data-testid": "lang-switcher" }),
}));

vi.mock("@/components/layout/ThemeToggle", () => ({
  ThemeToggle: () => React.createElement("button", { "data-testid": "theme-toggle" }),
}));

// ─── Silence known React noise ────────────────────────────────────────────────
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: unknown[]) => {
    if (
      typeof args[0] === "string" &&
      (args[0].includes("Warning: ReactDOM.render") ||
        args[0].includes("act("))
    ) return;
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
