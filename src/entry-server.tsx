import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import { basePath } from "./utils/urls";
export { publicRoutes, validateContent } from "./utils/content";
export { seoHtml } from "./utils/seo";
export { media } from "./content/media";
export { basePath, canonicalUrl } from "./utils/urls";

export function render(path: string) {
  return renderToString(
    <StaticRouter
      basename={basePath}
      location={`${basePath.replace(/\/$/, "")}${path}`}
    >
      <App />
    </StaticRouter>,
  );
}
