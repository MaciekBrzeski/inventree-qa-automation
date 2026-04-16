import { test, expect, type APIRequestContext, request } from '@playwright/test';
import { createAuthedContext, createAnonContext } from '../helpers/client';

const BASE_URL = process.env.INVENTREE_URL ?? 'http://inventree.localhost';

let authCtx: APIRequestContext | undefined;

// A subset of the negative-path tests are straight "hit URL X → expect status
// Y". Those are collapsed into a table-driven loop below (PDF: "Demonstrate
// data-driven or parameterised testing where appropriate"). Cases with side
// effects or body assertions stay as discrete tests.

type NegativeCase = {
  id: string;
  title: string;
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  url: string;
  data?: Record<string, unknown>;
  expected: number;
  useAnon?: boolean;
  invalidToken?: boolean;
};

const PARAMETERISED: NegativeCase[] = [
  {
    id: 'API-PARTS-048',
    title: 'GET /api/part/ with no Authorization returns 401',
    method: 'GET',
    url: '/api/part/',
    expected: 401,
    useAnon: true,
  },
  {
    id: 'API-PARTS-049',
    title: 'GET /api/part/ with invalid token returns 401',
    method: 'GET',
    url: '/api/part/',
    expected: 401,
    invalidToken: true,
  },
  {
    id: 'API-PARTS-050',
    title: 'GET /api/part/999999999/ returns 404',
    method: 'GET',
    url: '/api/part/999999999/',
    expected: 404,
  },
  {
    id: 'API-PARTS-051',
    title: 'GET /api/part/category/999999999/ returns 404',
    method: 'GET',
    url: '/api/part/category/999999999/',
    expected: 404,
  },
  {
    id: 'API-PARTS-052',
    title: 'POST /api/part/ with empty payload returns 400',
    method: 'POST',
    url: '/api/part/',
    data: {},
    expected: 400,
  },
  {
    id: 'API-PARTS-054',
    title: 'PATCH /api/part/999999999/ returns 404',
    method: 'PATCH',
    url: '/api/part/999999999/',
    data: { description: 'nope' },
    expected: 404,
  },
  {
    id: 'API-PARTS-055',
    title: 'DELETE /api/part/999999999/ returns 404',
    method: 'DELETE',
    url: '/api/part/999999999/',
    expected: 404,
  },
  {
    id: 'API-PARTS-056',
    title: 'POST /api/part/category/ with empty name returns 400',
    method: 'POST',
    url: '/api/part/category/',
    data: { name: '', parent: null },
    expected: 400,
  },
];

test.describe('API-PARTS-NEGATIVE auth and validation', () => {
  test.beforeAll(async () => {
    authCtx = await createAuthedContext();
  });

  test.afterAll(async () => {
    if (authCtx) await authCtx.dispose();
  });

  for (const c of PARAMETERISED) {
    test(`${c.id} ${c.title}`, async () => {
      let ctx: APIRequestContext;
      let ownCtx = false;
      if (c.useAnon) {
        ctx = await createAnonContext();
        ownCtx = true;
      } else if (c.invalidToken) {
        ctx = await request.newContext({
          baseURL: BASE_URL,
          extraHTTPHeaders: {
            Authorization:
              'Token inv-0000000000000000000000000000000000000000000000-00000000',
            Accept: 'application/json',
          },
        });
        ownCtx = true;
      } else {
        if (!authCtx) throw new Error('ctx');
        ctx = authCtx;
      }
      try {
        const response =
          c.method === 'GET'
            ? await ctx.get(c.url)
            : c.method === 'POST'
              ? await ctx.post(c.url, { data: c.data ?? {} })
              : c.method === 'PATCH'
                ? await ctx.patch(c.url, { data: c.data ?? {} })
                : await ctx.delete(c.url);
        expect(response.status()).toBe(c.expected);
      } finally {
        if (ownCtx) await ctx.dispose();
      }
    });
  }

  // Side-effect tests stay discrete — they need cleanup or body inspection.

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
