import { useRef } from "react";
import type { ReactNode } from "react";
import { Routes, Route, useLocation } from "react-router";
import { Header, Footer, RouteEffects } from "./components/Layout";
import { usePageMotion } from "./hooks/useMotion";
import { Home } from "./pages/Home";
import { WorkPage, ArtPage, ClientsPage } from "./pages/Galleries";
import {
  ClientPage,
  ProjectPage,
  ArtworkPage,
  BreakdownPage,
} from "./pages/Details";
import { ArchivePage } from "./pages/Archive";
import { AboutPage, ContactPage, NotFound } from "./pages/StaticPages";

// A keyed route owns its motion so cleanup runs before its children are removed.
function MotionPage({ path, children }: { path: string; children: ReactNode }) {
  const main = useRef<HTMLElement>(null);
  usePageMotion(main, path);
  return (
    <main id="main" ref={main}>
      {children}
    </main>
  );
}

export function App() {
  const location = useLocation();
  return (
    <>
      <Header />
      <RouteEffects />
      <MotionPage key={location.pathname} path={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route
            path="/work/:slug/behind-the-design"
            element={<BreakdownPage />}
          />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:slug" element={<ClientPage />} />
          <Route path="/art" element={<ArtPage />} />
          <Route path="/art/:slug" element={<ArtworkPage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MotionPage>
      <Footer />
    </>
  );
}
