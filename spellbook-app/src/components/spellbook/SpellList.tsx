import { useEffect, useMemo, useState } from "react";
import type { Spell, SpellLevel } from "../../types";
import { groupSpellsByLevel, formatSpellLevel } from "../../features/spells/spellUtils";
import {
  defaultExpandedLevel,
  ensureLevelExpanded,
  toggleExpandedLevel,
} from "../../features/spells/spellListExpand";
import { SpellItem } from "./SpellItem";

interface Props {
  spells: Spell[];
  selectedSpellId: string | null;
  onSelect: (id: string) => void;
}

export const SpellList = ({ spells, selectedSpellId, onSelect }: Props) => {
  const { grouped, levels } = useMemo(() => {
    const grouped = groupSpellsByLevel(spells);
    const levels = Object.keys(grouped)
      .map(Number)
      .filter((level) => grouped[level as SpellLevel].length > 0) as SpellLevel[];
    return { grouped, levels };
  }, [spells]);

  const selectedLevel =
    spells.find((s) => s.id === selectedSpellId)?.level ?? null;

  const [expanded, setExpanded] = useState<Set<SpellLevel>>(() => {
    const initial = defaultExpandedLevel(levels, selectedLevel);
    return initial === null ? new Set() : new Set([initial]);
  });

  useEffect(() => {
    if (levels.length === 0) {
      setExpanded(new Set());
      return;
    }
    const fallback = defaultExpandedLevel(levels, null);
    if (selectedLevel === null) {
      setExpanded(fallback === null ? new Set() : new Set([fallback]));
      return;
    }
    setExpanded((prev) => ensureLevelExpanded(prev, selectedLevel));
  }, [selectedLevel, levels]);

  if (levels.length === 0) {
    return <p className="empty">No spells inscribed yet.</p>;
  }

  const toggleLevel = (level: SpellLevel) => {
    setExpanded((prev) => toggleExpandedLevel(prev, level));
  };

  return (
    <div className="spell-list">
      {levels.map((level) => {
        const isOpen = expanded.has(level);
        const headingId = `spell-level-${level}`;
        const panelId = `spell-level-panel-${level}`;

        return (
          <section key={level} className="spell-level-group">
            <h3 className="spell-level-heading">
              <button
                type="button"
                className="spell-level-toggle"
                aria-expanded={isOpen}
                aria-controls={panelId}
                id={headingId}
                onClick={() => toggleLevel(level)}
              >
                <span className="spell-level-toggle__label">{formatSpellLevel(level)}</span>
                <span className="spell-level-toggle__chevron" aria-hidden="true">
                  {isOpen ? "▾" : "▸"}
                </span>
              </button>
            </h3>
            {isOpen ? (
              <ul className="spell-level-list" id={panelId} role="region" aria-labelledby={headingId}>
                {grouped[level].map((spell) => (
                  <SpellItem
                    key={spell.id}
                    spell={spell}
                    selected={spell.id === selectedSpellId}
                    onSelect={onSelect}
                  />
                ))}
              </ul>
            ) : null}
          </section>
        );
      })}
    </div>
  );
};
