# Live deployment verification

Checked on 11 October 2026 at `https://ha5h7ag.github.io/57/`.

**Result: the corrected portfolio is deployed. All 18 browser checks passed against the live site.**

- The earlier source-file deployment has been replaced by compiled assets and prerendered HTML.
- All 23 public routes serve content and survive refresh. No uncaught JavaScript errors were detected by the route checks.
- All 18 live browser tests passed: native navigation without JavaScript, archive filtering/history, design breakdown decisions, full-resolution viewer/Escape/focus restoration, introduction skip/completion, mobile navigation, theme persistence, responsive layouts, animation cleanup, and automated accessibility in both themes.
- Before correction, the native-navigation test found 40 homepage links missing `/57/`. That regression is now fixed in the deployed HTML.
- Contact remains a `mailto:` link to the explicitly labelled sample address `studio@example.com`. There is no backend form or real destination configured.

## Correction and validation

`src/entry-server.tsx` now gives `StaticRouter` the same basename and matching location as the browser router. Generated links retain the `/57/` prefix, including before JavaScript loads.

- TypeScript, ESLint, production build, and all 11 unit tests passed.
- All 18 browser tests passed against the corrected local `/57/` production build, including native navigation without JavaScript.
- Root-hosted native navigation and all 23 public routes also passed.
- `E2E_BASE_URL` now allows the same suite to inspect an existing deployment without starting a local server.

Commit `f5dcded` was pushed to `main`. [Deployment run 38078626525](https://github.com/Ha5h7ag/57/actions/runs/38078626525) completed successfully. The subsequent live suite passed all 18 tests in 37.4 seconds. The already-open browser needed a refresh to replace cached HTML; an ordinary refresh loaded the corrected links.

Artist identity, real work, contact email, and social profiles still need artist-provided content. These checks do not confirm delivery to a real email address or manually certify accessibility across all assistive technologies.
