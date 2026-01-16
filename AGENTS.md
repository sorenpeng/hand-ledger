# Repository Guidelines

# ExecPlans 
When writing complex features or significant refactors, use an ExecPlan (as described in .agent/PLANS.md) from design to implementation.

## Project Structure & Module Organization
- `app/` contains the Next.js App Router entrypoints, including `app/layout.tsx`, `app/page.tsx`, and global styles in `app/globals.css`.
- `components/` holds UI building blocks, organized into `journal/`, `interactive/`, `decorative/`, and `ui/` subfolders.
- `content/` stores journal page content definitions (React nodes or structured data).
- `hooks/` contains React hooks such as `usePageFlip.ts`.
- `lib/` provides shared utilities (`lib/utils.ts`) and animation variants (`lib/animations.ts`).
- `public/` hosts static assets; paper textures live under `public/textures/`.
- `types/` includes shared TypeScript types.

## Build, Test, and Development Commands
- `bun dev`: start the local development server with Turbopack.
- `bun run build`: build the production bundle.
- `bun run start`: run the production server.
- `bun run lint`: run Biome checks.
- `bun run lint:fix`: fix lint issues automatically.
- `bun run format`: format the codebase with Biome.

## Coding Style & Naming Conventions
- TypeScript + React + Next.js (App Router) with Tailwind CSS v4 utilities.
- Biome formatting is required: 2-space indent, single quotes, trailing commas.
- Keep theme tokens in `app/globals.css` (`@theme` variables); avoid one-off magic values.
- Use `cn()` from `lib/utils.ts` for conditional class merging.
- File naming: components in PascalCase (e.g., `JournalCover.tsx`), hooks in `useX.ts`.

## Testing Guidelines
- No automated test framework is configured and no `__tests__` or `*.test.*` files are present.
- If you add tests, introduce the runner explicitly and document new scripts in `package.json`.

## Commit & Pull Request Guidelines
- Use jj as version control system.
- Recent history mixes Conventional Commit prefixes (`feat:`, `fix:`, `wip:`) with free-form messages (e.g., "finished part 4"). Prefer Conventional Commits with short, specific summaries.
- PRs should include a concise description, link any relevant issues, and attach screenshots/GIFs for visual changes. Call out new assets under `public/`.

## Design & Content Notes
- This is an immersive junk-journal UI; preserve interaction behavior when making visual updates.
- See `CLAUDE.md` and `STYLE_SPEC.md` for design philosophy, animation patterns, and styling constraints.
