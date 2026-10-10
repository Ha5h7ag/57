import type { Client } from "../types/content";
import { media } from "./media";

export const clients: Client[] = [
  {
    id: "signal-assembly",
    slug: "signal-assembly",
    name: "Signal Assembly",
    organization: "Signal Assembly",
    role: "Sample cultural collaborator",
    industry: "Music & culture",
    description:
      "A fictional collective bringing independent music, visual culture, and people into the same room.",
    relationship:
      "An imagined identity and poster collaboration, created exclusively as demonstration material.",
    image: media.signal,
    sample: true,
  },
  {
    id: "matter-objects",
    slug: "matter-objects",
    name: "Matter Objects",
    organization: "Matter Objects",
    role: "Sample design collaborator",
    industry: "Objects & interiors",
    description:
      "A fictional object studio exploring ordinary materials through unexpected forms.",
    relationship:
      "A demonstration of an editorial art-direction relationship across object imagery and material studies.",
    image: media.still,
    sample: true,
  },
  {
    id: "common-ground",
    slug: "common-ground",
    name: "Common Ground",
    organization: "Common Ground",
    role: "Sample community collaborator",
    industry: "Arts & community",
    description:
      "An imagined independent arts space where disciplines meet and new ideas find an audience.",
    relationship:
      "A sample visual identity exploring shared spaces, flexible structures, and moments of connection.",
    image: media.terrain,
    sample: true,
  },
];
