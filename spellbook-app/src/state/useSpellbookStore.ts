import { useEffect, useState } from "react";
import type { SpellbookState } from "../types";
import { defaultCharacter } from "../features/character/characterModel";
import { defaultSpellSlots } from "../features/slots/slotModel";
import { sampleSpells } from "../data/sampleSpells";
import { loadState, saveState } from "./persistence";

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
    character: { ...defaults.character, ...loaded.character },
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
