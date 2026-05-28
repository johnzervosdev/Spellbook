import type { SpellLevel } from "../../types";

/** Default: only the chapter for the selected spell (or the first listed level). */
export const defaultExpandedLevel = (
  levels: SpellLevel[],
  selectedLevel: SpellLevel | null,
): SpellLevel | null => {
  if (levels.length === 0) return null;
  if (selectedLevel !== null && levels.includes(selectedLevel)) return selectedLevel;
  return levels[0];
};

export const toggleExpandedLevel = (
  expanded: Set<SpellLevel>,
  level: SpellLevel,
): Set<SpellLevel> => {
  const next = new Set(expanded);
  if (next.has(level)) next.delete(level);
  else next.add(level);
  return next;
};

export const ensureLevelExpanded = (
  expanded: Set<SpellLevel>,
  level: SpellLevel,
): Set<SpellLevel> => {
  if (expanded.has(level)) return expanded;
  const next = new Set(expanded);
  next.add(level);
  return next;
};
