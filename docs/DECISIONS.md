# DECISIONS.md

## Purpose

This document records important architectural and product decisions along with their rationale. It prevents scope drift and helps future development agents understand intent.

---

## 1. No Backend (MVP)

Decision:
No backend service will be used.

Reason:
- MVP is single-user only
- No need for shared or synced data
- Reduces complexity significantly
- Allows fast iteration in frontend only

Tradeoff:
- No cross-device persistence
- No cloud backup

---

## 2. Local Storage for Persistence

Decision:
Use browser localStorage for saving application state.

Reason:
- Simple and reliable for single-device use
- Survives browser restart
- No infrastructure required

Tradeoff:
- Limited storage size
- No syncing across devices

---

## 3. React-Based Frontend

Decision:
Use React (optionally Next.js).

Reason:
- Component-based UI fits spellbook layout well
- Strong ecosystem
- Works well with Cursor AI-assisted development
- Easy to iterate on UI rapidly

Tradeoff:
- Some initial setup complexity vs vanilla JS

---

## 4. No Authentication System

Decision:
No login or user accounts in MVP.

Reason:
- Single-user application
- Not a shared product yet
- Avoids backend and security complexity

Tradeoff:
- Cannot support multiple users or cloud identity

---

## 5. No Full Spell Database Integration

Decision:
Spells will be manually added or seeded minimally.

Reason:
- Avoid licensing and data ingestion complexity
- Keeps focus on interaction design, not data sourcing

Tradeoff:
- User must input or manage spell data manually

---

## 6. No Rules Automation

Decision:
App will NOT enforce D&D rules automatically.

Reason:
- Avoids turning into a rules engine
- Keeps scope focused on tracking, not adjudication

Tradeoff:
- User must manually manage rule correctness

---

## 7. Spellbook Aesthetic as Core Requirement

Decision:
UI must feel like a spellbook rather than a dashboard.

Reason:
- Primary differentiator from existing tools
- Improves immersion and usability during RP sessions

Tradeoff:
- Additional UI design effort vs standard UI components

---

## 8. Deployment is Optional (Not Part of MVP)

Decision:
Hosting via Vercel is optional and not required for MVP completion.

Reason:
- MVP is local-use first
- Deployment is only for demonstration purposes

Tradeoff:
- No instant sharing until later step