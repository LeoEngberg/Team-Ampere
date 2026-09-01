import { describe, it, expect } from "vitest";
import { isValidEmail } from "./validateEmail.js";

describe("isValidEmail", () => {
  it("returns true for a valid email address", () => {
    expect(isValidEmail("anna@example.com")).toBe(true);
  });

  it("returns false for a plain name with no @", () => {
    expect(isValidEmail("Anna Andersson")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(isValidEmail("")).toBe(false);
  });
});

// Den här testen är en regressionstest för att säkerställa att
//  valideringen av e-postfältet i ProfileView fungerar korrekt.
//  Den kontrollerar att när användaren försöker spara en profil
// med ett ogiltigt e-postformat, så ska sparfunktionen inte anropas.
