import { useEffect, useState } from "react";
import type { Character, Spell, SpellbookState, SpellSlotState } from "../../types";
import { Panel } from "../common/Panel";
import { Button } from "../common/Button";
import { CharacterHeader } from "../character/CharacterHeader";
import { SpellList } from "./SpellList";
import { SpellDetail } from "./SpellDetail";
import { SpellbookEditor } from "./SpellbookEditor";
import { SpellSlotTracker } from "../slots/SpellSlotTracker";

interface Props {
  state: SpellbookState;
  updateCharacter: (character: Character) => void;
  consumeSlot: (level: keyof SpellSlotState) => void;
  longRest: () => void;
  addSpell: (spell: Spell) => void;
  removeSpell: (id: string) => void;
  togglePrepared: (id: string) => void;
}

export const SpellbookView = ({
  state,
  updateCharacter,
  consumeSlot,
  longRest,
  addSpell,
  removeSpell,
  togglePrepared,
}: Props) => {
  const [selectedSpellId, setSelectedSpellId] = useState<string | null>(
    state.spells[0]?.id ?? null,
  );
  const [isEditingSpells, setIsEditingSpells] = useState(false);

  useEffect(() => {
    if (selectedSpellId && !state.spells.some((s) => s.id === selectedSpellId)) {
      setSelectedSpellId(state.spells[0]?.id ?? null);
    }
  }, [state.spells, selectedSpellId]);

  const selectedSpell =
    state.spells.find((spell) => spell.id === selectedSpellId) ?? null;

  return (
    <div className="spellbook">
      <CharacterHeader character={state.character} onUpdate={updateCharacter} />
      <main className="spellbook-grid">
        <Panel
          title="Spells"
          className="panel--list"
          headerAction={
            <Button type="button" onClick={() => setIsEditingSpells(true)}>
              Edit Spells
            </Button>
          }
        >
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
            onTogglePrepared={togglePrepared}
            onRemove={removeSpell}
          />
        </Panel>
        <Panel title="Spell Slots" className="panel--slots">
          <SpellSlotTracker slots={state.slots} onLongRest={longRest} />
        </Panel>
      </main>
      {isEditingSpells && (
        <SpellbookEditor
          spells={state.spells}
          onAdd={addSpell}
          onRemove={removeSpell}
          onClose={() => setIsEditingSpells(false)}
        />
      )}
    </div>
  );
};
