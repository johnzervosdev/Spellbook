import { describe, expect, it } from "vitest";
import { formatSpellLevel, groupSpellsByLevel } from "./spellUtils";
import type { Spell, SpellLevel } from "../../types";

const spell = (id: string, level: SpellLevel): Spell => ({
  id,
  name: id,
  level,
  description: "",
  prepared: false,
});

describe("groupSpellsByLevel", () => {
  it("returns an empty bucket for every level when given no spells", () => {
    const grouped = groupSpellsByLevel([]);
    for (let level = 0; level <= 9; level++) {
      expect(grouped[level as SpellLevel]).toEqual([]);
    }
  });

  it("groups spells into their level buckets", () => {
    const grouped = groupSpellsByLevel([
      spell("a", 0),
      spell("b", 1),
      spell("c", 1),
      spell("d", 3),
    ]);
    expect(grouped[0].map((s) => s.id)).toEqual(["a"]);
    expect(grouped[1].map((s) => s.id)).toEqual(["b", "c"]);
    expect(grouped[2]).toEqual([]);
    expect(grouped[3].map((s) => s.id)).toEqual(["d"]);
  });

  it("preserves input order within a level", () => {
    const grouped = groupSpellsByLevel([
      spell("second", 1),
      spell("first", 1),
    ]);
    expect(grouped[1].map((s) => s.id)).toEqual(["second", "first"]);
  });
});

describe("formatSpellLevel", () => {
  it("renders level 0 as Cantrip", () => {
    expect(formatSpellLevel(0)).toBe("Cantrip");
  });

  it("renders other levels as 'Level N'", () => {
    expect(formatSpellLevel(1)).toBe("Level 1");
    expect(formatSpellLevel(9)).toBe("Level 9");
  });
});
