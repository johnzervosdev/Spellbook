import type { Character } from "../types";
import { SpellbookView } from "../components/spellbook/SpellbookView";
import { useSpellbookStore } from "../state/useSpellbookStore";

export const App = () => {
  const { state, setState } = useSpellbookStore();

  const updateCharacter = (character: Character) =>
    setState((prev) => ({ ...prev, character }));

  return <SpellbookView state={state} updateCharacter={updateCharacter} />;
};
