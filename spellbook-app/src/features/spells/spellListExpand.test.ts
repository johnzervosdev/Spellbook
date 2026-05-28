import { describe, expect, it } from "vitest";
import type { SpellLevel } from "../../types";
import {
  defaultExpandedLevel,
  ensureLevelExpanded,
  toggleExpandedLevel,
} from "./spellListExpand";

describe("defaultExpandedLevel", () => {
  it("prefers the selected spell's level when present", () => {
    expect(defaultExpandedLevel([0, 1, 2], 2)).toBe(2);
  });

  it("falls back to the first level when none selected", () => {
    expect(defaultExpandedLevel([0, 1], null)).toBe(0);
  });
});

describe("toggleExpandedLevel", () => {
  it("adds and removes levels", () => {
    let set = new Set<SpellLevel>([1]);
    set = toggleExpandedLevel(set, 2);
    expect(set.has(2)).toBe(true);
    set = toggleExpandedLevel(set, 1);
    expect(set.has(1)).toBe(false);
  });
});

describe("ensureLevelExpanded", () => {
  it("returns the same set when level already open", () => {
    const set = new Set<SpellLevel>([1]);
    expect(ensureLevelExpanded(set, 1)).toBe(set);
  });

  it("adds the level when closed", () => {
    const set = new Set<SpellLevel>([1]);
    const next = ensureLevelExpanded(set, 2);
    expect(next.has(2)).toBe(true);
  });
});
