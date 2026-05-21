import { useState } from "react";
import type { Spell, SpellSlotState } from "../../types";
import { formatSpellLevel } from "../../features/spells/spellUtils";
import { availableSlotLevels } from "../../features/slots/slotUtils";
import { Button } from "../common/Button";

interface Props {
  spell: Spell | null;
  slots: SpellSlotState;
  onConsumeSlot: (level: keyof SpellSlotState) => void;
}

export const SpellDetail = ({ spell, slots, onConsumeSlot }: Props) => {
  if (!spell) {
    return <p className="empty">Select a spell to read its inscription.</p>;
  }
  return (
    <SpellDetailInner
      key={spell.id}
      spell={spell}
      slots={slots}
      onConsumeSlot={onConsumeSlot}
    />
  );
};

interface InnerProps {
  spell: Spell;
  slots: SpellSlotState;
  onConsumeSlot: (level: keyof SpellSlotState) => void;
}

const SpellDetailInner = ({ spell, slots, onConsumeSlot }: InnerProps) => {
  const isCantrip = spell.level === 0;
  const minLevel = spell.level === 0 ? 1 : spell.level;
  const available = isCantrip ? [] : availableSlotLevels(slots, minLevel);

  const defaultLevel: keyof SpellSlotState | null =
    available.length === 0
      ? null
      : available.includes(spell.level as keyof SpellSlotState)
        ? (spell.level as keyof SpellSlotState)
        : available[0];

  const [requested, setRequested] = useState<keyof SpellSlotState | null>(defaultLevel);

  const effectiveLevel: keyof SpellSlotState | null =
    requested !== null && available.includes(requested) ? requested : defaultLevel;

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
      {!isCantrip && (
        <div className="cast-row">
          {available.length === 0 ? (
            <p className="cast-empty">
              No spell slots available at level {spell.level} or higher.
            </p>
          ) : (
            <>
              <label className="cast-level">
                <span>Cast at</span>
                <select
                  value={effectiveLevel ?? ""}
                  onChange={(e) =>
                    setRequested(Number(e.target.value) as keyof SpellSlotState)
                  }
                >
                  {available.map((level) => (
                    <option key={level} value={level}>
                      {formatSpellLevel(level)}
                    </option>
                  ))}
                </select>
              </label>
              <Button
                type="button"
                className="btn--primary"
                onClick={() => effectiveLevel !== null && onConsumeSlot(effectiveLevel)}
                disabled={effectiveLevel === null}
              >
                Cast
              </Button>
            </>
          )}
        </div>
      )}
    </article>
  );
};
