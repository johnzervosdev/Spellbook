import { describe, expect, it } from "vitest";
import { addSpell, createSpell, removeSpell, toggleSpellPrepared } from "./spellModel";
import type { Spell } from "../../types";

const spell = (overrides: Partial<Spell> = {}): Spell => ({
  id: "test-id",
  name: "Test Spell",
  level: 1,
  school: "Evocation",
  description: "Test description.",
  prepared: false,
  ritual: false,
  ...overrides,
});

describe("createSpell", () => {
  it("generates a fresh id", () => {
    const a = createSpell({ name: "A", level: 1, school: "Evocation", description: "" });
    const b = createSpell({ name: "B", level: 1, school: "Evocation", description: "" });
    expect(a.id).not.toBe(b.id);
    expect(a.id).toBeTruthy();
  });

  it("defaults prepared to false", () => {
    const s = createSpell({ name: "S", level: 1, school: "Evocation", description: "" });
    expect(s.prepared).toBe(false);
  });

  it("respects explicit prepared flag", () => {
    const s = createSpell({
      name: "S",
      level: 1,
      school: "Evocation",
      description: "",
      prepared: true,
      ritual: false,
    });
    expect(s.prepared).toBe(true);
  });

  it("respects explicit ritual flag", () => {
    const s = createSpell({
      name: "Identify",
      level: 1,
      school: "Divination",
      description: "",
      ritual: true,
    });
    expect(s.ritual).toBe(true);
  });

  it("defaults ritual to false when not provided", () => {
    const s = createSpell({
      name: "S",
      level: 1,
      school: "Evocation",
      description: "",
    });
    expect(s.ritual).toBe(false);
  });
});

describe("addSpell", () => {
  it("appends the spell to the list", () => {
    const list = [spell({ id: "a" })];
    const next = addSpell(list, spell({ id: "b" }));
    expect(next.map((s) => s.id)).toEqual(["a", "b"]);
  });

  it("does not mutate the original list", () => {
    const list = [spell({ id: "a" })];
    addSpell(list, spell({ id: "b" }));
    expect(list).toHaveLength(1);
  });
});

describe("removeSpell", () => {
  it("removes the spell with the matching id", () => {
    const list = [spell({ id: "a" }), spell({ id: "b" }), spell({ id: "c" })];
    expect(removeSpell(list, "b").map((s) => s.id)).toEqual(["a", "c"]);
  });

  it("is a no-op when the id is not present", () => {
    const list = [spell({ id: "a" })];
    expect(removeSpell(list, "missing")).toEqual(list);
  });
});

describe("toggleSpellPrepared", () => {
  it("flips prepared from false to true", () => {
    const list = [spell({ id: "a", prepared: false })];
    expect(toggleSpellPrepared(list, "a")[0].prepared).toBe(true);
  });

  it("flips prepared from true to false", () => {
    const list = [spell({ id: "a", prepared: true })];
    expect(toggleSpellPrepared(list, "a")[0].prepared).toBe(false);
  });

  it("leaves other spells untouched", () => {
    const list = [
      spell({ id: "a", prepared: false }),
      spell({ id: "b", prepared: true }),
    ];
    const next = toggleSpellPrepared(list, "a");
    expect(next[1].prepared).toBe(true);
  });
});
