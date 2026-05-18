import { useState, type FormEvent } from "react";
import type { Character, SpellcastingClass } from "../../types";
import { SPELLCASTING_CLASSES } from "../../types";
import { Button } from "../common/Button";

interface Props {
  character: Character;
  onSave: (next: Character) => void;
  onCancel: () => void;
}

const toInt = (raw: string): number => {
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const CharacterEditor = ({ character, onSave, onCancel }: Props) => {
  const [draft, setDraft] = useState<Character>(character);

  const update = <K extends keyof Character>(key: K, value: Character[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave({ ...draft, name: draft.name.trim() });
  };

  return (
    <form className="character-editor" onSubmit={handleSubmit}>
      <div className="character-editor-grid">
        <label className="field field--wide">
          <span>Name</span>
          <input
            type="text"
            value={draft.name}
            required
            maxLength={60}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>
        <label className="field">
          <span>Class</span>
          <select
            value={draft.casterClass}
            required
            onChange={(e) => update("casterClass", e.target.value as SpellcastingClass)}
          >
            {SPELLCASTING_CLASSES.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Level</span>
          <input
            type="number"
            value={draft.classLevel}
            min={1}
            max={20}
            required
            onChange={(e) => update("classLevel", toInt(e.target.value))}
          />
        </label>
        <label className="field">
          <span>Ability Mod</span>
          <input
            type="number"
            value={draft.spellcastingAbilityModifier}
            min={-5}
            max={10}
            required
            onChange={(e) => update("spellcastingAbilityModifier", toInt(e.target.value))}
          />
        </label>
        <label className="field">
          <span>Save DC</span>
          <input
            type="number"
            value={draft.spellSaveDC}
            min={1}
            max={30}
            required
            onChange={(e) => update("spellSaveDC", toInt(e.target.value))}
          />
        </label>
        <label className="field">
          <span>Attack</span>
          <input
            type="number"
            value={draft.spellAttackBonus}
            min={-5}
            max={20}
            required
            onChange={(e) => update("spellAttackBonus", toInt(e.target.value))}
          />
        </label>
      </div>
      <div className="character-editor-actions">
        <Button type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="btn--primary">
          Save
        </Button>
      </div>
    </form>
  );
};
