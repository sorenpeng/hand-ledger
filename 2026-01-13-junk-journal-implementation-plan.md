# Hand-Ledger: Junk Journaling Visual Art Website

## Project Vision

A single-page immersive visual experience website that simulates opening and exploring a real Junk Journal. Users can flip pages, discover hidden pockets, unfold secret compartments, and experience the "Perfectly Imperfect" & "Curated Chaos" aesthetic of junk journaling.

## Tech Stack

- **Runtime:** Bun
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **UI Base:** shadcn/ui
- **Animation:** Framer Motion
- **Linting/Formatting:** Biome
- **Language:** TypeScript (all English)

---

## Implementation Plan

### Phase 1: Project Foundation

**Goal:** Set up infrastructure and basic journal shell

1. Create configuration files:
   - `package.json` (scripts: dev, build, lint, format)
   - `tsconfig.json` (path aliases: @/*)
   - `next.config.ts`
   - `postcss.config.mjs` (Tailwind v4)
   - `biome.json`
   - `.gitignore`

2. Create folder structure:
   ```
   app/
     layout.tsx
     page.tsx
     globals.css
   components/
     journal/
     interactive/
     decorative/
     ui/
   hooks/
   lib/
   content/
   public/
     textures/
     stamps/
     ephemera/
   types/
   ```

3. Set up fonts (Google Fonts via next/font):
   - Caveat (handwriting)
   - Playfair Display (vintage serif)
   - Special Elite (typewriter)

4. Create utility functions:
   - `lib/utils.ts` - cn() helper (clsx + tailwind-merge)
   - `lib/animations.ts` - Framer Motion presets

5. Build basic `Journal.tsx` container with 3D perspective
6. Create static `JournalCover.tsx` with paper texture

**Deliverable:** Static journal shell visible on screen

---

### Phase 2: Page Flipping System

**Goal:** Implement realistic page turning animation

1. Create `usePageFlip.ts` hook:
   - Current page state
   - Flip direction tracking
   - Animation state management

2. Implement `Page.tsx` with 3D flip:
   - `rotateY` animation via Framer Motion
   - Front/back face rendering
   - `backface-visibility: hidden`
   - Dynamic shadow during flip

3. Build `PageStack.tsx`:
   - Multi-page z-index management
   - Animation sequencing
   - Keyboard navigation (arrow keys)
   - Touch/swipe gestures

**Key Animation Config:**
```typescript
const pageFlip = {
  closed: { rotateY: 0, transformOrigin: "left center" },
  open: { rotateY: -180, transformOrigin: "left center" }
};
```

**Deliverable:** Functional page flipping with test pages

---

### Phase 3: Texture & Visual Effects

**Goal:** Achieve authentic junk journal aesthetic

1. Create/source texture assets:
   - Paper grain (seamless PNG)
   - Aged paper backgrounds
   - Coffee stain overlays
   - Grunge overlays

2. Build texture components:
   - `PaperTexture.tsx` - grain overlay with mix-blend-mode
   - `TornPaper.tsx` - SVG clip-path for torn edges
   - `CoffeeStain.tsx` - positioned stain overlays

3. Implement CSS aging effects:
   - `filter: sepia(0.1) contrast(0.95)`
   - Gradient vignette
   - Noise texture

**Deliverable:** Pages with authentic vintage paper look

---

### Phase 4: Interactive Elements

**Goal:** Build all interactive mechanisms

1. `Pocket.tsx` - envelope with open/close flap animation
2. `Envelope.tsx` - openable envelope revealing contents
3. `FlipOut.tsx` - folded page sections that unfold
4. `BellyBand.tsx` - horizontal band that slides off
5. `PullTab.tsx` - pull-to-reveal mechanism
6. `Tag.tsx` - hanging tag with swing animation

**Pocket Animation Example:**
```typescript
const pocketVariants = {
  closed: { rotateX: 0 },
  open: { rotateX: -160, transition: { type: "spring" } }
};
```

**Deliverable:** All interactive elements functional

---

### Phase 5: Decorative Elements

**Goal:** Complete vintage decorative library

1. `VintageStamp.tsx` - postage stamp collection
2. `WaxSeal.tsx` - 3D wax seal effect
3. `Lace.tsx` - lace pattern overlays
4. `SheetMusic.tsx` - old music score background
5. `Receipt.tsx` - vintage receipt style
6. `Ephemera.tsx` - generic wrapper for vintage items

**Deliverable:** Full decorative element library

---

### Phase 6: Layering System

**Goal:** Enable complex collage compositions

1. `Layer.tsx` - wrapper with z-index control
2. `LayerStack.tsx` - automatic depth ordering
3. `Collage.tsx` - composition helper

**Layer Depth System:**
```typescript
const depthMap = {
  base: 0,
  content: 10,
  overlay: 20,
  interactive: 30,
  floating: 40
};
```

**Deliverable:** Complex layered page compositions

---

### Phase 7: Content & Polish

**Goal:** Populate journal and refine experience

1. Design 8-12 unique page spreads
2. Create content data structure in `/content/pages/`
3. Performance optimization:
   - Lazy load pages (only render visible + adjacent)
   - Next.js Image optimization
   - Code splitting for heavy components
4. Optional: paper rustling sound effects

**Deliverable:** Complete journal experience

---

### Phase 8: Final Polish

**Goal:** Production-ready release

1. Cross-browser testing
2. Mobile optimization (touch gestures, tap targets)
3. Accessibility (keyboard nav, focus states, reduced motion)
4. SEO metadata
5. Deployment configuration

**Deliverable:** Production-ready website

---

## Critical Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with fonts, metadata |
| `app/page.tsx` | Main journal page |
| `app/globals.css` | Tailwind imports, CSS variables |
| `components/journal/Journal.tsx` | Main journal container |
| `components/journal/PageStack.tsx` | Page management & flipping |
| `components/journal/Page.tsx` | Individual page with 3D flip |
| `hooks/usePageFlip.ts` | Page flip state & gestures |
| `lib/animations.ts` | Framer Motion presets |
| `lib/utils.ts` | cn() helper |

---

## Verification Plan

1. **Dev Server:** Run `bun dev` and verify journal renders
2. **Page Flip:** Test arrow key and swipe navigation
3. **Interactions:** Click pockets, flip-outs, envelopes
4. **Textures:** Verify paper grain and torn edges display
5. **Mobile:** Test on mobile viewport with touch gestures
6. **Build:** Run `bun run build` to ensure no errors
7. **Lint:** Run `bun run lint` to check code quality

---

## Claude.md Content

After plan approval, the following `CLAUDE.md` file will be created:

```markdown
# Hand-Ledger

A Junk Journaling visual art website - an immersive digital experience simulating a real handmade journal.

## Tech Stack

- Bun (runtime & package manager)
- Next.js 15 (App Router)
- Tailwind CSS v4
- shadcn/ui (base components)
- Framer Motion (animations)
- Biome (linting/formatting)
- TypeScript

## Commands

- `bun dev` - Start development server
- `bun run build` - Build for production
- `bun run lint` - Run Biome linter
- `bun run format` - Format code with Biome

## Project Structure

- `app/` - Next.js App Router pages
- `components/journal/` - Core journal components (Journal, Page, PageStack)
- `components/interactive/` - Interactive elements (Pocket, FlipOut, Envelope)
- `components/decorative/` - Visual decorations (TornPaper, CoffeeStain, WaxSeal)
- `components/ui/` - Base UI components
- `hooks/` - Custom React hooks
- `lib/` - Utilities and animation presets
- `content/` - Journal page content data
- `public/textures/` - Paper textures and overlays
- `types/` - TypeScript type definitions

## Design Philosophy

- "Perfectly Imperfect" - embrace flaws and handmade aesthetics
- "Curated Chaos" - intentional disorder and layering
- Focus on texture, depth, and interactive discovery

## Key Patterns

- Page flipping uses CSS 3D transforms with Framer Motion
- Textures applied via `mix-blend-mode: multiply`
- Torn edges implemented with SVG clip-paths
- Interactive elements use spring animations
- Layering system manages z-index automatically

## Code Style

- All code and comments in English
- Use Biome for formatting (2-space indent, single quotes)
- Prefer composition over inheritance
- Keep components focused and single-purpose
```
