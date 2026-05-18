import { describe, expect, it } from "vitest";
import { initialState, mergeLoadedState } from "./useSpellbookStore";
import type { Character, SpellbookState } from "../types";

describe("mergeLoadedState", () => {
  it("returns defaults when nothing was loaded", () => {
    const defaults = initialState();
    expect(mergeLoadedState(null, defaults)).toBe(defaults);
  });

  it("returns loaded state when it is complete", () => {
    const defaults = initialState();
    const loaded: SpellbookState = {
      ...defaults,
      character: { ...defaults.character, name: "Loaded Caster" },
    };
    expect(mergeLoadedState(loaded, defaults)).toEqual(loaded);
  });

  it("backfills missing character fields from defaults", () => {
    const defaults = initialState();
    const loadedWithoutClass = {
      ...defaults,
      character: {
        name: "Old Save",
        classLevel: 5,
        spellcastingAbilityModifier: 3,
        spellSaveDC: 13,
        spellAttackBonus: 5,
      } as unknown as Character,
    } as SpellbookState;

    const merged = mergeLoadedState(loadedWithoutClass, defaults);
    expect(merged.character.casterClass).toBe(defaults.character.casterClass);
    expect(merged.character.name).toBe("Old Save");
  });

  it("preserves loaded spells and slots when only character needs backfill", () => {
    const defaults = initialState();
    const loaded: SpellbookState = {
      ...defaults,
      spells: [
        {
          id: "x",
          name: "Custom",
          level: 2,
          description: "Custom spell.",
          prepared: false,
        },
      ],
      slots: {
        ...defaults.slots,
        1: { total: 6, used: 2 },
      },
    };
    const merged = mergeLoadedState(loaded, defaults);
    expect(merged.spells).toEqual(loaded.spells);
    expect(merged.slots[1]).toEqual({ total: 6, used: 2 });
  });
});
