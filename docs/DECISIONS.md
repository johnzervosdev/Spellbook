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

---

## 9. Elminster Archetype Agent

Decision:
Use a single Opus 4.7 AI agent for implementation and collaboration.

Agent behavior is defined in:

/archetypes/elminster/definition.md

The agent should act as a mentor-collaborator: thoughtful, disciplined, explanatory, and biased toward architectural simplicity over feature expansion.

Reason:
- Supports the project goal of testing archetypal AI collaboration
- Maps naturally to the Elminster mentor-scholar pattern
- Encourages deliberate reasoning over impulsive implementation
- Reinforces disciplined scope control during MVP development

Tradeoffs:
- May over-explain or become overly philosophical if prompts are not tightly bounded
- Prioritizes archetypal consistency over maximum implementation speed
- May require stricter prompt constraints for highly mechanical coding tasks

---

## 10. Testing: Vitest, Unit Tests Only

Decision:
Use Vitest as the test runner. Tests are limited to unit tests over pure functions. No React Testing Library, no integration tests, no end-to-end browser tests.

Reason:
- Vitest integrates natively with Vite; near-zero configuration overhead compared to Jest, which would require Vite-specific glue.
- In an AI-assisted project, the primary value of tests is regression prevention — not driving design (design pressure happens conversationally during implementation).
- Integration and component testing add layers of complexity disproportionate to a single-user MVP.
- Pure-function unit tests cover the genuinely failure-prone logic (persistence round-trip, state merging, data utilities) without the cost of rendering React trees.

Tradeoffs:
- React component behavior (rendering, click handlers, form submission) is not covered by automated tests; regressions there must be caught by manual review.
- Testable logic that would otherwise live inside React hooks must be extracted into pure functions, which the hook then calls. The hook itself becomes thin plumbing and remains untested.

Alternatives rejected:
- Jest — requires extra configuration to work with Vite/ESM/TypeScript; provides no offsetting benefit for this project.
- React Testing Library / `renderHook` — would allow direct hook testing and component testing, but introduces a layer of complexity not justified at MVP scale.
- TDD — historically valuable for design pressure on human teams; that pressure is largely absorbed by the agent collaboration in this project.

Revisit when:
- Component-level regressions become observable and painful.
- The project moves beyond single-user MVP scope.
- Multiple contributors are involved.

Test environment:
- DOM environment: `happy-dom` (chosen over `jsdom` because the latest `jsdom` requires Node 20.19+; `happy-dom` is leaner, sufficient for our `localStorage`-only needs, and works on Node 20.18).
- Vitest configuration lives in a separate `vitest.config.ts` to avoid a known type conflict between the nested vite copy shipped with Vitest 4 and the root vite installation.

Test file placement:
- Co-located with source as `*.test.ts(x)` files. No separate `__tests__` or `tests/` directory.