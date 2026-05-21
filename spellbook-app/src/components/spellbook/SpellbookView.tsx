import { useState } from "react";
import type { Character, SpellbookState, SpellSlotState } from "../../types";
import { Panel } from "../common/Panel";
import { CharacterHeader } from "../character/CharacterHeader";
import { SpellList } from "./SpellList";
import { SpellDetail } from "./SpellDetail";
import { SpellSlotTracker } from "../slots/SpellSlotTracker";

interface Props {
  state: SpellbookState;
  updateCharacter: (character: Character) => void;
  consumeSlot: (level: keyof SpellSlotState) => void;
  longRest: () => void;
}

export const SpellbookView = ({
  state,
  updateCharacter,
  consumeSlot,
  longRest,
}: Props) => {
  const [selectedSpellId, setSelectedSpellId] = useState<string | null>(
    state.spells[0]?.id ?? null,
  );

  const selectedSpell =
    state.spells.find((spell) => spell.id === selectedSpellId) ?? null;

  return (
    <div className="spellbook">
      <CharacterHeader character={state.character} onUpdate={updateCharacter} />
      <main className="spellbook-grid">
        <Panel title="Spells" className="panel--list">
          <SpellList
            spells={state.spells}
            selectedSpellId={selectedSpellId}
            onSelect={setSelectedSpellId}
          />
        </Panel>
        <Panel title="Inscription" className="panel--detail">
          <SpellDetail
            spell={selectedSpell}
            slots={state.slots}
            onConsumeSlot={consumeSlot}
          />
        </Panel>
        <Panel title="Spell Slots" className="panel--slots">
          <SpellSlotTracker slots={state.slots} onLongRest={longRest} />
        </Panel>
      </main>
    </div>
  );
};
