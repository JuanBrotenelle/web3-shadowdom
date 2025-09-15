import { config } from "dotenv";
import { vi } from "vitest";

config();

vi.mock("*.css", () => ({}));

vi.mock("@formkit/auto-animate", () => ({
  default: {
    mounted: vi.fn(),
    updated: vi.fn(),
  },
}));

vi.mock("tailwind-merge", () => ({
  twMerge: vi.fn((...classes: string[]) => classes.join(" ")),
}));

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(process, "env", {
  value: {
    NODE_ENV: "test",
    VITE_EVENTS_NAME: "test-event",
  },
  writable: true,
});
