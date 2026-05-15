# ARCHITECTURE.md

## 1. Overview

This project is a personal-use spellbook application for Dungeons & Dragons 5e spellcasters. It reduces friction during play by providing a fast, immersive interface for managing spells, spell slots, and key character casting stats.

It is NOT a full character sheet system and does not aim to replace tools like D&D Beyond. It is a focused companion tool used during gameplay.

---

## 2. Core Goals

- Provide a fast spell management interface during play
- Track known and prepared spells
- Track spell slot usage in real time
- Display key spellcasting-related character stats
- Persist state locally so it survives browser and device restarts
- Present UI as an immersive “spellbook”

---

## 3. Non-Goals

- Character sheet management (HP, inventory, skills, feats, etc.)
- Multiplayer or shared campaign features
- Authentication or user accounts
- Cloud sync or cross-device state sharing
- Rules automation (concentration tracking, durations, enforcement)
- Full spell database ingestion from all sourcebooks
- AI-driven recommendations or assistance
- Combat or encounter tracking

---

## 4. High-Level Architecture

Single-page client-side web application.

No backend service in MVP.

### Components
- Frontend UI (React-based)
- Local persistence layer (browser storage)
- In-memory application state

---

## 5. Tech Stack

- Frontend: React
- Language: TypeScript
- Styling: CSS modules
- Persistence: browser localStorage (MVP)
- Dev environment: Cursor IDE
- Version control: Git + GitHub

Optional later:
- Deployment: Vercel

---

## 6. Data Model (MVP)

### Character
- name (optional)
- spellcasting ability modifier
- spell save DC
- spell attack bonus
- class level(s)

### Spell
- name
- level (0–9)
- description
- school (optional)
- prepared status
- used status

### Spell Slots
- total slots per level
- used slots per level

---

## 7. State Management

- React state during runtime
- Persisted to localStorage on changes
- Hydrated from localStorage on load
- Default state if none exists

---

## 8. Persistence Strategy

- Use browser localStorage
- Store full state as JSON
- Save on updates (debounce optional later)
- Load on startup

Result:
- closing laptop preserves data
- reopening restores session

---

## 9. UI Architecture

Spellbook-themed interface.

### Primary Views
- Spell list (filter by level)
- Spell detail view
- Spell slot tracker
- Character stats header

Goal:
Make it feel like a magical tome, not a dashboard.

---

## 10. Deployment (Optional)

If deployed, use Vercel to host a static frontend.

Deployment is NOT required for MVP functionality.

---

## 11. Future Extensions (Out of Scope for MVP)

- Mobile-first spellbook mode
- Cloud sync
- Authentication
- Spell import/export tools
- Full spell database integration
- Animations/sound design
- Offline installable PWA

---

## 12. Guiding Principle

If a feature does not improve in-play usability for a single spellcaster, it is out of scope for MVP.