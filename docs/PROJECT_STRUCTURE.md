# PROJECT_STRUCTURE.md

## Purpose

This document defines the file and folder structure for the Spellbook MVP.

The goal is a simple, maintainable React-based application that is easy for both humans and AI agents to understand and modify.

The structure prioritizes clarity over abstraction.

---

## Root Structure
/docs
MVP.md
ARCHITECTURE.md
DECISIONS.md
/spellbook-app
/src
/public
package.json
README.md


---

## Source Structure (/src)
/src
/app
App.tsx
main.tsx

/components
/spellbook
SpellbookView.tsx
SpellList.tsx
SpellItem.tsx
SpellDetail.tsx

/character
  CharacterHeader.tsx
  CharacterStats.tsx

/slots
  SpellSlotTracker.tsx

/common
  Button.tsx
  Panel.tsx

  /character
  CharacterHeader.tsx
  CharacterStats.tsx

/slots
  SpellSlotTracker.tsx

/common
  Button.tsx
  Panel.tsx

  /features
/spells
spellModel.ts
spellUtils.ts

/character
  characterModel.ts
  characterUtils.ts

/slots
  slotModel.ts
  slotUtils.ts
  /state
useSpellbookStore.ts
persistence.ts

/types
index.ts

/data
sampleSpells.ts (optional seed data)

/styles
global.css
theme.css


---

## Structure Rationale

### 1. Separation by feature, not by technical layer

Features are grouped into:

- spells
- character
- slots

Reason:
- prevents UI logic from becoming tangled
- makes future expansion easier
- aligns with how the app is mentally modeled during use

---

### 2. Minimal state layer

/state contains:

- application state management
- persistence (localStorage read/write)

No backend abstraction layers exist.

Reason:
- MVP does not require complexity
- state is small and local

---

### 3. Components split into domain + shared

/components is split into:

- spellbook (core UI experience)
- character (stats display)
- slots (resource tracking)
- common (reusable UI primitives)

Reason:
- keeps UI aligned with domain concepts
- avoids generic “UI component soup”

---

### 4. Types centralized

/types holds shared TypeScript interfaces.

Reason:
- ensures consistency across features
- avoids duplicate type definitions

---

### 5. Data isolated

/data contains optional seed data only.

Reason:
- keeps mock data separate from application logic
- allows easy replacement later if real data source is added

---

## State Architecture (Important)

The app uses a simple state model:

- In-memory state during runtime
- Persistent snapshot stored in browser localStorage
- Hydration on app startup

State is NOT synchronized externally.

---

## Key Design Constraints

- No backend folder exists
- No API layer exists
- No authentication layer exists
- No cloud sync layer exists
- No rules engine layer exists

If any of these appear, they are out of scope for MVP.

---

## Guiding Principle

Structure should support:

> “Open app → immediately manage spells during play”

Not:

> “Navigate a complex system of abstractions”