import { useState } from "react";
import type { SpellbookState } from "../types";
import { defaultCharacter } from "../features/character/characterModel";
import { defaultSpellSlots } from "../features/slots/slotModel";
import { sampleSpells } from "../data/sampleSpells";

const initialState = (): SpellbookState => ({
  character: defaultCharacter(),
  spells: sampleSpells(),
  slots: defaultSpellSlots(),
});

export const useSpellbookStore = () => {
  const [state, setState] = useState<SpellbookState>(initialState);
  return { state, setState };
};
