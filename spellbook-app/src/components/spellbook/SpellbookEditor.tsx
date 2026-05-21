import { useEffect, useState, type FormEvent } from "react";
import type { Spell, SpellLevel, SpellSchool } from "../../types";
import { SPELL_SCHOOLS } from "../../types";
import { createSpell } from "../../features/spells/spellModel";
import { formatSpellLevel } from "../../features/spells/spellUtils";
import { Button } from "../common/Button";

interface Props {
  spells: Spell[];
  onAdd: (spell: Spell) => void;
  onRemove: (id: string) => void;
  onClose: () => void;
}

const SPELL_LEVELS: SpellLevel[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

interface Draft {
  name: string;
  level: SpellLevel;
  school: SpellSchool;
  description: string;
  ritual: boolean;
}

const emptyDraft = (): Draft => ({
  name: "",
  level: 1,
  school: "Evocation",
  description: "",
  ritual: false,
});

export const SpellbookEditor = ({ spells, onAdd, onRemove, onClose }: Props) => {
  const [draft, setDraft] = useState<Draft>(emptyDraft);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(
      createSpell({
        name: draft.name.trim(),
        level: draft.level,
        school: draft.school,
        description: draft.description.trim(),
        ritual: draft.ritual,
      }),
    );
    setDraft(emptyDraft());
  };

  const update = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-label="Edit Spells"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2>Edit Spells</h2>
          <Button type="button" onClick={onClose}>
            Close
          </Button>
        </header>

        <section className="modal-section">
          <h3 className="modal-section-title">In your spellbook</h3>
          {spells.length === 0 ? (
            <p className="empty">No spells inscribed yet.</p>
          ) : (
            <ul className="editor-spell-list">
              {spells.map((spell) => (
                <li key={spell.id} className="editor-spell-row">
                  <div className="editor-spell-info">
                    <span className="editor-spell-name">{spell.name}</span>
                    <span className="editor-spell-meta">
                      {formatSpellLevel(spell.level)} &middot; {spell.school}
                      {spell.ritual && " \u00b7 Ritual"}
                    </span>
                  </div>
                  <Button
                    type="button"
                    className="btn--danger"
                    onClick={() => onRemove(spell.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="modal-section">
          <h3 className="modal-section-title">Add a spell</h3>
          <form className="editor-add-form" onSubmit={handleSubmit}>
            <div className="editor-add-grid">
              <label className="field field--wide">
                <span>Name</span>
                <input
                  type="text"
                  value={draft.name}
                  required
                  maxLength={80}
                  onChange={(e) => update("name", e.target.value)}
                />
              </label>
              <label className="field">
                <span>Level</span>
                <select
                  value={draft.level}
                  required
                  onChange={(e) => update("level", Number(e.target.value) as SpellLevel)}
                >
                  {SPELL_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {formatSpellLevel(level)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                <span>School</span>
                <select
                  value={draft.school}
                  required
                  onChange={(e) => update("school", e.target.value as SpellSchool)}
                >
                  {SPELL_SCHOOLS.map((school) => (
                    <option key={school} value={school}>
                      {school}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field field--wide">
                <span>Description</span>
                <textarea
                  value={draft.description}
                  required
                  rows={4}
                  onChange={(e) => update("description", e.target.value)}
                />
              </label>
              <label className="field field--wide field--checkbox">
                <input
                  type="checkbox"
                  checked={draft.ritual}
                  onChange={(e) => update("ritual", e.target.checked)}
                />
                <span>Ritual (can be cast without a spell slot)</span>
              </label>
            </div>
            <div className="editor-add-actions">
              <Button type="submit" className="btn--primary">
                Add Spell
              </Button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
