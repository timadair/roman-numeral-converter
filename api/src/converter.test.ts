import { describe, test, expect } from "vitest";
import { toRomanNumeral } from "./converter";

// Test specification to the modern standard form, found at https://en.wikipedia.org/wiki/Roman_numerals#Standard_form
describe("toRoman", () => {
  describe("First Occurence of Numeral Symbols", () => {
    test.each([
      [1, "I"],
      [5, "V"],
      [10, "X"],
      [50, "L"],
      [100, "C"],
      [500, "D"],
      [1000, "M"],
    ])("%i => %s", (input, expected) => {
      expect(toRomanNumeral(input)).toBe(expected);
    });
  });

  describe("Subtractive Notation Boundaries", () => {
    test.each([
      [4, "IV"],
      [9, "IX"],
      [40, "XL"],
      [90, "XC"],
      [400, "CD"],
      [900, "CM"],
    ])("%i => %s", (input, expected) => {
      expect(toRomanNumeral(input)).toBe(expected);
    });
  });

  describe("Repeated Numerals", () => {
    test.each([
      [3, "III"],
      [30, "XXX"],
      [300, "CCC"],
      [2000, "MM"],
      [3333, "MMMCCCXXXIII"],
    ])("%i => %s", (input, expected) => {
      expect(toRomanNumeral(input)).toBe(expected);
    });
  });

  describe("Other combinations", () => {
    test.each([
      [2, "II"], // first repeated symbol
      [11, "XI"],
      [49, "XLIX"],
      [101, "CI"],
      [249, "CCXLIX"],
      [999, "CMXCIX"],
      [1666, "MDCLXVI"], // All symbols are used
    ])("%i => %s", (input, expected) => {
      expect(toRomanNumeral(input)).toBe(expected);
    });
  });

  test("Maximum Value", () => {
    expect(toRomanNumeral(3999)).toBe("MMMCMXCIX");
  });

  describe("Invalid Inputs", () => {
    test.each([
      [0, "Input must be an integer between 1 and 3999"],
      [4000, "Input must be an integer between 1 and 3999"],
    ])("%i should throw error: %s", (input, expectedError) => {
      expect(() => toRomanNumeral(input)).toThrow(expectedError);
    });
  });
});
