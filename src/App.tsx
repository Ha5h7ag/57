import { useRef } from "react";
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

export function App() {
  const main = useRef<HTMLElement>(null);
  const location = useLocation();
  usePageMotion(main, location.pathname);
  return (
    <>
      <Header />
      <RouteEffects />
      <main id="main" ref={main}>
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
      </main>
      <Footer />
    </>
  );
}
