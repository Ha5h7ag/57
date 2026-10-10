# Repository Guidelines

Whatever action you can do yourself, Please do yourself, this includes starting apps and verification

## Project Structure & Module Organization

Static artist portfolio: React, TypeScript, Vite, React Router, and GSAP.

- `src/components/`: reusable navigation, galleries, editorial blocks, and design breakdowns.
- `src/pages/`: shared route templates, never individual project implementations.
- `src/content/`: typed site settings, clients, projects, artworks, and categories.
- `src/types/`, `src/hooks/`, `src/animations/`, `src/styles/`, `src/utils/`: shared contracts and supporting code.
- `public/media/`: local introduction, client, project, and artwork assets.
- `tests/e2e/`: browser tests; colocate unit tests beside their modules.
- `.github/workflows/`: GitHub Pages deployment.

## Build, Test, and Development Commands

From the repository root:

- `npm ci`: install dependencies from the committed lockfile.
- `npm run dev`: start local development.
- `npm run typecheck`: validate TypeScript.
- `npm run lint`: run ESLint.
- `npm test`: run Vitest unit tests.
- `npm run test:e2e`: run Playwright browser tests.
- `npm run build`: validate content, optimize media, and generate static pages.
- `npm run preview`: inspect the production build locally.

## Coding Style & Naming Conventions

Use strict TypeScript, two-space indentation, semicolons, and double quotes. Configure ESLint and Prettier consistently.

Use PascalCase for components and types, camelCase for functions, and kebab-case for content slugs. Keep portfolio content outside components. Use discriminated unions for editorial blocks and derive client relationships from project data.

Clean up GSAP effects on unmount and respect reduced-motion preferences.

Use Phosphor UI icons (`@phosphor-icons/react`) through `src/components/Icons.ts`. Preserve sizes; use regular weight or light editorial arrows. Do not add other icon libraries. Keep annotation SVGs and wordmarks intact.

Follow `DESIGN.md` styling. Preserve structure, grids, spacing, responsive layouts, and animations unless the user requests changes.

## Testing Guidelines

Use Vitest for content, relationships, filters, and geometry. Name unit tests `*.test.ts` or `*.test.tsx`; browser tests `*.spec.ts`.

Use Playwright for deep links, refreshes, subpaths, keyboard interactions, responsive layouts, and motion. Prioritize meaningful behavior; no coverage threshold is established.

## Commit & Pull Request Guidelines

Follow the repository's imperative Conventional Commits, such as `feat: add artwork gallery`, `fix: repair navigation`, and `test: verify route behavior`.

Pull requests should explain changes, reference relevant issues, report executed checks, and include desktop/mobile screenshots for visual changes.

## Content & Deployment Constraints

Keep runtime functionality static and compatible with GitHub Pages. Use base-aware asset URLs and prerender route metadata. Never commit secrets. Clearly label demonstration work, preserve asset licences, and omit unconfigured social links.
