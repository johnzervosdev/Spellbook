import type { Spell } from "../../types";

export const createSpell = (input: Omit<Spell, "id" | "prepared"> & { prepared?: boolean }): Spell => ({
  id: crypto.randomUUID(),
  prepared: false,
  ...input,
});
