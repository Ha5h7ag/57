# Live deployment verification

Checked on 11 October 2026 at `https://ha5h7ag.github.io/57/`.

**Result: the live application runs, but its prerendered links omit the repository path. The correction is verified locally and has not been deployed yet.**

- The earlier source-file deployment has been replaced by compiled assets and prerendered HTML.
- All 23 public routes serve content and survive refresh. No uncaught JavaScript errors were detected by the route checks.
- 17 existing live browser tests passed: archive filtering/history, design breakdown decisions, full-resolution viewer/Escape/focus restoration, introduction skip/completion, mobile navigation, theme persistence, responsive layouts, animation cleanup, and automated accessibility in both themes.
- The new native-navigation regression test failed on the live site: 40 homepage links use paths such as `/work/` instead of `/57/work/`. JavaScript navigation can work while opening the same links in a new tab or navigating before hydration fails.
- Contact remains a `mailto:` link to the explicitly labelled sample address `studio@example.com`. There is no backend form or real destination configured.

## Correction and validation

`src/entry-server.tsx` now gives `StaticRouter` the same basename and matching location as the browser router. Generated links retain the `/57/` prefix, including before JavaScript loads.

- TypeScript, ESLint, production build, and all 11 unit tests passed.
- All 18 browser tests passed against the corrected local `/57/` production build, including native navigation without JavaScript.
- `E2E_BASE_URL` now allows the same suite to inspect an existing deployment without starting a local server.

Push the correction and let **Deploy portfolio to Pages** complete, then rerun the live suite. Artist identity, real work, contact email, and social profiles still need artist-provided content.
