import type { Spell } from "../types";

export const sampleSpells = (): Spell[] => [
  {
    id: "seed-magic-missile",
    name: "Magic Missile",
    level: 1,
    school: "Evocation",
    description:
      "Three glowing darts of magical force, each striking a creature of your choice for 1d4 + 1 force damage.",
    prepared: true,
    ritual: false,
  },
  {
    id: "seed-shield",
    name: "Shield",
    level: 1,
    school: "Abjuration",
    description:
      "An invisible barrier of magical force appears, granting +5 AC until the start of your next turn.",
    prepared: true,
    ritual: false,
  },
  {
    id: "seed-mage-armor",
    name: "Mage Armor",
    level: 1,
    school: "Abjuration",
    description:
      "A protective magical force surrounds an unarmored creature, setting its AC to 13 + Dex modifier for 8 hours.",
    prepared: false,
    ritual: false,
  },
];
