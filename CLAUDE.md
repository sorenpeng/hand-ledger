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

```bash
bun dev          # Start development server (with Turbopack)
bun run build    # Build for production
bun run start    # Start production server
bun run lint     # Run Biome linter
bun run lint:fix # Fix lint issues automatically
bun run format   # Format code with Biome
```

## Project Structure

```
app/                    # Next.js App Router pages
  layout.tsx           # Root layout with fonts, metadata
  page.tsx             # Main journal page
  globals.css          # Tailwind imports, CSS variables

components/
  journal/             # Core journal components
    Journal.tsx        # Main container with 3D perspective
    JournalCover.tsx   # Animated book cover
    Page.tsx           # Individual page with flip animation
    PageStack.tsx      # Page management & navigation
  interactive/         # Interactive elements (Pocket, FlipOut, Envelope)
  decorative/          # Visual decorations (TornPaper, CoffeeStain, WaxSeal)
  ui/                  # Base UI components

hooks/
  usePageFlip.ts       # Page flip state & gestures

lib/
  utils.ts             # cn() helper, math utilities
  animations.ts        # Framer Motion presets & variants

content/               # Journal page content data
public/textures/       # Paper textures and overlays
types/                 # TypeScript type definitions
```

## Design Philosophy

- **"Perfectly Imperfect"** - embrace flaws and handmade aesthetics
- **"Curated Chaos"** - intentional disorder and layering
- Focus on texture, depth, and interactive discovery

## Key Patterns

### Page Flipping
Page flipping uses CSS 3D transforms with Framer Motion:
- `transform-style: preserve-3d` on container
- `rotateY` animation from 0 to -180 degrees
- `backface-visibility: hidden` on each face
- `origin-left` for realistic hinge effect

### Textures
Paper textures are applied via:
- PNG overlays with `mix-blend-mode: multiply`
- CSS `filter: sepia() contrast() brightness()` for aging
- SVG clip-paths for torn edges

### CSS Variables
Custom theme colors defined in `globals.css` via `@theme`:
- `--color-paper-*` for paper tones
- `--color-ink-*` for text colors
- `--color-wax-*`, `--color-coffee-*` for accents

### Animations
Framer Motion variants in `lib/animations.ts`:
- `pageFlipVariants` - page turning
- `pocketVariants` - opening pockets
- `revealVariants` - revealing hidden items
- `hoverLiftVariants` - interactive hover states

## Code Style

- All code and comments in English
- Use Biome for formatting (2-space indent, single quotes, trailing commas)
- Prefer composition over inheritance
- Keep components focused and single-purpose
- Use `cn()` utility for conditional class merging

## Adding New Pages

1. Create page content in `content/pages/`
2. Define `frontContent` and `backContent` as React nodes
3. Add decorative elements using components from `components/decorative/`
4. Add interactive elements using components from `components/interactive/`

## Adding New Components

1. Create component in appropriate directory
2. Use `'use client'` directive for interactive components
3. Import animation variants from `lib/animations.ts`
4. Use `cn()` for class name composition
