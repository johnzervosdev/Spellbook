import type { SpellSlotState } from "../../types";

export const ALL_SLOT_LEVELS: Array<keyof SpellSlotState> = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const remainingSlots = (
  slots: SpellSlotState,
  level: keyof SpellSlotState,
): number => Math.max(0, slots[level].total - slots[level].used);

export const spendSlot = (
  slots: SpellSlotState,
  level: keyof SpellSlotState,
): SpellSlotState => {
  const { total, used } = slots[level];
  if (used >= total) return slots;
  return {
    ...slots,
    [level]: { total, used: used + 1 },
  };
};

export const restoreAllSlots = (slots: SpellSlotState): SpellSlotState => {
  const next = {} as SpellSlotState;
  for (const level of ALL_SLOT_LEVELS) {
    next[level] = { total: slots[level].total, used: 0 };
  }
  return next;
};

export const availableSlotLevels = (
  slots: SpellSlotState,
  minLevel: number,
): Array<keyof SpellSlotState> =>
  ALL_SLOT_LEVELS.filter((level) => level >= minLevel && remainingSlots(slots, level) > 0);
