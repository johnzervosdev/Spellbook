import { useEffect, useState } from "react";
import type { SpellbookState } from "../types";
import { defaultCharacter } from "../features/character/characterModel";
import { defaultSpellSlots } from "../features/slots/slotModel";
import { sampleSpells } from "../data/sampleSpells";
import { loadState, saveState } from "./persistence";

const initialState = (): SpellbookState => ({
  character: defaultCharacter(),
  spells: sampleSpells(),
  slots: defaultSpellSlots(),
});

const hydrate = (): SpellbookState => loadState() ?? initialState();

export const useSpellbookStore = () => {
  const [state, setState] = useState<SpellbookState>(hydrate);

  useEffect(() => {
    saveState(state);
  }, [state]);

  return { state, setState };
};
