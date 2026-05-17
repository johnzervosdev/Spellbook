import type { Spell, SpellLevel } from "../../types";
import { groupSpellsByLevel, formatSpellLevel } from "../../features/spells/spellUtils";
import { SpellItem } from "./SpellItem";

interface Props {
  spells: Spell[];
  selectedSpellId: string | null;
  onSelect: (id: string) => void;
}

export const SpellList = ({ spells, selectedSpellId, onSelect }: Props) => {
  const grouped = groupSpellsByLevel(spells);
  const levels = Object.keys(grouped)
    .map(Number)
    .filter((level) => grouped[level as SpellLevel].length > 0) as SpellLevel[];

  if (levels.length === 0) {
    return <p className="empty">No spells inscribed yet.</p>;
  }

  return (
    <div className="spell-list">
      {levels.map((level) => (
        <div key={level} className="spell-level-group">
          <h3 className="spell-level-heading">{formatSpellLevel(level)}</h3>
          <ul className="spell-level-list">
            {grouped[level].map((spell) => (
              <SpellItem
                key={spell.id}
                spell={spell}
                selected={spell.id === selectedSpellId}
                onSelect={onSelect}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
