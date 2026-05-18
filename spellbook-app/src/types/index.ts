export type SpellLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const SPELLCASTING_CLASSES = [
  "Artificer",
  "Bard",
  "Cleric",
  "Druid",
  "Paladin",
  "Ranger",
  "Sorcerer",
  "Warlock",
  "Wizard",
] as const;

export type SpellcastingClass = (typeof SPELLCASTING_CLASSES)[number];

export interface Spell {
  id: string;
  name: string;
  level: SpellLevel;
  school?: string;
  description: string;
  prepared: boolean;
}

export interface Character {
  name: string;
  casterClass: SpellcastingClass;
  classLevel: number;
  spellcastingAbilityModifier: number;
  spellSaveDC: number;
  spellAttackBonus: number;
}

export type SpellSlotState = {
  [Level in Exclude<SpellLevel, 0>]: {
    total: number;
    used: number;
  };
};

export interface SpellbookState {
  character: Character;
  spells: Spell[];
  slots: SpellSlotState;
}
