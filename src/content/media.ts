import type { MediaAsset } from "../types/content";

function image(
  id: string,
  width: number,
  height: number,
  alt: string,
): MediaAsset {
  return {
    id,
    src: `media/generated/${id}`,
    original: `media/originals/${id}.webp`,
    width,
    height,
    alt,
  };
}

export const media = {
  hero: image(
    "hero",
    1536,
    1024,
    "Black folded ribbon sculpture with lime inner surfaces on a pale mint background",
  ),
  signal: image(
    "signal",
    1122,
    1402,
    "Signal music exhibition poster with bold stacked typography and a lime disc",
  ),
  still: image(
    "still",
    1448,
    1086,
    "Chrome ring, cobalt block, and orange sphere in a hard-lit sculptural still life",
  ),
  bloom: image(
    "bloom",
    1122,
    1402,
    "Translucent coral glass petals illuminated against a deep burgundy background",
  ),
  terrain: image(
    "terrain",
    1536,
    1024,
    "Pearlescent silver folded material and volcanic stone against a lime plane",
  ),
  fold: image(
    "fold",
    1024,
    1024,
    "Close study of a twisting black ribbon and its lime interior",
  ),
  afterimage: image(
    "afterimage",
    1024,
    1024,
    "Monochrome study of a chrome torus and geometric objects",
  ),
  petal: image(
    "petal",
    1024,
    1280,
    "Close detail of glowing coral glass petals",
  ),
  strata: image(
    "strata",
    1536,
    864,
    "Wide detail of silver material ridges and a dark stone",
  ),
  echo: image(
    "echo",
    1024,
    1280,
    "Experimental crop of interrupted Signal typography and graphic shapes",
  ),
  process: image(
    "process",
    1122,
    1402,
    "Desaturated Signal poster used to demonstrate a contrast study",
  ),
};
