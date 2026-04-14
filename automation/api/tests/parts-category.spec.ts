import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { validateResponse } from '../helpers/schema';
import { makeCategory } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
const createdIds: number[] = [];

test.describe.serial('API-PARTS-CATEGORY part categories', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (!ctx) return;
    for (const id of [...createdIds].reverse()) {
      const r = await ctx.delete(`/api/part/category/${id}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE category/${id}/`);
      }
    }
    await ctx.dispose();
  });

  test('API-PARTS-018 list categories', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const response = await ctx.get('/api/part/category/?limit=5');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const list = Array.isArray(body)
      ? body
      : ((body as { results?: unknown[] }).results ?? []);
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-PARTS-019 create category under QA-ROOT', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);
    const payload = makeCategory({ parent: rootId });
    const response = await ctx.post('/api/part/category/', { data: payload });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; name?: string; parent?: number };
    expect(body.name).toBe(payload.name);
    expect(body.parent).toBe(rootId);
    expect(typeof body.pk).toBe('number');
    if (typeof body.pk === 'number') createdIds.push(body.pk);
  });

  test('API-PARTS-020 retrieve a category', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const id = createdIds[createdIds.length - 1];
    expect(id).toBeDefined();
    const response = await ctx.get(`/api/part/category/${id}/`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { pk?: number };
    expect(body.pk).toBe(id);
  });

  test('API-PARTS-021 rename a category via PATCH', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const id = createdIds[createdIds.length - 1];
    const renamed = `Renamed-${Date.now()}`;
    const response = await ctx.patch(`/api/part/category/${id}/`, {
      data: { name: renamed },
    });
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { name?: string };
    expect(body.name).toBe(renamed);
  });

  test('API-PARTS-022 create a child category (hierarchy)', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const parentId = createdIds[createdIds.length - 1];
    expect(parentId).toBeDefined();
    const payload = makeCategory({ parent: parentId });
    const response = await ctx.post('/api/part/category/', { data: payload });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; parent?: number };
    expect(body.parent).toBe(parentId);
    if (typeof body.pk === 'number') createdIds.push(body.pk);
  });

  test('API-PARTS-023 tree endpoint contains the child category', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const childId = createdIds[createdIds.length - 1];
    const response = await ctx.get('/api/part/category/tree/');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const list = Array.isArray(body) ? body : (body as { results?: unknown[] }).results ?? [];
    const ids = (list as Array<{ pk?: number }>).map((e) => e.pk);
    expect(ids).toContain(childId);
  });

  test('API-PARTS-024 POST with empty name returns 400', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID);
    const response = await ctx.post('/api/part/category/', {
      data: { name: '', parent: rootId },
    });
    expect(response.status()).toBe(400);
  });

  test('API-PARTS-025 DELETE /api/part/category/{id}/ removes the child category', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    // Delete the most recently created child category (not the parent, which still holds it).
    const childId = createdIds.pop();
    expect(childId).toBeDefined();
    const response = await ctx.delete(`/api/part/category/${childId}/`);
    expect(response.status()).toBe(204);
    const followUp = await ctx.get(`/api/part/category/${childId}/`);
    expect(followUp.status()).toBe(404);
  });
});
