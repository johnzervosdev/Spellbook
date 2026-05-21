import type { Spell } from "../../types";

interface Props {
  spell: Spell;
  selected: boolean;
  onSelect: (id: string) => void;
}

export const SpellItem = ({ spell, selected, onSelect }: Props) => (
  <li
    className={`spell-item${selected ? " spell-item--selected" : ""}`}
    onClick={() => onSelect(spell.id)}
  >
    <span className="spell-item-name">
      {spell.name}
      {spell.ritual && (
        <span className="ritual-badge" title="Ritual" aria-label="Ritual">
          R
        </span>
      )}
    </span>
    {spell.prepared && <span className="spell-item-tag">prepared</span>}
  </li>
);
