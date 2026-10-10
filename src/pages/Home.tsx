import { Link } from "react-router";
import { ArrowDownRight, ArrowUpRight } from "../components/Icons";
import { projects } from "../content/projects";
import { artworks } from "../content/artwork";
import { clients } from "../content/clients";
import { categories } from "../content/categories";
import { site } from "../content/site";
import { archiveEntries } from "../utils/content";
import { MediaImage } from "../components/MediaImage";
import { WorkGrid } from "../components/WorkGrid";
import { Intro } from "../components/Intro";

export function Home() {
  const selected = site.featuredProjects
    .map((id) =>
      archiveEntries().find(
        (entry) => entry.id === id && entry.kind === "project",
      ),
    )
    .filter((entry) => entry !== undefined);
  const personal = site.featuredArtwork
    .map((id) => artworks.find((entry) => entry.id === id))
    .filter((entry) => entry !== undefined);
  const heroProject = projects.find((entry) => entry.id === site.heroProject)!;
  return (
    <>
      <Intro />
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow page-enter">{site.profession}</p>
          <h1 className="page-enter">
            {site.heroHeadline[0]}
            <br />
            <span>{site.heroHeadline[1]}</span>
          </h1>
          <p className="hero-description page-enter">{site.introduction}</p>
          <Link className="button-link page-enter" to="/work/">
            Work
            <ArrowUpRight size={22} />
          </Link>
        </div>
        <div className="hero-art page-enter">
          <Link
            to={`/work/${heroProject.slug}/`}
            aria-label={`Explore ${heroProject.title}`}
          >
            <MediaImage
              image={heroProject.cover}
              priority
              sizes="(max-width: 767px) 100vw, 52vw"
            />
          </Link>
          <div className="hero-art-caption">
            <span>{heroProject.title}</span>
            <span>
              {heroProject.categories
                .map(
                  (category) =>
                    categories.find((item) => item.id === category)?.label,
                )
                .join(" / ")}
              , {heroProject.year} <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </section>
      {site.isDemo && (
        <div className="demo-strip wrap">
          <span>A demonstration portfolio</span>
          <p>
            Imagined collaborations. Original sample visuals. Real attention to
            detail.
          </p>
        </div>
      )}
      <section className="home-about wrap" data-reveal>
        <ArrowDownRight
          className="statement-arrow"
          size={62}
          weight="light"
          aria-hidden="true"
        />
        <div>
          <h2>
            Good design is seen.
            <br />
            Great design is felt.
          </h2>
          <p>
            Identity, image, and a little intuition. This sample studio brings a
            curious eye to purposeful design and independent art.
          </p>
          <Link className="text-link" to="/about/">
            Studio
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section className="selected-work wrap">
        <div className="section-heading" data-reveal>
          <h2>
            Some things
            <br />
            stay with you.
          </h2>
          <Link className="text-link" to="/work/">
            Work
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <WorkGrid entries={selected} editorial />
      </section>
      <section className="material-interlude" data-pin>
        <MediaImage image={heroProject.cover} sizes="100vw" />
        <div className="material-copy">
          <p>From an idea to an impression.</p>
          <Link to={`/work/${heroProject.slug}/`} className="text-link">
            Explore the study
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <section className="disciplines wrap" data-reveal>
        <h2>
          Different tools.
          <br />
          The same curiosity.
        </h2>
        <div className="discipline-links">
          {categories.map((category) => (
            <Link key={category.id} to={`/archive/?category=${category.id}`}>
              {category.label}
              <ArrowUpRight size={23} />
            </Link>
          ))}
        </div>
      </section>
      <section className="home-clients wrap">
        <div className="section-heading" data-reveal>
          <h2>
            Ideas grow
            <br />
            between people.
          </h2>
          <Link className="text-link" to="/clients/">
            Collaborators
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="client-index">
          {clients.map((client) => (
            <Link key={client.id} to={`/clients/${client.slug}/`} data-reveal>
              <h3>{client.name}</h3>
              <span>{client.industry}</span>
              <MediaImage image={client.image} sizes="180px" />
              <ArrowUpRight size={32} />
            </Link>
          ))}
        </div>
        {clients.some((client) => client.sample) && (
          <p className="subtle-note">
            Fictional collaborators, created to demonstrate the portfolio.
          </p>
        )}
      </section>
      <section className="personal-preview wrap">
        <div className="section-heading" data-reveal>
          <h2>
            Off the clock.
            <br />
            Out of the ordinary.
          </h2>
          <Link className="text-link" to="/art/">
            Art
            <ArrowUpRight size={20} />
          </Link>
        </div>
        <div className="art-shelf">
          {personal.map((art) => (
            <Link key={art.id} to={`/art/${art.slug}/`} data-reveal>
              <MediaImage
                image={art.cover}
                sizes="(max-width: 767px) 80vw, 33vw"
              />
              <div>
                <h3>{art.title}</h3>
                <ArrowUpRight size={20} />
              </div>
              <p>{art.medium}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="home-contact wrap" data-reveal>
        <p>Give an idea a place to start.</p>
        <Link to="/contact/">
          <h2>
            Have something
            <br />
            in mind?
          </h2>
          <ArrowUpRight size={24} className="contact-arrow" weight="light" />
        </Link>
        <span>Contact</span>
      </section>
    </>
  );
}
