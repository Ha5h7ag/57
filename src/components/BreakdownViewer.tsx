import { useEffect, useRef, useState } from "react";
import { runMotion } from "../animations/motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { BreakdownEntry } from "../types/content";
import { useReducedMotion } from "../hooks/useMotion";
import { MediaImage } from "./MediaImage";

export function BreakdownViewer({ entries }: { entries: BreakdownEntry[] }) {
  const ordered = [...entries].sort((a, b) => a.order - b.order);
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(ordered[0]?.id || "");
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const active = ordered.find((entry) => entry.id === selected) || ordered[0];
  const visible =
    category === "All"
      ? ordered
      : ordered.filter((entry) => entry.category === category);
  useEffect(() => {
    if (reduce || !panel.current) return;
    return runMotion(panel, (gsap) => {
      gsap.from(".decision-copy", {
        opacity: 0,
        y: 10,
        duration: 0.35,
        clearProps: "all",
      });
    });
  }, [selected, reduce]);
  if (!active) return null;
  const region = active.region;
  const activeIndex = visible.findIndex((entry) => entry.id === active.id);
  const move = (offset: number) =>
    setSelected(
      visible[(activeIndex + offset + visible.length) % visible.length].id,
    );
  return (
    <div className="breakdown-viewer" ref={panel}>
      <div className="breakdown-stage">
        <div
          className="annotated-image"
          style={{
            aspectRatio: `${active.image.width} / ${active.image.height}`,
          }}
        >
          <MediaImage
            image={active.image}
            priority
            sizes="(max-width: 767px) 100vw, 60vw"
          />
          <svg
            className="annotation"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <mask id={`spotlight-${active.id}`}>
                <rect width="100" height="100" fill="white" />
                {region.type === "rect" ? (
                  <rect
                    x={region.x * 100}
                    y={region.y * 100}
                    width={region.width * 100}
                    height={region.height * 100}
                    fill="black"
                  />
                ) : (
                  <polygon
                    points={region.points
                      .map(([x, y]) => `${x * 100},${y * 100}`)
                      .join(" ")}
                    fill="black"
                  />
                )}
              </mask>
            </defs>
            <rect
              width="100"
              height="100"
              fill="black"
              opacity="0.43"
              mask={`url(#spotlight-${active.id})`}
            />
            {region.type === "rect" ? (
              <rect
                className="region-outline"
                x={region.x * 100}
                y={region.y * 100}
                width={region.width * 100}
                height={region.height * 100}
                vectorEffect="non-scaling-stroke"
              />
            ) : (
              <polygon
                className="region-outline"
                points={region.points
                  .map(([x, y]) => `${x * 100},${y * 100}`)
                  .join(" ")}
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>
        </div>
        <p className="stage-caption">
          Select a decision to see the part of the image it shapes.
        </p>
      </div>
      <div className="breakdown-controls">
        <div className="category-tabs" aria-label="Design decision categories">
          {["All", ...new Set(ordered.map((entry) => entry.category))].map(
            (name) => (
              <button
                key={name}
                aria-pressed={category === name}
                onClick={() => {
                  setCategory(name);
                  setSelected(
                    (name === "All"
                      ? ordered
                      : ordered.filter((entry) => entry.category === name))[0]
                      .id,
                  );
                }}
              >
                {name}
              </button>
            ),
          )}
        </div>
        <div className="decision-list" aria-label="Design decisions">
          {visible.map((entry) => (
            <button
              key={entry.id}
              aria-pressed={selected === entry.id}
              aria-controls="decision-description"
              onClick={() => setSelected(entry.id)}
            >
              {entry.title}
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
        <div
          className="decision-copy"
          id="decision-description"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="decision-category">{active.category}</p>
          <h2>{active.title}</h2>
          <p>{active.description}</p>
          <h3>Why it matters</h3>
          <p>{active.whyItMatters}</p>
        </div>
        {active.supplementary && (
          <div className="supplementary">
            <MediaImage image={active.supplementary} zoom sizes="220px" />
            <p>Companion contrast study</p>
          </div>
        )}
        {visible.length > 1 && (
          <div className="decision-pagination">
            <button
              className="icon-button"
              aria-label="Previous design decision"
              onClick={() => move(-1)}
            >
              <ArrowLeft size={20} />
            </button>
            <button
              className="icon-button"
              aria-label="Next design decision"
              onClick={() => move(1)}
            >
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
