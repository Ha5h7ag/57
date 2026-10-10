import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { archiveEntries } from "../utils/content";
import { clients } from "../content/clients";
import { site } from "../content/site";
import { WorkGrid } from "../components/WorkGrid";
import { MediaImage } from "../components/MediaImage";
import { SampleNote } from "../components/Layout";

export function WorkPage() {
  return (
    <div className="gallery-page wrap">
      <div className="page-heading">
        <p className="eyebrow page-enter">Selected projects</p>
        <h1 className="page-enter">
          An idea.
          <br />
          An impression.
        </h1>
        <p className="page-enter">
          Identity, art direction, and images that invite a second look.
        </p>
        {site.isDemo && <SampleNote compact />}
      </div>
      <WorkGrid
        entries={archiveEntries().filter((item) => item.kind === "project")}
        editorial
      />
      <Link className="text-link gallery-end" to="/clients/">
        Clients & collaborators
        <ArrowUpRight size={20} />
      </Link>
    </div>
  );
}

export function ArtPage() {
  return (
    <div className="gallery-page art-page wrap">
      <div className="page-heading">
        <p className="eyebrow page-enter">Independent explorations</p>
        <h1 className="page-enter">
          Room for
          <br />
          the unexpected.
        </h1>
        <p className="page-enter">
          Experiments in form, texture, and things that don't need a brief.
        </p>
        {site.isDemo && <SampleNote compact />}
      </div>
      <WorkGrid
        entries={archiveEntries().filter((item) => item.kind === "artwork")}
        editorial
      />
    </div>
  );
}

export function ClientsPage() {
  return (
    <div className="clients-page wrap">
      <div className="page-heading">
        <p className="eyebrow page-enter">Clients & collaborators</p>
        <h1 className="page-enter">
          Better
          <br />
          together.
        </h1>
        <p className="page-enter">The people and practices behind the work.</p>
        {site.isDemo && <SampleNote compact />}
      </div>
      <div className="client-gallery">
        {clients.map((client) => (
          <Link
            className="client-gallery-item"
            key={client.id}
            to={`/clients/${client.slug}/`}
            data-reveal
          >
            <MediaImage
              image={client.image}
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <div>
              <h2>{client.name}</h2>
              <ArrowUpRight />
            </div>
            <p>{client.industry}</p>
            <p>{client.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
