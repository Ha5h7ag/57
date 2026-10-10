import type { SiteSettings } from "../types/content";
import { media } from "./media";

export const site: SiteSettings = {
  name: "Forma Studio",
  wordmark: "forma",
  isDemo: true,
  heroProject: "form",
  heroHeadline: ["Form.", "Feeling."],
  profession: "Independent graphic design & visual art",
  introduction:
    "A demonstration studio exploring identity, image, and the space between.",
  biography:
    "Forma is a fictional independent practice, created to demonstrate a portfolio that makes room for both purposeful design and open-ended exploration. This sample studio approaches identity, image-making, and art direction through material, rhythm, and a curiosity about how things feel. Replace this biography with the artist's real story before publishing an authentic portfolio.",
  email: "studio@example.com",
  emailIsSample: true,
  socials: [],
  navigation: [
    { label: "Work", path: "/work/" },
    { label: "Art", path: "/art/" },
    { label: "Studio", path: "/about/" },
    { label: "Archive", path: "/archive/" },
    { label: "Contact", path: "/contact/" },
  ],
  featuredProjects: ["signal", "objects", "common-ground"],
  featuredArtwork: ["fold", "petal", "strata"],
  seo: {
    title: "Forma Studio | Design & visual art",
    description:
      "A sample exhibition of independent graphic design, visual art, and the ideas behind the work.",
    image: media.hero,
  },
  intro: { enabled: true },
};
