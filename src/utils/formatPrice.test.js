import { describe, it, expect } from "vitest";
import { formatPrice } from "./formatPrice";

describe("formatPrice", () => {
  it("formats price in Swedish format", () => {
    expect(formatPrice(1345)).toBe("1\u00A0345 kr");
  });

  it("formats smaller prices correctly", () => {
    expect(formatPrice(412)).toBe("412 kr");
  });
});
