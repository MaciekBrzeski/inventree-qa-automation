import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { makePart } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
let partA: number | undefined;
let partB: number | undefined;
let relatedId: number | undefined;

test.describe.serial('API-PARTS-REL part related-parts', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const aRes = await ctx.post('/api/part/', { data: makePart({ category: rootId }) });
    expect(aRes.status()).toBe(201);
    partA = ((await aRes.json()) as { pk?: number }).pk;
    const bRes = await ctx.post('/api/part/', { data: makePart({ category: rootId }) });
    expect(bRes.status()).toBe(201);
    partB = ((await bRes.json()) as { pk?: number }).pk;
  });

  test.afterAll(async () => {
    if (!ctx) return;
    for (const pk of [partA, partB]) {
      if (typeof pk === 'number') {
        await ctx.patch(`/api/part/${pk}/`, { data: { active: false } });
        await ctx.delete(`/api/part/${pk}/`);
      }
    }
    await ctx.dispose();
  });

  test('API-PARTS-REL-001 POST /api/part/related/ creates a related link', async () => {
    if (!ctx || !partA || !partB) throw new Error('seed');
    const response = await ctx.post('/api/part/related/', {
      data: { part_1: partA, part_2: partB, note: 'rel-api-test' },
    });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; note?: string };
    expect(body.note).toBe('rel-api-test');
    expect(typeof body.pk).toBe('number');
    relatedId = body.pk;
  });

  test('API-PARTS-REL-002 GET /api/part/related/ lists the created link', async () => {
    if (!ctx || !partA) throw new Error('seed');
    const response = await ctx.get(`/api/part/related/?part=${partA}`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const list = Array.isArray(body) ? body : ((body as { results?: unknown[] }).results ?? []);
    expect(list.length).toBeGreaterThan(0);
  });

  test('API-PARTS-REL-003 GET /api/part/related/{id}/ retrieves the link by id', async () => {
    if (!ctx || relatedId === undefined) throw new Error('seed');
    const response = await ctx.get(`/api/part/related/${relatedId}/`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { pk?: number; note?: string };
    expect(body.pk).toBe(relatedId);
    expect(body.note).toBe('rel-api-test');
  });

  test('API-PARTS-REL-004 PATCH /api/part/related/{id}/ updates the note', async () => {
    if (!ctx || relatedId === undefined) throw new Error('seed');
    const response = await ctx.patch(`/api/part/related/${relatedId}/`, {
      data: { note: 'rel-api-patched' },
    });
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { note?: string };
    expect(body.note).toBe('rel-api-patched');
  });

  test('API-PARTS-REL-005 DELETE /api/part/related/{id}/ removes the link', async () => {
    if (!ctx || relatedId === undefined) throw new Error('seed');
    const response = await ctx.delete(`/api/part/related/${relatedId}/`);
    expect(response.status()).toBe(204);
    const followUp = await ctx.get(`/api/part/related/${relatedId}/`);
    expect(followUp.status()).toBe(404);
    relatedId = undefined;
  });
});
