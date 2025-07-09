import { describe, test, expect } from "vitest";
import { toRoman } from "./converter";

describe("toRoman()", () => {
  test("1 => I", () => expect(toRoman(1)).toBe("I"));
});
