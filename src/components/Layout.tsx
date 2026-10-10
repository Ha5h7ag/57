import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { site } from "../content/site";
import { pageSeo } from "../utils/seo";

export function SampleNote({ compact = false }: { compact?: boolean }) {
  return (
    <p className={`sample-note ${compact ? "compact" : ""}`}>
      {compact
        ? "Demo portfolio. All work is sample material."
        : "Demonstration project. Imagery and collaborator relationships are fictional, created for this sample portfolio."}
    </p>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const preference = useRef<string | null>(null);
  useEffect(() => {
    try {
      preference.current = localStorage.getItem("forma-theme");
    } catch {
      /* Storage is optional. */
    }
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const value = preference.current
        ? preference.current === "dark"
        : query.matches;
      setDark(value);
      document.documentElement.dataset.theme = value ? "dark" : "light";
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return (
    <button
      className="icon-button"
      aria-label={`Switch to ${dark ? "light" : "dark"} theme`}
      onClick={() => {
        const next = !dark;
        setDark(next);
        document.documentElement.dataset.theme = next ? "dark" : "light";
        preference.current = next ? "dark" : "light";
        try {
          localStorage.setItem("forma-theme", next ? "dark" : "light");
        } catch {
          /* Storage is optional. */
        }
      }}
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);
  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    if (open) modal.current?.showModal();
    else modal.current?.close();
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header wrap">
        <Link to="/" className="wordmark" aria-label={`${site.name} home`}>
          {site.wordmark}
          <span className="wordmark-mark">*</span>
        </Link>
        <span className="header-description">
          Independent design
          <br />& visual art
        </span>
        <nav className="desktop-nav" aria-label="Main navigation">
          {site.navigation.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
        <button
          className="icon-button menu-trigger"
          aria-label="Open navigation"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Menu />
        </button>
      </header>
      <dialog
        ref={modal}
        className="menu-dialog"
        aria-label="Main navigation"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <div className="menu-top">
          <span className="wordmark">{site.wordmark}*</span>
          <button
            className="icon-button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            autoFocus
          >
            <X />
          </button>
        </div>
        <nav>
          {site.navigation.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setOpen(false)}>
              {item.label}
              <ArrowUpRight />
            </Link>
          ))}
          <Link to="/clients/" onClick={() => setOpen(false)}>
            Collaborators
            <ArrowUpRight />
          </Link>
        </nav>
        {site.isDemo && <SampleNote compact />}
      </dialog>
    </>
  );
}

export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div className="footer-top">
        <Link to="/" className="wordmark">
          {site.wordmark}*
        </Link>
        <p>
          Good ideas deserve
          <br />a distinctive form.
        </p>
        <Link className="text-link" to="/contact/">
          Contact <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="footer-bottom">
        {site.isDemo && <SampleNote compact />}
        <div>
          <Link to="/clients/">Collaborators</Link>
          <Link to="/archive/">Archive</Link>
          <span>© {site.name}</span>
        </div>
      </div>
    </footer>
  );
}

export function RouteEffects() {
  const { pathname } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    const seo = pageSeo(pathname);
    document.title = seo.title;
    const meta = (selector: string, attribute: string, value: string) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement(
          selector.startsWith("link") ? "link" : "meta",
        );
        const key = selector.match(/\[(name|property|rel)="([^"]+)"\]/);
        if (key) element.setAttribute(key[1], key[2]);
        document.head.append(element);
      }
      element.setAttribute(attribute, value);
    };
    meta('meta[name="description"]', "content", seo.description);
    meta('link[rel="canonical"]', "href", seo.canonical);
    meta('meta[property="og:title"]', "content", seo.title);
    meta('meta[property="og:description"]', "content", seo.description);
    meta('meta[property="og:image"]', "content", seo.image);
    meta('meta[property="og:url"]', "content", seo.canonical);
    if (seo.noindex) meta('meta[name="robots"]', "content", "noindex");
    else document.head.querySelector('meta[name="robots"]')?.remove();
    if (!first.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      const heading = document.querySelector<HTMLElement>("main h1");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    }
    first.current = false;
  }, [pathname]);
  return null;
}
