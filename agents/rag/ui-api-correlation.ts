import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

const HERE = new URL('.', import.meta.url).pathname;
const CORRELATION_JSONL = resolve(HERE, '../../data/ui-explore/click-to-api.jsonl');
const OUT_DIR = resolve(HERE, '../../data/ui-explore');
const REPORT_PATH = resolve(OUT_DIR, 'ui-api-correlation.md');
const SUGGESTIONS_PATH = resolve(OUT_DIR, 'ui-api-correlation-tests.ts');

type Ancestor = { route: string; candidate: string; label: string; text: string };

type ClickLog = {
  t?: string;
  route?: string;
  candidate?: string;
  tag?: string;
  depth?: number;
  ancestors?: Ancestor[];
  apiCalls?: string[];
  run?: string; // run-marker lines have only this field
};

function normalizePath(methodPath: string): string {
  const [method, rawPath] = methodPath.split(' ', 2);
  if (!method || !rawPath) return methodPath;
  const path = rawPath.replace(/\/\d+(?=\/|$)/g, '/{id}');
  return `${method} ${path}`;
}

async function main() {
  let lines: string[] = [];
  try {
    const raw = await fs.readFile(CORRELATION_JSONL, 'utf8');
    lines = raw.split('\n').filter((l) => l.trim());
  } catch {
    console.error(`[ui-api-correlation] no input at ${CORRELATION_JSONL}`);
    process.exit(1);
  }

  // key = `${route}::${candidate}` → Set of normalized api calls
  const map = new Map<string, Set<string>>();
  const counts = new Map<string, number>();
  const ancestorsByKey = new Map<string, Ancestor[]>();

  for (const line of lines) {
    let entry: ClickLog;
    try {
      entry = JSON.parse(line) as ClickLog;
    } catch {
      continue;
    }
    // Skip run-marker lines that have only { run: ... }.
    if (!entry.route || !entry.candidate || !entry.apiCalls) continue;
    const key = `${entry.route}::${entry.candidate}`;
    if (!map.has(key)) map.set(key, new Set());
    counts.set(key, (counts.get(key) ?? 0) + 1);
    // Record ancestors — prefer the SHORTEST chain seen for this key. If the same click
    // target was ever reached with no preconditions, treat it as reachable without a
    // chain (stable behaviour). Only candidates that are ALWAYS seen as descendants
    // keep a non-empty chain.
    const seenAncestors = entry.ancestors ?? [];
    if (!ancestorsByKey.has(key)) {
      ancestorsByKey.set(key, seenAncestors);
    } else {
      const existing = ancestorsByKey.get(key)!;
      if (seenAncestors.length < existing.length) ancestorsByKey.set(key, seenAncestors);
    }
    for (const call of entry.apiCalls) {
      if (call.startsWith('OPTIONS ')) continue;
      const norm = normalizePath(call);
      if (!norm.includes('/api/part') && !norm.includes('/api/bom')) continue;
      map.get(key)!.add(norm);
    }
  }

  // Skip correlations whose candidate is known to be state-dependent or noisy.
  // These generate flaky tests because the API call only fires in specific preconditions
  // (e.g. clicking pagination "1" only fetches when currently on page 2+).
  const NOISY_TEXT = /^(\d+|admin|Export|Path|Submit)$/;
  const NOISY_LABEL = /^(open-|navigation-menu|barcode-scan|table-(select|refresh|export|pagination)|nav-breadcrumb-action|row-action-menu-)/;
  const isNoisy = (candidate: string): boolean => {
    if (NOISY_TEXT.test(candidate)) return true;
    if (NOISY_LABEL.test(candidate)) return true;
    return false;
  };

  // Filter to only correlations with at least one relevant API call AND not noisy.
  // Submit is kept only when it has an ancestor (meaning we replay the modal open first).
  const entries = Array.from(map.entries())
    .filter(([key, calls]) => {
      if (calls.size === 0) return false;
      const candidate = key.split('::', 2)[1] ?? '';
      const ancestors = ancestorsByKey.get(key) ?? [];
      // Submit without an ancestor chain is useless — skip.
      if (candidate === 'Submit' && ancestors.length === 0) return false;
      // Submit WITH an ancestor chain is the most valuable correlation — always keep.
      if (candidate === 'Submit') return true;
      if (isNoisy(candidate)) return false;
      return true;
    })
    .sort((a, b) => a[0].localeCompare(b[0]));

  const reportLines: string[] = [];
  reportLines.push('# UI → API correlation report');
  reportLines.push('');
  reportLines.push(`Generated: ${new Date().toISOString()}`);
  reportLines.push(`Source: \`submission/data/ui-explore/click-to-api.jsonl\` (${lines.length} click records).`);
  reportLines.push('');
  reportLines.push(
    'Each row is a unique `(route, click target) → api call` correlation observed during ui-explore runs. Use these as the ground truth for writing UI → API correlation tests: a click that historically triggered endpoint X is expected to still trigger endpoint X on every future run; if it stops, either the SPA lost the fetch (regression) or the endpoint was renamed.',
  );
  reportLines.push('');
  reportLines.push('## Observed correlations');
  reportLines.push('');
  reportLines.push('| route | click | observations | API calls triggered |');
  reportLines.push('|---|---|---:|---|');
  for (const [key, calls] of entries) {
    const [route, candidate] = key.split('::', 2);
    const count = counts.get(key) ?? 1;
    const callsStr = Array.from(calls).sort().map((c) => `\`${c}\``).join(', ');
    reportLines.push(`| \`${route}\` | \`${candidate}\` | ${count} | ${callsStr} |`);
  }
  reportLines.push('');
  reportLines.push('## Suggested UI → API correlation tests');
  reportLines.push('');
  reportLines.push(
    'The generated `ui-api-correlation-tests.ts` file below is a seed for a new Playwright spec. Each test navigates to the recorded route, attaches a per-test request listener, clicks the recorded element, and asserts that at least one of the recorded API calls happened inside the click window.',
  );
  reportLines.push('');

  await fs.writeFile(REPORT_PATH, reportLines.join('\n'), 'utf8');

  // Emit spec-generator output
  const tsLines: string[] = [];
  tsLines.push("import { test, expect } from '../fixtures/auth';");
  tsLines.push('');
  tsLines.push(
    "test.describe('UI-API correlation — assert clicks trigger recorded endpoints', () => {",
  );
  const isAriaLabel = (s: string): boolean =>
    !s.includes(' ') && /^[a-z][-a-z0-9]+$/.test(s);

  const emitClick = (out: string[], candidate: string, locatorVar: string): void => {
    if (isAriaLabel(candidate)) {
      out.push(`    const ${locatorVar} = page.getByLabel(${JSON.stringify(candidate)}).first();`);
    } else {
      // Try button/tab/text in order at runtime.
      out.push(`    const ${locatorVar} = page.getByRole("button", { name: ${JSON.stringify(candidate)}, exact: true }).or(`);
      out.push(`      page.getByRole("tab", { name: ${JSON.stringify(candidate)}, exact: true })).or(`);
      out.push(`      page.getByText(${JSON.stringify(candidate)}, { exact: true })).first();`);
    }
    out.push(`    await ${locatorVar}.waitFor({ state: "visible", timeout: 10_000 });`);
    out.push(`    await ${locatorVar}.click();`);
  };

  let id = 0;
  for (const [key, calls] of entries) {
    const [route, candidate] = key.split('::', 2);
    if (!route || !candidate) continue;
    id += 1;
    const caseId = `UI-API-${String(id).padStart(3, '0')}`;
    const ancestors = ancestorsByKey.get(key) ?? [];
    const chainLen = ancestors.length;
    const title = `${caseId} click "${candidate.replace(/"/g, '\\"')}" on ${route}${chainLen ? ` (after ${chainLen}-step chain)` : ''}`;
    const expected = Array.from(calls).sort();
    tsLines.push('');
    tsLines.push(`  test('${title.replace(/'/g, "\\'")}', async ({ page }) => {`);
    tsLines.push(`    await page.goto(${JSON.stringify(route)});`);
    tsLines.push('    await page.waitForLoadState("networkidle");');
    // Replay ancestor clicks in order BEFORE attaching the listener so ancestor traffic
    // doesn't pollute the assertion.
    let varIdx = 0;
    for (const anc of ancestors) {
      varIdx += 1;
      emitClick(tsLines, anc.candidate, `anc${varIdx}`);
      // If this ancestor is a form-opening button, auto-fill a name field before the next
      // step so a Submit click has valid form state.
      if (/^action-button-add-/.test(anc.label ?? '')) {
        tsLines.push('    // Form-open heuristic: fill the first visible name input.');
        tsLines.push('    const __nameInput = page.locator("input[name=\\"name\\"]").first();');
        tsLines.push('    if (await __nameInput.isVisible().catch(() => false)) {');
        tsLines.push('      await __nameInput.fill(`UI-API-corr-${Date.now()}`);');
        tsLines.push('    }');
      }
      tsLines.push('    await page.waitForTimeout(400);');
    }
    tsLines.push('    const hits: string[] = [];');
    tsLines.push('    const listener = (req: import("@playwright/test").Request) => {');
    tsLines.push('      const url = req.url();');
    tsLines.push('      if (!/\\/api\\//.test(url)) return;');
    tsLines.push('      const u = new URL(url);');
    tsLines.push('      const path = u.pathname.replace(/\\/\\d+(?=\\/|$)/g, "/{id}");');
    tsLines.push('      hits.push(`${req.method()} ${path}`);');
    tsLines.push('    };');
    tsLines.push('    page.on("request", listener);');
    emitClick(tsLines, candidate, 'target');
    tsLines.push('    await page.waitForTimeout(1500);');
    tsLines.push('    page.off("request", listener);');
    tsLines.push(`    const expected = ${JSON.stringify(expected)};`);
    tsLines.push('    const matched = expected.some((e) => hits.includes(e));');
    tsLines.push('    expect(matched, `expected one of ${expected.join(", ")}, got ${hits.join(", ")}`).toBe(true);');
    tsLines.push('  });');
  }
  tsLines.push('});');
  await fs.writeFile(SUGGESTIONS_PATH, tsLines.join('\n') + '\n', 'utf8');

  console.log(
    `[ui-api-correlation] ${entries.length} unique correlations → ${REPORT_PATH}`,
  );
  console.log(`[ui-api-correlation] generated spec template → ${SUGGESTIONS_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
