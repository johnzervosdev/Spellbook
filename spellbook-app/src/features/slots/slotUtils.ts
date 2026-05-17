import type { SpellSlotState } from "../../types";

export const remainingSlots = (
  slots: SpellSlotState,
  level: keyof SpellSlotState,
): number => Math.max(0, slots[level].total - slots[level].used);
