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
          school: "Evocation",
          description: "Custom spell.",
          prepared: false,
          ritual: false,
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

  it("backfills missing spell.school with a fallback value", () => {
    const defaults = initialState();
    const legacySpell = {
      id: "legacy",
      name: "Old Spell",
      level: 1,
      description: "Pre-school-field save.",
      prepared: false,
    } as unknown as SpellbookState["spells"][number];

    const loaded: SpellbookState = {
      ...defaults,
      spells: [legacySpell],
    };

    const merged = mergeLoadedState(loaded, defaults);
    expect(merged.spells[0].school).toBeTruthy();
    expect(merged.spells[0].id).toBe("legacy");
  });

  it("backfills missing character HP fields from defaults", () => {
    const defaults = initialState();
    const loaded: SpellbookState = {
      ...defaults,
      character: {
        name: "Old Save",
        casterClass: "Wizard",
        classLevel: 3,
        spellcastingAbilityModifier: 3,
        spellSaveDC: 13,
        spellAttackBonus: 5,
      } as unknown as Character,
    };

    const merged = mergeLoadedState(loaded, defaults);
    expect(merged.character.maxHp).toBe(defaults.character.maxHp);
    expect(merged.character.currentHp).toBe(defaults.character.currentHp);
  });

  it("backfills missing spell.ritual with false", () => {
    const defaults = initialState();
    const legacySpell = {
      id: "legacy-ritual",
      name: "Pre-Ritual-Field Spell",
      level: 1,
      school: "Divination",
      description: "Saved before ritual field existed.",
      prepared: false,
    } as unknown as SpellbookState["spells"][number];

    const loaded: SpellbookState = {
      ...defaults,
      spells: [legacySpell],
    };

    const merged = mergeLoadedState(loaded, defaults);
    expect(merged.spells[0].ritual).toBe(false);
  });
});
