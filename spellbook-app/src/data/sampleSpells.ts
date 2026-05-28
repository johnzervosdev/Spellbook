import type { Spell } from "../types";

// Seed spellbook for Süunöphel Brüwthäne ("Son of Ale, Brew Thane") —
// a middle-aged dwarven Chronurgy Wizard (Lv 3) from a family of brewers
// who sees magic as another expression of the brewer's craft: patient,
// transformative, and concerned with the shaping of time and matter.
//
// Casting time, range, and duration live in description text for now;
// structured stat-line fields are a later phase.

export const sampleSpells = (): Spell[] => [
  // — Cantrips —
  {
    id: "seed-fire-bolt",
    name: "Fire Bolt",
    level: 0,
    school: "Evocation",
    description:
      "Casting time: 1 action. Range: 120 feet. Duration: Instantaneous. Hurl a mote of fire at a creature or object. Make a ranged spell attack; on a hit, the target takes 1d10 fire damage. A flammable object hit by this spell ignites if it isn't being worn or carried.",
    prepared: false,
    ritual: false,
  },
  {
    id: "seed-mage-hand",
    name: "Mage Hand",
    level: 0,
    school: "Conjuration",
    description:
      "Casting time: 1 action. Range: 30 feet. Duration: 1 minute. A spectral, floating hand appears at a point you choose. The hand can manipulate objects, open unlocked doors and containers, stow or retrieve items from open containers, or pour the contents of a vial. It cannot attack, activate magic items, or carry more than 10 pounds.",
    prepared: false,
    ritual: false,
  },
  {
    id: "seed-prestidigitation",
    name: "Prestidigitation",
    level: 0,
    school: "Transmutation",
    description:
      "Casting time: 1 action. Range: 10 feet. Duration: Up to 1 hour. A minor magical trick: create a harmless sensory effect, light or snuff a candle, clean or soil an object, chill or warm up to 1 cubic foot of nonliving material, make a mark on a surface for 1 hour, or create a nonmagical trinket or illusory image that fits in your hand for a round.",
    prepared: false,
    ritual: false,
  },
  {
    id: "seed-mending",
    name: "Mending",
    level: 0,
    school: "Transmutation",
    description:
      "Casting time: 1 minute. Range: Touch. Duration: Instantaneous. Repair a single break or tear in a touched object no larger than 1 foot in any dimension, leaving no trace of the former damage. Useful for broken chain links, torn cloaks, leaking wineskins, or shattered keys.",
    prepared: false,
    ritual: false,
  },

  // — 1st Level —
  {
    id: "seed-silvery-barbs",
    name: "Silvery Barbs",
    level: 1,
    school: "Enchantment",
    description:
      "Casting time: 1 reaction. Range: 60 feet. Duration: Instantaneous. When a creature you can see within range succeeds on an attack roll, ability check, or saving throw, force it to reroll and use the lower result. Then choose a different creature you can see within range — that creature gains advantage on its next attack roll, ability check, or saving throw within the next minute.",
    prepared: true,
    ritual: false,
  },
  {
    id: "seed-alarm",
    name: "Alarm",
    level: 1,
    school: "Abjuration",
    description:
      "Casting time: 1 minute (ritual: 11 minutes). Range: 30 feet. Duration: 8 hours. Set an alarm against unwanted intrusion in an area no larger than a 20-foot cube. The alarm alerts you whenever a Tiny or larger creature touches or enters the warded area. Choose mental or audible; designate creatures that won't trigger it.",
    prepared: false,
    ritual: true,
  },
  {
    id: "seed-detect-magic",
    name: "Detect Magic",
    level: 1,
    school: "Divination",
    description:
      "Casting time: 1 action (ritual: 11 minutes). Range: Self. Duration: Concentration, up to 10 minutes. Sense the presence of magic within 30 feet. Using an action, you can see a faint aura around any visible creature or object in the area that bears magic and learn its school of magic, if any.",
    prepared: false,
    ritual: true,
  },
  {
    id: "seed-feather-fall",
    name: "Feather Fall",
    level: 1,
    school: "Transmutation",
    description:
      "Casting time: 1 reaction. Range: 60 feet. Duration: 1 minute. Choose up to five falling creatures within range. Until the spell ends, a falling creature's rate of descent slows to 60 feet per round. If a creature lands before the spell ends, it takes no falling damage and can land on its feet.",
    prepared: true,
    ritual: false,
  },
  {
    id: "seed-identify",
    name: "Identify",
    level: 1,
    school: "Divination",
    description:
      "Casting time: 1 minute (ritual: 11 minutes). Range: Touch. Duration: Instantaneous. Touch one object throughout the casting. If it's a magic item or magic-imbued, learn its properties, how to use them, whether attunement is required, and how many charges remain. You also learn any spells affecting the item.",
    prepared: false,
    ritual: true,
  },
  {
    id: "seed-mage-armor",
    name: "Mage Armor",
    level: 1,
    school: "Abjuration",
    description:
      "Casting time: 1 action. Range: Touch. Duration: 8 hours. A protective magical force surrounds an unarmored willing creature you touch. The target's base AC becomes 13 + its Dexterity modifier until the spell ends. Ends if the target dons armor or you dismiss the spell.",
    prepared: false,
    ritual: false,
  },
  {
    id: "seed-magic-missile",
    name: "Magic Missile",
    level: 1,
    school: "Evocation",
    description:
      "Casting time: 1 action. Range: 120 feet. Duration: Instantaneous. Create three glowing darts of magical force. Each dart hits a creature of your choice you can see, dealing 1d4 + 1 force damage. The darts strike simultaneously and can be directed to one creature or several. Higher levels: one additional dart per slot above 1st.",
    prepared: true,
    ritual: false,
  },
  {
    id: "seed-unseen-servant",
    name: "Unseen Servant",
    level: 1,
    school: "Conjuration",
    description:
      "Casting time: 1 action (ritual: 11 minutes). Range: 60 feet. Duration: 1 hour. Create an invisible, mindless, shapeless, Medium force that performs simple tasks at your command. AC 10, 2 HP, Strength 2; cannot attack. If reduced to 0 HP the spell ends.",
    prepared: false,
    ritual: true,
  },

  // — 2nd Level —
  {
    id: "seed-rope-trick",
    name: "Rope Trick",
    level: 2,
    school: "Transmutation",
    description:
      "Casting time: 1 action. Range: Touch. Duration: 1 hour. Touch a length of rope up to 60 feet long. One end rises into the air until the rope hangs perpendicular to the ground. At the upper end an invisible entrance opens into an extradimensional space lasting until the spell ends. Up to eight Medium or smaller creatures can climb in to hide.",
    prepared: true,
    ritual: false,
  },
  {
    id: "seed-vortex-warp",
    name: "Vortex Warp",
    level: 2,
    school: "Conjuration",
    description:
      "Casting time: 1 action. Range: 90 feet. Duration: Instantaneous. Choose a creature you can see. The target must succeed on a Constitution save (a willing target may choose to fail) or you teleport it to an unoccupied space of your choice you can see within range. The destination must be on a surface or in a liquid that can support the target. Higher levels: range increases by 30 feet per slot above 2nd.",
    prepared: true,
    ritual: false,
  },
  {
    id: "seed-hold-person",
    name: "Hold Person",
    level: 2,
    school: "Enchantment",
    description:
      "Casting time: 1 action. Range: 60 feet. Duration: Concentration, up to 1 minute. Choose a humanoid you can see. The target must succeed on a Wisdom saving throw or be paralyzed for the duration. At the end of each of its turns the target can repeat the save; on a success the spell ends on that target.",
    prepared: true,
    ritual: false,
  },

  // — 3rd Level (scroll; awaits 5th-level slots) —
  {
    id: "seed-fireball",
    name: "Fireball",
    level: 3,
    school: "Evocation",
    description:
      "Casting time: 1 action. Range: 150 feet. Duration: Instantaneous. A bright streak flashes from your finger to a point you choose, then blossoms with a low roar into an explosion of flame. Each creature in a 20-foot-radius sphere centered on that point must make a Dexterity saving throw, taking 8d6 fire damage on a failed save or half on a success. Higher levels: +1d6 damage per slot above 3rd.",
    prepared: false,
    ritual: false,
  },
];
