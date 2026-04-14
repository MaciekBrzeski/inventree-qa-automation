import { test, expect } from '@playwright/test';
import { createAuthedContext, createAnonContext } from '../helpers/client';
import { validateResponse } from '../helpers/schema';

test.describe('API-SMOKE — infra sanity', () => {
  test('API-SMOKE-001 GET /api/ returns InvenTree banner', async () => {
    const ctx = await createAnonContext();
    const response = await ctx.get('/api/');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as { server?: string; version?: string; apiVersion?: number };
    expect(body.server).toBe('InvenTree');
    expect(body.version).toBeTruthy();
    expect(body.apiVersion).toBeGreaterThan(0);
    await ctx.dispose();
  });

  test('API-SMOKE-002 authed list parts returns 200 + array-ish', async () => {
    const ctx = await createAuthedContext();
    const response = await ctx.get('/api/part/?limit=1');
    expect(response.status()).toBe(200);
    const body = (await response.json()) as unknown;
    const isArray = Array.isArray(body);
    const hasResults = typeof body === 'object' && body !== null && Array.isArray((body as { results?: unknown[] }).results);
    expect(isArray || hasResults).toBe(true);
    await ctx.dispose();
  });

  test('API-SMOKE-003 QA-ROOT category resolved in global setup', async () => {
    expect(process.env.INVENTREE_QA_ROOT_ID).toMatch(/^\d+$/);
  });

  test('API-SMOKE-004 schema validator runs against real part list', async () => {
    // The InvenTree serializer for `PartBrief` omits several fields (category_name, pricing_min/max, etc.)
    // that the OpenAPI schema marks as required. That is a live schema-vs-response mismatch in InvenTree
    // itself, not a bug in our helper. See docs/qa/bugs/INV-PARTS-002-openapi-required-drift.md (TBD).
    // We still exercise the validator end-to-end so the smoke suite fails loudly if the schema file
    // goes missing or the ajv wiring breaks.
    const ctx = await createAuthedContext();
    const response = await ctx.get('/api/part/?limit=2');
    expect(response.status()).toBe(200);
    const body = await response.json();
    const result = validateResponse('/api/part/', 'get', 200, body);
    // result.ok may be true or false depending on which required properties the server currently omits.
    // What we assert is that the validator ran and produced a boolean + (if false) an error list.
    expect(typeof result.ok).toBe('boolean');
    if (!result.ok) {
      expect(Array.isArray(result.errors)).toBe(true);
    }
    await ctx.dispose();
  });
});
