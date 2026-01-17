# Journal Interaction Bug Hunt (ExecPlan)

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

This repository contains `.agent/PLANS.md`. Maintain this plan in accordance with that file.

## Purpose / Big Picture

Make hard-to-detect interaction bugs reproducible and observable so Codex can find them reliably.

After this plan is executed, a novice contributor can:

- start the app locally,
- reproduce the known journal/page interaction failures,
- capture evidence (screenshots + console/errors),
- and triage whether a failure is caused by click propagation, pointer-event occlusion (layering/z-index), drag/swipe conflicts, or animation locking.

This plan focuses on interaction behavior, not visual design changes.

## Progress

- [ ] (2026-01-17) Confirm baseline: review `docs/log/2026-01-17-interaction-bug-analysis.md` and extract the minimal reproduction steps per bug.
- [ ] (2026-01-17) Add stable UI anchors: introduce accessibility labels/roles for the cover, pages, and navigation controls so automation can click reliably.
- [ ] (2026-01-17) Add dev-only observability: implement a debug HUD (opt-in) that shows page state and last input target/path.
- [ ] (2026-01-17) Automate reproductions: write and run scripted browser steps to reproduce each bug and save evidence to `docs/log/`.
- [ ] (2026-01-17) Expand the search space: run the same scripts under multiple viewports and “fast interaction” rhythms to surface race conditions.
- [ ] (2026-01-17) Produce an updated bug index: one entry per bug with steps, expected/actual, evidence paths, and suspected root cause class.

## Surprises & Discoveries

- Observation:
  Evidence:

## Decision Log

- Decision:
  Rationale:
  Date/Author:

## Outcomes & Retrospective

- Outcome:
  Remaining gaps:
  Lessons:

## Context and Orientation

This project is a Next.js App Router app (Bun runtime) implementing a 3D “junk journal” UI with page flipping and embedded interactive components.

Key files involved in the reported issues:

- `components/journal/Journal.tsx`: owns `isOpen` and renders `JournalCover` + `PageStack`.
- `components/journal/JournalCover.tsx`: cover flip animation; currently binds `onClick={onToggle}` across the cover surface.
- `components/journal/PageStack.tsx`: page turning inputs (click, keyboard, drag/swipe) and navigation controls.
- `components/journal/Page.tsx`: the page surface; click-to-flip is attached to the active page container.
- `hooks/usePageFlip.ts`: state machine for `currentPage/isFlipping`; uses a fixed timeout lock (800ms).
- `hooks/useSwipeGesture.ts`: interprets drag end velocity/offset as swipe-to-flip.

Where interactive “stickers” are defined:

- `components/interactive/`: `Pocket`, `Envelope`, `FlipOut`, `Tag`, etc.
- `content/pages/07-interactive-showcase.tsx`: a single page that intentionally includes multiple interactive widgets.
- Layered pages (higher occlusion risk) use `components/layering/` and the `depthMap` z-index levels.

Known bug themes (based on `docs/log/2026-01-17-interaction-bug-analysis.md` plus user reports):

1) **Occlusion / wrong hit target**: the open cover still receives clicks over the left side, closing the journal.
2) **Missing backward navigation**: left-side “flipped pages” do not respond to click-to-go-back.
3) **Input lost during animation lock**: fast repeated interactions are ignored while `isFlipping` is true.
4) **Swipe conflicts**: drag/swipe for page turning can override or block embedded widget interactions.
5) **Over-eager page turning**: clicking on embedded content sometimes flips the page forward instead of interacting with the widget, usually due to click bubbling or drag/swipe interpretation.

## Plan of Work

### 1) Make interactions addressable (automation anchors)

Automation must be able to click the same semantic regions every time without relying on pixel coordinates. Add stable labels/roles to:

- the journal cover toggle area,
- the active (right) page turn area,
- the left page turn/back area (even if currently broken; it must be targetable),
- prev/next navigation controls.

Keep these labels user-friendly and consistent (e.g., “Open journal”, “Flip forward”, “Flip backward”).

### 2) Make interactions observable (dev-only debug HUD)

Add an opt-in debug overlay (only in development, or when `?debug=1`) that shows:

- `isOpen`, `currentPage`, `totalPages`, `isFlipping`,
- last input type (click/drag/keydown),
- the clicked element’s role/name (if any) and a simplified event path (e.g., `Pocket -> Page -> PageStack`).

This converts “it feels like it clicked the wrong thing” into explicit evidence.

### 3) Scripted reproductions (browser automation)

For each scenario, capture:

- deterministic reproduction steps,
- `console` output and runtime errors,
- a screenshot at the key moment,
- the debug HUD text (if enabled).

Store artifacts under `docs/log/bug-hunt-YYYY-MM-DD/` with readable filenames (e.g., `bug1-cover-occlusion.png`).

Minimum set of scenarios to script:

- **Bug 1 (cover occlusion)**: open journal → flip forward at least once → attempt to interact with the left side → observe the journal closes instead of going back.
- **Bug 2 (no click-to-go-back)**: flip multiple pages → click the left (already-flipped) page region → observe no backward flip.
- **Bug 3 (lock drops input)**: rapid clicks / key presses while flipping → observe ignored inputs and compare against the lock window.
- **Widget interaction vs page flip**: navigate to `interactive-showcase` → try to open widgets → observe whether a click flips the page instead.

When a widget click flips the page, use the HUD path to classify the failure as one of:

- click bubbling to the page-turn handler,
- drag/swipe misclassification (a “click” becomes a swipe on touch/trackpad),
- occlusion (the widget is visually on top but not the hit target).

### 4) Expand coverage to increase bug yield

Re-run the same scripts with:

- multiple viewports (desktop + mobile width),
- “fast rhythm” variants (double-click, click-drag-release, repeated keydown),
- layered pages (e.g., those using `LayerStack` + `depthMap`).

The goal is to find the smallest set of steps that reliably triggers each class of bug.

## Concrete Steps

Run all commands from the repository root.

1) Start the dev server:

  bun dev

2) Open the app in an automated browser and take an initial interactive snapshot:

  agent-browser open http://localhost:3000 --headed
  agent-browser snapshot -i

3) Execute each scripted scenario (commands recorded in the bug index as they are created), saving:

- `agent-browser screenshot` output to `docs/log/bug-hunt-YYYY-MM-DD/`
- `agent-browser console` output (paste into the bug index entry)
- `agent-browser errors` output (paste into the bug index entry)

## Validation and Acceptance

This plan is successful when:

- Each reported scenario can be reproduced from clean reload with a short, deterministic script.
- Every reproduction has at least one screenshot and captured `console/errors`.
- Each widget-related failure is classified with explicit evidence (event path / hit target), not only subjective description.
- A newcomer can follow the bug index and observe the same failures on their machine.

## Idempotence and Recovery

- Any reproduction should be rerunnable after a page reload.
- If the UI state becomes inconsistent, reload and reopen the journal, then retry the scenario.
- Keep the debug HUD opt-in so it can be enabled/disabled without affecting normal use.

## Artifacts and Notes

Source analysis:

- `docs/log/2026-01-17-interaction-bug-analysis.md`

Output artifacts (to be created by executing this plan):

- `docs/log/bug-hunt-YYYY-MM-DD/` (screenshots and notes)
- A “bug index” document updated with reproducible command sequences and evidence paths.

Screen recordings are intentionally excluded from version control; keep them local.

## Interfaces and Dependencies

- Runtime/package manager: Bun (`bun dev`).
- Browser automation: `agent-browser` CLI (used to open pages, click by refs, and capture evidence).
- No test framework is required for this plan; if an E2E runner is added later, it must be explicitly documented in `package.json`.

---

Plan created from the observed behavior described in `docs/log/2026-01-17-interaction-bug-analysis.md` and additional user reports about widget interactions triggering unintended page turns.
