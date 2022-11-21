import { Timestamp } from "firebase/firestore";
import { describe, expect, test } from "vitest";
import {
  convertArrayToCommaSeperatedList,
  formatFirebaseTimestamp,
  getRandomInt,
  removeDuplicatesFromArray,
} from "../helpers";

describe("helpers", () => {
  test("convertArrayToCommaSeperatedList()", () => {
    expect(convertArrayToCommaSeperatedList(["a", "b", "c"])).toBe("a, b, c");
    expect(convertArrayToCommaSeperatedList(["daler", "aziz"])).toBe(
      "daler, aziz"
    );
  });

  test("getRandomInt()", () => {
    let random: number;

    [0, 0, 0, 0, 0].forEach(() => {
      random = getRandomInt(1, 5);

      expect(random).toBeGreaterThanOrEqual(1);
      expect(random).toBeLessThanOrEqual(5);
    });

    [0, 0, 0, 0, 0].forEach(() => {
      random = getRandomInt(-5, 0);

      expect(random).toBeGreaterThanOrEqual(-5);
      expect(random).toBeLessThanOrEqual(0);
    });
  });

  test("removeDuplicatesFromArray()", () => {
    expect(removeDuplicatesFromArray([1, 2, 3])).toEqual([1, 2, 3]);
    expect(removeDuplicatesFromArray([1, 2, 3, 3, 3])).toEqual([1, 2, 3]);
    expect(
      removeDuplicatesFromArray(["daler", "aziz", 12, 11, 11, "aziz"])
    ).toEqual(["daler", "aziz", 12, 11]);
  });

  test("formatFirebaseTimestamp()", () => {
    expect(formatFirebaseTimestamp(new Timestamp(100, 100))).toEqual(
      "01:01:1970 06:01:40"
    );
    expect(formatFirebaseTimestamp(new Timestamp(1000, 1000))).toEqual(
      "01:01:1970 06:16:40"
    );
  });
});
