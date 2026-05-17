import type { Character } from "../../types";
import { formatModifier } from "../../features/character/characterUtils";

interface Props {
  character: Character;
}

export const CharacterStats = ({ character }: Props) => (
  <dl className="stats">
    <div className="stat">
      <dt>Ability Mod</dt>
      <dd>{formatModifier(character.spellcastingAbilityModifier)}</dd>
    </div>
    <div className="stat">
      <dt>Save DC</dt>
      <dd>{character.spellSaveDC}</dd>
    </div>
    <div className="stat">
      <dt>Attack</dt>
      <dd>{formatModifier(character.spellAttackBonus)}</dd>
    </div>
    <div className="stat">
      <dt>Level</dt>
      <dd>{character.classLevel}</dd>
    </div>
  </dl>
);
