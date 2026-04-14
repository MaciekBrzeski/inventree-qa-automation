import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';

let ctx: APIRequestContext | undefined;

/**
 * Bulk collection endpoints (PATCH / PUT / DELETE on `/api/part/`, `/api/part/category/`,
 * `/api/bom/`, etc.) expect a **list of items** as payload. Sending an empty/non-list
 * payload should return a structured 400 (or 405 if the method is plain disallowed).
 * Each test below issues the request inline so the graph builder's source-file inference
 * picks up the literal endpoint + method pair.
 */
test.describe.serial('API-PARTS-BULK collection-level bulk endpoints', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (ctx) await ctx.dispose();
  });

  test('API-PARTS-BULK-001 PATCH /api/part/ rejects non-list', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.patch('/api/part/', { data: {} });
    expect([400, 405]).toContain(response.status());
  });

  test('API-PARTS-BULK-002 PATCH /api/part/category/ rejects non-list', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.patch('/api/part/category/', { data: {} });
    expect([400, 405]).toContain(response.status());
  });

  test('API-PARTS-BULK-003 PUT /api/part/category/ rejects non-list', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.put('/api/part/category/', { data: {} });
    expect([400, 405]).toContain(response.status());
  });

  test('API-PARTS-BULK-004 DELETE /api/bom/ rejects non-list', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.delete('/api/bom/', { data: {} });
    expect([400, 405]).toContain(response.status());
  });

  test('API-PARTS-BULK-005 DELETE /api/part/stocktake/ rejects non-list', async () => {
    if (!ctx) throw new Error('ctx');
    const response = await ctx.delete('/api/part/stocktake/', { data: {} });
    expect([400, 405]).toContain(response.status());
  });
});
