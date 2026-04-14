import { test, expect } from '../fixtures/auth';
import type { APIRequestContext, Page } from '@playwright/test';
import { createAuthedContext, createPart, deletePart, type CreatedPart } from '../helpers/api';

let api: APIRequestContext | undefined;
let assembly: CreatedPart | undefined;
let component: CreatedPart | undefined;
let bomId: number | undefined;

async function navAndCapture(
  page: Page,
  url: string,
  predicate: (url: string, method: string) => boolean,
): Promise<string[]> {
  const hits: string[] = [];
  const listener = (req: import('@playwright/test').Request): void => {
    if (predicate(req.url(), req.method())) hits.push(`${req.method()} ${req.url()}`);
  };
  page.on('request', listener);
  await page.goto(url);
  await page.waitForLoadState('networkidle');
  await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
  await page.waitForTimeout(1800);
  page.off('request', listener);
  return hits;
}

test.describe('UI-TABS part detail tab navigation → SPA fetches', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    assembly = await createPart(api, {
      assembly: true,
      component: false,
      testable: true,
      trackable: true,
      purchaseable: true,
      salable: true,
      description: 'UI-TABS seed assembly',
    });
    component = await createPart(api, {
      component: true,
      purchaseable: true,
      description: 'UI-TABS seed component',
    });
    // Seed a BOM line so the BOM panel has data.
    const bomRes = await api.post('/api/bom/', {
      data: { part: assembly.pk, sub_part: component.pk, quantity: 1 },
    });
    if (bomRes.ok()) bomId = ((await bomRes.json()) as { pk?: number }).pk;
  });

  test.afterAll(async () => {
    if (!api) return;
    if (bomId !== undefined) await api.delete(`/api/bom/${bomId}/`);
    if (component) await deletePart(api, component.pk);
    if (assembly) await deletePart(api, assembly.pk);
    await api.dispose();
  });

  test('UI-TAB-001 parameters tab → some /api/part/ fetch on the current part', async ({
    page,
  }) => {
    if (!assembly) throw new Error('seed');
    const seedPk = assembly.pk;
    const hits = await navAndCapture(
      page,
      `/web/part/${seedPk}/parameters`,
      (url, m) => m === 'GET' && new RegExp(`/api/part/${seedPk}/`).test(url),
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TAB-002 bom tab → GET /api/bom/', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    const hits = await navAndCapture(
      page,
      `/web/part/${assembly.pk}/bom`,
      (url, m) => m === 'GET' && /\/api\/bom\//.test(url),
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TAB-003 related parts tab → GET /api/part/related/', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    const hits = await navAndCapture(
      page,
      `/web/part/${assembly.pk}/related_parts`,
      (url, m) => m === 'GET' && /\/api\/part\/related\//.test(url),
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TAB-004 pricing tab → GET /api/part/{id}/pricing/', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    const hits = await navAndCapture(
      page,
      `/web/part/${assembly.pk}/pricing`,
      (url, m) => m === 'GET' && /\/api\/part\/\d+\/pricing\//.test(url),
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TAB-005 stock tab → GET /api/stock/ or /api/part/{id}/requirements/', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    const hits = await navAndCapture(
      page,
      `/web/part/${assembly.pk}/stock`,
      (url, m) =>
        m === 'GET' &&
        (/\/api\/stock\//.test(url) || /\/api\/part\/\d+\/requirements\//.test(url)),
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TAB-006 test_templates tab → GET /api/part/test-template/', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    const hits = await navAndCapture(
      page,
      `/web/part/${assembly.pk}/test_templates`,
      (url, m) => m === 'GET' && /\/api\/part\/test-template\//.test(url),
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TAB-007 suppliers tab → GET /api/company/part/ or similar', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    const hits = await navAndCapture(
      page,
      `/web/part/${assembly.pk}/suppliers`,
      (url, m) => m === 'GET' && /\/api\//.test(url),
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TAB-008 purchase_orders tab → any /api/ fetch', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    const hits = await navAndCapture(
      page,
      `/web/part/${assembly.pk}/purchase_orders`,
      (url, m) => m === 'GET' && /\/api\//.test(url),
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TAB-009 allocations tab → any /api/ fetch', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    const hits = await navAndCapture(
      page,
      `/web/part/${assembly.pk}/allocations`,
      (url, m) => m === 'GET' && /\/api\//.test(url),
    );
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-TAB-010 attachments tab → any /api/ fetch', async ({ page }) => {
    if (!assembly) throw new Error('seed');
    const hits = await navAndCapture(
      page,
      `/web/part/${assembly.pk}/attachments`,
      (url, m) => m === 'GET' && /\/api\//.test(url),
    );
    expect(hits.length).toBeGreaterThan(0);
  });
});
