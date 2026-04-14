import { test, expect } from '../fixtures/auth';
import type { APIRequestContext } from '@playwright/test';
import { createAuthedContext, createPart, deletePart, type CreatedPart } from '../helpers/api';

let api: APIRequestContext | undefined;
let seed: CreatedPart | undefined;
let catA: number | undefined;

test.describe.serial('UI-EXTRA close paired gaps via directed navigation', () => {
  test.beforeAll(async () => {
    api = await createAuthedContext();
    seed = await createPart(api, { description: 'ui-extra seed', assembly: true });
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const catRes = await api.post('/api/part/category/', {
      data: { name: `UI-EXTRA-cat-${Date.now()}`, parent: rootId },
    });
    catA = ((await catRes.json()) as { pk?: number }).pk;
  });

  test.afterAll(async () => {
    if (!api) return;
    if (seed) await deletePart(api, seed.pk);
    if (typeof catA === 'number') await api.delete(`/api/part/category/${catA}/`);
    await api.dispose();
  });

  test('UI-EXTRA-001 navigate to Part Pricing tab → GET /api/part/{id}/pricing/', async ({
    page,
  }) => {
    if (!seed) throw new Error('seed');
    const hits: string[] = [];
    page.on('request', (req) => {
      if (/\/api\/part\/\d+\/pricing\/?$/.test(req.url()) && req.method() === 'GET') {
        hits.push(req.url());
      }
    });
    await page.goto(`/web/part/${seed.pk}/pricing`);
    await page.waitForLoadState('networkidle');
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(1500);
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-EXTRA-002 click nav-breadcrumb-action on parts root → GET /api/part/category/tree/', async ({
    page,
  }) => {
    const hits: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/api/part/category/tree/') && req.method() === 'GET') {
        hits.push(req.url());
      }
    });
    await page.goto('/web/part');
    await page.waitForLoadState('networkidle');
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(1000);
    await page.getByLabel('nav-breadcrumb-action').click();
    await page.waitForTimeout(1500);
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-EXTRA-003 rename the created category via UI → PATCH /api/part/category/{id}/', async ({
    page,
  }) => {
    if (typeof catA !== 'number') throw new Error('seed');
    await page.goto(`/web/part/category/${catA}/details`);
    await page.waitForLoadState('networkidle');
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(1000);
    await page.getByLabel('action-menu-category-actions').click();
    await page.getByLabel('action-menu-category-actions-edit').click();
    const nameField = page.locator('input[name="name"]').first();
    await nameField.waitFor({ state: 'visible', timeout: 10_000 });
    await nameField.fill(`UI-EXTRA-renamed-${Date.now()}`);
    const [response] = await Promise.all([
      page.waitForResponse(
        (r) =>
          /\/api\/part\/category\/\d+\/?$/.test(r.url()) && r.request().method() === 'PATCH',
        { timeout: 10_000 },
      ),
      page.getByRole('button', { name: 'Submit' }).first().click(),
    ]);
    expect([200, 204]).toContain(response.status());
  });

  test('UI-EXTRA-004 navigate to Part BOM tab → GET /api/bom/ via SPA', async ({ page }) => {
    if (!seed) throw new Error('seed');
    const hits: string[] = [];
    page.on('request', (req) => {
      if (/\/api\/bom\/?/.test(req.url()) && req.method() === 'GET') {
        hits.push(req.url());
      }
    });
    await page.goto(`/web/part/${seed.pk}/bom`);
    await page.waitForLoadState('networkidle');
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(2000);
    expect(hits.length).toBeGreaterThan(0);
  });

  test('UI-EXTRA-005 navigate to Related Parts tab → GET /api/part/related/', async ({
    page,
  }) => {
    if (!seed) throw new Error('seed');
    const hits: string[] = [];
    page.on('request', (req) => {
      if (/\/api\/part\/related\/?/.test(req.url()) && req.method() === 'GET') {
        hits.push(req.url());
      }
    });
    await page.goto(`/web/part/${seed.pk}/related_parts`);
    await page.waitForLoadState('networkidle');
    await page.getByLabel('navigation-menu').waitFor({ state: 'visible', timeout: 10_000 });
    await page.waitForTimeout(1500);
    expect(hits.length).toBeGreaterThan(0);
  });
});
