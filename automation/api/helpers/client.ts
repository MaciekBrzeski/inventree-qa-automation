import { request, type APIRequestContext } from '@playwright/test';

const BASE_URL = process.env.INVENTREE_URL ?? 'http://inventree.localhost';
const USERNAME = process.env.INVENTREE_USER ?? 'admin';
const PASSWORD = process.env.INVENTREE_PASS ?? 'changeme';

let cachedToken: string | undefined;

export async function fetchToken(): Promise<string> {
  if (cachedToken) return cachedToken;
  if (process.env.INVENTREE_TOKEN) {
    cachedToken = process.env.INVENTREE_TOKEN;
    return cachedToken;
  }
  const basic = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64');
  const ctx = await request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      Authorization: `Basic ${basic}`,
      Accept: 'application/json',
    },
  });
  const response = await ctx.get('/api/user/token/');
  if (!response.ok()) {
    throw new Error(`token fetch failed: ${response.status()} ${await response.text()}`);
  }
  const body = (await response.json()) as { token?: string };
  if (!body.token) throw new Error(`token fetch returned no token: ${JSON.stringify(body)}`);
  await ctx.dispose();
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

export async function createAnonContext(): Promise<APIRequestContext> {
  return request.newContext({
    baseURL: BASE_URL,
    extraHTTPHeaders: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}
