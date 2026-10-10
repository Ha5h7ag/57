export interface MediaAsset {
  id: string;
  src: string;
  original: string;
  width: number;
  height: number;
  alt: string;
  videoSrc?: string;
}

export type HighlightRegion =
  | { type: "rect"; x: number; y: number; width: number; height: number }
  | { type: "polygon"; points: [number, number][] };

export interface BreakdownEntry {
  id: string;
  title: string;
  category: string;
  description: string;
  whyItMatters: string;
  order: number;
  image: MediaAsset;
  region: HighlightRegion;
  supplementary?: MediaAsset;
}

export type EditorialBlock =
  | { type: "text"; title: string; body: string }
  | { type: "image" | "fullscreen"; image: MediaAsset; caption?: string }
  | { type: "split"; title: string; body: string; image: MediaAsset }
  | {
      type: "gallery";
      layout: "paired" | "masonry" | "horizontal" | "sequence";
      images: MediaAsset[];
      title?: string;
    }
  | { type: "quote"; text: string; attribution: string }
  | {
      type: "process";
      title: string;
      steps: { title: string; body: string; image?: MediaAsset }[];
    }
  | { type: "breakdown" };

export interface Client {
  id: string;
  slug: string;
  name: string;
  organization: string;
  role: string;
  industry: string;
  description: string;
  relationship: string;
  image: MediaAsset;
  logo?: MediaAsset;
  website?: string;
  sample: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  clientIds: string[];
  year: number;
  categories: string[];
  tags: string[];
  description: string;
  introduction: string;
  cover: MediaAsset;
  gallery: MediaAsset[];
  blocks: EditorialBlock[];
  tools: string[];
  credits: string[];
  breakdown: BreakdownEntry[];
  sample: boolean;
}

export interface Artwork {
  id: string;
  slug: string;
  title: string;
  date: string;
  description: string;
  concept: string;
  medium: string;
  tools: string[];
  categories: string[];
  tags: string[];
  cover: MediaAsset;
  gallery: MediaAsset[];
  blocks: EditorialBlock[];
  sample: boolean;
}

export interface SiteSettings {
  name: string;
  wordmark: string;
  isDemo: boolean;
  heroProject: string;
  heroHeadline: [string, string];
  profession: string;
  introduction: string;
  biography: string;
  email: string;
  emailIsSample: boolean;
  socials: { label: string; url: string }[];
  navigation: { label: string; path: string }[];
  featuredProjects: string[];
  featuredArtwork: string[];
  seo: { title: string; description: string; image: MediaAsset };
  intro: { enabled: boolean; glasses?: MediaAsset; reference?: MediaAsset };
}

export interface ArchiveEntry {
  id: string;
  kind: "project" | "artwork";
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  cover: MediaAsset;
  date: string;
  path: string;
}
