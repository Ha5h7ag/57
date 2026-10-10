import { Link, useParams } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "../components/Icons";
import { clients } from "../content/clients";
import { projects } from "../content/projects";
import { artworks } from "../content/artwork";
import { categoryLabel } from "../content/categories";
import { archiveEntries, clientProjects } from "../utils/content";
import { MediaImage } from "../components/MediaImage";
import { SampleNote } from "../components/Layout";
import { WorkGrid } from "../components/WorkGrid";
import { Editorial } from "../components/Editorial";
import { BreakdownViewer } from "../components/BreakdownViewer";
import { NotFound } from "./StaticPages";

export function ClientPage() {
  const { slug } = useParams();
  const client = clients.find((item) => item.slug === slug);
  if (!client) return <NotFound />;
  const related = new Set(clientProjects(client.id).map((item) => item.id));
  return (
    <>
      <div className="wrap">
        <Link className="back-link" to="/clients/">
          <ArrowLeft size={17} />
          Collaborators
        </Link>
        <div className="client-hero">
          <div className="page-heading">
            <p className="eyebrow page-enter">{client.industry}</p>
            <h1 className="page-enter">{client.name}</h1>
            <p className="page-enter">{client.description}</p>
            {client.sample && <SampleNote compact />}
          </div>
          <MediaImage
            image={client.logo || client.image}
            priority
            sizes="(max-width: 767px) 100vw, 45vw"
          />
        </div>
        <div className="detail-meta">
          <div>
            <span>Organization</span>
            <p>{client.organization}</p>
          </div>
          <div>
            <span>Role</span>
            <p>{client.role}</p>
          </div>
          <div>
            <span>Industry</span>
            <p>{client.industry}</p>
          </div>
        </div>
        <section className="text-block relationship" data-reveal>
          <h2>A shared direction</h2>
          <p>{client.relationship}</p>
          {client.website && (
            <a
              className="text-link"
              href={client.website}
              target="_blank"
              rel="noreferrer"
            >
              Visit website
              <ArrowUpRight size={18} />
            </a>
          )}
        </section>
        <section className="client-projects">
          <h2>Work together</h2>
          <WorkGrid
            entries={archiveEntries().filter(
              (item) => item.kind === "project" && related.has(item.id),
            )}
            editorial
          />
        </section>
      </div>
    </>
  );
}

export function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return <NotFound />;
  const relatedClients = clients.filter((client) =>
    project.clientIds.includes(client.id),
  );
  const index = projects.indexOf(project);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return (
    <>
      <div className="wrap">
        <Link to="/work/" className="back-link">
          <ArrowLeft size={17} />
          Work
        </Link>
        <div className="detail-heading">
          <div>
            <p className="eyebrow page-enter">
              {project.categories.map(categoryLabel).join(" / ")}
            </p>
            <h1 className="page-enter">{project.title}</h1>
          </div>
          <p className="detail-introduction page-enter">
            {project.introduction}
          </p>
        </div>
        <div className="detail-meta">
          <div>
            <span>Collaborators</span>
            {relatedClients.map((client) => (
              <Link key={client.id} to={`/clients/${client.slug}/`}>
                {client.name}
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
          <div>
            <span>Year</span>
            <p>{project.year}</p>
          </div>
          <div>
            <span>Disciplines</span>
            <p>{project.categories.map(categoryLabel).join(", ")}</p>
          </div>
          {project.breakdown.length > 0 && (
            <Link
              className="text-link"
              to={`/work/${project.slug}/behind-the-design/`}
            >
              Behind the design
              <ArrowUpRight size={17} />
            </Link>
          )}
        </div>
        {project.sample && <SampleNote />}
      </div>
      <div className="detail-cover wrap">
        <MediaImage image={project.cover} priority zoom sizes="100vw" />
      </div>
      <Editorial blocks={project.blocks} project={project} />
      <section className="credits wrap">
        <div>
          <h2>Tools & techniques</h2>
          <p>{project.tools.join(" / ")}</p>
        </div>
        <div>
          <h2>Credits</h2>
          {project.credits.map((credit) => (
            <p key={credit}>{credit}</p>
          ))}
        </div>
      </section>
      <nav className="adjacent-work wrap" aria-label="Adjacent projects">
        <Link to={`/work/${previous.slug}/`}>
          <span>
            <ArrowLeft size={17} />
            Previous project
          </span>
          <h2>{previous.title}</h2>
        </Link>
        <Link to={`/work/${next.slug}/`}>
          <span>
            Next project
            <ArrowRight size={17} />
          </span>
          <h2>{next.title}</h2>
        </Link>
      </nav>
    </>
  );
}

export function ArtworkPage() {
  const { slug } = useParams();
  const art = artworks.find((item) => item.slug === slug);
  if (!art) return <NotFound />;
  const index = artworks.indexOf(art);
  const previous = artworks[(index - 1 + artworks.length) % artworks.length];
  const next = artworks[(index + 1) % artworks.length];
  return (
    <>
      <div className="wrap">
        <Link className="back-link" to="/art/">
          <ArrowLeft size={17} />
          Art
        </Link>
        <div className="detail-heading">
          <div>
            <p className="eyebrow page-enter">Independent artwork</p>
            <h1 className="page-enter">{art.title}</h1>
          </div>
          <p className="detail-introduction page-enter">{art.description}</p>
        </div>
        <div className="detail-meta">
          <div>
            <span>Medium</span>
            <p>{art.medium}</p>
          </div>
          <div>
            <span>Date</span>
            <p>
              {new Intl.DateTimeFormat("en", {
                year: "numeric",
                month: "long",
                timeZone: "UTC",
              }).format(new Date(`${art.date}T00:00:00Z`))}
            </p>
          </div>
          <div>
            <span>Category</span>
            <p>{art.categories.map(categoryLabel).join(", ")}</p>
          </div>
        </div>
        {art.sample && <SampleNote />}
      </div>
      <div className="artwork-cover wrap">
        <MediaImage
          image={art.cover}
          priority
          zoom
          sizes="(max-width: 767px) 100vw, 80vw"
        />
      </div>
      <section className="text-block wrap" data-reveal>
        <h2>The thought behind it</h2>
        <p>{art.concept}</p>
      </section>
      <Editorial blocks={art.blocks} />
      <div className="credits wrap">
        <div>
          <h2>Tools & techniques</h2>
          <p>{art.tools.join(" / ")}</p>
        </div>
      </div>
      <nav className="adjacent-work wrap" aria-label="Adjacent artworks">
        <Link to={`/art/${previous.slug}/`}>
          <span>
            <ArrowLeft size={17} />
            Previous artwork
          </span>
          <h2>{previous.title}</h2>
        </Link>
        <Link to={`/art/${next.slug}/`}>
          <span>
            Next artwork
            <ArrowRight size={17} />
          </span>
          <h2>{next.title}</h2>
        </Link>
      </nav>
    </>
  );
}

export function BreakdownPage() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  if (!project?.breakdown.length) return <NotFound />;
  return (
    <div className="breakdown-page wrap">
      <Link className="back-link" to={`/work/${project.slug}/`}>
        <ArrowLeft size={17} />
        {project.title}
      </Link>
      <div className="page-heading">
        <p className="eyebrow page-enter">Behind the design</p>
        <h1 className="page-enter">
          Nothing here
          <br />
          is accidental.
        </h1>
        <p className="page-enter">
          Explore the choices that shape {project.title.toLowerCase()}.
        </p>
      </div>
      <BreakdownViewer entries={project.breakdown} />
      <SampleNote />
    </div>
  );
}
