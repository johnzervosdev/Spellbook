import type { Character } from "../../types";

export const defaultCharacter = (): Character => ({
  name: "Süunöphel Brüwthäne",
  casterClass: "Wizard",
  classLevel: 3,
  spellcastingAbilityModifier: 3,
  spellSaveDC: 13,
  spellAttackBonus: 5,
});
