import type { Spell } from "../../types";

export const createSpell = (
  input: Omit<Spell, "id" | "prepared" | "ritual"> & {
    prepared?: boolean;
    ritual?: boolean;
  },
): Spell => ({
  id: crypto.randomUUID(),
  prepared: false,
  ritual: false,
  ...input,
});

export const addSpell = (spells: Spell[], spell: Spell): Spell[] => [...spells, spell];

export const removeSpell = (spells: Spell[], id: string): Spell[] =>
  spells.filter((spell) => spell.id !== id);

export const toggleSpellPrepared = (spells: Spell[], id: string): Spell[] =>
  spells.map((spell) =>
    spell.id === id ? { ...spell, prepared: !spell.prepared } : spell,
  );
