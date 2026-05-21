import { describe, expect, it } from "vitest";
import {
  availableSlotLevels,
  remainingSlots,
  restoreAllSlots,
  spendSlot,
} from "./slotUtils";
import type { SpellSlotState } from "../../types";

const slots = (overrides: Partial<SpellSlotState> = {}): SpellSlotState => ({
  1: { total: 4, used: 0 },
  2: { total: 3, used: 0 },
  3: { total: 2, used: 0 },
  4: { total: 0, used: 0 },
  5: { total: 0, used: 0 },
  6: { total: 0, used: 0 },
  7: { total: 0, used: 0 },
  8: { total: 0, used: 0 },
  9: { total: 0, used: 0 },
  ...overrides,
});

describe("remainingSlots", () => {
  it("returns total minus used", () => {
    expect(remainingSlots(slots({ 1: { total: 4, used: 1 } }), 1)).toBe(3);
  });

  it("never returns negative", () => {
    expect(remainingSlots(slots({ 1: { total: 2, used: 5 } }), 1)).toBe(0);
  });
});

describe("spendSlot", () => {
  it("increments used at the given level", () => {
    const next = spendSlot(slots(), 1);
    expect(next[1]).toEqual({ total: 4, used: 1 });
  });

  it("does not affect other levels", () => {
    const next = spendSlot(slots(), 1);
    expect(next[2]).toEqual({ total: 3, used: 0 });
    expect(next[3]).toEqual({ total: 2, used: 0 });
  });

  it("is a no-op when all slots at that level are used", () => {
    const exhausted = slots({ 1: { total: 4, used: 4 } });
    expect(spendSlot(exhausted, 1)).toBe(exhausted);
  });

  it("is a no-op when total is zero", () => {
    const zero = slots({ 4: { total: 0, used: 0 } });
    expect(spendSlot(zero, 4)).toBe(zero);
  });
});

describe("restoreAllSlots", () => {
  it("resets used to zero at every level", () => {
    const spent = slots({
      1: { total: 4, used: 3 },
      2: { total: 3, used: 2 },
      3: { total: 2, used: 1 },
    });
    const restored = restoreAllSlots(spent);
    for (let level = 1 as keyof SpellSlotState; level <= 9; level++) {
      expect(restored[level as keyof SpellSlotState].used).toBe(0);
    }
  });

  it("preserves total counts", () => {
    const spent = slots({ 1: { total: 4, used: 4 } });
    const restored = restoreAllSlots(spent);
    expect(restored[1].total).toBe(4);
  });
});

describe("availableSlotLevels", () => {
  it("returns levels at or above minLevel with remaining slots", () => {
    expect(availableSlotLevels(slots(), 1)).toEqual([1, 2, 3]);
    expect(availableSlotLevels(slots(), 2)).toEqual([2, 3]);
    expect(availableSlotLevels(slots(), 3)).toEqual([3]);
  });

  it("excludes levels with zero total", () => {
    expect(availableSlotLevels(slots(), 4)).toEqual([]);
  });

  it("excludes levels where all slots are spent", () => {
    const spent = slots({ 1: { total: 4, used: 4 } });
    expect(availableSlotLevels(spent, 1)).toEqual([2, 3]);
  });
});
