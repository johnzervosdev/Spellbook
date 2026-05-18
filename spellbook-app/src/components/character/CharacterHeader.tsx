import { useState } from "react";
import type { Character } from "../../types";
import { CharacterStats } from "./CharacterStats";
import { CharacterEditor } from "./CharacterEditor";
import { Button } from "../common/Button";

interface Props {
  character: Character;
  onUpdate: (character: Character) => void;
}

export const CharacterHeader = ({ character, onUpdate }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <header className="character-header character-header--editing">
        <CharacterEditor
          character={character}
          onSave={(next) => {
            onUpdate(next);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      </header>
    );
  }

  return (
    <header className="character-header">
      <div className="character-identity">
        <h1 className="character-name">{character.name}</h1>
        <p className="character-subtitle">
          {character.casterClass} &mdash; Level {character.classLevel}
        </p>
      </div>
      <CharacterStats character={character} />
      <Button
        type="button"
        className="character-edit-toggle"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </Button>
    </header>
  );
};
