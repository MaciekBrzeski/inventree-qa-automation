import { test as base } from '@playwright/test';
import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';
import { LoginPage } from '../pages/LoginPage';
import { PartsListPage } from '../pages/PartsListPage';
import { PartDetailPage } from '../pages/PartDetailPage';

const STATE_DIR = resolve(__dirname, '../.auth');
const STATE_PATH = resolve(STATE_DIR, 'admin.json');
const RECORDER_DIR = resolve(__dirname, '../../../data/api-ui-gap');
const RECORDER_FILE = resolve(RECORDER_DIR, 'per-test-requests.json');

const USERNAME = process.env.INVENTREE_USER ?? 'admin';
const PASSWORD = process.env.INVENTREE_PASS ?? 'changeme';

type PageBag = {
  loginPage: LoginPage;
  partsListPage: PartsListPage;
  partDetailPage: PartDetailPage;
  recordApiRequests: void;
};

type RecordedRequest = { method: string; url: string; status: number | null };
const perTest: Record<string, RecordedRequest[]> = {};
let flushScheduled = false;
function scheduleFlush(): void {
  if (flushScheduled) return;
  flushScheduled = true;
  const flush = async (): Promise<void> => {
    await fs.mkdir(RECORDER_DIR, { recursive: true });
    const payload = Object.entries(perTest).map(([test, requests]) => ({ test, requests }));
    await fs.writeFile(RECORDER_FILE, JSON.stringify(payload, null, 2), 'utf8');
  };
  process.on('exit', () => {
    // Sync flush on exit is tricky; write the file immediately after each test finishes
    // via the fixture's teardown instead of relying on exit.
    void flush();
  });
}

export const test = base.extend<PageBag>({
  recordApiRequests: [
    async ({ page }, use, testInfo) => {
      scheduleFlush();
      const key = `${testInfo.file.split('/').slice(-1)[0]}::${testInfo.title}`;
      perTest[key] = perTest[key] ?? [];
      const onRequest = (req: import('@playwright/test').Request): void => {
        const url = req.url();
        if (!/\/api\//.test(url)) return;
        perTest[key]!.push({ method: req.method(), url, status: null });
      };
      const onResponse = (res: import('@playwright/test').Response): void => {
        const url = res.url();
        if (!/\/api\//.test(url)) return;
        const arr = perTest[key];
        if (!arr) return;
        for (let i = arr.length - 1; i >= 0; i -= 1) {
          if (arr[i]!.url === url && arr[i]!.status === null) {
            arr[i]!.status = res.status();
            return;
          }
        }
      };
      page.on('request', onRequest);
      page.on('response', onResponse);
      await use();
      page.off('request', onRequest);
      page.off('response', onResponse);
      // Merge-and-flush: load existing file (from prior runs), merge this process's
      // perTest into it, and write back. Preserves cumulative coverage across
      // successive `npx playwright test` invocations until the file is explicitly reset.
      await fs.mkdir(RECORDER_DIR, { recursive: true });
      let existing: Array<{ test: string; requests: RecordedRequest[] }> = [];
      try {
        existing = JSON.parse(await fs.readFile(RECORDER_FILE, 'utf8'));
      } catch {
        /* first run */
      }
      const byKey = new Map<string, RecordedRequest[]>();
      for (const e of existing) byKey.set(e.test, e.requests);
      for (const [t, reqs] of Object.entries(perTest)) byKey.set(t, reqs);
      const payload = Array.from(byKey.entries()).map(([t, requests]) => ({ test: t, requests }));
      await fs.writeFile(RECORDER_FILE, JSON.stringify(payload, null, 2), 'utf8');
    },
    { auto: true },
  ],
  storageState: async ({ browser }, use) => {
    await fs.mkdir(STATE_DIR, { recursive: true });
    const exists = await fs
      .access(STATE_PATH)
      .then(() => true)
      .catch(() => false);
    if (!exists) {
      const ctx = await browser.newContext({
        baseURL: process.env.INVENTREE_URL ?? 'http://inventree.localhost',
      });
      const page = await ctx.newPage();
      const login = new LoginPage(page);
      await login.goto();
      await login.login(USERNAME, PASSWORD);
      await ctx.storageState({ path: STATE_PATH });
      await ctx.close();
    }
    await use(STATE_PATH);
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  partsListPage: async ({ page }, use) => {
    await use(new PartsListPage(page));
  },
  partDetailPage: async ({ page }, use) => {
    await use(new PartDetailPage(page));
  },
});

export { expect } from '@playwright/test';

export async function resetAuthState(): Promise<void> {
  await fs.rm(STATE_PATH, { force: true });
}
