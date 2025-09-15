import { describe, it, expect } from "vitest";
import { hexToRgba } from "../index";

describe("Utils", () => {
  describe("hexToRgba", () => {
    it("should convert 6-digit hex to rgba", () => {
      expect(hexToRgba("#ff0000")).toBe("rgba(255, 0, 0, 1)");
      expect(hexToRgba("#00ff00")).toBe("rgba(0, 255, 0, 1)");
      expect(hexToRgba("#0000ff")).toBe("rgba(0, 0, 255, 1)");
      expect(hexToRgba("#ffffff")).toBe("rgba(255, 255, 255, 1)");
      expect(hexToRgba("#000000")).toBe("rgba(0, 0, 0, 1)");
    });

    it("should convert 3-digit hex to rgba", () => {
      expect(hexToRgba("#f00")).toBe("rgba(255, 0, 0, 1)");
      expect(hexToRgba("#0f0")).toBe("rgba(0, 255, 0, 1)");
      expect(hexToRgba("#00f")).toBe("rgba(0, 0, 255, 1)");
      expect(hexToRgba("#fff")).toBe("rgba(255, 255, 255, 1)");
      expect(hexToRgba("#000")).toBe("rgba(0, 0, 0, 1)");
    });

    it("should handle hex without # prefix", () => {
      expect(hexToRgba("ff0000")).toBe("rgba(255, 0, 0, 1)");
      expect(hexToRgba("f00")).toBe("rgba(255, 0, 0, 1)");
    });

    it("should apply custom alpha value", () => {
      expect(hexToRgba("#ff0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
      expect(hexToRgba("#00ff00", 0.8)).toBe("rgba(0, 255, 0, 0.8)");
      expect(hexToRgba("#0000ff", 0)).toBe("rgba(0, 0, 255, 0)");
    });

    it("should handle edge cases", () => {
      expect(hexToRgba("#123456", 0.3)).toBe("rgba(18, 52, 86, 0.3)");
      expect(hexToRgba("#abcdef", 0.7)).toBe("rgba(171, 205, 239, 0.7)");
    });

    it("should handle mixed case hex", () => {
      expect(hexToRgba("#FF0000")).toBe("rgba(255, 0, 0, 1)");
      expect(hexToRgba("#Ff0000")).toBe("rgba(255, 0, 0, 1)");
      expect(hexToRgba("#fF0000")).toBe("rgba(255, 0, 0, 1)");
    });
  });
});
