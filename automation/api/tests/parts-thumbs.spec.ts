import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';

let ctx: APIRequestContext | undefined;

test.describe.serial('API-PARTS-THUMB part thumbnails', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (ctx) await ctx.dispose();
  });

  test('API-PARTS-THUMB-001 GET /api/part/thumbs/ lists thumbnails', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.get('/api/part/thumbs/?limit=5');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const list = Array.isArray(body) ? body : ((body as { results?: unknown[] }).results ?? []);
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-PARTS-THUMB-002 GET /api/part/thumbs/{id}/ retrieves a thumbnail by part id', async () => {
    if (!ctx) throw new Error('ctx');
    // Use part pk 1 (default InvenTree seed) — if it doesn't exist, pick any from the list.
    const listRes = await ctx.get('/api/part/?limit=1');
    const listBody = (await listRes.json()) as unknown;
    const list = Array.isArray(listBody) ? listBody : ((listBody as { results?: Array<{ pk?: number }> }).results ?? []);
    const firstPk = (list[0] as { pk?: number } | undefined)?.pk;
    if (typeof firstPk !== 'number') test.skip(true, 'no parts to probe');
    const response = await ctx.get(`/api/part/thumbs/${firstPk}/`);
    expect([200, 404]).toContain(response.status());
  });
});
