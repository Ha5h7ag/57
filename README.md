# Forma Studio

A static artist portfolio designed as an exhibition: expressive typography, editorial project stories, independent artwork, and interactive design breakdowns. Built locally with React, TypeScript, Vite, React Router, GSAP/ScrollTrigger, Lucide React, and custom CSS. No production server, CMS, database, or paid hosting is required.

**This is a demonstration portfolio.** Forma Studio, the three collaborators, five projects, five artworks, and sample contact address are fictional. Five original AI-generated images and their derived studies were created for this project. They are not an authentic artist's commissions, photographs, or process documentation.

## Install and run

Use Node.js 24 and npm. Commit `package-lock.json` alongside dependency changes.

```sh
npm ci
npm run media
npm run dev
```

Development starts at `http://127.0.0.1:5173/`. Run the media command after adding or changing source images. If npm reports deferred lifecycle scripts, the prebuilt Sharp and esbuild binaries normally work; follow npm's package-specific approval flow only if installation reports a missing binary.

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run preview
```

Preview runs at `http://127.0.0.1:4173/` using a directory-based static server with real 404 responses and **no SPA URL rewrites**. The build generates 23 current content routes, route-specific metadata, a sitemap, robots file, and a custom 404. Adding content automatically adds its public routes.

## Structure

```text
src/
  components/    Shared layouts, media, editorial blocks, and breakdown viewer
  pages/         Route templates
  content/       Typed settings, collaborators, work, art, categories, media manifest
  types/         Content interfaces and editorial block union
  hooks/         Scoped animation and reduced-motion behaviour
  styles/        Responsive design system and light/dark tokens
  utils/         Validation, archive queries, URL helpers, metadata
scripts/         Media processing, static generation, static preview server
public/media/    Source images, optimized variants, on-demand originals
tests/e2e/       Playwright browser tests
```

Runtime content is separate from UI. Projects store `clientIds`; collaborator galleries derive their projects from those references. Never create a page component for an individual project.

## Replace the artist identity

Edit `src/content/site.ts`: `name`, `wordmark`, `profession`, `introduction`, `biography`, `heroHeadline`, `heroProject`, `email`, `emailIsSample`, `socials`, navigation, SEO defaults, and featured content IDs. Set `isDemo: false` after replacing demonstration material, and set `sample: false` only on authentic entries. Set `emailIsSample: false` only after replacing the reserved sample email. Social links are omitted until configured.

```ts
socials: [{ label: "Behance", url: "https://www.behance.net/your-profile" }];
```

The hero uses the configured headline, profession, and introduction. Its artwork points to the project selected by `heroProject`; replace that ID in site settings when introducing a different opening concept. Ordinary content changes require no component edits.

## Media management

Store PNG source images under `public/media/sources/`, with optional folders such as `projects/new-project/`. Add a declarative entry to `src/content/media-sources.json`:

```json
{ "id": "new-cover", "source": "projects/new-project/cover" }
```

The source above resolves to `public/media/sources/projects/new-project/cover.png`. Optional `crop: [width, height]`, `mono: true`, and `zoom: true` produce demonstration variations. These are transformed images, not separate commissions or actual development stages.

Register a `MediaAsset` in `src/content/media.ts` using the **output** aspect ratio and a descriptive alt:

```ts
newCover: {
  id: "new-cover",
  src: "media/generated/new-cover",
  original: "media/originals/new-cover.webp",
  width: 1600,
  height: 1200,
  alt: "Describe the actual artwork and its important visual elements",
}
```

`npm run media` creates 480, 800, 1200, and 1600px WebP variants, a 1200×630 social preview, and a high-quality original. The site selects responsive images, reserves layout space, lazily loads secondary work, and opens full-resolution originals on demand. Source PNGs are removed from the deployment artifact. Keep asset permissions and font licences; font licences are copied into `public/licenses/`.

For motion work, optionally add `videoSrc` to a media record, pointing to a local MP4/WebM in `public/media/`. The viewer provides native controls and uses the image as a poster; it does not autoplay.

## Add a collaborator

Append a `Client` to `src/content/clients.ts`. Required fields include ID, slug, name, organization, role, industry, description, relationship, image, and sample status. Optional fields include website and logo.

```ts
{
  id: "new-client", slug: "new-client", name: "Client name",
  organization: "Organization", role: "Collaborator", industry: "Industry",
  description: "A short introduction.", relationship: "Describe the real collaboration.",
  image: media.newCover, sample: false,
}
```

Project associations are derived automatically; never maintain a second project-ID list on clients.

## Add a project

Append a `Project` to `src/content/projects.ts`. Use stable IDs and kebab-case slugs. A project can belong to several collaborators.

```ts
{
  id: "new-project", slug: "new-project", title: "Project title",
  clientIds: ["new-client"], year: 2026,
  categories: ["branding"], tags: ["identity"],
  description: "A concise summary.", introduction: "The project's opening story.",
  cover: media.newCover, gallery: [media.newCover],
  tools: ["Your actual tools"], credits: ["Actual contributors"],
  sample: false, breakdown: [],
  blocks: [
    { type: "text", title: "The idea", body: "Describe the concept." },
    { type: "image", image: media.newCover, caption: "The final work." },
  ],
}
```

Use editorial text blocks for idea, history, challenge, and solution; include only applicable sections. `EditorialBlock` supports `text`, `image`, `fullscreen`, `split`, `quote`, `process`, `breakdown`, and galleries with `paired`, `masonry`, `horizontal`, or `sequence` layouts. Order the blocks in content. Ordinary additions require no animation or template changes.

## Create a design breakdown

Add entries to the project's `breakdown` array and optionally add `{ type: "breakdown" }` to its story blocks:

```ts
{
  id: "new-type", title: "A clear voice", category: "Typography", order: 1,
  description: "Explain the selected decision.", whyItMatters: "Explain its effect.",
  image: media.newCover,
  region: { type: "rect", x: 0.1, y: 0.15, width: 0.6, height: 0.3 },
}
```

Coordinates are normalized to the original image: `(0, 0)` is top-left and `(1, 1)` is bottom-right. Rectangles must remain within the image; polygon regions use `points: [[x, y], ...]` with at least three points. Optional `supplementary` supplies a companion image. The viewer preserves the uncropped image ratio, so highlights remain aligned across screens. Decision categories are derived from entries. Projects without annotations expose no breakdown link or generated breakdown page.

## Add personal artwork

Append an `Artwork` to `src/content/artwork.ts`:

```ts
{
  id: "new-art", slug: "new-art", title: "Artwork title", date: "2026-10-10",
  description: "A short description.", concept: "The story behind the artwork.",
  medium: "Actual medium", tools: ["Actual tools"],
  categories: ["art"], tags: ["texture"],
  cover: media.newCover, gallery: [media.newCover], blocks: [], sample: false,
}
```

Use editorial blocks for optional process sections. The archive automatically combines projects and artworks. Add categories in `src/content/categories.ts`, then reference their IDs; filters display only used categories. Tags are freeform searchable text. Change homepage selections through `featuredProjects` and `featuredArtwork` in site settings.

## GitHub Pages deployment

Create a GitHub repository, push this directory to its `main` branch, then choose **Settings → Pages → Source → GitHub Actions**. Use a public repository for free Pages hosting without a paid plan. The workflow validates, tests, builds, uploads, and deploys using the official Pages actions. Pull requests run checks without deployment; manual deployment is available in Actions.

The workflow derives the site origin and repository base path from `configure-pages`. Locally test a project subpath in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/artist-portfolio/'
$env:VITE_SITE_ORIGIN = 'https://your-account.github.io'
npm run build
npm run preview
```

Open `http://127.0.0.1:4173/artist-portfolio/`. Both direct routes and asset URLs must retain the subpath. Reset environment variables to `/` before rebuilding for root deployment.

## Custom domains and SEO

Configure a domain in GitHub Pages settings and follow GitHub's DNS verification instructions. Configure Pages before building so its origin and base path are correct; custom-domain builds use `/`. Enable HTTPS in Pages. Domain registration may have its own cost; a custom domain is optional.

HTML is generated for each public route at build time, then hydrated in the browser. Clean links use directory URLs with trailing slashes; unknown routes serve a real custom 404. There is no redirect workaround or backend rewrite dependency.

Per-page titles, descriptions, canonical URLs, Open Graph images, and social-card metadata are in delivered HTML. `VITE_SITE_ORIGIN` must be the origin only, without the repository path. Local defaults use `example.com` until a deployment origin is configured. Robots rules are generated at the deployment root; on a project subpath, crawlers normally consult the account/domain-root robots file instead. The sitemap remains directly accessible under the configured base.

## Browser validation

```sh
npx playwright install chromium
npm run test:e2e
```

On Windows, an installed Chrome can be used with `$env:PLAYWRIGHT_CHANNEL = 'chrome'`. Browser tests use the production static server, covering public routes, refreshes, 404s, relationships, archive queries/history, annotations, dialogs, intro behaviour, responsive widths, themes, and automated accessibility. Unit tests cover content integrity, archive queries, and geometry. No percentage coverage target is imposed.

Continuous integration installs Chromium. Browser verification needs permission to connect to localhost when running under a restricted sandbox.

## Troubleshooting

- **Missing images:** check the media manifest, output dimensions, filenames, then run `npm run media`.
- **Broken deep links:** rebuild static HTML after content changes; never deploy the development entry HTML alone.
- **Incorrect asset paths:** match the build's base path to the hosting URL and preview environment.
- **Wrong social previews:** correct the public origin, rebuild, and request a refresh from the social platform's cache.
- **No opening animation:** it plays once per session, only on the homepage, and is skipped under reduced motion.
- **Performance:** GSAP loads separately after hydration. Mobile uses a shorter opening and disables the desktop pin. The static preview compresses text assets so local audits reflect compressed delivery.
- **Build validation fails:** resolve duplicate slugs/IDs, absent fields, broken references, or invalid coordinates rather than suppressing checks.
- **Port already in use:** stop your previous preview or set `PORT` to another available port.

## Future improvements

The executed local checks, saved previews, and Lighthouse results are recorded in [artifacts/verification.md](artifacts/verification.md).

Replace demonstration content with authentic work, add real intro references, and introduce translated content or video-specific editorial blocks if needed. Preserve native navigation, accessible alternatives, and the static hosting architecture.
