# Frontend refinement

## Audit and direction

Preserve the existing editorial exhibition design. Dials remain DESIGN_VARIANCE 9, MOTION_INTENSITY 7, VISUAL_DENSITY 3. The visual foundation is custom CSS, Space Grotesk with IBM Plex Mono, warm neutral surfaces, lime accents, square edges, and scoped GSAP motion. The homepage and mobile breakdown screenshots were inspected before edits.

Keep the hero, artwork, route hierarchy, navigation labels, metadata, identity, and labelled demonstration content. Existing desktop navigation already has an active underline. Mobile navigation lacks an equivalent current-page signal. Archive filters have pressed states and live result counts, but restoring all results requires selecting All work and clearing search separately unless the result set is empty. The image viewer lacks explicit original-image loading/error feedback. Contact relies on an installed mail client.

## Changes to verify

- Current-page feedback in mobile navigation, retaining keyboard and dialog behavior.
- One-action clearing of active archive filters and accessible category counts.
- An artwork viewer toolbar, original-file link, loading/error feedback, and backdrop dismissal.
- A copy-email action with explicit success/failure feedback, retaining the sample-address label.
- Desktop/mobile visuals, light/dark contrast, reduced motion, browser interactions, and the GitHub Pages subpath.

## Validation

TypeScript, ESLint, production generation of all 23 public routes, and 11 unit tests passed. The 24-test browser suite passed against `/57/`; the added visual/layout check also passed. The final loading/error and filter-focus changes were then rechecked successfully.

Screenshots of Contact, mobile navigation, and the artwork viewer were inspected in light and dark themes. The new controls preserve keyboard focus and have automated accessibility checks. Sample identity, artwork, email, and social configuration remain as requested.

Preview artifacts: `contact-refined-light.png`, `contact-refined-dark.png`, `menu-refined-light.png`, `menu-refined-dark.png`, `viewer-refined-light.png`, and `viewer-refined-dark.png` in this directory.
