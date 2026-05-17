import type { Character } from "../../types";
import { CharacterStats } from "./CharacterStats";

interface Props {
  character: Character;
}

export const CharacterHeader = ({ character }: Props) => (
  <header className="character-header">
    <div className="character-identity">
      <h1 className="character-name">{character.name}</h1>
      <p className="character-subtitle">Spellcaster &mdash; Level {character.classLevel}</p>
    </div>
    <CharacterStats character={character} />
  </header>
);
