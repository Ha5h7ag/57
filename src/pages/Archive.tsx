import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { ArrowUpRight, Search, X } from "lucide-react";
import { runMotion } from "../animations/motion";
import { categories } from "../content/categories";
import { site } from "../content/site";
import { archiveEntries, filterArchive } from "../utils/content";
import { WorkGrid } from "../components/WorkGrid";
import { useReducedMotion } from "../hooks/useMotion";
import { SampleNote } from "../components/Layout";

export function ArchivePage() {
  const [params, setParams] = useSearchParams();
  // Static HTML has no query-specific variants. Apply filters after hydration.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  const query = hydrated ? params.get("q") || "" : "";
  const requestedCategory = hydrated ? params.get("category") || "all" : "all";
  const entries = archiveEntries();
  const used = new Set(entries.flatMap((entry) => entry.categories));
  const available = categories.filter((category) => used.has(category.id));
  const category = available.some((item) => item.id === requestedCategory)
    ? requestedCategory
    : "all";
  const filtered = filterArchive(entries, query, category);
  const hasFilters = Boolean(query || category !== "all");
  const grid = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const previous = useRef(new Map<string, DOMRect>());
  const reduce = useReducedMotion();
  const snapshot = () => {
    previous.current = new Map(
      Array.from(
        grid.current?.querySelectorAll<HTMLElement>("[data-item]") || [],
      ).map((element) => [
        element.dataset.item!,
        element.getBoundingClientRect(),
      ]),
    );
  };
  const change = (name: string, value: string, replace = false) => {
    snapshot();
    const next = new URLSearchParams(params);
    if (!value || value === "all") next.delete(name);
    else next.set(name, value);
    setParams(next, { replace, preventScrollReset: true });
  };
  const reset = () => {
    snapshot();
    setParams({}, { preventScrollReset: true });
    searchInput.current?.focus({ preventScroll: true });
  };
  useEffect(() => {
    if (reduce || !grid.current) return;
    return runMotion(grid, (gsap) => {
      grid.current
        ?.querySelectorAll<HTMLElement>("[data-item]")
        .forEach((element) => {
          const before = previous.current.get(element.dataset.item!);
          const after = element.getBoundingClientRect();
          gsap.fromTo(
            element,
            {
              x: before ? before.left - after.left : 0,
              y: before ? before.top - after.top : 12,
              opacity: before ? 1 : 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
              clearProps: "all",
            },
          );
        });
    });
  }, [query, category, reduce]);
  return (
    <div className="archive-page wrap">
      <div className="page-heading">
        <p className="eyebrow page-enter">Projects, studies & experiments</p>
        <h1 className="page-enter">
          Follow your
          <br />
          curiosity.
        </h1>
        <p className="page-enter">
          One place for everything. Find a thread and see where it goes.
        </p>
        {site.isDemo && <SampleNote compact />}
      </div>
      <div className="archive-tools">
        <label className="archive-search">
          <span>Search archive</span>
          <div>
            <Search size={19} aria-hidden="true" />
            <input
              ref={searchInput}
              type="search"
              value={query}
              placeholder="Title, idea, or material"
              onChange={(event) => change("q", event.target.value, true)}
            />
            {query && (
              <button
                className="icon-button"
                aria-label="Clear search"
                onClick={() => change("q", "", true)}
              >
                <X size={18} />
              </button>
            )}
          </div>
        </label>
        <div className="archive-filters" aria-label="Filter by category">
          {[{ id: "all", label: "All work" }, ...available].map((item) => (
            <button
              key={item.id}
              aria-pressed={category === item.id}
              aria-label={item.label}
              onClick={() => change("category", item.id)}
            >
              {item.label}
              <span className="filter-total" aria-hidden="true">
                {item.id === "all"
                  ? entries.length
                  : entries.filter((entry) =>
                      entry.categories.includes(item.id),
                    ).length}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="archive-results-bar">
        <p className="archive-count" aria-live="polite" aria-atomic="true">
          {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} to
          explore
        </p>
        {hasFilters && (
          <button className="text-link clear-filters" onClick={reset}>
            Clear filters <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      <div ref={grid}>
        {filtered.length ? (
          <WorkGrid entries={filtered} />
        ) : (
          <div className="empty-state">
            <h2>No work found.</h2>
            <p>Try another search or explore all categories.</p>
            <button className="button-link" onClick={reset}>
              Reset filters
              <ArrowUpRight size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
