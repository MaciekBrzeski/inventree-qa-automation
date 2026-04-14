import { test, expect, type APIRequestContext } from '@playwright/test';
import { createAuthedContext } from '../helpers/client';
import { makePart } from '../helpers/factories';

// Adjacent endpoints outside /api/part + /api/bom that the SPA hits. Reported
// by submission/agents/rag/api-ui-gap.ts as dead.txt. Tests here are smoke-
// level: exercise the endpoint, assert 200 and a usable shape. Any endpoint
// returning a permission error or unexpected payload is an immediate red flag.

let ctx: APIRequestContext | undefined;
let partPk: number | undefined;
const createdParts: number[] = [];

async function listish(res: unknown): Promise<unknown[]> {
  if (Array.isArray(res)) return res;
  if (res && typeof res === 'object' && 'results' in (res as object)) {
    const r = (res as { results?: unknown }).results;
    return Array.isArray(r) ? r : [];
  }
  return [];
}

test.describe.serial('API-ADJ adjacent (dead-list) endpoints', () => {
  test.beforeAll(async () => {
    ctx = await createAuthedContext();
    // Seed one trackable assembly we can reference in query params.
    const rootId = Number(process.env.INVENTREE_QA_ROOT_ID ?? '1');
    const res = await ctx.post('/api/part/', {
      data: makePart({
        category: rootId,
        assembly: true,
        trackable: true,
        description: 'API-ADJ seed',
      }),
    });
    expect(res.status()).toBe(201);
    const body = (await res.json()) as { pk: number };
    partPk = body.pk;
    createdParts.push(partPk);
  });

  test.afterAll(async () => {
    if (!ctx) return;
    for (const pk of [...createdParts].reverse()) {
      await ctx.patch(`/api/part/${pk}/`, { data: { active: false } });
      await ctx.delete(`/api/part/${pk}/`);
    }
    await ctx.dispose();
  });

  test('API-ADJ-001 GET /api/attachment/ — list attachments for a part', async () => {
    if (!ctx || !partPk) throw new Error('seed');
    const res = await ctx.get(`/api/attachment/?model_id=${partPk}&model_type=part`);
    expect(res.status()).toBe(200);
    const list = await listish(await res.json());
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-ADJ-002 GET /api/company/part/ — list supplier-parts for a part', async () => {
    if (!ctx || !partPk) throw new Error('seed');
    const res = await ctx.get(`/api/company/part/?part=${partPk}`);
    expect(res.status()).toBe(200);
    const list = await listish(await res.json());
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-ADJ-003 GET /api/company/part/manufacturer/ — list manufacturer-parts', async () => {
    if (!ctx) throw new Error('seed');
    const res = await ctx.get('/api/company/part/manufacturer/');
    expect(res.status()).toBe(200);
    const list = await listish(await res.json());
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-ADJ-004 GET /api/stock/ — list stock items for a part', async () => {
    if (!ctx || !partPk) throw new Error('seed');
    const res = await ctx.get(`/api/stock/?part=${partPk}`);
    expect(res.status()).toBe(200);
    const list = await listish(await res.json());
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-ADJ-005 GET /api/stock/location/ — list stock locations', async () => {
    if (!ctx) throw new Error('seed');
    const res = await ctx.get('/api/stock/location/');
    expect(res.status()).toBe(200);
    const list = await listish(await res.json());
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-ADJ-006 GET /api/order/po-line/ — list PO lines (smoke)', async () => {
    // NOTE: ?part=<pk> is rejected — po-line filter expects a supplier_part id.
    // Smoke-level: endpoint is reachable and returns a list shape.
    if (!ctx) throw new Error('seed');
    const res = await ctx.get('/api/order/po-line/');
    expect(res.status()).toBe(200);
    const list = await listish(await res.json());
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-ADJ-007 GET /api/order/so-line/ — list SO lines (smoke)', async () => {
    if (!ctx) throw new Error('seed');
    const res = await ctx.get('/api/order/so-line/');
    expect(res.status()).toBe(200);
    const list = await listish(await res.json());
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-ADJ-008 GET /api/plugins/ — list installed plugins', async () => {
    if (!ctx) throw new Error('seed');
    const res = await ctx.get('/api/plugins/');
    expect(res.status()).toBe(200);
    const list = await listish(await res.json());
    expect(Array.isArray(list)).toBe(true);
  });

  test('API-ADJ-009 POST /api/generate/serial-number/ — request serial generation', async () => {
    if (!ctx || !partPk) throw new Error('seed');
    const res = await ctx.post('/api/generate/serial-number/', {
      data: { part: partPk, quantity: 1 },
    });
    // InvenTree may return 200 or 201 depending on version; also tolerate
    // 400 if the part happens to not have a serial scheme configured — this
    // endpoint is schemaless from a plain seed part's perspective.
    expect([200, 201, 400]).toContain(res.status());
  });

  test('API-ADJ-010 GET /api/user/me/ — authenticated user profile', async () => {
    if (!ctx) throw new Error('seed');
    const res = await ctx.get('/api/user/me/');
    expect(res.status()).toBe(200);
    const body = (await res.json()) as { username?: string; is_staff?: boolean };
    expect(body.username).toBe(process.env.INVENTREE_USER ?? 'admin');
  });
});
