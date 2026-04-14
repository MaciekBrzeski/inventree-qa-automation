import { request, type APIRequestContext } from '@playwright/test';

const BASE_URL = process.env.INVENTREE_URL ?? 'http://inventree.localhost';
const USERNAME = process.env.INVENTREE_USER ?? 'admin';
const PASSWORD = process.env.INVENTREE_PASS ?? 'changeme';

let cachedToken: string | undefined;

async function fetchToken(): Promise<string> {
  if (cachedToken) return cachedToken;
  if (process.env.INVENTREE_TOKEN) {
    cachedToken = process.env.INVENTREE_TOKEN;
    return cachedToken;
  }
  const basic = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
  const ctx = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: { Authorization: `Basic ${basic}`, Accept: 'application/json' },
  });
  const response = await ctx.get('/api/user/token/');
  if (!response.ok()) throw new Error(`token fetch failed: ${response.status()}`);
  const body = (await response.json()) as { token?: string };
  await ctx.dispose();
  if (!body.token) throw new Error('no token in response');
  cachedToken = body.token;
  return cachedToken;
}

export async function createAuthedContext(): Promise<APIRequestContext> {
  const token = await fetchToken();
  return request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      Authorization: `Token ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export async function ensureQaRoot(ctx: APIRequestContext): Promise<number> {
  const list = await ctx.get('/api/part/category/?search=QA-ROOT');
  if (list.ok()) {
    const raw = (await list.json()) as unknown;
    const arr = Array.isArray(raw) ? raw : (raw as { results?: unknown[] }).results ?? [];
    for (const entry of arr as Array<{ pk?: number; name?: string }>) {
      if (entry.name === 'QA-ROOT' && typeof entry.pk === 'number') return entry.pk;
    }
  }
  const created = await ctx.post('/api/part/category/', {
    data: { name: 'QA-ROOT', parent: null, description: 'QA root' },
  });
  const body = (await created.json()) as { pk?: number };
  if (typeof body.pk !== 'number') throw new Error('could not create QA-ROOT');
  return body.pk;
}

export type CreatedPart = { pk: number; name: string; IPN: string };

export async function createPart(
  ctx: APIRequestContext,
  overrides: Record<string, unknown> = {},
): Promise<CreatedPart> {
  const stamp = `${Date.now().toString(36)}${Math.floor(Math.random() * 1000).toString(36)}`;
  const rootId = await ensureQaRoot(ctx);
  const payload = {
    name: `QA-UI-Part-${stamp}`,
    IPN: `QAP-UI-${stamp}`,
    description: 'QA UI-test generated',
    category: rootId,
    active: true,
    component: true,
    purchaseable: true,
    ...overrides,
  };
  const response = await ctx.post('/api/part/', { data: payload });
  if (!response.ok()) {
    throw new Error(`createPart failed: ${response.status()} ${await response.text()}`);
  }
  const body = (await response.json()) as { pk?: number; name?: string; IPN?: string };
  if (typeof body.pk !== 'number' || !body.name || !body.IPN) {
    throw new Error(`createPart returned incomplete body: ${JSON.stringify(body)}`);
  }
  return { pk: body.pk, name: body.name, IPN: body.IPN };
}

export async function deletePart(ctx: APIRequestContext, pk: number): Promise<void> {
  await ctx.patch(`/api/part/${pk}/`, { data: { active: false } });
  await ctx.delete(`/api/part/${pk}/`);
}
