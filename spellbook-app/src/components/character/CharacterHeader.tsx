import { useState } from "react";
import type { Character } from "../../types";
import { CharacterStats } from "./CharacterStats";
import { CharacterHitPoints } from "./CharacterHitPoints";
import { CharacterEditor } from "./CharacterEditor";
import { Button } from "../common/Button";

interface Props {
  character: Character;
  onUpdate: (character: Character) => void;
  onAdjustHp: (delta: number) => void;
}

export const CharacterHeader = ({ character, onUpdate, onAdjustHp }: Props) => {
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
      <div className="character-header__primary">
        <h1 className="character-name">{character.name}</h1>
        <div className="character-header__meta">
          <p className="character-subtitle">
            {character.casterClass} &mdash; Level {character.classLevel}
          </p>
          <CharacterHitPoints character={character} onAdjust={onAdjustHp} />
        </div>
        <Button type="button" className="character-edit-toggle" onClick={() => setIsEditing(true)}>
          Edit
        </Button>
      </div>
      <CharacterStats character={character} />
    </header>
  );
};
