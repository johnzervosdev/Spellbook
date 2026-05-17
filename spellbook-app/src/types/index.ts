export type SpellLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

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
