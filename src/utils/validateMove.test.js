import { describe, it, expect } from "vitest";
import { validateMove } from "./validateMove.js";

describe("validateMove", () => {
  it("should return invalid if address is missing", () => {
    //Arrange
    const moveForm = {
      address: "",
      zip: "12345",
      city: "Stockholm",
      date: "2024-07-01",
      contract: "Rörligt pris",
    };

    const expected = {
      address: false,
      zip: true,
      city: true,
      date: true,
      contract: true,
    };

    //Act
    const result = validateMove(moveForm, new Date());

    //Assert
    expect(result).toStrictEqual(expected);
  });
});

// postnummer 5 siffror
// flyttdatum i framtiden
// flyttdatum format ÅÅÅÅÅ-MM-DD
// minst 14 dagar fram i tiden
// exakt 14 dagar okej, 13 inte okej
