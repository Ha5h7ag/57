export const basePath = import.meta.env.BASE_URL;
export const assetUrl = (path: string) =>
  `${basePath}${path.replace(/^\//, "")}`;
export const canonicalUrl = (path: string) =>
  `${(import.meta.env.VITE_SITE_ORIGIN || "https://example.com").replace(/\/$/, "")}${basePath}${path.replace(/^\//, "")}`;
