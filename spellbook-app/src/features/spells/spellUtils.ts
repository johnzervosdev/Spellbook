import type { Spell, SpellLevel } from "../../types";

export const groupSpellsByLevel = (spells: Spell[]): Record<SpellLevel, Spell[]> => {
  const grouped = {} as Record<SpellLevel, Spell[]>;
  for (let level = 0; level <= 9; level++) {
    grouped[level as SpellLevel] = [];
  }
  for (const spell of spells) {
    grouped[spell.level].push(spell);
  }
  return grouped;
};

export const formatSpellLevel = (level: SpellLevel): string =>
  level === 0 ? "Cantrip" : `Level ${level}`;
