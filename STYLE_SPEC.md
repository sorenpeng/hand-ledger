# Hand-Ledger — Style Refactor Spec (for Gemini 3.0 Pro)

You are **Gemini 3.0 Pro** acting as BOTH:
1) a senior product designer specialized in **skeuomorphic / editorial UI** and “junk journal” aesthetics, and  
2) a senior frontend engineer (Next.js 16 App Router + Tailwind v4 + shadcn/ui + Framer Motion + TypeScript).

You will produce a **patch-ready, engineering-focused** style refactor. Prefer concrete specs + diffs over prose.

---

## 0) Context

Project: **Hand-Ledger** — an immersive digital handmade journal website.  
The app already works; the goal is to **refactor the visual style** and **spread proportions** only.

Tech stack:
- Bun
- Next.js 16 (App Router)
- Tailwind CSS v4
- shadcn/ui
- Framer Motion
- Biome (formatting/lint)
- TypeScript

Constraints:
- Keep code/comments in **English**.
- Biome style: 2-space indent, single quotes, trailing commas.
- Keep existing folder structure; do not reorganize the repo.

---

## 1) Non-Negotiable Constraints (Hard)

### 1.1 Preserve behavior
- **Do not change** product behavior, flow, state, or routing.
- **Do not rewrite** page-flip logic, gestures, or navigation rules.
- Component APIs should remain stable; if you must change a prop, keep it minimal and update all call sites.

### 1.2 Scope: style-only refactor
Allowed:
- Tailwind classes, CSS variables, layout framing, typography, shadows, textures, overlays.
- Add a small number of lightweight SVG/PNG assets under `public/textures/` (if necessary).
- Add **1–2 fonts max** using `next/font` (no heavy runtime libs).

Not allowed:
- New feature pages, new app capabilities, major refactors, heavy libraries.

### 1.3 Readability & accessibility
- Text must remain **crisp and readable**.  
  **No filters/blend modes on text layers** that warp/blur glyphs.
- Respect `prefers-reduced-motion`.
- Maintain reasonable contrast for body text on paper backgrounds.

---

## 2) Primary Goal

Refactor to an **OPEN SPREAD** “Daily Junk Journal” aesthetic inspired by **industrial labels / shipping stickers / security tape**.

This is NOT “cute planner” and NOT “perfect bullet journal”.  
It is “practical writing-first pages + collected ephemera + layered tape/stickers”.

### 2.1 Visual anchor (match vibe, not literal scene)
Target vibe (from reference images):
- Black / very dark cover elements + bold red/white warning labels.
- Ephemera motifs: **AUTHORIZED PERSONNEL ONLY**, **FRAGILE**, **TAMPER EVIDENT**, **CAUTION**, label-maker strips, stamped type.
- Materials: translucent tape, masking tape, torn paper edges, scuffed ink, edge wear, slight misalignment.

### 2.2 What NOT to do
- Do NOT model hands, desks full of tools, or multiple notebooks. Keep it to a **single journal UI**.
- Do NOT add heavy “Instagram filter” effects that reduce readability.
- Do NOT change core interactions.

---

## 3) Spread Proportions (OPEN SPREAD) — Non-Negotiable

I want a **two-page open spread** presentation.

- Each page ratio: **Moleskine Large** page ≈ `5 / 8.25` (portrait).
- The visible spread ratio should be close to `10 / 8.25` ≈ **1.212** (landscape), plus a subtle **gutter/spine** thickness.
- Implement responsive scaling using CSS `aspect-ratio` and max-width/max-height constraints.  
  **No stretching**; the spread should scale down to fit viewport while preserving ratio.

Implementation hint:
- The spread is a **visual framing/layout** change only.  
  Keep the existing page flip mechanism and state.

---

## 4) Deliverables (Output Format Must Follow This)

### A) Quick Audit (max 10 bullets)
- Identify what currently feels “too clean” / “not industrial junk journal enough”.
- Identify readability issues (e.g., text distortion) and how you’ll eliminate them.

### B) Style Spec (implementable, concise)
Provide:
1) **Color palette** with hex values:
   - paper tones (base + aged + shadow)
   - ink tones (primary + muted)
   - tape tones (masking + translucent)
   - label tones (red/white/black warning)
   - shadow system (ambient + contact)
2) **Typography plan**
   - Title font, body font, label font (if different)
   - sizes, line-height, letter-spacing, where used
3) **Texture & layering rules**
   - layers (paper base, grain, stains, edge wear, ephemera, tape)
   - blend modes + opacity ranges
   - strict rule: textures behind content; text on clean layer
4) **Component styling rules**
   - Cover
   - Page surface + gutter/spine
   - “Label cards” (warning stickers)
   - Notes blocks
   - Navigation UI (prev/next, page dots)
   - “Stamp” watermark treatment
   - Pockets/envelopes surfaces

### C) Design Tokens Mapping (engineering-ready)
- Show exact updates to `app/globals.css` `@theme` variables.
- If needed, propose token names like:
  - `--color-paper-base`, `--color-paper-aged`, `--color-ink-main`, `--color-label-red`, `--shadow-paper`, etc.
- Keep naming consistent and minimal.

### D) Patch-ready Code Changes
- List files to change.
- For each file:
  - Provide **unified diffs** OR complete updated file content (choose one consistently).
- Keep changes minimal and localized.
- If adding new decorative components/assets:
  - Give file paths under `components/decorative/` and `public/textures/`
  - Explain usage briefly.

### E) QA / Acceptance Checklist
Include checks for:
- spread ratio correctness + responsive scaling
- readability (no warped text)
- animations still work + reduced-motion
- performance (no excessive overlays)
- visual coherence with the “industrial label junk journal” vibe

---

## 5) Implementation Guidance (Use These, Do Not Ignore)

- Use separate overlay layers for textures:
  - Paper texture overlays behind content
  - Stain overlays low opacity
  - Tape/sticker layers above paper but below text where necessary
- For “hand-placed” feel:
  - micro rotations: `0.2–1.0deg`
  - slight offsets, imperfect edges
  - subtle contact shadows
- Add a clear gutter/spine + subtle page curvature to signal a physical spread, without changing flip logic.
- Prefer CSS variables + Tailwind utilities over one-off magic values.

---

## 6) Reference
- Video reference: https://www.youtube.com/watch?v=tsaoqiZeOro
- Attached images: treat as **style inspiration** only (do not recreate the entire photographed scene).

---

## Start Now
Begin with section **A) Quick Audit**, then proceed to **B–E** in order. Prefer diffs over long explanations.
