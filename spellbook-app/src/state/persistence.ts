import type { SpellbookState } from "../types";

const STORAGE_KEY = "spellbook.state.v1";

export const saveState = (state: SpellbookState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.warn("saveState failed", err);
  }
};

export const loadState = (): SpellbookState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SpellbookState;
  } catch (err) {
    console.warn("loadState failed", err);
    return null;
  }
};
