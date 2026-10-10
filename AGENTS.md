# Repository Guidelines

Whatever action you can do yourself, Please do yourself, this includes starting apps and verification

## Project Structure & Module Organization

This repository is a static artist portfolio using React, TypeScript, Vite, React Router, and GSAP.

Follow this structure:

- `src/components/`: reusable navigation, galleries, editorial blocks, and design breakdowns.
- `src/pages/`: shared route templates, never individual project implementations.
- `src/content/`: typed site settings, clients, projects, artworks, and categories.
- `src/types/`, `src/hooks/`, `src/animations/`, `src/styles/`, `src/utils/`: shared contracts and supporting code.
- `public/media/`: local introduction, client, project, and artwork assets.
- `tests/e2e/`: browser tests; colocate unit tests beside their modules.
- `.github/workflows/`: GitHub Pages deployment.

## Build, Test, and Development Commands

Run these commands from the repository root:

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

## Testing Guidelines

Use Vitest for content validation, relationships, archive filtering, and annotation geometry. Name unit tests `*.test.ts` or `*.test.tsx`; name browser tests `*.spec.ts`.

Use Playwright to verify deep links, refreshes, repository subpaths, keyboard interactions, responsive layouts, and reduced motion. No percentage coverage threshold is established; prioritize meaningful behaviour tests.

## Commit & Pull Request Guidelines

No existing Git history establishes conventions. Adopt imperative Conventional Commits, such as `feat: add artwork gallery`.

Pull requests should explain changes, reference relevant issues, report executed checks, and include desktop/mobile screenshots for visual changes.

## Content & Deployment Constraints

Keep runtime functionality static and compatible with GitHub Pages. Use base-aware asset URLs and prerender route metadata. Never commit secrets. Clearly label demonstration work, preserve asset licences, and omit unconfigured social links.
