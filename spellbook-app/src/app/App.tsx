import type { Character, Spell, SpellSlotState } from "../types";
import { SpellbookView } from "../components/spellbook/SpellbookView";
import { useSpellbookStore } from "../state/useSpellbookStore";
import { adjustHp, applyLongRestHp } from "../features/character/characterHpUtils";
import { restoreAllSlots, spendSlot } from "../features/slots/slotUtils";
import { addSpell, removeSpell, toggleSpellPrepared } from "../features/spells/spellModel";

export const App = () => {
  const { state, setState } = useSpellbookStore();

  const updateCharacter = (character: Character) =>
    setState((prev) => ({ ...prev, character }));

  const consumeSlot = (level: keyof SpellSlotState) =>
    setState((prev) => ({ ...prev, slots: spendSlot(prev.slots, level) }));

  const adjustHitPoints = (delta: number) =>
    setState((prev) => ({
      ...prev,
      character: {
        ...prev.character,
        currentHp: adjustHp(
          prev.character.currentHp,
          prev.character.maxHp,
          delta,
        ),
      },
    }));

  const longRest = () =>
    setState((prev) => ({
      ...prev,
      slots: restoreAllSlots(prev.slots),
      character: applyLongRestHp(prev.character),
    }));

  const handleAddSpell = (spell: Spell) =>
    setState((prev) => ({ ...prev, spells: addSpell(prev.spells, spell) }));

  const handleRemoveSpell = (id: string) =>
    setState((prev) => ({ ...prev, spells: removeSpell(prev.spells, id) }));

  const handleTogglePrepared = (id: string) =>
    setState((prev) => ({ ...prev, spells: toggleSpellPrepared(prev.spells, id) }));

  return (
    <SpellbookView
      state={state}
      updateCharacter={updateCharacter}
      onAdjustHp={adjustHitPoints}
      consumeSlot={consumeSlot}
      longRest={longRest}
      addSpell={handleAddSpell}
      removeSpell={handleRemoveSpell}
      togglePrepared={handleTogglePrepared}
    />
  );
};
