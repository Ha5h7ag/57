import { clients } from "../content/clients";
import { projects } from "../content/projects";
import { artworks } from "../content/artwork";
import { categories } from "../content/categories";
import { site } from "../content/site";
import type {
  ArchiveEntry,
  Artwork,
  Client,
  EditorialBlock,
  HighlightRegion,
  Project,
} from "../types/content";

export const clientProjects = (clientId: string, list = projects) =>
  list.filter((project) => project.clientIds.includes(clientId));

export function archiveEntries(): ArchiveEntry[] {
  return [
    ...projects.map((item) => ({
      ...item,
      kind: "project" as const,
      date: `${item.year}-01-01`,
      path: `/work/${item.slug}/`,
    })),
    ...artworks.map((item) => ({
      ...item,
      kind: "artwork" as const,
      path: `/art/${item.slug}/`,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));
}

export function filterArchive(
  entries: ArchiveEntry[],
  query: string,
  category: string,
): ArchiveEntry[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return entries.filter((item) => {
    const searchable = [
      item.title,
      item.description,
      ...item.tags,
      ...item.categories,
    ]
      .join(" ")
      .toLowerCase();
    return (
      (category === "all" || item.categories.includes(category)) &&
      words.every((word) => searchable.includes(word))
    );
  });
}

export function validRegion(region: HighlightRegion): boolean {
  const normalized = (value: number) =>
    Number.isFinite(value) && value >= 0 && value <= 1;
  if (region.type === "polygon")
    return (
      region.points.length >= 3 &&
      region.points.every((point) => point.every(normalized))
    );
  return (
    [region.x, region.y, region.width, region.height].every(normalized) &&
    region.width > 0 &&
    region.height > 0 &&
    region.x + region.width <= 1 &&
    region.y + region.height <= 1
  );
}

export function blockMedia(block: EditorialBlock) {
  if ("image" in block) return [block.image];
  if ("images" in block) return block.images;
  if (block.type === "process")
    return block.steps.flatMap((step) => (step.image ? [step.image] : []));
  return [];
}

export function validateContent(
  data: { clients: Client[]; projects: Project[]; artworks: Artwork[] } = {
    clients,
    projects,
    artworks,
  },
): string[] {
  const errors: string[] = [];
  const categoryIds = new Set(categories.map((item) => item.id));
  const clientIds = new Set(data.clients.map((item) => item.id));
  for (const [kind, entries] of Object.entries(data)) {
    const ids = new Set<string>();
    const slugs = new Set<string>();
    for (const entry of entries) {
      if (
        !entry.id ||
        !entry.slug ||
        !("title" in entry ? entry.title : entry.name) ||
        !entry.description
      )
        errors.push(`${kind}: missing required field`);
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug))
        errors.push(`${kind}: invalid slug ${entry.slug}`);
      if (ids.has(entry.id)) errors.push(`${kind}: duplicate ID ${entry.id}`);
      if (slugs.has(entry.slug))
        errors.push(`${kind}: duplicate slug ${entry.slug}`);
      ids.add(entry.id);
      slugs.add(entry.slug);
      const images =
        "cover" in entry
          ? [entry.cover, ...entry.gallery, ...entry.blocks.flatMap(blockMedia)]
          : [entry.image];
      for (const image of images)
        if (
          !image.alt ||
          image.width <= 0 ||
          image.height <= 0 ||
          !image.src ||
          !image.original
        )
          errors.push(`${entry.id}: invalid media ${image.id}`);
      if ("categories" in entry)
        for (const id of entry.categories)
          if (!categoryIds.has(id))
            errors.push(`${entry.id}: unknown category ${id}`);
      if ("clientIds" in entry) {
        if (!entry.clientIds.length) errors.push(`${entry.id}: missing client`);
        for (const id of entry.clientIds)
          if (!clientIds.has(id))
            errors.push(`${entry.id}: unknown client ${id}`);
        const breakdownIds = new Set<string>();
        for (const point of entry.breakdown) {
          if (
            breakdownIds.has(point.id) ||
            !point.title ||
            !point.description ||
            !point.whyItMatters ||
            !point.category
          )
            errors.push(`${entry.id}: invalid breakdown ${point.id}`);
          breakdownIds.add(point.id);
          if (!validRegion(point.region))
            errors.push(`${entry.id}: invalid region ${point.id}`);
        }
      }
    }
  }
  for (const id of site.featuredProjects)
    if (!data.projects.some((item) => item.id === id))
      errors.push(`Unknown featured project ${id}`);
  for (const id of site.featuredArtwork)
    if (!data.artworks.some((item) => item.id === id))
      errors.push(`Unknown featured artwork ${id}`);
  if (!data.projects.some((item) => item.id === site.heroProject))
    errors.push(`Unknown hero project ${site.heroProject}`);
  return errors;
}

export function publicRoutes() {
  return [
    "/",
    "/clients/",
    "/work/",
    "/art/",
    "/archive/",
    "/about/",
    "/contact/",
    ...clients.map((item) => `/clients/${item.slug}/`),
    ...projects.map((item) => `/work/${item.slug}/`),
    ...projects
      .filter((item) => item.breakdown.length)
      .map((item) => `/work/${item.slug}/behind-the-design/`),
    ...artworks.map((item) => `/art/${item.slug}/`),
  ];
}
