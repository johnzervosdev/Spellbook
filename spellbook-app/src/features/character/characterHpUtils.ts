import type { Character } from "../../types";

export const clampHp = (current: number, max: number): number =>
  Math.max(0, Math.min(max, current));

export const adjustHp = (current: number, max: number, delta: number): number =>
  clampHp(current + delta, max);

export const applyLongRestHp = (character: Character): Character => ({
  ...character,
  currentHp: character.maxHp,
});
