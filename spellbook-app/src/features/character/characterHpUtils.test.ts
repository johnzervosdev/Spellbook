import { describe, expect, it } from "vitest";
import { adjustHp, applyLongRestHp, clampHp } from "./characterHpUtils";
import type { Character } from "../../types";

const sampleCharacter = (): Character => ({
  name: "Test",
  casterClass: "Wizard",
  classLevel: 3,
  spellcastingAbilityModifier: 3,
  spellSaveDC: 13,
  spellAttackBonus: 5,
  maxHp: 26,
  currentHp: 20,
});

describe("clampHp", () => {
  it("clamps below zero and above max", () => {
    expect(clampHp(-3, 26)).toBe(0);
    expect(clampHp(30, 26)).toBe(26);
    expect(clampHp(20, 26)).toBe(20);
  });
});

describe("adjustHp", () => {
  it("applies delta within bounds", () => {
    expect(adjustHp(20, 26, -6)).toBe(14);
    expect(adjustHp(20, 26, 10)).toBe(26);
  });
});

describe("applyLongRestHp", () => {
  it("sets current HP to max", () => {
    const character = sampleCharacter();
    expect(applyLongRestHp(character).currentHp).toBe(26);
  });
});
