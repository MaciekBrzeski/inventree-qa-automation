import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { validateResponse } from '../helpers/schema';
import { makePart, type PartInput } from '../helpers/factories';

let ctx: APIRequestContext | undefined;
let partId: number | undefined;
let createdInput: PartInput | undefined;

test.describe.serial('API-PARTS parts CRUD', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (ctx && partId !== undefined) {
      await ctx.patch(`/api/part/${partId}/`, { data: { active: false } });
      const r = await ctx.delete(`/api/part/${partId}/`);
      if (r.status() !== 204 && r.status() !== 404) {
        console.error(`[cleanup] unexpected ${r.status()} on DELETE part/${partId}/`);
      }
      partId = undefined;
    }
    if (ctx) await ctx.dispose();
  });

  test('API-PARTS-001 list parts', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const response = await ctx.get('/api/part/?limit=5');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults =
      typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
  });

  test('API-PARTS-002 create part', async () => {
    if (!ctx) throw new Error('ctx not initialised');
    const categoryId = Number(process.env.INVENTREE_QA_ROOT_ID);
    expect(Number.isFinite(categoryId)).toBe(true);
    createdInput = makePart({ category: categoryId });
    const response = await ctx.post('/api/part/', { data: createdInput });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; name?: string; IPN?: string };
    expect(body.name).toBe(createdInput.name);
    expect(body.IPN).toBe(createdInput.IPN);
    expect(typeof body.pk).toBe('number');
    partId = body.pk;
    const result = validateResponse('/api/part/', 'post', 201, body);
    expect(result.ok, `schema errors: ${JSON.stringify(result.errors)}`).toBe(true);
  });

  test('API-PARTS-003 retrieve part', async () => {
    if (!ctx || partId === undefined || !createdInput) throw new Error('no part from prior step');
    const response = await ctx.get(`/api/part/${partId}/`);
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { name?: string; IPN?: string };
    expect(body.name).toBe(createdInput.name);
    expect(body.IPN).toBe(createdInput.IPN);
  });

  test('API-PARTS-004 update part', async () => {
    if (!ctx || partId === undefined) throw new Error('no part from prior step');
    const response = await ctx.patch(`/api/part/${partId}/`, {
      data: { description: 'updated-by-qa' },
    });
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { description?: string };
    expect(body.description).toBe('updated-by-qa');
  });

  test('API-PARTS-005 delete part', async () => {
    if (!ctx || partId === undefined) throw new Error('no part from prior step');
    // InvenTree refuses DELETE on an active part with HTTP 400.
    // Deactivate first (PATCH active=false), then delete.
    const deactivate = await ctx.patch(`/api/part/${partId}/`, { data: { active: false } });
    expect(deactivate.status()).toBe(200);
    const response = await ctx.delete(`/api/part/${partId}/`);
    expect(response.status()).toBe(204);
    partId = undefined;
  });
});
