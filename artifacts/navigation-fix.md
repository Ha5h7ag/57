# Desktop navigation crash

## Reproduction

On 11 October 2026, normal Chrome navigation from the published homepage changed the URL but crashed React with `NotFoundError: Failed to execute 'removeChild' on 'Node'`. Theme toggling worked before navigation; controls stopped responding after the crash. The site was serving the compiled portfolio, so changing the Pages publishing source could not fix this runtime defect.

With motion enabled on desktop, GSAP ScrollTrigger wraps the homepage's pinned section in a `.pin-spacer`. Page motion previously lived in the persistent App component and used passive effect cleanup. React tried to remove the section before the animation restored its original parent.

## Fix

Each pathname now mounts a keyed MotionPage that owns its main element and animation context. Layout effect cleanup reverts the pin wrapper before React removes that route's children. Search and category query updates preserve the same route instance. Existing motion, reduced-motion behavior, static rendering, and deployment paths are retained.

The new browser regression uses normal motion at 1440px, clicks every desktop navigation destination from the homepage, exercises archive filtering and theme switching, follows the pinned section's project link, and navigates backward and forward. It checks that the pin is recreated only on the homepage and that no runtime errors occur.

## Validation

- The regression failed against the old public deployment, reproducing the blank page after a normal click.
- TypeScript, ESLint, all 11 unit tests, and the production build with 23 routes passed.
- All 26 browser tests passed on the local production build under `/57/` in 39.7 seconds.
- Chrome computer-use inspection confirmed that normal homepage navigation renders the archive correctly after the fix.

Screenshot: `navigation-fixed-desktop.png`, showing archive results after the Branding button is clicked following homepage navigation.
