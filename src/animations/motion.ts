import type gsap from "gsap";

type Scope = Element | { current: Element | null };
let motion: Promise<typeof gsap> | undefined;

// Animation code is optional: keep static content usable if its chunk cannot load.
export function runMotion(
  scope: Scope,
  callback: (api: typeof gsap) => void | (() => void),
) {
  let cancelled = false;
  let context: gsap.Context | undefined;
  motion ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
    ([module, plugin]) => {
      module.default.registerPlugin(plugin.ScrollTrigger);
      return module.default;
    },
  );
  void motion
    .then((api) => {
      if (!cancelled) context = api.context(() => callback(api), scope);
    })
    .catch(() => {
      /* Motion never gates the content. */
    });
  return () => {
    cancelled = true;
    context?.revert();
  };
}
