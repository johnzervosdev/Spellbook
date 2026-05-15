# MVP.md

## Purpose

This document defines the minimum viable version of the Spellbook app. If a feature is not listed here, it is not part of the initial build.

The goal is a working, usable spell management tool for a single D&D 5e spellcaster during play.

---

## Core MVP Features

### 1. Spell Management
- Add spells to a character’s spellbook
- Remove spells from a character’s spellbook
- View list of known spells
- View spells grouped by level (0–9)

---

### 2. Spell Interaction
- Mark spells as prepared or unprepared
- Cast spells by consuming spell slots
- Reduce spell slots when casting spells
- Track remaining spell slots by level
- View spell details (name, level, description)

---

### 3. Spell Slot Tracking
- Display available spell slots by level
- Reduce spell slots when used
- Restore spell slots manually

---

### 4. Character Stats Display
- Spellcasting ability modifier
- Spell save DC
- Spell attack bonus
- Character level (or class level for caster)

---

### 5. Persistence
- All data must persist between sessions
- Closing and reopening the browser must restore state
- Data stored locally in browser storage

---

## MVP Constraints

- Single user only
- No authentication
- No cloud sync
- No multiplayer or shared data
- No external database
- No automation of game rules

---

## MVP Success Criteria

The MVP is successful when:

- A user can add a spell
- That spell persists after refresh/restart
- Spell slots can be tracked during use
- The interface is usable during a live session
- The app feels like a spellbook, not a generic dashboard