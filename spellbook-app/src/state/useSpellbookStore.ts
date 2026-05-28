import { useEffect, useState } from "react";
import type { Character, Spell, SpellbookState } from "../types";
import { clampHp } from "../features/character/characterHpUtils";
import { defaultCharacter } from "../features/character/characterModel";
import { defaultSpellSlots } from "../features/slots/slotModel";
import { sampleSpells } from "../data/sampleSpells";
import { loadState, saveState } from "./persistence";

const FALLBACK_SCHOOL = "Evocation" as const;

const normalizeSpell = (spell: Spell): Spell => ({
  ...spell,
  school: spell.school ?? FALLBACK_SCHOOL,
  ritual: spell.ritual ?? false,
});

const normalizeCharacter = (loaded: Character, defaults: Character): Character => {
  const maxHp = loaded.maxHp ?? defaults.maxHp;
  const currentHp = clampHp(loaded.currentHp ?? defaults.currentHp, maxHp);
  return { ...defaults, ...loaded, maxHp, currentHp };
};

export const initialState = (): SpellbookState => ({
  character: defaultCharacter(),
  spells: sampleSpells(),
  slots: defaultSpellSlots(),
});

export const mergeLoadedState = (
  loaded: SpellbookState | null,
  defaults: SpellbookState,
): SpellbookState => {
  if (!loaded) return defaults;
  return {
    ...loaded,
    character: normalizeCharacter(loaded.character, defaults.character),
    spells: (loaded.spells ?? defaults.spells).map(normalizeSpell),
  };
};

const hydrate = (): SpellbookState => mergeLoadedState(loadState(), initialState());

export const useSpellbookStore = () => {
  const [state, setState] = useState<SpellbookState>(hydrate);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return { state, setState };
};
