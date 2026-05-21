import type { SpellSlotState } from "../../types";

export const defaultSpellSlots = (): SpellSlotState => ({
  1: { total: 4, used: 0 },
  2: { total: 2, used: 0 },
  3: { total: 0, used: 0 },
  4: { total: 0, used: 0 },
  5: { total: 0, used: 0 },
  6: { total: 0, used: 0 },
  7: { total: 0, used: 0 },
  8: { total: 0, used: 0 },
  9: { total: 0, used: 0 },
});
