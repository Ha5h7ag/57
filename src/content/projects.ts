import type { BreakdownEntry, Project } from "../types/content";
import { media } from "./media";

const signalBreakdown: BreakdownEntry[] = [
  {
    id: "signal-type",
    title: "A voice that carries",
    category: "Typography",
    order: 1,
    image: media.signal,
    region: { type: "rect", x: 0.04, y: 0.04, width: 0.85, height: 0.31 },
    description:
      "Repeated, tightly set letterforms give the poster the insistence of a sound moving through a room.",
    whyItMatters:
      "The title becomes the image, making the poster recognizable before the smaller information is read.",
    supplementary: media.process,
  },
  {
    id: "signal-colour",
    title: "One sharp interruption",
    category: "Colour",
    order: 2,
    image: media.signal,
    region: { type: "rect", x: 0.28, y: 0.2, width: 0.57, height: 0.46 },
    description:
      "The lime disc interrupts the black-and-paper composition with a single, memorable colour gesture.",
    whyItMatters:
      "A restricted palette keeps the system coherent while giving the eye a clear point of entry.",
  },
  {
    id: "signal-layout",
    title: "An offbeat rhythm",
    category: "Composition",
    order: 3,
    image: media.signal,
    region: {
      type: "polygon",
      points: [
        [0.02, 0.35],
        [0.8, 0.35],
        [0.98, 0.93],
        [0.02, 0.93],
      ],
    },
    description:
      "Shifts in scale and interruption create a deliberately uneven rhythm across the page.",
    whyItMatters:
      "The layout echoes independent music without relying on literal instruments or familiar concert imagery.",
  },
];

const objectBreakdown: BreakdownEntry[] = [
  {
    id: "objects-light",
    title: "Light makes the material",
    category: "Lighting",
    order: 1,
    image: media.still,
    region: { type: "rect", x: 0.14, y: 0.04, width: 0.49, height: 0.77 },
    description:
      "A precise studio light reveals the reflective torus and gives every edge a distinct weight.",
    whyItMatters:
      "The lighting describes the material without needing a caption or a technical explanation.",
  },
  {
    id: "objects-balance",
    title: "A deliberate imbalance",
    category: "Composition",
    order: 2,
    image: media.still,
    region: { type: "rect", x: 0.44, y: 0.32, width: 0.5, height: 0.55 },
    description:
      "The blue block and orange sphere counter the weight of the metal ring.",
    whyItMatters:
      "Contrasting shapes create tension while keeping the scene legible at thumbnail size.",
  },
];

export const projects: Project[] = [
  {
    id: "signal",
    slug: "signal",
    title: "Turn up the signal",
    clientIds: ["signal-assembly"],
    year: 2026,
    categories: ["branding", "graphic-design"],
    tags: ["identity", "poster", "music"],
    description: "A graphic identity with something to say.",
    introduction:
      "An imagined visual language for independent music. Loud type, one sharp colour, and a rhythm that refuses to sit still.",
    cover: media.signal,
    gallery: [media.signal, media.echo, media.process],
    tools: ["Typography", "Digital composition", "AI image generation"],
    credits: ["Original AI-generated demonstration imagery"],
    sample: true,
    breakdown: signalBreakdown,
    blocks: [
      {
        type: "text",
        title: "The idea",
        body: "A poster should feel like the event before it explains the event. This demonstration begins with the energy of a room, translated into type, contrast, and interruption.",
      },
      {
        type: "split",
        title: "A system with an offbeat",
        body: "The imagined brief called for an identity that could move between a poster, an album sleeve, and a digital announcement. A limited set of elements creates variation without losing its voice.",
        image: media.echo,
      },
      {
        type: "process",
        title: "Finding the rhythm",
        steps: [
          {
            title: "Reduce the palette",
            body: "A desaturated comparison tests whether hierarchy survives without colour.",
            image: media.process,
          },
          {
            title: "Interrupt the grid",
            body: "A closer crop tests how repeated forms hold together at a different scale.",
            image: media.echo,
          },
          {
            title: "Bring back the signal",
            body: "The final sample combines those contrasts into one distinct image.",
            image: media.signal,
          },
        ],
      },
      {
        type: "gallery",
        layout: "paired",
        images: [media.signal, media.echo],
        title: "The final language",
      },
      { type: "breakdown" },
    ],
  },
  {
    id: "objects",
    slug: "objects-of-attention",
    title: "Objects of attention",
    clientIds: ["matter-objects"],
    year: 2026,
    categories: ["art", "3d"],
    tags: ["art direction", "objects", "material"],
    description: "Ordinary shapes. An unexpected conversation.",
    introduction:
      "A sample art-direction study in which metal, stone, and colour share the same small stage.",
    cover: media.still,
    gallery: [media.still, media.afterimage],
    tools: ["Art direction", "Digital image-making", "AI image generation"],
    credits: ["Original AI-generated demonstration imagery"],
    sample: true,
    breakdown: objectBreakdown,
    blocks: [
      {
        type: "text",
        title: "The challenge",
        body: "How do you make a familiar object feel unfamiliar? This imagined commission uses contrast instead of spectacle: shiny against rough, circular against square, heavy against light.",
      },
      {
        type: "fullscreen",
        image: media.still,
        caption:
          "A generated still-life study, created for this sample portfolio.",
      },
      {
        type: "split",
        title: "Colour is a material, too",
        body: "Removing colour changes the way the objects balance. This companion study lets the texture and weight of each shape take over.",
        image: media.afterimage,
      },
      { type: "breakdown" },
    ],
  },
  {
    id: "common-ground",
    slug: "a-common-ground",
    title: "A common ground",
    clientIds: ["common-ground", "matter-objects"],
    year: 2025,
    categories: ["branding", "experimental"],
    tags: ["culture", "material", "connection"],
    description: "A meeting point between the solid and the fluid.",
    introduction:
      "A conceptual identity study for a fictional arts space, built around materials that bend, meet, and find a shared edge.",
    cover: media.terrain,
    gallery: [media.terrain, media.strata],
    tools: ["Concept development", "Image-making", "AI image generation"],
    credits: ["Original AI-generated demonstration imagery"],
    sample: true,
    breakdown: [
      {
        id: "ground-texture",
        title: "A shared surface",
        category: "Texture",
        order: 1,
        image: media.terrain,
        region: { type: "rect", x: 0.12, y: 0.08, width: 0.71, height: 0.72 },
        description:
          "An irregular silver surface introduces movement against the flat coloured plane.",
        whyItMatters:
          "The contrast suggests a place where different practices can coexist without becoming identical.",
      },
    ],
    blocks: [
      {
        type: "text",
        title: "A place for difference",
        body: "The fictional space brings different practices together. Rather than illustrating community literally, the sample identity begins with a shared surface that accommodates very different forms.",
      },
      {
        type: "gallery",
        layout: "horizontal",
        images: [media.terrain, media.strata],
        title: "Material conversations",
      },
      {
        type: "quote",
        text: "A shared language can still make room for difference.",
        attribution: "Concept note for this demonstration project",
      },
      { type: "breakdown" },
    ],
  },
  {
    id: "form",
    slug: "form-in-motion",
    title: "Form in motion",
    clientIds: ["matter-objects", "signal-assembly"],
    year: 2025,
    categories: ["3d", "motion", "experimental"],
    tags: ["sculpture", "kinetic concept", "form"],
    description: "A static study of something that wants to move.",
    introduction:
      "Fold, tension, and a flash of colour. These generated stills explore a visual direction for a hypothetical motion identity.",
    cover: media.hero,
    gallery: [media.hero, media.fold],
    tools: ["Concept direction", "AI image generation"],
    credits: [
      "Demonstration concept stills; no finished motion film is claimed",
    ],
    sample: true,
    breakdown: [],
    blocks: [
      {
        type: "text",
        title: "Movement, held still",
        body: "The ribbon suggests a sequence without pretending to be a completed film. Its changes in direction invite the viewer to imagine the movement between two static studies.",
      },
      { type: "image", image: media.hero },
      {
        type: "gallery",
        layout: "sequence",
        images: [media.fold, media.hero],
        title: "From detail to gesture",
      },
    ],
  },
  {
    id: "soft",
    slug: "a-softer-system",
    title: "A softer system",
    clientIds: ["common-ground"],
    year: 2024,
    categories: ["illustration", "art"],
    tags: ["organic", "glass", "light"],
    description: "An organic image for an open-ended idea.",
    introduction:
      "A sample visual campaign exploring softness as a structure rather than a decorative treatment.",
    cover: media.bloom,
    gallery: [media.bloom, media.petal],
    tools: ["Image direction", "AI image generation"],
    credits: ["Original AI-generated demonstration imagery"],
    sample: true,
    breakdown: [],
    blocks: [
      {
        type: "text",
        title: "The solution",
        body: "The sample image treats light as a connecting thread. Repeated translucent forms become a flexible motif for a fictional cultural programme.",
      },
      {
        type: "gallery",
        layout: "masonry",
        images: [media.bloom, media.petal],
        title: "Soft structures",
      },
    ],
  },
];
