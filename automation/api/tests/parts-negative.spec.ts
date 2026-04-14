import { test, expect, type APIRequestContext, request } from '@playwright/test';
import { createAuthedContext, createAnonContext } from '../helpers/client';

const BASE_URL = process.env.INVENTREE_URL ?? 'http://inventree.localhost';

let authCtx: APIRequestContext | undefined;

test.describe('API-PARTS-NEGATIVE auth and validation', () => {
  test.beforeAll(async () => {
    authCtx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (authCtx) await authCtx.dispose();
  });

  test('API-PARTS-048 GET /api/part/ with no Authorization returns 401', async () => {
    const ctx = await createAnonContext();
    const response = await ctx.get('/api/part/');
    expect(response.status()).toBe(401);
    await ctx.dispose();
  });

  test('API-PARTS-049 GET /api/part/ with invalid token returns 401', async () => {
    const ctx = await request.newContext({
      baseURL: BASE_URL,
      extraHTTPHeaders: {
        Authorization: 'Token inv-0000000000000000000000000000000000000000000000-00000000',
        Accept: 'application/json',
      },
    });
    const response = await ctx.get('/api/part/');
    expect(response.status()).toBe(401);
    await ctx.dispose();
  });

  test('API-PARTS-050 GET /api/part/999999999/ returns 404', async () => {
    if (!authCtx) throw new Error('ctx');
    const response = await authCtx.get('/api/part/999999999/');
    expect(response.status()).toBe(404);
  });

  test('API-PARTS-051 GET /api/part/category/999999999/ returns 404', async () => {
    if (!authCtx) throw new Error('ctx');
    const response = await authCtx.get('/api/part/category/999999999/');
    expect(response.status()).toBe(404);
  });

  test('API-PARTS-052 POST /api/part/ with empty payload returns 400', async () => {
    if (!authCtx) throw new Error('ctx');
    const response = await authCtx.post('/api/part/', { data: {} });
    expect(response.status()).toBe(400);
  });

  test('API-PARTS-053 POST /api/part/ with name only actually succeeds', async () => {
    // Live API discovery: category is NOT required. POST {name:"x"} returns 201 with category=null.
    // Document this as a known-permissive behaviour; cleanup the part so it does not leak.
    if (!authCtx) throw new Error('ctx');
    const response = await authCtx.post('/api/part/', { data: { name: `NEG-${Date.now()}` } });
    expect(response.status()).toBe(201);
    const body = (await response.json()) as { pk?: number; category?: number | null };
    expect(body.category).toBeNull();
    if (typeof body.pk === 'number') {
      await authCtx.patch(`/api/part/${body.pk}/`, { data: { active: false } });
      await authCtx.delete(`/api/part/${body.pk}/`);
    }
  });

  test('API-PARTS-054 PATCH /api/part/999999999/ returns 404', async () => {
    if (!authCtx) throw new Error('ctx');
    const response = await authCtx.patch('/api/part/999999999/', {
      data: { description: 'nope' },
    });
    expect(response.status()).toBe(404);
  });

  test('API-PARTS-055 DELETE /api/part/999999999/ returns 404', async () => {
    if (!authCtx) throw new Error('ctx');
    const response = await authCtx.delete('/api/part/999999999/');
    expect(response.status()).toBe(404);
  });

  test('API-PARTS-056 POST /api/part/category/ with empty name returns 400', async () => {
    if (!authCtx) throw new Error('ctx');
    const response = await authCtx.post('/api/part/category/', {
      data: { name: '', parent: null },
    });
    expect(response.status()).toBe(400);
  });

  test('API-PARTS-057 PUT /api/part/ on collection expects a bulk list and returns 400', async () => {
    // Live API discovery: PUT /api/part/ is a bulk-update endpoint that expects a list payload.
    // Sending {} returns 400 with body.non_field_errors = "List of items must be provided for bulk operation".
    if (!authCtx) throw new Error('ctx');
    const response = await authCtx.fetch('/api/part/', { method: 'PUT', data: {} });
    expect(response.status()).toBe(400);
    const body = (await response.json()) as { non_field_errors?: unknown };
    expect(String(body.non_field_errors ?? '')).toContain('bulk');
  });
});
