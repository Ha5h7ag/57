import { useCallback, useEffect, useRef, useState } from "react";
import { runMotion } from "../animations/motion";
import { site } from "../content/site";
import { useReducedMotion } from "../hooks/useMotion";
import { assetUrl } from "../utils/urls";

export function Intro() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const done = useRef(false);
  const close = useCallback(() => {
    done.current = true;
    setOpen(false);
    try {
      sessionStorage.setItem("forma-intro", "seen");
    } catch {
      /* Intro must work without storage. */
    }
  }, []);
  useEffect(() => {
    if (reduce || !site.intro.enabled || done.current) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem("forma-intro") === "seen";
    } catch {
      /* Storage is optional. */
    }
    if (!seen) setOpen(true);
  }, [reduce]);
  useEffect(() => {
    if (!open || reduce) {
      dialog.current?.close();
      return;
    }
    dialog.current?.showModal();
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const cleanup = runMotion(dialog, (gsap) => {
      gsap
        .timeline({ onComplete: close })
        .from(".intro-word", {
          yPercent: 110,
          duration: mobile ? 0.45 : 0.75,
          stagger: mobile ? 0.08 : 0.14,
          ease: "power4.out",
        })
        .to(
          ".intro-mark",
          { rotation: 90, duration: mobile ? 0.35 : 0.8, ease: "power2.inOut" },
          mobile ? 0.2 : 0.6,
        )
        .to(
          dialog.current,
          {
            yPercent: -105,
            duration: mobile ? 0.4 : 0.7,
            ease: "power3.inOut",
          },
          mobile ? 0.6 : 1.75,
        );
    });
    const timeout = window.setTimeout(close, mobile ? 1600 : 3200);
    return () => {
      clearTimeout(timeout);
      cleanup();
    };
  }, [open, reduce, close]);
  if (!open || reduce) return null;
  return (
    <dialog
      ref={dialog}
      className="intro-dialog"
      aria-label="Opening introduction"
      onCancel={close}
    >
      <button className="intro-skip" onClick={close} autoFocus>
        Skip introduction
      </button>
      {site.intro.glasses && (
        <img
          className="intro-asset"
          src={assetUrl(`${site.intro.glasses.src}-800.webp`)}
          alt={site.intro.glasses.alt}
        />
      )}
      {site.intro.reference && (
        <img
          className="intro-asset"
          src={assetUrl(`${site.intro.reference.src}-800.webp`)}
          alt={site.intro.reference.alt}
        />
      )}
      <div className="intro-lockup">
        <div>
          <span className="intro-word">
            {site.heroHeadline[0].toLowerCase()}
          </span>
        </div>
        <div>
          <span className="intro-word">
            {site.heroHeadline[1].toLowerCase()}
          </span>
        </div>
        <span className="intro-mark" aria-hidden="true">
          *
        </span>
      </div>
      <p>
        {site.isDemo ? "A sample exhibition by " : "An exhibition by "}
        {site.name}
      </p>
    </dialog>
  );
}
