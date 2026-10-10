import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { categoryLabel } from "../content/categories";
import type { ArchiveEntry } from "../types/content";
import { MediaImage } from "./MediaImage";

export function WorkGrid({
  entries,
  editorial = false,
}: {
  entries: ArchiveEntry[];
  editorial?: boolean;
}) {
  return (
    <div className={`work-grid ${editorial ? "editorial-grid" : ""}`}>
      {entries.map((entry) => (
        <Link
          key={`${entry.kind}:${entry.id}`}
          to={entry.path}
          className="work-item"
          data-item={`${entry.kind}:${entry.id}`}
          data-reveal
        >
          <div className="work-image">
            <MediaImage
              image={entry.cover}
              sizes="(max-width: 767px) 100vw, 50vw"
              priority={false}
            />
            <span className="work-open" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </div>
          <div className="work-caption">
            <h3>{entry.title}</h3>
            <ArrowUpRight size={20} aria-hidden="true" />
            <p>{entry.categories.map(categoryLabel).join(" / ")}</p>
            <span>{entry.date.slice(0, 4)}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
