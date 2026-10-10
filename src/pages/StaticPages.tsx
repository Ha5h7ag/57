import { Link } from "react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  Check,
  Copy,
  Mail,
} from "../components/Icons";
import { site } from "../content/site";
import { categories } from "../content/categories";
import { media } from "../content/media";
import { MediaImage } from "../components/MediaImage";
import { SampleNote } from "../components/Layout";

export function AboutPage() {
  return (
    <div className="about-page wrap">
      <div className="page-heading">
        <p className="eyebrow page-enter">About {site.name}</p>
        <h1 className="page-enter">
          A curious eye.
          <br />
          An open mind.
        </h1>
        <p className="page-enter">
          Design with intention. Art with room to wander.
        </p>
      </div>
      <div className="about-intro">
        <MediaImage
          image={media.still}
          priority
          sizes="(max-width: 767px) 100vw, 55vw"
        />
        <div data-reveal>
          <h2>
            Between purpose
            <br />
            and possibility.
          </h2>
          <p>{site.biography}</p>
          <SampleNote compact />
        </div>
      </div>
      <section className="about-philosophy" data-reveal>
        <h2>
          Start with a question.
          <br />
          Stay for the discovery.
        </h2>
        <p>
          A good idea creates a useful connection. This demonstration practice
          explores how type, image, and material can communicate with clarity
          while leaving space for surprise.
        </p>
      </section>
      <section className="disciplines" data-reveal>
        <h2>Ways of seeing.</h2>
        <div className="discipline-links">
          {categories.map((category) => (
            <Link key={category.id} to={`/archive/?category=${category.id}`}>
              {category.label}
              <ArrowUpRight size={22} />
            </Link>
          ))}
        </div>
      </section>
      <Link className="button-link" to="/contact/">
        Contact
        <ArrowUpRight size={20} />
      </Link>
    </div>
  );
}

export function ContactPage() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
  };
  return (
    <div className="contact-page wrap">
      <div className="page-heading">
        <p className="eyebrow page-enter">Contact</p>
        <h1 className="page-enter">
          Let's make
          <br />
          an impression.
        </h1>
        <p className="page-enter">
          A commission, a collaboration, or the start of an interesting
          conversation.
        </p>
      </div>
      <div className="contact-details" data-reveal>
        <a href={`mailto:${site.email}`} className="email-link">
          <Mail size={24} weight="light" aria-hidden="true" />
          <span>{site.email}</span>
          <ArrowUpRight size={24} weight="light" aria-hidden="true" />
        </a>
        <div className="contact-actions">
          <button className="text-link copy-email" onClick={copyEmail}>
            {copyState === "copied" ? (
              <Check size={17} aria-hidden="true" />
            ) : (
              <Copy size={17} aria-hidden="true" />
            )}
            {copyState === "copied" ? "Email copied" : "Copy email"}
          </button>
          <p role="status" className="copy-status">
            {copyState === "copied"
              ? "Ready to paste into your email app."
              : copyState === "error"
                ? "Copy isn't available here. Select the email address above to copy it."
                : "Prefer your own email app? Copy the address."}
          </p>
        </div>
        {site.emailIsSample && (
          <p className="sample-note">
            Sample email address. Replace it with the artist's real email in
            site settings before sharing the portfolio.
          </p>
        )}
        {site.socials.length > 0 && (
          <div className="social-links">
            {site.socials.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </div>
        )}
      </div>
      <div className="contact-image">
        <MediaImage image={media.hero} priority sizes="100vw" />
      </div>
    </div>
  );
}

export function NotFound() {
  return (
    <section className="not-found wrap">
      <p className="eyebrow">Page not found</p>
      <h1>
        A little
        <br />
        out of frame.
      </h1>
      <p>
        This page isn't part of the exhibition. There's plenty more to explore.
      </p>
      <Link className="button-link" to="/">
        <ArrowLeft size={20} />
        Back to the gallery
      </Link>
      <span className="error-number" aria-hidden="true">
        404
      </span>
    </section>
  );
}
