import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import type { EditorialBlock, Project } from "../types/content";
import { MediaImage } from "./MediaImage";

export function Editorial({
  blocks,
  project,
}: {
  blocks: EditorialBlock[];
  project?: Project;
}) {
  return (
    <div className="editorial-blocks">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "text":
            return (
              <section className="text-block wrap" data-reveal key={index}>
                <h2>{block.title}</h2>
                <p>{block.body}</p>
              </section>
            );
          case "image":
          case "fullscreen":
            return (
              <figure
                className={`image-block ${block.type === "fullscreen" ? "full-bleed" : "wrap"}`}
                data-reveal
                key={index}
              >
                <MediaImage image={block.image} zoom />
                {block.caption && <figcaption>{block.caption}</figcaption>}
              </figure>
            );
          case "split":
            return (
              <section className="split-block wrap" data-reveal key={index}>
                <div>
                  <h2>{block.title}</h2>
                  <p>{block.body}</p>
                </div>
                <MediaImage
                  image={block.image}
                  zoom
                  sizes="(max-width: 767px) 100vw, 45vw"
                />
              </section>
            );
          case "gallery":
            return (
              <section className="gallery-block wrap" data-reveal key={index}>
                {block.title && <h2>{block.title}</h2>}
                <div className={`block-gallery ${block.layout}`}>
                  {block.images.map((image) => (
                    <MediaImage key={image.id} image={image} zoom />
                  ))}
                </div>
              </section>
            );
          case "quote":
            return (
              <figure className="quote-block wrap" data-reveal key={index}>
                <blockquote>{block.text}</blockquote>
                <figcaption>{block.attribution}</figcaption>
              </figure>
            );
          case "process":
            return (
              <section className="process-block wrap" key={index}>
                <h2>{block.title}</h2>
                <ol>
                  {block.steps.map((step) => (
                    <li key={step.title} data-reveal>
                      {step.image && (
                        <MediaImage
                          image={step.image}
                          zoom
                          sizes="(max-width: 767px) 100vw, 33vw"
                        />
                      )}
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                    </li>
                  ))}
                </ol>
              </section>
            );
          case "breakdown":
            return project?.breakdown.length ? (
              <section
                className="breakdown-invite wrap"
                data-reveal
                key={index}
              >
                <div>
                  <p>Look a little closer.</p>
                  <h2>
                    Every detail
                    <br />
                    has a reason.
                  </h2>
                </div>
                <Link
                  className="button-link"
                  to={`/work/${project.slug}/behind-the-design/`}
                >
                  Behind the design
                  <ArrowUpRight size={20} />
                </Link>
              </section>
            ) : null;
        }
      })}
    </div>
  );
}
