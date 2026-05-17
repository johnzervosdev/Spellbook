import type { Spell } from "../../types";
import { formatSpellLevel } from "../../features/spells/spellUtils";

interface Props {
  spell: Spell | null;
}

export const SpellDetail = ({ spell }: Props) => {
  if (!spell) {
    return <p className="empty">Select a spell to read its inscription.</p>;
  }

  return (
    <article className="spell-detail">
      <header>
        <h3 className="spell-detail-name">{spell.name}</h3>
        <p className="spell-detail-meta">
          {formatSpellLevel(spell.level)}
          {spell.school ? ` \u00b7 ${spell.school}` : ""}
          {spell.prepared ? " \u00b7 prepared" : ""}
        </p>
      </header>
      <p className="spell-detail-description">{spell.description}</p>
    </article>
  );
};
