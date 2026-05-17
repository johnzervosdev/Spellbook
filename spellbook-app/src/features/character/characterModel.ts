import type { Character } from "../../types";

export const defaultCharacter = (): Character => ({
  name: "Unnamed Caster",
  classLevel: 1,
  spellcastingAbilityModifier: 3,
  spellSaveDC: 13,
  spellAttackBonus: 5,
});
