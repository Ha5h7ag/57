import { useEffect, useLayoutEffect, useState } from "react";
import type { RefObject } from "react";
import { runMotion } from "../animations/motion";

export function useReducedMotion() {
  const [reduce, setReduce] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduce(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduce;
}

export function usePageMotion(
  ref: RefObject<HTMLElement | null>,
  path: string,
) {
  const reduce = useReducedMotion();
  // Revert pin wrappers before React removes this route's DOM children.
  useLayoutEffect(() => {
    if (reduce || !ref.current) return;
    return runMotion(ref, (gsap) => {
      gsap.from(".page-enter", {
        y: 24,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "all",
      });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: element, start: "top 94%", once: true },
        });
      });
      const pin = ref.current?.querySelector<HTMLElement>("[data-pin]");
      const responsive = gsap.matchMedia();
      if (pin)
        responsive.add("(min-width: 1024px) and (pointer: fine)", () => {
          gsap.to(pin.querySelector("img"), {
            scale: 1.06,
            ease: "none",
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: "+=220",
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        });
      return () => responsive.revert();
    });
  }, [path, reduce, ref]);
}
