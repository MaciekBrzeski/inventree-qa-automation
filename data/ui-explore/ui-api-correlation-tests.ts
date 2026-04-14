import { test, expect } from '../fixtures/auth';

test.describe('UI-API correlation — assert clicks trigger recorded endpoints', () => {

  test('UI-API-001 click "Category Details" on /web/part/category/index/subcategories', async ({ page }) => {
    await page.goto("/web/part/category/index/subcategories");
    await page.waitForLoadState("networkidle");
    const hits: string[] = [];
    const listener = (req: import("@playwright/test").Request) => {
      const url = req.url();
      if (!/\/api\//.test(url)) return;
      const u = new URL(url);
      const path = u.pathname.replace(/\/\d+(?=\/|$)/g, "/{id}");
      hits.push(`${req.method()} ${path}`);
    };
    page.on("request", listener);
    const target = page.getByRole("button", { name: "Category Details", exact: true }).or(
      page.getByRole("tab", { name: "Category Details", exact: true })).or(
      page.getByText("Category Details", { exact: true })).first();
    await target.waitFor({ state: "visible", timeout: 10_000 });
    await target.click();
    await page.waitForTimeout(1500);
    page.off("request", listener);
    const expected = ["GET /api/part/category/"];
    const matched = expected.some((e) => hits.includes(e));
    expect(matched, `expected one of ${expected.join(", ")}, got ${hits.join(", ")}`).toBe(true);
  });

  test('UI-API-002 click "Part Categories" on /web/part/category/index/subcategories', async ({ page }) => {
    await page.goto("/web/part/category/index/subcategories");
    await page.waitForLoadState("networkidle");
    const hits: string[] = [];
    const listener = (req: import("@playwright/test").Request) => {
      const url = req.url();
      if (!/\/api\//.test(url)) return;
      const u = new URL(url);
      const path = u.pathname.replace(/\/\d+(?=\/|$)/g, "/{id}");
      hits.push(`${req.method()} ${path}`);
    };
    page.on("request", listener);
    const target = page.getByRole("button", { name: "Part Categories", exact: true }).or(
      page.getByRole("tab", { name: "Part Categories", exact: true })).or(
      page.getByText("Part Categories", { exact: true })).first();
    await target.waitFor({ state: "visible", timeout: 10_000 });
    await target.click();
    await page.waitForTimeout(1500);
    page.off("request", listener);
    const expected = ["GET /api/part/category/"];
    const matched = expected.some((e) => hits.includes(e));
    expect(matched, `expected one of ${expected.join(", ")}, got ${hits.join(", ")}`).toBe(true);
  });
});
