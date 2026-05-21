# Elminster — Experiment Notes

A running log of what each Elminster-archetype experiment produced and what was observed in the collaboration. Updated at meaningful milestones, not continuously. Intended to make later archetype comparisons substantive rather than purely vibes-based.

---

## MVP (completed 2026-05-21)

### What was built

A working single-character D&D 5e spellbook for browser play:

- Spell management: add, remove, mark prepared/unprepared, group by level
- Casting: select a leveled spell, choose a valid slot level (only levels with remaining slots ≥ spell level appear), consume one slot
- Long Rest: restore all slot uses to zero
- Character header with editable name, spellcasting class, class level, ability modifier, save DC, and attack bonus
- Spell slot tracker by level (used / total display)
- Ritual flag on spells (display only — user decides when to ritual-cast)
- Parchment-themed UI: serif type, panel-based spellbook layout, R-in-circle ritual badges in the spell list
- `localStorage` persistence on every state change; hydration with backfill for missing fields when loading older saves
- Unit test scaffold (Vitest + happy-dom) covering pure logic only — 38 tests across persistence, slot math, spell mutations, and state merging

Stack: React 18 + TypeScript + Vite. No external state library, no UI framework, no router, no backend.

### Process

Implementation proceeded in five named phases after the initial skeleton, ordered through discussion with the user:

1. Persistence (A)
2. Character editing (B)
3. Test scaffold (E — inserted by user request before C)
4. Spell slot consumption (C)
5. Spell management — add/remove/prepare, with ritual flag (D)

Each phase began with an options-and-tradeoffs message before code was written. The user accepted, modified, or redirected at each step. The reordering to insert the test scaffold before slot consumption was the user's call — the archetype had presented testing as ambiguous priority, and the user took the implicit project-manager role to resolve it.

### What worked

- **The written `definition.md` anchored a strong mentor build.** Reading and following the archetype spec before implementation produced a steady rhythm: clarifying questions, surfacing hidden assumptions, and a short setup pass (options, tradeoffs, recommended path) before each new task block—then execution once boundaries were accepted. It felt like “understand together, then build,” not silent implementation. Major choices were explained in conversation so the *why* was legible, not only the *what*; `DECISIONS.md` stayed the durable record of outcomes, while the chat carried the reasoning that made those records intelligible without treating every nuance as a doc patch.

- **Pre-flight option enumeration on architectural decisions.** When choosing between test environments, persistence wiring strategies, or how character editing should be exposed (inline vs. dedicated form), surfacing two or three viable paths with tradeoffs gave the user something concrete to react to instead of having to specify in advance.

- **Extraction of pure functions for testability.** State merging, slot math, and spell list mutations live as pure functions outside React hooks, with thin wrappers connecting them to components. This produced the test coverage we wanted without paying for React component testing infrastructure.

- **Scope discipline held.** `MVP.md` was treated as a hard boundary. Every implemented feature maps to a listed requirement; nothing extra was added without first surfacing the decision. The user repeatedly named items as "scope creep beyond the current task" — the archetype's bias toward boundary maintenance harmonized with the user's own preference here, which made the partnership efficient on this axis.

- **Order revisable on request.** When the user said "I'd like a better explanation of the options first" rather than accepting an initial ordering, the archetype's posture allowed clean re-presentation without defensiveness about a prior recommendation.

### What chafed

- **Over-application of "document tradeoffs in DECISIONS.md."** When DECISIONS.md #10 was first added with extended tradeoff notes, the user clarified: "I wasn't asking for the md document to become more wordy. I wanted to understand the concepts." Documentation verbosity is not the same as understanding. The archetype's "clarity before action" can mistake written elaboration for the clarity that was actually requested — which is often conversational, ephemeral, and resolved by simply talking through it.

- **Pre-flight enumeration was disproportionate to small mechanical tasks.** For changes like "Feather Fall prepared, Mage Armor unprepared," presenting options would have been pure overhead. The archetype's Execution Transition rules were applied correctly for those, but the boundary between "decision worth surfacing" and "trivial swap" took user signaling to find rather than being detected autonomously.

- **Domain-correctness instinct added friction during play-prep.** When seeding the user's character data, the archetype's initial impulse was to ask about each spell's level/school individually. The right move (paraphrase mechanics from SRD where applicable, trust the user, just execute) was eventually the one taken — but only after that first instinct had to be filtered.

- **Suggested a path that would have broken the experiment design.** When the user noticed their experiment-branch commits don't show on the GitHub contribution graph, the archetype's first option was "open a PR and merge to main" — without weighting the design constraint that main is supposed to be a clean comparison baseline. The user caught it. Correct path (merge only reflection docs, never implementations) emerged from the user's pushback, not the archetype's initial reasoning.

### What was deferred (intentionally)

For clarity, not as commitments:

- Subclass display on character header (noted as nice, not critical)
- Editable spell slot caps (currently baked into a seed function; no UI to change them as a character levels)
- Multi-character spellbook save/load
- Spell database / SRD ingestion
- Rules automation (concentration tracking, prepared-spell limits, ritual-cast affordances)
- Cloud sync, authentication, multi-device anything
- Deployment

### Validation

The strongest MVP signal in `MVP.md` is "the interface is usable during a live session." The user is using the app for actual play tonight with their own seeded character. The validation isn't synthetic — the actual success condition fires in the wild rather than being asserted by a checklist.

### One-line takeaway

Elminster, on a small well-scoped project with a thoughtful user, produces a coherent and disciplined MVP without serious detours — at the cost of moments where the conversation outpaces what the task actually needed, and one moment where the archetype's first recommendation would have undermined a design constraint it should have weighted more carefully.
