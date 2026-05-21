import type { Character, SpellSlotState } from "../types";
import { SpellbookView } from "../components/spellbook/SpellbookView";
import { useSpellbookStore } from "../state/useSpellbookStore";
import { restoreAllSlots, spendSlot } from "../features/slots/slotUtils";

export const App = () => {
  const { state, setState } = useSpellbookStore();

  const updateCharacter = (character: Character) =>
    setState((prev) => ({ ...prev, character }));

  const consumeSlot = (level: keyof SpellSlotState) =>
    setState((prev) => ({ ...prev, slots: spendSlot(prev.slots, level) }));

  const longRest = () =>
    setState((prev) => ({ ...prev, slots: restoreAllSlots(prev.slots) }));

  return (
    <SpellbookView
      state={state}
      updateCharacter={updateCharacter}
      consumeSlot={consumeSlot}
      longRest={longRest}
    />
  );
};
