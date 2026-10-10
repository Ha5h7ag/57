import { describe, expect, it } from "vitest";
import {
  archiveEntries,
  clientProjects,
  filterArchive,
  publicRoutes,
  validRegion,
  validateContent,
} from "./content";
import { projects } from "../content/projects";
import { clients } from "../content/clients";
import { artworks } from "../content/artwork";

describe("portfolio content integrity", () => {
  it("accepts the complete demonstration collection", () =>
    expect(validateContent()).toEqual([]));
  it("rejects duplicate slugs within a collection", () => {
    const duplicate = { ...projects[0], id: "another-project" };
    expect(
      validateContent({
        clients,
        projects: [...projects, duplicate],
        artworks,
      }),
    ).toContain("projects: duplicate slug signal");
  });
  it("rejects broken client relationships", () => {
    const broken = projects.map((item, index) =>
      index === 0 ? { ...item, clientIds: ["missing-client"] } : item,
    );
    expect(validateContent({ clients, projects: broken, artworks })).toContain(
      "signal: unknown client missing-client",
    );
  });
  it("derives shared projects for every associated client", () => {
    expect(clientProjects("matter-objects").map((item) => item.id)).toEqual([
      "objects",
      "common-ground",
      "form",
    ]);
    expect(clientProjects("common-ground").map((item) => item.id)).toEqual([
      "common-ground",
      "soft",
    ]);
  });
  it("generates breakdown URLs only when annotations exist", () => {
    expect(publicRoutes()).toContain("/work/signal/behind-the-design/");
    expect(publicRoutes()).not.toContain(
      "/work/form-in-motion/behind-the-design/",
    );
    expect(new Set(publicRoutes()).size).toBe(publicRoutes().length);
  });
});

describe("archive discovery", () => {
  it("combines both kinds of work", () => {
    const entries = archiveEntries();
    expect(entries.filter((item) => item.kind === "project")).toHaveLength(5);
    expect(entries.filter((item) => item.kind === "artwork")).toHaveLength(5);
  });
  it("combines categories and case-insensitive multiword search", () => {
    expect(
      filterArchive(archiveEntries(), "  SIGNAL music ", "branding").map(
        (item) => item.id,
      ),
    ).toEqual(["signal"]);
    expect(filterArchive(archiveEntries(), "SIGNAL", "3d")).toEqual([]);
  });
  it("finds tags as well as titles", () =>
    expect(
      filterArchive(archiveEntries(), "monochrome", "all").map(
        (item) => item.id,
      ),
    ).toEqual(["afterimage"]));
});

describe("normalized highlight geometry", () => {
  it("allows edge-to-edge rectangles", () =>
    expect(validRegion({ type: "rect", x: 0, y: 0, width: 1, height: 1 })).toBe(
      true,
    ));
  it("rejects overflow, zero area, and nonfinite coordinates", () => {
    expect(
      validRegion({ type: "rect", x: 0.8, y: 0, width: 0.3, height: 0.5 }),
    ).toBe(false);
    expect(validRegion({ type: "rect", x: 0, y: 0, width: 0, height: 1 })).toBe(
      false,
    );
    expect(
      validRegion({ type: "rect", x: NaN, y: 0, width: 0.2, height: 1 }),
    ).toBe(false);
  });
  it("requires three bounded polygon points", () => {
    expect(
      validRegion({
        type: "polygon",
        points: [
          [0, 0],
          [1, 0],
          [0.5, 1],
        ],
      }),
    ).toBe(true);
    expect(
      validRegion({
        type: "polygon",
        points: [
          [0, 0],
          [1, 0],
        ],
      }),
    ).toBe(false);
    expect(
      validRegion({
        type: "polygon",
        points: [
          [0, 0],
          [2, 0],
          [0, 1],
        ],
      }),
    ).toBe(false);
  });
});
