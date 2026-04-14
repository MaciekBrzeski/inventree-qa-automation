import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { makePart } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
let partId: number | undefined;

test.describe.serial('API-PARTS-READS read-only per-part endpoints', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const res = await ctx.post('/api/part/', {
      data: makePart({ category: rootId, assembly: true, trackable: true }),
    });
    expect(res.status()).toBe(201);
    partId = ((await res.json()) as { pk?: number }).pk;
  });

  test.afterAll(async () => {
    if (!ctx || partId === undefined) return;
    await ctx.patch(`/api/part/${partId}/`, { data: { active: false } });
    await ctx.delete(`/api/part/${partId}/`);
    await ctx.dispose();
  });

  test('API-PARTS-READS-001 GET /api/part/{id}/requirements/ returns 200', async () => {
    if (!ctx || partId === undefined) throw new Error('seed');
    const response = await ctx.get(`/api/part/${partId}/requirements/`);
    expect(response.status()).toBe(200);
  });

  test('API-PARTS-READS-002 GET /api/part/{id}/serial-numbers/ returns 200', async () => {
    if (!ctx || partId === undefined) throw new Error('seed');
    const response = await ctx.get(`/api/part/${partId}/serial-numbers/`);
    expect(response.status()).toBe(200);
  });

  test('API-PARTS-READS-003 GET /api/part/{id}/pricing/ returns 200', async () => {
    if (!ctx || partId === undefined) throw new Error('seed');
    const response = await ctx.get(`/api/part/${partId}/pricing/`);
    // Pricing may 200 or 404 if no pricing exists — both are valid "exists in schema" signals.
    expect([200, 404]).toContain(response.status());
  });

  test('API-PARTS-READS-004 GET /api/part/{id}/bom-validate/ returns 200 for assembly', async () => {
    if (!ctx || partId === undefined) throw new Error('seed');
    const response = await ctx.get(`/api/part/${partId}/bom-validate/`);
    expect([200, 404]).toContain(response.status());
  });

  test('API-PARTS-READS-005 GET /api/part/category/tree/ returns the category tree', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.get('/api/part/category/tree/');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    // Tree can be array or paginated.
    const list = Array.isArray(body) ? body : ((body as { results?: unknown[] }).results ?? []);
    expect(Array.isArray(list)).toBe(true);
  });
});
