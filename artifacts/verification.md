# Verification Record

Verified locally on 10 October 2026 using Node.js 24 and Chrome.

## Executed checks

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm test`: 11 tests passed.
- `npm run build`: passed; generated 23 public route documents and a custom 404.
- `npm run test:e2e`: 17 tests passed with `/` as the base path.
- `npm run test:e2e`: 17 tests passed with `/artist-portfolio/` as the base path.

The browser suite covered every public route and refresh, real HTTP 404s, collaborator relationships, archive search/filter/history, highlight alignment, keyboard selection, artwork dialog focus restoration, intro skip/completion/session behaviour, mobile navigation, themes, motion cleanup, and overflow at 360, 768, 1440, and 1920px.

Automated WCAG A/AA checks passed on representative pages in both themes. Desktop and mobile previews were also visually inspected.

## Mobile Lighthouse audit

The optimized production preview was audited with Lighthouse's default mobile simulation and compressed text-asset delivery.

| Measure | Recorded result |
| --- | --- |
| Performance | 94 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |
| Largest Contentful Paint | 2.9 seconds |
| Cumulative Layout Shift | 0.003 |
| Total Blocking Time | 0 milliseconds |

See `lighthouse-home.report.html` and `lighthouse-home.report.json` for the saved audit. Lab results vary with environment; the recorded mobile LCP is above the aspirational 2.5-second target. Real-user INP has not been measured.

## Deployment and content status

GitHub Actions configuration is provided, but no remote repository or live Pages deployment was configured or verified. Local static tests used no SPA rewrites.

Artist identity, collaborators, portfolio entries, and email remain clearly labelled demonstration material. Replace them and configure the real site origin before an authentic portfolio launch.
