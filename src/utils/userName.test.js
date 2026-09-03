import { it, describe, expect } from "vitest";
import { firstName } from "./userName.js";

describe("firstName", () => {
  it("should return the first name from a full name", () => {
    const fullName = "Anna Andersson";
    const result = firstName(fullName);
    expect(result).toBe("Anna");
  });
});
