import type { Artwork } from "../types/content";
import { media } from "./media";

export const artworks: Artwork[] = [
  {
    id: "fold",
    slug: "fold-study",
    title: "Fold study",
    date: "2026-08-12",
    description: "Tension, held in a single gesture.",
    concept:
      "A close study of a generated ribbon sculpture. The crop shifts attention away from the whole object and toward the relationship between its surfaces.",
    medium: "Digital material study",
    tools: ["AI image generation", "Digital cropping"],
    categories: ["3d", "experimental"],
    tags: ["form", "lime", "material"],
    cover: media.fold,
    gallery: [media.fold, media.hero],
    blocks: [
      {
        type: "gallery",
        layout: "paired",
        images: [media.fold, media.hero],
        title: "A change of scale",
      },
    ],
    sample: true,
  },
  {
    id: "afterimage",
    slug: "afterimage",
    title: "Afterimage",
    date: "2026-07-04",
    description: "When colour leaves, weight remains.",
    concept:
      "A monochrome variation of the generated still life. The experiment asks how much of an image's hierarchy is carried by colour, and how much by form.",
    medium: "Digital monochrome study",
    tools: ["AI image generation", "Desaturation"],
    categories: ["art", "experimental"],
    tags: ["monochrome", "objects", "light"],
    cover: media.afterimage,
    gallery: [media.afterimage, media.still],
    blocks: [
      {
        type: "split",
        title: "Before and after",
        body: "Compare the original colour composition with this quieter variation. Both are sample images, created to demonstrate visual exploration.",
        image: media.still,
      },
    ],
    sample: true,
  },
  {
    id: "petal",
    slug: "petal-logic",
    title: "Petal logic",
    date: "2026-05-18",
    description: "An impossible flower, a very real feeling.",
    concept:
      "A generated glass form studied through a tighter frame. The image sits between something grown and something made, with light doing the work of drawing.",
    medium: "AI-assisted digital artwork",
    tools: ["AI image generation", "Digital composition"],
    categories: ["art", "illustration"],
    tags: ["organic", "glass", "coral"],
    cover: media.petal,
    gallery: [media.petal, media.bloom],
    blocks: [
      {
        type: "fullscreen",
        image: media.bloom,
        caption:
          "The source composition for this original demonstration study.",
      },
    ],
    sample: true,
  },
  {
    id: "strata",
    slug: "strata",
    title: "Strata",
    date: "2025-11-09",
    description: "A landscape without a horizon.",
    concept:
      "A wide material crop becomes an imagined terrain. Reflective folds read as ridges, while a stone interrupts the surface with a different kind of time.",
    medium: "Digital landscape experiment",
    tools: ["AI image generation", "Digital cropping"],
    categories: ["art", "3d"],
    tags: ["landscape", "silver", "texture"],
    cover: media.strata,
    gallery: [media.strata, media.terrain],
    blocks: [{ type: "image", image: media.terrain }],
    sample: true,
  },
  {
    id: "echo",
    slug: "graphic-echo",
    title: "Graphic echo",
    date: "2025-09-22",
    description: "Language becomes a pattern.",
    concept:
      "A fragment of the sample Signal poster, reframed as an independent graphic experiment. At close range, readable letters become rhythm and texture.",
    medium: "Digital graphic experiment",
    tools: ["AI image generation", "Digital cropping"],
    categories: ["graphic-design", "experimental"],
    tags: ["typography", "pattern", "poster"],
    cover: media.echo,
    gallery: [media.echo, media.signal],
    blocks: [
      {
        type: "process",
        title: "Changing the frame",
        steps: [
          {
            title: "Start with the whole",
            body: "The original demonstration poster supplies the visual language.",
            image: media.signal,
          },
          {
            title: "Find the fragment",
            body: "A closer crop changes the balance between language and image.",
            image: media.echo,
          },
        ],
      },
    ],
    sample: true,
  },
];
