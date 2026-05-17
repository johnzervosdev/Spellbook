import { SpellbookView } from "../components/spellbook/SpellbookView";
import { useSpellbookStore } from "../state/useSpellbookStore";

export const App = () => {
  const { state } = useSpellbookStore();
  return <SpellbookView state={state} />;
};
