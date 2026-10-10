import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { publicRoutes } from "../../src/utils/content";

test("prerendered navigation works without JavaScript under the deployment base", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  const base = new URL(baseURL!).pathname;
  try {
    await page.goto("./");
    const internalLinks = await page
      .locator('a[href^="/"]')
      .evaluateAll((links) => links.map((link) => link.getAttribute("href")!));
    expect(internalLinks.length).toBeGreaterThan(10);
    expect(internalLinks.filter((href) => !href.startsWith(base))).toEqual([]);
    await page
      .locator(".desktop-nav")
      .getByRole("link", { name: "Work", exact: true })
      .click();
    await expect(page).toHaveURL(new URL("work/", baseURL!).href);
    await expect(page.locator("main h1")).toContainText("An idea.");
    await page.locator(".work-item").first().click();
    await expect(page.locator("main h1")).toContainText("Turn up");
    await page
      .getByRole("link", { name: "Forma Studio home", exact: true })
      .click();
    await expect(page).toHaveURL(baseURL!);
  } finally {
    await context.close();
  }
});

test("every public route serves prerendered content and survives refresh", async ({
  page,
  request,
}) => {
  const consoleErrors: string[] = [];
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  for (const route of publicRoutes()) {
    const relative = route.slice(1) || "./";
    const response = await request.get(relative);
    expect(response.status(), route).toBe(200);
    const html = await response.text();
    expect(html, route).toContain('data-prerendered="true"');
    expect(html, route).toContain('property="og:image"');
    expect(html, route).toContain("<h1");
    await page.goto(relative);
    await expect(page.locator("main h1")).toBeVisible();
    await page.reload();
    await expect(page.locator("main h1")).toBeVisible();
    await expect
      .poll(() =>
        page.locator("img").evaluateAll((elements) =>
          elements
            .map((element) => element as HTMLImageElement)
            .filter((image) => image.loading !== "lazy")
            .every((image) => image.complete && image.naturalWidth > 0),
        ),
      )
      .toBe(true);
  }
  expect(consoleErrors).toEqual([]);
});

test("unknown links show an actual 404 and preserve usable navigation", async ({
  page,
}) => {
  const response = await page.goto("missing-room/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "A little out of frame." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Back to the gallery" }).click();
  await expect(page.locator("main h1")).toContainText("Form.");
});

test("archive filtering combines search, category, empty states, and history", async ({
  page,
}) => {
  await page.goto("archive/");
  await expect(page.locator(".work-item")).toHaveCount(10);
  await page.getByRole("button", { name: "Branding", exact: true }).click();
  await expect(page.locator(".work-item")).toHaveCount(2);
  await page.getByRole("searchbox", { name: "Search archive" }).fill("signal");
  await expect(page.locator(".work-item")).toHaveCount(1);
  await expect(page).toHaveURL(/category=branding.*q=signal/);
  await page.reload();
  await expect(page.locator(".work-item")).toHaveCount(1);
  await page.getByRole("button", { name: "Art", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "No work found." }),
  ).toBeVisible();
  await page.goBack();
  await expect(page.locator(".work-item")).toHaveCount(1);
  await page.getByRole("searchbox").fill("unfindable artwork");
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".work-item")).toHaveCount(10);
});

test("breakdown decisions work with keyboard and remain aligned", async ({
  page,
}) => {
  await page.goto("work/signal/behind-the-design/");
  await page
    .getByRole("button", { name: "One sharp interruption", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#decision-description h2")).toHaveText(
    "One sharp interruption",
  );
  expect(
    Number(await page.locator(".region-outline").getAttribute("x")),
  ).toBeCloseTo(28);
  const box = await page.locator(".annotated-image img").boundingBox();
  const overlay = await page.locator(".annotation").boundingBox();
  expect(Math.abs(box!.width - overlay!.width)).toBeLessThan(2);
  expect(Math.abs(box!.height - overlay!.height)).toBeLessThan(2);
  await page.getByRole("button", { name: "Composition", exact: true }).click();
  await expect(page.locator(".region-outline")).toHaveJSProperty(
    "tagName",
    "polygon",
  );
});

test("shared client associations and absent breakdowns are correct", async ({
  page,
}) => {
  await page.goto("clients/matter-objects/");
  await expect(page.locator(".work-item")).toHaveCount(3);
  await page.goto("work/form-in-motion/");
  await expect(
    page.getByRole("link", { name: "Behind the design", exact: true }),
  ).toHaveCount(0);
});

test("high-resolution viewer closes with Escape and restores focus", async ({
  page,
}) => {
  await page.goto("art/fold-study/");
  const trigger = page.locator(".artwork-cover button");
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Full-resolution artwork" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("intro can be skipped and only plays once per session", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  await page.getByRole("button", { name: "Skip introduction" }).click();
  await expect(page.locator(".intro-dialog")).toHaveCount(0);
  await page.reload();
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator(".intro-dialog")).toHaveCount(0);
});

test("intro completes automatically", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("./");
  await expect(
    page.getByRole("dialog", { name: "Opening introduction" }),
  ).toBeVisible();
  await expect(page.locator(".intro-dialog")).toHaveCount(0, { timeout: 6000 });
});

for (const width of [360, 768, 1440, 1920]) {
  test(`responsive layouts have no page overflow at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "./",
      "work/signal/",
      "work/signal/behind-the-design/",
      "archive/",
      "contact/",
    ]) {
      await page.goto(route);
      await expect(page.locator("main h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        route,
      ).toBe(true);
    }
  });
}

test("mobile menu traps focus, closes on navigation, and supports Escape", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("./");
  await page.getByRole("button", { name: "Open navigation" }).click();
  const dialog = page.getByRole("dialog", { name: "Main navigation" });
  await expect(dialog).toBeVisible();
  await dialog.getByRole("link", { name: "Art", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page.locator("main h1")).toContainText("Room for");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
});

test("theme selection survives navigation and contact opens a mail client", async ({
  page,
}) => {
  await page.goto("contact/");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator(".email-link")).toHaveAttribute(
    "href",
    "mailto:studio@example.com",
  );
  await expect(page.locator(".contact-details .sample-note")).toContainText(
    "Sample email address",
  );
});

test("representative routes meet automated accessibility checks in both themes", async ({
  page,
}) => {
  test.setTimeout(60000);
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    for (const route of [
      "./",
      "archive/",
      "work/signal/behind-the-design/",
      "contact/",
    ]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations.map((violation) => ({
          id: violation.id,
          nodes: violation.nodes.map((node) => node.target),
        })),
        `${route} in ${colorScheme} theme`,
      ).toEqual([]);
    }
  }
});

test("motion remains usable across navigation and responsive changes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./");
  await page.getByRole("button", { name: "Skip introduction" }).click();
  await expect(page.locator(".pin-spacer")).toHaveCount(1);
  await page.setViewportSize({ width: 360, height: 800 });
  await expect(page.locator(".pin-spacer")).toHaveCount(0);
  await page.goto("archive/");
  await page.getByRole("button", { name: "Branding", exact: true }).click();
  await expect(page.locator(".work-item")).toHaveCount(2);
  await expect(page.locator(".work-item").first()).toHaveCSS("opacity", "1");
  await page.goto("work/signal/behind-the-design/");
  await page
    .getByRole("button", { name: "One sharp interruption", exact: true })
    .click();
  await expect(page.locator(".decision-copy")).toHaveCSS("opacity", "1");
});

test("save desktop and mobile visual verification artifacts", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("./");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator(".hero-art img")).toBeVisible();
  await page.screenshot({ path: "artifacts/home-desktop.png" });
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("work/signal/behind-the-design/");
  await page.locator(".supplementary").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".supplementary img")
        .evaluate((image) => (image as HTMLImageElement).naturalWidth),
    )
    .toBeGreaterThan(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "artifacts/breakdown-mobile.png",
    fullPage: true,
  });
});
