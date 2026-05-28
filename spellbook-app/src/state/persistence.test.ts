import { afterEach, describe, expect, it, vi } from "vitest";
import { loadState, saveState } from "./persistence";
import type { SpellbookState } from "../types";

const sampleState = (): SpellbookState => ({
  character: {
    name: "Test Caster",
    casterClass: "Wizard",
    classLevel: 3,
    spellcastingAbilityModifier: 4,
    spellSaveDC: 14,
    spellAttackBonus: 6,
    maxHp: 20,
    currentHp: 20,
  },
  spells: [
    {
      id: "test-spell",
      name: "Test Spell",
      level: 1,
      school: "Evocation",
      description: "A spell used in tests.",
      prepared: true,
      ritual: false,
    },
  ],
  slots: {
    1: { total: 4, used: 1 },
    2: { total: 2, used: 0 },
    3: { total: 0, used: 0 },
    4: { total: 0, used: 0 },
    5: { total: 0, used: 0 },
    6: { total: 0, used: 0 },
    7: { total: 0, used: 0 },
    8: { total: 0, used: 0 },
    9: { total: 0, used: 0 },
  },
});

afterEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("persistence", () => {
  it("returns null when no state is saved", () => {
    expect(loadState()).toBeNull();
  });

  it("round-trips saved state through localStorage", () => {
    const state = sampleState();
    saveState(state);
    expect(loadState()).toEqual(state);
  });

  it("returns null when stored data is not valid JSON", () => {
    localStorage.setItem("spellbook.state.v1", "{not valid json");
    vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(loadState()).toBeNull();
  });

  it("overwrites prior state on subsequent save", () => {
    const first = sampleState();
    saveState(first);
    const second = { ...first, character: { ...first.character, name: "Renamed" } };
    saveState(second);
    expect(loadState()?.character.name).toBe("Renamed");
  });
});
