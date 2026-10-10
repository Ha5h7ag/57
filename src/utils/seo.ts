import { site } from "../content/site";
import { projects } from "../content/projects";
import { artworks } from "../content/artwork";
import { clients } from "../content/clients";
import { canonicalUrl } from "./urls";

export function pageSeo(pathname: string) {
  const path = pathname === "/" ? "/" : `${pathname.replace(/\/$/, "")}/`;
  const project = projects.find((item) =>
    path.startsWith(`/work/${item.slug}/`),
  );
  const artwork = artworks.find((item) => path === `/art/${item.slug}/`);
  const client = clients.find((item) => path === `/clients/${item.slug}/`);
  const staticTitles: Record<string, string> = {
    "/work/": "Selected work",
    "/art/": "Personal art",
    "/clients/": "Clients & collaborators",
    "/archive/": "The archive",
    "/about/": "The studio",
    "/contact/": "Contact",
  };
  const entity = project || artwork || client;
  const title =
    path === "/"
      ? site.seo.title
      : `${path.includes("behind-the-design") ? "Behind the design: " : ""}${entity ? ("title" in entity ? entity.title : entity.name) : staticTitles[path] || "Page not found"} | ${site.name}`;
  const image = entity
    ? "cover" in entity
      ? entity.cover
      : entity.image
    : site.seo.image;
  return {
    title,
    description: entity?.description || site.seo.description,
    canonical: canonicalUrl(path),
    image: canonicalUrl(`${image.src}-social.webp`),
    noindex: !entity && !staticTitles[path] && path !== "/",
  };
}

export function seoHtml(path: string) {
  const seo = pageSeo(path);
  const escape = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  return `<title>${escape(seo.title)}</title>
<meta name="description" content="${escape(seo.description)}" />
<link rel="canonical" href="${escape(seo.canonical)}" />
<meta property="og:title" content="${escape(seo.title)}" />
<meta property="og:description" content="${escape(seo.description)}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="${escape(seo.canonical)}" />
<meta property="og:image" content="${escape(seo.image)}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
${seo.noindex ? '<meta name="robots" content="noindex" />' : ""}`;
}
