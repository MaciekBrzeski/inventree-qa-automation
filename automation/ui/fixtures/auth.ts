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

// Defect injection for baseline validation: if CHECKPOINT_DEFECT is set to a
// known key, every page navigation gets a `<style>` or `<script>` block
// appended to document.head via page.addInitScript. Lets us prove the
// checkpoint baselines catch real visual regressions without touching the
// container or the Django templates.
const DEFECT_KEY = (process.env.CHECKPOINT_DEFECT ?? '').toLowerCase();
const DEFECT_PAYLOADS: Record<string, { description: string; css?: string; script?: string }> = {
  'buttons-magenta': {
    description: 'tint every action-button / action-menu aria-label magenta',
    css: 'button[aria-label^="action-button"],button[aria-label^="action-menu"]{background:magenta !important;color:white !important;}',
  },
  'hide-nav': {
    description: 'hide the primary navigation menu button',
    css: 'button[aria-label="navigation-menu"]{display:none !important;}',
  },
  'shift-layout': {
    description: 'shift every Mantine AppShell main region 50px right',
    css: '.mantine-AppShell-main{padding-left:50px !important;}',
  },
  'rename-submit': {
    description: 'rewrite every Submit button label to SEND IT',
    script:
      '(function(){var fix=function(){document.querySelectorAll("button").forEach(function(b){if(b.textContent.trim()==="Submit")b.textContent="SEND IT";});};new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true});fix();})()',
  },
  'zoom-out': {
    description: 'zoom the entire page to 80% via CSS transform',
    css: 'body{transform:scale(0.8) !important;transform-origin:top left !important;}',
  },
  'hide-icons': {
    description: 'hide every inline SVG icon',
    css: 'svg{display:none !important;}',
  },
  'dim-inputs': {
    description: 'drop input opacity to 30% — unreadable forms',
    css: 'input,textarea,select,[role="textbox"]{opacity:0.3 !important;}',
  },
  'red-rows': {
    description: 'add red border to every Mantine DataTable row',
    css: '.mantine-datatable-row,tr{border:2px solid red !important;}',
  },
  'comic-sans': {
    description: 'replace body font with Comic Sans',
    css: 'body,*{font-family:"Comic Sans MS",cursive !important;}',
  },
  'shrink-buttons': {
    description: 'shrink every button to 50% width + font-size 10px',
    css: 'button{font-size:10px !important;max-width:50% !important;padding:2px !important;}',
  },
  'invert-colors': {
    description: 'invert entire page color scheme',
    css: 'html{filter:invert(1) hue-rotate(180deg) !important;}',
  },
  'remove-labels': {
    description: 'hide every form field label',
    css: 'label,.mantine-InputWrapper-label{display:none !important;}',
  },
  'wiggle-table': {
    description: 'skew every table header by 5deg — layout warp',
    css: 'th,.mantine-datatable-header-cell{transform:skew(-5deg) !important;}',
  },
  'fake-loading': {
    description: 'inject a fake "Loading..." overlay over the main panel',
    script:
      '(function(){var o=document.createElement("div");o.id="qa-defect";o.textContent="Loading…";o.setAttribute("style","position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);color:white;font-size:48px;display:flex;align-items:center;justify-content:center;z-index:99999;");document.body.appendChild(o);})()',
  },
  'currency-euro': {
    description: 'rewrite every $ / USD / Parts / Pricing label visible in the SPA',
    script:
      '(function(){var swap={"$":"€","USD":"EUR","Parts":"Komponenty","Pricing":"Cennik","Submit":"Wyślij","Delete":"Usuń"};var fix=function(){document.querySelectorAll("body *").forEach(function(el){if(el.children.length===0&&el.textContent){var t=el.textContent;var n=t;Object.keys(swap).forEach(function(k){n=n.split(k).join(swap[k]);});if(n!==t)el.textContent=n;}});};new MutationObserver(fix).observe(document.documentElement,{childList:true,subtree:true,characterData:true});fix();})()',
  },
};

export const test = base.extend<PageBag>({
  recordApiRequests: [
    async ({ page }, use, testInfo) => {
      const defect = DEFECT_KEY ? DEFECT_PAYLOADS[DEFECT_KEY] : undefined;
      const applyDefect = async (): Promise<void> => {
        if (!defect) return;
        try {
          if (defect.css) {
            await page.addStyleTag({ content: defect.css });
          }
          if (defect.script) {
            await page.addScriptTag({ content: defect.script });
          }
        } catch {
          /* page may be mid-navigation; next 'load' will re-apply */
        }
      };
      if (defect) {
        process.stderr.write(`[defect] injecting ${DEFECT_KEY}\n`);
        page.on('load', () => {
          void applyDefect();
        });
      }
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
